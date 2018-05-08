Configuration
-------------
Set the following to configure this servlet in war/src/main/webapp/WEB-INF/web.xml
user (defaulted to weblogic)
password (defaulted to weblogic1)
targetUri (defaulted to http://localhost:7001)
processdefs - a comma separated list of allowed process defs (defaulted to oracleinternalpcs~KtbAlterSuspend!1.0~KtbAlterSuspendProcess,def)
whitelist - a comma separated list of whitelisted PCS resources (defaulted to /process-definitions,/webforms,/processes)

Build instructions
------------------
mvn install
Locate the war file in your local maven repo at MAVEN_REPO/pcs/proxy/1.0/proxy-1.0.war

Deployment instructions on to JCS
---------------------------------
Go to WLS console > Deployments
Click on install and follow the wizard and locate the above war file and install it.

Context root
------------
/p/proxy

Example
-------
url for the above default configuration:

curl http://localhost:7001/p/proxy/ic/api/process/v1/process-definitions
will hit http://localhost:7001/ic/api/process/v1/process-definitions with auth header (Authorization: Basic weblogic:weblogic1).


UI Snippet Consumption
----------------------

use the followinh path in the requireJs path and css path
- jcs_host:port/p/js/libs

- jcs_host:port/p/css/libs