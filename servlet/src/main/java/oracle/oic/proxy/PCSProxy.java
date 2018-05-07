package oracle.oic.proxy;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.mitre.dsmiley.httpproxy.ProxyServlet;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

/**
 * Configures the base servlet's http client to ignore ssl handshake
 * Also sets basic auth header (works for both preemptive and non-preemptive targets).
 */
public class PCSProxy extends ProxyServlet {

  String user;
  String password;
  List<String> whitelist;
  List<String> defs = new ArrayList<String>();

  @Override public void init() throws ServletException {
    super.init();
    user = getConfigParam("user");
    password = getConfigParam("password");
    StringTokenizer tokenizer = new StringTokenizer(",");
    final String processdefs = getConfigParam("processdefs");
    final String whitelisturls = getConfigParam("whitelist");
    whitelist = Arrays.asList(whitelisturls.split(","));
    defs = Arrays.asList(processdefs.split(","));
  }

  @Override
  protected HttpClient createHttpClient(final RequestConfig requestConfig) {
    CloseableHttpClient httpClient;
    try {
      httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig)
          .setSSLSocketFactory(new SSLConnectionSocketFactory(getNoOpSSLContext(), new String[] { "TLSv1" }, null, new NoopHostnameVerifier()))
          //.setDefaultCredentialsProvider(getCredentialProvider())
          .useSystemProperties()
          .build();
    } catch (Exception e) {
      throw new RuntimeException("Failed to set sslsocketfactory ", e);
    }
    return httpClient;
  }

  private CredentialsProvider getCredentialProvider() {
    CredentialsProvider provider = new BasicCredentialsProvider();
    UsernamePasswordCredentials credentials
        = new UsernamePasswordCredentials(user, password);
    provider.setCredentials(AuthScope.ANY, credentials);
    return provider;
  }

  private SSLContext getNoOpSSLContext() throws NoSuchAlgorithmException, KeyManagementException
  {
    SSLContext       context = SSLContext.getInstance("SSL");
    X509TrustManager tm =
        new X509TrustManager() {
          public void checkClientTrusted(X509Certificate[] xcs, String string) {}

          public void checkServerTrusted(X509Certificate[] xcs, String string) {}

          public X509Certificate[] getAcceptedIssuers()
          {
            return null;
          }
        };
    context.init(null, new TrustManager[] { tm }, null);

    return context;
  }

  // Perform preemtive basic auth as LbaaS is not returning WWW-Authenticate header
  private HttpClientContext getHttpClientContext(HttpHost target) {
    HttpClientContext context = HttpClientContext.create();
    context.setCredentialsProvider(getCredentialProvider());
    AuthCache authCache = new BasicAuthCache();
    authCache.put(target, new BasicScheme());
    context.setAuthCache(authCache);
    return context;
  }

  protected HttpResponse doExecute(HttpServletRequest servletRequest, HttpServletResponse servletResponse,
      HttpRequest proxyRequest) throws IOException {
    if (doLog) {
      log("proxy " + servletRequest.getMethod() + " uri: " + servletRequest.getRequestURI() + " -- " +
          proxyRequest.getRequestLine().getUri());
    }
    final HttpHost targetHost = getTargetHost(servletRequest);
    if(attachAuthHeader(servletRequest))
      return getProxyClient().execute(targetHost, proxyRequest, getHttpClientContext(targetHost));
    return getProxyClient().execute(targetHost, proxyRequest);
  }

  private boolean attachAuthHeader(HttpServletRequest request) {
    if(request.getMethod().equals("GET")) {
      final String path = request.getPathInfo();
      boolean whitelisted = false;
      for (String w : whitelist) {
        if (path.contains(w)) {
          whitelisted = true;
          break;
        }
      }
      if (whitelisted) {
        if(path.endsWith("process-definitions") || path.endsWith("process-definitions/"))
          return true;
        for (String def : defs) {
          if (path.contains(def)) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
}
