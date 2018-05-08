define({ACTIVE:"Aktiv",RECOVERABLE:"Behebbar",SUSPENDED:"Unterbrochen",container:{health:"Integrität",open:"Offen",workload:"Workload",cycleTime:"Trend",closed:"Geschlossen",parameters:"Filter",refresh:"Aktualisieren ",error:"Fehler ",generic_error_msg:"Beim Abrufen der Daten ist ein Fehler aufgetreten. Wenden Sie sich bitte an den Administrator.",access_error_msg:"Sie sind nicht zum Anzeigen dieser Informationen autorisiert. Ihre Session wurde entweder wegen eines Timeouts abgebrochen oder Sie verfügen nicht über die erforderlichen Berechtigungen",ok:"OK"},health:{title:"Prozessintegrität",refresh:"Aktualisieren ",parameters:"Parameter",billboard:{total_open:"Offen gesamt",in_progress:"Aktiv",recoverable:"Behebbar",suspended:"Unterbrochen"},state:{},chart:{state:"Status",process_name:"Prozessname",process_id:"Prozess-ID",no_instances:"Anzahl Instanzen",percentage:"Prozentsatz"}},open:{title:"Übersicht über geöffnete Prozesse",refresh:"Aktualisieren ",parameters:"Parameter",open_processes:"Offene Prozesse",billboard:{total_open:"Offen gesamt",on_track:"On Track",due_this_week:"Diese Woche fällig",overdue:"Überfällig",opened_today:"Heute geöffnet",closed_today:"Heute geschlossen"},table:{due_this_week:"Diese Woche\nfällig",opened_today:"Heute\ngeöffnet",closed_today:"Heute\ngeschlossen",application:"Anwendung",process:"Prozess",on_track:"On Track",overdue:"Überfällig",recoverable:"Behebbar",suspended:"Unterbrochen"}},workload:{title:"Workload-Analyse",refresh:"Aktualisieren ",parameters:"Parameter",billboard:{total_open:"Offene Aufgaben",on_track:"On Track",due_this_week:"Diese Woche fällig",overdue:"Überfällig",due_soon:"Bald fällig"},button:{top10:"TOP 10",bottleneck:"BOTTLENECK",by_task:"Nach Aufgabe",by_assignee:"Nach Beauftragtem",by_process:"Nach Prozess"},type:{top10_by_task:"Top 10 nach Aufgabe",top10_by_assignee:"Top 10 nach Beauftragtem",bottleneck_by_process:"Engpass nach Prozess",bottleneck_by_task:"Engpass nach Aufgabe",bottleneck_by_assignee:"Engpass nach Beauftragtem"},legend:{lt_0:"<0","0_to_1":"0-1","1_to_2":"1-2","2_to_3":"2-3","3_to_4":"3-4","4_to_5":"4-5","5_to_6":"5-6","6_to_7":"6-7",gt_7:">7"},treemap:{colorLabel:"Durchschn. Tage bis Fälligkeitsdatum",sizeLabel:"Anzahl Prozesse",process:"Prozess",task:"Aufgabe",assignee:"Beauftragter"},chart:{no_open_task:"Keine offene Aufgabe",due_this_week:"Keine fällige Aufgabe diese Woche",overdue:"Keine überfällige Aufgabe"}},cycleTime:{title:"Trend",refresh:"Aktualisieren ",parameters:"Parameter",button:{by_process:"Nach Prozess",by_task:"Nach Aufgabe"},billboard:{total_open:"Aktuell geöffnet",opened_today:"Heute geöffnet",closed_today:"Heute geschlossen"},chart:{process_cycle_time:"Prozesszykluszeit",process_workload:"Prozess-Workload",task_cycle_time:"Aufgabenzykluszeit",task_workload:"Aufgaben-Workload",days:"Tage",process:"Prozess",time_days:"Zeit (Tage)",count:"Anzahl",no_data_wkld:"Keine Daten zum Berechnen des Workload-Trends",no_data_cycle:"Keine Daten zum Berechnen des Zyklustrends"}},closed:{title:"Analyse - Geschlossene Prozesse",refresh:"Aktualisieren ",parameters:"Parameter",closed_processes:"Geschlossene Prozesse",button:{today:"Heute",this_week:"Diese Woche",this_month:"Diesen Monat"},billboard:{total_closed:"Geschlossen gesamt",completed:"Abgeschlossen",aborted:"Abgebrochen",errored:"Fehlerhaft"},table:{application:"Anwendung",process:"Prozess",completed:"Abgeschlossen",aborted:"Abgebrochen",errored:"Fehlerhaft",avg_cycle:"Durchschn. Zyklus",max_cycle:"Max. Zyklus",increased:"Erhöht",decreased:"Verringert"},period:{today:"Heute",this_week:"Diese Woche",this_month:"Diesen Monat",yesterday:"Gestern",last_week:"Letzte Woche",last_month:"Letzter Monat"}},processFilter:{close:"Schließen",date_range:" Datumsbereich (Tage vor heute)",days:"Anzahl Tage",select_process:"Prozess auswählen",search:"Suchen",search_process:"Prozess suchen",all:"Alle wählen",show_assignee:"Beauftragte anzeigen",roles_groups:"Rollen und Gruppen",users:"Benutzer",show_top_N:"Top N anzeigen",apply:"Anwenden",top_N:"Top N"},vis:{formlbl:{data_source_type:"Datenquelltyp",select_application:"Anwendung",select_application_opt1:"Alle Anwendungen",x_axis:"X-Achse",y_axis:"Y-Achse",series:"Reihe",group:"Gruppe",measure:"Kennzahl","function":"Funktion",match:"Übereinstimmung",all:"Alle",any:"Beliebig",dashboard:"Prozessüberwachung",visualization:"Geschäftsanalysen",business_indicators:"Geschäftsindikatoren",system_indicators:"Systemindikatoren",select_none:"Keine auswählen",timegroups:"Zeitliche Gruppierung",query_name:"Name",copy_of:"Kopie von",data_last:"Daten für letzte",default_query_name:"Unbenannt",start_msg:"Erstellen Sie eine neue Abfrage, um Business Analytics anzuzeigen",description:"Beschreibung hinzufügen",reports:"Berichte"},button:{graph_data:"Tabellendaten",visualize:"Bericht anzeigen",add_filter:"Filter hinzufügen",download_csv:"CSV herunterladen",bar:"Balkendiagramm",line:"Liniendiagramm",combo:"Kombinationsdiagramm",area:"Fläche",line_with_area:"Linien- und Flächendiagramm",hide_query:"Abfragefenster ausblenden",show_query:"Abfragefenster anzeigen",reset:"Abfrage zurücksetzen",copy:"Abfrage kopieren","delete":"Abfrage löschen",save:"Abfrage speichern","new":"Neue Abfrage",edit_graph_title:"Titel bearbeiten",query:"Abfrage bearbeiten",start:"Erste Schritte",close:"Schließen"},chart:{unstacked:"nicht gestapelt",stacked:"gestapelt",vertical:"vertikal",horizontal:"horizontal",no_chart_data:"Es wurden keine Suchergebnisse für die gewählten Kriterien gefunden",no_saved_queries:"Keine Abfragen zur Anzeige vorhanden.",blank_chart_header:"Keine Abfragen ausgewählt.",blank_chart_details:'Wählen Sie eine Abfrage, oder erstellen Sie eine neue, indem Sie auf "Neue Abfrage" klicken, die Felder ausfüllen und dann auf "Bericht anzeigen" klicken.'},filter:{equal:"gleich",not_equal:"ungleich","null":"null",not_null:"nicht null",lesser:"kleiner als",lesser_equal:"kleiner oder gleich",greater:"größer als",greater_equal:"größer oder gleich",like:"wie",not_like:"nicht wie"},filterValues:{"true":"True","false":"False"},error_msg:{fields_cant_be_same:"Reihen- und Gruppenfelder dürfen nicht denselben Wert haben",data_fetch_error:"Fehler beim Abrufen der Daten. Wenden Sie sich an den Administrator",enter_query_name:"Geben Sie den Abfragenamen ein",no_query_selected:"Es wurde keine Abfrage ausgewählt",delete_confirm:"Möchten Sie die Abfrage wirklich löschen?",hintAlphanumeric:"Geben Sie ein alphanumerisches Zeichen ein",hintNumber:"Geben Sie eine Zahl ein",msgAlphanumeric:"Sie müssen alphanumerische Zeichen eingeben.",msgNumber:"Sie müssen eine Zahl eingeben."},dialog:{error:"Fehler ",ok:"OK",confirm:"Bestätigen",cancel:"Abbrechen",warning:"Warnung","delete":"Löschen","continue":"Fortsetzen",delete_app_msg:"Sie können die Abfrage löschen oder den Vorgang mit einer neuen Abfrage fortsetzen."},datasource:{PROCESS:"Prozess",ACTIVITY:"Aktivität",TASK:"Aufgabe",ASSIGNMENT:"Zuweisung"},functions:{COUNT:"Anzahl",SUM:"Summe",AVG:"Durchschnitt",MIN:"Minimum",MEDIAN:"Mittelwert",MAX:"Maximum",STDDEV:"Standardabweichung",COUNTDISTINCT:"Anzahl - eindeutig",VARIANCE:"Abweichung"},timeGroups:{YEAR:"Jahr",QUARTER:"Quartal",MONTH:"Monat",WEEK:"Woche",DAYOFYEAR:"Tag im Jahr",DAYOFMONTH:"Kalendertag",DAYOFWEEK:"Wochentag",HOUR:"Stunde",MINUTE:"Minute",SECOND:"Sekunde"},lastNDays:{"1WEEK":"1 Woche ","1MONTH":"1 Monat","2MONTHS":"2 Monate","3MONTHS":"3 Monate","6MONTHS":"6 Monate","9MONTHS":"9 Monate","1YEAR":"1 Jahr"}}});