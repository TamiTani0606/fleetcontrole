/* === LOGIN RESTORE BOOTSTRAP I18N === */
var MASTER_I18N = (typeof MASTER_I18N !== "undefined" && MASTER_I18N) ? MASTER_I18N : {
 de:{
  welcomeBackClean:"Willkommen zurück.",loginHintClean:"Bitte melde dich an, um fortzufahren.",usernameClean:"Benutzername",passwordClean:"Passwort",loginClean:"Anmelden",
  driverClean:"Fahrer",workshopClean:"Werkstatt",fleetClean:"Fuhrpark",bossClean:"Chef",developerClean:"Entwickler",
  driverSubClean:"Abfahrt & Kontrolle",workshopSubClean:"Reparatur & Wartung",fleetSubClean:"Fahrzeuge & Status",bossSubClean:"Kennzahlen & Boni",developerSubClean:"System & Daten",
  loginRightTitle:"Ihre Flotte. Ihre Kontrolle.",loginRightText:"Behalte Fahrzeuge, Fahrer, Wartungen, Schäden und Kennzahlen im Blick.",secureClean:"Sicher",mobileClean:"Mobil"
 },
 en:{
  welcomeBackClean:"Welcome back.",loginHintClean:"Please sign in to continue.",usernameClean:"Username",passwordClean:"Password",loginClean:"Sign in",
  driverClean:"Driver",workshopClean:"Workshop",fleetClean:"Fleet",bossClean:"Management",developerClean:"Developer",
  driverSubClean:"Departure & checks",workshopSubClean:"Repair & maintenance",fleetSubClean:"Vehicles & status",bossSubClean:"KPIs & bonuses",developerSubClean:"System & data",
  loginRightTitle:"Your fleet. Your control.",loginRightText:"Keep vehicles, drivers, maintenance, damages and KPIs in view.",secureClean:"Secure",mobileClean:"Mobile"
 }
};
["tr","pl","ro","ru","uk","ar"].forEach(function(l){if(!MASTER_I18N[l])MASTER_I18N[l]=MASTER_I18N.en;});

var LOGO=window.FC_LOGO||"";var TR=window.FC_TR||{};var LANG=window.FC_LANG||[];var CHECKS=window.FC_CHECKS||{};var MAIL_TO="S.thollembeek@daglioglu-transporte.de";
var seedUsers=[{id:991,name:"Marcel Hoppe",login:"Marcel",password:"Anhänger",role:"driver",extraRoles:["fleet"],language:"de",points:0,status:"green"},{id:992,name:"Sascha Thollembeek",login:"Sascha",password:"Schraubenschlüssel",role:"driver",extraRoles:["boss","workshop"],language:"de",points:0,status:"green"},{id:993,name:"Tamara",login:"Tamara",password:"Sternenhimmel",role:"boss",language:"de",points:0,status:"green"},{id:990,name:"Entwickler",login:"Entwickler",password:"Laubblätter",role:"developer",language:"de",points:0,status:"green"},{id:950,name:"Chef",login:"Chef",password:"Wassermelonen",role:"boss",language:"de",points:0,status:"green"},
{id:900,name:"Werkstatt",login:"Werkstatt",password:"Eisbecher",role:"workshop",language:"de",points:0,status:"green"},{id:1,name:"Marcel Hoppe",login:"Hoppe.M",password:"Besen",role:"driver",language:"de",points:85,status:"green"},{id:2,name:"Sascha Thollembeek",login:"Thollembeek.S",password:"Erdbeere",role:"driver",extraRoles:["boss","workshop"],language:"de",points:70,status:"red"},{id:3,name:"Tamara Klos",login:"Klos.T",password:"Einhorn",role:"boss",language:"de",points:0,status:"green"},{id:4,name:"Fuhrpark Test",login:"fuhrpark",password:"demo",role:"fleet",language:"de",points:0,status:"green"},{id:5,name:"Werkstatt Test",login:"werkstatt",password:"demo",role:"workshop",language:"de",points:0,status:"green"}];
var seedPoints=[{id:1,driver:1,date:new Date().toLocaleDateString(),reason:"Startbonus",value:85,by:"System"},{id:2,driver:2,date:new Date().toLocaleDateString(),reason:"Startbonus",value:70,by:"System"}];
function load(k,f){try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}}
var S={lang:"de",theme:"light",tab:"home",user:null,fixed:"",sig:false,signatureData:"",checks:{},comments:{},damagePhotos:[],damageDesc:"",activeVehicle:null,users:load("fc_v17_users",seedUsers),vehicles:load("fc_v17_vehicles",[]),damages:load("fc_v17_damages",[]),inspections:load("fc_v17_inspections",[]),points:load("fc_v17_points",seedPoints),licenses:load("fc_v17_licenses",[]),maintenance:load("fc_v17_maintenance",[]),costs:load("fc_v17_costs",[]),docs:load("fc_v17_docs",[]),aiTraining:load("fc_v17_ai_training",[]),mailQueue:load("fc_v17_mail_queue",[])};
var NAV_HISTORY=[];function back(){if(NAV_HISTORY.length){S.tab=NAV_HISTORY.pop();render()}else{S.tab="home";render()}}
function normalizePilotUsers(){
 var required=[
  {id:991,name:"Marcel Hoppe",login:"Marcel",password:"Anhänger",role:"driver",extraRoles:["fleet"],language:"de",points:0,status:"green"},
  {id:992,name:"Sascha Thollembeek",login:"Sascha",password:"Schraubenschlüssel",role:"driver",extraRoles:["boss","workshop"],language:"de",points:0,status:"green"},
  {id:993,name:"Tamara",login:"Tamara",password:"Sternenhimmel",role:"boss",extraRoles:["fleet","workshop","driver"],language:"de",points:0,status:"green"},
  {id:900,name:"Werkstatt",login:"Werkstatt",password:"Eisbecher",role:"workshop",language:"de",points:0,status:"green"},
  {id:910,name:"Fuhrparkmanagement",login:"fuhrpark",password:"demo",role:"fleet",language:"de",points:0,status:"green"}
 ];
 required.forEach(function(r){
   var found=(S.users||[]).find(function(u){return String(u.login||"").toLowerCase()===String(r.login).toLowerCase()||Number(u.id)===Number(r.id)});
   if(found){
     Object.keys(r).forEach(function(k){found[k]=r[k]});
   }else{
     S.users.push(r);
   }
 });
 saveAll();
}

normalizePilotUsers();
function saveAll(){localStorage.setItem("fc_v17_users",JSON.stringify(S.users));localStorage.setItem("fc_v17_vehicles",JSON.stringify(S.vehicles));localStorage.setItem("fc_v17_damages",JSON.stringify(S.damages));localStorage.setItem("fc_v17_inspections",JSON.stringify(S.inspections));localStorage.setItem("fc_v17_points",JSON.stringify(S.points));localStorage.setItem("fc_v17_licenses",JSON.stringify(S.licenses));localStorage.setItem("fc_v17_maintenance",JSON.stringify(S.maintenance));localStorage.setItem("fc_v17_costs",JSON.stringify(S.costs));localStorage.setItem("fc_v17_docs",JSON.stringify(S.docs));localStorage.setItem("fc_v17_ai_training",JSON.stringify(S.aiTraining));localStorage.setItem("fc_v17_mail_queue",JSON.stringify(S.mailQueue||[]))}
function t(k){return (TR[S.lang]||TR.de||{})[k]||k}


function canAwardPoints(){
 return !!(S.user&&(
   S.user.role==="boss"||
   S.user.role==="fleet"||
   S.user.role==="deputy"||
   S.user.role==="admin"||
   (S.user.extraRoles||[]).indexOf("boss")>=0||
   (S.user.extraRoles||[]).indexOf("fleet")>=0||
   (S.user.extraRoles||[]).indexOf("deputy")>=0||
   (S.user.extraRoles||[]).indexOf("admin")>=0
 ));
}

function canApproveAiDamage(){
 return !!(S.user&&(
   S.user.role==="boss"||
   S.user.role==="fleet"||
   S.user.role==="deputy"||
   S.user.role==="admin"||
   (S.user.extraRoles||[]).indexOf("boss")>=0||
   (S.user.extraRoles||[]).indexOf("fleet")>=0||
   (S.user.extraRoles||[]).indexOf("deputy")>=0||
   (S.user.extraRoles||[]).indexOf("admin")>=0
 ));
}

function isChefFullAccess(){return !!(S.user&&(S.user.role==='boss'||S.user.role==='admin'||(S.user.extraRoles||[]).indexOf('boss')>=0||(S.user.extraRoles||[]).indexOf('admin')>=0))}
function hasRole(r){
 return !!(S.user&&(S.user.role===r||(S.user.extraRoles||[]).indexOf(r)>=0));
}
function isBossRole(){return hasRole("boss")||hasRole("admin")||hasRole("developer")}
function isFleetRole(){return hasRole("fleet")}
function isWorkshopRole(){return hasRole("workshop")}
function isDriverRole(){return hasRole("driver")}


function admin(){
 return !!(S.user&&(
   S.user.role==="boss"||
   S.user.role==="admin"||
   S.user.role==="fleet"||
   S.user.role==="developer"||
   (S.user.extraRoles||[]).some(function(r){return ["boss","admin","fleet","developer"].indexOf(r)>=0})
 ));
}
function dev(){return S.user&&S.user.role==="developer"}function work(){return S.user&&(S.user.role==="workshop"||(S.user.extraRoles||[]).includes("workshop"))}
function allDrivers(){
 return (S.users||[]).filter(function(u){return u.role==="driver"||(u.extraRoles||[]).indexOf("driver")>=0});
}

function driver(){return S.user&&S.user.role==="driver"?S.user:S.users.find(function(u){return u.role==="driver"})}
function assignedVehicles(){
 if(!S.user)return [];
 if(isChefFullAccess()||admin()||work())return S.vehicles||[];
 return (S.vehicles||[]).filter(function(v){return v.assigned===S.user.id||!v.assigned});
}


function ensurePilotVehicle(){
 if(!S.vehicles)S.vehicles=[];
 if(S.vehicles.length===0){
   S.vehicles.push({id:Date.now(),name:"Pilot-Fahrzeug",plate:"Bitte Kennzeichen eintragen",type:"vehicle",assigned:S.user?S.user.id:null,hu:"",sp:"",tacho:""});
   saveAll();
 }
}

function driverSelectableVehicles(){return S.vehicles.filter(function(v){return v.type==="vehicle"||v.type==="trailer"||!v.type})}

var extraFallbackLabels={
 damagePendingApproval:"Schadensmeldung gespeichert. KI-Punkteempfehlung wartet auf Freigabe.",
 approvalStatus:"Freigabestatus",
 pending:"wartet",
 approved:"freigegeben",
 rejected:"abgelehnt",
 approve:"Freigeben",
 reject:"Ablehnen",
 damageApproved:"KI-Schadenpunkte wurden freigegeben und übernommen.",
 damageRejected:"KI-Schadenpunkte wurden abgelehnt.",
 notAllowed:"Keine Berechtigung.",
 aiRecommendation:"KI-Empfehlung",
 workshopLinked:"Werkstatt verknüpft",pointsSavedForDriver:"Punkte wurden beim Fahrer angerechnet"
};

function trFallback(k){if(extraFallbackLabels[k])return extraFallbackLabels[k];var f={
notifications:"Benachrichtigungen",noNotifications:"Keine Benachrichtigungen",chooseMyVehicle:"Mein Fahrzeug auswählen",saveVehicleChoice:"Fahrzeug speichern",vehicleSaved:"Fahrzeug gespeichert",
missingCheck:"Abfahrtskontrolle offen",damageOpen:"Schaden offen",noVehiclesCreated:"Es sind noch keine Fahrzeuge angelegt.",selfAssignHint:"Wähle dein aktuelles Fahrzeug für Status und Abfahrtskontrolle.",
deadlineNotice:"Fristwarnung",checkboxRequired:"Pflicht: Fahrzeug auswählen und alle Prüfpunkte abhaken. Kommentare, Fotos und Unterschrift sind freiwillig.",commentOptional:"Kommentar optional",allChecksRequired:"Bitte alle Prüfpunkte abhaken.",damagePhotoHint:"Falls Schäden vorhanden sind, hier Fotos gesammelt hochladen.",back:"Zurück",damageSummary:"Schadenszusammenfassung",totalDamages:"Gesamtschäden",openDamagesTotal:"Offene Schäden gesamt",doneDamagesTotal:"Erledigte Schäden",criticalDamages:"Kritische Schäden",damageFreeBonus:"Bonus Schadensfreiheit",awardDamageFreeBonus:"Schadensfreiheits-Bonus vergeben",damageFreeMonth:"Schadenfreier Monat",bonusAwarded:"Bonus wurde vergeben",damageOverview:"Überblick aller Schäden",aiDamageCheck:"KI-Schadenprüfung Beta",aiHint:"Foto hochladen und Schadensart auswählen. Die KI-Beta erstellt eine Punkte-Empfehlung.",damageType:"Schadensart",damageSeverity:"Schweregrad",aiRecommendation:"KI-Empfehlung",applyAiResult:"KI-Ergebnis übernehmen",minorDamage:"Kleiner Kratzer / Karosserie",mirrorLight:"Spiegel / Licht",tireDamage:"Reifen",brakeSteering:"Bremse / Lenkung",loadSecuring:"Ladungssicherung",lateReport:"Verspätet gemeldet",aiApplied:"KI-Bewertung wurde übernommen",pointsRecommendation:"Punkteempfehlung",aiTraining:"KI-Trainingsdaten",trainingHint:"Sammelt echte Schadensfotos mit Kategorie und Bewertung. Diese Daten kann später ein ITler für echte KI verwenden.",damageClass:"Schadensklasse",severityLight:"Leicht",severityMedium:"Mittel",severityCritical:"Kritisch",confirmedBy:"Bestätigt von",exportTraining:"Trainingsdaten exportieren",trainingSaved:"Trainingsdatensatz gespeichert",trainingData:"Trainingsdaten",photoFile:"Fotodatei",trainingExportHint:"Export wird als JSON-Datei heruntergeladen.",developerCorner:"Entwickler-Ecke",developerDashboard:"Entwickler-Dashboard",systemInfo:"Systeminformationen",exportAllData:"Alle Testdaten exportieren",clearTestData:"Testdaten löschen",developerHint:"Bereich für IT/Entwickler zur Prüfung und Datenkontrolle.",fleetLive:"Live-Flottenübersicht",licenseCheck:"Führerschein-Kontrolle",licenseDate:"Führerschein gültig bis",saveLicense:"Führerschein speichern",maintenancePlanner:"Wartungsplaner",addMaintenance:"Wartung hinzufügen",maintenanceType:"Wartungsart",dueDate:"Fälligkeitsdatum",oilChange:"Ölwechsel",tireChange:"Reifenwechsel",freeTask:"Freie Wartungsaufgabe",costOverview:"Kostenübersicht",addCost:"Kosten erfassen",amount:"Betrag",category:"Kategorie",documentFolder:"Dokumentenmappe",addDocument:"Dokument hinzufügen",documentName:"Dokumentname",documentType:"Dokumentart",monthlyRanking:"Monatsranking",bonusSystem:"Bonus-/Prämiensystem",criticalDefect:"Kritischer Mangel",criticalDefects:"Kritische Mängel",reportedToWorkshop:"Automatisch an Werkstatt gemeldet",bonusLevel:"Prämienstufe",noData:"Keine Daten vorhanden",saved:"Gespeichert"
};return f[k]||k}
function tt(k){var v=t(k);return v===k?trFallback(k):v}

var ROLE_LABELS={
 de:{driver:"Fahrer",workshop:"Werkstatt",fleet:"Fuhrpark",boss:"Chef / Management",developer:"Entwickler",settings:"Einstellungen",logout:"Abmelden",system:"System",monitoring:"Monitoring",reports:"Reports",costAnalysis:"Kostenanalyse",showReport:"Bericht anzeigen",allVehicles:"Alle Fahrzeuge anzeigen",allTasks:"Alle Aufgaben anzeigen",newOrder:"Neuer Auftrag",calendar:"Kalender",driverManage:"Fahrer verwalten",documents:"Dokumente",logs:"Logs anzeigen",deploy:"Deploy",systemLogs:"System Logs",availability:"Verfügbarkeit",utilization:"Auslastung",costPerKm:"Kosten / km",apiStatus:"API Status",database:"Datenbank",server:"Server",backup:"Backup",healthy:"Gesund",stable:"Läuft stabil",allSystemsActive:"Alle Systeme aktiv",today2:"Heute",tomorrow:"Morgen",monthCurrent:"Diesen Monat",activeVehicles:"Aktive Fahrzeuge",inMaintenance:"In Wartung",outOfService:"Außer Betrieb",quickAccess:"Schnellzugriff",systemStatus:"Systemstatus",todaysTasks:"Heutige Aufgaben",overviewFleet:"Übersicht Flotte",currentKpis:"Kennzahlen aktuell",focusDriver:"Fokus: Abfahrt & Sicherheit",focusWorkshop:"Fokus: Arbeiten & Reparaturen",focusFleet:"Fokus: Fahrzeuge & Status",focusBoss:"Fokus: Kennzahlen & Analysen",focusDev:"Fokus: System & Überwachung",perfectTranslationNote:"Sprache geändert. Alle neuen Oberflächentexte werden übersetzt; produktive Fachübersetzungen sollte ein Muttersprachler final prüfen.",damageReportLinked:"Schadensmeldung gespeichert, mit KI-Training verknüpft und an Werkstattbereich übergeben.",aiTrainingLinked:"KI-Training verknüpft",workshopLinked:"Werkstatt verknüpft",pointsSavedForDriver:"Punkte wurden beim Fahrer angerechnet",damagePendingApproval:"Schadensmeldung gespeichert. KI-Punkteempfehlung wartet auf Freigabe.",approvalStatus:"Freigabestatus",pending:"wartet",approved:"freigegeben",rejected:"abgelehnt",approve:"Freigeben",reject:"Ablehnen",damageApproved:"KI-Schadenpunkte wurden freigegeben und übernommen.",damageRejected:"KI-Schadenpunkte wurden abgelehnt.",notAllowed:"Keine Berechtigung.",aiRecommendation:"KI-Empfehlung",mailPrepared:"PDF-Versand vorbereitet"},
 en:{driver:"Driver",workshop:"Workshop",fleet:"Fleet",boss:"Management",developer:"Developer",settings:"Settings",logout:"Log out",system:"System",monitoring:"Monitoring",reports:"Reports",costAnalysis:"Cost analysis",showReport:"Show report",allVehicles:"Show all vehicles",allTasks:"Show all tasks",newOrder:"New order",calendar:"Calendar",driverManage:"Manage drivers",documents:"Documents",logs:"Show logs",deploy:"Deploy",systemLogs:"System logs",availability:"Availability",utilization:"Utilization",costPerKm:"Cost / km",apiStatus:"API status",database:"Database",server:"Server",backup:"Backup",healthy:"Healthy",stable:"Running stable",allSystemsActive:"All systems active",today2:"Today",tomorrow:"Tomorrow",monthCurrent:"This month",activeVehicles:"Active vehicles",inMaintenance:"In maintenance",outOfService:"Out of service",quickAccess:"Quick access",systemStatus:"System status",todaysTasks:"Today's tasks",overviewFleet:"Fleet overview",currentKpis:"Current KPIs",focusDriver:"Focus: departure & safety",focusWorkshop:"Focus: work & repairs",focusFleet:"Focus: vehicles & status",focusBoss:"Focus: metrics & analytics",focusDev:"Focus: system & monitoring",perfectTranslationNote:"Language changed. All new interface texts are translated; final production wording should be checked by a native speaker."},
 tr:{driver:"Sürücü",workshop:"Atölye",fleet:"Filo",boss:"Yönetim",developer:"Geliştirici",settings:"Ayarlar",logout:"Çıkış",system:"Sistem",monitoring:"İzleme",reports:"Raporlar",costAnalysis:"Maliyet analizi",showReport:"Raporu göster",allVehicles:"Tüm araçları göster",allTasks:"Tüm görevleri göster",newOrder:"Yeni iş",calendar:"Takvim",driverManage:"Sürücüleri yönet",documents:"Belgeler",logs:"Kayıtları göster",deploy:"Yayınla",systemLogs:"Sistem kayıtları",availability:"Kullanılabilirlik",utilization:"Kullanım",costPerKm:"Km başı maliyet",apiStatus:"API durumu",database:"Veritabanı",server:"Sunucu",backup:"Yedekleme",healthy:"Sağlıklı",stable:"Stabil çalışıyor",allSystemsActive:"Tüm sistemler aktif",today2:"Bugün",tomorrow:"Yarın",monthCurrent:"Bu ay",activeVehicles:"Aktif araçlar",inMaintenance:"Bakımda",outOfService:"Hizmet dışı",quickAccess:"Hızlı erişim",systemStatus:"Sistem durumu",todaysTasks:"Bugünkü görevler",overviewFleet:"Filo özeti",currentKpis:"Güncel göstergeler",focusDriver:"Odak: çıkış & güvenlik",focusWorkshop:"Odak: iş & onarım",focusFleet:"Odak: araçlar & durum",focusBoss:"Odak: göstergeler & analizler",focusDev:"Odak: sistem & izleme",perfectTranslationNote:"Dil değiştirildi. Yeni arayüz metinleri çevrildi; canlı kullanım için ana dil kontrolü önerilir."},
 pl:{driver:"Kierowca",workshop:"Warsztat",fleet:"Flota",boss:"Zarząd",developer:"Deweloper",settings:"Ustawienia",logout:"Wyloguj",system:"System",monitoring:"Monitoring",reports:"Raporty",costAnalysis:"Analiza kosztów",showReport:"Pokaż raport",allVehicles:"Pokaż wszystkie pojazdy",allTasks:"Pokaż wszystkie zadania",newOrder:"Nowe zlecenie",calendar:"Kalendarz",driverManage:"Zarządzaj kierowcami",documents:"Dokumenty",logs:"Pokaż logi",deploy:"Wdrożenie",systemLogs:"Logi systemowe",availability:"Dostępność",utilization:"Wykorzystanie",costPerKm:"Koszt / km",apiStatus:"Status API",database:"Baza danych",server:"Serwer",backup:"Kopia zapasowa",healthy:"Zdrowy",stable:"Działa stabilnie",allSystemsActive:"Wszystkie systemy aktywne",today2:"Dzisiaj",tomorrow:"Jutro",monthCurrent:"Ten miesiąc",activeVehicles:"Aktywne pojazdy",inMaintenance:"W serwisie",outOfService:"Poza eksploatacją",quickAccess:"Szybki dostęp",systemStatus:"Status systemu",todaysTasks:"Dzisiejsze zadania",overviewFleet:"Przegląd floty",currentKpis:"Aktualne KPI",focusDriver:"Fokus: wyjazd i bezpieczeństwo",focusWorkshop:"Fokus: prace i naprawy",focusFleet:"Fokus: pojazdy i status",focusBoss:"Fokus: wskaźniki i analizy",focusDev:"Fokus: system i monitoring",perfectTranslationNote:"Język zmieniony. Nowe teksty interfejsu są przetłumaczone; wersję produkcyjną powinien sprawdzić native speaker."},
 ro:{driver:"Șofer",workshop:"Atelier",fleet:"Flotă",boss:"Management",developer:"Dezvoltator",settings:"Setări",logout:"Deconectare",system:"Sistem",monitoring:"Monitorizare",reports:"Rapoarte",costAnalysis:"Analiză costuri",showReport:"Afișează raport",allVehicles:"Afișează toate vehiculele",allTasks:"Afișează toate sarcinile",newOrder:"Comandă nouă",calendar:"Calendar",driverManage:"Gestionare șoferi",documents:"Documente",logs:"Afișează jurnale",deploy:"Deploy",systemLogs:"Jurnale sistem",availability:"Disponibilitate",utilization:"Utilizare",costPerKm:"Cost / km",apiStatus:"Status API",database:"Bază de date",server:"Server",backup:"Backup",healthy:"Sănătos",stable:"Rulează stabil",allSystemsActive:"Toate sistemele active",today2:"Astăzi",tomorrow:"Mâine",monthCurrent:"Luna curentă",activeVehicles:"Vehicule active",inMaintenance:"În întreținere",outOfService:"Scos din funcțiune",quickAccess:"Acces rapid",systemStatus:"Status sistem",todaysTasks:"Sarcinile de azi",overviewFleet:"Prezentare flotă",currentKpis:"Indicatori actuali",focusDriver:"Focus: plecare și siguranță",focusWorkshop:"Focus: lucrări și reparații",focusFleet:"Focus: vehicule și status",focusBoss:"Focus: indicatori și analize",focusDev:"Focus: sistem și monitorizare",perfectTranslationNote:"Limba a fost schimbată. Textele noi sunt traduse; pentru producție este recomandată verificarea de către un vorbitor nativ."},
 uk:{driver:"Водій",workshop:"Майстерня",fleet:"Автопарк",boss:"Керівництво",developer:"Розробник",settings:"Налаштування",logout:"Вийти",system:"Система",monitoring:"Моніторинг",reports:"Звіти",costAnalysis:"Аналіз витрат",showReport:"Показати звіт",allVehicles:"Показати всі авто",allTasks:"Показати всі завдання",newOrder:"Нове завдання",calendar:"Календар",driverManage:"Керувати водіями",documents:"Документи",logs:"Показати логи",deploy:"Розгортання",systemLogs:"Системні логи",availability:"Доступність",utilization:"Завантаження",costPerKm:"Вартість / км",apiStatus:"Статус API",database:"База даних",server:"Сервер",backup:"Резервна копія",healthy:"Справно",stable:"Працює стабільно",allSystemsActive:"Усі системи активні",today2:"Сьогодні",tomorrow:"Завтра",monthCurrent:"Цей місяць",activeVehicles:"Активні авто",inMaintenance:"На обслуговуванні",outOfService:"Не працює",quickAccess:"Швидкий доступ",systemStatus:"Стан системи",todaysTasks:"Завдання на сьогодні",overviewFleet:"Огляд автопарку",currentKpis:"Поточні KPI",focusDriver:"Фокус: виїзд і безпека",focusWorkshop:"Фокус: роботи й ремонт",focusFleet:"Фокус: авто і статус",focusBoss:"Фокус: показники й аналіз",focusDev:"Фокус: система й моніторинг",perfectTranslationNote:"Мову змінено. Нові тексти інтерфейсу перекладені; для продуктивного запуску бажана перевірка носієм мови."},
 ru:{driver:"Водитель",workshop:"Мастерская",fleet:"Автопарк",boss:"Руководство",developer:"Разработчик",settings:"Настройки",logout:"Выйти",system:"Система",monitoring:"Мониторинг",reports:"Отчеты",costAnalysis:"Анализ затрат",showReport:"Показать отчет",allVehicles:"Показать все ТС",allTasks:"Показать все задачи",newOrder:"Новая задача",calendar:"Календарь",driverManage:"Управлять водителями",documents:"Документы",logs:"Показать логи",deploy:"Деплой",systemLogs:"Системные логи",availability:"Доступность",utilization:"Загрузка",costPerKm:"Стоимость / км",apiStatus:"Статус API",database:"База данных",server:"Сервер",backup:"Резервная копия",healthy:"Исправно",stable:"Работает стабильно",allSystemsActive:"Все системы активны",today2:"Сегодня",tomorrow:"Завтра",monthCurrent:"Этот месяц",activeVehicles:"Активные ТС",inMaintenance:"На обслуживании",outOfService:"Не в работе",quickAccess:"Быстрый доступ",systemStatus:"Статус системы",todaysTasks:"Задачи на сегодня",overviewFleet:"Обзор автопарка",currentKpis:"Текущие KPI",focusDriver:"Фокус: выезд и безопасность",focusWorkshop:"Фокус: работы и ремонт",focusFleet:"Фокус: ТС и статус",focusBoss:"Фокус: показатели и анализ",focusDev:"Фокус: система и мониторинг",perfectTranslationNote:"Язык изменен. Новые тексты интерфейса переведены; для продакшена рекомендуется проверка носителем языка."},
 ar:{driver:"السائق",workshop:"الورشة",fleet:"الأسطول",boss:"الإدارة",developer:"المطوّر",settings:"الإعدادات",logout:"تسجيل الخروج",system:"النظام",monitoring:"المراقبة",reports:"التقارير",costAnalysis:"تحليل التكاليف",showReport:"عرض التقرير",allVehicles:"عرض كل المركبات",allTasks:"عرض كل المهام",newOrder:"أمر جديد",calendar:"التقويم",driverManage:"إدارة السائقين",documents:"المستندات",logs:"عرض السجلات",deploy:"النشر",systemLogs:"سجلات النظام",availability:"التوفر",utilization:"الاستخدام",costPerKm:"التكلفة / كم",apiStatus:"حالة API",database:"قاعدة البيانات",server:"الخادم",backup:"النسخ الاحتياطي",healthy:"سليم",stable:"يعمل بثبات",allSystemsActive:"كل الأنظمة نشطة",today2:"اليوم",tomorrow:"غدًا",monthCurrent:"هذا الشهر",activeVehicles:"مركبات نشطة",inMaintenance:"في الصيانة",outOfService:"خارج الخدمة",quickAccess:"وصول سريع",systemStatus:"حالة النظام",todaysTasks:"مهام اليوم",overviewFleet:"نظرة عامة على الأسطول",currentKpis:"المؤشرات الحالية",focusDriver:"التركيز: الانطلاق والسلامة",focusWorkshop:"التركيز: الأعمال والإصلاحات",focusFleet:"التركيز: المركبات والحالة",focusBoss:"التركيز: المؤشرات والتحليلات",focusDev:"التركيز: النظام والمراقبة",perfectTranslationNote:"تم تغيير اللغة. تمت ترجمة النصوص الجديدة؛ يُنصح بمراجعة متحدث أصلي قبل التشغيل الفعلي."}
};
function rt(k){var lang=S.lang||"de";return (ROLE_LABELS[lang]&&ROLE_LABELS[lang][k])||(ROLE_LABELS.de&&ROLE_LABELS.de[k])||tt(k)}

function currentVehicle(){if(!S.user)return null;var list=assignedVehicles();var found=S.vehicles.find(function(v){return v.id===S.activeVehicle});if(found&&(admin()||work()||found.assigned===S.user.id||!found.assigned))return found;if(list[0]){S.activeVehicle=list[0].id;return list[0]}return null}
function daysUntil(date){if(!date)return null;var d=new Date(date);if(isNaN(d.getTime()))return null;var today=new Date();today.setHours(0,0,0,0);return Math.ceil((d-today)/86400000)}
function todayCheckDone(){var today=new Date().toLocaleDateString();return S.inspections.some(function(i){return i.driver===S.user.id&&i.date.indexOf(today)>=0})}
function notificationItems(){var items=[];var v=currentVehicle();if(S.user&&S.user.role==="driver"&&!todayCheckDone())items.push({text:tt("missingCheck")});if(v){[["HU/TÜV",v.hu],["SP",v.sp],[t("tacho"),v.tacho]].forEach(function(x){var days=daysUntil(x[1]);if(days!==null&&days<60)items.push({text:x[0]+": "+(days<0?t("expired"):days+" "+t("daysLeft"))})})}S.damages.filter(function(d){return d.status!=="done"&&(admin()||work()||d.driver===S.user.id)}).forEach(function(d){items.push({text:tt("damageOpen")+": "+(d.vehicle||"-")+" "+(d.position||"")})});if(admin()){S.vehicles.forEach(function(vv){[["HU/TÜV",vv.hu],["SP",vv.sp],[t("tacho"),vv.tacho]].forEach(function(x){var days=daysUntil(x[1]);if(days!==null&&days<60)items.push({text:(vv.name||vv.plate)+" · "+x[0]+": "+(days<0?t("expired"):days+" "+t("daysLeft"))})})})}var lic=S.user?driverLicenseFor(S.user.id):null;if(lic){var ld=daysUntil(lic.date);if(ld!==null&&ld<60)items.push({text:tt("licenseCheck")+": "+(ld<0?t("expired"):ld+" "+t("daysLeft"))})}S.maintenance.filter(function(m){return m.status!=="done"}).forEach(function(m){var md=daysUntil(m.date);if(md!==null&&md<60&&(admin()||work()||(currentVehicle()&&currentVehicle().id===m.vehicle)))items.push({text:tt("maintenancePlanner")+": "+vehicleName(m.vehicle)+" · "+m.type+" · "+(md<0?t("expired"):md+" "+t("daysLeft"))})});return items}
function vehicleChoiceHtml(){var list=driverSelectableVehicles();if(!list.length)return '<div class="warn">'+tt("noVehiclesCreated")+'</div>';return '<select id="myVehicleSelect">'+list.map(function(v){return '<option value="'+v.id+'" '+(S.activeVehicle===v.id?'selected':'')+'>'+v.name+' · '+v.plate+'</option>'}).join("")+'</select><button onclick="saveMyVehicleChoice()">'+tt("saveVehicleChoice")+'</button>'}
function saveMyVehicleChoice(){var el=document.getElementById("myVehicleSelect");if(!el)return;var id=Number(el.value);S.activeVehicle=id;var v=S.vehicles.find(function(x){return x.id===id});if(v&&S.user&&S.user.role==="driver"){v.assigned=S.user.id;S.vehicles=S.vehicles.map(function(x){return x.id===id?v:x});saveAll()}alert(tt("vehicleSaved"));render()}


function driverLicenseFor(id){return S.licenses.find(function(x){return x.driver===id})}
function saveLicense(){var driverId=admin()?Number(document.getElementById("licDriver").value):S.user.id;var date=document.getElementById("licDate").value;if(!date){alert(t("required"));return}var found=driverLicenseFor(driverId);if(found){found.date=date}else{S.licenses.push({id:Date.now(),driver:driverId,date:date})}saveAll();alert(tt("saved"));render()}
function vehicleName(id){var v=S.vehicles.find(function(x){return x.id===Number(id)});return v?(v.name+" · "+v.plate):"-"}
function deadlineBadge(date){var days=daysUntil(date);if(days===null)return "-";var c=days<0?"red":days<30?"orange":days<60?"yellow":"green";var txt=days<0?t("expired"):days+" "+t("daysLeft");return '<span class="tag '+c+'">'+txt+'</span>'}
function addMaintenance(){var v=Number(document.getElementById("mVehicle").value),type=document.getElementById("mType").value,date=document.getElementById("mDate").value,note=document.getElementById("mNote").value;if(!v||!type||!date){alert(t("required"));return}S.maintenance.unshift({id:Date.now(),vehicle:v,type:type,date:date,note:note,status:"open"});saveAll();render()}
function doneMaintenance(id){S.maintenance=S.maintenance.map(function(m){return m.id===id?Object.assign({},m,{status:"done"}):m});saveAll();render()}
function addCost(){var v=Number(document.getElementById("cVehicle").value),cat=document.getElementById("cCat").value,amount=Number(document.getElementById("cAmount").value),note=document.getElementById("cNote").value;if(!v||!cat||!amount){alert(t("required"));return}S.costs.unshift({id:Date.now(),vehicle:v,category:cat,amount:amount,note:note,date:new Date().toLocaleDateString()});saveAll();render()}
function addDocument(){var v=Number(document.getElementById("docVehicle").value),name=document.getElementById("docName").value,type=document.getElementById("docType").value,file=document.getElementById("docFile");var fname=file&&file.files&&file.files[0]?file.files[0].name:"";if(!v||!name){alert(t("required"));return}S.docs.unshift({id:Date.now(),vehicle:v,name:name,type:type,file:fname,date:new Date().toLocaleDateString()});saveAll();render()}
function criticalIndexes(){var labels=CHECKS[S.lang]||CHECKS.de;var words=["brems","brake","lenk","steer","reifen","tire","licht","light","beleuchtung"];var out=[];labels.forEach(function(l,i){var low=String(l).toLowerCase();if(words.some(function(w){return low.indexOf(w)>=0}))out.push(i)});return out}
function createCriticalDamage(record){var labels=CHECKS[S.lang]||CHECKS.de;var crit=criticalIndexes().filter(function(i){return S.comments[i]&&S.comments[i].trim()});if(!crit.length)return;var text=crit.map(function(i){return labels[i]+": "+S.comments[i]}).join(" | ");S.damages.unshift({id:Date.now(),driver:S.user.id,driverName:S.user.name,vehicle:record.vehicle,position:tt("criticalDefects"),description:text,photo:(record.photos||[]).join(", "),status:"open",critical:true})}
function bonusText(points){if(points>=300)return "300+ Bonus";if(points>=200)return "200+ Bonus";if(points>=100)return "100+ Bonus";return "-"}


function pointTotal(id){
 return (S.points||[]).filter(function(p){return Number(p.driver)===Number(id)}).reduce(function(a,p){return a+Number(p.value||0)},0);
}


function greetKey(){var h=new Date().getHours();return h<5?"night":h<11?"morning":h<18?"day":h<22?"evening":"night"}function greet(){return t(greetKey())+", "+S.user.name.split(" ")[0]+"!"}function icon(){var k=greetKey();return k==="evening"?"🌇":k==="night"?"🌙":"☀️"}
function setLang(v){
 S.lang=v;
 if(S.user){
   S.user.language=v;
   S.users=S.users.map(function(u){return u.id===S.user.id?S.user:u});
   saveAll();
 }
 render();
}
function setTheme(v){S.theme=v;render()}function togglePassword(){var el=document.getElementById('loginPass');if(el)el.type=el.type==='password'?'text':'password'}

function login(e){
 e.preventDefault();
 normalizePilotUsers();
 var n=(document.getElementById("loginName").value||"").trim().toLowerCase();
 var p=(document.getElementById("loginPass").value||"").trim();
 var u=S.users.find(function(x){
   return String(x.login||x.user||"").trim().toLowerCase()===n && String(x.password||x.pass||"").trim()===p;
 });
 if(!u){alert(t("loginFailed"));return}
 S.user=Object.assign({},u);
 S.lang=u.language||"de";
 S.tab="home";
 var av=S.vehicles.filter(function(v){return v.assigned===S.user.id});
 if(av[0])S.activeVehicle=av[0].id;
 render();
}

function logout(){
 S.user=null;
 S.tab="home";
 NAV_HISTORY=[];
 render();
}
function go(tab){if(S.tab&&S.tab!==tab)NAV_HISTORY.push(S.tab);S.tab=tab;render()}function base(){document.body.classList.toggle("dark",S.theme==="dark");document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==="ar"?"rtl":"ltr"}
function topbar(){var count=notificationItems().length;return '<header class="top"><div class="topbar nohamb"><div></div><div class="brand">'+(LOGO?'<img src="'+LOGO+'">':'')+'<span>FLEET CONTROL</span></div><button class="bellBtn" onclick="go(\'notifications\')">🔔'+(count?'<span class="bellBadge">'+count+'</span>':'')+'</button></div></header>'}

function loginView(){
 return '<div class="loginPage lm-login">'+
 '<section class="lm-login-left">'+
 '<div class="lm-brand"><div class="lm-logo">F</div><div><h1>FLEET CONTROL</h1><p>Einfach. Sicher. Zuverlässig.</p></div></div>'+
 '<div class="lm-welcome"><h2>Willkommen zurück.</h2><p>Bitte melde dich an, um fortzufahren.</p></div>'+
 '<form onsubmit="login(event)" class="lm-login-form">'+
 '<label class="lm-field"><span>👤</span><input id="loginName" placeholder="'+t("username")+'"></label>'+
 '<label class="lm-field passwordField"><span>🔒</span><input id="loginPass" type="password" placeholder="'+t("password")+'"><button type="button" class="showPassBtn" onclick="togglePassword()">👁</button></label>'+
 '<button class="lm-primary" type="submit">↪ '+t("login")+'</button>'+
 '</form>'+
 '<div class="lm-role-title">Rollen im Pilotprojekt</div>'+
 '<div class="lm-role-grid">'+
 '<div class="lm-role">👤<b>Fahrer</b><small>Abfahrt & Kontrolle</small></div>'+
 '<div class="lm-role">🔧<b>Werkstatt</b><small>Reparatur & Wartung</small></div>'+
 '<div class="lm-role">🚛<b>Fuhrpark</b><small>Fahrzeuge & Status</small></div>'+
 '<div class="lm-role">📊<b>Chef</b><small>Kennzahlen & Boni</small></div>'+
 '<div class="lm-role">⌘<b>Entwickler</b><small>System & Daten</small></div>'+
 '</div>'+
 '<div class="lm-footer">🌐 '+(S.lang||"de").toUpperCase()+' · Datenschutz · Hilfe</div>'+
 '</section>'+
 '<section class="lm-login-right">'+
 '<div class="lm-hero-card"><h2>Ihre Flotte. Ihre Kontrolle.</h2><p>Behalte Fahrzeuge, Fahrer, Wartungen, Schäden und Kosten jederzeit im Blick.</p><div class="lm-benefits"><span>🛡 Sicher</span><span>☁ Cloud-ready</span><span>📱 Mobil</span><span>⚡ Schnell</span></div><small>Version 17.8 · Lavender Mist</small></div>'+
 '</section>'+
 '</div>'
}



function shell(content){
 var nav;
 if(dev()){
   nav=[["home","⌂",t("home")],["fleetlive","▦",rt("system")],["notifications","◷",rt("monitoring")],["more","☰",t("more")]];
 }else if(S.user&&S.user.role==="workshop"){
   nav=[["home","⌂",t("home")],["maintenance","🔧",tt("maintenancePlanner")],["report","⚠",t("report")],["more","☰",t("more")]];
 }else if(S.user&&S.user.role==="fleet"){
   nav=[["home","⌂",t("home")],["vehicles","🚚",t("vehicles")],["fleetlive","▦",tt("fleetLive")],["more","☰",t("more")]];
 }else if(S.user&&S.user.role==="boss"){
   nav=[["home","⌂",t("home")],["ranking","▥",rt("reports")],["costs","◔",rt("costAnalysis")],["more","☰",t("more")]];
 }else{
   nav=[["home","⌂",t("home")],["vehicles","🚚",t("vehicles")],["notifications","☑",t("tasks")||tt("notifications")],["more","☰",t("more")]];
 }
 return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+tt("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>'
}




function roleHeader(icon,label,focus){return '<div class="rolePageTitle"><span class="roleIcon">'+icon+'</span><div><h1>'+label+'</h1><p>'+focus+'</p></div></div>'}
function miniSpark(color){return '<svg class="spark" viewBox="0 0 120 34" aria-hidden="true"><polyline points="4,26 22,20 38,22 55,13 74,17 92,9 116,14" fill="none" stroke="'+color+'" stroke-width="3" stroke-linecap="round"/></svg>'}
function statusDot(cls){return '<span class="statusDot '+cls+'"></span>'}
function roleCard(icon,title,sub,badge,goTo){var click=goTo?(" onclick=\"go('"+goTo+"')\""):"";return '<div class="roleCard"'+click+'><div class="roleCardIcon">'+icon+'</div><div><b>'+title+'</b><small>'+sub+'</small></div>'+(badge?'<span class="pill">'+badge+'</span>':'<span class="chev">›</span>')+'</div>'}
function statCard(icon,title,value,goTo,cls){var click=goTo?(" onclick=\"go('"+goTo+"')\""):"";return '<div class="statCard '+(cls||'')+'"'+click+'><div class="statIcon">'+icon+'</div><div><small>'+title+'</small><b>'+value+'</b></div><span class="chev">›</span></div>'}
function activeComboHtml(){
 var v=currentVehicle();
 var list=assignedVehicles();
 if(!v&&list[0])v=list[0];
 var trailer=(S.vehicles||[]).find(function(x){return x.type==="trailer"&&(x.assigned===(S.user&&S.user.id)||admin())});
 return '<div class="comboBox">'+
   '<div class="truckThumb">🚛</div><div><b>'+(v?v.name:"MAN TGX 18.480")+'</b><small>'+(v?v.plate:"DU-MH-123")+'</small></div>'+
   '<div class="comboStatus">'+statusDot("ok")+' Aktiv</div>'+
   (trailer?'<div class="truckThumb trailer">▰</div><div><b>'+trailer.name+'</b><small>'+trailer.plate+'</small></div>':'<div class="truckThumb trailer">▰</div><div><b>KRONE Mega Liner</b><small>DU-AH-456</small></div>')+
 '</div>'
}
function settingsButton(){return "<button class='settingsBtn' onclick=\"go('more')\">⚙</button>"}




function home(){
 if(dev())return developerHome();
 if(S.user&&S.user.role==="workshop")return workshopHome();
 if(S.user&&S.user.role==="fleet")return chefHome();
 if(S.user&&S.user.role==="boss")return chefHome();
 if(S.user&&S.user.role==="admin")return chefHome();
 if(S.user&&S.user.role==="driver")return driverHome();
 if(isWorkshopRole()&&!isBossRole()&&!isFleetRole())return workshopHome();
 if(isFleetRole()&&!isBossRole())return chefHome();
 if(isBossRole())return chefHome();
 return driverHome();
}


function driverHome(){
 var last=S.inspections.filter(function(i){return i.driver===S.user.id}).slice(-1)[0];
 var open=S.damages.filter(function(d){return d.status!=="done"&&d.driver===S.user.id}).length;
 return shell(roleHeader("👤",rt("driver"),rt("focusDriver"))+
 '<section class="rolePhone driverPhone"><div class="phoneGreeting"><span>'+greet().replace(",",",")+'</span>'+settingsButton()+'</div>'+
 '<h2>'+S.user.name.split(" ")[0]+' 👋</h2>'+
 '<p class="miniLabel">'+tt("chooseMyVehicle").toUpperCase()+'</p>'+activeComboHtml()+
 '<button class="mainAction" onclick="go(\'check\')"><span class="mainIcon">☑</span><span>'+t("departureCheck")+'</span><span class="chev">›</span></button>'+
 '<section class="todayList"><p class="miniLabel">'+rt("today2").toUpperCase()+'</p>'+
 '<div onclick="go(\'report\')">'+statusDot(open?"bad":"ok")+' '+(open?open+" "+t("openDamages"):tt("noNotifications").replace("Keine ","Keine offenen "))+'<span>›</span></div>'+
 '<div onclick="go(\'maintenance\')">'+statusDot("warn")+' '+tt("maintenancePlanner")+' in 30 Tagen<span>›</span></div>'+
 '<div onclick="go(\'points\')">☆ '+pointTotal(S.user.id)+' '+t("points")+'<span>›</span></div>'+
 '</section></section>')
}



function driverOnlineState(d){
 return todayCheckDoneFor(d.id)?'<span class="pill ok">Kontrolle erledigt</span>':'<span class="pill warn">Kontrolle offen</span>';
}
function todayCheckDoneFor(id){
 var today=new Date().toLocaleDateString();
 return (S.inspections||[]).some(function(i){return i.driver===id&&String(i.date||"").indexOf(today)>=0});
}
function driverLastCheck(id){var list=(S.inspections||[]).filter(function(i){return i.driver===id});return list.length?list[list.length-1].date:"-"}
function licenseText(id){var lic=(S.licenses||[]).find(function(x){return x.driver===id});return lic?lic.date:"nicht hinterlegt"}
function costSum(){return (S.costs||[]).reduce(function(a,c){return a+Number(c.amount||0)},0)}
function damageCostEstimate(){return (S.damages||[]).reduce(function(a,d){return a+(d.estimate?Number(d.estimate):150)},0)}
function chefFullOverview(){
 var drivers=allDrivers();
 var driverRows=drivers.map(function(d){var dmg=(S.damages||[]).filter(function(x){return x.driver===d.id}).length;return '<div class="row chefRow"><span><b>'+d.name+'</b><br><small class="muted">Login: '+(d.login||"-")+' · Rolle: '+d.role+((d.extraRoles&&d.extraRoles.length)?' + '+d.extraRoles.join(", "):'')+'<br>Letzte Abfahrtskontrolle: '+driverLastCheck(d.id)+' · Führerschein: '+licenseText(d.id)+' · Schäden: '+dmg+'</small></span>'+driverOnlineState(d)+'</div>'}).join("");
 var vehicleRows=(S.vehicles||[]).map(function(v){var u=(S.users||[]).find(function(x){return x.id===v.assigned});return '<div class="row chefRow"><span><b>'+v.name+' · '+v.plate+'</b><br><small class="muted">Fahrer: '+(u?u.name:"nicht zugewiesen")+' · HU/TÜV: '+(v.hu||"-")+' · SP: '+(v.sp||"-")+' · '+t("tacho")+': '+(v.tacho||"-")+'</small></span><span>'+deadlineBadge(v.hu)+' '+deadlineBadge(v.sp)+' '+deadlineBadge(v.tacho)+'</span></div>'}).join("");
 var damageRows=(S.damages||[]).map(function(d){var u=(S.users||[]).find(function(x){return x.id===d.driver});return '<div class="row chefRow"><span><b>'+(d.vehicle||"-")+'</b><br><small class="muted">Fahrer: '+(u?u.name:"-")+' · '+(d.position||"")+' · '+(d.description||"")+' · Status: '+statusText(d.status)+'</small></span><span>'+((d.photo||"")?'📸':'')+'</span></div>'}).join("");
 var docRows=(S.docs||[]).map(function(d){return '<div class="row chefRow"><span><b>'+d.name+'</b><br><small class="muted">'+vehicleName(d.vehicle)+' · '+(d.type||"Dokument")+' · '+(d.file||"")+'</small></span><span>📄</span></div>'}).join("");
 return '<section class="chefFullGrid">'+
 '<div class="kpiCard"><span>Fahrer gesamt</span><b>'+drivers.length+'</b>'+miniSpark("#B9BDD8")+'</div>'+
 '<div class="kpiCard"><span>Fahrzeuge gesamt</span><b>'+(S.vehicles||[]).length+'</b>'+miniSpark("#A7C5AE")+'</div>'+
 '<div class="kpiCard"><span>Offene Schäden</span><b>'+(S.damages||[]).filter(function(d){return d.status!=="done"}).length+'</b>'+miniSpark("#D3A8A8")+'</div>'+
 '<div class="kpiCard"><span>Kosten gesamt</span><b>'+costSum().toFixed(2)+' €</b>'+miniSpark("#AFC1D4")+'</div>'+
 '<div class="kpiCard"><span>Schadenssumme kalkuliert</span><b>'+damageCostEstimate().toFixed(2)+' €</b>'+miniSpark("#D8C8A7")+'</div></section>'+
 '<section class="card"><h2>Alle Fahrer / Status & Abfahrtskontrolle</h2>'+(driverRows||'<p class="muted">'+tt("noData")+'</p>')+'</section>'+
 '<section class="card"><h2>Alle Fahrzeuge / HU / TÜV / SP</h2>'+(vehicleRows||'<p class="muted">'+tt("noData")+'</p>')+'</section>'+
 '<section class="card"><h2>Alle Schäden der Fahrzeuge</h2>'+(damageRows||'<p class="muted">'+tt("noData")+'</p>')+'</section>'+
 '<section class="card"><h2>Alle Dokumente</h2>'+(docRows||'<p class="muted">'+tt("noData")+'</p>')+'</section>'+
 '<section class="card"><h2>Führerscheine der Fahrer</h2>'+drivers.map(function(d){return '<div class="row chefRow"><span><b>'+d.name+'</b><br><small class="muted">Führerschein gültig bis: '+licenseText(d.id)+'</small></span></div>'}).join("")+'</section>';
}

function chefHome(){
 var isFleet=S.user&&S.user.role==="fleet";
 var open=S.damages.filter(function(d){return d.status!=="done"}).length;
 if(isFleet){
   return shell(roleHeader("🚚",rt("fleet"),rt("focusFleet"))+
   '<section class="rolePhone"><div class="phoneGreeting"><span>Hallo,</span>'+settingsButton()+'</div><h2>'+S.user.name+' 🏢</h2>'+
   '<p class="miniLabel">'+rt("overviewFleet").toUpperCase()+' <span class="pill">'+S.vehicles.length+' '+t("vehicles")+'</span></p>'+
   statCard("🚚",rt("activeVehicles"),String(S.vehicles.length||32),"fleetlive","ok")+
   statCard("🔧",rt("inMaintenance"),String(S.maintenance.length||6),"maintenance","warn")+
   statCard("⛔",rt("outOfService"),String(open||4),"damageSummary","bad")+
   '<button class="mainAction small" onclick="go(\'fleetlive\')">'+rt("allVehicles")+' <span>›</span></button>'+
   '<p class="miniLabel">'+rt("quickAccess").toUpperCase()+'</p><div class="quickGrid"><button onclick="go(\'vehicles\')">👤<br>'+rt("driverManage")+'</button><button onclick="go(\'documents\')">📄<br>'+rt("documents")+'</button></div></section>')
 }
 return shell(roleHeader("📊",rt("boss"),rt("focusBoss"))+
 '<section class="rolePhone"><div class="phoneGreeting"><span>'+greet()+'</span>'+settingsButton()+'</div><h2>'+S.user.name.split(" ")[0]+'</h2>'+
 '<p class="miniLabel">'+rt("currentKpis").toUpperCase()+' <span class="pill">'+rt("monthCurrent")+'</span></p>'+
 '<div class="kpiCard"><span>'+rt("availability")+'</span><b>98 %</b>'+miniSpark("#B9BDD8")+'</div>'+
 '<div class="kpiCard"><span>'+rt("utilization")+'</span><b>85 %</b>'+miniSpark("#A7C5AE")+'</div>'+
 '<div class="kpiCard"><span>'+rt("costPerKm")+'</span><b>0,98 €</b>'+miniSpark("#AFC1D4")+'</div>'+
 '<div class="kpiCard"><span>'+t("openDamages")+'</span><b>'+open+'</b>'+miniSpark("#D3A8A8")+'</div>'+
 '<button class="mainAction small" onclick="go(\'ranking\')">'+rt("showReport")+' <span>›</span></button>'+
 '<p class="miniLabel">'+rt("quickAccess").toUpperCase()+'</p><div class="quickGrid"><button onclick="go(\'damageSummary\')">▥<br>'+rt("reports")+'</button><button onclick="go(\'costs\')">◔<br>'+rt("costAnalysis")+'</button></div></section>'+chefFullOverview())
}


function workshopHome(){
 var open=S.damages.filter(function(d){return d.status!=="done"}).length;
 var tasks=S.maintenance.filter(function(m){return m.status!=="done"}).slice(0,3);
 var html=roleHeader("🔧",rt("workshop"),rt("focusWorkshop"))+
 '<section class="rolePhone"><div class="phoneGreeting"><span>Hallo,</span>'+settingsButton()+'</div><h2>'+S.user.name+' 🔧</h2>'+
 '<p class="miniLabel">'+rt("todaysTasks").toUpperCase()+' <span class="pill">'+(open+tasks.length)+' offen</span></p>'+
 roleCard("🔧","Wartung fällig","MAN TGX 18.480","Heute","maintenance")+
 roleCard("◎","Reifenprüfung","KRONE Mega Liner","Heute","maintenance")+
 roleCard("◎","Bremsenprüfung","MAN TGX 18.440","Morgen","maintenance")+
 '<button class="mainAction small" onclick="go(\'maintenance\')">'+rt("allTasks")+' <span>›</span></button>'+
 '<p class="miniLabel">'+rt("quickAccess").toUpperCase()+'</p><div class="quickGrid">'+
 '<button onclick="go(\'report\')">＋<br>'+rt("newOrder")+'</button><button onclick="go(\'maintenance\')">▣<br>'+rt("calendar")+'</button></div></section>';
 return shell(html)
}

function vehicles(){var can=admin()||work();var list=assignedVehicles();return shell('<h1 class="sectionTitle">'+t("vehiclesTitle")+'</h1>'+(can?vehicleForm():"")+(list.map(function(v){return '<div class="card"><h2>'+v.name+'</h2><p>'+v.plate+' · '+t(v.type)+'</p><p>HU/TÜV: '+(v.hu||"-")+' · SP: '+(v.sp||"-")+' · '+t("tacho")+': '+(v.tacho||"-")+'</p>'+(can?'<button class="danger" onclick="removeVehicle('+v.id+')">'+t("delete")+'</button>':"")+'</div>'}).join("")||'<div class="warn">'+t("notAssigned")+'</div>'))}
function vehicleForm(){var drivers=allDrivers();return '<section class="card"><h2>'+t("addVehicle")+'</h2><input id="vName" placeholder="'+t("name")+'"><input id="vPlate" placeholder="'+t("plate")+'"><select id="vType"><option value="vehicle">'+t("vehicle")+'</option><option value="trailer">'+t("trailer")+'</option></select><select id="vAssigned"><option value="">'+t("assigned")+'</option>'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select><label>'+t("hu")+'<input id="vHu" type="date"></label><label>'+t("sp")+'<input id="vSp" type="date"></label><label>'+t("tacho")+'<input id="vTacho" type="date"></label><button onclick="addVehicle()">'+t("save")+'</button></section>'}
function addVehicle(){var n=document.getElementById("vName").value,p=document.getElementById("vPlate").value;if(!n||!p){alert(t("required"));return}S.vehicles.push({id:Date.now(),name:n,plate:p,type:document.getElementById("vType").value,assigned:Number(document.getElementById("vAssigned").value)||"",hu:document.getElementById("vHu").value,sp:document.getElementById("vSp").value,tacho:document.getElementById("vTacho").value});saveAll();render()}function removeVehicle(id){S.vehicles=S.vehicles.filter(function(v){return v.id!==id});saveAll();render()}

function check(){
 ensurePilotVehicle();
 var av=(S.user&&S.user.role==="driver")?driverSelectableVehicles():assignedVehicles();
 if(!av.length)av=S.vehicles||[];
 var labels=CHECKS[S.lang]||CHECKS.de;
 var options=av.map(function(v){return '<option value="'+v.id+'" '+(S.activeVehicle===v.id?'selected':'')+'>'+v.name+' · '+v.plate+'</option>'}).join("");
 return shell('<h1 class="sectionTitle">'+t("departureCheck")+'</h1>'+
 '<section class="card warn"><b>'+t("mustCheck")+'</b><p>'+t("laborNotice")+'</p></section>'+
 '<section class="card"><label>'+t("vehicle")+'<select id="checkVehicle">'+options+'</select></label>'+
 '<p class="muted">'+tt("checkboxRequired")+'</p></section>'+
 '<section class="card">'+labels.map(function(x,i){return '<label class="checkrow"><input type="checkbox" id="chk'+i+'" '+(S.checks[i]?'checked':'')+' onchange="S.checks['+i+']=this.checked"> <span>'+x+'</span></label><textarea id="cmt'+i+'" placeholder="'+tt("commentOptional")+'" oninput="S.comments['+i+']=this.value">'+(S.comments[i]||'')+'</textarea>'}).join("")+'</section>'+
 '<section class="card"><h2>'+t("damagePhotos")+'</h2><p class="muted">'+tt("damagePhotoHint")+'</p><input id="damagePhotos" type="file" accept="image/*" multiple></section>'+
 '<section class="card"><h2>'+t("signature")+'</h2><canvas id="sig" width="600" height="240"></canvas><button class="secondary" onclick="clearSig()">'+t("clear")+'</button></section>'+
 '<button class="lm-primary primary" onclick="completeCheck('+labels.length+')">'+t("complete")+'</button>')
}

function setDamagePhotos(files){S.damagePhotos=[];for(var i=0;i<files.length;i++){S.damagePhotos.push(files[i].name)}render()}


function initSig(){
 var c=document.getElementById("sig");
 if(!c)return;
 var ctx=c.getContext("2d");
 ctx.lineWidth=3;ctx.lineCap="round";ctx.strokeStyle="#111";
 var drawing=false,last=null;
 function pos(e){var r=c.getBoundingClientRect();var p=e.touches&&e.touches[0]?e.touches[0]:e;return {x:(p.clientX-r.left)*(c.width/r.width),y:(p.clientY-r.top)*(c.height/r.height)}}
 function start(e){drawing=true;last=pos(e);if(e.preventDefault)e.preventDefault()}
 function move(e){if(!drawing)return;var p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;try{S.sig=c.toDataURL("image/png")}catch(err){};if(e.preventDefault)e.preventDefault()}
 function end(e){drawing=false;try{S.sig=c.toDataURL("image/png")}catch(err){};if(e&&e.preventDefault)e.preventDefault()}
 c.onmousedown=start;c.onmousemove=move;c.onmouseup=end;c.onmouseleave=end;c.ontouchstart=start;c.ontouchmove=move;c.ontouchend=end;
}




function clearSig(){var c=document.getElementById("sig");if(c){var ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height)}S.sig=""}







function inspectionPdfHtml(record){
 return '<html><head><title>Abfahrtskontrolle</title><style>body{font-family:Arial;padding:24px}h1{margin-bottom:4px}.ok{color:#15803d}.muted{color:#666}li{margin:6px 0}</style></head><body>'+
 '<h1>Abfahrtskontrolle</h1><p class="muted">'+(record.date||"")+'</p>'+
 '<p><b>Fahrer:</b> '+(record.driverName||"")+'</p><p><b>Fahrzeug:</b> '+(record.vehicle||"")+'</p>'+
 '<h2>Prüfpunkte</h2><ul>'+((record.checks||[]).map(function(c){return '<li><span class="ok">✓</span> '+c.label+(c.comment?' – '+c.comment:'')+'</li>'}).join(""))+'</ul>'+
 '<h2>Fotos</h2><p>'+((record.photos||[]).join(", ")||"Keine Fotos")+'</p>'+
 '<h2>Unterschrift</h2><p>'+(record.signature?"Digital vorhanden":"Nicht vorhanden")+'</p></body></html>';
}



function queueInspectionMail(record){
 S.mailQueue=S.mailQueue||[];
 var item={id:Date.now(),to:MAIL_TO,subject:"Abfahrtskontrolle "+(record.vehicle||"")+" "+(record.date||""),type:"inspection_pdf",inspectionId:record.id,status:"prepared_backend_required",pdfHtml:inspectionPdfHtml(record),note:"Automatischer Versand an hinterlegte E-Mail ist vorbereitet. Echter Versand benötigt Backend/Mailservice.",created:new Date().toLocaleString()};
 S.mailQueue.unshift(item);
 saveAll();
 return item;
}




function openPdf(record){
 var html='<html><head><title>Abfahrtskontrolle</title><style>body{font-family:Arial;padding:24px}h1{margin-bottom:4px}.row{margin:8px 0}.ok{color:#15803d}.muted{color:#666}</style></head><body>'+
 '<h1>Abfahrtskontrolle</h1>'+
 '<p class="muted">'+(record.date||"")+'</p>'+
 '<div class="row"><b>Fahrer:</b> '+(record.driverName||"")+'</div>'+
 '<div class="row"><b>Fahrzeug:</b> '+(record.vehicle||"")+'</div>'+
 '<h2>Prüfpunkte</h2>'+
 '<ul>'+((record.checks||[]).map(function(c){return '<li><span class="ok">✓</span> '+c.label+(c.comment?' – '+c.comment:'')+'</li>'}).join(""))+'</ul>'+
 '<h2>Fotos</h2><p>'+((record.photos||[]).join(", ")||"Keine Fotos")+'</p>'+
 '<p class="muted">PDF/Druck über Browserfunktion speichern.</p>'+
 '</body></html>';
 try{
   var w=window.open("", "_blank");
   if(w&&w.document){w.document.write(html);w.document.close();if(w.print)setTimeout(function(){w.print()},200)}
 }catch(e){console.log("PDF/Druck konnte nicht geöffnet werden",e)}
}




function completeCheck(n){
 var vehicleSelect=document.getElementById("checkVehicle");
 var vehicleId=vehicleSelect?Number(vehicleSelect.value):0;
 if(!vehicleId){alert(t("required"));return}
 for(var i=0;i<n;i++){var el=document.getElementById("chk"+i);var checked=el?el.checked:S.checks[i];S.checks[i]=!!checked;if(!checked){alert(tt("allChecksRequired"));return}}
 var v=(S.vehicles||[]).find(function(x){return x.id===vehicleId});
 S.activeVehicle=vehicleId;
 if(v&&S.user&&S.user.role==="driver"){v.assigned=S.user.id}
 var photos=document.getElementById("damagePhotos");
 var photoNames=photos&&photos.files?Array.from(photos.files).map(function(f){return f.name}):[];
 var sigCanvas=document.getElementById("sig");
 if(sigCanvas&&!S.sig){try{S.sig=sigCanvas.toDataURL("image/png")}catch(e){}}
 var labels=CHECKS[S.lang]||CHECKS.de;
 var record={id:Date.now(),driver:S.user.id,driverName:S.user.name,vehicleId:vehicleId,vehicle:v?(v.name+" "+v.plate):"",date:new Date().toLocaleString(),fixed:!!S.fixed,checks:labels.map(function(label,i){return {label:label,checked:!!S.checks[i],comment:S.comments[i]||""}}),photos:photoNames,signature:S.sig||""};
 S.inspections=S.inspections||[];
 S.inspections.push(record);
 createCriticalDamage(record);
 if(S.user)S.user.status="green";
 queueInspectionMail(record);
 saveAll();
 S.checks={};S.comments={};S.sig="";
 alert("Abfahrtskontrolle abgeschlossen. PDF wurde automatisch für den Versand an "+MAIL_TO+" vorbereitet.");
 S.tab="home";render();
}




function createPdf(r){var rows=r.items.map(function(i,n){return "<tr><td>"+(n+1)+"</td><td>"+(i.label||"")+"</td><td>OK</td><td>"+(i.comment||"")+"</td></tr>"}).join("");var photos=(r.photos||[]).map(function(p){return "<li>"+p+"</li>"}).join("");var sig=r.signature?'<img src="'+r.signature+'" style="max-width:300px;border:1px solid #999">':"";var doc="<html><head><title>PDF</title><style>body{font-family:Arial;padding:24px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:6px}</style></head><body><h1>"+t("appTitle")+"</h1><p>"+t("driverPdf")+": "+r.driverName+"</p><p>"+t("vehicle")+": "+r.vehicle+"</p><p>"+t("fixedTrain")+": "+r.fixed+"</p><p>"+t("date")+": "+r.date+"</p><p>"+t("mailTo")+": "+r.mail+"</p><table><tr><th>#</th><th>"+t("check")+"</th><th>"+t("status")+"</th><th>"+t("comment")+"</th></tr>"+rows+"</table><h2>"+t("damagePhotos")+"</h2><p>"+(r.damageDesc||"")+"</p><ul>"+photos+"</ul><h2>"+t("signature")+"</h2>"+sig+"</body></html>";var w=window.open("","_blank");if(!w){return}w.document.write(doc);w.document.close();try{w.print()}catch(e){}}

function report(){
 var vehicleOptions=(S.vehicles||[]).map(function(v){return '<option value="'+v.name+' '+v.plate+'">'+v.name+' · '+v.plate+'</option>'}).join("");
 var form='<section class="card"><h2>'+t("reportDamage")+'</h2><select id="dVehicle">'+vehicleOptions+'</select><input id="dPosition" placeholder="'+t("position")+'"><textarea id="dDesc" placeholder="'+t("description")+'"></textarea><input id="dPhoto" type="file" accept="image/*"><button onclick="saveDamage()">'+t("save")+'</button></section>';
 return shell((S.user&&S.user.role==="driver"?form:"")+damageList());
}



function aiDamageScoreByInput(pos,desc,photo){
 var text=((pos||"")+" "+(desc||"")+" "+(photo||"")).toLowerCase();
 if(text.indexOf("bremse")>=0||text.indexOf("lenkung")>=0)return -20;
 if(text.indexOf("reifen")>=0||text.indexOf("tire")>=0)return -10;
 if(text.indexOf("ladung")>=0||text.indexOf("sicherung")>=0)return -10;
 if(text.indexOf("spiegel")>=0||text.indexOf("licht")>=0||text.indexOf("lampe")>=0)return -5;
 if(text.indexOf("kritisch")>=0||text.indexOf("unfall")>=0)return -20;
 return 0;
}
function aiDamageClassByScore(points){
 if(points<=-20)return "Kritisch";
 if(points<=-10)return "Mittel";
 if(points<0)return "Leicht";
 return "Hinweis / keine Punkte";
}


function saveDamage(){
 var vehicle=(document.getElementById("dVehicle")&&document.getElementById("dVehicle").value)||"";
 var pos=(document.getElementById("dPosition")&&document.getElementById("dPosition").value)||"";
 var desc=(document.getElementById("dDesc")&&document.getElementById("dDesc").value)||"";
 var file=document.getElementById("dPhoto");
 var photo=file&&file.files&&file.files[0]?file.files[0].name:"";
 if(!vehicle||!pos||!desc){alert(t("required"));return}
 var recommended=aiDamageScoreByInput(pos,desc,photo);
 var damage={
   id:Date.now(),
   driver:S.user?S.user.id:null,
   driverName:S.user?S.user.name:"",
   vehicle:vehicle,
   position:pos,
   description:desc,
   photo:photo,
   status:"open",
   workshop:true,
   aiTrainingLinked:true,
   source:"driverReport",
   aiRecommendation:recommended,
   aiSeverity:aiDamageClassByScore(recommended),
   aiApprovalStatus:"pending",
   approvedBy:"",
   approvedAt:"",
   pointsApplied:false,
   created:new Date().toLocaleString()
 };
 S.damages=S.damages||[];
 S.damages.unshift(damage);
 S.aiTraining=S.aiTraining||[];
 S.aiTraining.unshift({
   id:damage.id,
   file:photo,
   damageClass:pos||"Schaden",
   severity:damage.aiSeverity,
   points:recommended,
   note:"Aus Fahrerschadensmeldung übernommen: "+desc,
   confirmedBy:"",
   linkedDamageId:damage.id,
   approvalStatus:"pending",
   date:new Date().toLocaleString()
 });
 saveAll();
 alert(tt("damagePendingApproval"));
 render();
}




function approveAiDamage(id){
 if(!canApproveAiDamage()){alert(tt("notAllowed"));return}
 var d=(S.damages||[]).find(function(x){return x.id===id});
 if(!d)return;
 d.aiApprovalStatus="approved";
 d.approvedBy=S.user?S.user.name:"";
 d.approvedAt=new Date().toLocaleString();
 if(!d.pointsApplied&&Number(d.aiRecommendation||0)!==0){
   S.points=S.points||[];
   S.points.unshift({id:Date.now(),driver:d.driver,date:new Date().toLocaleDateString(),reason:"KI-Schadenfreigabe: "+(d.position||""),value:Number(d.aiRecommendation||0),by:S.user?S.user.name:""});
   d.pointsApplied=true;
 }
 (S.aiTraining||[]).forEach(function(t){if(t.linkedDamageId===id||t.id===id){t.approvalStatus="approved";t.confirmedBy=S.user?S.user.name:"";}});
 saveAll();
 alert(tt("damageApproved"));
 render();
}
function rejectAiDamage(id){
 if(!canApproveAiDamage()){alert(tt("notAllowed"));return}
 var d=(S.damages||[]).find(function(x){return x.id===id});
 if(!d)return;
 d.aiApprovalStatus="rejected";
 d.approvedBy=S.user?S.user.name:"";
 d.approvedAt=new Date().toLocaleString();
 (S.aiTraining||[]).forEach(function(t){if(t.linkedDamageId===id||t.id===id){t.approvalStatus="rejected";t.confirmedBy=S.user?S.user.name:"";}});
 saveAll();
 alert(tt("damageRejected"));
 render();
}




function damageList(){
 var visible=(S.damages||[]).filter(function(d){return admin()||work()||isChefFullAccess()||(S.user&&d.driver===S.user.id)});
 return '<section class="card"><h2>'+t("damageList")+'</h2>'+
 (visible.map(function(d){
   var approval=d.aiApprovalStatus||"pending";
   var ai='<br>🧠 '+tt("aiRecommendation")+': '+(Number(d.aiRecommendation||0)>0?"+":"")+Number(d.aiRecommendation||0)+' '+t("points")+' · '+tt("approvalStatus")+': '+tt(approval);
   var controls=(canApproveAiDamage()&&approval==="pending")?'<br><button onclick="approveAiDamage('+d.id+')">✅ '+tt("approve")+'</button><button class="secondary" onclick="rejectAiDamage('+d.id+')">✖ '+tt("reject")+'</button>':'';
   return '<div class="row"><span><b>'+(d.vehicle||"-")+'</b><br><small class="muted">'+(d.position||"")+' · '+(d.description||"")+' · '+(d.photo||"")+' · '+statusText(d.status)+ai+'<br>🔧 '+tt("workshopLinked")+'</small></span><span><button class="secondary" onclick="progressDamage('+d.id+')">'+t("markProgress")+'</button><button onclick="toggleDamage('+d.id+')">'+(d.status==="done"?t("reopen"):t("markDone"))+'</button>'+controls+'</span></div>'
 }).join("")||'<p class="muted">'+t("noReports")+'</p>')+
 '</section>'
}




function statusText(s){return s==="done"?t("done"):s==="progress"?t("inProgress"):t("open")}function progressDamage(id){S.damages=S.damages.map(function(d){return d.id===id?Object.assign({},d,{status:"progress"}):d});saveAll();render()}function toggleDamage(id){S.damages=S.damages.map(function(d){return d.id===id?Object.assign({},d,{status:d.status==="done"?"open":"done"}):d});saveAll();render()}
function statusPage(){var av=(S.user&&S.user.role==="driver")?driverSelectableVehicles():assignedVehicles();var v=S.vehicles.find(function(x){return x.id===S.activeVehicle})||av[0];if(v)S.activeVehicle=v.id;var openD=S.damages.filter(function(d){return d.status!=="done"&&(d.driver===S.user.id||admin()||work())});return shell('<h1 class="sectionTitle">'+t("statusOverview")+'</h1><section class="card"><label>'+t("chooseActiveVehicle")+'<select onchange="S.activeVehicle=Number(this.value);render()">'+av.map(function(x){return '<option value="'+x.id+'" '+(v&&v.id===x.id?'selected':'')+'>'+x.name+' · '+x.plate+'</option>'}).join("")+'</select></label></section>'+(v?'<section class="card"><h2>'+t("activeVehicle")+': '+v.name+'</h2>'+deadlineRow("HU/TÜV",v.hu)+deadlineRow("SP",v.sp)+deadlineRow(t("tacho"),v.tacho)+'</section>':'<div class="warn">'+t("noActiveVehicle")+'</div>')+'<section class="card"><h2>'+t("todos")+'</h2><div class="row"><span>'+t("openDamages")+'</span><b>'+openD.length+'</b></div><div class="row"><span>'+t("departureCheck")+'</span><b>'+todayCheckText()+'</b></div></section>')}
function deadlineRow(label,date){if(!date)return '<div class="row"><span>'+label+'</span><span class="tag yellow">-</span></div>';var d=new Date(date);var today=new Date();today.setHours(0,0,0,0);var days=Math.ceil((d-today)/86400000);var c=days<0?"red":days<30?"orange":days<60?"yellow":"green";var txt=days<0?t("expired"):days<30?t("dueVerySoon"):days<60?t("dueSoon"):t("valid");return '<div class="row"><span>'+label+'<br><small class="muted">'+date+' · '+days+' '+t("daysLeft")+'</small></span><span class="tag '+c+'">'+txt+'</span></div>'}
function todayCheckText(){var today=new Date().toLocaleDateString();return S.inspections.some(function(i){return i.driver===S.user.id && i.date.indexOf(today)>=0})?t("done"):t("open")}

function pointsPage(){
 var list=(S.points||[]).filter(function(p){return canAwardPoints()?true:Number(p.driver)===Number(S.user.id)});
 var shownId=S.user?S.user.id:0;
 return shell('<h1 class="sectionTitle">'+t("pointsHistory")+'</h1><section class="card"><h2>'+t("currentScore")+': '+pointTotal(shownId)+'</h2>'+list.map(function(p){var u=(S.users||[]).find(function(x){return Number(x.id)===Number(p.driver)});return '<div class="row"><span><b>'+(u?u.name:"")+'</b><br><small class="muted">'+p.date+' · '+p.reason+' · '+t("givenBy")+': '+p.by+'</small></span><b>'+(Number(p.value)>0?"+":"")+p.value+'</b></div>'}).join("")+(list.length?'':'<p class="muted">'+t("noPoints")+'</p>')+'</section>'+pointsForm());
}



function pointsForm(){
 if(!canAwardPoints())return "";
 var drivers=allDrivers();
 return '<section class="card"><h2>'+t("addPoints")+'</h2><select id="pDriver">'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select><input id="pValue" type="number" placeholder="'+t("points")+'"><input id="pReason" placeholder="'+t("reason")+'"><button onclick="addPoint()">'+t("save")+'</button></section>';
}




function addPoint(){
 if(!canAwardPoints()){alert(tt("notAllowed"));return}
 var driverId=Number(document.getElementById("pDriver").value);
 var value=Number(document.getElementById("pValue").value);
 var reason=document.getElementById("pReason").value;
 if(!driverId||!value||!reason){alert(t("required"));return}
 S.points=S.points||[];
 S.points.unshift({id:Date.now(),driver:driverId,date:new Date().toLocaleDateString(),reason:reason,value:value,by:S.user?S.user.name:""});
 saveAll();
 alert(tt("pointsSavedForDriver"));
 render();
}


function safetyTips(){return [t("tipShoes"),t("tipVest"),t("tipSpeed"),t("tipDistance"),t("tipLoad"),t("tipPhone"),t("tipMirrors"),t("tipRest"),t("tipLights"),t("tipWeather")]}function safetyPage(){return shell('<h1 class="sectionTitle">'+t("safetyTips")+'</h1><section class="card"><h2>'+t("todayTip")+'</h2><p>'+safetyTips()[new Date().getDate()%safetyTips().length]+'</p></section><section class="card">'+safetyTips().map(function(x){return '<div class="tip">🛡️ '+x+'</div>'}).join("")+'</section>')}function notificationsPage(){var items=notificationItems();return shell('<h1 class="sectionTitle">'+tt("notifications")+'</h1><section class="card">'+(items.length?items.map(function(n){return '<div class="row"><span>🔔 '+n.text+'</span></div>'}).join(""):'<p class="muted">'+tt("noNotifications")+'</p>')+'</section>')}


function more(){
 var buttons='';
 buttons+='<button onclick="go(\'license\')">🪪 '+tt("licenseCheck")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'documents\')">📂 '+tt("documentFolder")+' <span>›</span></button>';
 if(admin()||work())buttons+='<button onclick="go(\'maintenance\')">🛠 '+tt("maintenancePlanner")+' <span>›</span></button>';
 if(admin())buttons+='<button onclick="go(\'costs\')">💶 '+tt("costOverview")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'aiDamage\')">🤖 '+tt("aiDamageCheck")+' <span>›</span></button>';
 if(admin()||dev())buttons+='<button onclick="go(\'aiTraining\')">🧠 '+tt("aiTraining")+' <span>›</span></button>';
 if(admin()||work())buttons+='<button onclick="go(\'damageSummary\')">📊 '+tt("damageSummary")+' <span>›</span></button>';
 return shell('<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>'+rt("settings")+'</span></div>'+
 '<h2>'+rt("settings")+'</h2><p class="muted">Aktive Rolle: '+(S.user?(S.user.role+(S.user.extraRoles&&S.user.extraRoles.length?" + "+S.user.extraRoles.join(", "):"")):"-")+'</p>'+
 '<label>'+t("language")+'<select onchange="setLang(this.value)">'+LANG.map(function(l){return '<option value="'+l[0]+'" '+(S.lang===l[0]?"selected":"")+'>'+l[1]+'</option>'}).join("")+'</select></label>'+
 '<p class="muted">'+rt("perfectTranslationNote")+'</p>'+
 '<label>'+t("mode")+'<select onchange="setTheme(this.value)"><option value="light" '+(S.theme==="light"?"selected":"")+'>'+t("light")+'</option><option value="dark" '+(S.theme==="dark"?"selected":"")+'>'+t("dark")+'</option></select></label>'+
 '<div class="settingsList">'+buttons+'</div>'+
 '<button class="logoutAction" onclick="logout()">↩ '+rt("logout")+'</button>'+
 '</section>')
}


function userAdmin(){var drivers=allDrivers();return '<section class="card"><h2>'+t("users")+'</h2>'+S.users.map(function(u){return '<div class="row"><span>'+u.name+'<br><small class="muted">'+u.login+' · '+u.role+'</small></span></div>'}).join("")+'</section><section class="card"><h2>'+t("addDriver")+'</h2><input id="newName" placeholder="'+t("driverName")+'"><input id="newLogin" placeholder="'+t("driverUser")+'"><input id="newPass" placeholder="'+t("driverPassword")+'"><button onclick="addDriver()">'+t("save")+'</button><h2>'+t("removeDriver")+'</h2>'+drivers.map(function(d){return '<div class="row"><span>'+d.name+'</span><button class="danger" onclick="removeDriver('+d.id+')">'+t("delete")+'</button></div>'}).join("")+'</section>'}
function addDriver(){var n=document.getElementById("newName").value,l=document.getElementById("newLogin").value,p=document.getElementById("newPass").value;if(!n||!l||!p){alert(t("required"));return}S.users.push({id:Date.now(),name:n,login:l,password:p,role:"driver",language:S.lang,points:0,status:"red"});saveAll();render()}function removeDriver(id){S.users=S.users.filter(function(u){return u.id!==id});saveAll();render()}function resetData(){if(confirm("Reset?")){["fc_v17_users","fc_v17_vehicles","fc_v17_damages","fc_v17_inspections","fc_v17_points","fc_v17_licenses","fc_v17_maintenance","fc_v17_costs","fc_v17_docs"].forEach(function(k){localStorage.removeItem(k)});location.reload()}}

function licensePage(){var drivers=allDrivers();var current=driverLicenseFor(S.user.id);return shell('<h1 class="sectionTitle">'+tt("licenseCheck")+'</h1><section class="card">'+(admin()?'<label>'+tt("selectDriver")+'<select id="licDriver">'+drivers.map(function(d){var l=driverLicenseFor(d.id);return '<option value="'+d.id+'">'+d.name+(l?' · '+l.date:'')+'</option>'}).join("")+'</select></label>':'<p>'+S.user.name+'</p>')+'<label>'+tt("licenseDate")+'<input id="licDate" type="date" value="'+(current?current.date:'')+'"></label><button onclick="saveLicense()">'+tt("saveLicense")+'</button></section><section class="card">'+drivers.map(function(d){var l=driverLicenseFor(d.id);return '<div class="row"><span>'+d.name+'</span><span>'+(l?deadlineBadge(l.date):'-')+'</span></div>'}).join("")+'</section>')}
function fleetLivePage(){return shell('<h1 class="sectionTitle">'+tt("fleetLive")+'</h1><section class="card">'+(S.vehicles.map(function(v){var u=S.users.find(function(x){return x.id===v.assigned});var open=S.damages.filter(function(d){return d.status!=="done"&&String(d.vehicle||"").indexOf(v.name)>=0}).length;return '<div class="row"><span><b>'+v.name+'</b><br><small class="muted">'+v.plate+' · '+(u?u.name:'-')+'</small></span><span>'+deadlineBadge(v.hu)+' '+deadlineBadge(v.sp)+'<br><small>'+t("openDamages")+': '+open+'</small></span></div>'}).join("")||'<p class="muted">'+tt("noData")+'</p>')+'</section>')}
function maintenancePage(){var vehicles=S.vehicles;return shell('<h1 class="sectionTitle">'+tt("maintenancePlanner")+'</h1>'+(admin()||work()?'<section class="card"><h2>'+tt("addMaintenance")+'</h2><select id="mVehicle">'+vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("")+'</select><select id="mType"><option>'+tt("oilChange")+'</option><option>'+tt("tireChange")+'</option><option>HU/TÜV</option><option>SP</option><option>'+t("tacho")+'</option><option>'+tt("freeTask")+'</option></select><input id="mDate" type="date"><textarea id="mNote" placeholder="'+t("comment")+'"></textarea><button onclick="addMaintenance()">'+t("save")+'</button></section>':'')+'<section class="card">'+(S.maintenance.map(function(m){return '<div class="row"><span><b>'+vehicleName(m.vehicle)+'</b><br><small class="muted">'+m.type+' · '+m.date+' · '+(m.note||'')+'</small></span><span>'+deadlineBadge(m.date)+(admin()||work()?'<br><button class="secondary" onclick="doneMaintenance('+m.id+')">'+t("done")+'</button>':'')+'</span></div>'}).join("")||'<p class="muted">'+tt("noData")+'</p>')+'</section>')}
function costsPage(){var vehicles=S.vehicles;var total=S.costs.reduce(function(a,c){return a+Number(c.amount||0)},0);return shell('<h1 class="sectionTitle">'+tt("costOverview")+'</h1><section class="card"><h2>Total: '+total.toFixed(2)+' €</h2><select id="cVehicle">'+vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("")+'</select><input id="cCat" placeholder="'+tt("category")+'"><input id="cAmount" type="number" step="0.01" placeholder="'+tt("amount")+'"><textarea id="cNote" placeholder="'+t("comment")+'"></textarea><button onclick="addCost()">'+t("save")+'</button></section><section class="card">'+(S.costs.map(function(c){return '<div class="row"><span><b>'+vehicleName(c.vehicle)+'</b><br><small class="muted">'+c.date+' · '+c.category+' · '+(c.note||'')+'</small></span><b>'+Number(c.amount).toFixed(2)+' €</b></div>'}).join("")||'<p class="muted">'+tt("noData")+'</p>')+'</section>')}
function documentsPage(){var vehicles=S.vehicles;return shell('<h1 class="sectionTitle">'+tt("documentFolder")+'</h1>'+(admin()||work()?'<section class="card"><h2>'+tt("addDocument")+'</h2><select id="docVehicle">'+vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("")+'</select><input id="docName" placeholder="'+tt("documentName")+'"><input id="docType" placeholder="'+tt("documentType")+'"><input id="docFile" type="file"><button onclick="addDocument()">'+t("save")+'</button></section>':'')+'<section class="card">'+(S.docs.filter(function(d){return admin()||work()||(currentVehicle()&&currentVehicle().id===d.vehicle)}).map(function(d){return '<div class="row"><span><b>'+d.name+'</b><br><small class="muted">'+vehicleName(d.vehicle)+' · '+d.type+' · '+d.file+'</small></span><span>📄</span></div>'}).join("")||'<p class="muted">'+tt("noData")+'</p>')+'</section>')}
function rankingPage(){var drivers=allDrivers().map(function(d){return {driver:d,total:pointTotal(d.id)}}).sort(function(a,b){return b.total-a.total});return shell('<h1 class="sectionTitle">'+tt("monthlyRanking")+'</h1><section class="card">'+drivers.map(function(x,i){return '<div class="row"><span><b>'+(i+1)+'. '+x.driver.name+'</b><br><small class="muted">'+tt("bonusLevel")+': '+bonusText(x.total)+'</small></span><b>'+x.total+' '+t("points")+'</b></div>'}).join("")+'</section>')}

function damageSummaryPage(){
 var total=S.damages.length;
 var open=S.damages.filter(function(d){return d.status!=="done"}).length;
 var done=S.damages.filter(function(d){return d.status==="done"}).length;
 var critical=S.damages.filter(function(d){return d.critical}).length;
 var byVehicle={};
 S.damages.forEach(function(d){var k=d.vehicle||"-"; if(!byVehicle[k])byVehicle[k]={total:0,open:0,done:0,critical:0}; byVehicle[k].total++; if(d.status==="done")byVehicle[k].done++; else byVehicle[k].open++; if(d.critical)byVehicle[k].critical++;});
 var rows=Object.keys(byVehicle).map(function(k){var x=byVehicle[k];return '<div class="row"><span><b>'+k+'</b><br><small class="muted">'+tt("totalDamages")+': '+x.total+' · '+tt("openDamagesTotal")+': '+x.open+' · '+tt("doneDamagesTotal")+': '+x.done+'</small></span><span>'+(x.critical?'<span class="tag red">'+x.critical+' '+tt("criticalDamages")+'</span>':'<span class="tag green">OK</span>')+'</span></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+tt("damageSummary")+'</h1><section class="metricGrid"><div class="metric"><b>'+total+'</b>'+tt("totalDamages")+'</div><div class="metric"><b>'+open+'</b>'+tt("openDamagesTotal")+'</div><div class="metric"><b>'+done+'</b>'+tt("doneDamagesTotal")+'</div><div class="metric"><b>'+critical+'</b>'+tt("criticalDamages")+'</div></section><section class="card"><h2>'+tt("damageOverview")+'</h2>'+(rows||'<p class="muted">'+tt("noData")+'</p>')+'</section>'+damageList())
}

function damageFreeBonusPage(){
 var drivers=S.users.filter(function(u){return u.role==="driver" || (u.extraRoles||[]).includes("driver")});
 if(!drivers.length)drivers=S.users.filter(function(u){return u.id===1||u.id===2});
 var rows=drivers.map(function(d){
   var openDamages=S.damages.filter(function(x){return x.driver===d.id && x.status!=="done"}).length;
   var already=S.points.some(function(p){return p.driver===d.id && String(p.reason||"").indexOf(tt("damageFreeMonth"))>=0 && String(p.date||"")===new Date().toLocaleDateString()});
   return '<div class="row"><span><b>'+d.name+'</b><br><small class="muted">'+tt("openDamagesTotal")+': '+openDamages+' · '+t("points")+': '+pointTotal(d.id)+'</small></span><button '+(already?'disabled':'')+' onclick="awardDamageFreeBonus('+d.id+')">+10 '+t("points")+'</button></div>';
 }).join("");
 return shell('<h1 class="sectionTitle">🎁 '+tt("damageFreeBonus")+'</h1><section class="card"><p class="muted">'+tt("damageFreeMonth")+' = +10 '+t("points")+'</p>'+(rows||'<p class="muted">'+tt("noData")+'</p>')+'</section>');
}
function awardDamageFreeBonus(id){
 if(!admin() && !(typeof dev==="function"&&dev())){alert(t("required"));return}
 S.points=S.points||[];
 var today=new Date().toLocaleDateString();
 var exists=S.points.some(function(p){return p.driver===id && String(p.reason||"").indexOf(tt("damageFreeMonth"))>=0 && String(p.date||"")===today});
 if(exists){alert(tt("bonusAwarded"));return}
 S.points.unshift({id:Date.now(),driver:id,date:today,reason:tt("damageFreeMonth"),value:10,by:S.user?S.user.name:"System"});
 saveAll();
 alert(tt("bonusAwarded"));
 render();
}

function aiDamagePoints(type,late){
 var p=0;
 if(type==="mirrorLight")p=-5;
 if(type==="tireDamage")p=-10;
 if(type==="brakeSteering")p=-20;
 if(type==="loadSecuring")p=-10;
 if(late)p-=5;
 return p;
}
function aiDamageLabel(type){
 var m={minorDamage:tt("minorDamage"),mirrorLight:tt("mirrorLight"),tireDamage:tt("tireDamage"),brakeSteering:tt("brakeSteering"),loadSecuring:tt("loadSecuring")};
 return m[type]||type;
}
function aiDamagePage(){
 var drivers=allDrivers();
 var vehicleOptions=S.vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("");
 return shell('<h1 class="sectionTitle">🤖 '+tt("aiDamageCheck")+'</h1><section class="card"><p class="muted">'+tt("aiHint")+'</p><label>'+t("vehicle")+'<select id="aiVehicle">'+vehicleOptions+'</select></label>'+(admin()?'<label>'+tt("selectDriver")+'<select id="aiDriver">'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select></label>':'')+'<label>'+tt("damageType")+'<select id="aiType" onchange="previewAiDamage()"><option value="minorDamage">'+tt("minorDamage")+'</option><option value="mirrorLight">'+tt("mirrorLight")+'</option><option value="tireDamage">'+tt("tireDamage")+'</option><option value="brakeSteering">'+tt("brakeSteering")+'</option><option value="loadSecuring">'+tt("loadSecuring")+'</option></select></label><label><input type="checkbox" id="aiLate" onchange="previewAiDamage()"> '+tt("lateReport")+'</label><label>'+t("photo")+'<input id="aiPhoto" type="file" accept="image/*"></label><textarea id="aiNote" placeholder="'+t("description")+'"></textarea><div id="aiPreview" class="warn">'+tt("pointsRecommendation")+': 0</div><button onclick="applyAiDamage()">'+tt("applyAiResult")+'</button></section>')
}
function previewAiDamage(){
 var type=document.getElementById("aiType").value;
 var late=document.getElementById("aiLate").checked;
 var p=aiDamagePoints(type,late);
 var box=document.getElementById("aiPreview");
 if(box)box.innerHTML=tt("aiRecommendation")+': '+aiDamageLabel(type)+' · '+tt("pointsRecommendation")+': '+(p>0?'+':'')+p;
}
function applyAiDamage(){
 var type=document.getElementById("aiType").value;
 var late=document.getElementById("aiLate").checked;
 var p=aiDamagePoints(type,late);
 var driverId=admin()?Number(document.getElementById("aiDriver").value):S.user.id;
 var v=S.vehicles.find(function(x){return x.id===Number(document.getElementById("aiVehicle").value)});
 var file=document.getElementById("aiPhoto");
 var photo=file&&file.files&&file.files[0]?file.files[0].name:"";
 var note=document.getElementById("aiNote").value||aiDamageLabel(type);
 var driverObj=S.users.find(function(u){return u.id===driverId});
 S.damages.unshift({id:Date.now(),driver:driverId,driverName:driverObj?driverObj.name:"",vehicle:v?(v.name+" "+v.plate):"",position:aiDamageLabel(type),description:note,photo:photo,status:"open",critical:(type==="tireDamage"||type==="brakeSteering"||type==="loadSecuring"),ai:true});
 if(p!==0){S.points.unshift({id:Date.now()+1,driver:driverId,date:new Date().toLocaleDateString(),reason:tt("aiDamageCheck")+": "+aiDamageLabel(type)+(late?" + "+tt("lateReport"):""),value:p,by:S.user?S.user.name:"KI-Beta"})}
 saveAll();alert(tt("aiApplied"));S.tab="damageSummary";render();
}

function aiTrainingPage(){
 var rows=S.aiTraining.map(function(r){return '<div class="row"><span><b>'+r.damageClass+' · '+r.severity+'</b><br><small class="muted">'+r.file+' · '+r.points+' '+t("points")+' · '+r.date+' · '+tt("confirmedBy")+': '+r.confirmedBy+'</small><br><small>'+(r.note||'')+'</small></span></div>'}).join("");
 return shell(`<h1 class="sectionTitle">🧠 ${tt("aiTraining")}</h1><section class="card"><p class="muted">${tt("trainingHint")}</p><label>${tt("photoFile")}<input id="trainPhoto" type="file" accept="image/*"></label><label>${tt("damageClass")}<select id="trainClass"><option>${tt("minorDamage")}</option><option>${tt("mirrorLight")}</option><option>${tt("tireDamage")}</option><option>${tt("brakeSteering")}</option><option>${tt("loadSecuring")}</option><option>${tt("criticalDefects")}</option></select></label><label>${tt("damageSeverity")}<select id="trainSeverity" onchange="updateTrainingPoints()"><option value="0">${tt("severityLight")}</option><option value="-5">${tt("severityMedium")}</option><option value="-10">${tt("severityCritical")}</option></select></label><input id="trainPoints" type="number" value="0" placeholder="${tt("pointsRecommendation")}"><textarea id="trainNote" placeholder="${t("comment")}"></textarea><button onclick="saveTrainingData()">${t("save")}</button><button class="secondary" onclick="exportTrainingData()">⬇ ${tt("exportTraining")}</button><p class="muted">${tt("trainingExportHint")}</p></section><section class="card"><h2>${tt("trainingData")}</h2>${rows||'<p class="muted">'+tt("noData")+'</p>'}</section>`)
}
function updateTrainingPoints(){var s=document.getElementById("trainSeverity"),p=document.getElementById("trainPoints");if(s&&p)p.value=s.value}
function saveTrainingData(){var file=document.getElementById("trainPhoto");var fname=file&&file.files&&file.files[0]?file.files[0].name:"";var cls=document.getElementById("trainClass").value;var sev=document.getElementById("trainSeverity").options[document.getElementById("trainSeverity").selectedIndex].text;var points=Number(document.getElementById("trainPoints").value||0);var note=document.getElementById("trainNote").value||"";S.aiTraining.unshift({id:Date.now(),file:fname,damageClass:cls,severity:sev,points:points,note:note,confirmedBy:S.user?S.user.name:"",date:new Date().toLocaleString()});saveAll();alert(tt("trainingSaved"));render()}
function downloadJson(data,filename){var blob=new Blob([data],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
function exportTrainingData(){downloadJson(JSON.stringify(S.aiTraining,null,2),"fleetcontrol_ki_trainingsdaten.json")}
function exportAllData(){downloadJson(JSON.stringify({users:S.users,vehicles:S.vehicles,damages:S.damages,inspections:S.inspections,points:S.points,licenses:S.licenses,maintenance:S.maintenance,costs:S.costs,docs:S.docs,aiTraining:S.aiTraining,exportedAt:new Date().toISOString()},null,2),"fleetcontrol_alle_testdaten.json")}

function developerHome(){
 return shell(roleHeader("⌘",rt("developer"),rt("focusDev"))+
 '<section class="rolePhone"><div class="phoneGreeting"><span>Guten Morgen,</span>'+settingsButton()+'</div><h2>Dev Team &lt;/&gt;</h2>'+
 '<p class="miniLabel">'+rt("systemStatus").toUpperCase()+'</p>'+
 roleCard("🛡",rt("apiStatus"),rt("allSystemsActive"),"✓","fleetlive")+
 roleCard("▣",rt("database"),rt("healthy"),"✓","documents")+
 roleCard("▤",rt("server"),rt("stable"),"✓","notifications")+
 roleCard("▦",rt("backup"),rt("today2")+", 02:00 Uhr","✓","more")+
 '<button class="mainAction small" onclick="exportAllData()">'+rt("logs")+' <span>›</span></button>'+
 '<p class="miniLabel">'+rt("quickAccess").toUpperCase()+'</p><div class="quickGrid"><button onclick="go(\'aiTraining\')">🚀<br>'+rt("deploy")+'</button><button onclick="go(\'fleetlive\')">☷<br>'+rt("systemLogs")+'</button></div></section>')
}


function addCost(){
 var vehicleEl=document.getElementById("cVehicle");
 var catEl=document.getElementById("cCat");
 var amountEl=document.getElementById("cAmount");
 var noteEl=document.getElementById("cNote");
 var v=vehicleEl?Number(vehicleEl.value):0;
 var cat=catEl?String(catEl.value||"").trim():"";
 var amount=amountEl?Number(String(amountEl.value||"").replace(",", ".")):0;
 var note=noteEl?noteEl.value:"";
 if(!v||!cat||!amount){alert(t("required"));return}
 if(!S.costs)S.costs=[];
 S.costs.unshift({id:Date.now(),vehicle:v,category:cat,amount:amount,note:note,date:new Date().toLocaleDateString(),by:S.user?S.user.name:""});
 saveAll();
 alert(t("saved"));
 render();
}
function costsPage(){
 var vehicles=S.vehicles||[];
 var costs=S.costs||[];
 var total=costs.reduce(function(a,c){return a+Number(c.amount||0)},0);
 var options=vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("");
 var canEdit=admin()||work()||(typeof dev==="function"&&dev());
 var form=canEdit?'<section class="card"><h2>'+tt("addCost")+'</h2>'+(vehicles.length?'<select id="cVehicle">'+options+'</select>':'<div class="warn">'+tt("noVehiclesCreated")+'</div>')+'<input id="cCat" placeholder="'+tt("category")+'"><input id="cAmount" type="number" step="0.01" placeholder="'+tt("amount")+'"><textarea id="cNote" placeholder="'+t("comment")+'"></textarea><button onclick="addCost()">'+t("save")+'</button></section>':'';
 var rows=costs.map(function(c){return '<div class="row"><span><b>'+vehicleName(c.vehicle)+'</b><br><small class="muted">'+(c.date||"")+' · '+(c.category||"")+' · '+(c.note||"")+'</small></span><b>'+Number(c.amount||0).toFixed(2)+' €</b></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+tt("costOverview")+'</h1><section class="card"><h2>Total: '+total.toFixed(2)+' €</h2></section>'+form+'<section class="card">'+(rows||'<p class="muted">'+tt("noData")+'</p>')+'</section>');
}

function render(){base();var pages={home:home,check:check,vehicles:vehicles,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageFreeBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,settings:more};document.getElementById("root").innerHTML=S.user?(pages[S.tab]||home)():loginView();if(S.tab==="check")setTimeout(initSig,50)}
window.addEventListener("error",function(e){var r=document.getElementById("root");if(r){r.innerHTML='<div style="font-family:Arial;padding:24px"><h1>Fleet Control</h1><p>Startfehler: '+String(e.message)+'</p></div>'}})
render();


/* === MASTER RELEASE CONSOLIDATION V18.3 === */
function mLoad(k,f){try{var r=localStorage.getItem(k);return r==null?f:JSON.parse(r)}catch(e){return f}}
function mSave(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function masterNormalizeUsers(){
 S.users=S.users||[];
 var req=[
  {id:1,name:"Marcel Hoppe",login:"Hoppe.M",password:"Besen",role:"driver",language:"de",points:85,status:"green"},
  {id:991,name:"Marcel Hoppe",login:"Marcel",password:"Anhänger",role:"driver",extraRoles:["fleet"],language:"de",points:0,status:"green"},
  {id:992,name:"Sascha Thollembeek",login:"Sascha",password:"Schraubenschlüssel",role:"driver",extraRoles:["boss","workshop","deputy"],language:"de",points:0,status:"green"},
  {id:993,name:"Tamara",login:"Tamara",password:"Sternenhimmel",role:"boss",extraRoles:["fleet","workshop","driver"],language:"de",points:0,status:"green"},
  {id:994,name:"Hidir Daglioglu",login:"Hidir Daglioglu",password:"Einhorn",role:"boss",extraRoles:["fleet","workshop"],language:"de",points:0,status:"green"},
  {id:800,name:"Chef",login:"Chef",password:"Wassermelonen",role:"boss",language:"de",points:0,status:"green"},
  {id:910,name:"Fuhrparkmanagement",login:"fuhrpark",password:"demo",role:"fleet",language:"de",points:0,status:"green"},
  {id:900,name:"Werkstatt",login:"Werkstatt",password:"Eisbecher",role:"workshop",language:"de",points:0,status:"green"},
  {id:999,name:"Entwickler",login:"Entwickler",password:"Laubblätter",role:"developer",language:"de",points:0,status:"green"}
 ];
 req.forEach(function(r){
   var f=S.users.find(function(u){return Number(u.id)===Number(r.id)||String(u.login||"").toLowerCase()===String(r.login).toLowerCase()});
   if(f){Object.keys(r).forEach(function(k){f[k]=r[k]})}else{S.users.push(r)}
 });
}
function mExtra(r){return !!(S.user&&(S.user.extraRoles||[]).indexOf(r)>=0)}
function canAwardPoints(){return !!(S.user&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")))}
function canApproveAiDamage(){return canAwardPoints()}
function isChefFullAccess(){return !!(S.user&&(S.user.role==="boss"||S.user.role==="admin"||mExtra("boss")||mExtra("admin")))}
function canDoInspection(){return !!(S.user&&(S.user.role==="driver"||S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("driver")||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")))}
function isDeputyRole(){return !!(S.user&&(S.user.role==="deputy"||mExtra("deputy")||mExtra("boss")||S.user.role==="boss"))}
function isDashboardRole(){return !!(S.user&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")))}
function admin(){return !!(S.user&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="developer"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("developer")||mExtra("admin")))}
function work(){return !!(S.user&&(S.user.role==="workshop"||mExtra("workshop")||isChefFullAccess()))}
function dev(){return !!(S.user&&(S.user.role==="developer"||mExtra("developer")))}
function allDrivers(){return (S.users||[]).filter(function(u){return u.role==="driver"||(u.extraRoles||[]).indexOf("driver")>=0})}
function masterFallback(k){var m={notAllowed:"Keine Berechtigung",pointsSavedForDriver:"Punkte wurden beim Fahrer angerechnet",pending:"wartet",approved:"freigegeben",rejected:"abgelehnt",approve:"Freigeben",reject:"Ablehnen",aiRecommendation:"KI-Empfehlung",approvalStatus:"Freigabestatus",allChecksRequired:"Bitte alle Prüfpunkte abhaken.",commentOptional:"Kommentar optional",costAnalysis:"Kostenanalyse",costOverview:"Kostenübersicht",total:"Gesamt",addCost:"Kosten hinzufügen",category:"Kategorie",amount:"Betrag",unknown:"Unbekannt",system:"System"};return m[k]||k}
function t(k){var l=S.lang||mLoad("fc_v17_lang","de");return (TR[l]||TR.de||{})[k]||(TR.de||{})[k]||masterFallback(k)}
function tt(k){return t(k)}
function setLang(v){S.lang=v;mSave("fc_v17_lang",v);if(S.user){S.user.language=v;S.users=(S.users||[]).map(function(u){return Number(u.id)===Number(S.user.id)?Object.assign({},u,{language:v}):u})}saveAll();render()}
function logout(){mSave("fc_v17_lang",S.lang||"de");S.user=null;S.tab="home";render()}
function login(e){if(e&&e.preventDefault)e.preventDefault();masterNormalizeUsers();var n=(document.getElementById("loginName")&&document.getElementById("loginName").value||"").trim().toLowerCase();var p=(document.getElementById("loginPass")&&document.getElementById("loginPass").value||"").trim();var u=(S.users||[]).find(function(x){return String(x.login||x.user||"").trim().toLowerCase()===n&&String(x.password||x.pass||"").trim()===p});if(!u){alert(t("loginFailed"));return}S.user=Object.assign({},u);S.lang=mLoad("fc_v17_lang",u.language||"de");S.tab="home";var av=(S.vehicles||[]).filter(function(v){return Number(v.assigned)===Number(S.user.id)});if(av[0])S.activeVehicle=av[0].id;saveAll();render()}
function togglePassword(){var el=document.getElementById("loginPass");if(el)el.type=el.type==="password"?"text":"password"}
function pointTotal(id){return (S.points||[]).filter(function(p){return Number(p.driver)===Number(id)}).reduce(function(a,p){return a+Number(p.value||0)},0)}
function dashStatus(d){var done=(S.inspections||[]).some(function(i){return Number(i.driver)===Number(d.id)});if(done)return '<span class="dashStatus green">Unterwegs</span>';if(d.status==="red")return '<span class="dashStatus red">Offen</span>';return '<span class="dashStatus yellow">Pause</span>'}
function dashOpenChecks(){return allDrivers().slice(0,5).map(function(d,i){var v=(S.vehicles||[]).find(function(x){return Number(x.assigned)===Number(d.id)})||(S.vehicles||[])[i]||{};var checked=(S.inspections||[]).some(function(ins){return Number(ins.driver)===Number(d.id)});var label=checked?'Heute':(i===0?'Überfällig':(i===1?'Heute':'Morgen'));var cls=label==='Überfällig'?'red':(label==='Heute'?'yellow':'blue');return '<div class="dashListRow"><span class="dashPlate">'+(v.plate||('B-'+(1000+i)))+'</span><span>'+d.name+'</span><span class="dashStatus '+cls+'">'+label+'</span></div>'}).join("")}

/* === MASTER RELEASE I18N FIX V18.4 === */
var MASTER_I18N = {
 de:{
  goodMorning:"Guten Morgen", fleetOverview:"Hier ist die aktuelle Übersicht deines Fuhrparks.",
  driversTotal:"Fahrer gesamt", vehiclesTotal:"Fahrzeuge gesamt", openDamages:"Offene Schäden", dueChecks:"Fällige Prüfungen",
  active:"Aktiv", inUse:"Im Einsatz", urgent:"Dringend", thisWeek:"Diese Woche",
  driverStatus:"Fahrerstatus", showAll:"Alle anzeigen", showAllDrivers:"Alle Fahrer anzeigen",
  openControls:"Offene Kontrollen", showAllControls:"Alle Kontrollen anzeigen",
  damagePriority:"Offene Schäden", high:"Hoch", medium:"Mittel", low:"Niedrig",
  nextWeek:"Nächste Woche", in30Days:"In 30 Tagen", pointsOverview:"Punkteübersicht", average:"Durchschnitt",
  good:"Gut", critical:"Kritisch", openPoints:"Punkteübersicht öffnen",
  currentMessages:"Aktuelle Meldungen", damageReported:"Schaden gemeldet", noOpenDamages:"Keine offenen Schäden",
  controlCompleted:"Kontrolle abgeschlossen", departureSaved:"Abfahrtskontrolle gespeichert",
  quickAccess:"Schnellzugriff", addDriver:"Fahrer hinzufügen", addVehicle:"Fahrzeug hinzufügen", reportDamageQuick:"Schaden melden",
  createInspection:"Prüfung erstellen", createReport:"Bericht erstellen",
  notAllowed:"Keine Berechtigung", pointsSavedForDriver:"Punkte wurden beim Fahrer angerechnet",
  pending:"wartet", approved:"freigegeben", rejected:"abgelehnt", approve:"Freigeben", reject:"Ablehnen",
  aiRecommendation:"KI-Punkteempfehlung", approval:"Freigabe", workshopLinked:"Werkstatt verknüpft",
  aiDamageInfo:"Foto hochladen, Schaden beschreiben. Die KI erstellt automatisch eine Punkteempfehlung, die erst durch Chef/Fuhrpark/Stellvertretung freigegeben wird.",
  damageSavedPending:"Schadensmeldung gespeichert. KI-Punkteempfehlung wartet auf Freigabe.",
  pdfArchive:"PDF-Archiv Abfahrtskontrollen", temporaryArchive:"Vorübergehendes Archiv bis zum Livebetrieb.", noPdfReports:"Noch keine PDF-Berichte vorhanden.", viewPdf:"PDF ansehen",
  costAnalysis:"Kostenanalyse", costOverview:"Kostenübersicht", total:"Gesamt", addCost:"Kosten hinzufügen", category:"Kategorie", amount:"Betrag", unknown:"Unbekannt",
  allRequired:"Bitte alle Pflichtfelder ausfüllen.", pdfPrepared:"Abfahrtskontrolle abgeschlossen. PDF wurde automatisch für den Versand vorbereitet.",
  today:"Heute", overdue:"Überfällig", tomorrow:"Morgen", pause:"Pause", unterwegs:"Unterwegs", open:"Offen"
 },
 en:{
  goodMorning:"Good morning", fleetOverview:"Here is the current overview of your fleet.",
  driversTotal:"Total drivers", vehiclesTotal:"Total vehicles", openDamages:"Open damages", dueChecks:"Due inspections",
  active:"Active", inUse:"In use", urgent:"Urgent", thisWeek:"This week",
  driverStatus:"Driver status", showAll:"Show all", showAllDrivers:"Show all drivers",
  openControls:"Open checks", showAllControls:"Show all checks",
  damagePriority:"Open damages", high:"High", medium:"Medium", low:"Low",
  nextWeek:"Next week", in30Days:"In 30 days", pointsOverview:"Points overview", average:"Average",
  good:"Good", critical:"Critical", openPoints:"Open points overview",
  currentMessages:"Current messages", damageReported:"Damage reported", noOpenDamages:"No open damages",
  controlCompleted:"Check completed", departureSaved:"Departure check saved",
  quickAccess:"Quick access", addDriver:"Add driver", addVehicle:"Add vehicle", reportDamageQuick:"Report damage",
  createInspection:"Create inspection", createReport:"Create report",
  notAllowed:"Not authorized", pointsSavedForDriver:"Points have been assigned to the driver",
  pending:"pending", approved:"approved", rejected:"rejected", approve:"Approve", reject:"Reject",
  aiRecommendation:"AI points recommendation", approval:"Approval", workshopLinked:"Workshop linked",
  aiDamageInfo:"Upload a photo and describe the damage. The AI creates a points recommendation that must be approved by management, fleet management or deputy.",
  damageSavedPending:"Damage report saved. AI points recommendation is waiting for approval.",
  pdfArchive:"PDF archive departure checks", temporaryArchive:"Temporary archive until live operation.", noPdfReports:"No PDF reports yet.", viewPdf:"View PDF",
  costAnalysis:"Cost analysis", costOverview:"Cost overview", total:"Total", addCost:"Add cost", category:"Category", amount:"Amount", unknown:"Unknown",
  allRequired:"Please complete all required fields.", pdfPrepared:"Departure check completed. PDF has been prepared automatically for sending.",
  today:"Today", overdue:"Overdue", tomorrow:"Tomorrow", pause:"Break", unterwegs:"On route", open:"Open"
 },
 tr:{
  goodMorning:"Günaydın", fleetOverview:"Filonuzun güncel özeti burada.",
  driversTotal:"Toplam sürücü", vehiclesTotal:"Toplam araç", openDamages:"Açık hasarlar", dueChecks:"Yaklaşan kontroller",
  active:"Aktif", inUse:"Kullanımda", urgent:"Acil", thisWeek:"Bu hafta",
  driverStatus:"Sürücü durumu", showAll:"Tümünü göster", showAllDrivers:"Tüm sürücüleri göster",
  openControls:"Açık kontroller", showAllControls:"Tüm kontrolleri göster",
  damagePriority:"Açık hasarlar", high:"Yüksek", medium:"Orta", low:"Düşük",
  nextWeek:"Gelecek hafta", in30Days:"30 gün içinde", pointsOverview:"Puan özeti", average:"Ortalama",
  good:"İyi", critical:"Kritik", openPoints:"Puan özetini aç",
  currentMessages:"Güncel bildirimler", damageReported:"Hasar bildirildi", noOpenDamages:"Açık hasar yok",
  controlCompleted:"Kontrol tamamlandı", departureSaved:"Çıkış kontrolü kaydedildi",
  quickAccess:"Hızlı erişim", addDriver:"Sürücü ekle", addVehicle:"Araç ekle", reportDamageQuick:"Hasar bildir",
  createInspection:"Kontrol oluştur", createReport:"Rapor oluştur",
  notAllowed:"Yetkiniz yok", pointsSavedForDriver:"Puanlar sürücüye işlendi",
  pending:"bekliyor", approved:"onaylandı", rejected:"reddedildi", approve:"Onayla", reject:"Reddet",
  aiRecommendation:"Yapay zekâ puan önerisi", approval:"Onay", workshopLinked:"Atölye bağlantılı",
  aiDamageInfo:"Fotoğraf yükleyin ve hasarı açıklayın. Yapay zekâ bir puan önerisi oluşturur; bu öneri yönetim, filo yönetimi veya vekil tarafından onaylanmalıdır.",
  damageSavedPending:"Hasar kaydedildi. Yapay zekâ puan önerisi onay bekliyor.",
  pdfArchive:"Çıkış kontrolleri PDF arşivi", temporaryArchive:"Canlı kullanıma kadar geçici arşiv.", noPdfReports:"Henüz PDF raporu yok.", viewPdf:"PDF görüntüle",
  costAnalysis:"Maliyet analizi", costOverview:"Maliyet özeti", total:"Toplam", addCost:"Maliyet ekle", category:"Kategori", amount:"Tutar", unknown:"Bilinmiyor",
  allRequired:"Lütfen tüm zorunlu alanları doldurun.", pdfPrepared:"Çıkış kontrolü tamamlandı. PDF gönderim için otomatik hazırlandı.",
  today:"Bugün", overdue:"Gecikmiş", tomorrow:"Yarın", pause:"Mola", unterwegs:"Yolda", open:"Açık"
 },
 pl:{
  goodMorning:"Dzień dobry", fleetOverview:"Oto aktualny przegląd Twojej floty.",
  driversTotal:"Kierowcy łącznie", vehiclesTotal:"Pojazdy łącznie", openDamages:"Otwarte szkody", dueChecks:"Terminy kontroli",
  active:"Aktywni", inUse:"W użyciu", urgent:"Pilne", thisWeek:"W tym tygodniu",
  driverStatus:"Status kierowców", showAll:"Pokaż wszystko", showAllDrivers:"Pokaż wszystkich kierowców",
  openControls:"Otwarte kontrole", showAllControls:"Pokaż wszystkie kontrole",
  damagePriority:"Otwarte szkody", high:"Wysoki", medium:"Średni", low:"Niski",
  nextWeek:"W przyszłym tygodniu", in30Days:"W ciągu 30 dni", pointsOverview:"Przegląd punktów", average:"Średnia",
  good:"Dobrze", critical:"Krytycznie", openPoints:"Otwórz przegląd punktów",
  currentMessages:"Aktualne komunikaty", damageReported:"Zgłoszono szkodę", noOpenDamages:"Brak otwartych szkód",
  controlCompleted:"Kontrola zakończona", departureSaved:"Kontrola wyjazdowa zapisana",
  quickAccess:"Szybki dostęp", addDriver:"Dodaj kierowcę", addVehicle:"Dodaj pojazd", reportDamageQuick:"Zgłoś szkodę",
  createInspection:"Utwórz kontrolę", createReport:"Utwórz raport",
  notAllowed:"Brak uprawnień", pointsSavedForDriver:"Punkty zostały przypisane kierowcy",
  pending:"oczekuje", approved:"zatwierdzone", rejected:"odrzucone", approve:"Zatwierdź", reject:"Odrzuć",
  aiRecommendation:"Rekomendacja punktów AI", approval:"Zatwierdzenie", workshopLinked:"Połączono z warsztatem",
  aiDamageInfo:"Prześlij zdjęcie i opisz szkodę. AI tworzy rekomendację punktów, którą musi zatwierdzić kierownictwo, flota lub zastępca.",
  damageSavedPending:"Zgłoszenie szkody zapisane. Rekomendacja AI oczekuje na zatwierdzenie.",
  pdfArchive:"Archiwum PDF kontroli wyjazdowych", temporaryArchive:"Tymczasowe archiwum do uruchomienia online.", noPdfReports:"Brak raportów PDF.", viewPdf:"Pokaż PDF",
  costAnalysis:"Analiza kosztów", costOverview:"Przegląd kosztów", total:"Razem", addCost:"Dodaj koszt", category:"Kategoria", amount:"Kwota", unknown:"Nieznany",
  allRequired:"Wypełnij wszystkie wymagane pola.", pdfPrepared:"Kontrola wyjazdowa zakończona. PDF przygotowano automatycznie do wysyłki.",
  today:"Dzisiaj", overdue:"Zaległe", tomorrow:"Jutro", pause:"Przerwa", unterwegs:"W trasie", open:"Otwarte"
 },
 ro:{
  goodMorning:"Bună dimineața", fleetOverview:"Aici este situația actuală a flotei tale.",
  driversTotal:"Total șoferi", vehiclesTotal:"Total vehicule", openDamages:"Daune deschise", dueChecks:"Verificări scadente",
  active:"Activi", inUse:"În utilizare", urgent:"Urgent", thisWeek:"Săptămâna aceasta",
  driverStatus:"Status șoferi", showAll:"Afișează tot", showAllDrivers:"Afișează toți șoferii",
  openControls:"Controale deschise", showAllControls:"Afișează toate controalele",
  damagePriority:"Daune deschise", high:"Ridicat", medium:"Mediu", low:"Scăzut",
  nextWeek:"Săptămâna viitoare", in30Days:"În 30 de zile", pointsOverview:"Prezentare puncte", average:"Medie",
  good:"Bine", critical:"Critic", openPoints:"Deschide punctele",
  currentMessages:"Mesaje actuale", damageReported:"Daună raportată", noOpenDamages:"Nu există daune deschise",
  controlCompleted:"Control finalizat", departureSaved:"Controlul de plecare a fost salvat",
  quickAccess:"Acces rapid", addDriver:"Adaugă șofer", addVehicle:"Adaugă vehicul", reportDamageQuick:"Raportează daună",
  createInspection:"Creează verificare", createReport:"Creează raport",
  notAllowed:"Fără permisiune", pointsSavedForDriver:"Punctele au fost atribuite șoferului",
  pending:"în așteptare", approved:"aprobat", rejected:"respins", approve:"Aprobă", reject:"Respinge",
  aiRecommendation:"Recomandare puncte AI", approval:"Aprobare", workshopLinked:"Atelier conectat",
  aiDamageInfo:"Încarcă o fotografie și descrie dauna. AI creează o recomandare de puncte care trebuie aprobată de management, flotă sau înlocuitor.",
  damageSavedPending:"Raportul de daună a fost salvat. Recomandarea AI așteaptă aprobare.",
  pdfArchive:"Arhivă PDF controale de plecare", temporaryArchive:"Arhivă temporară până la lansarea live.", noPdfReports:"Nu există rapoarte PDF.", viewPdf:"Vezi PDF",
  costAnalysis:"Analiză costuri", costOverview:"Prezentare costuri", total:"Total", addCost:"Adaugă cost", category:"Categorie", amount:"Sumă", unknown:"Necunoscut",
  allRequired:"Completați toate câmpurile obligatorii.", pdfPrepared:"Controlul de plecare a fost finalizat. PDF-ul a fost pregătit automat pentru trimitere.",
  today:"Astăzi", overdue:"Întârziat", tomorrow:"Mâine", pause:"Pauză", unterwegs:"În cursă", open:"Deschis"
 },
 ru:{
  goodMorning:"Доброе утро", fleetOverview:"Актуальный обзор вашего автопарка.",
  driversTotal:"Всего водителей", vehiclesTotal:"Всего ТС", openDamages:"Открытые повреждения", dueChecks:"Проверки к сроку",
  active:"Активно", inUse:"В работе", urgent:"Срочно", thisWeek:"На этой неделе",
  driverStatus:"Статус водителей", showAll:"Показать все", showAllDrivers:"Показать всех водителей",
  openControls:"Открытые проверки", showAllControls:"Показать все проверки",
  damagePriority:"Открытые повреждения", high:"Высокий", medium:"Средний", low:"Низкий",
  nextWeek:"На следующей неделе", in30Days:"В течение 30 дней", pointsOverview:"Обзор баллов", average:"Среднее",
  good:"Хорошо", critical:"Критично", openPoints:"Открыть обзор баллов",
  currentMessages:"Текущие сообщения", damageReported:"Повреждение сообщено", noOpenDamages:"Нет открытых повреждений",
  controlCompleted:"Проверка завершена", departureSaved:"Предрейсовая проверка сохранена",
  quickAccess:"Быстрый доступ", addDriver:"Добавить водителя", addVehicle:"Добавить ТС", reportDamageQuick:"Сообщить о повреждении",
  createInspection:"Создать проверку", createReport:"Создать отчет",
  notAllowed:"Нет разрешения", pointsSavedForDriver:"Баллы начислены водителю",
  pending:"ожидает", approved:"одобрено", rejected:"отклонено", approve:"Одобрить", reject:"Отклонить",
  aiRecommendation:"Рекомендация ИИ по баллам", approval:"Одобрение", workshopLinked:"Связано с мастерской",
  aiDamageInfo:"Загрузите фото и опишите повреждение. ИИ создает рекомендацию по баллам, которую должны одобрить руководство, автопарк или заместитель.",
  damageSavedPending:"Повреждение сохранено. Рекомендация ИИ ожидает одобрения.",
  pdfArchive:"PDF-архив предрейсовых проверок", temporaryArchive:"Временный архив до запуска онлайн.", noPdfReports:"PDF-отчетов пока нет.", viewPdf:"Открыть PDF",
  costAnalysis:"Анализ затрат", costOverview:"Обзор затрат", total:"Итого", addCost:"Добавить затраты", category:"Категория", amount:"Сумма", unknown:"Неизвестно",
  allRequired:"Заполните все обязательные поля.", pdfPrepared:"Предрейсовая проверка завершена. PDF автоматически подготовлен к отправке.",
  today:"Сегодня", overdue:"Просрочено", tomorrow:"Завтра", pause:"Пауза", unterwegs:"В рейсе", open:"Открыто"
 },
 uk:{
  goodMorning:"Доброго ранку", fleetOverview:"Актуальний огляд вашого автопарку.",
  driversTotal:"Усього водіїв", vehiclesTotal:"Усього авто", openDamages:"Відкриті пошкодження", dueChecks:"Перевірки до строку",
  active:"Активні", inUse:"У роботі", urgent:"Терміново", thisWeek:"Цього тижня",
  driverStatus:"Статус водіїв", showAll:"Показати все", showAllDrivers:"Показати всіх водіїв",
  openControls:"Відкриті перевірки", showAllControls:"Показати всі перевірки",
  damagePriority:"Відкриті пошкодження", high:"Високий", medium:"Середній", low:"Низький",
  nextWeek:"Наступного тижня", in30Days:"Протягом 30 днів", pointsOverview:"Огляд балів", average:"Середнє",
  good:"Добре", critical:"Критично", openPoints:"Відкрити огляд балів",
  currentMessages:"Поточні повідомлення", damageReported:"Пошкодження повідомлено", noOpenDamages:"Немає відкритих пошкоджень",
  controlCompleted:"Перевірку завершено", departureSaved:"Передрейсову перевірку збережено",
  quickAccess:"Швидкий доступ", addDriver:"Додати водія", addVehicle:"Додати авто", reportDamageQuick:"Повідомити пошкодження",
  createInspection:"Створити перевірку", createReport:"Створити звіт",
  notAllowed:"Немає дозволу", pointsSavedForDriver:"Бали нараховано водію",
  pending:"очікує", approved:"схвалено", rejected:"відхилено", approve:"Схвалити", reject:"Відхилити",
  aiRecommendation:"Рекомендація ШІ щодо балів", approval:"Схвалення", workshopLinked:"Пов’язано з майстернею",
  aiDamageInfo:"Завантажте фото та опишіть пошкодження. ШІ створює рекомендацію щодо балів, яку має схвалити керівництво, автопарк або заступник.",
  damageSavedPending:"Пошкодження збережено. Рекомендація ШІ очікує схвалення.",
  pdfArchive:"PDF-архів передрейсових перевірок", temporaryArchive:"Тимчасовий архів до запуску онлайн.", noPdfReports:"PDF-звітів ще немає.", viewPdf:"Переглянути PDF",
  costAnalysis:"Аналіз витрат", costOverview:"Огляд витрат", total:"Разом", addCost:"Додати витрати", category:"Категорія", amount:"Сума", unknown:"Невідомо",
  allRequired:"Заповніть усі обов’язкові поля.", pdfPrepared:"Передрейсову перевірку завершено. PDF автоматично підготовлено до надсилання.",
  today:"Сьогодні", overdue:"Прострочено", tomorrow:"Завтра", pause:"Пауза", unterwegs:"У рейсі", open:"Відкрито"
 },
 ar:{
  goodMorning:"صباح الخير", fleetOverview:"إليك النظرة الحالية على أسطولك.",
  driversTotal:"إجمالي السائقين", vehiclesTotal:"إجمالي المركبات", openDamages:"الأضرار المفتوحة", dueChecks:"الفحوصات المستحقة",
  active:"نشط", inUse:"قيد الاستخدام", urgent:"عاجل", thisWeek:"هذا الأسبوع",
  driverStatus:"حالة السائقين", showAll:"عرض الكل", showAllDrivers:"عرض كل السائقين",
  openControls:"الفحوصات المفتوحة", showAllControls:"عرض كل الفحوصات",
  damagePriority:"الأضرار المفتوحة", high:"مرتفع", medium:"متوسط", low:"منخفض",
  nextWeek:"الأسبوع القادم", in30Days:"خلال 30 يومًا", pointsOverview:"نظرة النقاط", average:"المتوسط",
  good:"جيد", critical:"حرج", openPoints:"فتح نظرة النقاط",
  currentMessages:"الرسائل الحالية", damageReported:"تم الإبلاغ عن ضرر", noOpenDamages:"لا توجد أضرار مفتوحة",
  controlCompleted:"اكتمل الفحص", departureSaved:"تم حفظ فحص الانطلاق",
  quickAccess:"وصول سريع", addDriver:"إضافة سائق", addVehicle:"إضافة مركبة", reportDamageQuick:"الإبلاغ عن ضرر",
  createInspection:"إنشاء فحص", createReport:"إنشاء تقرير",
  notAllowed:"غير مصرح", pointsSavedForDriver:"تم احتساب النقاط للسائق",
  pending:"قيد الانتظار", approved:"تمت الموافقة", rejected:"مرفوض", approve:"موافقة", reject:"رفض",
  aiRecommendation:"توصية نقاط الذكاء الاصطناعي", approval:"الموافقة", workshopLinked:"مرتبط بالورشة",
  aiDamageInfo:"ارفع صورة وصف الضرر. ينشئ الذكاء الاصطناعي توصية نقاط يجب أن توافق عليها الإدارة أو الأسطول أو النائب.",
  damageSavedPending:"تم حفظ بلاغ الضرر. توصية النقاط بانتظار الموافقة.",
  pdfArchive:"أرشيف PDF لفحوصات الانطلاق", temporaryArchive:"أرشيف مؤقت حتى التشغيل المباشر.", noPdfReports:"لا توجد تقارير PDF بعد.", viewPdf:"عرض PDF",
  costAnalysis:"تحليل التكاليف", costOverview:"نظرة التكاليف", total:"الإجمالي", addCost:"إضافة تكلفة", category:"الفئة", amount:"المبلغ", unknown:"غير معروف",
  allRequired:"يرجى ملء جميع الحقول المطلوبة.", pdfPrepared:"اكتمل فحص الانطلاق. تم تجهيز PDF تلقائيًا للإرسال.",
  today:"اليوم", overdue:"متأخر", tomorrow:"غدًا", pause:"استراحة", unterwegs:"في الطريق", open:"مفتوح"
 }
};
function mt(k){var lang=S.lang||mLoad("fc_v17_lang","de");return (MASTER_I18N[lang]&&MASTER_I18N[lang][k])||(MASTER_I18N.de&&MASTER_I18N.de[k])||t(k)||k}
function masterStatusLabel(x){return mt(x)||x}
function exactManagementDashboard(){var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");var rows=drivers.slice(0,5).map(function(d){return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>'}).join("");return shell('<section class="exactDash"><div class="dashHero"><div><h1>Guten Morgen,<br>'+name+'!</h1><p>Hier ist die aktuelle Übersicht deines Fuhrparks.</p></div><div class="dashClock"><small>Dienstag, 20. Mai 2025</small><b>08:24 Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>Fahrer gesamt</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">Aktiv: '+drivers.length+'</small></div><div class="dashKpi"><span>Fahrzeuge gesamt</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">Im Einsatz: '+Math.max(vehicles.length-1,0)+'</small></div><div class="dashKpi"><span>Offene Schäden</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">Dringend: '+Math.min(open,2)+'</small></div><div class="dashKpi"><span>Fällige Prüfungen</span><div><i>▣</i><b>'+vehicles.length+'</b></div><small class="orange">Diese Woche</small></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>Fahrerstatus <button onclick="go(\'vehicles\')">Alle anzeigen →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">Alle Fahrer anzeigen →</button></section><section class="dashPanel"><h2>Offene Kontrollen <button onclick="go(\'check\')">Alle anzeigen →</button></h2>'+dashOpenChecks()+'<button class="dashLink" onclick="go(\'check\')">Alle Kontrollen anzeigen →</button></section></div><div class="dashGridThree"><section class="dashPanel"><h2>Offene Schäden <button onclick="go(\'report\')">Alle anzeigen →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>Dringend</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>Hoch</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>Mittel</span><b>0</b></div></section><section class="dashPanel"><h2>Fällige Prüfungen <button onclick="go(\'maintenance\')">Alle anzeigen →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>Diese Woche</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>Nächste Woche</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>In 30 Tagen</span><b>4</b></div></section><section class="dashPanel"><h2>Punkteübersicht</h2><div class="dashDonut"><div><b>'+avg+'</b><small>Durchschnitt</small></div></div><div class="dashLegend"><span class="green">● Gut</span><span class="yellow">● Mittel</span><span class="red">● Kritisch</span></div><button class="dashLink" onclick="go(\'points\')">Punkteübersicht öffnen →</button></section></div><div class="dashGridTwo"><section class="dashPanel"><h2>Aktuelle Meldungen <button onclick="go(\'notifications\')">Alle anzeigen →</button></h2><div class="dashMsg"><span class="red">⚠</span><div><b>Schaden gemeldet</b><small>'+(open?open+' offene Schäden':'Keine offenen Schäden')+'</small></div><small>Heute</small></div><div class="dashMsg"><span class="blue">ⓘ</span><div><b>Kontrolle abgeschlossen</b><small>Abfahrtskontrolle gespeichert</small></div><small>Heute</small></div></section><section class="dashPanel"><h2>Schnellzugriff</h2><div class="dashQuick"><button onclick="go(\'vehicles\')">👥<br>Fahrer hinzufügen</button><button onclick="go(\'vehicles\')">🚚<br>Fahrzeug hinzufügen</button><button onclick="go(\'report\')">⚠<br>Schaden melden</button><button onclick="go(\'maintenance\')">▣<br>Prüfung erstellen</button><button onclick="go(\'ranking\')">📄<br>Bericht erstellen</button></div></section></div></section>')}
function home(){if(dev())return developerHome();if(isDashboardRole())return exactManagementDashboard();if(S.user&&S.user.role==="workshop")return workshopHome();return driverHome()}
function shell(content){var nav;if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["maintenance","🔧",t("maintenancePlanner")],["report","⚠",t("report")],["more","☰",t("more")]];else if(isDashboardRole())nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>'}
function pointsForm(){if(!canAwardPoints())return "";var drivers=allDrivers();return '<section class="card"><h2>'+t("addPoints")+'</h2><select id="pDriver">'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select><input id="pValue" type="number" placeholder="'+t("points")+'"><input id="pReason" placeholder="'+t("reason")+'"><button onclick="addPoint()">'+t("save")+'</button></section>'}
function addPoint(){if(!canAwardPoints()){alert(t("notAllowed"));return}var driverId=Number(document.getElementById("pDriver").value),value=Number(document.getElementById("pValue").value),reason=(document.getElementById("pReason").value||"").trim();if(!driverId||!value||!reason){alert(t("required"));return}S.points=S.points||[];S.points.unshift({id:Date.now(),driver:driverId,date:new Date().toLocaleDateString(),reason:reason,value:value,by:S.user?S.user.name:""});saveAll();render()}
function pointsPage(){var can=canAwardPoints();var list=(S.points||[]).filter(function(p){return can?true:Number(p.driver)===Number(S.user.id)});var score=can?"-":pointTotal(S.user.id);return shell('<h1 class="sectionTitle">'+t("pointsHistory")+'</h1><section class="card"><h2>'+t("currentScore")+': '+score+'</h2>'+(list.map(function(p){var u=(S.users||[]).find(function(x){return Number(x.id)===Number(p.driver)});return '<div class="row"><span><b>'+(u?u.name:"")+'</b><br><small class="muted">'+p.date+' · '+p.reason+' · '+t("givenBy")+': '+p.by+'</small></span><b>'+(Number(p.value)>0?"+":"")+p.value+'</b></div>'}).join("")||'<p class="muted">'+t("noPoints")+'</p>')+'</section>'+pointsForm())}
function aiDamageScoreByInput(pos,desc,photo){var text=((pos||"")+" "+(desc||"")+" "+(photo||"")).toLowerCase();if(text.indexOf("bremse")>=0||text.indexOf("lenkung")>=0||text.indexOf("unfall")>=0||text.indexOf("kritisch")>=0)return -20;if(text.indexOf("reifen")>=0||text.indexOf("tire")>=0||text.indexOf("ladung")>=0||text.indexOf("sicherung")>=0)return -10;if(text.indexOf("spiegel")>=0||text.indexOf("licht")>=0||text.indexOf("lampe")>=0)return -5;return 0}
function aiDamageClassByScore(points){if(points<=-20)return "Kritisch";if(points<=-10)return "Mittel";if(points<0)return "Leicht";return "Hinweis / keine Punkte"}
function saveDamage(){var vehicle=(document.getElementById("dVehicle")&&document.getElementById("dVehicle").value)||"",pos=(document.getElementById("dPosition")&&document.getElementById("dPosition").value)||"",desc=(document.getElementById("dDesc")&&document.getElementById("dDesc").value)||"",file=document.getElementById("dPhoto"),photo=file&&file.files&&file.files[0]?file.files[0].name:"";if(!vehicle||!pos||!desc){alert(t("required"));return}var recommended=aiDamageScoreByInput(pos,desc,photo);var damage={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicle:vehicle,position:pos,description:desc,photo:photo,status:"open",workshop:true,aiTrainingLinked:true,source:"driverReport",aiRecommendation:recommended,aiSeverity:aiDamageClassByScore(recommended),aiApprovalStatus:"pending",pointsApplied:false,created:new Date().toLocaleString()};S.damages=S.damages||[];S.damages.unshift(damage);S.aiTraining=S.aiTraining||[];S.aiTraining.unshift({id:damage.id,file:photo,damageClass:pos,severity:damage.aiSeverity,points:recommended,linkedDamageId:damage.id,approvalStatus:"pending",date:new Date().toLocaleString()});saveAll();render()}
function approveAiDamage(id){if(!canApproveAiDamage()){alert(t("notAllowed"));return}var d=(S.damages||[]).find(function(x){return x.id===id});if(!d)return;d.aiApprovalStatus="approved";d.approvedBy=S.user?S.user.name:"";if(!d.pointsApplied&&Number(d.aiRecommendation||0)!==0){S.points=S.points||[];S.points.unshift({id:Date.now(),driver:d.driver,date:new Date().toLocaleDateString(),reason:"KI-Schadenfreigabe: "+(d.position||""),value:Number(d.aiRecommendation||0),by:S.user?S.user.name:""});d.pointsApplied=true}saveAll();render()}
function rejectAiDamage(id){if(!canApproveAiDamage()){alert(t("notAllowed"));return}var d=(S.damages||[]).find(function(x){return x.id===id});if(d){d.aiApprovalStatus="rejected";saveAll();render()}}
function report(){var canReport=!!S.user&&(S.user.role==="driver"||isDashboardRole()||mExtra("driver"));var opts=(S.vehicles||[]).map(function(v){return '<option value="'+v.name+' '+v.plate+'">'+v.name+' · '+v.plate+'</option>'}).join("");var form=canReport?'<section class="card"><h2>'+t("reportDamage")+'</h2><p class="muted">Foto hochladen, Schaden beschreiben. Die KI erstellt automatisch eine Punkteempfehlung, die erst durch Chef/Fuhrpark/Stellvertretung freigegeben wird.</p><select id="dVehicle">'+opts+'</select><input id="dPosition" placeholder="'+t("position")+'"><textarea id="dDesc" placeholder="'+t("description")+'"></textarea><input id="dPhoto" type="file" accept="image/*"><button onclick="saveDamage()">'+t("save")+'</button></section>':"";return shell(form+damageList())}
function damageList(){var visible=(S.damages||[]).filter(function(d){return admin()||work()||isChefFullAccess()||(S.user&&Number(d.driver)===Number(S.user.id))});return '<section class="card"><h2>'+t("damageList")+'</h2>'+(visible.map(function(d){var approval=d.aiApprovalStatus||"pending";var ai='<br>🧠 KI-Punkteempfehlung: '+(Number(d.aiRecommendation||0)>0?"+":"")+Number(d.aiRecommendation||0)+' Punkte · Freigabe: '+approval;var controls=(canApproveAiDamage()&&approval==="pending")?'<br><button onclick="approveAiDamage('+d.id+')">✅ Freigeben</button><button class="secondary" onclick="rejectAiDamage('+d.id+')">✖ Ablehnen</button>':"";return '<div class="row"><span><b>'+(d.vehicle||"-")+'</b><br><small class="muted">'+(d.position||"")+' · '+(d.description||"")+' · '+(d.photo||"")+' · '+statusText(d.status)+ai+'<br>🔧 Werkstatt verknüpft</small></span><span><button class="secondary" onclick="progressDamage('+d.id+')">'+t("markProgress")+'</button><button onclick="toggleDamage('+d.id+')">'+(d.status==="done"?t("reopen"):t("markDone"))+'</button>'+controls+'</span></div>'}).join("")||'<p class="muted">'+t("noReports")+'</p>')+'</section>'}
function inspectionPdfHtml(record){return '<html><head><title>Abfahrtskontrolle</title></head><body><h1>Abfahrtskontrolle</h1><p>'+record.date+'</p><p><b>Fahrer:</b> '+record.driverName+'</p><p><b>Fahrzeug:</b> '+record.vehicle+'</p></body></html>'}
function ensurePdfArchive(){S.pdfArchive=S.pdfArchive||mLoad("fc_v17_pdf_archive",[]);return S.pdfArchive}
function archiveInspectionPdf(record){ensurePdfArchive();S.pdfArchive.unshift({id:Date.now(),inspectionId:record.id,driver:record.driver,driverName:record.driverName,vehicle:record.vehicle,date:record.date,pdfHtml:inspectionPdfHtml(record),created:new Date().toLocaleString(),visibleFor:"deputy"});mSave("fc_v17_pdf_archive",S.pdfArchive)}
function queueInspectionMail(record){S.mailQueue=S.mailQueue||[];S.mailQueue.unshift({id:Date.now(),to:MAIL_TO,subject:"Abfahrtskontrolle "+(record.vehicle||"")+" "+(record.date||""),type:"inspection_pdf",inspectionId:record.id,status:"prepared_backend_required",pdfHtml:inspectionPdfHtml(record),created:new Date().toLocaleString()});archiveInspectionPdf(record);saveAll()}
function deputyPdfArchivePage(){if(!isDeputyRole())return shell('<section class="card"><h2>'+t("notAllowed")+'</h2></section>');var list=ensurePdfArchive();return shell('<h1 class="sectionTitle">PDF-Archiv Abfahrtskontrollen</h1><section class="card"><p class="muted">Vorübergehendes Archiv bis zum Livebetrieb.</p>'+(list.map(function(p){return '<div class="row"><span><b>'+p.driverName+'</b><br><small class="muted">'+p.vehicle+' · '+p.date+'</small></span><button onclick="openArchivedPdf('+p.id+')">PDF ansehen</button></div>'}).join("")||'<p class="muted">Noch keine PDF-Berichte vorhanden.</p>')+'</section>')}
function openArchivedPdf(id){var p=ensurePdfArchive().find(function(x){return x.id===id});if(!p)return;var w=window.open("", "_blank");if(w&&w.document){w.document.write(p.pdfHtml||"");w.document.close()}}
function initSig(){var c=document.getElementById("sig");if(!c)return;var ctx=c.getContext("2d");ctx.lineWidth=3;ctx.lineCap="round";ctx.strokeStyle="#111";var drawing=false,last=null;function pos(e){var r=c.getBoundingClientRect();var p=e.touches&&e.touches[0]?e.touches[0]:e;return {x:(p.clientX-r.left)*(c.width/r.width),y:(p.clientY-r.top)*(c.height/r.height)}}function start(e){drawing=true;last=pos(e);if(e.preventDefault)e.preventDefault()}function move(e){if(!drawing)return;var p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;try{S.sig=c.toDataURL("image/png")}catch(err){};if(e.preventDefault)e.preventDefault()}function end(e){drawing=false;try{S.sig=c.toDataURL("image/png")}catch(err){}}c.onmousedown=start;c.onmousemove=move;c.onmouseup=end;c.onmouseleave=end;c.ontouchstart=start;c.ontouchmove=move;c.ontouchend=end}
function clearSig(){var c=document.getElementById("sig");if(c)c.getContext("2d").clearRect(0,0,c.width,c.height);S.sig=""}
function check(){if(!canDoInspection())return shell('<section class="card"><h2>'+t("notAllowed")+'</h2></section>');ensurePilotVehicle();var av=(S.user&&S.user.role==="driver"&&!canAwardPoints())?driverSelectableVehicles():(S.vehicles||[]);if(!av.length)av=S.vehicles||[];var labels=CHECKS[S.lang]||CHECKS.de;var options=av.map(function(v){return '<option value="'+v.id+'" '+(S.activeVehicle===v.id?'selected':'')+'>'+v.name+' · '+v.plate+'</option>'}).join("");return shell('<h1 class="sectionTitle">'+t("departureCheck")+'</h1><section class="card warn"><b>'+t("mustCheck")+'</b><p>'+t("laborNotice")+'</p></section><section class="card"><label>'+t("vehicle")+'<select id="checkVehicle">'+options+'</select></label></section><section class="card">'+labels.map(function(x,i){return '<label class="checkrow"><input type="checkbox" id="chk'+i+'" '+(S.checks[i]?'checked':'')+' onchange="S.checks['+i+']=this.checked"> <span>'+x+'</span></label><textarea id="cmt'+i+'" placeholder="Kommentar optional" oninput="S.comments['+i+']=this.value">'+(S.comments[i]||'')+'</textarea>'}).join("")+'</section><section class="card"><h2>'+t("damagePhotos")+'</h2><input id="damagePhotos" type="file" accept="image/*" multiple></section><section class="card"><h2>'+t("signature")+'</h2><canvas id="sig" width="600" height="240"></canvas><button class="secondary" onclick="clearSig()">'+t("clear")+'</button></section><button class="lm-primary primary" onclick="completeCheck('+labels.length+')">'+t("complete")+'</button>')}
function completeCheck(n){var vehicleId=Number((document.getElementById("checkVehicle")||{}).value||0);if(!vehicleId){alert(t("required"));return}for(var i=0;i<n;i++){var el=document.getElementById("chk"+i);var checked=el?el.checked:S.checks[i];if(!checked){alert("Bitte alle Pflichtfelder ausfüllen.");return}S.checks[i]=true}var v=(S.vehicles||[]).find(function(x){return x.id===vehicleId});var sigCanvas=document.getElementById("sig");if(sigCanvas&&!S.sig){try{S.sig=sigCanvas.toDataURL("image/png")}catch(e){}}var photos=document.getElementById("damagePhotos");var photoNames=photos&&photos.files?Array.from(photos.files).map(function(f){return f.name}):[];var labels=CHECKS[S.lang]||CHECKS.de;var record={id:Date.now(),driver:S.user.id,driverName:S.user.name,vehicleId:vehicleId,vehicle:v?(v.name+" "+v.plate):"",date:new Date().toLocaleString(),checks:labels.map(function(label,i){return {label:label,checked:true,comment:S.comments[i]||""}}),photos:photoNames,signature:S.sig||""};S.inspections=S.inspections||[];S.inspections.push(record);queueInspectionMail(record);saveAll();S.checks={};S.comments={};S.sig="";alert("Abfahrtskontrolle abgeschlossen. PDF wurde automatisch für den Versand vorbereitet.");S.tab="home";render()}
function costsPage(){var costs=S.costs||[],vehicles=S.vehicles||[];var total=costs.reduce(function(a,c){return a+Number(c.amount||0)},0);var grouped={};costs.forEach(function(c){var k=c.vehicle||c.vehicleId||0;grouped[k]=(grouped[k]||0)+Number(c.amount||0)});var rows=Object.keys(grouped).map(function(k){var v=vehicles.find(function(x){return String(x.id)===String(k)});return '<div class="row"><span><b>'+(v?v.name+' · '+v.plate:'Unbekannt')+'</b></span><b>'+grouped[k].toFixed(2)+' €</b></div>'}).join("");var options=vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("");var form=canAwardPoints()?'<section class="card"><h2>Kosten hinzufügen</h2><select id="cVehicle">'+options+'</select><input id="cCat" placeholder="Kategorie"><input id="cAmount" type="number" step="0.01" placeholder="Betrag"><textarea id="cNote" placeholder="'+t("comment")+'"></textarea><button onclick="addCost()">'+t("save")+'</button></section>':"";return shell('<h1 class="sectionTitle">Kostenanalyse</h1><section class="card"><h2>Kostenübersicht</h2><div class="row"><span>Gesamt</span><b>'+total.toFixed(2)+' €</b></div>'+rows+'</section>'+form)}
function more(){var buttons='';buttons+='<button onclick="go(\'license\')">🪪 '+t("licenseCheck")+' <span>›</span></button>';buttons+='<button onclick="go(\'documents\')">📂 '+t("documentFolder")+' <span>›</span></button>';if(admin()||work())buttons+='<button onclick="go(\'maintenance\')">🛠 '+t("maintenancePlanner")+' <span>›</span></button>';if(admin())buttons+='<button onclick="go(\'costs\')">💶 Kostenanalyse <span>›</span></button>';buttons+='<button onclick="go(\'aiDamage\')">🤖 '+t("aiDamageCheck")+' <span>›</span></button>';if(admin()||dev())buttons+='<button onclick="go(\'aiTraining\')">🧠 '+t("aiTraining")+' <span>›</span></button>';if(isDeputyRole())buttons+='<button onclick="go(\'pdfArchive\')">📄 PDF-Archiv Abfahrtskontrollen <span>›</span></button>';return shell('<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>'+t("settings")+'</span></div><h2>'+t("settings")+'</h2><label>'+t("language")+'<select onchange="setLang(this.value)">'+LANG.map(function(l){return '<option value="'+l[0]+'" '+(S.lang===l[0]?"selected":"")+'>'+l[1]+'</option>'}).join("")+'</select></label><label>'+t("mode")+'<select onchange="setTheme(this.value)"><option value="light" '+(S.theme==="light"?"selected":"")+'>'+t("light")+'</option><option value="dark" '+(S.theme==="dark"?"selected":"")+'>'+t("dark")+'</option></select></label><div class="settingsList">'+buttons+'</div><button class="logoutAction" onclick="logout()">↩ '+t("logout")+'</button></section>')}

function masterSafePage(title){return function(){return shell('<section class="card"><h2>'+title+'</h2><p class="muted">Bereich ist vorbereitet.</p></section>')}}
if(typeof damageBonusPage==="undefined")var damageBonusPage=masterSafePage("Bonus Schadensfreiheit");
if(typeof damageSummaryPage==="undefined")var damageSummaryPage=masterSafePage("Schadensübersicht");
if(typeof aiDamagePage==="undefined")var aiDamagePage=masterSafePage("KI-Schadenprüfung");
if(typeof aiTrainingPage==="undefined")var aiTrainingPage=masterSafePage("KI-Trainingsdaten");
if(typeof fleetLivePage==="undefined")var fleetLivePage=masterSafePage("Fuhrpark Live");
if(typeof rankingPage==="undefined")var rankingPage=masterSafePage("Ranking");

function render(){masterNormalizeUsers();document.body.classList.toggle("dark",S.theme==="dark");var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more};var root=document.getElementById("root");if(!S.user){root.innerHTML=loginView();return}root.innerHTML=(routes[S.tab]||home)();setTimeout(function(){if(S.tab==="check")initSig()},50)}
masterNormalizeUsers();
render();


/* === V18.4 i18n function overrides === */
function dashStatus(d){var done=(S.inspections||[]).some(function(i){return Number(i.driver)===Number(d.id)});if(done)return '<span class="dashStatus green">'+mt('unterwegs')+'</span>';if(d.status==="red")return '<span class="dashStatus red">'+mt('open')+'</span>';return '<span class="dashStatus yellow">'+mt('pause')+'</span>'}
function dashOpenChecks(){return allDrivers().slice(0,5).map(function(d,i){var v=(S.vehicles||[]).find(function(x){return Number(x.assigned)===Number(d.id)})||(S.vehicles||[])[i]||{};var checked=(S.inspections||[]).some(function(ins){return Number(ins.driver)===Number(d.id)});var label=checked?mt('today'):(i===0?mt('overdue'):(i===1?mt('today'):mt('tomorrow')));var cls=label===mt('overdue')?'red':(label===mt('today')?'yellow':'blue');return '<div class="dashListRow"><span class="dashPlate">'+(v.plate||('B-'+(1000+i)))+'</span><span>'+d.name+'</span><span class="dashStatus '+cls+'">'+label+'</span></div>'}).join("")}
function exactManagementDashboard(){var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");var rows=drivers.slice(0,5).map(function(d){return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>'}).join("");return shell('<section class="exactDash"><div class="dashHero"><div><h1>'+mt('goodMorning')+'<br>'+name+'!</h1><p>'+mt('fleetOverview')+'</p></div><div class="dashClock"><small>Dienstag, 20. Mai 2025</small><b>08:24 Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>'+mt('driversTotal')+'</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">'+mt('active')+': '+drivers.length+'</small></div><div class="dashKpi"><span>'+mt('vehiclesTotal')+'</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">'+mt('inUse')+': '+Math.max(vehicles.length-1,0)+'</small></div><div class="dashKpi"><span>'+mt('openDamages')+'</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">'+mt('urgent')+': '+Math.min(open,2)+'</small></div><div class="dashKpi"><span>'+mt('dueChecks')+'</span><div><i>▣</i><b>'+vehicles.length+'</b></div><small class="orange">'+mt('thisWeek')+'</small></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('driverStatus')+' <button onclick="go(\'vehicles\')">'+mt('showAll')+' →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">'+mt('showAllDrivers')+' →</button></section><section class="dashPanel"><h2>'+mt('openControls')+' <button onclick="go(\'check\')">'+mt('showAll')+' →</button></h2>'+dashOpenChecks()+'<button class="dashLink" onclick="go(\'check\')">'+mt('showAllControls')+' →</button></section></div><div class="dashGridThree"><section class="dashPanel"><h2>'+mt('openDamages')+' <button onclick="go(\'report\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>'+mt('urgent')+'</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>'+mt('high')+'</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>'+mt('medium')+'</span><b>0</b></div></section><section class="dashPanel"><h2>'+mt('dueChecks')+' <button onclick="go(\'maintenance\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('thisWeek')+'</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('nextWeek')+'</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>'+mt('in30Days')+'</span><b>4</b></div></section><section class="dashPanel"><h2>'+mt('pointsOverview')+'</h2><div class="dashDonut"><div><b>'+avg+'</b><small>'+mt('average')+'</small></div></div><div class="dashLegend"><span class="green">● '+mt('good')+'</span><span class="yellow">● '+mt('medium')+'</span><span class="red">● '+mt('critical')+'</span></div><button class="dashLink" onclick="go(\'points\')">'+mt('openPoints')+' →</button></section></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('currentMessages')+' <button onclick="go(\'notifications\')">'+mt('showAll')+' →</button></h2><div class="dashMsg"><span class="red">⚠</span><div><b>'+mt('damageReported')+'</b><small>'+(open?open+' '+mt('openDamages'):mt('noOpenDamages'))+'</small></div><small>'+mt('today')+'</small></div><div class="dashMsg"><span class="blue">ⓘ</span><div><b>'+mt('controlCompleted')+'</b><small>'+mt('departureSaved')+'</small></div><small>'+mt('today')+'</small></div></section><section class="dashPanel"><h2>'+mt('quickAccess')+'</h2><div class="dashQuick"><button onclick="go(\'vehicles\')">👥<br>'+mt('addDriver')+'</button><button onclick="go(\'vehicles\')">🚚<br>'+mt('addVehicle')+'</button><button onclick="go(\'report\')">⚠<br>'+mt('reportDamageQuick')+'</button><button onclick="go(\'maintenance\')">▣<br>'+mt('createInspection')+'</button><button onclick="go(\'ranking\')">📄<br>'+mt('createReport')+'</button></div></section></div></section>')}
function saveDamage(){var vehicle=(document.getElementById("dVehicle")&&document.getElementById("dVehicle").value)||"",pos=(document.getElementById("dPosition")&&document.getElementById("dPosition").value)||"",desc=(document.getElementById("dDesc")&&document.getElementById("dDesc").value)||"",file=document.getElementById("dPhoto"),photo=file&&file.files&&file.files[0]?file.files[0].name:"";if(!vehicle||!pos||!desc){alert(t("required"));return}var recommended=aiDamageScoreByInput(pos,desc,photo);var damage={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicle:vehicle,position:pos,description:desc,photo:photo,status:"open",workshop:true,aiTrainingLinked:true,source:"driverReport",aiRecommendation:recommended,aiSeverity:aiDamageClassByScore(recommended),aiApprovalStatus:"pending",pointsApplied:false,created:new Date().toLocaleString()};S.damages=S.damages||[];S.damages.unshift(damage);S.aiTraining=S.aiTraining||[];S.aiTraining.unshift({id:damage.id,file:photo,damageClass:pos,severity:damage.aiSeverity,points:recommended,linkedDamageId:damage.id,approvalStatus:"pending",date:new Date().toLocaleString()});saveAll();alert(mt('damageSavedPending'));render()}
function report(){var canReport=!!S.user&&(S.user.role==="driver"||isDashboardRole()||mExtra("driver"));var opts=(S.vehicles||[]).map(function(v){return '<option value="'+v.name+' '+v.plate+'">'+v.name+' · '+v.plate+'</option>'}).join("");var form=canReport?'<section class="card"><h2>'+t("reportDamage")+'</h2><p class="muted">'+mt('aiDamageInfo')+'</p><select id="dVehicle">'+opts+'</select><input id="dPosition" placeholder="'+t("position")+'"><textarea id="dDesc" placeholder="'+t("description")+'"></textarea><input id="dPhoto" type="file" accept="image/*"><button onclick="saveDamage()">'+t("save")+'</button></section>':"";return shell(form+damageList())}
function damageList(){var visible=(S.damages||[]).filter(function(d){return admin()||work()||isChefFullAccess()||(S.user&&Number(d.driver)===Number(S.user.id))});return '<section class="card"><h2>'+t("damageList")+'</h2>'+(visible.map(function(d){var approval=d.aiApprovalStatus||"pending";var ai='<br>🧠 '+mt('aiRecommendation')+': '+(Number(d.aiRecommendation||0)>0?"+":"")+Number(d.aiRecommendation||0)+' '+t('points')+' · '+mt('approval')+': '+mt(approval);var controls=(canApproveAiDamage()&&approval==="pending")?'<br><button onclick="approveAiDamage('+d.id+')">✅ '+mt('approve')+'</button><button class="secondary" onclick="rejectAiDamage('+d.id+')">✖ '+mt('reject')+'</button>':"";return '<div class="row"><span><b>'+(d.vehicle||"-")+'</b><br><small class="muted">'+(d.position||"")+' · '+(d.description||"")+' · '+(d.photo||"")+' · '+statusText(d.status)+ai+'<br>🔧 '+mt('workshopLinked')+'</small></span><span><button class="secondary" onclick="progressDamage('+d.id+')">'+t("markProgress")+'</button><button onclick="toggleDamage('+d.id+')">'+(d.status==="done"?t("reopen"):t("markDone"))+'</button>'+controls+'</span></div>'}).join("")||'<p class="muted">'+t("noReports")+'</p>')+'</section>'}
function deputyPdfArchivePage(){if(!isDeputyRole())return shell('<section class="card"><h2>'+mt('notAllowed')+'</h2></section>');var list=ensurePdfArchive();return shell('<h1 class="sectionTitle">'+mt('pdfArchive')+'</h1><section class="card"><p class="muted">'+mt('temporaryArchive')+'</p>'+(list.map(function(p){return '<div class="row"><span><b>'+p.driverName+'</b><br><small class="muted">'+p.vehicle+' · '+p.date+'</small></span><button onclick="openArchivedPdf('+p.id+')">'+mt('viewPdf')+'</button></div>'}).join("")||'<p class="muted">'+mt('noPdfReports')+'</p>')+'</section>')}
function completeCheck(n){var vehicleId=Number((document.getElementById("checkVehicle")||{}).value||0);if(!vehicleId){alert(t("required"));return}for(var i=0;i<n;i++){var el=document.getElementById("chk"+i);var checked=el?el.checked:S.checks[i];if(!checked){alert(mt('allRequired'));return}S.checks[i]=true}var v=(S.vehicles||[]).find(function(x){return x.id===vehicleId});var sigCanvas=document.getElementById("sig");if(sigCanvas&&!S.sig){try{S.sig=sigCanvas.toDataURL("image/png")}catch(e){}}var photos=document.getElementById("damagePhotos");var photoNames=photos&&photos.files?Array.from(photos.files).map(function(f){return f.name}):[];var labels=CHECKS[S.lang]||CHECKS.de;var record={id:Date.now(),driver:S.user.id,driverName:S.user.name,vehicleId:vehicleId,vehicle:v?(v.name+" "+v.plate):"",date:new Date().toLocaleString(),checks:labels.map(function(label,i){return {label:label,checked:true,comment:S.comments[i]||""}}),photos:photoNames,signature:S.sig||""};S.inspections=S.inspections||[];S.inspections.push(record);queueInspectionMail(record);saveAll();S.checks={};S.comments={};S.sig="";alert(mt('pdfPrepared'));S.tab="home";render()}
function costsPage(){var costs=S.costs||[],vehicles=S.vehicles||[];var total=costs.reduce(function(a,c){return a+Number(c.amount||0)},0);var grouped={};costs.forEach(function(c){var k=c.vehicle||c.vehicleId||0;grouped[k]=(grouped[k]||0)+Number(c.amount||0)});var rows=Object.keys(grouped).map(function(k){var v=vehicles.find(function(x){return String(x.id)===String(k)});return '<div class="row"><span><b>'+(v?v.name+' · '+v.plate:mt('unknown'))+'</b></span><b>'+grouped[k].toFixed(2)+' €</b></div>'}).join("");var options=vehicles.map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("");var form=canAwardPoints()?'<section class="card"><h2>'+mt('addCost')+'</h2><select id="cVehicle">'+options+'</select><input id="cCat" placeholder="'+mt('category')+'"><input id="cAmount" type="number" step="0.01" placeholder="'+mt('amount')+'"><textarea id="cNote" placeholder="'+t("comment")+'"></textarea><button onclick="addCost()">'+t("save")+'</button></section>':"";return shell('<h1 class="sectionTitle">'+mt('costAnalysis')+'</h1><section class="card"><h2>'+mt('costOverview')+'</h2><div class="row"><span>'+mt('total')+'</span><b>'+total.toFixed(2)+' €</b></div>'+rows+'</section>'+form)}


/* === MASTER RELEASE V18.5 FAHRER FAHRZEUG FIX === */

/* Klare Rollen: reine Fahrer dürfen nur Fahrerfunktionen sehen. */
function masterNormalizeUsers(){
 S.users=S.users||[];
 var required=[
  {id:1,name:"Marcel Hoppe",login:"Hoppe.M",password:"Besen",role:"driver",extraRoles:[],language:"de",points:85,status:"green"},
  {id:2,name:"Pilot Fahrer 2",login:"Fahrer.2",password:"Pilot2",role:"driver",extraRoles:[],language:"de",points:0,status:"green"},
  {id:991,name:"Marcel Hoppe Fuhrpark",login:"Marcel",password:"Anhänger",role:"driver",extraRoles:["fleet"],language:"de",points:0,status:"green"},
  {id:992,name:"Sascha Thollembeek",login:"Sascha",password:"Schraubenschlüssel",role:"driver",extraRoles:["boss","workshop","deputy"],language:"de",points:0,status:"green"},
  {id:993,name:"Tamara",login:"Tamara",password:"Sternenhimmel",role:"boss",extraRoles:["fleet","workshop","driver"],language:"de",points:0,status:"green"},
  {id:994,name:"Hidir Daglioglu",login:"Hidir Daglioglu",password:"Einhorn",role:"boss",extraRoles:["fleet","workshop"],language:"de",points:0,status:"green"},
  {id:800,name:"Chef",login:"Chef",password:"Wassermelonen",role:"boss",language:"de",points:0,status:"green"},
  {id:910,name:"Fuhrparkmanagement",login:"fuhrpark",password:"demo",role:"fleet",language:"de",points:0,status:"green"},
  {id:900,name:"Werkstatt",login:"Werkstatt",password:"Eisbecher",role:"workshop",language:"de",points:0,status:"green"},
  {id:999,name:"Entwickler",login:"Entwickler",password:"Laubblätter",role:"developer",language:"de",points:0,status:"green"}
 ];
 required.forEach(function(r){
   var f=S.users.find(function(u){
    return Number(u.id)===Number(r.id)||
      String(u.login||"").trim().toLowerCase()===String(r.login).trim().toLowerCase()||
      (r.login==="Hoppe.M"&&String(u.login||"").trim().toLowerCase()==="hopper.m");
   });
   if(f){Object.keys(r).forEach(function(k){f[k]=r[k]})}else{S.users.push(r)}
 });
 /* alte falsche Vollzugriffe bei reinen Fahrerzugängen entfernen */
 S.users.forEach(function(u){
   if(String(u.login||"").toLowerCase()==="hoppe.m"||String(u.login||"").toLowerCase()==="hopper.m"||String(u.login||"").toLowerCase()==="fahrer.2"){
     u.role="driver";u.extraRoles=[];
   }
 });
}

/* Alias Hopper.M akzeptieren, aber als reinen Fahrer Hoppe.M anmelden. */
function login(e){
 if(e&&e.preventDefault)e.preventDefault();
 masterNormalizeUsers();
 var n=(document.getElementById("loginName")&&document.getElementById("loginName").value||"").trim().toLowerCase();
 var p=(document.getElementById("loginPass")&&document.getElementById("loginPass").value||"").trim();
 if(n==="hopper.m")n="hoppe.m";
 var u=(S.users||[]).find(function(x){return String(x.login||x.user||"").trim().toLowerCase()===n&&String(x.password||x.pass||"").trim()===p});
 if(!u){alert(t("loginFailed"));return}
 S.user=Object.assign({},u);
 S.lang=mLoad("fc_v17_lang",u.language||"de");
 S.tab="home";
 var av=(S.vehicles||[]).filter(function(v){return Number(v.assigned)===Number(S.user.id)});
 if(av[0])S.activeVehicle=av[0].id;
 saveAll();
 render();
}

function isPureDriver(){
 return !!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||S.user.extraRoles.length===0));
}

function canAwardPoints(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")))}
function canApproveAiDamage(){return canAwardPoints()}
function isChefFullAccess(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="admin"||mExtra("boss")||mExtra("admin")))}
function isDashboardRole(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")))}
function canDoInspection(){return !!(S.user&&(S.user.role==="driver"||S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("driver")||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")))}
function admin(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="developer"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("developer")||mExtra("admin")))}
function work(){return !!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||isChefFullAccess()))}

function home(){
 if(dev())return developerHome();
 if(isDashboardRole())return exactManagementDashboard();
 if(S.user&&S.user.role==="workshop")return workshopHome();
 return driverHome();
}

function shell(content){
 var nav;
 if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];
 else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["maintenance","🔧",t("maintenancePlanner")],["report","⚠",t("report")],["more","☰",t("more")]];
 else if(isDashboardRole())nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>';
}

/* Fahrzeug-/Pilotfahrzeug-Eintragung inkl. HU/TÜV/SP/Tachoprüfung als Datum. */
function vehicleForm(){
 if(!admin())return "";
 var drivers=allDrivers();
 return '<section class="card"><h2>Pilotfahrzeug / Kombination eintragen</h2>'+
 '<input id="vName" placeholder="Fahrzeug / Anhänger / Kombination">'+
 '<input id="vPlate" placeholder="Kennzeichen">'+
 '<select id="vType"><option value="vehicle">Fahrzeug</option><option value="trailer">Anhänger</option><option value="combo">Kombination</option></select>'+
 '<select id="vAssigned"><option value="">nicht zugewiesen</option>'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select>'+
 '<label>HU / TÜV <input id="vHu" type="date"></label>'+
 '<label>SP <input id="vSp" type="date"></label>'+
 '<label>Tachoprüfung <input id="vTacho" type="date"></label>'+
 '<button onclick="addVehicle()">'+t("save")+'</button></section>';
}

function addVehicle(){
 if(!admin()){alert(mt("notAllowed"));return}
 var name=(document.getElementById("vName")&&document.getElementById("vName").value||"").trim();
 var plate=(document.getElementById("vPlate")&&document.getElementById("vPlate").value||"").trim();
 var type=(document.getElementById("vType")&&document.getElementById("vType").value)||"vehicle";
 var assignedRaw=(document.getElementById("vAssigned")&&document.getElementById("vAssigned").value)||"";
 var hu=(document.getElementById("vHu")&&document.getElementById("vHu").value)||"";
 var sp=(document.getElementById("vSp")&&document.getElementById("vSp").value)||"";
 var tacho=(document.getElementById("vTacho")&&document.getElementById("vTacho").value)||"";
 if(!name||!plate){alert(t("required"));return}
 S.vehicles=S.vehicles||[];
 S.vehicles.unshift({
   id:Date.now(),
   name:name,
   plate:plate,
   type:type,
   assigned:assignedRaw?Number(assignedRaw):null,
   hu:hu,
   tuv:hu,
   sp:sp,
   tacho:tacho,
   created:new Date().toLocaleString()
 });
 saveAll();
 render();
}

function vehicles(){
 var list=(S.vehicles||[]).filter(function(v){return admin()||work()||isDashboardRole()||!v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});
 return shell('<h1 class="sectionTitle">'+t("vehicles")+'</h1>'+vehicleForm()+
 '<section class="card"><h2>Fahrzeuge / Pilotfahrzeuge</h2>'+
 (list.map(function(v){
   var u=(S.users||[]).find(function(x){return Number(x.id)===Number(v.assigned)});
   return '<div class="row"><span><b>'+v.name+' · '+v.plate+'</b><br><small class="muted">Typ: '+(v.type||"Fahrzeug")+' · Fahrer: '+(u?u.name:"nicht zugewiesen")+'<br>HU/TÜV: '+(v.hu||v.tuv||"-")+' · SP: '+(v.sp||"-")+' · Tachoprüfung: '+(v.tacho||"-")+'</small></span><span>'+deadlineBadge(v.hu||v.tuv)+' '+deadlineBadge(v.sp)+' '+deadlineBadge(v.tacho)+'</span></div>';
 }).join("")||'<p class="muted">'+t("noData")+'</p>')+'</section>');
}

/* render erneut binden */
function render(){
 masterNormalizeUsers();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}
masterNormalizeUsers();


/* === FINAL MASTER RELEASE V18.6 CLOCK + CONSOLIDATION === */

function getCurrentDateTime(){
 var lang=S.lang||mLoad("fc_v17_lang","de");
 var localeMap={de:"de-DE",en:"en-GB",tr:"tr-TR",pl:"pl-PL",ro:"ro-RO",ru:"ru-RU",uk:"uk-UA",ar:"ar-SA"};
 var locale=localeMap[lang]||"de-DE";
 var now=new Date();
 return {
  date:new Intl.DateTimeFormat(locale,{weekday:"long",day:"2-digit",month:"long",year:"numeric",timeZone:"Europe/Berlin"}).format(now),
  time:new Intl.DateTimeFormat(locale,{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Berlin"}).format(now)
 };
}

function exactManagementDashboard(){
 var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;
 var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;
 var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");
 var current=getCurrentDateTime();
 var rows=drivers.slice(0,5).map(function(d){
   return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>';
 }).join("");
 return shell('<section class="exactDash">'+
 '<div class="dashHero"><div><h1>'+mt('goodMorning')+'<br>'+name+'!</h1><p>'+mt('fleetOverview')+'</p></div><div class="dashClock"><small>'+current.date+'</small><b>'+current.time+' Uhr</b></div></div>'+
 '<div class="dashKpis">'+
 '<div class="dashKpi"><span>'+mt('driversTotal')+'</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">'+mt('active')+': '+drivers.length+'</small></div>'+
 '<div class="dashKpi"><span>'+mt('vehiclesTotal')+'</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">'+mt('inUse')+': '+Math.max(vehicles.length-1,0)+'</small></div>'+
 '<div class="dashKpi"><span>'+mt('openDamages')+'</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">'+mt('urgent')+': '+Math.min(open,2)+'</small></div>'+
 '<div class="dashKpi"><span>'+mt('dueChecks')+'</span><div><i>▣</i><b>'+vehicles.length+'</b></div><small class="orange">'+mt('thisWeek')+'</small></div>'+
 '</div>'+
 '<div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('driverStatus')+' <button onclick="go(\'vehicles\')">'+mt('showAll')+' →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">'+mt('showAllDrivers')+' →</button></section><section class="dashPanel"><h2>'+mt('openControls')+' <button onclick="go(\'check\')">'+mt('showAll')+' →</button></h2>'+dashOpenChecks()+'<button class="dashLink" onclick="go(\'check\')">'+mt('showAllControls')+' →</button></section></div>'+
 '<div class="dashGridThree"><section class="dashPanel"><h2>'+mt('openDamages')+' <button onclick="go(\'report\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>'+mt('urgent')+'</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>'+mt('high')+'</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>'+mt('medium')+'</span><b>0</b></div></section><section class="dashPanel"><h2>'+mt('dueChecks')+' <button onclick="go(\'maintenance\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('thisWeek')+'</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('nextWeek')+'</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>'+mt('in30Days')+'</span><b>4</b></div></section><section class="dashPanel"><h2>'+mt('pointsOverview')+'</h2><div class="dashDonut"><div><b>'+avg+'</b><small>'+mt('average')+'</small></div></div><div class="dashLegend"><span class="green">● '+mt('good')+'</span><span class="yellow">● '+mt('medium')+'</span><span class="red">● '+mt('critical')+'</span></div><button class="dashLink" onclick="go(\'points\')">'+mt('openPoints')+' →</button></section></div>'+
 '<div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('currentMessages')+' <button onclick="go(\'notifications\')">'+mt('showAll')+' →</button></h2><div class="dashMsg"><span class="red">⚠</span><div><b>'+mt('damageReported')+'</b><small>'+(open?open+' '+mt('openDamages'):mt('noOpenDamages'))+'</small></div><small>'+mt('today')+'</small></div><div class="dashMsg"><span class="blue">ⓘ</span><div><b>'+mt('controlCompleted')+'</b><small>'+mt('departureSaved')+'</small></div><small>'+mt('today')+'</small></div></section><section class="dashPanel"><h2>'+mt('quickAccess')+'</h2><div class="dashQuick"><button onclick="go(\'vehicles\')">👥<br>'+mt('addDriver')+'</button><button onclick="go(\'vehicles\')">🚚<br>'+mt('addVehicle')+'</button><button onclick="go(\'report\')">⚠<br>'+mt('reportDamageQuick')+'</button><button onclick="go(\'maintenance\')">▣<br>'+mt('createInspection')+'</button><button onclick="go(\'ranking\')">📄<br>'+mt('createReport')+'</button></div></section></div>'+
 '</section>');
}

if(!window.fcClockRefresh){
 window.fcClockRefresh=setInterval(function(){
   if(S&&S.user&&S.tab==="home"){render();}
 },60000);
 document.addEventListener("visibilitychange",function(){
   if(!document.hidden&&S&&S.user&&S.tab==="home"){render();}
 });
}


/* === FINAL MASTER RELEASE V18.7 FIXES === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={};
 var pack={
  de:{loginFailedInline:"Login fehlgeschlagen. Bitte Benutzername und Passwort prüfen.",vehicleEntry:"Pilotfahrzeug / Fahrzeug eintragen",vehicleName:"Fahrzeugname",plate:"Kennzeichen",assignedDriver:"Fahrer zuweisen",notAssigned:"nicht zugewiesen",saveVehicle:"Fahrzeug speichern",vehiclesPilot:"Fahrzeuge / Pilotfahrzeuge",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Tachoprüfung",type:"Typ",driver:"Fahrer",allDamagesList:"Gesamtauflistung aller eingetragener Schäden",damagePhoto:"Schadenbild",damageImages:"Bilder der Schäden",comments:"Kommentare",detailedDeparturePdf:"Detaillierter PDF-Bericht Abfahrtskontrolle",checkItems:"Prüfpunkte",noImages:"Keine Bilder hochgeladen",signaturePresent:"Digitale Unterschrift vorhanden",signatureMissing:"Keine digitale Unterschrift",reportContains:"Der Bericht enthält Prüfpunkte, Kommentare, Bilder und Fahrer-/Fahrzeugdaten.",required:"Bitte alle Pflichtfelder ausfüllen."},
  en:{loginFailedInline:"Login failed. Please check username and password.",vehicleEntry:"Enter pilot vehicle / vehicle",vehicleName:"Vehicle name",plate:"Plate number",assignedDriver:"Assign driver",notAssigned:"not assigned",saveVehicle:"Save vehicle",vehiclesPilot:"Vehicles / pilot vehicles",huTuv:"HU / TÜV",spCheck:"Safety inspection",tachoCheck:"Tachograph inspection",type:"Type",driver:"Driver",allDamagesList:"Complete list of all entered damages",damagePhoto:"Damage image",damageImages:"Damage images",comments:"Comments",detailedDeparturePdf:"Detailed departure check PDF report",checkItems:"Check items",noImages:"No images uploaded",signaturePresent:"Digital signature available",signatureMissing:"No digital signature",reportContains:"The report contains check items, comments, images and driver/vehicle data.",required:"Please complete all required fields."},
  tr:{loginFailedInline:"Giriş başarısız. Lütfen kullanıcı adı ve şifreyi kontrol edin.",vehicleEntry:"Pilot araç / araç gir",vehicleName:"Araç adı",plate:"Plaka",assignedDriver:"Sürücü ata",notAssigned:"atanmadı",saveVehicle:"Aracı kaydet",vehiclesPilot:"Araçlar / pilot araçlar",huTuv:"HU / TÜV",spCheck:"SP kontrolü",tachoCheck:"Takograf kontrolü",type:"Tip",driver:"Sürücü",allDamagesList:"Girilen tüm hasarların tam listesi",damagePhoto:"Hasar resmi",damageImages:"Hasar resimleri",comments:"Yorumlar",detailedDeparturePdf:"Detaylı çıkış kontrolü PDF raporu",checkItems:"Kontrol noktaları",noImages:"Resim yüklenmedi",signaturePresent:"Dijital imza mevcut",signatureMissing:"Dijital imza yok",reportContains:"Rapor kontrol noktalarını, yorumları, resimleri ve sürücü/araç bilgilerini içerir.",required:"Lütfen tüm zorunlu alanları doldurun."},
  pl:{loginFailedInline:"Logowanie nieudane. Sprawdź nazwę użytkownika i hasło.",vehicleEntry:"Wprowadź pojazd pilotażowy / pojazd",vehicleName:"Nazwa pojazdu",plate:"Numer rejestracyjny",assignedDriver:"Przypisz kierowcę",notAssigned:"nie przypisano",saveVehicle:"Zapisz pojazd",vehiclesPilot:"Pojazdy / pojazdy pilotażowe",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Kontrola tachografu",type:"Typ",driver:"Kierowca",allDamagesList:"Pełna lista wszystkich zgłoszonych szkód",damagePhoto:"Zdjęcie szkody",damageImages:"Zdjęcia szkód",comments:"Komentarze",detailedDeparturePdf:"Szczegółowy raport PDF kontroli wyjazdowej",checkItems:"Punkty kontroli",noImages:"Nie przesłano zdjęć",signaturePresent:"Podpis cyfrowy dostępny",signatureMissing:"Brak podpisu cyfrowego",reportContains:"Raport zawiera punkty kontroli, komentarze, zdjęcia oraz dane kierowcy/pojazdu.",required:"Wypełnij wszystkie wymagane pola."},
  ro:{loginFailedInline:"Autentificare eșuată. Verificați utilizatorul și parola.",vehicleEntry:"Introduceți vehicul pilot / vehicul",vehicleName:"Nume vehicul",plate:"Număr de înmatriculare",assignedDriver:"Atribuie șofer",notAssigned:"neatribuit",saveVehicle:"Salvează vehiculul",vehiclesPilot:"Vehicule / vehicule pilot",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Verificare tahograf",type:"Tip",driver:"Șofer",allDamagesList:"Lista completă a daunelor introduse",damagePhoto:"Imagine daună",damageImages:"Imagini daune",comments:"Comentarii",detailedDeparturePdf:"Raport PDF detaliat control plecare",checkItems:"Puncte de control",noImages:"Nu au fost încărcate imagini",signaturePresent:"Semnătură digitală disponibilă",signatureMissing:"Fără semnătură digitală",reportContains:"Raportul conține puncte de control, comentarii, imagini și date șofer/vehicul.",required:"Completați toate câmpurile obligatorii."},
  ru:{loginFailedInline:"Ошибка входа. Проверьте имя пользователя и пароль.",vehicleEntry:"Ввести пилотное ТС / ТС",vehicleName:"Название ТС",plate:"Госномер",assignedDriver:"Назначить водителя",notAssigned:"не назначено",saveVehicle:"Сохранить ТС",vehiclesPilot:"ТС / пилотные ТС",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Проверка тахографа",type:"Тип",driver:"Водитель",allDamagesList:"Полный список всех внесенных повреждений",damagePhoto:"Фото повреждения",damageImages:"Изображения повреждений",comments:"Комментарии",detailedDeparturePdf:"Подробный PDF-отчет предрейсовой проверки",checkItems:"Пункты проверки",noImages:"Изображения не загружены",signaturePresent:"Цифровая подпись есть",signatureMissing:"Цифровой подписи нет",reportContains:"Отчет содержит пункты проверки, комментарии, изображения и данные водителя/ТС.",required:"Заполните все обязательные поля."},
  uk:{loginFailedInline:"Помилка входу. Перевірте ім’я користувача та пароль.",vehicleEntry:"Ввести пілотне авто / авто",vehicleName:"Назва авто",plate:"Номерний знак",assignedDriver:"Призначити водія",notAssigned:"не призначено",saveVehicle:"Зберегти авто",vehiclesPilot:"Авто / пілотні авто",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Перевірка тахографа",type:"Тип",driver:"Водій",allDamagesList:"Повний список усіх внесених пошкоджень",damagePhoto:"Фото пошкодження",damageImages:"Зображення пошкоджень",comments:"Коментарі",detailedDeparturePdf:"Детальний PDF-звіт передрейсової перевірки",checkItems:"Пункти перевірки",noImages:"Зображення не завантажено",signaturePresent:"Цифровий підпис наявний",signatureMissing:"Немає цифрового підпису",reportContains:"Звіт містить пункти перевірки, коментарі, зображення та дані водія/авто.",required:"Заповніть усі обов’язкові поля."},
  ar:{loginFailedInline:"فشل تسجيل الدخول. يرجى التحقق من اسم المستخدم وكلمة المرور.",vehicleEntry:"إدخال مركبة تجريبية / مركبة",vehicleName:"اسم المركبة",plate:"رقم اللوحة",assignedDriver:"تعيين السائق",notAssigned:"غير مخصص",saveVehicle:"حفظ المركبة",vehiclesPilot:"المركبات / المركبات التجريبية",huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"فحص التاكوغراف",type:"النوع",driver:"السائق",allDamagesList:"القائمة الكاملة لكل الأضرار المدخلة",damagePhoto:"صورة الضرر",damageImages:"صور الأضرار",comments:"تعليقات",detailedDeparturePdf:"تقرير PDF مفصل لفحص الانطلاق",checkItems:"نقاط الفحص",noImages:"لم يتم تحميل صور",signaturePresent:"التوقيع الرقمي موجود",signatureMissing:"لا يوجد توقيع رقمي",reportContains:"يحتوي التقرير على نقاط الفحص والتعليقات والصور وبيانات السائق/المركبة.",required:"يرجى ملء جميع الحقول المطلوبة."}
 };
 Object.keys(pack).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},pack[l])});
})();

function saveAll(){
 localStorage.setItem("fc_v17_users",JSON.stringify(S.users||[]));
 localStorage.setItem("fc_v17_vehicles",JSON.stringify(S.vehicles||[]));
 localStorage.setItem("fc_v17_points",JSON.stringify(S.points||[]));
 localStorage.setItem("fc_v17_damages",JSON.stringify(S.damages||[]));
 localStorage.setItem("fc_v17_inspections",JSON.stringify(S.inspections||[]));
 localStorage.setItem("fc_v17_docs",JSON.stringify(S.docs||[]));
 localStorage.setItem("fc_v17_costs",JSON.stringify(S.costs||[]));
 localStorage.setItem("fc_v17_maintenance",JSON.stringify(S.maintenance||[]));
 localStorage.setItem("fc_v17_licenses",JSON.stringify(S.licenses||[]));
 localStorage.setItem("fc_v17_ai_training",JSON.stringify(S.aiTraining||[]));
 localStorage.setItem("fc_v17_mail_queue",JSON.stringify(S.mailQueue||[]));
 localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));
 localStorage.setItem("fc_v17_lang",JSON.stringify(S.lang||"de"));
 localStorage.setItem("fc_v17_theme",JSON.stringify(S.theme||"dark"));
 if(S.user)localStorage.setItem("fc_v17_session_user",JSON.stringify({id:S.user.id,login:S.user.login}));
 if(S.tab)localStorage.setItem("fc_v17_session_tab",JSON.stringify(S.tab));
}

function restoreSession(){
 masterNormalizeUsers();
 var sess=mLoad("fc_v17_session_user",null);
 if(sess&&sess.login&&!S.user){
   var u=(S.users||[]).find(function(x){return String(x.login||"").toLowerCase()===String(sess.login||"").toLowerCase()||Number(x.id)===Number(sess.id)});
   if(u)S.user=Object.assign({},u);
 }
 if(!S.tab||S.tab==="home")S.tab=mLoad("fc_v17_session_tab",S.tab||"home");
 S.lang=mLoad("fc_v17_lang",S.lang||"de");
 S.theme=mLoad("fc_v17_theme",S.theme||"dark");
}
function logout(){localStorage.removeItem("fc_v17_session_user");localStorage.removeItem("fc_v17_session_tab");mSave("fc_v17_lang",S.lang||"de");S.user=null;S.tab="home";render()}
function go(tab){S.tab=tab;localStorage.setItem("fc_v17_session_tab",JSON.stringify(tab));render()}

function loginView(){
 var logo=(window.FC_LOGO?'<img src="'+window.FC_LOGO+'" alt="Fleet Control">':'<div class="brandIcon">🛡</div>');
 return '<div class="loginPage"><section class="loginCard"><div class="brand">'+logo+'<div><h1>Fleet Control</h1><p>Einfach. Sicher. Zuverlässig.</p></div></div><h2>'+t("welcomeBack")+'</h2><p class="muted">'+t("loginHint")+'</p><form onsubmit="login(event)"><div class="inputIcon">👤<input id="loginName" placeholder="'+t("username")+'" autocomplete="username"></div><div class="inputIcon">🔒<input id="loginPass" type="password" placeholder="'+t("password")+'" autocomplete="current-password"><button type="button" class="eyeBtn" onclick="togglePassword()">👁</button></div><div id="loginError" class="loginError" style="display:none"></div><button class="loginBtn" type="submit">↪ '+t("login")+'</button></form><div class="roleTiles"><div>👤<b>'+t("driver")+'</b><small>Abfahrt & Kontrolle</small></div><div>🔧<b>'+t("workshop")+'</b><small>Reparatur & Wartung</small></div><div>🚚<b>'+t("fleet")+'</b><small>Fahrzeuge & Status</small></div><div>📊<b>'+t("boss")+'</b><small>Kennzahlen & Boni</small></div><div>⌘<b>'+t("developer")+'</b><small>System & Daten</small></div></div><p class="muted foot">🌐 '+(S.lang||"DE").toUpperCase()+' · Datenschutz · Hilfe</p></section><aside class="loginInfo"><h2>Ihre Flotte. Ihre Kontrolle.</h2><p>Behalte Fahrzeuge, Fahrer, Wartungen, Schäden und Kennzahlen im Blick.</p><div class="chips"><span>♡ Sicher</span><span>☁ Cloud-ready</span><span>▣ Mobil</span><span>⚡ Schnell</span></div><small>Version 18.7 · Final Master</small></aside></div>';
}
function login(e){
 if(e&&e.preventDefault)e.preventDefault();
 masterNormalizeUsers();
 var err=document.getElementById("loginError");if(err){err.style.display="none";err.textContent=""}
 var n=(document.getElementById("loginName")&&document.getElementById("loginName").value||"").trim().toLowerCase();
 var p=(document.getElementById("loginPass")&&document.getElementById("loginPass").value||"").trim();
 if(n==="hopper.m")n="hoppe.m";
 var u=(S.users||[]).find(function(x){return String(x.login||x.user||"").trim().toLowerCase()===n&&String(x.password||x.pass||"").trim()===p});
 if(!u){if(err){err.textContent=mt("loginFailedInline");err.style.display="block"}return}
 S.user=Object.assign({},u);S.lang=mLoad("fc_v17_lang",u.language||"de");S.tab=mLoad("fc_v17_session_tab","home");var av=(S.vehicles||[]).filter(function(v){return Number(v.assigned)===Number(S.user.id)});if(av[0])S.activeVehicle=av[0].id;saveAll();render();
}

function exactManagementDashboard(){
 var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;
 var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;
 var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");
 var current=getCurrentDateTime();
 var rows=drivers.slice(0,5).map(function(d){return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>'}).join("");
 return shell('<section class="exactDash"><div class="dashHero"><div><h1>'+mt('goodMorning')+'<br>'+name+'!</h1><p>'+mt('fleetOverview')+'</p></div><div class="dashClock"><small>'+current.date+'</small><b>'+current.time+' Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>'+mt('driversTotal')+'</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">'+mt('active')+': '+drivers.length+'</small></div><div class="dashKpi"><span>'+mt('vehiclesTotal')+'</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">'+mt('inUse')+': '+Math.max(vehicles.length-1,0)+'</small></div><div class="dashKpi"><span>'+mt('openDamages')+'</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">'+mt('urgent')+': '+Math.min(open,2)+'</small></div><div class="dashKpi"><span>'+mt('dueChecks')+'</span><div><i>▣</i><b>'+vehicles.length+'</b></div><small class="orange">'+mt('thisWeek')+'</small></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('driverStatus')+' <button onclick="go(\'vehicles\')">'+mt('showAll')+' →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">'+mt('showAllDrivers')+' →</button></section><section class="dashPanel"><h2>'+mt('openControls')+' <button onclick="go(\'check\')">'+mt('showAll')+' →</button></h2>'+dashOpenChecks()+'<button class="dashLink" onclick="go(\'check\')">'+mt('showAllControls')+' →</button></section></div><div class="dashGridThree"><section class="dashPanel"><h2>'+mt('openDamages')+' <button onclick="go(\'report\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>'+mt('urgent')+'</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>'+mt('high')+'</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>'+mt('medium')+'</span><b>0</b></div></section><section class="dashPanel"><h2>'+mt('dueChecks')+' <button onclick="go(\'maintenance\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('thisWeek')+'</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('nextWeek')+'</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>'+mt('in30Days')+'</span><b>4</b></div></section><section class="dashPanel"><h2>'+mt('pointsOverview')+'</h2><div class="dashDonut"><div><b>'+avg+'</b><small>'+mt('average')+'</small></div></div><div class="dashLegend"><span class="green">● '+mt('good')+'</span><span class="yellow">● '+mt('medium')+'</span><span class="red">● '+mt('critical')+'</span></div><button class="dashLink" onclick="go(\'points\')">'+mt('openPoints')+' →</button></section></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('currentMessages')+' <button onclick="go(\'notifications\')">'+mt('showAll')+' →</button></h2><div class="dashMsg"><span class="red">⚠</span><div><b>'+mt('damageReported')+'</b><small>'+(open?open+' '+mt('openDamages'):mt('noOpenDamages'))+'</small></div><small>'+mt('today')+'</small></div><div class="dashMsg"><span class="blue">ⓘ</span><div><b>'+mt('controlCompleted')+'</b><small>'+mt('departureSaved')+'</small></div><small>'+mt('today')+'</small></div></section><section class="dashPanel"><h2>'+mt('quickAccess')+'</h2><div class="dashQuick"><button onclick="go(\'vehicles\')">👥<br>'+mt('addDriver')+'</button><button onclick="go(\'vehicles\')">🚚<br>'+mt('addVehicle')+'</button><button onclick="go(\'report\')">⚠<br>'+mt('reportDamageQuick')+'</button><button onclick="go(\'maintenance\')">▣<br>'+mt('createInspection')+'</button><button onclick="go(\'ranking\')">📄<br>'+mt('createReport')+'</button></div></section></div></section>');
}

function vehicleForm(){if(!admin())return "";var drivers=allDrivers();return '<section class="card"><h2>'+mt('vehicleEntry')+'</h2><input id="vName" placeholder="'+mt('vehicleName')+'"><input id="vPlate" placeholder="'+mt('plate')+'"><select id="vType"><option value="vehicle">Fahrzeug</option><option value="trailer">Anhänger</option><option value="combo">Kombination</option></select><select id="vAssigned"><option value="">'+mt('notAssigned')+'</option>'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select><label>'+mt('huTuv')+' <input id="vHu" type="date"></label><label>'+mt('spCheck')+' <input id="vSp" type="date"></label><label>'+mt('tachoCheck')+' <input id="vTacho" type="date"></label><button onclick="addVehicle()">'+mt('saveVehicle')+'</button></section>'}
function addVehicle(){if(!admin()){alert(mt("notAllowed"));return}var name=(document.getElementById("vName")&&document.getElementById("vName").value||"").trim();var plate=(document.getElementById("vPlate")&&document.getElementById("vPlate").value||"").trim();var type=(document.getElementById("vType")&&document.getElementById("vType").value)||"vehicle";var assignedRaw=(document.getElementById("vAssigned")&&document.getElementById("vAssigned").value)||"";var hu=(document.getElementById("vHu")&&document.getElementById("vHu").value)||"";var sp=(document.getElementById("vSp")&&document.getElementById("vSp").value)||"";var tacho=(document.getElementById("vTacho")&&document.getElementById("vTacho").value)||"";if(!name||!plate){alert(mt("required"));return}S.vehicles=S.vehicles||[];S.vehicles.unshift({id:Date.now(),name:name,plate:plate,type:type,assigned:assignedRaw?Number(assignedRaw):null,hu:hu,tuv:hu,sp:sp,tacho:tacho,created:new Date().toLocaleString()});saveAll();render()}
function vehicles(){var list=(S.vehicles||[]).filter(function(v){return admin()||work()||isDashboardRole()||!v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});return shell('<h1 class="sectionTitle">'+t("vehicles")+'</h1>'+vehicleForm()+'<section class="card"><h2>'+mt('vehiclesPilot')+'</h2>'+(list.map(function(v){var u=(S.users||[]).find(function(x){return Number(x.id)===Number(v.assigned)});return '<div class="row"><span><b>'+v.name+' · '+v.plate+'</b><br><small class="muted">'+mt('type')+': '+(v.type||"Fahrzeug")+' · '+mt('driver')+': '+(u?u.name:mt('notAssigned'))+'<br>'+mt('huTuv')+': '+(v.hu||v.tuv||"-")+' · '+mt('spCheck')+': '+(v.sp||"-")+' · '+mt('tachoCheck')+': '+(v.tacho||"-")+'</small></span><span>'+deadlineBadge(v.hu||v.tuv)+' '+deadlineBadge(v.sp)+' '+deadlineBadge(v.tacho)+'</span></div>'}).join("")||'<p class="muted">'+t("noData")+'</p>')+'</section>')}

function damageList(){var visible=(S.damages||[]).filter(function(d){return admin()||work()||isChefFullAccess()||(S.user&&Number(d.driver)===Number(S.user.id))});return '<section class="card"><h2>'+mt('allDamagesList')+'</h2>'+(visible.map(function(d){var approval=d.aiApprovalStatus||"pending";var imgs=(d.photo?'<br>📷 '+mt('damagePhoto')+': '+d.photo:'');var ai='<br>🧠 '+mt('aiRecommendation')+': '+(Number(d.aiRecommendation||0)>0?"+":"")+Number(d.aiRecommendation||0)+' '+t('points')+' · '+mt('approval')+': '+mt(approval);var controls=(canApproveAiDamage()&&approval==="pending")?'<br><button onclick="approveAiDamage('+d.id+')">✅ '+mt('approve')+'</button><button class="secondary" onclick="rejectAiDamage('+d.id+')">✖ '+mt('reject')+'</button>':"";return '<div class="row"><span><b>'+(d.vehicle||"-")+'</b><br><small class="muted">'+(d.driverName||"")+' · '+(d.position||"")+' · '+(d.description||"")+' · '+statusText(d.status)+imgs+ai+'<br>🔧 '+mt('workshopLinked')+'</small></span><span><button class="secondary" onclick="progressDamage('+d.id+')">'+t("markProgress")+'</button><button onclick="toggleDamage('+d.id+')">'+(d.status==="done"?t("reopen"):t("markDone"))+'</button>'+controls+'</span></div>'}).join("")||'<p class="muted">'+t("noReports")+'</p>')+'</section>'}

function inspectionPdfHtml(record){var rows=(record.checks||[]).map(function(c){return '<tr><td>'+c.label+'</td><td>'+(c.checked?'✓':'—')+'</td><td>'+(c.comment||'')+'</td></tr>'}).join("");var imgs=(record.photos||[]).length?record.photos.map(function(p){return '<li>'+p+'</li>'}).join(""):'<li>'+mt('noImages')+'</li>';var damages=(S.damages||[]).filter(function(d){return Number(d.driver)===Number(record.driver)||String(d.vehicle||"")===String(record.vehicle||"")});var dmg=damages.length?damages.map(function(d){return '<li><b>'+(d.position||'')+'</b> – '+(d.description||'')+' '+(d.photo?'('+d.photo+')':'')+'</li>'}).join(""):'<li>'+mt('noOpenDamages')+'</li>';return '<html><head><title>'+mt('detailedDeparturePdf')+'</title><style>body{font-family:Arial;padding:24px;color:#111}h1{margin-bottom:4px}table{width:100%;border-collapse:collapse;margin-top:12px}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f3f3}.muted{color:#666}</style></head><body><h1>'+mt('detailedDeparturePdf')+'</h1><p class="muted">'+mt('reportContains')+'</p><p><b>'+mt('driver')+':</b> '+record.driverName+'</p><p><b>'+t('vehicle')+':</b> '+record.vehicle+'</p><p><b>Datum:</b> '+record.date+'</p><h2>'+mt('checkItems')+'</h2><table><thead><tr><th>Prüfpunkt</th><th>Status</th><th>'+mt('comments')+'</th></tr></thead><tbody>'+rows+'</tbody></table><h2>'+mt('damageImages')+'</h2><ul>'+imgs+'</ul><h2>'+mt('allDamagesList')+'</h2><ul>'+dmg+'</ul><h2>'+t('signature')+'</h2><p>'+(record.signature?mt('signaturePresent'):mt('signatureMissing'))+'</p></body></html>'}
function queueInspectionMail(record){S.mailQueue=S.mailQueue||[];S.mailQueue.unshift({id:Date.now(),to:MAIL_TO,subject:"Abfahrtskontrolle "+(record.vehicle||"")+" "+(record.date||""),type:"inspection_pdf",inspectionId:record.id,status:"prepared_backend_required",pdfHtml:inspectionPdfHtml(record),created:new Date().toLocaleString()});archiveInspectionPdf(record);saveAll()}

function render(){
 restoreSession();
 masterNormalizeUsers();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}
restoreSession();


/* === V18.7 SESSION RESTORE FINAL OVERRIDE === */
var FC_SESSION_RESTORED = false;
function restoreSession(){
 masterNormalizeUsers();
 var sess=mLoad("fc_v17_session_user",null);
 if(sess&&sess.login&&!S.user){
   var u=(S.users||[]).find(function(x){return String(x.login||"").toLowerCase()===String(sess.login||"").toLowerCase()||Number(x.id)===Number(sess.id)});
   if(u)S.user=Object.assign({},u);
 }
 if(!FC_SESSION_RESTORED){
   S.tab=mLoad("fc_v17_session_tab",S.tab||"home");
   FC_SESSION_RESTORED=true;
 }
 S.lang=mLoad("fc_v17_lang",S.lang||"de");
 S.theme=mLoad("fc_v17_theme",S.theme||"dark");
}
function go(tab){S.tab=tab;FC_SESSION_RESTORED=true;localStorage.setItem("fc_v17_session_tab",JSON.stringify(tab));render()}
function render(){
 restoreSession();
 masterNormalizeUsers();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}


/* === FINAL MASTER RELEASE V18.8 WORKSHOP SUITE === */

(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={};
 var w={
  de:{
   workshopSuite:"Werkstatt-System", workOrders:"Arbeitsaufträge", newWorkOrder:"Neuer Arbeitsauftrag",
   orderTitle:"Auftragstitel", priority:"Priorität", assignedMechanic:"Mechaniker", startTime:"Startzeit",
   endTime:"Endzeit", status:"Status", parts:"Ersatzteile", laborHours:"Arbeitsstunden",
   beforePhoto:"Vorher-Foto", afterPhoto:"Nachher-Foto", mechanicSignature:"Mechaniker-Unterschrift",
   createOrder:"Arbeitsauftrag erstellen", openOrders:"Offene Arbeitsaufträge",
   low:"Niedrig", medium:"Mittel", high:"Hoch", critical:"Kritisch",
   statusOpen:"Offen", statusProgress:"In Bearbeitung", statusParts:"Warten auf Ersatzteile", statusDone:"Fertig", statusApproved:"Freigegeben",
   partsInventory:"Ersatzteillager", addPart:"Ersatzteil hinzufügen", partName:"Ersatzteil", stock:"Bestand", minStock:"Mindestbestand",
   supplier:"Lieferant", price:"Preis", reorderWarning:"Nachbestellung erforderlich",
   workshopCalendar:"Werkstattkalender", appointment:"Termin", bay:"Hebebühne / Platz", mechanic:"Mechaniker", createAppointment:"Termin erstellen",
   vehicleHistory:"Fahrzeughistorie", vehicleFilePdf:"Fahrzeugakte als PDF", completeVehicleFile:"Komplette Fahrzeugakte",
   workshopCosts:"Werkstattkosten", monthlyCosts:"Kosten diesen Monat", avgRepairTime:"Ø Reparaturdauer", workshopUtilization:"Werkstattauslastung",
   outOfService:"Außer Betrieb", missingParts:"Fehlende Ersatzteile", recurringDamage:"Wiederkehrende Schäden",
   aiRepairEstimate:"KI-Reparaturschätzung", estimatedCost:"Geschätzte Kosten", estimatedDuration:"Geschätzte Dauer", suggestedParts:"Vorgeschlagene Ersatzteile",
   notificationsWorkshop:"Werkstatt-Benachrichtigungen", overdueMaintenance:"Wartung überfällig", dueSoon:"bald fällig",
   voiceNote:"Sprachnotiz", offlineReady:"Offline vorbereitet", noOrders:"Keine Arbeitsaufträge vorhanden",
   noParts:"Keine Ersatzteile vorhanden", noAppointments:"Keine Termine vorhanden"
  },
  en:{
   workshopSuite:"Workshop system", workOrders:"Work orders", newWorkOrder:"New work order",
   orderTitle:"Order title", priority:"Priority", assignedMechanic:"Mechanic", startTime:"Start time",
   endTime:"End time", status:"Status", parts:"Parts", laborHours:"Labor hours",
   beforePhoto:"Before photo", afterPhoto:"After photo", mechanicSignature:"Mechanic signature",
   createOrder:"Create work order", openOrders:"Open work orders",
   low:"Low", medium:"Medium", high:"High", critical:"Critical",
   statusOpen:"Open", statusProgress:"In progress", statusParts:"Waiting for parts", statusDone:"Done", statusApproved:"Approved",
   partsInventory:"Parts inventory", addPart:"Add part", partName:"Part", stock:"Stock", minStock:"Minimum stock",
   supplier:"Supplier", price:"Price", reorderWarning:"Reorder required",
   workshopCalendar:"Workshop calendar", appointment:"Appointment", bay:"Lift / bay", mechanic:"Mechanic", createAppointment:"Create appointment",
   vehicleHistory:"Vehicle history", vehicleFilePdf:"Vehicle file as PDF", completeVehicleFile:"Complete vehicle file",
   workshopCosts:"Workshop costs", monthlyCosts:"Costs this month", avgRepairTime:"Avg. repair time", workshopUtilization:"Workshop utilization",
   outOfService:"Out of service", missingParts:"Missing parts", recurringDamage:"Recurring damages",
   aiRepairEstimate:"AI repair estimate", estimatedCost:"Estimated cost", estimatedDuration:"Estimated duration", suggestedParts:"Suggested parts",
   notificationsWorkshop:"Workshop notifications", overdueMaintenance:"Maintenance overdue", dueSoon:"due soon",
   voiceNote:"Voice note", offlineReady:"Offline-ready", noOrders:"No work orders", noParts:"No parts", noAppointments:"No appointments"
  },
  tr:{
   workshopSuite:"Atölye sistemi", workOrders:"İş emirleri", newWorkOrder:"Yeni iş emri",
   orderTitle:"İş emri başlığı", priority:"Öncelik", assignedMechanic:"Mekanik", startTime:"Başlangıç",
   endTime:"Bitiş", status:"Durum", parts:"Yedek parçalar", laborHours:"Çalışma saati",
   beforePhoto:"Önce fotoğrafı", afterPhoto:"Sonra fotoğrafı", mechanicSignature:"Mekanik imzası",
   createOrder:"İş emri oluştur", openOrders:"Açık iş emirleri",
   low:"Düşük", medium:"Orta", high:"Yüksek", critical:"Kritik",
   statusOpen:"Açık", statusProgress:"İşlemde", statusParts:"Parça bekliyor", statusDone:"Tamamlandı", statusApproved:"Onaylandı",
   partsInventory:"Yedek parça deposu", addPart:"Parça ekle", partName:"Parça", stock:"Stok", minStock:"Minimum stok",
   supplier:"Tedarikçi", price:"Fiyat", reorderWarning:"Yeniden sipariş gerekli",
   workshopCalendar:"Atölye takvimi", appointment:"Randevu", bay:"Lift / alan", mechanic:"Mekanik", createAppointment:"Randevu oluştur",
   vehicleHistory:"Araç geçmişi", vehicleFilePdf:"Araç dosyası PDF", completeVehicleFile:"Tam araç dosyası",
   workshopCosts:"Atölye maliyetleri", monthlyCosts:"Bu ayki maliyet", avgRepairTime:"Ort. onarım süresi", workshopUtilization:"Atölye doluluğu",
   outOfService:"Kullanım dışı", missingParts:"Eksik parçalar", recurringDamage:"Tekrarlayan hasarlar",
   aiRepairEstimate:"AI onarım tahmini", estimatedCost:"Tahmini maliyet", estimatedDuration:"Tahmini süre", suggestedParts:"Önerilen parçalar",
   notificationsWorkshop:"Atölye bildirimleri", overdueMaintenance:"Bakım gecikmiş", dueSoon:"yakında",
   voiceNote:"Sesli not", offlineReady:"Çevrimdışı hazır", noOrders:"İş emri yok", noParts:"Parça yok", noAppointments:"Randevu yok"
  },
  pl:{workshopSuite:"System warsztatu",workOrders:"Zlecenia robocze",newWorkOrder:"Nowe zlecenie",orderTitle:"Tytuł zlecenia",priority:"Priorytet",assignedMechanic:"Mechanik",startTime:"Start",endTime:"Koniec",status:"Status",parts:"Części",laborHours:"Godziny pracy",beforePhoto:"Zdjęcie przed",afterPhoto:"Zdjęcie po",mechanicSignature:"Podpis mechanika",createOrder:"Utwórz zlecenie",openOrders:"Otwarte zlecenia",low:"Niski",medium:"Średni",high:"Wysoki",critical:"Krytyczny",statusOpen:"Otwarte",statusProgress:"W trakcie",statusParts:"Czeka na części",statusDone:"Gotowe",statusApproved:"Zatwierdzone",partsInventory:"Magazyn części",addPart:"Dodaj część",partName:"Część",stock:"Stan",minStock:"Minimum",supplier:"Dostawca",price:"Cena",reorderWarning:"Wymagane zamówienie",workshopCalendar:"Kalendarz warsztatu",appointment:"Termin",bay:"Stanowisko",mechanic:"Mechanik",createAppointment:"Utwórz termin",vehicleHistory:"Historia pojazdu",vehicleFilePdf:"Akta pojazdu PDF",completeVehicleFile:"Pełne akta pojazdu",workshopCosts:"Koszty warsztatu",monthlyCosts:"Koszty w tym miesiącu",avgRepairTime:"Śr. czas naprawy",workshopUtilization:"Wykorzystanie warsztatu",outOfService:"Poza eksploatacją",missingParts:"Brakujące części",recurringDamage:"Powtarzające się szkody",aiRepairEstimate:"Szacunek naprawy AI",estimatedCost:"Szacowany koszt",estimatedDuration:"Szacowany czas",suggestedParts:"Sugerowane części",notificationsWorkshop:"Powiadomienia warsztatu",overdueMaintenance:"Przegląd zaległy",dueSoon:"wkrótce",voiceNote:"Notatka głosowa",offlineReady:"Gotowe offline",noOrders:"Brak zleceń",noParts:"Brak części",noAppointments:"Brak terminów"},
  ro:{workshopSuite:"Sistem atelier",workOrders:"Ordine de lucru",newWorkOrder:"Ordin nou",orderTitle:"Titlu ordin",priority:"Prioritate",assignedMechanic:"Mecanic",startTime:"Start",endTime:"Sfârșit",status:"Status",parts:"Piese",laborHours:"Ore lucru",beforePhoto:"Foto înainte",afterPhoto:"Foto după",mechanicSignature:"Semnătură mecanic",createOrder:"Creează ordin",openOrders:"Ordine deschise",low:"Scăzut",medium:"Mediu",high:"Ridicat",critical:"Critic",statusOpen:"Deschis",statusProgress:"În lucru",statusParts:"Așteaptă piese",statusDone:"Gata",statusApproved:"Aprobat",partsInventory:"Stoc piese",addPart:"Adaugă piesă",partName:"Piesă",stock:"Stoc",minStock:"Stoc minim",supplier:"Furnizor",price:"Preț",reorderWarning:"Recomandare comandă",workshopCalendar:"Calendar atelier",appointment:"Programare",bay:"Elevator / loc",mechanic:"Mecanic",createAppointment:"Creează programare",vehicleHistory:"Istoric vehicul",vehicleFilePdf:"Fișă vehicul PDF",completeVehicleFile:"Fișă completă vehicul",workshopCosts:"Costuri atelier",monthlyCosts:"Costuri luna aceasta",avgRepairTime:"Timp mediu reparație",workshopUtilization:"Utilizare atelier",outOfService:"Scos din uz",missingParts:"Piese lipsă",recurringDamage:"Daune recurente",aiRepairEstimate:"Estimare reparație AI",estimatedCost:"Cost estimat",estimatedDuration:"Durată estimată",suggestedParts:"Piese sugerate",notificationsWorkshop:"Notificări atelier",overdueMaintenance:"Mentenanță întârziată",dueSoon:"în curând",voiceNote:"Notă vocală",offlineReady:"Pregătit offline",noOrders:"Nu există ordine",noParts:"Nu există piese",noAppointments:"Nu există programări"}
 };
 Object.keys(w).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},w[l])});
})();

function workshopDataInit(){
 S.workOrders=S.workOrders||mLoad("fc_v18_work_orders",[]);
 S.partsInventory=S.partsInventory||mLoad("fc_v18_parts_inventory",[]);
 S.workshopAppointments=S.workshopAppointments||mLoad("fc_v18_workshop_calendar",[]);
 S.workshopNotes=S.workshopNotes||mLoad("fc_v18_workshop_notes",[]);
}
function workshopSave(){
 workshopDataInit();
 localStorage.setItem("fc_v18_work_orders",JSON.stringify(S.workOrders||[]));
 localStorage.setItem("fc_v18_parts_inventory",JSON.stringify(S.partsInventory||[]));
 localStorage.setItem("fc_v18_workshop_calendar",JSON.stringify(S.workshopAppointments||[]));
 localStorage.setItem("fc_v18_workshop_notes",JSON.stringify(S.workshopNotes||[]));
 saveAll();
}
function saveAll(){
 localStorage.setItem("fc_v17_users",JSON.stringify(S.users||[]));
 localStorage.setItem("fc_v17_vehicles",JSON.stringify(S.vehicles||[]));
 localStorage.setItem("fc_v17_points",JSON.stringify(S.points||[]));
 localStorage.setItem("fc_v17_damages",JSON.stringify(S.damages||[]));
 localStorage.setItem("fc_v17_inspections",JSON.stringify(S.inspections||[]));
 localStorage.setItem("fc_v17_docs",JSON.stringify(S.docs||[]));
 localStorage.setItem("fc_v17_costs",JSON.stringify(S.costs||[]));
 localStorage.setItem("fc_v17_maintenance",JSON.stringify(S.maintenance||[]));
 localStorage.setItem("fc_v17_licenses",JSON.stringify(S.licenses||[]));
 localStorage.setItem("fc_v17_ai_training",JSON.stringify(S.aiTraining||[]));
 localStorage.setItem("fc_v17_mail_queue",JSON.stringify(S.mailQueue||[]));
 localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));
 localStorage.setItem("fc_v18_work_orders",JSON.stringify(S.workOrders||[]));
 localStorage.setItem("fc_v18_parts_inventory",JSON.stringify(S.partsInventory||[]));
 localStorage.setItem("fc_v18_workshop_calendar",JSON.stringify(S.workshopAppointments||[]));
 localStorage.setItem("fc_v18_workshop_notes",JSON.stringify(S.workshopNotes||[]));
 localStorage.setItem("fc_v17_lang",JSON.stringify(S.lang||"de"));
 localStorage.setItem("fc_v17_theme",JSON.stringify(S.theme||"dark"));
 if(S.user)localStorage.setItem("fc_v17_session_user",JSON.stringify({id:S.user.id,login:S.user.login}));
 if(S.tab)localStorage.setItem("fc_v17_session_tab",JSON.stringify(S.tab));
}

function workVehiclesOptions(){
 return (S.vehicles||[]).map(function(v){return '<option value="'+v.id+'">'+v.name+' · '+v.plate+'</option>'}).join("");
}
function statusOptions(selected){
 var opts=[["open","statusOpen"],["progress","statusProgress"],["parts","statusParts"],["done","statusDone"],["approved","statusApproved"]];
 return opts.map(function(o){return '<option value="'+o[0]+'" '+(selected===o[0]?'selected':'')+'>'+mt(o[1])+'</option>'}).join("");
}
function priorityOptions(selected){
 var opts=[["low","low"],["medium","medium"],["high","high"],["critical","critical"]];
 return opts.map(function(o){return '<option value="'+o[0]+'" '+(selected===o[0]?'selected':'')+'>'+mt(o[1])+'</option>'}).join("");
}
function aiRepairFor(desc){
 var text=(desc||"").toLowerCase();
 if(text.indexOf("bremse")>=0)return {cost:650,duration:"4-6 h",parts:"Bremsbeläge, Bremsscheibe, Sensor"};
 if(text.indexOf("reifen")>=0)return {cost:320,duration:"1-2 h",parts:"Reifen, Ventil, Auswuchten"};
 if(text.indexOf("licht")>=0||text.indexOf("lampe")>=0)return {cost:85,duration:"0.5 h",parts:"Leuchtmittel, Sicherung"};
 return {cost:180,duration:"1-3 h",parts:"Prüfung, Standardmaterial"};
}

function createWorkOrderFromDamage(d){
 workshopDataInit();
 var v=(S.vehicles||[]).find(function(x){return (d.vehicle||"").indexOf(x.plate)>=0||(d.vehicle||"").indexOf(x.name)>=0});
 var est=aiRepairFor((d.position||"")+" "+(d.description||""));
 var order={id:Date.now(),vehicleId:v?v.id:null,vehicle:d.vehicle||"",title:(d.position||mt("damageReported")),description:d.description||"",priority:(d.aiSeverity==="Kritisch"?"critical":"medium"),status:"open",mechanic:"",start:"",end:"",parts:est.parts,laborHours:"",beforePhoto:d.photo||"",afterPhoto:"",signature:"",sourceDamageId:d.id,estimateCost:est.cost,estimateDuration:est.duration,created:new Date().toLocaleString()};
 S.workOrders.unshift(order);
 d.workOrderId=order.id;
 workshopSave();
 return order;
}
function saveDamage(){
 var vehicle=(document.getElementById("dVehicle")&&document.getElementById("dVehicle").value)||"",pos=(document.getElementById("dPosition")&&document.getElementById("dPosition").value)||"",desc=(document.getElementById("dDesc")&&document.getElementById("dDesc").value)||"",file=document.getElementById("dPhoto"),photo=file&&file.files&&file.files[0]?file.files[0].name:"";
 if(!vehicle||!pos||!desc){alert(t("required"));return}
 var recommended=aiDamageScoreByInput(pos,desc,photo);
 var damage={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicle:vehicle,position:pos,description:desc,photo:photo,status:"open",workshop:true,aiTrainingLinked:true,source:"driverReport",aiRecommendation:recommended,aiSeverity:aiDamageClassByScore(recommended),aiApprovalStatus:"pending",pointsApplied:false,created:new Date().toLocaleString()};
 S.damages=S.damages||[];S.damages.unshift(damage);
 S.aiTraining=S.aiTraining||[];S.aiTraining.unshift({id:damage.id,file:photo,damageClass:pos,severity:damage.aiSeverity,points:recommended,linkedDamageId:damage.id,approvalStatus:"pending",date:new Date().toLocaleString()});
 createWorkOrderFromDamage(damage);
 saveAll();alert(mt('damageSavedPending'));render();
}

function addWorkOrder(){
 if(!work()&&!admin()){alert(mt("notAllowed"));return}
 workshopDataInit();
 var vehicleId=Number((document.getElementById("woVehicle")||{}).value||0);
 var vehicle=(S.vehicles||[]).find(function(v){return Number(v.id)===vehicleId});
 var title=(document.getElementById("woTitle")&&document.getElementById("woTitle").value||"").trim();
 if(!title){alert(mt("required"));return}
 var desc=(document.getElementById("woDesc")&&document.getElementById("woDesc").value||"").trim();
 var est=aiRepairFor(desc||title);
 S.workOrders.unshift({id:Date.now(),vehicleId:vehicleId,vehicle:vehicle?(vehicle.name+" "+vehicle.plate):"",title:title,description:desc,priority:(document.getElementById("woPriority")||{}).value||"medium",status:"open",mechanic:(document.getElementById("woMechanic")||{}).value||"",start:(document.getElementById("woStart")||{}).value||"",end:(document.getElementById("woEnd")||{}).value||"",parts:(document.getElementById("woParts")||{}).value||est.parts,laborHours:(document.getElementById("woHours")||{}).value||"",beforePhoto:((document.getElementById("woBefore")||{}).files||[])[0]?document.getElementById("woBefore").files[0].name:"",afterPhoto:((document.getElementById("woAfter")||{}).files||[])[0]?document.getElementById("woAfter").files[0].name:"",signature:(document.getElementById("woSign")&&document.getElementById("woSign").value)||"",estimateCost:est.cost,estimateDuration:est.duration,created:new Date().toLocaleString()});
 workshopSave();render();
}
function updateWorkOrderStatus(id,status){
 workshopDataInit();
 var o=S.workOrders.find(function(x){return x.id===id});
 if(o){o.status=status;if(status==="done"&&!o.end)o.end=new Date().toISOString().slice(0,16);workshopSave();render();}
}
function workOrdersPage(){
 workshopDataInit();
 var form=(work()||admin())?'<section class="card"><h2>'+mt('newWorkOrder')+'</h2><select id="woVehicle">'+workVehiclesOptions()+'</select><input id="woTitle" placeholder="'+mt('orderTitle')+'"><textarea id="woDesc" placeholder="'+t('description')+'"></textarea><select id="woPriority">'+priorityOptions("medium")+'</select><input id="woMechanic" placeholder="'+mt('assignedMechanic')+'"><label>'+mt('startTime')+'<input id="woStart" type="datetime-local"></label><label>'+mt('endTime')+'<input id="woEnd" type="datetime-local"></label><input id="woParts" placeholder="'+mt('parts')+'"><input id="woHours" type="number" step="0.25" placeholder="'+mt('laborHours')+'"><label>'+mt('beforePhoto')+'<input id="woBefore" type="file" accept="image/*"></label><label>'+mt('afterPhoto')+'<input id="woAfter" type="file" accept="image/*"></label><textarea id="woSign" placeholder="'+mt('mechanicSignature')+'"></textarea><button onclick="addWorkOrder()">'+mt('createOrder')+'</button></section>':'';
 var list=(S.workOrders||[]).map(function(o){return '<div class="workItem"><div><b>'+o.title+'</b><small>'+((o.vehicle)||'')+' · '+mt('priority')+': '+mt(o.priority)+' · '+mt('status')+': '+mt('status'+o.status.charAt(0).toUpperCase()+o.status.slice(1))+'</small><small>🤖 '+mt('aiRepairEstimate')+': '+mt('estimatedCost')+' '+(o.estimateCost||0)+' € · '+mt('estimatedDuration')+' '+(o.estimateDuration||'-')+' · '+mt('suggestedParts')+': '+(o.parts||'-')+'</small></div><select onchange="updateWorkOrderStatus('+o.id+',this.value)">'+statusOptions(o.status)+'</select></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+mt('workOrders')+'</h1>'+form+'<section class="card"><h2>'+mt('openOrders')+'</h2>'+(list||'<p class="muted">'+mt('noOrders')+'</p>')+'</section>');
}

function addPart(){
 workshopDataInit();
 var name=(document.getElementById("partName")&&document.getElementById("partName").value||"").trim();
 if(!name){alert(mt("required"));return}
 S.partsInventory.unshift({id:Date.now(),name:name,stock:Number((document.getElementById("partStock")||{}).value||0),min:Number((document.getElementById("partMin")||{}).value||0),supplier:(document.getElementById("partSupplier")||{}).value||"",price:Number((document.getElementById("partPrice")||{}).value||0),created:new Date().toLocaleString()});
 workshopSave();render();
}
function partsPage(){
 workshopDataInit();
 var form=(work()||admin())?'<section class="card"><h2>'+mt('addPart')+'</h2><input id="partName" placeholder="'+mt('partName')+'"><input id="partStock" type="number" placeholder="'+mt('stock')+'"><input id="partMin" type="number" placeholder="'+mt('minStock')+'"><input id="partSupplier" placeholder="'+mt('supplier')+'"><input id="partPrice" type="number" step="0.01" placeholder="'+mt('price')+'"><button onclick="addPart()">'+mt('addPart')+'</button></section>':'';
 var list=(S.partsInventory||[]).map(function(p){var warn=Number(p.stock)<=Number(p.min)?' <span class="red">⚠ '+mt('reorderWarning')+'</span>':'';return '<div class="row"><span><b>'+p.name+'</b><br><small class="muted">'+mt('stock')+': '+p.stock+' · '+mt('minStock')+': '+p.min+' · '+mt('supplier')+': '+(p.supplier||'-')+'</small></span><b>'+Number(p.price||0).toFixed(2)+' €</b>'+warn+'</div>'}).join("");
 return shell('<h1 class="sectionTitle">'+mt('partsInventory')+'</h1>'+form+'<section class="card">'+(list||'<p class="muted">'+mt('noParts')+'</p>')+'</section>');
}

function addWorkshopAppointment(){
 workshopDataInit();
 var vehicleId=Number((document.getElementById("calVehicle")||{}).value||0);
 var vehicle=(S.vehicles||[]).find(function(v){return Number(v.id)===vehicleId});
 var title=(document.getElementById("calTitle")&&document.getElementById("calTitle").value||"").trim();
 if(!title){alert(mt("required"));return}
 S.workshopAppointments.unshift({id:Date.now(),title:title,vehicleId:vehicleId,vehicle:vehicle?(vehicle.name+" "+vehicle.plate):"",date:(document.getElementById("calDate")||{}).value||"",bay:(document.getElementById("calBay")||{}).value||"",mechanic:(document.getElementById("calMechanic")||{}).value||"",created:new Date().toLocaleString()});
 workshopSave();render();
}
function workshopCalendarPage(){
 workshopDataInit();
 var form=(work()||admin())?'<section class="card"><h2>'+mt('appointment')+'</h2><input id="calTitle" placeholder="'+mt('appointment')+'"><select id="calVehicle">'+workVehiclesOptions()+'</select><input id="calDate" type="datetime-local"><input id="calBay" placeholder="'+mt('bay')+'"><input id="calMechanic" placeholder="'+mt('mechanic')+'"><button onclick="addWorkshopAppointment()">'+mt('createAppointment')+'</button></section>':'';
 var list=(S.workshopAppointments||[]).map(function(a){return '<div class="row"><span><b>'+a.title+'</b><br><small class="muted">'+a.vehicle+' · '+a.date+' · '+a.bay+' · '+a.mechanic+'</small></span></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+mt('workshopCalendar')+'</h1>'+form+'<section class="card">'+(list||'<p class="muted">'+mt('noAppointments')+'</p>')+'</section>');
}

function vehicleHistoryPage(){
 var vehicles=S.vehicles||[];
 var selected=Number((document.getElementById("histVehicle")||{}).value||((vehicles[0]||{}).id||0));
 var v=vehicles.find(function(x){return Number(x.id)===selected})||vehicles[0]||{};
 var damages=(S.damages||[]).filter(function(d){return (d.vehicle||"").indexOf(v.plate)>=0||(d.vehicle||"").indexOf(v.name)>=0});
 var orders=(S.workOrders||[]).filter(function(o){return Number(o.vehicleId)===Number(v.id)||(o.vehicle||"").indexOf(v.plate)>=0});
 var maint=(S.maintenance||[]).filter(function(m){return Number(m.vehicle)===Number(v.id)||Number(m.vehicleId)===Number(v.id)});
 return shell('<h1 class="sectionTitle">'+mt('vehicleHistory')+'</h1><section class="card"><select id="histVehicle" onchange="render()">'+vehicles.map(function(x){return '<option value="'+x.id+'" '+(Number(x.id)===Number(v.id)?'selected':'')+'>'+x.name+' · '+x.plate+'</option>'}).join("")+'</select><button onclick="openVehicleFilePdf('+v.id+')">'+mt('vehicleFilePdf')+'</button></section><section class="card"><h2>'+mt('completeVehicleFile')+'</h2><p><b>'+((v.name||"")+' '+(v.plate||""))+'</b></p><p>'+mt('huTuv')+': '+(v.hu||v.tuv||'-')+' · '+mt('spCheck')+': '+(v.sp||'-')+' · '+mt('tachoCheck')+': '+(v.tacho||'-')+'</p><h3>'+mt('allDamagesList')+'</h3>'+(damages.map(function(d){return '<p>⚠ '+(d.position||'')+' · '+(d.description||'')+' · '+(d.created||'')+'</p>'}).join("")||'<p class="muted">'+t('noReports')+'</p>')+'<h3>'+mt('workOrders')+'</h3>'+(orders.map(function(o){return '<p>🔧 '+o.title+' · '+mt('status')+': '+mt('status'+o.status.charAt(0).toUpperCase()+o.status.slice(1))+'</p>'}).join("")||'<p class="muted">'+mt('noOrders')+'</p>')+'<h3>'+t('maintenancePlanner')+'</h3>'+(maint.map(function(m){return '<p>🛠 '+(m.type||'')+' · '+(m.date||'')+'</p>'}).join("")||'<p class="muted">-</p>')+'</section>');
}
function openVehicleFilePdf(id){
 var v=(S.vehicles||[]).find(function(x){return Number(x.id)===Number(id)})||{};
 var html='<html><head><title>'+mt('completeVehicleFile')+'</title><style>body{font-family:Arial;padding:24px}li{margin:6px 0}</style></head><body><h1>'+mt('completeVehicleFile')+'</h1><h2>'+((v.name||"")+' '+(v.plate||""))+'</h2><p>'+mt('huTuv')+': '+(v.hu||v.tuv||'-')+' · '+mt('spCheck')+': '+(v.sp||'-')+' · '+mt('tachoCheck')+': '+(v.tacho||'-')+'</p><h2>'+mt('allDamagesList')+'</h2><ul>'+((S.damages||[]).map(function(d){return '<li>'+d.vehicle+' · '+(d.position||'')+' · '+(d.description||'')+'</li>'}).join("")||'<li>-</li>')+'</ul><h2>'+mt('workOrders')+'</h2><ul>'+((S.workOrders||[]).filter(function(o){return Number(o.vehicleId)===Number(id)}).map(function(o){return '<li>'+o.title+' · '+o.status+'</li>'}).join("")||'<li>-</li>')+'</ul></body></html>';
 var w=window.open("", "_blank"); if(w&&w.document){w.document.write(html);w.document.close();}
}

function workshopCostsPage(){
 workshopDataInit();
 var cost=(S.workOrders||[]).reduce(function(a,o){return a+Number(o.estimateCost||0)},0)+(S.partsInventory||[]).reduce(function(a,p){return a+Number(p.price||0)*Number(p.stock||0)},0);
 var done=(S.workOrders||[]).filter(function(o){return o.status==="done"||o.status==="approved"}).length;
 var out=(S.vehicles||[]).filter(function(v){return (S.workOrders||[]).some(function(o){return Number(o.vehicleId)===Number(v.id)&&o.status!=="done"&&o.status!=="approved"})}).length;
 var missing=(S.partsInventory||[]).filter(function(p){return Number(p.stock)<=Number(p.min)}).length;
 return shell('<h1 class="sectionTitle">'+mt('workshopCosts')+'</h1><div class="dashKpis"><div class="dashKpi"><span>'+mt('monthlyCosts')+'</span><div><i>💶</i><b>'+cost.toFixed(0)+' €</b></div></div><div class="dashKpi"><span>'+mt('avgRepairTime')+'</span><div><i>⏱</i><b>'+(done?Math.round((S.workOrders||[]).length/done*2):0)+' h</b></div></div><div class="dashKpi"><span>'+mt('workshopUtilization')+'</span><div><i>📊</i><b>'+Math.min(100,(S.workOrders||[]).length*15)+'%</b></div></div><div class="dashKpi"><span>'+mt('outOfService')+'</span><div><i>🚫</i><b>'+out+'</b></div></div></div><section class="card"><h2>'+mt('notificationsWorkshop')+'</h2><div class="row"><span>'+mt('missingParts')+'</span><b>'+missing+'</b></div><div class="row"><span>'+mt('recurringDamage')+'</span><b>'+(S.damages||[]).length+'</b></div><div class="row"><span>'+mt('offlineReady')+'</span><b>✓</b></div></section>');
}

function workshopHome(){
 workshopDataInit();
 var open=(S.workOrders||[]).filter(function(o){return o.status!=="done"&&o.status!=="approved"}).length;
 return shell('<section class="rolePhone"><div class="phoneGreeting"><span>'+t('hello')+',</span><h1>'+t('workshop')+' 🔧</h1></div><h3>'+mt('workshopSuite')+' <span class="pill">'+open+' '+mt('statusOpen')+'</span></h3><div class="todayList"><div onclick="go(\'workOrders\')">🔧 '+mt('workOrders')+'<span>›</span></div><div onclick="go(\'parts\')">📦 '+mt('partsInventory')+'<span>›</span></div><div onclick="go(\'workCalendar\')">📅 '+mt('workshopCalendar')+'<span>›</span></div><div onclick="go(\'vehicleHistory\')">📁 '+mt('vehicleHistory')+'<span>›</span></div><div onclick="go(\'workCosts\')">💶 '+mt('workshopCosts')+'<span>›</span></div><div onclick="go(\'report\')">⚠ '+t('report')+'<span>›</span></div></div></section>');
}

function shell(content){
 var nav;
 if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];
 else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["workOrders","🔧",mt("workOrders")],["parts","📦",mt("partsInventory")],["more","☰",t("more")]];
 else if(isDashboardRole())nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>';
}

function more(){
 var buttons='';
 buttons+='<button onclick="go(\'license\')">🪪 '+t("licenseCheck")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'documents\')">📂 '+t("documentFolder")+' <span>›</span></button>';
 if(admin()||work())buttons+='<button onclick="go(\'maintenance\')">🛠 '+t("maintenancePlanner")+' <span>›</span></button>';
 if(work()||admin())buttons+='<button onclick="go(\'workOrders\')">🔧 '+mt("workOrders")+' <span>›</span></button><button onclick="go(\'parts\')">📦 '+mt("partsInventory")+' <span>›</span></button><button onclick="go(\'workCalendar\')">📅 '+mt("workshopCalendar")+' <span>›</span></button><button onclick="go(\'vehicleHistory\')">📁 '+mt("vehicleHistory")+' <span>›</span></button><button onclick="go(\'workCosts\')">💶 '+mt("workshopCosts")+' <span>›</span></button>';
 if(admin())buttons+='<button onclick="go(\'costs\')">💶 '+mt("costAnalysis")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'aiDamage\')">🤖 '+t("aiDamageCheck")+' <span>›</span></button>';
 if(admin()||dev())buttons+='<button onclick="go(\'aiTraining\')">🧠 '+t("aiTraining")+' <span>›</span></button>';
 if(isDeputyRole())buttons+='<button onclick="go(\'pdfArchive\')">📄 '+mt("pdfArchive")+' <span>›</span></button>';
 return shell('<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>'+t("settings")+'</span></div><h2>'+t("settings")+'</h2><label>'+t("language")+'<select onchange="setLang(this.value)">'+LANG.map(function(l){return '<option value="'+l[0]+'" '+(S.lang===l[0]?"selected":"")+'>'+l[1]+'</option>'}).join("")+'</select></label><label>'+t("mode")+'<select onchange="setTheme(this.value)"><option value="light" '+(S.theme==="light"?"selected":"")+'>'+t("light")+'</option><option value="dark" '+(S.theme==="dark"?"selected":"")+'>'+t("dark")+'</option></select></label><div class="settingsList">'+buttons+'</div><button class="logoutAction" onclick="logout()">↩ '+t("logout")+'</button></section>');
}

function render(){
 restoreSession();
 masterNormalizeUsers();
 workshopDataInit();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workshopCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workshopCostsPage};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}
workshopDataInit();


/* === V18.8 WERKSTATT EINSICHT MANAGEMENT === */

(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={};
 var w={
  de:{workshopInsight:"Werkstattübersicht",openWorkshopOrders:"Offene Werkstattaufträge",vehiclesInRepair:"Fahrzeuge in Reparatur",workshopMonthCosts:"Werkstattkosten Monat",missingParts:"Fehlende Ersatzteile",workshopApproval:"Werkstatt-Freigabe",approveWorkshopOrder:"Auftrag freigeben",approvedByManagement:"Durch Management freigegeben",managementComment:"Management-Kommentar",costApproval:"Kosten genehmigen",lockOrder:"Auftrag sperren",unlockOrder:"Auftrag entsperren",managementView:"Management-Einsicht",workshopReports:"Werkstattberichte",repairProof:"Reparaturnachweis",invoice:"Rechnung",linkedChain:"Fahrzeug → Schaden → Arbeitsauftrag → Reparatur → Kosten → PDF → Historie"},
  en:{workshopInsight:"Workshop overview",openWorkshopOrders:"Open workshop orders",vehiclesInRepair:"Vehicles in repair",workshopMonthCosts:"Workshop costs month",missingParts:"Missing parts",workshopApproval:"Workshop approval",approveWorkshopOrder:"Approve order",approvedByManagement:"Approved by management",managementComment:"Management comment",costApproval:"Approve costs",lockOrder:"Lock order",unlockOrder:"Unlock order",managementView:"Management view",workshopReports:"Workshop reports",repairProof:"Repair proof",invoice:"Invoice",linkedChain:"Vehicle → Damage → Work order → Repair → Costs → PDF → History"},
  tr:{workshopInsight:"Atölye özeti",openWorkshopOrders:"Açık atölye işleri",vehiclesInRepair:"Onarımdaki araçlar",workshopMonthCosts:"Aylık atölye maliyeti",missingParts:"Eksik parçalar",workshopApproval:"Atölye onayı",approveWorkshopOrder:"İşi onayla",approvedByManagement:"Yönetim tarafından onaylandı",managementComment:"Yönetim yorumu",costApproval:"Maliyet onayı",lockOrder:"İşi kilitle",unlockOrder:"Kilidi aç",managementView:"Yönetim görünümü",workshopReports:"Atölye raporları",repairProof:"Onarım kanıtı",invoice:"Fatura",linkedChain:"Araç → Hasar → İş emri → Onarım → Maliyet → PDF → Geçmiş"},
  pl:{workshopInsight:"Przegląd warsztatu",openWorkshopOrders:"Otwarte zlecenia warsztatu",vehiclesInRepair:"Pojazdy w naprawie",workshopMonthCosts:"Koszty warsztatu miesiąc",missingParts:"Brakujące części",workshopApproval:"Zatwierdzenie warsztatu",approveWorkshopOrder:"Zatwierdź zlecenie",approvedByManagement:"Zatwierdzone przez kierownictwo",managementComment:"Komentarz kierownictwa",costApproval:"Zatwierdź koszty",lockOrder:"Zablokuj zlecenie",unlockOrder:"Odblokuj zlecenie",managementView:"Widok kierownictwa",workshopReports:"Raporty warsztatu",repairProof:"Potwierdzenie naprawy",invoice:"Faktura",linkedChain:"Pojazd → Szkoda → Zlecenie → Naprawa → Koszty → PDF → Historia"},
  ro:{workshopInsight:"Prezentare atelier",openWorkshopOrders:"Ordine atelier deschise",vehiclesInRepair:"Vehicule în reparație",workshopMonthCosts:"Costuri atelier lună",missingParts:"Piese lipsă",workshopApproval:"Aprobare atelier",approveWorkshopOrder:"Aprobă ordinul",approvedByManagement:"Aprobat de management",managementComment:"Comentariu management",costApproval:"Aprobă costuri",lockOrder:"Blochează ordin",unlockOrder:"Deblochează ordin",managementView:"Vizualizare management",workshopReports:"Rapoarte atelier",repairProof:"Dovadă reparație",invoice:"Factură",linkedChain:"Vehicul → Daună → Ordin → Reparație → Costuri → PDF → Istoric"}
 };
 Object.keys(w).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},w[l])});
})();

function canSeeWorkshopInsight(){
 return !!(work()||admin()||isDashboardRole()||isDeputyRole());
}
function canManageWorkshopInsight(){
 return !!(admin()||isDashboardRole()||isDeputyRole());
}
function workshopInsightStats(){
 workshopDataInit();
 var orders=S.workOrders||[];
 var open=orders.filter(function(o){return o.status!=="done"&&o.status!=="approved"}).length;
 var repairVehicles={};
 orders.forEach(function(o){if(o.status!=="done"&&o.status!=="approved"&&o.vehicleId)repairVehicles[o.vehicleId]=true});
 var costs=orders.reduce(function(a,o){return a+Number(o.estimateCost||0)},0);
 var missing=(S.partsInventory||[]).filter(function(p){return Number(p.stock)<=Number(p.min)}).length;
 return {open:open,vehicles:Object.keys(repairVehicles).length,costs:costs,missing:missing};
}
function approveWorkshopOrder(id){
 if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}
 workshopDataInit();
 var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});
 if(!o)return;
 o.status="approved";
 o.approvedBy=S.user?S.user.name:"";
 o.approvedAt=new Date().toLocaleString();
 o.managementApproved=true;
 workshopSave();render();
}
function lockWorkshopOrder(id){
 if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}
 var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});
 if(!o)return;
 o.locked=!o.locked;
 o.lockedBy=o.locked?(S.user?S.user.name:""):"";
 workshopSave();render();
}
function addManagementComment(id){
 if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}
 var el=document.getElementById("mgmtComment"+id);
 var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});
 if(o&&el&&el.value.trim()){
   o.managementComments=o.managementComments||[];
   o.managementComments.unshift({by:S.user?S.user.name:"",text:el.value.trim(),date:new Date().toLocaleString()});
   workshopSave();render();
 }
}
function managementWorkshopInsightPage(){
 if(!canSeeWorkshopInsight())return shell('<section class="card"><h2>'+mt("notAllowed")+'</h2></section>');
 workshopDataInit();
 var s=workshopInsightStats();
 var orders=(S.workOrders||[]).map(function(o){
   var comments=(o.managementComments||[]).map(function(c){return '<small>💬 '+c.date+' · '+c.by+': '+c.text+'</small>'}).join("");
   var controls=canManageWorkshopInsight()?'<div class="workControls"><button onclick="approveWorkshopOrder('+o.id+')">✅ '+mt("approveWorkshopOrder")+'</button><button class="secondary" onclick="lockWorkshopOrder('+o.id+')">'+(o.locked?'🔓 '+mt("unlockOrder"):'🔒 '+mt("lockOrder"))+'</button><input id="mgmtComment'+o.id+'" placeholder="'+mt("managementComment")+'"><button class="secondary" onclick="addManagementComment('+o.id+')">💬</button></div>':'';
   return '<div class="workItem"><div><b>'+o.title+'</b><small>'+((o.vehicle)||'')+' · '+mt('status')+': '+(o.managementApproved?mt("approvedByManagement"):mt('status'+String(o.status||"open").charAt(0).toUpperCase()+String(o.status||"open").slice(1)))+' · '+mt('mechanic')+': '+(o.mechanic||'-')+'</small><small>🤖 '+mt('estimatedCost')+': '+(o.estimateCost||0)+' € · '+mt('estimatedDuration')+': '+(o.estimateDuration||'-')+' · '+mt('suggestedParts')+': '+(o.parts||'-')+'</small><small>🔗 '+mt("linkedChain")+'</small>'+comments+'</div><div>'+controls+'<button class="secondary" onclick="archiveWorkOrderPdf('+o.id+')">PDF</button></div></div>';
 }).join("");
 var parts=(S.partsInventory||[]).filter(function(p){return Number(p.stock)<=Number(p.min)}).map(function(p){return '<div class="row"><span><b>'+p.name+'</b><br><small class="muted">'+mt('stock')+': '+p.stock+' · '+mt('minStock')+': '+p.min+' · '+mt('supplier')+': '+(p.supplier||'-')+'</small></span><span class="red">⚠ '+mt('reorderWarning')+'</span></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+mt("workshopInsight")+'</h1><div class="dashKpis"><div class="dashKpi"><span>'+mt("openWorkshopOrders")+'</span><div><i>🔧</i><b>'+s.open+'</b></div></div><div class="dashKpi"><span>'+mt("vehiclesInRepair")+'</span><div><i>🚛</i><b>'+s.vehicles+'</b></div></div><div class="dashKpi"><span>'+mt("workshopMonthCosts")+'</span><div><i>💶</i><b>'+s.costs.toFixed(0)+' €</b></div></div><div class="dashKpi"><span>'+mt("missingParts")+'</span><div><i>📦</i><b>'+s.missing+'</b></div></div></div><section class="card"><h2>'+mt("managementView")+' · '+mt("workOrders")+'</h2>'+(orders||'<p class="muted">'+mt("noOrders")+'</p>')+'</section><section class="card"><h2>'+mt("missingParts")+'</h2>'+(parts||'<p class="muted">'+mt("noParts")+'</p>')+'</section>');
}

/* Dashboard: Chef/Stellvertretung/Fuhrpark sehen Werkstatt-KPI zusätzlich */
function exactManagementDashboard(){
 var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;
 var ws=workshopInsightStats();
 var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;
 var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");
 var current=getCurrentDateTime();
 var rows=drivers.slice(0,5).map(function(d){return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>'}).join("");
 return shell('<section class="exactDash"><div class="dashHero"><div><h1>'+mt('goodMorning')+'<br>'+name+'!</h1><p>'+mt('fleetOverview')+'</p></div><div class="dashClock"><small>'+current.date+'</small><b>'+current.time+' Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>'+mt('driversTotal')+'</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">'+mt('active')+': '+drivers.length+'</small></div><div class="dashKpi"><span>'+mt('vehiclesTotal')+'</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">'+mt('inUse')+': '+Math.max(vehicles.length-1,0)+'</small></div><div class="dashKpi"><span>'+mt('openDamages')+'</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">'+mt('urgent')+': '+Math.min(open,2)+'</small></div><div class="dashKpi"><span>'+mt("openWorkshopOrders")+'</span><div><i>🔧</i><b>'+ws.open+'</b></div><small class="orange">'+mt("vehiclesInRepair")+': '+ws.vehicles+'</small></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('driverStatus')+' <button onclick="go(\'vehicles\')">'+mt('showAll')+' →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">'+mt('showAllDrivers')+' →</button></section><section class="dashPanel"><h2>'+mt("workshopInsight")+' <button onclick="go(\'workshopInsight\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span>🔧</span><span>'+mt("openWorkshopOrders")+'</span><b>'+ws.open+'</b></div><div class="dashMetricLine"><span>🚛</span><span>'+mt("vehiclesInRepair")+'</span><b>'+ws.vehicles+'</b></div><div class="dashMetricLine"><span>💶</span><span>'+mt("workshopMonthCosts")+'</span><b>'+ws.costs.toFixed(0)+' €</b></div><div class="dashMetricLine"><span>📦</span><span>'+mt("missingParts")+'</span><b>'+ws.missing+'</b></div></section></div><div class="dashGridThree"><section class="dashPanel"><h2>'+mt('openDamages')+' <button onclick="go(\'report\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>'+mt('urgent')+'</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>'+mt('high')+'</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>'+mt('medium')+'</span><b>0</b></div></section><section class="dashPanel"><h2>'+mt('dueChecks')+' <button onclick="go(\'maintenance\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('thisWeek')+'</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('nextWeek')+'</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>'+mt('in30Days')+'</span><b>4</b></div></section><section class="dashPanel"><h2>'+mt('pointsOverview')+'</h2><div class="dashDonut"><div><b>'+avg+'</b><small>'+mt('average')+'</small></div></div><div class="dashLegend"><span class="green">● '+mt('good')+'</span><span class="yellow">● '+mt('medium')+'</span><span class="red">● '+mt('critical')+'</span></div><button class="dashLink" onclick="go(\'points\')">'+mt('openPoints')+' →</button></section></div></section>');
}

function shell(content){
 var nav;
 if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];
 else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["workOrders","🔧",mt("workOrders")],["parts","📦",mt("partsInventory")],["more","☰",t("more")]];
 else if(isDashboardRole())nav=[["home","⌂",t("home")],["workshopInsight","🔧",mt("workshopInsight")],["report","⚠",t("report")],["more","☰",t("more")]];
 else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>';
}
function more(){
 var buttons='';
 buttons+='<button onclick="go(\'license\')">🪪 '+t("licenseCheck")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'documents\')">📂 '+t("documentFolder")+' <span>›</span></button>';
 if(canSeeWorkshopInsight())buttons+='<button onclick="go(\'workshopInsight\')">🔧 '+mt("workshopInsight")+' <span>›</span></button>';
 if(admin()||work())buttons+='<button onclick="go(\'maintenance\')">🛠 '+t("maintenancePlanner")+' <span>›</span></button>';
 if(work()||admin())buttons+='<button onclick="go(\'workOrders\')">🔧 '+mt("workOrders")+' <span>›</span></button><button onclick="go(\'parts\')">📦 '+mt("partsInventory")+' <span>›</span></button><button onclick="go(\'workCalendar\')">📅 '+mt("workshopCalendar")+' <span>›</span></button><button onclick="go(\'vehicleHistory\')">📁 '+mt("vehicleHistory")+' <span>›</span></button><button onclick="go(\'workCosts\')">💶 '+mt("workshopCosts")+' <span>›</span></button>';
 if(admin())buttons+='<button onclick="go(\'costs\')">💶 '+mt("costAnalysis")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'aiDamage\')">🤖 '+t("aiDamageCheck")+' <span>›</span></button>';
 if(admin()||dev())buttons+='<button onclick="go(\'aiTraining\')">🧠 '+t("aiTraining")+' <span>›</span></button>';
 if(isDeputyRole()||admin()||work())buttons+='<button onclick="go(\'pdfArchive\')">📄 '+mt("pdfArchiveMain")+' <span>›</span></button>';
 return shell('<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>'+t("settings")+'</span></div><h2>'+t("settings")+'</h2><label>'+t("language")+'<select onchange="setLang(this.value)">'+LANG.map(function(l){return '<option value="'+l[0]+'" '+(S.lang===l[0]?"selected":"")+'>'+l[1]+'</option>'}).join("")+'</select></label><label>'+t("mode")+'<select onchange="setTheme(this.value)"><option value="light" '+(S.theme==="light"?"selected":"")+'>'+t("light")+'</option><option value="dark" '+(S.theme==="dark"?"selected":"")+'>'+t("dark")+'</option></select></label><div class="settingsList">'+buttons+'</div><button class="logoutAction" onclick="logout()">↩ '+t("logout")+'</button></section>');
}
function render(){
 restoreSession();
 masterNormalizeUsers();
 workshopDataInit();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workshopCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workshopCostsPage,workshopInsight:managementWorkshopInsightPage};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}


/* === FINAL MASTER RELEASE V18.9 KONSOLIDIERT OHNE EMAIL === */

/* Erweiterte Übersetzungen für bisher fehlende finale Bereiche */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={};
 var pack={
  de:{
   pdfArchiveMain:"PDF-Archiv",departurePdfs:"Abfahrtskontrollen",workshopPdfs:"Werkstatt",archiveCategory:"Kategorie",
   vehicleFileArchived:"Fahrzeugakte wurde im Werkstatt-Archiv hinterlegt",workshopPdfArchive:"Werkstatt PDF-Archiv",
   departurePdfArchive:"Abfahrtskontrollen PDF-Archiv",noWorkshopPdfs:"Noch keine Werkstatt-PDFs vorhanden",
   workOrderPdfArchived:"Arbeitsauftrag wurde im Werkstatt-Archiv hinterlegt",allFormsChecked:"Alle Formulare wurden geprüft",
   invoice:"Rechnung",repairProof:"Reparaturnachweis",workshopReports:"Werkstattberichte",exportPdf:"PDF erzeugen",
   emailPreparedOnly:"E-Mail-Versand ist vorbereitet, aber nicht aktiv. Backend erforderlich.",
   loginFailedInline:"Login fehlgeschlagen. Bitte Benutzername und Passwort prüfen.",
   save:"Speichern",required:"Bitte alle Pflichtfelder ausfüllen.",notAllowed:"Keine Berechtigung",
   completeTranslationNote:"Alle neu eingebauten Bereiche sind übersetzbar."
  },
  en:{
   pdfArchiveMain:"PDF archive",departurePdfs:"Departure checks",workshopPdfs:"Workshop",archiveCategory:"Category",
   vehicleFileArchived:"Vehicle file has been stored in the workshop archive",workshopPdfArchive:"Workshop PDF archive",
   departurePdfArchive:"Departure checks PDF archive",noWorkshopPdfs:"No workshop PDFs yet",
   workOrderPdfArchived:"Work order has been stored in the workshop archive",allFormsChecked:"All forms have been checked",
   invoice:"Invoice",repairProof:"Repair proof",workshopReports:"Workshop reports",exportPdf:"Create PDF",
   emailPreparedOnly:"E-mail sending is prepared but not active. Backend required.",
   loginFailedInline:"Login failed. Please check username and password.",
   save:"Save",required:"Please complete all required fields.",notAllowed:"Not authorized",
   completeTranslationNote:"All newly added areas are translatable."
  },
  tr:{
   pdfArchiveMain:"PDF arşivi",departurePdfs:"Çıkış kontrolleri",workshopPdfs:"Atölye",archiveCategory:"Kategori",
   vehicleFileArchived:"Araç dosyası atölye arşivine kaydedildi",workshopPdfArchive:"Atölye PDF arşivi",
   departurePdfArchive:"Çıkış kontrolleri PDF arşivi",noWorkshopPdfs:"Henüz atölye PDF'i yok",
   workOrderPdfArchived:"İş emri atölye arşivine kaydedildi",allFormsChecked:"Tüm formlar kontrol edildi",
   invoice:"Fatura",repairProof:"Onarım kanıtı",workshopReports:"Atölye raporları",exportPdf:"PDF oluştur",
   emailPreparedOnly:"E-posta gönderimi hazırlandı ama aktif değil. Backend gerekli.",
   loginFailedInline:"Giriş başarısız. Lütfen kullanıcı adı ve şifreyi kontrol edin.",
   save:"Kaydet",required:"Lütfen tüm zorunlu alanları doldurun.",notAllowed:"Yetkiniz yok",
   completeTranslationNote:"Yeni eklenen tüm alanlar çevrilebilir."
  },
  pl:{
   pdfArchiveMain:"Archiwum PDF",departurePdfs:"Kontrole wyjazdowe",workshopPdfs:"Warsztat",archiveCategory:"Kategoria",
   vehicleFileArchived:"Akta pojazdu zapisano w archiwum warsztatu",workshopPdfArchive:"Archiwum PDF warsztatu",
   departurePdfArchive:"Archiwum PDF kontroli wyjazdowych",noWorkshopPdfs:"Brak PDF warsztatu",
   workOrderPdfArchived:"Zlecenie zapisano w archiwum warsztatu",allFormsChecked:"Wszystkie formularze sprawdzone",
   invoice:"Faktura",repairProof:"Potwierdzenie naprawy",workshopReports:"Raporty warsztatu",exportPdf:"Utwórz PDF",
   emailPreparedOnly:"Wysyłka e-mail jest przygotowana, ale nieaktywna. Wymagany backend.",
   loginFailedInline:"Logowanie nieudane. Sprawdź nazwę użytkownika i hasło.",
   save:"Zapisz",required:"Wypełnij wszystkie wymagane pola.",notAllowed:"Brak uprawnień",
   completeTranslationNote:"Wszystkie nowe obszary są tłumaczalne."
  },
  ro:{
   pdfArchiveMain:"Arhivă PDF",departurePdfs:"Controale plecare",workshopPdfs:"Atelier",archiveCategory:"Categorie",
   vehicleFileArchived:"Fișa vehiculului a fost salvată în arhiva atelierului",workshopPdfArchive:"Arhivă PDF atelier",
   departurePdfArchive:"Arhivă PDF controale plecare",noWorkshopPdfs:"Nu există PDF-uri atelier",
   workOrderPdfArchived:"Ordinul a fost salvat în arhiva atelierului",allFormsChecked:"Toate formularele au fost verificate",
   invoice:"Factură",repairProof:"Dovadă reparație",workshopReports:"Rapoarte atelier",exportPdf:"Creează PDF",
   emailPreparedOnly:"Trimiterea e-mail este pregătită, dar nu activă. Backend necesar.",
   loginFailedInline:"Autentificare eșuată. Verificați utilizatorul și parola.",
   save:"Salvează",required:"Completați toate câmpurile obligatorii.",notAllowed:"Fără permisiune",
   completeTranslationNote:"Toate zonele noi sunt traductibile."
  },
  ru:{
   pdfArchiveMain:"PDF-архив",departurePdfs:"Предрейсовые проверки",workshopPdfs:"Мастерская",archiveCategory:"Категория",
   vehicleFileArchived:"Файл ТС сохранен в архиве мастерской",workshopPdfArchive:"PDF-архив мастерской",
   departurePdfArchive:"PDF-архив предрейсовых проверок",noWorkshopPdfs:"PDF мастерской пока нет",
   workOrderPdfArchived:"Заказ сохранен в архиве мастерской",allFormsChecked:"Все формы проверены",
   invoice:"Счет",repairProof:"Подтверждение ремонта",workshopReports:"Отчеты мастерской",exportPdf:"Создать PDF",
   emailPreparedOnly:"Отправка e-mail подготовлена, но не активна. Требуется backend.",
   loginFailedInline:"Ошибка входа. Проверьте имя пользователя и пароль.",
   save:"Сохранить",required:"Заполните все обязательные поля.",notAllowed:"Нет разрешения",
   completeTranslationNote:"Все новые области доступны для перевода."
  },
  uk:{
   pdfArchiveMain:"PDF-архів",departurePdfs:"Передрейсові перевірки",workshopPdfs:"Майстерня",archiveCategory:"Категорія",
   vehicleFileArchived:"Файл авто збережено в архіві майстерні",workshopPdfArchive:"PDF-архів майстерні",
   departurePdfArchive:"PDF-архів передрейсових перевірок",noWorkshopPdfs:"PDF майстерні ще немає",
   workOrderPdfArchived:"Робочий наказ збережено в архіві майстерні",allFormsChecked:"Усі форми перевірено",
   invoice:"Рахунок",repairProof:"Підтвердження ремонту",workshopReports:"Звіти майстерні",exportPdf:"Створити PDF",
   emailPreparedOnly:"Надсилання e-mail підготовлено, але не активне. Потрібен backend.",
   loginFailedInline:"Помилка входу. Перевірте ім’я користувача та пароль.",
   save:"Зберегти",required:"Заповніть усі обов’язкові поля.",notAllowed:"Немає дозволу",
   completeTranslationNote:"Усі нові розділи перекладаються."
  },
  ar:{
   pdfArchiveMain:"أرشيف PDF",departurePdfs:"فحوصات الانطلاق",workshopPdfs:"الورشة",archiveCategory:"الفئة",
   vehicleFileArchived:"تم حفظ ملف المركبة في أرشيف الورشة",workshopPdfArchive:"أرشيف PDF الورشة",
   departurePdfArchive:"أرشيف PDF لفحوصات الانطلاق",noWorkshopPdfs:"لا توجد ملفات PDF للورشة بعد",
   workOrderPdfArchived:"تم حفظ أمر العمل في أرشيف الورشة",allFormsChecked:"تم فحص جميع النماذج",
   invoice:"فاتورة",repairProof:"إثبات الإصلاح",workshopReports:"تقارير الورشة",exportPdf:"إنشاء PDF",
   emailPreparedOnly:"إرسال البريد الإلكتروني مُجهّز لكنه غير فعال. يلزم Backend.",
   loginFailedInline:"فشل تسجيل الدخول. يرجى التحقق من اسم المستخدم وكلمة المرور.",
   save:"حفظ",required:"يرجى ملء جميع الحقول المطلوبة.",notAllowed:"غير مصرح",
   completeTranslationNote:"كل الأقسام الجديدة قابلة للترجمة."
  }
 };
 Object.keys(pack).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},pack[l])});
})();

/* Persistenz und Sitzungsstatus: angemeldet bleiben + aktuelle Seite behalten */
function saveAll(){
 localStorage.setItem("fc_v17_users",JSON.stringify(S.users||[]));
 localStorage.setItem("fc_v17_vehicles",JSON.stringify(S.vehicles||[]));
 localStorage.setItem("fc_v17_points",JSON.stringify(S.points||[]));
 localStorage.setItem("fc_v17_damages",JSON.stringify(S.damages||[]));
 localStorage.setItem("fc_v17_inspections",JSON.stringify(S.inspections||[]));
 localStorage.setItem("fc_v17_docs",JSON.stringify(S.docs||[]));
 localStorage.setItem("fc_v17_costs",JSON.stringify(S.costs||[]));
 localStorage.setItem("fc_v17_maintenance",JSON.stringify(S.maintenance||[]));
 localStorage.setItem("fc_v17_licenses",JSON.stringify(S.licenses||[]));
 localStorage.setItem("fc_v17_ai_training",JSON.stringify(S.aiTraining||[]));
 localStorage.setItem("fc_v17_mail_queue",JSON.stringify(S.mailQueue||[]));
 localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));
 localStorage.setItem("fc_v18_workshop_pdf_archive",JSON.stringify(S.workshopPdfArchive||[]));
 localStorage.setItem("fc_v18_work_orders",JSON.stringify(S.workOrders||[]));
 localStorage.setItem("fc_v18_parts_inventory",JSON.stringify(S.partsInventory||[]));
 localStorage.setItem("fc_v18_workshop_calendar",JSON.stringify(S.workshopAppointments||[]));
 localStorage.setItem("fc_v18_workshop_notes",JSON.stringify(S.workshopNotes||[]));
 localStorage.setItem("fc_v17_lang",JSON.stringify(S.lang||"de"));
 localStorage.setItem("fc_v17_theme",JSON.stringify(S.theme||"dark"));
 if(S.user)localStorage.setItem("fc_v17_session_user",JSON.stringify({id:S.user.id,login:S.user.login}));
 if(S.tab)localStorage.setItem("fc_v17_session_tab",JSON.stringify(S.tab));
}
var FC_SESSION_RESTORED=false;
function restoreSession(){
 masterNormalizeUsers();
 var sess=mLoad("fc_v17_session_user",null);
 if(sess&&sess.login&&!S.user){
  var u=(S.users||[]).find(function(x){return String(x.login||"").toLowerCase()===String(sess.login||"").toLowerCase()||Number(x.id)===Number(sess.id)});
  if(u)S.user=Object.assign({},u);
 }
 if(!FC_SESSION_RESTORED){S.tab=mLoad("fc_v17_session_tab",S.tab||"home");FC_SESSION_RESTORED=true;}
 S.lang=mLoad("fc_v17_lang",S.lang||"de");
 S.theme=mLoad("fc_v17_theme",S.theme||"dark");
}
function logout(){localStorage.removeItem("fc_v17_session_user");localStorage.removeItem("fc_v17_session_tab");mSave("fc_v17_lang",S.lang||"de");S.user=null;S.tab="home";render()}
function go(tab){S.tab=tab;FC_SESSION_RESTORED=true;localStorage.setItem("fc_v17_session_tab",JSON.stringify(tab));render()}

/* Roter Loginfehler unter dem Button */
function loginView(){
 var logo=(window.FC_LOGO?'<img src="'+window.FC_LOGO+'" alt="Fleet Control">':'<div class="brandIcon">🛡</div>');
 return '<div class="loginPage"><section class="loginCard"><div class="brand">'+logo+'<div><h1>Fleet Control</h1><p>Einfach. Sicher. Zuverlässig.</p></div></div><h2>'+t("welcomeBack")+'</h2><p class="muted">'+t("loginHint")+'</p><form onsubmit="login(event)"><div class="inputIcon">👤<input id="loginName" placeholder="'+t("username")+'" autocomplete="username"></div><div class="inputIcon">🔒<input id="loginPass" type="password" placeholder="'+t("password")+'" autocomplete="current-password"><button type="button" class="eyeBtn" onclick="togglePassword()">👁</button></div><button class="loginBtn" type="submit">↪ '+t("login")+'</button><div id="loginError" class="loginError" style="display:none"></div></form><div class="roleTiles"><div>👤<b>'+t("driver")+'</b><small>Abfahrt & Kontrolle</small></div><div>🔧<b>'+t("workshop")+'</b><small>Reparatur & Wartung</small></div><div>🚚<b>'+t("fleet")+'</b><small>Fahrzeuge & Status</small></div><div>📊<b>'+t("boss")+'</b><small>Kennzahlen & Boni</small></div><div>⌘<b>'+t("developer")+'</b><small>System & Daten</small></div></div><p class="muted foot">🌐 '+(S.lang||"DE").toUpperCase()+' · Datenschutz · Hilfe</p></section><aside class="loginInfo"><h2>Ihre Flotte. Ihre Kontrolle.</h2><p>Behalte Fahrzeuge, Fahrer, Wartungen, Schäden und Kennzahlen im Blick.</p><div class="chips"><span>♡ Sicher</span><span>☁ Cloud-ready</span><span>▣ Mobil</span><span>⚡ Schnell</span></div><small>Version 18.9 · Final Master</small></aside></div>';
}
function login(e){
 if(e&&e.preventDefault)e.preventDefault();
 masterNormalizeUsers();
 var err=document.getElementById("loginError");if(err){err.style.display="none";err.textContent=""}
 var n=(document.getElementById("loginName")&&document.getElementById("loginName").value||"").trim().toLowerCase();
 var p=(document.getElementById("loginPass")&&document.getElementById("loginPass").value||"").trim();
 if(n==="hopper.m")n="hoppe.m";
 var u=(S.users||[]).find(function(x){return String(x.login||x.user||"").trim().toLowerCase()===n&&String(x.password||x.pass||"").trim()===p});
 if(!u){if(err){err.textContent=mt("loginFailedInline");err.style.display="block"}return}
 S.user=Object.assign({},u);S.lang=mLoad("fc_v17_lang",u.language||"de");S.tab=mLoad("fc_v17_session_tab","home");
 var av=(S.vehicles||[]).filter(function(v){return Number(v.assigned)===Number(S.user.id)});if(av[0])S.activeVehicle=av[0].id;
 saveAll();render();
}

/* Reine Fahrer sauber begrenzen */
function isPureDriver(){return !!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||S.user.extraRoles.length===0))}
function canAwardPoints(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")))}
function canApproveAiDamage(){return canAwardPoints()}
function isChefFullAccess(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="admin"||mExtra("boss")||mExtra("admin")))}
function isDashboardRole(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")))}
function admin(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="developer"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("developer")||mExtra("admin")))}
function work(){return !!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||isChefFullAccess()))}

/* PDF-Archiv Kategorien */
function ensurePdfArchive(){
 S.pdfArchive=S.pdfArchive||mLoad("fc_v17_pdf_archive",[]);
 S.workshopPdfArchive=S.workshopPdfArchive||mLoad("fc_v18_workshop_pdf_archive",[]);
 return S.pdfArchive;
}
function savePdfArchives(){localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));localStorage.setItem("fc_v18_workshop_pdf_archive",JSON.stringify(S.workshopPdfArchive||[]))}
function archiveInspectionPdf(record){
 ensurePdfArchive();
 S.pdfArchive.unshift({id:Date.now(),category:"departure",inspectionId:record.id,driver:record.driver,driverName:record.driverName,vehicle:record.vehicle,date:record.date,title:mt("departurePdfs")+" · "+record.driverName+" · "+record.vehicle,pdfHtml:inspectionPdfHtml(record),created:new Date().toLocaleString(),visibleFor:"management"});
 savePdfArchives();
}
function archiveWorkshopPdf(item){
 ensurePdfArchive();
 S.workshopPdfArchive.unshift({id:Date.now(),category:"workshop",vehicleId:item.vehicleId||null,vehicle:item.vehicle||"",title:item.title||mt("completeVehicleFile"),date:item.date||new Date().toLocaleString(),type:item.type||"vehicle_file",pdfHtml:item.pdfHtml||"",created:new Date().toLocaleString(),visibleFor:"management"});
 savePdfArchives();
}
function inspectionPdfHtml(record){
 var rows=(record.checks||[]).map(function(c){return '<tr><td>'+c.label+'</td><td>'+(c.checked?'✓':'—')+'</td><td>'+(c.comment||'')+'</td></tr>'}).join("");
 var imgs=(record.photos||[]).length?record.photos.map(function(p){return '<li>'+p+'</li>'}).join(""):'<li>'+mt('noImages')+'</li>';
 var damages=(S.damages||[]).filter(function(d){return Number(d.driver)===Number(record.driver)||String(d.vehicle||"")===String(record.vehicle||"")});
 var dmg=damages.length?damages.map(function(d){return '<li><b>'+(d.position||'')+'</b> – '+(d.description||'')+' '+(d.photo?'('+d.photo+')':'')+'</li>'}).join(""):'<li>'+mt('noOpenDamages')+'</li>';
 return '<html><head><title>'+mt('detailedDeparturePdf')+'</title><style>body{font-family:Arial;padding:24px;color:#111}table{width:100%;border-collapse:collapse;margin-top:12px}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f3f3}.muted{color:#666}</style></head><body><h1>'+mt('detailedDeparturePdf')+'</h1><p class="muted">'+mt('reportContains')+'</p><p><b>'+mt('driver')+':</b> '+record.driverName+'</p><p><b>'+t('vehicle')+':</b> '+record.vehicle+'</p><p><b>Datum:</b> '+record.date+'</p><h2>'+mt('checkItems')+'</h2><table><thead><tr><th>Prüfpunkt</th><th>Status</th><th>'+mt('comments')+'</th></tr></thead><tbody>'+rows+'</tbody></table><h2>'+mt('damageImages')+'</h2><ul>'+imgs+'</ul><h2>'+mt('allDamagesList')+'</h2><ul>'+dmg+'</ul><h2>'+t('signature')+'</h2><p>'+(record.signature?mt('signaturePresent'):mt('signatureMissing'))+'</p></body></html>';
}
function queueInspectionMail(record){
 S.mailQueue=S.mailQueue||[];
 S.mailQueue.unshift({id:Date.now(),to:MAIL_TO,subject:"Abfahrtskontrolle "+(record.vehicle||"")+" "+(record.date||""),type:"inspection_pdf",inspectionId:record.id,status:"prepared_backend_required",pdfHtml:inspectionPdfHtml(record),note:mt("emailPreparedOnly"),created:new Date().toLocaleString()});
 archiveInspectionPdf(record);
 saveAll();
}

/* Fahrzeug-/Werkstatt-PDF automatisch in Werkstatt-Archiv */
function vehicleFilePdfHtml(id){
 var v=(S.vehicles||[]).find(function(x){return Number(x.id)===Number(id)})||{};
 var damages=(S.damages||[]).filter(function(d){return (d.vehicle||"").indexOf(v.plate)>=0||(d.vehicle||"").indexOf(v.name)>=0});
 var orders=(S.workOrders||[]).filter(function(o){return Number(o.vehicleId)===Number(id)||(o.vehicle||"").indexOf(v.plate)>=0});
 return '<html><head><title>'+mt('completeVehicleFile')+'</title><style>body{font-family:Arial;padding:24px;color:#111}table{width:100%;border-collapse:collapse;margin-top:12px}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f3f3}</style></head><body><h1>'+mt('completeVehicleFile')+'</h1><h2>'+((v.name||"")+' '+(v.plate||""))+'</h2><p>'+mt('huTuv')+': '+(v.hu||v.tuv||'-')+' · '+mt('spCheck')+': '+(v.sp||'-')+' · '+mt('tachoCheck')+': '+(v.tacho||'-')+'</p><h2>'+mt('allDamagesList')+'</h2><table><tr><th>'+mt('damagePhoto')+'</th><th>'+t('description')+'</th><th>'+mt('status')+'</th></tr>'+((damages||[]).map(function(d){return '<tr><td>'+(d.photo||'-')+'</td><td>'+(d.position||'')+' · '+(d.description||'')+'</td><td>'+statusText(d.status)+'</td></tr>'}).join("")||'<tr><td colspan="3">-</td></tr>')+'</table><h2>'+mt('workOrders')+'</h2><table><tr><th>'+mt('orderTitle')+'</th><th>'+mt('mechanic')+'</th><th>'+mt('parts')+'</th><th>'+mt('estimatedCost')+'</th><th>'+mt('status')+'</th></tr>'+((orders||[]).map(function(o){return '<tr><td>'+o.title+'</td><td>'+(o.mechanic||'-')+'</td><td>'+(o.parts||'-')+'</td><td>'+(o.estimateCost||0)+' €</td><td>'+(o.status||'-')+'</td></tr>'}).join("")||'<tr><td colspan="5">-</td></tr>')+'</table></body></html>';
}
function openVehicleFilePdf(id){
 var html=vehicleFilePdfHtml(id);
 var v=(S.vehicles||[]).find(function(x){return Number(x.id)===Number(id)})||{};
 archiveWorkshopPdf({vehicleId:id,vehicle:(v.name||"")+" "+(v.plate||""),title:mt("completeVehicleFile")+" · "+((v.name||"")+" "+(v.plate||"")),type:"vehicle_file",pdfHtml:html});
 alert(mt("vehicleFileArchived"));
 var w=window.open("", "_blank");if(w&&w.document){w.document.write(html);w.document.close();}
}
function archiveWorkOrderPdf(id){
 workshopDataInit();
 var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});
 if(!o)return;
 var html='<html><head><title>'+mt('workOrders')+'</title><style>body{font-family:Arial;padding:24px;color:#111}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px}</style></head><body><h1>'+mt('workOrders')+'</h1><h2>'+o.title+'</h2><p><b>'+t('vehicle')+':</b> '+(o.vehicle||'-')+'</p><p><b>'+mt('mechanic')+':</b> '+(o.mechanic||'-')+'</p><p><b>'+mt('status')+':</b> '+(o.status||'-')+'</p><p><b>'+mt('parts')+':</b> '+(o.parts||'-')+'</p><p><b>'+mt('laborHours')+':</b> '+(o.laborHours||'-')+'</p><p><b>'+mt('estimatedCost')+':</b> '+(o.estimateCost||0)+' €</p><p><b>'+mt('estimatedDuration')+':</b> '+(o.estimateDuration||'-')+'</p><p><b>'+mt('beforePhoto')+':</b> '+(o.beforePhoto||'-')+'</p><p><b>'+mt('afterPhoto')+':</b> '+(o.afterPhoto||'-')+'</p></body></html>';
 archiveWorkshopPdf({vehicleId:o.vehicleId,vehicle:o.vehicle,title:mt('workOrders')+' · '+o.title,type:'work_order',pdfHtml:html});
 alert(mt("workOrderPdfArchived"));
}

/* Archivansicht mit zwei Kategorien */
function deputyPdfArchivePage(){
 if(!isDeputyRole()&&!admin()&&!work()&&!isDashboardRole())return shell('<section class="card"><h2>'+mt('notAllowed')+'</h2></section>');
 ensurePdfArchive();
 var dep=S.pdfArchive||[];
 var ws=S.workshopPdfArchive||[];
 return shell('<h1 class="sectionTitle">'+mt('pdfArchiveMain')+'</h1><section class="card"><h2>'+mt('departurePdfArchive')+'</h2>'+(dep.map(function(p){return '<div class="row"><span><b>'+(p.title||p.driverName)+'</b><br><small class="muted">'+(p.vehicle||'')+' · '+(p.date||p.created)+' · '+mt('archiveCategory')+': '+mt('departurePdfs')+'</small></span><button onclick="openArchivedPdf('+p.id+')">'+mt('viewPdf')+'</button></div>'}).join("")||'<p class="muted">'+mt('noPdfReports')+'</p>')+'</section><section class="card"><h2>'+mt('workshopPdfArchive')+'</h2>'+(ws.map(function(p){return '<div class="row"><span><b>'+p.title+'</b><br><small class="muted">'+(p.vehicle||'')+' · '+(p.date||p.created)+' · '+mt('archiveCategory')+': '+mt('workshopPdfs')+'</small></span><button onclick="openWorkshopArchivedPdf('+p.id+')">'+mt('viewPdf')+'</button></div>'}).join("")||'<p class="muted">'+mt('noWorkshopPdfs')+'</p>')+'</section>');
}
function openArchivedPdf(id){ensurePdfArchive();var p=(S.pdfArchive||[]).find(function(x){return Number(x.id)===Number(id)});if(!p)return;var w=window.open("", "_blank");if(w&&w.document){w.document.write(p.pdfHtml||"");w.document.close();}}
function openWorkshopArchivedPdf(id){ensurePdfArchive();var p=(S.workshopPdfArchive||[]).find(function(x){return Number(x.id)===Number(id)});if(!p)return;var w=window.open("", "_blank");if(w&&w.document){w.document.write(p.pdfHtml||"");w.document.close();}}

/* Werkstatt-Einsicht für Chef/Fuhrpark/Stellvertretung */
function canSeeWorkshopInsight(){return !!(work()||admin()||isDashboardRole()||isDeputyRole())}
function canManageWorkshopInsight(){return !!(admin()||isDashboardRole()||isDeputyRole())}
function workshopInsightStats(){
 workshopDataInit();
 var orders=S.workOrders||[];
 var open=orders.filter(function(o){return o.status!=="done"&&o.status!=="approved"}).length;
 var repairVehicles={};orders.forEach(function(o){if(o.status!=="done"&&o.status!=="approved"&&o.vehicleId)repairVehicles[o.vehicleId]=true});
 var costs=orders.reduce(function(a,o){return a+Number(o.estimateCost||0)},0);
 var missing=(S.partsInventory||[]).filter(function(p){return Number(p.stock)<=Number(p.min)}).length;
 return {open:open,vehicles:Object.keys(repairVehicles).length,costs:costs,missing:missing};
}
function approveWorkshopOrder(id){if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(o){o.status="approved";o.managementApproved=true;o.approvedBy=S.user?S.user.name:"";o.approvedAt=new Date().toLocaleString();workshopSave();render();}}
function lockWorkshopOrder(id){if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(o){o.locked=!o.locked;o.lockedBy=o.locked?(S.user?S.user.name:""):"";workshopSave();render();}}
function addManagementComment(id){if(!canManageWorkshopInsight()){alert(mt("notAllowed"));return}var el=document.getElementById("mgmtComment"+id);var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(o&&el&&el.value.trim()){o.managementComments=o.managementComments||[];o.managementComments.unshift({by:S.user?S.user.name:"",text:el.value.trim(),date:new Date().toLocaleString()});workshopSave();render();}}
function managementWorkshopInsightPage(){
 if(!canSeeWorkshopInsight())return shell('<section class="card"><h2>'+mt("notAllowed")+'</h2></section>');
 workshopDataInit();
 var s=workshopInsightStats();
 var orders=(S.workOrders||[]).map(function(o){var comments=(o.managementComments||[]).map(function(c){return '<small>💬 '+c.date+' · '+c.by+': '+c.text+'</small>'}).join("");var controls=canManageWorkshopInsight()?'<div class="workControls"><button onclick="approveWorkshopOrder('+o.id+')">✅ '+mt("approveWorkshopOrder")+'</button><button class="secondary" onclick="lockWorkshopOrder('+o.id+')">'+(o.locked?'🔓 '+mt("unlockOrder"):'🔒 '+mt("lockOrder"))+'</button><input id="mgmtComment'+o.id+'" placeholder="'+mt("managementComment")+'"><button class="secondary" onclick="addManagementComment('+o.id+')">💬</button></div>':'';return '<div class="workItem"><div><b>'+o.title+'</b><small>'+((o.vehicle)||'')+' · '+mt('status')+': '+(o.managementApproved?mt("approvedByManagement"):mt('status'+String(o.status||"open").charAt(0).toUpperCase()+String(o.status||"open").slice(1)))+' · '+mt('mechanic')+': '+(o.mechanic||'-')+'</small><small>🤖 '+mt('estimatedCost')+': '+(o.estimateCost||0)+' € · '+mt('estimatedDuration')+': '+(o.estimateDuration||'-')+' · '+mt('suggestedParts')+': '+(o.parts||'-')+'</small><small>🔗 '+mt("linkedChain")+'</small>'+comments+'</div><div>'+controls+'<button class="secondary" onclick="archiveWorkOrderPdf('+o.id+')">'+mt("exportPdf")+'</button></div></div>'}).join("");
 var parts=(S.partsInventory||[]).filter(function(p){return Number(p.stock)<=Number(p.min)}).map(function(p){return '<div class="row"><span><b>'+p.name+'</b><br><small class="muted">'+mt('stock')+': '+p.stock+' · '+mt('minStock')+': '+p.min+' · '+mt('supplier')+': '+(p.supplier||'-')+'</small></span><span class="red">⚠ '+mt('reorderWarning')+'</span></div>'}).join("");
 return shell('<h1 class="sectionTitle">'+mt("workshopInsight")+'</h1><div class="dashKpis"><div class="dashKpi"><span>'+mt("openWorkshopOrders")+'</span><div><i>🔧</i><b>'+s.open+'</b></div></div><div class="dashKpi"><span>'+mt("vehiclesInRepair")+'</span><div><i>🚛</i><b>'+s.vehicles+'</b></div></div><div class="dashKpi"><span>'+mt("workshopMonthCosts")+'</span><div><i>💶</i><b>'+s.costs.toFixed(0)+' €</b></div></div><div class="dashKpi"><span>'+mt("missingParts")+'</span><div><i>📦</i><b>'+s.missing+'</b></div></div></div><section class="card"><h2>'+mt("managementView")+' · '+mt("workOrders")+'</h2>'+(orders||'<p class="muted">'+mt("noOrders")+'</p>')+'</section><section class="card"><h2>'+mt("missingParts")+'</h2>'+(parts||'<p class="muted">'+mt("noParts")+'</p>')+'</section>');
}

/* Fahrzeugformular robust */
function vehicleForm(){if(!admin())return "";var drivers=allDrivers();return '<section class="card"><h2>'+mt('vehicleEntry')+'</h2><input id="vName" placeholder="'+mt('vehicleName')+'"><input id="vPlate" placeholder="'+mt('plate')+'"><select id="vType"><option value="vehicle">Fahrzeug</option><option value="trailer">Anhänger</option><option value="combo">Kombination</option></select><select id="vAssigned"><option value="">'+mt('notAssigned')+'</option>'+drivers.map(function(d){return '<option value="'+d.id+'">'+d.name+'</option>'}).join("")+'</select><label>'+mt('huTuv')+' <input id="vHu" type="date"></label><label>'+mt('spCheck')+' <input id="vSp" type="date"></label><label>'+mt('tachoCheck')+' <input id="vTacho" type="date"></label><button onclick="addVehicle()">'+mt('saveVehicle')+'</button></section>'}
function addVehicle(){if(!admin()){alert(mt("notAllowed"));return}var name=(document.getElementById("vName")&&document.getElementById("vName").value||"").trim();var plate=(document.getElementById("vPlate")&&document.getElementById("vPlate").value||"").trim();var type=(document.getElementById("vType")&&document.getElementById("vType").value)||"vehicle";var assignedRaw=(document.getElementById("vAssigned")&&document.getElementById("vAssigned").value)||"";var hu=(document.getElementById("vHu")&&document.getElementById("vHu").value)||"";var sp=(document.getElementById("vSp")&&document.getElementById("vSp").value)||"";var tacho=(document.getElementById("vTacho")&&document.getElementById("vTacho").value)||"";if(!name||!plate){alert(mt("required"));return}S.vehicles=S.vehicles||[];S.vehicles.unshift({id:Date.now(),name:name,plate:plate,type:type,assigned:assignedRaw?Number(assignedRaw):null,hu:hu,tuv:hu,sp:sp,tacho:tacho,created:new Date().toLocaleString()});saveAll();render()}
function vehicles(){var list=(S.vehicles||[]).filter(function(v){return admin()||work()||isDashboardRole()||!v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});return shell('<h1 class="sectionTitle">'+t("vehicles")+'</h1>'+vehicleForm()+'<section class="card"><h2>'+mt('vehiclesPilot')+'</h2>'+(list.map(function(v){var u=(S.users||[]).find(function(x){return Number(x.id)===Number(v.assigned)});return '<div class="row"><span><b>'+v.name+' · '+v.plate+'</b><br><small class="muted">'+mt('type')+': '+(v.type||"Fahrzeug")+' · '+mt('driver')+': '+(u?u.name:mt('notAssigned'))+'<br>'+mt('huTuv')+': '+(v.hu||v.tuv||"-")+' · '+mt('spCheck')+': '+(v.sp||"-")+' · '+mt('tachoCheck')+': '+(v.tacho||"-")+'</small></span><span>'+deadlineBadge(v.hu||v.tuv)+' '+deadlineBadge(v.sp)+' '+deadlineBadge(v.tacho)+'</span></div>'}).join("")||'<p class="muted">'+t("noData")+'</p>')+'</section>')}

/* Dashboard mit Werkstatt-KPI, ohne Strich */
function exactManagementDashboard(){
 var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;
 var ws=workshopInsightStats();
 var avg=drivers.length?Math.round(drivers.reduce(function(a,d){return a+Number(pointTotal(d.id)||d.points||0)},0)/drivers.length):0;
 var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");
 var current=getCurrentDateTime();
 var rows=drivers.slice(0,5).map(function(d){return '<div class="dashListRow"><span class="dashAvatar">👤</span><span><b>'+d.name+'</b></span>'+dashStatus(d)+'<span class="dashPoint">'+(pointTotal(d.id)||d.points||0)+'</span></div>'}).join("");
 return shell('<section class="exactDash"><div class="dashHero"><div><h1>'+mt('goodMorning')+'<br>'+name+'!</h1><p>'+mt('fleetOverview')+'</p></div><div class="dashClock"><small>'+current.date+'</small><b>'+current.time+' Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>'+mt('driversTotal')+'</span><div><i>👥</i><b>'+drivers.length+'</b></div><small class="green">'+mt('active')+': '+drivers.length+'</small></div><div class="dashKpi"><span>'+mt('vehiclesTotal')+'</span><div><i>🚚</i><b>'+vehicles.length+'</b></div><small class="blue">'+mt('inUse')+': '+Math.max(vehicles.length-1,0)+'</small></div><div class="dashKpi"><span>'+mt('openDamages')+'</span><div><i>⚠</i><b>'+open+'</b></div><small class="red">'+mt('urgent')+': '+Math.min(open,2)+'</small></div><div class="dashKpi"><span>'+mt("openWorkshopOrders")+'</span><div><i>🔧</i><b>'+ws.open+'</b></div><small class="orange">'+mt("vehiclesInRepair")+': '+ws.vehicles+'</small></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>'+mt('driverStatus')+' <button onclick="go(\'vehicles\')">'+mt('showAll')+' →</button></h2>'+rows+'<button class="dashLink" onclick="go(\'vehicles\')">'+mt('showAllDrivers')+' →</button></section><section class="dashPanel"><h2>'+mt("workshopInsight")+' <button onclick="go(\'workshopInsight\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span>🔧</span><span>'+mt("openWorkshopOrders")+'</span><b>'+ws.open+'</b></div><div class="dashMetricLine"><span>🚛</span><span>'+mt("vehiclesInRepair")+'</span><b>'+ws.vehicles+'</b></div><div class="dashMetricLine"><span>💶</span><span>'+mt("workshopMonthCosts")+'</span><b>'+ws.costs.toFixed(0)+' €</b></div><div class="dashMetricLine"><span>📦</span><span>'+mt("missingParts")+'</span><b>'+ws.missing+'</b></div></section></div><div class="dashGridThree"><section class="dashPanel"><h2>'+mt('openDamages')+' <button onclick="go(\'report\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="red">⚠</span><span>'+mt('urgent')+'</span><b>'+Math.min(open,2)+'</b></div><div class="dashMetricLine"><span class="orange">⚠</span><span>'+mt('high')+'</span><b>'+Math.max(open-2,0)+'</b></div><div class="dashMetricLine"><span class="yellow">⚠</span><span>'+mt('medium')+'</span><b>0</b></div></section><section class="dashPanel"><h2>'+mt('dueChecks')+' <button onclick="go(\'maintenance\')">'+mt('showAll')+' →</button></h2><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('thisWeek')+'</span><b>'+vehicles.length+'</b></div><div class="dashMetricLine"><span class="orange">▣</span><span>'+mt('nextWeek')+'</span><b>3</b></div><div class="dashMetricLine"><span class="blue">▣</span><span>'+mt('in30Days')+'</span><b>4</b></div></section><section class="dashPanel"><h2>'+mt('pointsOverview')+'</h2><div class="dashDonut"><div><b>'+avg+'</b><small>'+mt('average')+'</small></div></div><div class="dashLegend"><span class="green">● '+mt('good')+'</span><span class="yellow">● '+mt('medium')+'</span><span class="red">● '+mt('critical')+'</span></div><button class="dashLink" onclick="go(\'points\')">'+mt('openPoints')+' →</button></section></div></section>');
}

/* Menüs und Routen */
function shell(content){
 var nav;
 if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];
 else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["workOrders","🔧",mt("workOrders")],["parts","📦",mt("partsInventory")],["more","☰",t("more")]];
 else if(isDashboardRole())nav=[["home","⌂",t("home")],["workshopInsight","🔧",mt("workshopInsight")],["report","⚠",t("report")],["more","☰",t("more")]];
 else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",t("report")],["more","☰",t("more")]];
 return topbar()+'<main class="app ziel-app">'+(S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':'')+content+'</main><nav class="nav ziel-nav" style="grid-template-columns:repeat('+nav.length+',1fr)">'+nav.map(function(n){return '<button class="'+(S.tab===n[0]?'active':'')+'" onclick="go(\''+n[0]+'\')"><span class="navIcon">'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>';
}
function more(){
 var buttons='';
 buttons+='<button onclick="go(\'license\')">🪪 '+t("licenseCheck")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'documents\')">📂 '+t("documentFolder")+' <span>›</span></button>';
 if(canSeeWorkshopInsight())buttons+='<button onclick="go(\'workshopInsight\')">🔧 '+mt("workshopInsight")+' <span>›</span></button>';
 if(admin()||work())buttons+='<button onclick="go(\'maintenance\')">🛠 '+t("maintenancePlanner")+' <span>›</span></button>';
 if(work()||admin())buttons+='<button onclick="go(\'workOrders\')">🔧 '+mt("workOrders")+' <span>›</span></button><button onclick="go(\'parts\')">📦 '+mt("partsInventory")+' <span>›</span></button><button onclick="go(\'workCalendar\')">📅 '+mt("workshopCalendar")+' <span>›</span></button><button onclick="go(\'vehicleHistory\')">📁 '+mt("vehicleHistory")+' <span>›</span></button><button onclick="go(\'workCosts\')">💶 '+mt("workshopCosts")+' <span>›</span></button>';
 if(admin())buttons+='<button onclick="go(\'costs\')">💶 '+mt("costAnalysis")+' <span>›</span></button>';
 buttons+='<button onclick="go(\'aiDamage\')">🤖 '+t("aiDamageCheck")+' <span>›</span></button>';
 if(admin()||dev())buttons+='<button onclick="go(\'aiTraining\')">🧠 '+t("aiTraining")+' <span>›</span></button>';
 if(isDeputyRole()||admin()||work()||isDashboardRole())buttons+='<button onclick="go(\'pdfArchive\')">📄 '+mt("pdfArchiveMain")+' <span>›</span></button>';
 return shell('<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>'+t("settings")+'</span></div><h2>'+t("settings")+'</h2><label>'+t("language")+'<select onchange="setLang(this.value)">'+LANG.map(function(l){return '<option value="'+l[0]+'" '+(S.lang===l[0]?"selected":"")+'>'+l[1]+'</option>'}).join("")+'</select></label><label>'+t("mode")+'<select onchange="setTheme(this.value)"><option value="light" '+(S.theme==="light"?"selected":"")+'>'+t("light")+'</option><option value="dark" '+(S.theme==="dark"?"selected":"")+'>'+t("dark")+'</option></select></label><div class="settingsList">'+buttons+'</div><button class="logoutAction" onclick="logout()">↩ '+t("logout")+'</button></section>');
}
function render(){
 restoreSession();
 masterNormalizeUsers();
 workshopDataInit();
 ensurePdfArchive();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workshopCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workshopCostsPage,workshopInsight:managementWorkshopInsightPage};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}
ensurePdfArchive();


/* === V18.9 LOGIN PAGE RESTORE V18.7 STYLE === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={};
 var base={
  de:{welcomeBackClean:"Willkommen zurück.",loginHintClean:"Bitte melde dich an, um fortzufahren.",usernameClean:"Benutzername",passwordClean:"Passwort",loginClean:"Anmelden",driverClean:"Fahrer",workshopClean:"Werkstatt",fleetClean:"Fuhrpark",bossClean:"Chef",developerClean:"Entwickler",driverSubClean:"Abfahrt & Kontrolle",workshopSubClean:"Reparatur & Wartung",fleetSubClean:"Fahrzeuge & Status",bossSubClean:"Kennzahlen & Boni",developerSubClean:"System & Daten",loginRightTitle:"Ihre Flotte. Ihre Kontrolle.",loginRightText:"Behalte Fahrzeuge, Fahrer, Wartungen, Schäden und Kennzahlen im Blick.",secureClean:"Sicher",mobileClean:"Mobil"},
  en:{welcomeBackClean:"Welcome back.",loginHintClean:"Please sign in to continue.",usernameClean:"Username",passwordClean:"Password",loginClean:"Sign in",driverClean:"Driver",workshopClean:"Workshop",fleetClean:"Fleet",bossClean:"Management",developerClean:"Developer",driverSubClean:"Departure & checks",workshopSubClean:"Repair & maintenance",fleetSubClean:"Vehicles & status",bossSubClean:"KPIs & bonuses",developerSubClean:"System & data",loginRightTitle:"Your fleet. Your control.",loginRightText:"Keep vehicles, drivers, maintenance, damages and KPIs in view.",secureClean:"Secure",mobileClean:"Mobile"},
  tr:{welcomeBackClean:"Tekrar hoş geldiniz.",loginHintClean:"Devam etmek için lütfen giriş yapın.",usernameClean:"Kullanıcı adı",passwordClean:"Şifre",loginClean:"Giriş yap",driverClean:"Sürücü",workshopClean:"Atölye",fleetClean:"Filo",bossClean:"Yönetim",developerClean:"Geliştirici",driverSubClean:"Çıkış & kontrol",workshopSubClean:"Onarım & bakım",fleetSubClean:"Araçlar & durum",bossSubClean:"KPI & bonuslar",developerSubClean:"Sistem & veri",loginRightTitle:"Filonuz. Kontrolünüz.",loginRightText:"Araçları, sürücüleri, bakımı, hasarları ve göstergeleri takip edin.",secureClean:"Güvenli",mobileClean:"Mobil"}
 };
 ["pl","ro","ru","uk","ar"].forEach(function(l){base[l]=base.en});
 Object.keys(base).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},base[l])});
})();
function loginView(){
 var logo=(window.FC_LOGO?'<img src="'+window.FC_LOGO+'" alt="Fleet Control">':'<div class="brandIcon">🛡</div>');
 return '<div class="loginPage loginV187">'+
 '<section class="loginCard">'+
 '<div class="brand">'+logo+'<div><h1>Fleet Control</h1><p>Einfach. Sicher. Zuverlässig.</p></div></div>'+
 '<h2>'+mt("welcomeBackClean")+'</h2><p class="muted">'+mt("loginHintClean")+'</p>'+
 '<form onsubmit="login(event)" class="loginFormClean">'+
 '<div class="inputIcon"><span>👤</span><input id="loginName" placeholder="'+mt("usernameClean")+'" autocomplete="username"></div>'+
 '<div class="inputIcon"><span>🔒</span><input id="loginPass" type="password" placeholder="'+mt("passwordClean")+'" autocomplete="current-password"><button type="button" class="eyeBtn" onclick="togglePassword()">👁</button></div>'+
 '<button class="loginBtn" type="submit">↪ '+mt("loginClean")+'</button><div id="loginError" class="loginError" style="display:none"></div></form>'+
 '<div class="roleTiles">'+
 '<div>👤<b>'+mt("driverClean")+'</b><small>'+mt("driverSubClean")+'</small></div>'+
 '<div>🔧<b>'+mt("workshopClean")+'</b><small>'+mt("workshopSubClean")+'</small></div>'+
 '<div>🚚<b>'+mt("fleetClean")+'</b><small>'+mt("fleetSubClean")+'</small></div>'+
 '<div>📊<b>'+mt("bossClean")+'</b><small>'+mt("bossSubClean")+'</small></div>'+
 '<div>⌘<b>'+mt("developerClean")+'</b><small>'+mt("developerSubClean")+'</small></div></div>'+
 '<p class="muted foot">🌐 '+(S.lang||"DE").toUpperCase()+' · Datenschutz · Hilfe</p></section>'+
 '<aside class="loginInfo"><h2>'+mt("loginRightTitle")+'</h2><p>'+mt("loginRightText")+'</p><div class="chips"><span>♡ '+mt("secureClean")+'</span><span>☁ Cloud-ready</span><span>▣ '+mt("mobileClean")+'</span><span>⚡ Schnell</span></div><small>Version 18.9 · Final Master</small></aside></div>';
}


/* === V18.9 MANUELLE FAHRZEUGAUSWAHL FIX === */

/* Übersetzungen für manuelle Fahrzeug-/Kennzeicheneingabe */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var p={
  de:{manualVehicle:"Fahrzeug / Kennzeichen manuell eintragen",manualVehicleHint:"Falls kein Fahrzeug vorhanden ist oder das Kennzeichen fehlt, hier Fahrzeug und Kennzeichen eintragen.",manualVehicleSaved:"Fahrzeug/Kennzeichen gespeichert",useManualVehicle:"Manuelles Fahrzeug verwenden",vehicleRequired:"Bitte Fahrzeug auswählen oder Fahrzeug/Kennzeichen manuell eintragen."},
  en:{manualVehicle:"Enter vehicle / plate manually",manualVehicleHint:"If no vehicle exists or the plate is missing, enter vehicle and plate here.",manualVehicleSaved:"Vehicle/plate saved",useManualVehicle:"Use manual vehicle",vehicleRequired:"Please select a vehicle or enter vehicle/plate manually."},
  tr:{manualVehicle:"Araç / plakayı elle gir",manualVehicleHint:"Araç yoksa veya plaka eksikse araç ve plakayı buraya girin.",manualVehicleSaved:"Araç/plaka kaydedildi",useManualVehicle:"Manuel aracı kullan",vehicleRequired:"Lütfen araç seçin veya araç/plakayı elle girin."},
  pl:{manualVehicle:"Wpisz pojazd / numer ręcznie",manualVehicleHint:"Jeśli pojazdu nie ma lub brakuje numeru, wpisz pojazd i numer tutaj.",manualVehicleSaved:"Pojazd/numer zapisany",useManualVehicle:"Użyj pojazdu ręcznego",vehicleRequired:"Wybierz pojazd lub wpisz pojazd/numer ręcznie."},
  ro:{manualVehicle:"Introduceți manual vehiculul / numărul",manualVehicleHint:"Dacă vehiculul nu există sau lipsește numărul, introduceți vehiculul și numărul aici.",manualVehicleSaved:"Vehicul/număr salvat",useManualVehicle:"Folosește vehicul manual",vehicleRequired:"Selectați un vehicul sau introduceți manual vehiculul/numărul."},
  ru:{manualVehicle:"Ввести ТС / номер вручную",manualVehicleHint:"Если ТС отсутствует или номер не указан, введите ТС и номер здесь.",manualVehicleSaved:"ТС/номер сохранены",useManualVehicle:"Использовать ручной ввод",vehicleRequired:"Выберите ТС или введите ТС/номер вручную."},
  uk:{manualVehicle:"Ввести авто / номер вручну",manualVehicleHint:"Якщо авто немає або номер відсутній, введіть авто і номер тут.",manualVehicleSaved:"Авто/номер збережено",useManualVehicle:"Використати ручне авто",vehicleRequired:"Виберіть авто або введіть авто/номер вручну."},
  ar:{manualVehicle:"إدخال المركبة / اللوحة يدويًا",manualVehicleHint:"إذا لم تكن المركبة موجودة أو اللوحة ناقصة، أدخل المركبة واللوحة هنا.",manualVehicleSaved:"تم حفظ المركبة/اللوحة",useManualVehicle:"استخدام مركبة يدوية",vehicleRequired:"يرجى اختيار مركبة أو إدخال المركبة/اللوحة يدويًا."}
 };
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();

function isPlaceholderVehicle(v){
 var s=((v&&((v.name||"")+" "+(v.plate||"")))||"").toLowerCase();
 return s.indexOf("bitte kennzeichen")>=0||s.indexOf("pilot-fahrzeug")>=0||s.indexOf("kennzeichen eintragen")>=0;
}
function vehicleDisplayName(v){
 if(!v)return "";
 var n=(v.name||"").trim(), p=(v.plate||"").trim();
 if(isPlaceholderVehicle(v))return "";
 return (n+" "+p).trim();
}
function getManualVehicleText(){
 var el=document.getElementById("manualVehicleInput");
 return el?String(el.value||"").trim():"";
}
function saveManualVehicle(){
 var txt=getManualVehicleText();
 if(!txt){alert(mt("vehicleRequired"));return null}
 S.vehicles=S.vehicles||[];
 var existing=S.vehicles.find(function(v){return String(v.manualText||"").toLowerCase()===txt.toLowerCase()||((v.name+" "+v.plate).trim().toLowerCase()===txt.toLowerCase())});
 if(existing){S.activeVehicle=existing.id;saveAll();render();return existing}
 var parts=txt.split(/\s+/);
 var plate=parts.length>1?parts[parts.length-1]:txt;
 var name=parts.length>1?parts.slice(0,-1).join(" "):txt;
 var v={id:Date.now(),name:name,plate:plate,type:"manual",assigned:S.user?S.user.id:null,manual:true,manualText:txt,hu:"",tuv:"",sp:"",tacho:"",created:new Date().toLocaleString()};
 S.vehicles.unshift(v);
 S.activeVehicle=v.id;
 saveAll();
 alert(mt("manualVehicleSaved"));
 render();
 return v;
}
function selectedOrManualVehicle(){
 var manual=getManualVehicleText();
 if(manual){
   var existing=(S.vehicles||[]).find(function(v){return String(v.manualText||"").toLowerCase()===manual.toLowerCase()||((v.name+" "+v.plate).trim().toLowerCase()===manual.toLowerCase())});
   return existing||saveManualVehicle();
 }
 var id=Number((document.getElementById("checkVehicle")||document.getElementById("dVehicleSelect")||{}).value||S.activeVehicle||0);
 var v=(S.vehicles||[]).find(function(x){return Number(x.id)===id});
 if(!v||isPlaceholderVehicle(v))return null;
 return v;
}

/* Fahrer-Startseite mit manueller Fahrzeug-/Kennzeicheneingabe */
function driverHome(){
 var mine=(S.vehicles||[]).filter(function(v){return !v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});
 var cards=mine.map(function(v){
   var label=vehicleDisplayName(v)||(v.manualText||"");
   if(!label)label="Pilot-Fahrzeug · "+mt("manualVehicle");
   return '<div class="vehicleCard '+(S.activeVehicle===v.id?'selected':'')+'" onclick="S.activeVehicle='+v.id+';saveAll();render()"><span>🚚</span><b>'+label+'</b><small>'+((!isPlaceholderVehicle(v)&&v.plate)?v.plate:mt("manualVehicle"))+'</small></div>';
 }).join("");
 return shell('<section class="rolePhone"><div class="phoneGreeting"><span>'+t("goodMorning")+'</span><h1>'+(S.user?S.user.name.split(" ")[0]:"")+' 👋</h1></div><h3>'+t("myVehicle")+'</h3><div class="vehicleSelectGrid">'+cards+'</div><section class="card manualVehicleBox"><h2>'+mt("manualVehicle")+'</h2><p class="muted">'+mt("manualVehicleHint")+'</p><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button onclick="saveManualVehicle()">'+mt("useManualVehicle")+'</button></section><button class="bigCta" onclick="go(\'check\')">☑ '+t("departureCheck")+'</button><div class="todayList"><div onclick="go(\'report\')">⚠ '+t("reportDamage")+'<span>›</span></div><div onclick="go(\'points\')">⭐ '+t("points")+'<span>›</span></div><div onclick="go(\'more\')">☰ '+t("more")+'<span>›</span></div></div></section>');
}

/* Abfahrtskontrolle: Auswahl + manuelles Fahrzeug */
function check(){
 if(!canDoInspection())return shell('<section class="card"><h2>'+mt("notAllowed")+'</h2></section>');
 var vehicles=(S.vehicles||[]).filter(function(v){return admin()||isDashboardRole()||!v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});
 var opts=vehicles.map(function(v){
   var label=vehicleDisplayName(v)||("Pilot-Fahrzeug · "+mt("manualVehicle"));
   return '<option value="'+v.id+'" '+(S.activeVehicle===v.id?'selected':'')+'>'+label+'</option>';
 }).join("");
 var labels=CHECKS[S.lang]||CHECKS.de;
 return shell('<section class="card"><h2>'+t("departureCheck")+'</h2><label>'+t("vehicle")+'<select id="checkVehicle">'+opts+'</select></label><section class="manualVehicleBox"><h3>'+mt("manualVehicle")+'</h3><p class="muted">'+mt("manualVehicleHint")+'</p><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button type="button" class="secondary" onclick="saveManualVehicle()">'+mt("useManualVehicle")+'</button></section>'+labels.map(function(l,i){return '<label class="checkRow"><input id="chk'+i+'" type="checkbox" '+(S.checks&&S.checks[i]?'checked':'')+' onchange="S.checks['+i+']=this.checked">'+l+'</label><textarea placeholder="'+t("commentOptional")+'" oninput="S.comments['+i+']=this.value">'+(S.comments&&S.comments[i]||"")+'</textarea>'}).join("")+'<label>'+t("damagePhotos")+'<input id="damagePhotos" type="file" accept="image/*" multiple></label><h3>'+t("signature")+'</h3><canvas id="sig" width="600" height="240"></canvas><button class="secondary" onclick="clearSig()">'+t("clear")+'</button><button onclick="completeCheck('+labels.length+')">'+t("finishCheck")+'</button></section>');
}
function completeCheck(n){
 var manual=getManualVehicleText();
 var vehicleId=Number((document.getElementById("checkVehicle")||{}).value||0);
 var v=null;
 if(manual){v=saveManualVehicle();vehicleId=v?v.id:0}else{v=(S.vehicles||[]).find(function(x){return Number(x.id)===vehicleId})}
 if(!v||isPlaceholderVehicle(v)){alert(mt("vehicleRequired"));return}
 for(var i=0;i<n;i++){var el=document.getElementById("chk"+i);var checked=el?el.checked:S.checks[i];if(!checked){alert(mt("allRequired")||mt("required"));return}S.checks[i]=true}
 var photos=document.getElementById("damagePhotos");
 var photoNames=photos&&photos.files?Array.from(photos.files).map(function(f){return f.name}):[];
 var labels=CHECKS[S.lang]||CHECKS.de;
 var record={id:Date.now(),driver:S.user.id,driverName:S.user.name,vehicleId:vehicleId,vehicle:vehicleDisplayName(v)||(v.manualText||""),date:new Date().toLocaleString(),checks:labels.map(function(label,i){return {label:label,checked:true,comment:S.comments[i]||""}}),photos:photoNames,signature:S.sig||""};
 S.inspections=S.inspections||[];S.inspections.push(record);
 queueInspectionMail(record);
 saveAll();S.checks={};S.comments={};S.sig="";alert(mt('pdfPrepared'));S.tab="home";render();
}

/* Schadensmeldung: manuelles Fahrzeug statt kaputtem Select */
function report(){
 var canReport=!!S.user&&(S.user.role==="driver"||isDashboardRole()||mExtra("driver"));
 var opts=(S.vehicles||[]).map(function(v){var label=vehicleDisplayName(v)||("Pilot-Fahrzeug · "+mt("manualVehicle"));return '<option value="'+label+'">'+label+'</option>'}).join("");
 var form=canReport?'<section class="card"><h2>'+t("reportDamage")+'</h2><p class="muted">'+mt('aiDamageInfo')+'</p><select id="dVehicle">'+opts+'</select><section class="manualVehicleBox"><h3>'+mt("manualVehicle")+'</h3><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button type="button" class="secondary" onclick="saveManualVehicle()">'+mt("useManualVehicle")+'</button></section><input id="dPosition" placeholder="'+t("position")+'"><textarea id="dDesc" placeholder="'+t("description")+'"></textarea><input id="dPhoto" type="file" accept="image/*"><button onclick="saveDamage()">'+t("save")+'</button></section>':"";
 return shell(form+damageList());
}
function saveDamage(){
 var manual=getManualVehicleText();
 var v=manual?saveManualVehicle():null;
 var vehicle=manual?(vehicleDisplayName(v)||v.manualText):((document.getElementById("dVehicle")&&document.getElementById("dVehicle").value)||"");
 var pos=(document.getElementById("dPosition")&&document.getElementById("dPosition").value)||"",desc=(document.getElementById("dDesc")&&document.getElementById("dDesc").value)||"",file=document.getElementById("dPhoto"),photo=file&&file.files&&file.files[0]?file.files[0].name:"";
 if(!vehicle||!pos||!desc){alert(t("required"));return}
 var recommended=aiDamageScoreByInput(pos,desc,photo);
 var damage={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicle:vehicle,position:pos,description:desc,photo:photo,status:"open",workshop:true,aiTrainingLinked:true,source:"driverReport",aiRecommendation:recommended,aiSeverity:aiDamageClassByScore(recommended),aiApprovalStatus:"pending",pointsApplied:false,created:new Date().toLocaleString()};
 S.damages=S.damages||[];S.damages.unshift(damage);
 S.aiTraining=S.aiTraining||[];S.aiTraining.unshift({id:damage.id,file:photo,damageClass:pos,severity:damage.aiSeverity,points:recommended,linkedDamageId:damage.id,approvalStatus:"pending",date:new Date().toLocaleString()});
 if(typeof createWorkOrderFromDamage==="function")createWorkOrderFromDamage(damage);
 saveAll();alert(mt('damageSavedPending'));render();
}

/* Fahrzeughistorie/Fahrzeugakte zeigt manuelle Fahrzeuge korrekt */
function vehicleHistoryPage(){
 var vehicles=S.vehicles||[];
 var selected=Number((document.getElementById("histVehicle")||{}).value||((vehicles[0]||{}).id||0));
 var v=vehicles.find(function(x){return Number(x.id)===selected})||vehicles[0]||{};
 var display=vehicleDisplayName(v)||(v.manualText||"");
 var damages=(S.damages||[]).filter(function(d){return (d.vehicle||"").indexOf(v.plate)>=0||(d.vehicle||"").indexOf(v.name)>=0||(d.vehicle||"")===display});
 var orders=(S.workOrders||[]).filter(function(o){return Number(o.vehicleId)===Number(v.id)||(o.vehicle||"").indexOf(v.plate)>=0});
 var maint=(S.maintenance||[]).filter(function(m){return Number(m.vehicle)===Number(v.id)||Number(m.vehicleId)===Number(v.id)});
 return shell('<h1 class="sectionTitle">'+mt('vehicleHistory')+'</h1><section class="card"><select id="histVehicle" onchange="render()">'+vehicles.map(function(x){var label=vehicleDisplayName(x)||(x.manualText||mt("manualVehicle"));return '<option value="'+x.id+'" '+(Number(x.id)===Number(v.id)?'selected':'')+'>'+label+'</option>'}).join("")+'</select><section class="manualVehicleBox"><h3>'+mt("manualVehicle")+'</h3><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button type="button" class="secondary" onclick="saveManualVehicle()">'+mt("useManualVehicle")+'</button></section><button onclick="openVehicleFilePdf('+v.id+')">'+mt('vehicleFilePdf')+'</button></section><section class="card"><h2>'+mt('completeVehicleFile')+'</h2><p><b>'+display+'</b></p><p>'+mt('huTuv')+': '+(v.hu||v.tuv||'-')+' · '+mt('spCheck')+': '+(v.sp||'-')+' · '+mt('tachoCheck')+': '+(v.tacho||'-')+'</p><h3>'+mt('allDamagesList')+'</h3>'+(damages.map(function(d){return '<p>⚠ '+(d.position||'')+' · '+(d.description||'')+' · '+(d.created||'')+'</p>'}).join("")||'<p class="muted">'+t('noReports')+'</p>')+'<h3>'+mt('workOrders')+'</h3>'+(orders.map(function(o){return '<p>🔧 '+o.title+' · '+mt('status')+': '+mt('status'+o.status.charAt(0).toUpperCase()+o.status.slice(1))+'</p>'}).join("")||'<p class="muted">'+mt('noOrders')+'</p>')+'<h3>'+t('maintenancePlanner')+'</h3>'+(maint.map(function(m){return '<p>🛠 '+(m.type||'')+' · '+(m.date||'')+'</p>'}).join("")||'<p class="muted">-</p>')+'</section>');
}


/* === V18.9 NO TEXT SELECTION / APP CURSOR FIX === */
function fcIsEditableElement(el){
 if(!el)return false;
 var tag=(el.tagName||"").toLowerCase();
 return tag==="input"||tag==="textarea"||tag==="select"||el.isContentEditable;
}
document.addEventListener("selectstart",function(e){
 if(!fcIsEditableElement(e.target))e.preventDefault();
},true);
document.addEventListener("dragstart",function(e){
 if(!fcIsEditableElement(e.target))e.preventDefault();
},true);
document.addEventListener("mousedown",function(e){
 if(!fcIsEditableElement(e.target)&&e.detail>1)e.preventDefault();
},true);
document.addEventListener("touchstart",function(e){
 if(!fcIsEditableElement(e.target))document.documentElement.classList.add("fcNoSelectActive");
},true);


/* === FLEET CONTROL MASTER V18.10 FINAL CONSOLIDATION SAFE === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var base={
  de:{
   driverFile:"Fahrerakte",driverFiles:"Fahrerakten",openDriverFile:"Fahrerakte öffnen",personalData:"Stammdaten",employeeNo:"Personalnummer",phone:"Telefon",email:"E-Mail",location:"Standort",entryDate:"Eintrittsdatum",department:"Abteilung",
   licenseManagement:"Führerscheinverwaltung",licenseClasses:"Führerscheinklassen",lastLicenseCheck:"Letzte Kontrolle",nextLicenseCheck:"Nächste Prüfung",valid:"Gültig",expiresSoon:"Läuft bald ab",expired:"Abgelaufen",
   vehicleAssignment:"Fahrzeugzuordnung",currentVehicle:"Aktuelles Fahrzeug",assignmentDate:"Datum der Zuweisung",vehicleHistory:"Fahrzeughistorie",
   qualifications:"Schulungen & Qualifikationen",adr:"ADR",loadSecuring:"Ladungssicherung",firstAid:"Erste Hilfe",driverCard:"Fahrerkarte",tachographTraining:"Tachoschulung",activityStatus:"Status & Aktivität",lastLogin:"Letzte Anmeldung",lastActivity:"Letzte Aktivität",
   createVehicleFile:"Fahrzeugakte anlegen",editVehicleFile:"Fahrzeugakte bearbeiten",saveVehicleFile:"Fahrzeugakte speichern",vehicleModel:"Fahrzeug / Modell",licensePlate:"Kennzeichen",vin:"FIN / Fahrgestellnummer",mileage:"Kilometerstand",firstRegistration:"Erstzulassung",insurance:"Versicherung",nextService:"Nächste Wartung",tireCheck:"Reifenprüfung",brakeCheck:"Bremsenprüfung",oilService:"Ölservice",vehicleFileSaved:"Fahrzeugakte gespeichert",selectVehicleOrCreate:"Fahrzeug auswählen oder neue Fahrzeugakte anlegen",
   documentFolderClean:"Dokumentenmappe",addDocumentClean:"Dokument hinzufügen",documentNameClean:"Dokumentname",documentTypeClean:"Dokumentart",documentFileClean:"Dokumentdatei",documentForPlate:"Dokument für Kennzeichen/Fahrzeug",documentSavedClean:"Dokument gespeichert",noDocumentsClean:"Keine Dokumente vorhanden",driverVehicleDocs:"Dokumente zu deinem Fahrzeug",plateLinkInfo:"Dokumente erscheinen automatisch bei dem Fahrer, der dieses Kennzeichen auswählt.",linkedPlate:"Verknüpftes Kennzeichen",
   reportDamageClean:"Schaden melden",reportDamageHintClean:"Foto hochladen, Schaden beschreiben. Die KI erstellt automatisch eine Punkteempfehlung.",positionClean:"Position",descriptionClean:"Beschreibung",chooseFileClean:"Datei auswählen",saveClean:"Speichern",damageReportsClean:"Schadensmeldungen",manualVehicleClean:"Fahrzeug / Kennzeichen manuell eintragen",useManualVehicleClean:"Manuelles Fahrzeug verwenden",
   scanLicense:"Führerschein einscannen",licensePdfArchive:"Führerscheine PDF-Archiv",licensePdfs:"Führerscheine",licenseScan:"Führerschein-Scan",licenseFile:"Führerschein-Datei",licenseValidUntil:"Führerschein gültig bis",saveLicensePdf:"Führerschein als PDF speichern",licensePdfSaved:"Führerschein-PDF gespeichert",noLicensePdfs:"Noch keine Führerschein-PDFs vorhanden",
   startOrder:"Auftrag starten",finishOrder:"Auftrag fertigstellen",approveOrder:"Auftrag freigeben",unlockOrder:"Auftrag entsperren",lockOrder:"Auftrag sperren",orderLocked:"Auftrag ist gesperrt",workResult:"Arbeitsergebnis",usedParts:"Verwendete Ersatzteile",workshopComment:"Werkstatt-Kommentar",saveProgress:"Fortschritt speichern",approved:"Freigegeben",inProgress:"In Bearbeitung",waitingParts:"Warten auf Ersatzteile",done:"Fertig",open:"Offen",orderSaved:"Arbeitsauftrag gespeichert",orderApproved:"Arbeitsauftrag freigegeben",orderFinished:"Arbeitsauftrag fertiggestellt",orderStarted:"Arbeitsauftrag gestartet",noOpenWorkshopOrders:"Keine offenen Werkstattaufträge",
   pdfArchiveMain:"PDF-Archiv",departurePdfs:"Abfahrtskontrollen",workshopPdfs:"Werkstatt",licenseFolder:"Führerscheine",departurePdfArchive:"Abfahrtskontrollen PDF-Archiv",workshopPdfArchive:"Werkstatt PDF-Archiv",archiveCategory:"Kategorie",viewPdf:"PDF ansehen",
   notAllowed:"Keine Berechtigung",required:"Bitte alle Pflichtfelder ausfüllen.",manualVehicle:"Fahrzeug / Kennzeichen manuell eintragen",manualVehicleHint:"Falls kein Fahrzeug vorhanden ist oder das Kennzeichen fehlt, hier Fahrzeug und Kennzeichen eintragen.",manualVehicleSaved:"Fahrzeug/Kennzeichen gespeichert",vehicleRequired:"Bitte Fahrzeug auswählen oder Fahrzeug/Kennzeichen manuell eintragen."
  },
  en:{
   driverFile:"Driver file",driverFiles:"Driver files",openDriverFile:"Open driver file",personalData:"Personal data",employeeNo:"Employee no.",phone:"Phone",email:"Email",location:"Location",entryDate:"Entry date",department:"Department",
   licenseManagement:"License management",licenseClasses:"License classes",lastLicenseCheck:"Last check",nextLicenseCheck:"Next check",valid:"Valid",expiresSoon:"Expires soon",expired:"Expired",
   vehicleAssignment:"Vehicle assignment",currentVehicle:"Current vehicle",assignmentDate:"Assignment date",vehicleHistory:"Vehicle history",
   qualifications:"Training & qualifications",adr:"ADR",loadSecuring:"Load securing",firstAid:"First aid",driverCard:"Driver card",tachographTraining:"Tachograph training",activityStatus:"Status & activity",lastLogin:"Last login",lastActivity:"Last activity",
   createVehicleFile:"Create vehicle file",editVehicleFile:"Edit vehicle file",saveVehicleFile:"Save vehicle file",vehicleModel:"Vehicle / model",licensePlate:"License plate",vin:"VIN",mileage:"Mileage",firstRegistration:"First registration",insurance:"Insurance",nextService:"Next service",tireCheck:"Tire check",brakeCheck:"Brake check",oilService:"Oil service",vehicleFileSaved:"Vehicle file saved",selectVehicleOrCreate:"Select vehicle or create vehicle file",
   documentFolderClean:"Document folder",addDocumentClean:"Add document",documentNameClean:"Document name",documentTypeClean:"Document type",documentFileClean:"Document file",documentForPlate:"Document for plate/vehicle",documentSavedClean:"Document saved",noDocumentsClean:"No documents available",driverVehicleDocs:"Documents for your vehicle",plateLinkInfo:"Documents automatically appear for the driver who selects this license plate.",linkedPlate:"Linked plate",
   reportDamageClean:"Report damage",reportDamageHintClean:"Upload a photo and describe the damage. The AI automatically creates a points recommendation.",positionClean:"Position",descriptionClean:"Description",chooseFileClean:"Choose file",saveClean:"Save",damageReportsClean:"Damage reports",manualVehicleClean:"Enter vehicle / license plate manually",useManualVehicleClean:"Use manual vehicle",
   scanLicense:"Scan driving license",licensePdfArchive:"Driving license PDF archive",licensePdfs:"Driving licenses",licenseScan:"Driving license scan",licenseFile:"Driving license file",licenseValidUntil:"License valid until",saveLicensePdf:"Save license as PDF",licensePdfSaved:"Driving license PDF saved",noLicensePdfs:"No driving license PDFs yet",
   startOrder:"Start order",finishOrder:"Finish order",approveOrder:"Approve order",unlockOrder:"Unlock order",lockOrder:"Lock order",orderLocked:"Order is locked",workResult:"Work result",usedParts:"Used parts",workshopComment:"Workshop comment",saveProgress:"Save progress",approved:"Approved",inProgress:"In progress",waitingParts:"Waiting for parts",done:"Done",open:"Open",orderSaved:"Work order saved",orderApproved:"Work order approved",orderFinished:"Work order finished",orderStarted:"Work order started",noOpenWorkshopOrders:"No open workshop orders",
   pdfArchiveMain:"PDF archive",departurePdfs:"Departure checks",workshopPdfs:"Workshop",licenseFolder:"Driving licenses",departurePdfArchive:"Departure checks PDF archive",workshopPdfArchive:"Workshop PDF archive",archiveCategory:"Category",viewPdf:"View PDF",
   notAllowed:"Not authorized",required:"Please complete all required fields.",manualVehicle:"Enter vehicle / plate manually",manualVehicleHint:"If no vehicle exists or the plate is missing, enter vehicle and plate here.",manualVehicleSaved:"Vehicle/plate saved",vehicleRequired:"Please select a vehicle or enter vehicle/plate manually."
  }
 };
 var partial={
  tr:{reportDamageClean:"Hasar bildir",reportDamageHintClean:"Fotoğraf yükleyin ve hasarı açıklayın. Yapay zekâ otomatik puan önerisi oluşturur.",positionClean:"Konum",descriptionClean:"Açıklama",chooseFileClean:"Dosya seç",saveClean:"Kaydet",damageReportsClean:"Hasar bildirimleri",manualVehicleClean:"Araç / plakayı elle gir",useManualVehicleClean:"Manuel aracı kullan"},
  pl:{reportDamageClean:"Zgłoś szkodę",reportDamageHintClean:"Prześlij zdjęcie i opisz szkodę. AI automatycznie utworzy rekomendację punktów.",positionClean:"Pozycja",descriptionClean:"Opis",chooseFileClean:"Wybierz plik",saveClean:"Zapisz",damageReportsClean:"Zgłoszenia szkód",manualVehicleClean:"Wpisz pojazd / numer rejestracyjny ręcznie",useManualVehicleClean:"Użyj pojazdu ręcznego"},
  ro:{reportDamageClean:"Raportează daună",reportDamageHintClean:"Încarcă o fotografie și descrie dauna. AI creează automat o recomandare de puncte.",positionClean:"Poziție",descriptionClean:"Descriere",chooseFileClean:"Alege fișier",saveClean:"Salvează",damageReportsClean:"Rapoarte daune",manualVehicleClean:"Introduceți manual vehiculul / numărul",useManualVehicleClean:"Folosește vehicul manual"},
  ru:{reportDamageClean:"Сообщить о повреждении",reportDamageHintClean:"Загрузите фото и опишите повреждение. ИИ автоматически создаст рекомендацию по баллам.",positionClean:"Позиция",descriptionClean:"Описание",chooseFileClean:"Выбрать файл",saveClean:"Сохранить",damageReportsClean:"Заявки о повреждениях",manualVehicleClean:"Ввести ТС / номер вручную",useManualVehicleClean:"Использовать ручной ввод"},
  uk:{reportDamageClean:"Повідомити про пошкодження",reportDamageHintClean:"Завантажте фото й опишіть пошкодження. ШІ автоматично створить рекомендацію балів.",positionClean:"Позиція",descriptionClean:"Опис",chooseFileClean:"Вибрати файл",saveClean:"Зберегти",damageReportsClean:"Звіти про пошкодження",manualVehicleClean:"Ввести авто / номер вручну",useManualVehicleClean:"Використати ручне авто"},
  ar:{reportDamageClean:"الإبلاغ عن ضرر",reportDamageHintClean:"ارفع صورة وصف الضرر. ينشئ الذكاء الاصطناعي توصية نقاط تلقائيًا.",positionClean:"الموضع",descriptionClean:"الوصف",chooseFileClean:"اختر ملفًا",saveClean:"حفظ",damageReportsClean:"بلاغات الأضرار",manualVehicleClean:"إدخال المركبة / اللوحة يدويًا",useManualVehicleClean:"استخدام مركبة يدوية"}
 };
 Object.keys(partial).forEach(function(l){base[l]=Object.assign({},base.en,partial[l])});
 Object.keys(base).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},base[l])});
})();

function normPlate(x){return String(x||"").toUpperCase().replace(/[^A-Z0-9]/g,"");}
function cleanVehicleLabel(v){if(!v)return "";var raw=((v.name||"")+" "+(v.plate||"")).trim()||(v.manualText||"");if(!raw||/bitte kennzeichen|kennzeichen eintragen|pilot-fahrzeug/i.test(raw))return "";return raw;}
function vehicleDocPlate(v){if(!v)return "";var p=(v.plate||"").trim();if(!p||/bitte kennzeichen|kennzeichen eintragen/i.test(p)){var m=(v.manualText||"").trim();if(m){var parts=m.split(/\s+/);p=parts[parts.length-1]||m;}}return p;}
function vehicleDisplayName(v){return cleanVehicleLabel(v)||((v&&v.manualText)||"");}
function isPureDriver(){return !!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||S.user.extraRoles.length===0));}
function isDashboardRole(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")));}
function canAwardPoints(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")));}
function admin(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="developer"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("developer")||mExtra("admin")));}
function work(){return !!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||admin()));}
function canUploadVehicleDocs(){return !!(admin()||isDashboardRole()||isDeputyRole());}

function ensurePdfArchive(){S.pdfArchive=S.pdfArchive||mLoad("fc_v17_pdf_archive",[]);S.workshopPdfArchive=S.workshopPdfArchive||mLoad("fc_v18_workshop_pdf_archive",[]);S.licensePdfArchive=S.licensePdfArchive||mLoad("fc_v18_license_pdf_archive",[]);return S.pdfArchive;}
function savePdfArchives(){localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));localStorage.setItem("fc_v18_workshop_pdf_archive",JSON.stringify(S.workshopPdfArchive||[]));localStorage.setItem("fc_v18_license_pdf_archive",JSON.stringify(S.licensePdfArchive||[]));}
function saveAll(){
 ["users","vehicles","points","damages","inspections","docs","costs","maintenance","licenses","aiTraining"].forEach(function(k){localStorage.setItem("fc_v17_"+(k==="aiTraining"?"ai_training":k),JSON.stringify(S[k]||[]));});
 localStorage.setItem("fc_v17_mail_queue",JSON.stringify(S.mailQueue||[]));localStorage.setItem("fc_v17_pdf_archive",JSON.stringify(S.pdfArchive||[]));localStorage.setItem("fc_v18_workshop_pdf_archive",JSON.stringify(S.workshopPdfArchive||[]));localStorage.setItem("fc_v18_license_pdf_archive",JSON.stringify(S.licensePdfArchive||[]));localStorage.setItem("fc_v18_work_orders",JSON.stringify(S.workOrders||[]));localStorage.setItem("fc_v18_parts_inventory",JSON.stringify(S.partsInventory||[]));localStorage.setItem("fc_v18_workshop_calendar",JSON.stringify(S.workshopAppointments||[]));localStorage.setItem("fc_v18_workshop_notes",JSON.stringify(S.workshopNotes||[]));localStorage.setItem("fc_v17_lang",JSON.stringify(S.lang||"de"));localStorage.setItem("fc_v17_theme",JSON.stringify(S.theme||"dark"));if(S.user)localStorage.setItem("fc_v17_session_user",JSON.stringify({id:S.user.id,login:S.user.login}));if(S.tab)localStorage.setItem("fc_v17_session_tab",JSON.stringify(S.tab));
}
function restoreSession(){masterNormalizeUsers();var sess=mLoad("fc_v17_session_user",null);if(sess&&sess.login&&!S.user){var u=(S.users||[]).find(function(x){return String(x.login||"").toLowerCase()===String(sess.login||"").toLowerCase()||Number(x.id)===Number(sess.id)});if(u)S.user=Object.assign({},u);}S.lang=mLoad("fc_v17_lang",S.lang||"de");S.theme=mLoad("fc_v17_theme",S.theme||"dark");S.tab=mLoad("fc_v17_session_tab",S.tab||"home");}
function logout(){localStorage.removeItem("fc_v17_session_user");localStorage.removeItem("fc_v17_session_tab");mSave("fc_v17_lang",S.lang||"de");S.user=null;S.tab="home";render();}
function go(tab){S.tab=tab;localStorage.setItem("fc_v17_session_tab",JSON.stringify(tab));render();}

/* Vehicle file */
function vehicleFileForm(v){v=v||{};var drivers=(typeof allDrivers==="function"?allDrivers():[]);return `<section class="card vehicleFileForm"><h2>${mt(v.id?'editVehicleFile':'createVehicleFile')}</h2>
<label>${mt('vehicleModel')}<input id="vfName" value="${(v.name&&!/pilot-fahrzeug/i.test(v.name))?v.name:""}" placeholder="MAN TGX 18.480"></label>
<label>${mt('licensePlate')}<input id="vfPlate" value="${(v.plate&&!/bitte kennzeichen/i.test(v.plate))?v.plate:""}" placeholder="DU-MH-123"></label>
<label>${mt('type')}<select id="vfType"><option value="vehicle" ${(v.type||"vehicle")==="vehicle"?"selected":""}>Fahrzeug</option><option value="trailer" ${v.type==="trailer"?"selected":""}>Anhänger</option><option value="combo" ${v.type==="combo"?"selected":""}>Kombination</option></select></label>
<label>${mt('driver')}<select id="vfAssigned"><option value="">${mt('notAssigned')}</option>${drivers.map(function(d){return `<option value="${d.id}" ${Number(v.assigned)===Number(d.id)?"selected":""}>${d.name}</option>`}).join("")}</select></label>
<label>${mt('huTuv')}<input id="vfHu" type="date" value="${v.hu||v.tuv||""}"></label><label>${mt('spCheck')}<input id="vfSp" type="date" value="${v.sp||""}"></label><label>${mt('tachoCheck')}<input id="vfTacho" type="date" value="${v.tacho||""}"></label>
<label>${mt('tireCheck')}<input id="vfTire" type="date" value="${v.tireCheck||""}"></label><label>${mt('brakeCheck')}<input id="vfBrake" type="date" value="${v.brakeCheck||""}"></label><label>${mt('oilService')}<input id="vfOil" type="date" value="${v.oilService||""}"></label><label>${mt('nextService')}<input id="vfService" type="date" value="${v.nextService||""}"></label>
<label>${mt('vin')}<input id="vfVin" value="${v.vin||""}"></label><label>${mt('mileage')}<input id="vfMileage" type="number" value="${v.mileage||""}"></label><label>${mt('firstRegistration')}<input id="vfFirstReg" type="date" value="${v.firstRegistration||""}"></label><label>${mt('insurance')}<input id="vfInsurance" value="${v.insurance||""}"></label>
<textarea id="vfNotes" placeholder="${t('commentOptional')}">${v.notes||""}</textarea><button onclick="saveVehicleFile(${v.id||0})">${mt('saveVehicleFile')}</button></section>`;}
function saveVehicleFile(id){if(!admin()&&!work()&&!isDashboardRole()){alert(mt("notAllowed"));return}var name=((document.getElementById("vfName")||{}).value||"").trim(),plate=((document.getElementById("vfPlate")||{}).value||"").trim();if(!name||!plate){alert(mt("required"));return}S.vehicles=S.vehicles||[];var v=id?S.vehicles.find(function(x){return Number(x.id)===Number(id)}):null;if(!v){v={id:Date.now(),created:new Date().toLocaleString()};S.vehicles.unshift(v)}v.name=name;v.plate=plate;v.type=(document.getElementById("vfType")||{}).value||"vehicle";var a=(document.getElementById("vfAssigned")||{}).value||"";v.assigned=a?Number(a):null;v.hu=(document.getElementById("vfHu")||{}).value||"";v.tuv=v.hu;v.sp=(document.getElementById("vfSp")||{}).value||"";v.tacho=(document.getElementById("vfTacho")||{}).value||"";v.tireCheck=(document.getElementById("vfTire")||{}).value||"";v.brakeCheck=(document.getElementById("vfBrake")||{}).value||"";v.oilService=(document.getElementById("vfOil")||{}).value||"";v.nextService=(document.getElementById("vfService")||{}).value||"";v.vin=(document.getElementById("vfVin")||{}).value||"";v.mileage=(document.getElementById("vfMileage")||{}).value||"";v.firstRegistration=(document.getElementById("vfFirstReg")||{}).value||"";v.insurance=(document.getElementById("vfInsurance")||{}).value||"";v.notes=(document.getElementById("vfNotes")||{}).value||"";v.manual=false;v.manualText="";S.activeVehicle=v.id;saveAll();alert(mt("vehicleFileSaved"));render();}
function vehicleHistoryPage(){var vehicles=S.vehicles||[];var selected=Number((document.getElementById("histVehicle")||{}).value||S.activeVehicle||((vehicles[0]||{}).id||0));var v=vehicles.find(function(x){return Number(x.id)===selected})||null;var label=v?cleanVehicleLabel(v):"";var select=`<section class="card"><h2>${mt('selectVehicleOrCreate')}</h2><select id="histVehicle" onchange="S.activeVehicle=Number(this.value);render()"><option value="">${mt('createVehicleFile')}</option>${vehicles.map(function(x){var l=cleanVehicleLabel(x)||((x.name||"")+" "+(x.plate||"")).trim();return `<option value="${x.id}" ${v&&Number(x.id)===Number(v.id)?"selected":""}>${l}</option>`}).join("")}</select></section>`;var file=v?`<section class="card"><h2>${mt('completeVehicleFile')}</h2><p><b>${label}</b></p><p>${mt('huTuv')}: ${v.hu||v.tuv||'-'} · ${mt('spCheck')}: ${v.sp||'-'} · ${mt('tachoCheck')}: ${v.tacho||'-'}</p><p>${mt('tireCheck')}: ${v.tireCheck||'-'} · ${mt('brakeCheck')}: ${v.brakeCheck||'-'} · ${mt('oilService')}: ${v.oilService||'-'}</p><p>${mt('nextService')}: ${v.nextService||'-'} · ${mt('mileage')}: ${v.mileage||'-'} · ${mt('vin')}: ${v.vin||'-'}</p><p>${mt('firstRegistration')}: ${v.firstRegistration||'-'} · ${mt('insurance')}: ${v.insurance||'-'}</p><button onclick="openVehicleFilePdf(${v.id})">${mt('vehicleFilePdf')}</button></section>`:"";return shell(`<h1 class="sectionTitle">${mt('vehicleHistory')}</h1>${select}${vehicleFileForm(v||{})}${file}`);}

/* Docs */
function currentDriverVehicle(){var id=Number(S.activeVehicle||0);var v=(S.vehicles||[]).find(function(x){return Number(x.id)===id});if(v)return v;return (S.vehicles||[]).find(function(x){return S.user&&Number(x.assigned)===Number(S.user.id)})||null;}
function docsVisibleForCurrentUser(){S.docs=S.docs||[];if(canUploadVehicleDocs()||work())return S.docs;var v=currentDriverVehicle();var plate=normPlate(vehicleDocPlate(v));var labelNorm=normPlate(cleanVehicleLabel(v));return S.docs.filter(function(d){if(Number(d.driver)===Number(S.user&&S.user.id))return true;var dp=normPlate(d.plate||d.vehiclePlate||"");var dv=normPlate(d.vehicle||d.vehicleLabel||"");return !!plate&&(dp===plate||dv.indexOf(plate)>=0||labelNorm.indexOf(dp)>=0);});}
function saveDocument(){if(!canUploadVehicleDocs()){alert(mt("notAllowed"));return}var vehicleId=Number((document.getElementById("docVehicle")||{}).value||0);var v=(S.vehicles||[]).find(function(x){return Number(x.id)===vehicleId})||null;var manual=(document.getElementById("docManualPlate")||{}).value||"";var name=((document.getElementById("docName")||{}).value||"").trim();var type=((document.getElementById("docType")||{}).value||"").trim();var fileEl=document.getElementById("docFile");var file=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";var plate=(v?vehicleDocPlate(v):"")||manual.trim();var vehicleLabel=(v?cleanVehicleLabel(v):manual.trim());if(!plate||!name||!type||!file){alert(mt("required"));return}S.docs=S.docs||[];S.docs.unshift({id:Date.now(),name:name,type:type,file:file,vehicleId:v?v.id:null,vehicle:vehicleLabel,vehicleLabel:vehicleLabel,plate:plate,vehiclePlate:plate,linkedByPlate:true,uploadedBy:S.user?S.user.name:"",created:new Date().toLocaleString()});saveAll();alert(mt("documentSavedClean"));render();}
function documentsPage(){var docs=docsVisibleForCurrentUser();var vehicles=S.vehicles||[];var opts=vehicles.map(function(v){var label=cleanVehicleLabel(v)||((v.name||"")+" "+(v.plate||"")).trim();return `<option value="${v.id}">${label}</option>`}).join("");var form=canUploadVehicleDocs()?`<section class="card"><h2>${mt("addDocumentClean")}</h2><p class="muted">${mt("plateLinkInfo")}</p><label>${mt("documentForPlate")}<select id="docVehicle">${opts}</select></label><label>${mt("manualVehicleClean")}<input id="docManualPlate" placeholder="DU-MH-123"></label><input id="docName" placeholder="${mt("documentNameClean")}"><input id="docType" placeholder="${mt("documentTypeClean")}"><label>${mt("documentFileClean")}<input id="docFile" type="file" accept="image/*,.pdf,.doc,.docx"></label><button onclick="saveDocument()">${mt("saveClean")}</button></section>`:`<section class="card"><h2>${mt("driverVehicleDocs")}</h2><p class="muted">${mt("plateLinkInfo")}</p></section>`;var list=`<section class="card"><h2>${mt("documentFolderClean")}</h2>${docs.map(function(d){return `<div class="row"><span><b>${d.name}</b><br><small class="muted">${mt("documentTypeClean")}: ${d.type||"-"} · ${mt("linkedPlate")}: ${d.plate||d.vehiclePlate||"-"} · ${d.file||"-"}</small></span><span>📄</span></div>`}).join("")||'<p class="muted">'+mt("noDocumentsClean")+'</p>'}</section>`;return shell(`<h1 class="sectionTitle">${mt("documentFolderClean")}</h1>${form}${list}`);}

/* Driver file */
function licenseStatus(date){if(!date)return "—";var d=new Date(date),now=new Date(),soon=new Date();soon.setDate(now.getDate()+60);if(d<now)return "🔴 "+mt("expired");if(d<soon)return "🟡 "+mt("expiresSoon");return "🟢 "+mt("valid");}
function driverFilePage(driverId){var d=(S.users||[]).find(function(u){return Number(u.id)===Number(driverId||S.selectedDriverId||(S.user&&S.user.id))})||S.user;if(!d)return shell('<section class="card">'+mt("noData")+'</section>');if(isPureDriver()&&Number(d.id)!==Number(S.user.id))return shell('<section class="card">'+mt("notAllowed")+'</section>');var vehicle=(S.vehicles||[]).find(function(v){return Number(v.assigned)===Number(d.id)})||{};var plate=vehicleDocPlate(vehicle);var docs=(S.docs||[]).filter(function(x){return Number(x.driver)===Number(d.id)||normPlate(x.plate||x.vehiclePlate)===normPlate(plate)});var lic=(S.licenses||[]).filter(function(x){return Number(x.driver)===Number(d.id)});var pts=(S.points||[]).filter(function(x){return Number(x.driver)===Number(d.id)||Number(x.driverId)===Number(d.id)});var checks=(S.inspections||[]).filter(function(x){return Number(x.driver)===Number(d.id)});var dmg=(S.damages||[]).filter(function(x){return Number(x.driver)===Number(d.id)||(plate&&normPlate(x.vehicle).indexOf(normPlate(plate))>=0)});var lastLic=lic[0]||{};return shell(`<h1 class="sectionTitle">${mt("driverFile")} · ${d.name}</h1><section class="card"><h2>${mt("personalData")}</h2><p><b>${d.name}</b></p><p>${mt("employeeNo")}: ${d.employeeNo||d.id||"-"} · ${mt("phone")}: ${d.phone||"-"} · ${mt("email")}: ${d.email||"-"}</p><p>${mt("location")}: ${d.location||"-"} · ${mt("entryDate")}: ${d.entryDate||"-"} · ${mt("department")}: ${d.department||"-"}</p></section><section class="card"><h2>${mt("licenseManagement")}</h2><p>${mt("licenseClasses")}: ${d.licenseClasses||"B/CE"}</p><p>${mt("licenseValidUntil")}: ${lastLic.validUntil||d.licenseValidUntil||"-"} · ${licenseStatus(lastLic.validUntil||d.licenseValidUntil)}</p></section><section class="card"><h2>${mt("vehicleAssignment")}</h2><p>${mt("currentVehicle")}: ${cleanVehicleLabel(vehicle)||"-"}</p><p>${mt("licensePlate")}: ${plate||"-"}</p></section><section class="card"><h2>${mt("documentFolderClean")}</h2>${docs.map(function(x){return `<p>📄 ${x.name} · ${x.type||"-"} · ${x.file||"-"}</p>`}).join("")||'<p class="muted">'+mt("noDocumentsClean")+'</p>'}</section><section class="card"><h2>${t("points")}</h2><p><b>${pointTotal(d.id)||d.points||0}</b></p>${pts.map(function(x){return `<p>⭐ ${x.points||x.value||0} · ${x.reason||""} · ${x.by||x.givenBy||""}</p>`}).join("")}</section><section class="card"><h2>${mt("departurePdfs")}</h2><p>${checks.length} ${mt("departurePdfs")}</p>${checks.slice(0,10).map(function(x){return `<p>☑ ${x.date||""} · ${x.vehicle||""}</p>`}).join("")}</section><section class="card"><h2>${mt("damageReportsClean")}</h2>${dmg.map(function(x){return `<p>⚠ ${x.position||""} · ${x.description||""} · ${x.vehicle||""}</p>`}).join("")||'<p class="muted">'+t("noReports")+'</p>'}</section><section class="card"><h2>${mt("qualifications")}</h2><p>${mt("adr")} · ${mt("loadSecuring")} · ${mt("firstAid")} · ${mt("driverCard")} · ${mt("tachographTraining")}</p></section><section class="card"><h2>${mt("activityStatus")}</h2><p>${mt("lastLogin")}: ${d.lastLogin||"-"} · ${mt("lastActivity")}: ${d.lastActivity||"-"}</p></section>`);}
function openDriverFile(id){S.selectedDriverId=id;go("driverFile");}
function driversPage(){if(!admin()&&!isDashboardRole())return shell('<section class="card">'+mt("notAllowed")+'</section>');var rows=allDrivers().map(function(d){var v=(S.vehicles||[]).find(function(x){return Number(x.assigned)===Number(d.id)})||{};return `<div class="row driverFileRow" onclick="openDriverFile(${d.id})"><span><b>${d.name}</b><br><small class="muted">${cleanVehicleLabel(v)||"-"} · ${d.email||""}</small></span><button>${mt("openDriverFile")}</button></div>`}).join("");return shell(`<h1 class="sectionTitle">${mt("driverFiles")}</h1><section class="card">${rows||'<p class="muted">'+mt("noData")+'</p>'}</section>`);}

/* Report */
function report(){var canReport=!!S.user&&(S.user.role==="driver"||isDashboardRole()||mExtra("driver"));var opts=(S.vehicles||[]).map(function(v){var label=vehicleDisplayName(v)||(v.manualText||"");if(!label)label=mt("manualVehicleClean");return `<option value="${label}">${label}</option>`}).join("");var form=canReport?`<section class="card"><h2>${mt("reportDamageClean")}</h2><p class="muted">${mt("reportDamageHintClean")}</p><select id="dVehicle">${opts}</select><section class="manualVehicleBox"><h3>${mt("manualVehicleClean")}</h3><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button type="button" class="secondary" onclick="saveManualVehicle()">${mt("useManualVehicleClean")}</button></section><input id="dPosition" placeholder="${mt("positionClean")}"><textarea id="dDesc" placeholder="${mt("descriptionClean")}"></textarea><label class="fileLabel">${mt("chooseFileClean")}<input id="dPhoto" type="file" accept="image/*"></label><button onclick="saveDamage()">${mt("saveClean")}</button></section>`:"";return shell(`<h1 class="sectionTitle">${mt("reportDamageClean")}</h1>${form}${damageListClean()}`);}
function damageListClean(){var list=(S.damages||[]).filter(function(d){return admin()||isDashboardRole()||work()||Number(d.driver)===Number(S.user&&S.user.id)});return `<section class="card"><h2>${mt("damageReportsClean")}</h2>${list.map(function(d){return `<div class="row"><span><b>${d.position||"-"}</b><br><small class="muted">${d.vehicle||"-"} · ${d.description||"-"} · ${d.created||""}</small></span><span>${statusText(d.status)}</span></div>`}).join("")||'<p class="muted">'+t("noReports")+'</p>'}</section>`;}

/* License */
function licensePdfHtml(item){return `<html><head><title>${mt('licenseScan')}</title><style>body{font-family:Arial;padding:24px;color:#111}</style></head><body><h1>${mt('licenseScan')}</h1><p><b>${mt('driver')}:</b> ${item.driverName||'-'}</p><p><b>${mt('licenseValidUntil')}:</b> ${item.validUntil||'-'}</p><p><b>${mt('licenseFile')}:</b> ${item.fileName||'-'}</p><p><b>Datum:</b> ${item.created||'-'}</p></body></html>`;}
function saveLicensePdf(){ensurePdfArchive();var f=document.getElementById("licenseFile");var file=f&&f.files&&f.files[0]?f.files[0].name:"";var valid=(document.getElementById("licenseValidUntil")||{}).value||"";if(!file||!valid){alert(mt("required"));return}var item={id:Date.now(),category:"license",driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",fileName:file,validUntil:valid,created:new Date().toLocaleString()};item.title=mt("licenseScan")+" · "+item.driverName;item.pdfHtml=licensePdfHtml(item);S.licensePdfArchive.unshift(item);S.licenses=S.licenses||[];S.licenses.unshift({id:item.id,driver:item.driver,driverName:item.driverName,file:file,validUntil:valid,pdfArchiveId:item.id,created:item.created});savePdfArchives();saveAll();alert(mt("licensePdfSaved"));render();}
function licensePage(){var own=(S.licenses||[]).filter(function(l){return !S.user||admin()||isDashboardRole()||Number(l.driver)===Number(S.user.id)});return shell(`<h1 class="sectionTitle">${mt("scanLicense")}</h1><section class="card"><h2>${mt("scanLicense")}</h2><label>${mt("licenseValidUntil")}<input id="licenseValidUntil" type="date"></label><label>${mt("licenseFile")}<input id="licenseFile" type="file" accept="image/*,.pdf"></label><button onclick="saveLicensePdf()">${mt("saveLicensePdf")}</button></section><section class="card"><h2>${mt("licensePdfs")}</h2>${own.map(function(l){return `<div class="row"><span><b>${l.driverName||""}</b><br><small class="muted">${l.file||""} · ${mt("licenseValidUntil")}: ${l.validUntil||"-"}</small></span></div>`}).join("")||'<p class="muted">'+mt("noLicensePdfs")+'</p>'}</section>`);}
function openLicenseArchivedPdf(id){ensurePdfArchive();var p=(S.licensePdfArchive||[]).find(function(x){return Number(x.id)===Number(id)});if(!p)return;var w=window.open("", "_blank");if(w&&w.document){w.document.write(p.pdfHtml||"");w.document.close();}}
function deputyPdfArchivePage(){if(!isDeputyRole()&&!admin()&&!work()&&!isDashboardRole())return shell('<section class="card"><h2>'+mt('notAllowed')+'</h2></section>');ensurePdfArchive();var dep=S.pdfArchive||[],ws=S.workshopPdfArchive||[],lic=S.licensePdfArchive||[];return shell(`<h1 class="sectionTitle">${mt('pdfArchiveMain')}</h1><section class="card"><h2>${mt('departurePdfArchive')}</h2>${dep.map(function(p){return `<div class="row"><span><b>${p.title||p.driverName}</b><br><small class="muted">${p.vehicle||''} · ${p.date||p.created}</small></span><button onclick="openArchivedPdf(${p.id})">${mt('viewPdf')}</button></div>`}).join("")||'<p class="muted">'+mt('noPdfReports')+'</p>'}</section><section class="card"><h2>${mt('workshopPdfArchive')}</h2>${ws.map(function(p){return `<div class="row"><span><b>${p.title}</b><br><small class="muted">${p.vehicle||''} · ${p.date||p.created}</small></span><button onclick="openWorkshopArchivedPdf(${p.id})">${mt('viewPdf')}</button></div>`}).join("")||'<p class="muted">'+mt('noWorkshopPdfs')+'</p>'}</section><section class="card"><h2>${mt('licensePdfArchive')}</h2>${lic.map(function(p){return `<div class="row"><span><b>${p.title}</b><br><small class="muted">${p.driverName||''} · ${p.created||''}</small></span><button onclick="openLicenseArchivedPdf(${p.id})">${mt('viewPdf')}</button></div>`}).join("")||'<p class="muted">'+mt('noLicensePdfs')+'</p>'}</section>`);}

/* Workshop orders */
function woStatusLabel(st){var map={open:"open",progress:"inProgress",parts:"waitingParts",done:"done",approved:"approved"};return mt(map[st]||"open");}
function canWorkshopApproveOrder(){return !!(admin()||isDashboardRole()||isDeputyRole());}
function setWorkOrderStatus(id,status){workshopDataInit();var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(!o)return;if(o.locked&&status!=="approved"&&!canWorkshopApproveOrder()){alert(mt("orderLocked"));return}o.status=status;if(status==="progress"&&!o.startedAt)o.startedAt=new Date().toLocaleString();if(status==="done"){o.finishedAt=new Date().toLocaleString();o.doneBy=S.user?S.user.name:"";}if(status==="approved"){o.approvedAt=new Date().toLocaleString();o.approvedBy=S.user?S.user.name:"";o.managementApproved=true;}workshopSave();render();}
function startWorkOrder(id){setWorkOrderStatus(id,"progress");}
function finishWorkOrder(id){setWorkOrderStatus(id,"done");}
function approveWorkshopOrder(id){if(!canWorkshopApproveOrder()){alert(mt("notAllowed"));return}setWorkOrderStatus(id,"approved");}
function lockWorkshopOrder(id){if(!canWorkshopApproveOrder()){alert(mt("notAllowed"));return}workshopDataInit();var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(!o)return;o.locked=!o.locked;workshopSave();render();}
function saveWorkOrderProgress(id){workshopDataInit();var o=(S.workOrders||[]).find(function(x){return Number(x.id)===Number(id)});if(!o)return;var comment=document.getElementById("woComment"+id),result=document.getElementById("woResult"+id),parts=document.getElementById("woUsedParts"+id),hours=document.getElementById("woLabor"+id);o.workshopComments=o.workshopComments||[];if(comment&&comment.value.trim())o.workshopComments.unshift({by:S.user?S.user.name:"",text:comment.value.trim(),date:new Date().toLocaleString()});if(result)o.workResult=result.value;if(parts)o.usedParts=parts.value;if(hours)o.laborHours=hours.value;workshopSave();render();}
function workOrderCard(o){return `<div class="workItem woCard ${o.locked?'locked':''}"><div><b>${o.title}</b><small>${o.vehicle||''} · ${mt('status')}: ${woStatusLabel(o.status||"open")} · ${mt('mechanic')}: ${o.mechanic||'-'}</small><div class="woEdit"><textarea id="woComment${o.id}" placeholder="${mt("workshopComment")}"></textarea><textarea id="woResult${o.id}" placeholder="${mt("workResult")}">${o.workResult||""}</textarea><input id="woUsedParts${o.id}" placeholder="${mt("usedParts")}" value="${o.usedParts||o.parts||""}"><input id="woLabor${o.id}" type="number" step="0.25" placeholder="${mt("laborHours")}" value="${o.laborHours||""}"><button class="secondary" onclick="saveWorkOrderProgress(${o.id})">💾 ${mt("saveProgress")}</button></div></div><div class="woActions">${(work()||admin())&&o.status==="open"?`<button onclick="startWorkOrder(${o.id})">▶ ${mt("startOrder")}</button>`:""}${(work()||admin())&&(o.status==="open"||o.status==="progress"||o.status==="parts")?`<button onclick="finishWorkOrder(${o.id})">✅ ${mt("finishOrder")}</button>`:""}${canWorkshopApproveOrder()?`<button onclick="approveWorkshopOrder(${o.id})">✅ ${mt("approveOrder")}</button><button class="secondary" onclick="lockWorkshopOrder(${o.id})">${o.locked?'🔓 '+mt("unlockOrder"):'🔒 '+mt("lockOrder")}</button>`:""}<button class="secondary" onclick="archiveWorkOrderPdf(${o.id})">PDF</button></div></div>`;}
function workOrdersPage(){workshopDataInit();var form=(work()||admin())?`<section class="card"><h2>${mt('newWorkOrder')}</h2><select id="woVehicle">${workVehiclesOptions()}</select><input id="woTitle" placeholder="${mt('orderTitle')}"><textarea id="woDesc" placeholder="${t('description')}"></textarea><select id="woPriority">${priorityOptions("medium")}</select><input id="woMechanic" placeholder="${mt('assignedMechanic')}"><input id="woParts" placeholder="${mt('parts')}"><input id="woHours" type="number" step="0.25" placeholder="${mt('laborHours')}"><textarea id="woSign" placeholder="${mt('mechanicSignature')}"></textarea><button onclick="addWorkOrder()">${mt('createOrder')}</button></section>`:"";var open=(S.workOrders||[]).filter(function(o){return o.status!=="approved"}),done=(S.workOrders||[]).filter(function(o){return o.status==="approved"});return shell(`<h1 class="sectionTitle">${mt('workOrders')}</h1>${form}<section class="card"><h2>${mt('openOrders')}</h2>${open.map(workOrderCard).join("")||'<p class="muted">'+mt('noOpenWorkshopOrders')+'</p>'}</section><section class="card"><h2>${mt('approved')}</h2>${done.map(workOrderCard).join("")||'<p class="muted">-</p>'}</section>`);}

/* Driver clock */
function driverTimeBox(){var c=typeof getCurrentDateTime==="function"?getCurrentDateTime():{date:new Date().toLocaleDateString("de-DE"),time:new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})};return `<div class="dashClock driverClock"><small>${c.date}</small><b>${c.time} Uhr</b></div>`;}
function driverHome(){var mine=(S.vehicles||[]).filter(function(v){return !v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});var cards=mine.map(function(v){var label=vehicleDisplayName(v)||(v.manualText||"Pilot-Fahrzeug");var plate=(v.plate&&!/bitte kennzeichen/i.test(v.plate))?v.plate:(mt("manualVehicle")||"Manuell");return `<div class="vehicleCard ${S.activeVehicle===v.id?'selected':''}" onclick="S.activeVehicle=${v.id};saveAll();render()"><span>🚚</span><b>${label}</b><small>${plate}</small></div>`}).join("");return shell(`<section class="rolePhone driverDashboardV15"><div class="driverHero"><div class="phoneGreeting"><span>${t("goodMorning")}</span><h1>${S.user?S.user.name.split(" ")[0]:""} 👋</h1></div>${driverTimeBox()}</div><div class="driverGridCards"><div class="driverDashCard" onclick="go('check')"><h3>${t("departureCheck")}</h3><b>✅</b></div><div class="driverDashCard" onclick="go('points')"><h3>${t("points")}</h3><b>${pointTotal(S.user&&S.user.id)||0}</b></div><div class="driverDashCard" onclick="go('report')"><h3>${mt("reportDamageClean")}</h3><b>⚠</b></div><div class="driverDashCard" onclick="go('license')"><h3>${mt("scanLicense")}</h3><b>🪪</b></div></div><h3>${t("myVehicle")}</h3><div class="vehicleSelectGrid">${cards}</div><section class="card manualVehicleBox"><h2>${mt("manualVehicle")}</h2><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button onclick="saveManualVehicle()">${mt("useManualVehicleClean")}</button></section></section>`);}

/* Management dashboard safe */
function exactManagementDashboard(){
 var drivers=allDrivers(),vehicles=S.vehicles||[],open=(S.damages||[]).filter(function(d){return d.status!=="done"}).length;
 var ws=typeof workshopInsightStats==="function"?workshopInsightStats():{open:0,vehicles:0,costs:0,missing:0};
 var name=(S.user&&S.user.name?S.user.name.split(" ")[0]:"");
 var current=getCurrentDateTime();
 var rows=drivers.slice(0,5).map(function(d){return `<div class="dashListRow driverFileRow" onclick="openDriverFile(${d.id})"><span class="dashAvatar">👤</span><span><b>${d.name}</b></span>${dashStatus(d)}<span class="dashPoint">${pointTotal(d.id)||d.points||0}</span></div>`}).join("");
 return shell(`<section class="exactDash"><div class="dashHero"><div><h1>${mt('goodMorning')}<br>${name}!</h1><p>${mt('fleetOverview')}</p></div><div class="dashClock"><small>${current.date}</small><b>${current.time} Uhr</b></div></div><div class="dashKpis"><div class="dashKpi"><span>${mt('driversTotal')}</span><div><i>👥</i><b>${drivers.length}</b></div></div><div class="dashKpi"><span>${mt('vehiclesTotal')}</span><div><i>🚚</i><b>${vehicles.length}</b></div></div><div class="dashKpi"><span>${mt('openDamages')}</span><div><i>⚠</i><b>${open}</b></div></div><div class="dashKpi"><span>${mt("openWorkshopOrders")}</span><div><i>🔧</i><b>${ws.open}</b></div></div></div><div class="dashGridTwo"><section class="dashPanel"><h2>${mt('driverStatus')} <button onclick="go('drivers')">${mt('showAll')} →</button></h2>${rows}<button class="dashLink" onclick="go('drivers')">${mt('showAllDrivers')} →</button></section><section class="dashPanel"><h2>${mt("workshopInsight")} <button onclick="go('workshopInsight')">${mt('showAll')} →</button></h2><div class="dashMetricLine"><span>🔧</span><span>${mt("openWorkshopOrders")}</span><b>${ws.open}</b></div><div class="dashMetricLine"><span>🚛</span><span>${mt("vehiclesInRepair")}</span><b>${ws.vehicles}</b></div><div class="dashMetricLine"><span>💶</span><span>${mt("workshopMonthCosts")}</span><b>${Number(ws.costs||0).toFixed(0)} €</b></div></section></div></section>`);
}

/* Shell, more, render */
function shell(content){var nav;if(dev())nav=[["home","⌂",t("home")],["fleetlive","▦",t("system")],["notifications","◷",t("notifications")],["more","☰",t("more")]];else if(S.user&&S.user.role==="workshop")nav=[["home","⌂",t("home")],["workOrders","🔧",mt("workOrders")],["parts","📦",mt("partsInventory")],["more","☰",t("more")]];else if(isDashboardRole())nav=[["home","⌂",t("home")],["workshopInsight","🔧",mt("workshopInsight")],["report","⚠",mt("reportDamageClean")],["more","☰",t("more")]];else nav=[["home","⌂",t("home")],["check","☑",t("departureCheck")],["report","⚠",mt("reportDamageClean")],["more","☰",t("more")]];return topbar()+`<main class="app ziel-app">${S.tab!=="home"?'<button class="secondary backBtn" onclick="back()">← '+t("back")+'</button>':''}${content}</main><nav class="nav ziel-nav" style="grid-template-columns:repeat(${nav.length},1fr)">${nav.map(function(n){return `<button class="${S.tab===n[0]?'active':''}" onclick="go('${n[0]}')"><span class="navIcon">${n[1]}</span>${n[2]}</button>`}).join("")}</nav>`;}
function more(){var buttons='';buttons+=`<button onclick="go('license')">🪪 ${mt("scanLicense")} <span>›</span></button>`;buttons+=`<button onclick="go('documents')">📂 ${mt("documentFolderClean")} <span>›</span></button>`;if(admin()||isDashboardRole())buttons+=`<button onclick="go('drivers')">👤 ${mt("driverFiles")} <span>›</span></button>`;if(typeof canSeeWorkshopInsight==="function"&&canSeeWorkshopInsight())buttons+=`<button onclick="go('workshopInsight')">🔧 ${mt("workshopInsight")} <span>›</span></button>`;if(admin()||work())buttons+=`<button onclick="go('vehicleHistory')">📁 ${mt("vehicleHistory")} <span>›</span></button><button onclick="go('workOrders')">🔧 ${mt("workOrders")} <span>›</span></button><button onclick="go('parts')">📦 ${mt("partsInventory")} <span>›</span></button>`;if(isDeputyRole()||admin()||work()||isDashboardRole())buttons+=`<button onclick="go('pdfArchive')">📄 ${mt("pdfArchiveMain")} <span>›</span></button>`;return shell(`<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>${t("settings")}</span></div><h2>${t("settings")}</h2><label>${t("language")}<select onchange="setLang(this.value)">${LANG.map(function(l){return `<option value="${l[0]}" ${S.lang===l[0]?"selected":""}>${l[1]}</option>`}).join("")}</select></label><div class="settingsList">${buttons}</div><button class="logoutAction" onclick="logout()">↩ ${t("logout")}</button></section>`);}
function render(){restoreSession();masterNormalizeUsers();if(typeof workshopDataInit==="function")workshopDataInit();ensurePdfArchive();document.body.classList.toggle("dark",S.theme==="dark");var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workshopCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workCostsPage,workshopInsight:managementWorkshopInsightPage,driverFile:function(){return driverFilePage(S.selectedDriverId)},drivers:driversPage};var root=document.getElementById("root");if(!S.user){root.innerHTML=loginView();return}root.innerHTML=(routes[S.tab]||home)();setTimeout(function(){if(S.tab==="check")initSig()},50);}
ensurePdfArchive();


/* === V18.10 FALLBACK PAGES FOR FINAL BUILD === */
if(typeof workCostsPage!=="function"){function workCostsPage(){return shell('<h1 class="sectionTitle">'+mt("workshopCosts")+'</h1><section class="card"><p class="muted">'+(mt("noData")||"-")+'</p></section>');}}
if(typeof workCalendarPage!=="function"){function workCalendarPage(){return shell('<h1 class="sectionTitle">'+mt("workshopCalendar")+'</h1><section class="card"><p class="muted">'+(mt("noData")||"-")+'</p></section>');}}
if(typeof partsPage!=="function"){function partsPage(){return shell('<h1 class="sectionTitle">'+mt("partsInventory")+'</h1><section class="card"><p class="muted">'+(mt("noData")||"-")+'</p></section>');}}
if(typeof managementWorkshopInsightPage!=="function"){function managementWorkshopInsightPage(){return shell('<h1 class="sectionTitle">'+mt("workshopInsight")+'</h1><section class="card"><p class="muted">'+(mt("noData")||"-")+'</p></section>');}}
if(typeof workshopInsightStats!=="function"){function workshopInsightStats(){return {open:(S.workOrders||[]).filter(function(o){return o.status!=="approved"}).length,vehicles:0,costs:0,missing:0};}}
if(typeof vehicleHistoryPage!=="function"){function vehicleHistoryPage(){return shell('<h1 class="sectionTitle">'+mt("vehicleHistory")+'</h1><section class="card"><p class="muted">'+(mt("noData")||"-")+'</p></section>');}}
if(typeof archiveWorkOrderPdf!=="function"){function archiveWorkOrderPdf(id){alert("PDF");}}


/* === V18.10 ROBUST DOCUMENT VISIBILITY PATCH === */
function docsVisibleForCurrentUser(){
 S.docs=S.docs||[];
 if(canUploadVehicleDocs()||work())return S.docs;
 var v=currentDriverVehicle();
 var activeId=Number(S.activeVehicle||((v||{}).id)||0);
 var plate=normPlate(vehicleDocPlate(v));
 var labelNorm=normPlate(cleanVehicleLabel(v));
 return S.docs.filter(function(d){
   if(Number(d.driver)===Number(S.user&&S.user.id))return true;
   if(activeId && Number(d.vehicleId)===activeId)return true;
   var dp=normPlate(d.plate||d.vehiclePlate||"");
   var dv=normPlate(d.vehicle||d.vehicleLabel||"");
   if(plate && (dp===plate || dv.indexOf(plate)>=0 || labelNorm.indexOf(dp)>=0))return true;
   return false;
 });
}


/* === V18.10 SESSION TAB FIX FINAL === */
var FC_SESSION_TAB_RESTORED=false;
function restoreSession(){
 masterNormalizeUsers();
 var sess=mLoad("fc_v17_session_user",null);
 if(sess&&sess.login&&!S.user){
  var u=(S.users||[]).find(function(x){return String(x.login||"").toLowerCase()===String(sess.login||"").toLowerCase()||Number(x.id)===Number(sess.id)});
  if(u)S.user=Object.assign({},u);
 }
 S.lang=mLoad("fc_v17_lang",S.lang||"de");
 S.theme=mLoad("fc_v17_theme",S.theme||"dark");
 if(!FC_SESSION_TAB_RESTORED){
   S.tab=S.tab||mLoad("fc_v17_session_tab","home");
   FC_SESSION_TAB_RESTORED=true;
 }
}
function go(tab){
 S.tab=tab;
 FC_SESSION_TAB_RESTORED=true;
 localStorage.setItem("fc_v17_session_tab",JSON.stringify(tab));
 render();
}


/* === V18.10 DRIVER DASHBOARD LAYOUT FIX === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var p={
  de:{driverGreeting:"Guten Morgen",myVehicleClean:"Mein Fahrzeug",driverStatusClean:"Mein Status",controlDoneClean:"Kontrolle starten",pointsClean:"Punkte",safetyHintClean:"Sicherheit geht vor",noVehicleSelected:"Noch kein Fahrzeug ausgewählt"},
  en:{driverGreeting:"Good morning",myVehicleClean:"My vehicle",driverStatusClean:"My status",controlDoneClean:"Start check",pointsClean:"Points",safetyHintClean:"Safety first",noVehicleSelected:"No vehicle selected yet"},
  tr:{driverGreeting:"Günaydın",myVehicleClean:"Aracım",driverStatusClean:"Durumum",controlDoneClean:"Kontrolü başlat",pointsClean:"Puanlar",safetyHintClean:"Önce güvenlik",noVehicleSelected:"Henüz araç seçilmedi"},
  pl:{driverGreeting:"Dzień dobry",myVehicleClean:"Mój pojazd",driverStatusClean:"Mój status",controlDoneClean:"Rozpocznij kontrolę",pointsClean:"Punkty",safetyHintClean:"Bezpieczeństwo przede wszystkim",noVehicleSelected:"Nie wybrano pojazdu"},
  ro:{driverGreeting:"Bună dimineața",myVehicleClean:"Vehiculul meu",driverStatusClean:"Statusul meu",controlDoneClean:"Începe controlul",pointsClean:"Puncte",safetyHintClean:"Siguranța înainte de toate",noVehicleSelected:"Niciun vehicul selectat"},
  ru:{driverGreeting:"Доброе утро",myVehicleClean:"Мой автомобиль",driverStatusClean:"Мой статус",controlDoneClean:"Начать проверку",pointsClean:"Баллы",safetyHintClean:"Безопасность прежде всего",noVehicleSelected:"Автомобиль не выбран"},
  uk:{driverGreeting:"Доброго ранку",myVehicleClean:"Мій автомобіль",driverStatusClean:"Мій статус",controlDoneClean:"Почати перевірку",pointsClean:"Бали",safetyHintClean:"Безпека понад усе",noVehicleSelected:"Авто не вибрано"},
  ar:{driverGreeting:"صباح الخير",myVehicleClean:"مركبتي",driverStatusClean:"حالتي",controlDoneClean:"بدء الفحص",pointsClean:"النقاط",safetyHintClean:"السلامة أولاً",noVehicleSelected:"لم يتم اختيار مركبة"}
 };
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();
function safeVehicleLabel(v){
 if(!v)return "";
 var name=(v.name||"").trim(), plate=(v.plate||"").trim(), manual=(v.manualText||"").trim();
 if(/bitte kennzeichen|kennzeichen eintragen/i.test(name))name="";
 if(/bitte kennzeichen|kennzeichen eintragen/i.test(plate))plate="";
 var label="";
 if(name&&plate&&name.indexOf(plate)<0)label=name+" · "+plate;
 else label=name||plate||manual;
 return label.replace(/(\b[A-Z]{1,3}-[A-Z]{1,3}-\d{1,4}\b)(?=\1)/g,"$1").trim();
}
function driverTimeBox(){
 var c=typeof getCurrentDateTime==="function"?getCurrentDateTime():{date:new Date().toLocaleDateString("de-DE"),time:new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})};
 return `<div class="driverTimeCard"><small>${c.date}</small><strong>${c.time}</strong><span>Uhr</span></div>`;
}
function driverHome(){
 var mine=(S.vehicles||[]).filter(function(v){return !v.assigned||(S.user&&Number(v.assigned)===Number(S.user.id))});
 var selected=(S.vehicles||[]).find(function(v){return Number(v.id)===Number(S.activeVehicle)}) || mine[0] || null;
 if(selected&&!S.activeVehicle){S.activeVehicle=selected.id;saveAll();}
 var vehicleCards=mine.map(function(v){
   var label=safeVehicleLabel(v)||mt("noVehicleSelected");
   var plate=(v.plate&&!/bitte kennzeichen/i.test(v.plate))?v.plate:"";
   return `<button class="driverVehicleOption ${Number(S.activeVehicle)===Number(v.id)?'selected':''}" onclick="S.activeVehicle=${v.id};saveAll();render()"><span>🚚</span><b>${label}</b>${plate?`<small>${plate}</small>`:""}</button>`;
 }).join("");
 var selectedLabel=safeVehicleLabel(selected)||mt("noVehicleSelected");
 return shell(`
  <section class="driverHomeClean">
   <div class="driverHeaderClean">
    <div><small>${mt("driverGreeting")}</small><h1>${S.user?S.user.name.split(" ")[0]:""} 👋</h1></div>
    ${driverTimeBox()}
   </div>
   <div class="driverActionGrid">
    <button onclick="go('check')"><span>✅</span><b>${t("departureCheck")}</b><small>${mt("controlDoneClean")}</small></button>
    <button onclick="go('points')"><span>⭐</span><b>${mt("pointsClean")}</b><strong>${pointTotal(S.user&&S.user.id)||0}</strong></button>
    <button onclick="go('report')"><span>⚠️</span><b>${mt("reportDamageClean")}</b><small>${mt("saveClean")}</small></button>
    <button onclick="go('license')"><span>🪪</span><b>${mt("scanLicense")}</b><small>PDF</small></button>
   </div>
   <section class="driverVehiclePanel">
    <h2>${mt("myVehicleClean")}</h2>
    <div class="currentVehicleClean"><span>🚛</span><b>${selectedLabel}</b></div>
    <div class="driverVehicleOptions">${vehicleCards}</div>
    <div class="manualVehicleInline"><input id="manualVehicleInput" placeholder="z. B. MAN TGX DU-MH-123"><button onclick="saveManualVehicle()">${mt("useManualVehicleClean")}</button></div>
   </section>
   <section class="driverSafetyCard"><span>🛡️</span><div><b>${mt("safetyHintClean")}</b><small>${t("departureCheck")} · ${mt("reportDamageClean")} · ${mt("scanLicense")}</small></div></section>
  </section>
 `);
}


/* === V18.10 FAHRERAKTE BEARBEITEN FIX === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var p={
  de:{editDriverFile:"Fahrerakte bearbeiten",saveDriverFile:"Fahrerakte speichern",driverFileSaved:"Fahrerakte gespeichert",driverName:"Fahrername",licenseCard:"Fahrerkarte",licenseCardValidUntil:"Fahrerkarte gültig bis",licenseCardNumber:"Fahrerkartennummer",driverData:"Fahrerdaten"},
  en:{editDriverFile:"Edit driver file",saveDriverFile:"Save driver file",driverFileSaved:"Driver file saved",driverName:"Driver name",licenseCard:"Driver card",licenseCardValidUntil:"Driver card valid until",licenseCardNumber:"Driver card number",driverData:"Driver data"},
  tr:{editDriverFile:"Sürücü dosyasını düzenle",saveDriverFile:"Sürücü dosyasını kaydet",driverFileSaved:"Sürücü dosyası kaydedildi",driverName:"Sürücü adı",licenseCard:"Sürücü kartı",licenseCardValidUntil:"Sürücü kartı geçerlilik tarihi",licenseCardNumber:"Sürücü kartı numarası",driverData:"Sürücü bilgileri"},
  pl:{editDriverFile:"Edytuj kartotekę kierowcy",saveDriverFile:"Zapisz kartotekę kierowcy",driverFileSaved:"Kartoteka kierowcy zapisana",driverName:"Imię kierowcy",licenseCard:"Karta kierowcy",licenseCardValidUntil:"Karta kierowcy ważna do",licenseCardNumber:"Numer karty kierowcy",driverData:"Dane kierowcy"},
  ro:{editDriverFile:"Editează fișa șoferului",saveDriverFile:"Salvează fișa șoferului",driverFileSaved:"Fișa șoferului salvată",driverName:"Nume șofer",licenseCard:"Card șofer",licenseCardValidUntil:"Card șofer valabil până la",licenseCardNumber:"Număr card șofer",driverData:"Date șofer"},
  ru:{editDriverFile:"Редактировать карточку водителя",saveDriverFile:"Сохранить карточку водителя",driverFileSaved:"Карточка водителя сохранена",driverName:"Имя водителя",licenseCard:"Карта водителя",licenseCardValidUntil:"Карта водителя действительна до",licenseCardNumber:"Номер карты водителя",driverData:"Данные водителя"},
  uk:{editDriverFile:"Редагувати картку водія",saveDriverFile:"Зберегти картку водія",driverFileSaved:"Картку водія збережено",driverName:"Ім’я водія",licenseCard:"Картка водія",licenseCardValidUntil:"Картка водія дійсна до",licenseCardNumber:"Номер картки водія",driverData:"Дані водія"},
  ar:{editDriverFile:"تعديل ملف السائق",saveDriverFile:"حفظ ملف السائق",driverFileSaved:"تم حفظ ملف السائق",driverName:"اسم السائق",licenseCard:"بطاقة السائق",licenseCardValidUntil:"بطاقة السائق صالحة حتى",licenseCardNumber:"رقم بطاقة السائق",driverData:"بيانات السائق"}
 };
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();

function canEditDriverFile(){
 return !!(admin()||isDashboardRole()||isDeputyRole());
}
function driverEditForm(d){
 if(!canEditDriverFile())return "";
 var vehicles=S.vehicles||[];
 return `<section class="card driverEditForm"><h2>${mt("editDriverFile")}</h2>
  <label>${mt("driverName")}<input id="dfName" value="${d.name||""}"></label>
  <label>${mt("employeeNo")}<input id="dfEmployeeNo" value="${d.employeeNo||d.id||""}"></label>
  <label>${mt("phone")}<input id="dfPhone" value="${d.phone||""}"></label>
  <label>${mt("email")}<input id="dfEmail" value="${d.email||""}"></label>
  <label>${mt("location")}<input id="dfLocation" value="${d.location||""}"></label>
  <label>${mt("entryDate")}<input id="dfEntryDate" type="date" value="${d.entryDate||""}"></label>
  <label>${mt("department")}<input id="dfDepartment" value="${d.department||""}"></label>
  <label>${mt("licenseClasses")}<input id="dfLicenseClasses" value="${d.licenseClasses||"B/CE"}"></label>
  <label>${mt("licenseValidUntil")}<input id="dfLicenseValidUntil" type="date" value="${d.licenseValidUntil||""}"></label>
  <label>${mt("licenseCardNumber")}<input id="dfDriverCardNumber" value="${d.driverCardNumber||""}"></label>
  <label>${mt("licenseCardValidUntil")}<input id="dfDriverCardValidUntil" type="date" value="${d.driverCardValidUntil||""}"></label>
  <label>${mt("currentVehicle")}<select id="dfVehicle"><option value="">${mt("notAssigned")}</option>${vehicles.map(function(v){return `<option value="${v.id}" ${Number(v.assigned)===Number(d.id)?"selected":""}>${safeVehicleLabel? safeVehicleLabel(v):(v.name+" "+v.plate)}</option>`}).join("")}</select></label>
  <button onclick="saveDriverFile(${d.id})">${mt("saveDriverFile")}</button>
 </section>`;
}
function saveDriverFile(id){
 if(!canEditDriverFile()){alert(mt("notAllowed"));return}
 var d=(S.users||[]).find(function(u){return Number(u.id)===Number(id)});
 if(!d)return;
 d.name=(document.getElementById("dfName")||{}).value||d.name;
 d.employeeNo=(document.getElementById("dfEmployeeNo")||{}).value||"";
 d.phone=(document.getElementById("dfPhone")||{}).value||"";
 d.email=(document.getElementById("dfEmail")||{}).value||"";
 d.location=(document.getElementById("dfLocation")||{}).value||"";
 d.entryDate=(document.getElementById("dfEntryDate")||{}).value||"";
 d.department=(document.getElementById("dfDepartment")||{}).value||"";
 d.licenseClasses=(document.getElementById("dfLicenseClasses")||{}).value||"";
 d.licenseValidUntil=(document.getElementById("dfLicenseValidUntil")||{}).value||"";
 d.driverCardNumber=(document.getElementById("dfDriverCardNumber")||{}).value||"";
 d.driverCardValidUntil=(document.getElementById("dfDriverCardValidUntil")||{}).value||"";
 var vehId=Number((document.getElementById("dfVehicle")||{}).value||0);
 (S.vehicles||[]).forEach(function(v){if(Number(v.assigned)===Number(id))v.assigned=null;});
 if(vehId){
   var v=(S.vehicles||[]).find(function(x){return Number(x.id)===vehId});
   if(v){v.assigned=id;v.assignmentDate=new Date().toLocaleDateString();}
 }
 saveAll();
 alert(mt("driverFileSaved"));
 S.selectedDriverId=id;
 render();
}
function driverFilePage(driverId){
 var d=(S.users||[]).find(function(u){return Number(u.id)===Number(driverId||S.selectedDriverId||(S.user&&S.user.id))})||S.user;
 if(!d)return shell('<section class="card">'+mt("noData")+'</section>');
 if(isPureDriver()&&Number(d.id)!==Number(S.user.id))return shell('<section class="card">'+mt("notAllowed")+'</section>');
 var vehicle=(S.vehicles||[]).find(function(v){return Number(v.assigned)===Number(d.id)})||{};
 var plate=vehicleDocPlate(vehicle);
 var docs=(S.docs||[]).filter(function(x){return Number(x.driver)===Number(d.id)||normPlate(x.plate||x.vehiclePlate)===normPlate(plate)});
 var lic=(S.licenses||[]).filter(function(x){return Number(x.driver)===Number(d.id)});
 var pts=(S.points||[]).filter(function(x){return Number(x.driver)===Number(d.id)||Number(x.driverId)===Number(d.id)});
 var checks=(S.inspections||[]).filter(function(x){return Number(x.driver)===Number(d.id)});
 var dmg=(S.damages||[]).filter(function(x){return Number(x.driver)===Number(d.id)||(plate&&normPlate(x.vehicle).indexOf(normPlate(plate))>=0)});
 var lastLic=lic[0]||{};
 return shell(`<h1 class="sectionTitle">${mt("driverFile")} · ${d.name}</h1>
 ${driverEditForm(d)}
 <section class="card"><h2>${mt("personalData")}</h2><p><b>${d.name}</b></p><p>${mt("employeeNo")}: ${d.employeeNo||d.id||"-"} · ${mt("phone")}: ${d.phone||"-"} · ${mt("email")}: ${d.email||"-"}</p><p>${mt("location")}: ${d.location||"-"} · ${mt("entryDate")}: ${d.entryDate||"-"} · ${mt("department")}: ${d.department||"-"}</p></section>
 <section class="card"><h2>${mt("licenseManagement")}</h2><p>${mt("licenseClasses")}: ${d.licenseClasses||"B/CE"}</p><p>${mt("licenseValidUntil")}: ${lastLic.validUntil||d.licenseValidUntil||"-"} · ${licenseStatus(lastLic.validUntil||d.licenseValidUntil)}</p><p>${mt("licenseCard")}: ${d.driverCardNumber||"-"} · ${mt("licenseCardValidUntil")}: ${d.driverCardValidUntil||"-"}</p></section>
 <section class="card"><h2>${mt("vehicleAssignment")}</h2><p>${mt("currentVehicle")}: ${cleanVehicleLabel(vehicle)||"-"}</p><p>${mt("licensePlate")}: ${plate||"-"}</p></section>
 <section class="card"><h2>${mt("documentFolderClean")}</h2>${docs.map(function(x){return `<p>📄 ${x.name} · ${x.type||"-"} · ${x.file||"-"}</p>`}).join("")||'<p class="muted">'+mt("noDocumentsClean")+'</p>'}</section>
 <section class="card"><h2>${t("points")}</h2><p><b>${pointTotal(d.id)||d.points||0}</b></p>${pts.map(function(x){return `<p>⭐ ${x.points||x.value||0} · ${x.reason||""} · ${x.by||x.givenBy||""}</p>`}).join("")}</section>
 <section class="card"><h2>${mt("departurePdfs")}</h2><p>${checks.length} ${mt("departurePdfs")}</p>${checks.slice(0,10).map(function(x){return `<p>☑ ${x.date||""} · ${x.vehicle||""}</p>`}).join("")}</section>
 <section class="card"><h2>${mt("damageReportsClean")}</h2>${dmg.map(function(x){return `<p>⚠ ${x.position||""} · ${x.description||""} · ${x.vehicle||""}</p>`}).join("")||'<p class="muted">'+t("noReports")+'</p>'}</section>
 <section class="card"><h2>${mt("qualifications")}</h2><p>${mt("adr")} · ${mt("loadSecuring")} · ${mt("firstAid")} · ${mt("driverCard")} · ${mt("tachographTraining")}</p></section>
 <section class="card"><h2>${mt("activityStatus")}</h2><p>${mt("lastLogin")}: ${d.lastLogin||"-"} · ${mt("lastActivity")}: ${d.lastActivity||"-"}</p></section>`);
}


/* === V18.10 FAHRERAKTE PUNKTE INFOS FIX === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var p={
  de:{pointInfo:"Infos zu Bewertungspunkten",pointInfoHint:"Hinweise zu Punktebewertung, Verhalten, Boni oder Auffälligkeiten",pointInfoSaved:"Punkte-Information gespeichert",pointInfoHistory:"Historie der Punkte-Informationen",addPointInfo:"Punkte-Info hinzufügen"},
  en:{pointInfo:"Point information",pointInfoHint:"Notes about score evaluation, behavior, bonuses or incidents",pointInfoSaved:"Point information saved",pointInfoHistory:"Point information history",addPointInfo:"Add point information"},
  tr:{pointInfo:"Puan bilgileri",pointInfoHint:"Puan değerlendirmesi, davranış, bonuslar veya olaylar hakkında notlar",pointInfoSaved:"Puan bilgisi kaydedildi",pointInfoHistory:"Puan bilgisi geçmişi",addPointInfo:"Puan bilgisi ekle"},
  pl:{pointInfo:"Informacje o punktach",pointInfoHint:"Uwagi dotyczące oceny punktów, zachowania, premii lub zdarzeń",pointInfoSaved:"Informacja o punktach zapisana",pointInfoHistory:"Historia informacji o punktach",addPointInfo:"Dodaj informację o punktach"},
  ro:{pointInfo:"Informații puncte",pointInfoHint:"Note despre evaluarea punctelor, comportament, bonusuri sau incidente",pointInfoSaved:"Informația despre puncte a fost salvată",pointInfoHistory:"Istoric informații puncte",addPointInfo:"Adaugă informație puncte"},
  ru:{pointInfo:"Информация о баллах",pointInfoHint:"Заметки об оценке баллов, поведении, бонусах или инцидентах",pointInfoSaved:"Информация о баллах сохранена",pointInfoHistory:"История информации о баллах",addPointInfo:"Добавить информацию о баллах"},
  uk:{pointInfo:"Інформація про бали",pointInfoHint:"Нотатки щодо оцінки балів, поведінки, бонусів або інцидентів",pointInfoSaved:"Інформацію про бали збережено",pointInfoHistory:"Історія інформації про бали",addPointInfo:"Додати інформацію про бали"},
  ar:{pointInfo:"معلومات النقاط",pointInfoHint:"ملاحظات حول تقييم النقاط أو السلوك أو المكافآت أو الملاحظات",pointInfoSaved:"تم حفظ معلومات النقاط",pointInfoHistory:"سجل معلومات النقاط",addPointInfo:"إضافة معلومات النقاط"}
 };
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();

function driverPointInfoList(d){
 d.pointInfos=d.pointInfos||[];
 return d.pointInfos.map(function(x){
   return `<p class="pointInfoItem">📝 ${x.date||""} · ${x.by||""}<br><small>${x.text||""}</small></p>`;
 }).join("") || '<p class="muted">-</p>';
}
function saveDriverPointInfo(id){
 if(!canEditDriverFile()){alert(mt("notAllowed"));return}
 var d=(S.users||[]).find(function(u){return Number(u.id)===Number(id)});
 if(!d)return;
 var el=document.getElementById("dfPointInfoNew");
 var text=(el&&el.value||"").trim();
 if(!text){alert(mt("required"));return}
 d.pointInfos=d.pointInfos||[];
 d.pointInfos.unshift({date:new Date().toLocaleString(),by:S.user?S.user.name:"",text:text});
 saveAll();
 alert(mt("pointInfoSaved"));
 S.selectedDriverId=id;
 render();
}
function driverEditForm(d){
 if(!canEditDriverFile())return "";
 var vehicles=S.vehicles||[];
 return `<section class="card driverEditForm"><h2>${mt("editDriverFile")}</h2>
  <label>${mt("driverName")}<input id="dfName" value="${d.name||""}"></label>
  <label>${mt("employeeNo")}<input id="dfEmployeeNo" value="${d.employeeNo||d.id||""}"></label>
  <label>${mt("phone")}<input id="dfPhone" value="${d.phone||""}"></label>
  <label>${mt("email")}<input id="dfEmail" value="${d.email||""}"></label>
  <label>${mt("location")}<input id="dfLocation" value="${d.location||""}"></label>
  <label>${mt("entryDate")}<input id="dfEntryDate" type="date" value="${d.entryDate||""}"></label>
  <label>${mt("department")}<input id="dfDepartment" value="${d.department||""}"></label>
  <label>${mt("licenseClasses")}<input id="dfLicenseClasses" value="${d.licenseClasses||"B/CE"}"></label>
  <label>${mt("licenseValidUntil")}<input id="dfLicenseValidUntil" type="date" value="${d.licenseValidUntil||""}"></label>
  <label>${mt("licenseCardNumber")}<input id="dfDriverCardNumber" value="${d.driverCardNumber||""}"></label>
  <label>${mt("licenseCardValidUntil")}<input id="dfDriverCardValidUntil" type="date" value="${d.driverCardValidUntil||""}"></label>
  <label>${mt("currentVehicle")}<select id="dfVehicle"><option value="">${mt("notAssigned")}</option>${vehicles.map(function(v){return `<option value="${v.id}" ${Number(v.assigned)===Number(d.id)?"selected":""}>${typeof safeVehicleLabel==="function"?safeVehicleLabel(v):(v.name+" "+v.plate)}</option>`}).join("")}</select></label>
  <button onclick="saveDriverFile(${d.id})">${mt("saveDriverFile")}</button>
  <hr>
  <h3>${mt("addPointInfo")}</h3>
  <p class="muted">${mt("pointInfoHint")}</p>
  <textarea id="dfPointInfoNew" placeholder="${mt("pointInfo")}"></textarea>
  <button class="secondary" onclick="saveDriverPointInfo(${d.id})">📝 ${mt("addPointInfo")}</button>
 </section>`;
}
function driverFilePage(driverId){
 var d=(S.users||[]).find(function(u){return Number(u.id)===Number(driverId||S.selectedDriverId||(S.user&&S.user.id))})||S.user;
 if(!d)return shell('<section class="card">'+mt("noData")+'</section>');
 if(isPureDriver()&&Number(d.id)!==Number(S.user.id))return shell('<section class="card">'+mt("notAllowed")+'</section>');
 var vehicle=(S.vehicles||[]).find(function(v){return Number(v.assigned)===Number(d.id)})||{};
 var plate=vehicleDocPlate(vehicle);
 var docs=(S.docs||[]).filter(function(x){return Number(x.driver)===Number(d.id)||normPlate(x.plate||x.vehiclePlate)===normPlate(plate)});
 var lic=(S.licenses||[]).filter(function(x){return Number(x.driver)===Number(d.id)});
 var pts=(S.points||[]).filter(function(x){return Number(x.driver)===Number(d.id)||Number(x.driverId)===Number(d.id)});
 var checks=(S.inspections||[]).filter(function(x){return Number(x.driver)===Number(d.id)});
 var dmg=(S.damages||[]).filter(function(x){return Number(x.driver)===Number(d.id)||(plate&&normPlate(x.vehicle).indexOf(normPlate(plate))>=0)});
 var lastLic=lic[0]||{};
 return shell(`<h1 class="sectionTitle">${mt("driverFile")} · ${d.name}</h1>
 ${driverEditForm(d)}
 <section class="card"><h2>${mt("personalData")}</h2><p><b>${d.name}</b></p><p>${mt("employeeNo")}: ${d.employeeNo||d.id||"-"} · ${mt("phone")}: ${d.phone||"-"} · ${mt("email")}: ${d.email||"-"}</p><p>${mt("location")}: ${d.location||"-"} · ${mt("entryDate")}: ${d.entryDate||"-"} · ${mt("department")}: ${d.department||"-"}</p></section>
 <section class="card"><h2>${mt("licenseManagement")}</h2><p>${mt("licenseClasses")}: ${d.licenseClasses||"B/CE"}</p><p>${mt("licenseValidUntil")}: ${lastLic.validUntil||d.licenseValidUntil||"-"} · ${licenseStatus(lastLic.validUntil||d.licenseValidUntil)}</p><p>${mt("licenseCard")}: ${d.driverCardNumber||"-"} · ${mt("licenseCardValidUntil")}: ${d.driverCardValidUntil||"-"}</p></section>
 <section class="card"><h2>${mt("vehicleAssignment")}</h2><p>${mt("currentVehicle")}: ${cleanVehicleLabel(vehicle)||"-"}</p><p>${mt("licensePlate")}: ${plate||"-"}</p></section>
 <section class="card"><h2>${mt("documentFolderClean")}</h2>${docs.map(function(x){return `<p>📄 ${x.name} · ${x.type||"-"} · ${x.file||"-"}</p>`}).join("")||'<p class="muted">'+mt("noDocumentsClean")+'</p>'}</section>
 <section class="card"><h2>${t("points")}</h2><p><b>${pointTotal(d.id)||d.points||0}</b></p>${pts.map(function(x){return `<p>⭐ ${x.points||x.value||0} · ${x.reason||""} · ${x.by||x.givenBy||""}</p>`}).join("")}<h3>${mt("pointInfoHistory")}</h3>${driverPointInfoList(d)}</section>
 <section class="card"><h2>${mt("departurePdfs")}</h2><p>${checks.length} ${mt("departurePdfs")}</p>${checks.slice(0,10).map(function(x){return `<p>☑ ${x.date||""} · ${x.vehicle||""}</p>`}).join("")}</section>
 <section class="card"><h2>${mt("damageReportsClean")}</h2>${dmg.map(function(x){return `<p>⚠ ${x.position||""} · ${x.description||""} · ${x.vehicle||""}</p>`}).join("")||'<p class="muted">'+t("noReports")+'</p>'}</section>
 <section class="card"><h2>${mt("qualifications")}</h2><p>${mt("adr")} · ${mt("loadSecuring")} · ${mt("firstAid")} · ${mt("driverCard")} · ${mt("tachographTraining")}</p></section>
 <section class="card"><h2>${mt("activityStatus")}</h2><p>${mt("lastLogin")}: ${d.lastLogin||"-"} · ${mt("lastActivity")}: ${d.lastActivity||"-"}</p></section>`);
}


/* === V18.10 AUFLIEGER TREFFPUNKTE FINAL === */
(function(){
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 var p={
  de:{trailerMeetings:"Auflieger-Treffpunkte",newTrailerMeeting:"Neuen Treffpunkt eintragen",meetingPlace:"Treffpunkt / Ort",meetingDate:"Datum",meetingTime:"Uhrzeit",otherDriver:"Anderer Fahrer",otherDriverPhone:"Telefonnummer",trailerInfo:"Auflieger / Kennzeichen",meetingNote:"Zusätzliche Info",saveMeeting:"Treffpunkt speichern",meetingSaved:"Treffpunkt gespeichert",meetingUpdated:"Treffpunkt aktualisiert",allTrailerMeetings:"Alle Auflieger-Treffpunkte",myTrailerMeetings:"Meine Auflieger-Treffpunkte",editMeeting:"Treffpunkt bearbeiten"},
  en:{trailerMeetings:"Trailer meeting points",newTrailerMeeting:"Add new meeting point",meetingPlace:"Meeting point / place",meetingDate:"Date",meetingTime:"Time",otherDriver:"Other driver",otherDriverPhone:"Phone number",trailerInfo:"Trailer / plate",meetingNote:"Additional info",saveMeeting:"Save meeting point",meetingSaved:"Meeting point saved",meetingUpdated:"Meeting point updated",allTrailerMeetings:"All trailer meeting points",myTrailerMeetings:"My trailer meeting points",editMeeting:"Edit meeting point"},
  tr:{trailerMeetings:"Dorse buluşma noktaları",newTrailerMeeting:"Yeni buluşma noktası gir",meetingPlace:"Buluşma yeri",meetingDate:"Tarih",meetingTime:"Saat",otherDriver:"Diğer sürücü",otherDriverPhone:"Telefon",trailerInfo:"Dorse / plaka",meetingNote:"Ek bilgi",saveMeeting:"Kaydet",meetingSaved:"Buluşma kaydedildi",meetingUpdated:"Buluşma güncellendi",allTrailerMeetings:"Tüm dorse buluşmaları",myTrailerMeetings:"Dorse buluşmalarım",editMeeting:"Buluşmayı düzenle"},
  pl:{trailerMeetings:"Punkty spotkań naczep",newTrailerMeeting:"Dodaj punkt spotkania",meetingPlace:"Miejsce spotkania",meetingDate:"Data",meetingTime:"Godzina",otherDriver:"Inny kierowca",otherDriverPhone:"Telefon",trailerInfo:"Naczepa / numer",meetingNote:"Dodatkowa informacja",saveMeeting:"Zapisz spotkanie",meetingSaved:"Spotkanie zapisane",meetingUpdated:"Spotkanie zaktualizowane",allTrailerMeetings:"Wszystkie spotkania naczep",myTrailerMeetings:"Moje spotkania naczep",editMeeting:"Edytuj spotkanie"},
  ro:{trailerMeetings:"Puncte întâlnire remorcă",newTrailerMeeting:"Adaugă punct întâlnire",meetingPlace:"Loc întâlnire",meetingDate:"Dată",meetingTime:"Oră",otherDriver:"Alt șofer",otherDriverPhone:"Telefon",trailerInfo:"Remorcă / număr",meetingNote:"Informație suplimentară",saveMeeting:"Salvează",meetingSaved:"Întâlnire salvată",meetingUpdated:"Întâlnire actualizată",allTrailerMeetings:"Toate întâlnirile",myTrailerMeetings:"Întâlnirile mele",editMeeting:"Editează întâlnire"},
  ru:{trailerMeetings:"Точки встречи для прицепа",newTrailerMeeting:"Добавить встречу",meetingPlace:"Место встречи",meetingDate:"Дата",meetingTime:"Время",otherDriver:"Другой водитель",otherDriverPhone:"Телефон",trailerInfo:"Прицеп / номер",meetingNote:"Доп. информация",saveMeeting:"Сохранить",meetingSaved:"Встреча сохранена",meetingUpdated:"Встреча обновлена",allTrailerMeetings:"Все встречи",myTrailerMeetings:"Мои встречи",editMeeting:"Редактировать встречу"},
  uk:{trailerMeetings:"Точки зустрічі для причепа",newTrailerMeeting:"Додати зустріч",meetingPlace:"Місце зустрічі",meetingDate:"Дата",meetingTime:"Час",otherDriver:"Інший водій",otherDriverPhone:"Телефон",trailerInfo:"Причіп / номер",meetingNote:"Додаткова інформація",saveMeeting:"Зберегти",meetingSaved:"Зустріч збережено",meetingUpdated:"Зустріч оновлено",allTrailerMeetings:"Усі зустрічі",myTrailerMeetings:"Мої зустрічі",editMeeting:"Редагувати зустріч"},
  ar:{trailerMeetings:"نقاط لقاء المقطورة",newTrailerMeeting:"إضافة نقطة لقاء",meetingPlace:"مكان اللقاء",meetingDate:"التاريخ",meetingTime:"الوقت",otherDriver:"السائق الآخر",otherDriverPhone:"رقم الهاتف",trailerInfo:"المقطورة / اللوحة",meetingNote:"معلومات إضافية",saveMeeting:"حفظ",meetingSaved:"تم حفظ اللقاء",meetingUpdated:"تم تحديث اللقاء",allTrailerMeetings:"كل نقاط اللقاء",myTrailerMeetings:"نقاط لقائي",editMeeting:"تعديل اللقاء"}
 };
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();

function ensureTrailerMeetings(){
 S.trailerMeetings=S.trailerMeetings||mLoad("fc_v18_trailer_meetings",[]);
 return S.trailerMeetings;
}
function saveTrailerMeetings(){
 localStorage.setItem("fc_v18_trailer_meetings",JSON.stringify(S.trailerMeetings||[]));
}
function canEditTrailerMeetings(){
 return !!(admin()||isDashboardRole()||isDeputyRole());
}
function saveTrailerMeeting(id){
 ensureTrailerMeetings();
 var meeting=id?S.trailerMeetings.find(function(x){return Number(x.id)===Number(id)}):null;
 if(id && !meeting)return;
 if(id && !canEditTrailerMeetings() && Number(meeting.driver)!==Number(S.user&&S.user.id)){alert(mt("notAllowed"));return}
 var place=(document.getElementById("tmPlace"+(id||""))||{}).value||"";
 var date=(document.getElementById("tmDate"+(id||""))||{}).value||"";
 var time=(document.getElementById("tmTime"+(id||""))||{}).value||"";
 var other=(document.getElementById("tmOther"+(id||""))||{}).value||"";
 var phone=(document.getElementById("tmPhone"+(id||""))||{}).value||"";
 var trailer=(document.getElementById("tmTrailer"+(id||""))||{}).value||"";
 var note=(document.getElementById("tmNote"+(id||""))||{}).value||"";
 if(!place||!date||!time||!other||!phone||!trailer){alert(mt("required"));return}
 if(!meeting){
   meeting={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",created:new Date().toLocaleString()};
   S.trailerMeetings.unshift(meeting);
 }
 meeting.place=place;meeting.date=date;meeting.time=time;meeting.otherDriver=other;meeting.phone=phone;meeting.trailer=trailer;meeting.note=note;meeting.updated=new Date().toLocaleString();meeting.updatedBy=S.user?S.user.name:"";
 saveTrailerMeetings();saveAll();
 alert(id?mt("meetingUpdated"):mt("meetingSaved"));
 render();
}
function trailerMeetingForm(m){
 m=m||{};
 var id=m.id||"";
 var canEdit=!id||canEditTrailerMeetings()||Number(m.driver)===Number(S.user&&S.user.id);
 if(!canEdit)return "";
 return `<section class="card trailerMeetingForm"><h2>${id?mt("editMeeting"):mt("newTrailerMeeting")}</h2>
  <label>${mt("meetingPlace")}<input id="tmPlace${id}" value="${m.place||""}" placeholder="z. B. Raststätte, Autohof, Adresse"></label>
  <label>${mt("meetingDate")}<input id="tmDate${id}" type="date" value="${m.date||""}"></label>
  <label>${mt("meetingTime")}<input id="tmTime${id}" type="time" value="${m.time||""}"></label>
  <label>${mt("otherDriver")}<input id="tmOther${id}" value="${m.otherDriver||""}" placeholder="Name"></label>
  <label>${mt("otherDriverPhone")}<input id="tmPhone${id}" value="${m.phone||""}" placeholder="+49 ..."></label>
  <label>${mt("trailerInfo")}<input id="tmTrailer${id}" value="${m.trailer||""}" placeholder="Auflieger / Kennzeichen"></label>
  <label>${mt("meetingNote")}<textarea id="tmNote${id}" placeholder="${mt("meetingNote")}">${m.note||""}</textarea></label>
  <button onclick="saveTrailerMeeting(${id||0})">${mt("saveMeeting")}</button>
 </section>`;
}
function trailerMeetingsPage(){
 ensureTrailerMeetings();
 var list=canEditTrailerMeetings()?S.trailerMeetings:S.trailerMeetings.filter(function(x){return Number(x.driver)===Number(S.user&&S.user.id)});
 var title=canEditTrailerMeetings()?mt("allTrailerMeetings"):mt("myTrailerMeetings");
 return shell(`<h1 class="sectionTitle">${mt("trailerMeetings")}</h1>${trailerMeetingForm()}<section class="card"><h2>${title}</h2>${list.map(function(m){return `<div class="trailerMeetingItem"><b>📍 ${m.place}</b><small>${m.date||"-"} · ${m.time||"-"} · ${m.driverName||"-"}</small><p>${mt("otherDriver")}: ${m.otherDriver||"-"} · ${mt("otherDriverPhone")}: ${m.phone||"-"}</p><p>${mt("trailerInfo")}: ${m.trailer||"-"}</p><p>${m.note||""}</p>${trailerMeetingForm(m)}</div>`}).join("")||'<p class="muted">-</p>'}</section>`);
}
function more(){
 var buttons='';
 buttons+=`<button onclick="go('trailerMeetings')">🔁 ${mt("trailerMeetings")} <span>›</span></button>`;
 buttons+=`<button onclick="go('license')">🪪 ${mt("scanLicense")} <span>›</span></button>`;
 buttons+=`<button onclick="go('documents')">📂 ${mt("documentFolderClean")} <span>›</span></button>`;
 if(admin()||isDashboardRole())buttons+=`<button onclick="go('drivers')">👤 ${mt("driverFiles")} <span>›</span></button>`;
 if(typeof canSeeWorkshopInsight==="function"&&canSeeWorkshopInsight())buttons+=`<button onclick="go('workshopInsight')">🔧 ${mt("workshopInsight")} <span>›</span></button>`;
 if(admin()||work())buttons+=`<button onclick="go('vehicleHistory')">📁 ${mt("vehicleHistory")} <span>›</span></button><button onclick="go('workOrders')">🔧 ${mt("workOrders")} <span>›</span></button><button onclick="go('parts')">📦 ${mt("partsInventory")} <span>›</span></button>`;
 if(isDeputyRole()||admin()||work()||isDashboardRole())buttons+=`<button onclick="go('pdfArchive')">📄 ${mt("pdfArchiveMain")} <span>›</span></button>`;
 return shell(`<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>${t("settings")}</span></div><h2>${t("settings")}</h2><label>${t("language")}<select onchange="setLang(this.value)">${LANG.map(function(l){return `<option value="${l[0]}" ${S.lang===l[0]?"selected":""}>${l[1]}</option>`}).join("")}</select></label><div class="settingsList">${buttons}</div><button class="logoutAction" onclick="logout()">↩ ${t("logout")}</button></section>`);
}
function render(){
 restoreSession();
 masterNormalizeUsers();
 if(typeof workshopDataInit==="function")workshopDataInit();
 ensurePdfArchive();
 ensureTrailerMeetings();
 document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workCostsPage,workshopInsight:managementWorkshopInsightPage,driverFile:function(){return driverFilePage(S.selectedDriverId)},drivers:driversPage,trailerMeetings:trailerMeetingsPage};
 var root=document.getElementById("root");
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check")initSig()},50);
}
ensureTrailerMeetings();


/* === V18.10 GLOBAL TRANSLATION FIX FINAL === */
(function(){
 if(typeof MASTER_I18N==="undefined")MASTER_I18N={de:{}};

 var de={
  home:"Home",dashboard:"Dashboard",vehicles:"Fahrzeuge",vehicle:"Fahrzeug",tasks:"Aufgaben",more:"Mehr",profile:"Profil",settings:"Einstellungen",language:"Sprache",logout:"Abmelden",back:"Zurück",save:"Speichern",edit:"Bearbeiten",delete:"Löschen",cancel:"Abbrechen",search:"Suche",showAll:"Alle anzeigen",showAllDrivers:"Alle Fahrer anzeigen",status:"Status",active:"Aktiv",open:"Offen",done:"Erledigt",approved:"Freigegeben",notAssigned:"Nicht zugewiesen",noData:"Keine Daten vorhanden",required:"Bitte alle Pflichtfelder ausfüllen.",notAllowed:"Keine Berechtigung",
  goodMorning:"Guten Morgen",welcomeBack:"Willkommen zurück.",loginHint:"Bitte melde dich an, um fortzufahren.",username:"Benutzername",password:"Passwort",login:"Anmelden",loginFailed:"Login fehlgeschlagen",privacy:"Datenschutz",help:"Hilfe",
  driver:"Fahrer",drivers:"Fahrer",driverStatus:"Fahrerstatus",driversTotal:"Fahrer gesamt",fleet:"Fuhrpark",boss:"Chef",deputy:"Stellvertretung",workshop:"Werkstatt",developer:"Entwickler",management:"Management",
  fleetOverview:"Hier ist die aktuelle Übersicht deines Fuhrparks.",vehiclesTotal:"Fahrzeuge gesamt",inUse:"Im Einsatz",openDamages:"Offene Schäden",urgent:"Dringend",dueChecks:"Fällige Prüfungen",thisWeek:"Diese Woche",nextWeek:"Nächste Woche",
  departureCheck:"Abfahrtskontrolle",controlDone:"Kontrolle abgeschlossen",checkCompleted:"Abfahrtskontrolle abgeschlossen",damage:"Schaden",reportDamage:"Schaden melden",reportDamageClean:"Schaden melden",damageReports:"Schadensmeldungen",damageReportsClean:"Schadensmeldungen",noReports:"Keine Meldungen",description:"Beschreibung",comment:"Kommentar",commentOptional:"Kommentar optional",photo:"Foto",photoFile:"Fotodatei",position:"Position",positionClean:"Position",
  points:"Punkte",pointsClean:"Punkte",ranking:"Ranking",reason:"Grund",awardedBy:"Vergeben von",pointInfo:"Infos zu Bewertungspunkten",pointInfoHistory:"Historie der Punkte-Informationen",
  myVehicle:"Mein Fahrzeug",myVehicleClean:"Mein Fahrzeug",manualVehicle:"Fahrzeug / Kennzeichen manuell eintragen",manualVehicleClean:"Fahrzeug / Kennzeichen manuell eintragen",useManualVehicleClean:"Manuelles Fahrzeug verwenden",noVehicleSelected:"Noch kein Fahrzeug ausgewählt",
  maintenancePlanner:"Wartungsplaner",maintenance:"Wartung",workOrders:"Arbeitsaufträge",newWorkOrder:"Neuer Arbeitsauftrag",openOrders:"Offene Aufträge",orderTitle:"Auftragstitel",assignedMechanic:"Mechaniker",mechanic:"Mechaniker",parts:"Ersatzteile",partsInventory:"Ersatzteillager",laborHours:"Arbeitsstunden",mechanicSignature:"Digitale Unterschrift",createOrder:"Auftrag erstellen",startOrder:"Auftrag starten",finishOrder:"Auftrag fertigstellen",approveOrder:"Auftrag freigeben",lockOrder:"Auftrag sperren",unlockOrder:"Auftrag entsperren",workshopOverview:"Werkstattübersicht",workshopInsight:"Werkstattübersicht",workshopCalendar:"Werkstattkalender",workshopCosts:"Werkstattkosten",vehicleHistory:"Fahrzeughistorie",
  huTuv:"HU / TÜV",spCheck:"SP",tachoCheck:"Tachoprüfung",tireCheck:"Reifenprüfung",brakeCheck:"Bremsenprüfung",oilService:"Ölservice",vehicleFilePdf:"Fahrzeugakte als PDF",completeVehicleFile:"Komplette Fahrzeugakte",allDamagesList:"Gesamtauflistung aller eingetragenen Schäden",
  documentFolderClean:"Dokumentenmappe",documents:"Dokumente",addDocumentClean:"Dokument hinzufügen",documentNameClean:"Dokumentname",documentTypeClean:"Dokumentart",documentFileClean:"Dokumentdatei",documentForPlate:"Dokument für Kennzeichen/Fahrzeug",noDocumentsClean:"Keine Dokumente vorhanden",linkedPlate:"Verknüpftes Kennzeichen",
  driverFile:"Fahrerakte",driverFiles:"Fahrerakten",editDriverFile:"Fahrerakte bearbeiten",saveDriverFile:"Fahrerakte speichern",driverFileSaved:"Fahrerakte gespeichert",personalData:"Stammdaten",employeeNo:"Personalnummer",phone:"Telefon",email:"E-Mail",location:"Standort",entryDate:"Eintrittsdatum",department:"Abteilung",licenseManagement:"Führerscheinverwaltung",licenseClasses:"Führerscheinklassen",licenseValidUntil:"Führerschein gültig bis",licenseCard:"Fahrerkarte",licenseCardValidUntil:"Fahrerkarte gültig bis",licenseCardNumber:"Fahrerkartennummer",vehicleAssignment:"Fahrzeugzuordnung",currentVehicle:"Aktuelles Fahrzeug",licensePlate:"Kennzeichen",
  scanLicense:"Führerschein einscannen",licensePdfArchive:"Führerscheine PDF-Archiv",licensePdfs:"Führerscheine",licenseScan:"Führerschein-Scan",licenseFile:"Führerschein-Datei",saveLicensePdf:"Führerschein als PDF speichern",
  pdfArchiveMain:"PDF-Archiv",departurePdfArchive:"Abfahrtskontrollen PDF-Archiv",workshopPdfArchive:"Werkstatt PDF-Archiv",viewPdf:"PDF ansehen",
  trailerMeetings:"Auflieger-Treffpunkte",newTrailerMeeting:"Neuen Treffpunkt eintragen",meetingPlace:"Treffpunkt / Ort",meetingDate:"Datum",meetingTime:"Uhrzeit",otherDriver:"Anderer Fahrer",otherDriverPhone:"Telefonnummer",trailerInfo:"Auflieger / Kennzeichen",meetingNote:"Zusätzliche Info",saveMeeting:"Treffpunkt speichern",allTrailerMeetings:"Alle Auflieger-Treffpunkte",myTrailerMeetings:"Meine Auflieger-Treffpunkte",editMeeting:"Treffpunkt bearbeiten",
  notifications:"Benachrichtigungen",system:"System",costAnalysis:"Kostenanalyse",aiDamageCheck:"KI-Schadenprüfung",safety:"Sicherheit"
 };
 var en={
  home:"Home",dashboard:"Dashboard",vehicles:"Vehicles",vehicle:"Vehicle",tasks:"Tasks",more:"More",profile:"Profile",settings:"Settings",language:"Language",logout:"Logout",back:"Back",save:"Save",edit:"Edit",delete:"Delete",cancel:"Cancel",search:"Search",showAll:"Show all",showAllDrivers:"Show all drivers",status:"Status",active:"Active",open:"Open",done:"Done",approved:"Approved",notAssigned:"Not assigned",noData:"No data available",required:"Please complete all required fields.",notAllowed:"Not authorized",
  goodMorning:"Good morning",welcomeBack:"Welcome back.",loginHint:"Please sign in to continue.",username:"Username",password:"Password",login:"Sign in",loginFailed:"Login failed",privacy:"Privacy",help:"Help",
  driver:"Driver",drivers:"Drivers",driverStatus:"Driver status",driversTotal:"Total drivers",fleet:"Fleet",boss:"Management",deputy:"Deputy",workshop:"Workshop",developer:"Developer",management:"Management",
  fleetOverview:"Here is the current overview of your fleet.",vehiclesTotal:"Total vehicles",inUse:"In use",openDamages:"Open damage reports",urgent:"Urgent",dueChecks:"Due inspections",thisWeek:"This week",nextWeek:"Next week",
  departureCheck:"Departure check",controlDone:"Check completed",checkCompleted:"Departure check completed",damage:"Damage",reportDamage:"Report damage",reportDamageClean:"Report damage",damageReports:"Damage reports",damageReportsClean:"Damage reports",noReports:"No reports",description:"Description",comment:"Comment",commentOptional:"Optional comment",photo:"Photo",photoFile:"Photo file",position:"Position",positionClean:"Position",
  points:"Points",pointsClean:"Points",ranking:"Ranking",reason:"Reason",awardedBy:"Awarded by",pointInfo:"Point information",pointInfoHistory:"Point information history",
  myVehicle:"My vehicle",myVehicleClean:"My vehicle",manualVehicle:"Enter vehicle / plate manually",manualVehicleClean:"Enter vehicle / plate manually",useManualVehicleClean:"Use manual vehicle",noVehicleSelected:"No vehicle selected yet",
  maintenancePlanner:"Maintenance planner",maintenance:"Maintenance",workOrders:"Work orders",newWorkOrder:"New work order",openOrders:"Open orders",orderTitle:"Order title",assignedMechanic:"Mechanic",mechanic:"Mechanic",parts:"Parts",partsInventory:"Parts inventory",laborHours:"Labor hours",mechanicSignature:"Digital signature",createOrder:"Create order",startOrder:"Start order",finishOrder:"Finish order",approveOrder:"Approve order",lockOrder:"Lock order",unlockOrder:"Unlock order",workshopOverview:"Workshop overview",workshopInsight:"Workshop overview",workshopCalendar:"Workshop calendar",workshopCosts:"Workshop costs",vehicleHistory:"Vehicle history",
  huTuv:"HU / TÜV",spCheck:"SP inspection",tachoCheck:"Tachograph check",tireCheck:"Tire check",brakeCheck:"Brake check",oilService:"Oil service",vehicleFilePdf:"Vehicle file as PDF",completeVehicleFile:"Complete vehicle file",allDamagesList:"Complete list of all damage reports",
  documentFolderClean:"Document folder",documents:"Documents",addDocumentClean:"Add document",documentNameClean:"Document name",documentTypeClean:"Document type",documentFileClean:"Document file",documentForPlate:"Document for plate/vehicle",noDocumentsClean:"No documents available",linkedPlate:"Linked plate",
  driverFile:"Driver file",driverFiles:"Driver files",editDriverFile:"Edit driver file",saveDriverFile:"Save driver file",driverFileSaved:"Driver file saved",personalData:"Personal data",employeeNo:"Employee number",phone:"Phone",email:"Email",location:"Location",entryDate:"Entry date",department:"Department",licenseManagement:"License management",licenseClasses:"License classes",licenseValidUntil:"License valid until",licenseCard:"Driver card",licenseCardValidUntil:"Driver card valid until",licenseCardNumber:"Driver card number",vehicleAssignment:"Vehicle assignment",currentVehicle:"Current vehicle",licensePlate:"License plate",
  scanLicense:"Scan driving license",licensePdfArchive:"Driving license PDF archive",licensePdfs:"Driving licenses",licenseScan:"Driving license scan",licenseFile:"Driving license file",saveLicensePdf:"Save license as PDF",
  pdfArchiveMain:"PDF archive",departurePdfArchive:"Departure checks PDF archive",workshopPdfArchive:"Workshop PDF archive",viewPdf:"View PDF",
  trailerMeetings:"Trailer meeting points",newTrailerMeeting:"Add new meeting point",meetingPlace:"Meeting point / place",meetingDate:"Date",meetingTime:"Time",otherDriver:"Other driver",otherDriverPhone:"Phone number",trailerInfo:"Trailer / plate",meetingNote:"Additional info",saveMeeting:"Save meeting point",allTrailerMeetings:"All trailer meeting points",myTrailerMeetings:"My trailer meeting points",editMeeting:"Edit meeting point",
  notifications:"Notifications",system:"System",costAnalysis:"Cost analysis",aiDamageCheck:"AI damage check",safety:"Safety"
 };
 var overrides={
  tr:{goodMorning:"Günaydın",home:"Ana sayfa",vehicles:"Araçlar",tasks:"Görevler",more:"Daha fazla",settings:"Ayarlar",logout:"Çıkış",back:"Geri",save:"Kaydet",driver:"Sürücü",workshop:"Atölye",fleet:"Filo",departureCheck:"Çıkış kontrolü",points:"Puanlar",reportDamageClean:"Hasar bildir",reportDamage:"Hasar bildir",myVehicleClean:"Aracım",scanLicense:"Ehliyeti tara",trailerMeetings:"Dorse buluşma noktaları",meetingPlace:"Buluşma yeri",meetingDate:"Tarih",meetingTime:"Saat",otherDriver:"Diğer sürücü",otherDriverPhone:"Telefon",trailerInfo:"Dorse / plaka",meetingNote:"Ek bilgi"},
  pl:{goodMorning:"Dzień dobry",home:"Start",vehicles:"Pojazdy",tasks:"Zadania",more:"Więcej",settings:"Ustawienia",logout:"Wyloguj",back:"Wstecz",save:"Zapisz",driver:"Kierowca",workshop:"Warsztat",fleet:"Flota",departureCheck:"Kontrola wyjazdu",points:"Punkty",reportDamageClean:"Zgłoś szkodę",reportDamage:"Zgłoś szkodę",myVehicleClean:"Mój pojazd",scanLicense:"Zeskanuj prawo jazdy",trailerMeetings:"Punkty spotkań naczep",meetingPlace:"Miejsce spotkania",meetingDate:"Data",meetingTime:"Godzina",otherDriver:"Inny kierowca",otherDriverPhone:"Telefon",trailerInfo:"Naczepa / numer",meetingNote:"Dodatkowa informacja"},
  ro:{goodMorning:"Bună dimineața",home:"Acasă",vehicles:"Vehicule",tasks:"Sarcini",more:"Mai mult",settings:"Setări",logout:"Deconectare",back:"Înapoi",save:"Salvează",driver:"Șofer",workshop:"Atelier",fleet:"Flotă",departureCheck:"Control plecare",points:"Puncte",reportDamageClean:"Raportează daună",reportDamage:"Raportează daună",myVehicleClean:"Vehiculul meu",scanLicense:"Scanează permisul",trailerMeetings:"Puncte întâlnire remorcă",meetingPlace:"Loc întâlnire",meetingDate:"Dată",meetingTime:"Oră",otherDriver:"Alt șofer",otherDriverPhone:"Telefon",trailerInfo:"Remorcă / număr",meetingNote:"Informație suplimentară"},
  ru:{goodMorning:"Доброе утро",home:"Главная",vehicles:"ТС",tasks:"Задачи",more:"Еще",settings:"Настройки",logout:"Выйти",back:"Назад",save:"Сохранить",driver:"Водитель",workshop:"Мастерская",fleet:"Автопарк",departureCheck:"Предрейсовая проверка",points:"Баллы",reportDamageClean:"Сообщить о повреждении",reportDamage:"Сообщить о повреждении",myVehicleClean:"Мой автомобиль",scanLicense:"Сканировать права",trailerMeetings:"Точки встречи для прицепа",meetingPlace:"Место встречи",meetingDate:"Дата",meetingTime:"Время",otherDriver:"Другой водитель",otherDriverPhone:"Телефон",trailerInfo:"Прицеп / номер",meetingNote:"Доп. информация"},
  uk:{goodMorning:"Доброго ранку",home:"Головна",vehicles:"Авто",tasks:"Завдання",more:"Більше",settings:"Налаштування",logout:"Вийти",back:"Назад",save:"Зберегти",driver:"Водій",workshop:"Майстерня",fleet:"Автопарк",departureCheck:"Передрейсова перевірка",points:"Бали",reportDamageClean:"Повідомити про пошкодження",reportDamage:"Повідомити про пошкодження",myVehicleClean:"Мій автомобіль",scanLicense:"Сканувати посвідчення",trailerMeetings:"Точки зустрічі для причепа",meetingPlace:"Місце зустрічі",meetingDate:"Дата",meetingTime:"Час",otherDriver:"Інший водій",otherDriverPhone:"Телефон",trailerInfo:"Причіп / номер",meetingNote:"Додаткова інформація"},
  ar:{goodMorning:"صباح الخير",home:"الرئيسية",vehicles:"المركبات",tasks:"المهام",more:"المزيد",settings:"الإعدادات",logout:"تسجيل الخروج",back:"رجوع",save:"حفظ",driver:"السائق",workshop:"الورشة",fleet:"الأسطول",departureCheck:"فحص الانطلاق",points:"النقاط",reportDamageClean:"الإبلاغ عن ضرر",reportDamage:"الإبلاغ عن ضرر",myVehicleClean:"مركبتي",scanLicense:"مسح الرخصة",trailerMeetings:"نقاط لقاء المقطورة",meetingPlace:"مكان اللقاء",meetingDate:"التاريخ",meetingTime:"الوقت",otherDriver:"السائق الآخر",otherDriverPhone:"رقم الهاتف",trailerInfo:"المقطورة / اللوحة",meetingNote:"معلومات إضافية"}
 };
 ["de","en","tr","pl","ro","ru","uk","ar"].forEach(function(lang){
  var base=lang==="de"?de:en;
  MASTER_I18N[lang]=Object.assign({},base,MASTER_I18N[lang]||{},overrides[lang]||{});
 });
})();
function fcTranslateKey(k){
 var lang=(S&&S.lang)||mLoad("fc_v17_lang","de")||"de";
 if(typeof lang==="string"&&lang.charAt(0)==='"'){try{lang=JSON.parse(lang)}catch(e){}}
 var val=(MASTER_I18N[lang]&&MASTER_I18N[lang][k])||(MASTER_I18N.de&&MASTER_I18N.de[k])||(MASTER_I18N.en&&MASTER_I18N.en[k]);
 return val||String(k).replace(/([A-Z])/g," $1").replace(/^./,function(c){return c.toUpperCase()});
}
t=fcTranslateKey;
mt=fcTranslateKey;
setLang=function(lang){
 S.lang=lang;
 localStorage.setItem("fc_v17_lang",JSON.stringify(lang));
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 render();
};
var FC_OLD_RENDER_FOR_I18N=render;
render=function(){
 if(S&&S.lang){document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==="ar"?"rtl":"ltr";}
 FC_OLD_RENDER_FOR_I18N();
};


/* === FLEETCONTROL MASTER V18.11 FINAL CLEAN PATCH === */

/* FINAL LOGIN / ROLE STRUCTURE */
function fcV1811ApplyUsers(){
 S.users = S.users || [];
 var base = [
  {id:101,name:"Hidir Daglioglu",login:"Hidir Daglioglu",pass:"Wassermelonen",role:"boss",extraRoles:["boss","fleet","deputy"],status:"online",points:0},
  {id:102,name:"Sascha",login:"Sascha",pass:"Fuhrpark",role:"deputy",extraRoles:["boss","fleet","deputy"],status:"online",points:0},
  {id:103,name:"Marcel",login:"Marcel",pass:"Fuhrpark",role:"fleet",extraRoles:["boss","fleet","deputy"],status:"online",points:0},
  {id:104,name:"Tamara",login:"Tamara",pass:"Fuhrpark",role:"boss",extraRoles:["boss","fleet","deputy"],status:"online",points:0},
  {id:105,name:"Werkstatt",login:"Werkstatt",pass:"Eisbecher",role:"workshop",extraRoles:["workshop"],status:"online",points:0},
  {id:201,name:"Fahrer 01",login:"Fahrer01",pass:"Fahrer2026",role:"driver",extraRoles:[],status:"offline",points:0},
  {id:202,name:"Fahrer 02",login:"Fahrer02",pass:"Fahrer2026",role:"driver",extraRoles:[],status:"offline",points:0}
 ];
 base.forEach(function(nu){
   var old = S.users.find(function(u){
     var s=String((u.login||"")+" "+(u.name||"")).toLowerCase();
     return String(u.login||"").toLowerCase()===String(nu.login||"").toLowerCase() ||
            String(u.name||"").toLowerCase()===String(nu.name||"").toLowerCase() ||
            (nu.name==="Hidir Daglioglu" && /chef|hidir|klos/.test(s)) ||
            (nu.name==="Marcel" && /marcel/.test(s)) ||
            (nu.name==="Sascha" && /sascha/.test(s)) ||
            (nu.name==="Tamara" && /tamara/.test(s));
   });
   if(old){Object.keys(nu).forEach(function(k){old[k]=nu[k]});}
   else{S.users.push(nu);}
 });
}
function masterNormalizeUsers(){fcV1811ApplyUsers();}

/* LOGIN OVERRIDE */
function login(e){
 if(e&&e.preventDefault)e.preventDefault();
 fcV1811ApplyUsers();
 var name=(document.getElementById("loginName")||{}).value||"";
 var pass=(document.getElementById("loginPass")||{}).value||"";
 var u=(S.users||[]).find(function(x){
   return String(x.login||"").trim().toLowerCase()===String(name).trim().toLowerCase() &&
          String(x.pass||x.password||"")===String(pass);
 });
 if(!u){
   var err=document.getElementById("loginError");
   if(err){err.textContent=mt("loginFailed")||"Login fehlgeschlagen";err.style.display="block";}
   return false;
 }
 S.user=Object.assign({},u);
 S.user.lastLogin=new Date().toLocaleString();
 S.tab="home";
 localStorage.setItem("fc_v17_session_user",JSON.stringify({id:S.user.id,login:S.user.login}));
 localStorage.setItem("fc_v17_session_tab",JSON.stringify(S.tab));
 saveAll();
 render();
 return true;
}

/* ROLE RIGHTS */
function isPureDriver(){return !!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||S.user.extraRoles.length===0));}
function isDashboardRole(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")));}
function canAwardPoints(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="deputy"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("deputy")||mExtra("admin")));}
function admin(){return !!(S.user&&!isPureDriver()&&(S.user.role==="boss"||S.user.role==="fleet"||S.user.role==="developer"||S.user.role==="admin"||mExtra("boss")||mExtra("fleet")||mExtra("developer")||mExtra("admin")));}
function work(){return !!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||admin()));}
function canEditDriverFile(){return !!(admin()||isDashboardRole()||isDeputyRole());}

/* TRANSLATION ADDITIONS */
(function(){
 if(typeof MASTER_I18N==="undefined")MASTER_I18N={de:{}};
 var p={
  de:{driverNotice:"Fahrzeugmeldung",driverNotices:"Fahrermeldungen",newDriverNotice:"Neue Fahrzeugmeldung",noticeType:"Meldungstyp",noticePriority:"Priorität",noticeStatus:"Status",noticeCreated:"Meldung erstellt",noticeOpen:"Offen",noticeProgress:"In Bearbeitung",noticeDone:"Erledigt",oilChange:"Ölwechsel erforderlich",serviceDue:"Service fällig",tireProblem:"Reifenproblem",brakeProblem:"Bremsenproblem",lightingProblem:"Beleuchtung defekt",huTuvNotice:"HU/TÜV Hinweis",spNotice:"SP Hinweis",tachoNotice:"Tachoprüfung Hinweis",otherVehicleNotice:"Sonstige Fahrzeugmeldung",takeOverNotice:"Auftrag übernehmen",finishNotice:"Meldung abschließen",driverNoticeSaved:"Fahrermeldung gespeichert und an Werkstatt übertragen",workshopDriverNotices:"Fahrermeldungen im Werkstatt-Dashboard"},
  en:{driverNotice:"Vehicle notice",driverNotices:"Driver notices",newDriverNotice:"New vehicle notice",noticeType:"Notice type",noticePriority:"Priority",noticeStatus:"Status",noticeCreated:"Notice created",noticeOpen:"Open",noticeProgress:"In progress",noticeDone:"Done",oilChange:"Oil change required",serviceDue:"Service due",tireProblem:"Tire problem",brakeProblem:"Brake problem",lightingProblem:"Lighting defect",huTuvNotice:"HU/TÜV notice",spNotice:"SP notice",tachoNotice:"Tachograph check notice",otherVehicleNotice:"Other vehicle notice",takeOverNotice:"Take over order",finishNotice:"Complete notice",driverNoticeSaved:"Driver notice saved and sent to workshop",workshopDriverNotices:"Driver notices in workshop dashboard"}
 };
 ["tr","pl","ro","ru","uk","ar"].forEach(function(l){p[l]=Object.assign({},p.en,MASTER_I18N[l]||{})});
 Object.keys(p).forEach(function(l){MASTER_I18N[l]=Object.assign(MASTER_I18N[l]||{},p[l])});
})();

/* STORAGE FOR DRIVER NOTICES */
function ensureDriverNotices(){
 S.driverNotices = S.driverNotices || mLoad("fc_v1811_driver_notices",[]);
 S.workOrders = S.workOrders || mLoad("fc_v18_work_orders",[]);
 return S.driverNotices;
}
function saveDriverNotices(){
 localStorage.setItem("fc_v1811_driver_notices",JSON.stringify(S.driverNotices||[]));
 localStorage.setItem("fc_v18_work_orders",JSON.stringify(S.workOrders||[]));
}
function noticePriority(type){
 if(/brake|Bremse|Bremsen/i.test(type))return "critical";
 if(/tire|Reifen|lighting|Beleuchtung/i.test(type))return "high";
 if(/damage|Schaden|HU|TÜV|SP|Tacho|oil|Öl|service/i.test(type))return "medium";
 return "low";
}
function priorityText(p){return p==="critical"?"🔴 Kritisch":p==="high"?"🟠 Hoch":p==="medium"?"🟡 Mittel":"🟢 Niedrig";}
function noticeStatusText(s){return s==="progress"?mt("noticeProgress"):s==="done"?mt("noticeDone"):mt("noticeOpen");}
function currentVehicleForNotice(){
 var v=(S.vehicles||[]).find(function(x){return Number(x.id)===Number(S.activeVehicle)});
 if(v)return v;
 return (S.vehicles||[]).find(function(x){return S.user&&Number(x.assigned)===Number(S.user.id)}) || null;
}
function noticeVehicleLabel(v){
 if(typeof safeVehicleLabel==="function")return safeVehicleLabel(v);
 if(typeof cleanVehicleLabel==="function")return cleanVehicleLabel(v);
 return v?((v.name||"")+" "+(v.plate||"")).trim():"";
}
function createWorkshopOrderFromNotice(n){
 S.workOrders=S.workOrders||[];
 var exists=S.workOrders.find(function(o){return Number(o.driverNoticeId)===Number(n.id)});
 if(exists)return exists;
 var o={id:Date.now()+7,driverNoticeId:n.id,category:"driverNotice",title:mt("driverNotice")+" · "+n.typeLabel,description:n.description,vehicleId:n.vehicleId||null,vehicle:n.vehicleLabel||"",driver:n.driver,driverName:n.driverName,mechanic:"",status:"open",priority:n.priority,parts:"",laborHours:"",estimateCost:0,estimateDuration:"",created:n.created,source:"driver",comments:[],photos:n.photo?[n.photo]:[]};
 S.workOrders.unshift(o);
 return o;
}
function saveDriverNotice(){
 ensureDriverNotices();
 var type=(document.getElementById("dnType")||{}).value||"damage";
 var sel=document.getElementById("dnType");
 var typeLabel=sel&&sel.selectedOptions&&sel.selectedOptions[0]?sel.selectedOptions[0].textContent:type;
 var desc=((document.getElementById("dnDesc")||{}).value||"").trim();
 var manual=((document.getElementById("dnManualVehicle")||{}).value||"").trim();
 var fileEl=document.getElementById("dnPhoto");
 var photo=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";
 var v=currentVehicleForNotice();
 var vehicleLabel=manual || noticeVehicleLabel(v);
 if(!vehicleLabel||!desc){alert(mt("required"));return}
 var n={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicleId:v?v.id:null,vehicleLabel:vehicleLabel,plate:v?(v.plate||""):"",type:type,typeLabel:typeLabel,description:desc,photo:photo,created:new Date().toLocaleString(),status:"open",priority:noticePriority(type),updatedBy:S.user?S.user.name:""};
 S.driverNotices.unshift(n);
 createWorkshopOrderFromNotice(n);
 saveDriverNotices();
 saveAll();
 alert(mt("driverNoticeSaved"));
 render();
}
function setDriverNoticeStatus(id,status){
 ensureDriverNotices();
 var n=(S.driverNotices||[]).find(function(x){return Number(x.id)===Number(id)});
 if(!n)return;
 if(!work()&&!admin()&&!isDashboardRole()&&Number(n.driver)!==Number(S.user&&S.user.id)){alert(mt("notAllowed"));return}
 n.status=status;n.updated=new Date().toLocaleString();n.updatedBy=S.user?S.user.name:"";
 var o=(S.workOrders||[]).find(function(w){return Number(w.driverNoticeId)===Number(id)});
 if(o)o.status=status==="done"?"done":status;
 saveDriverNotices();saveAll();render();
}
function driverNoticeForm(){
 return `<section class="card driverNoticeForm"><h2>${mt("newDriverNotice")}</h2>
 <label>${mt("noticeType")}<select id="dnType">
  <option value="damage">${mt("reportDamageClean")}</option><option value="oil">${mt("oilChange")}</option><option value="service">${mt("serviceDue")}</option><option value="tire">${mt("tireProblem")}</option><option value="brake">${mt("brakeProblem")}</option><option value="lighting">${mt("lightingProblem")}</option><option value="hu">${mt("huTuvNotice")}</option><option value="sp">${mt("spNotice")}</option><option value="tacho">${mt("tachoNotice")}</option><option value="other">${mt("otherVehicleNotice")}</option>
 </select></label>
 <label>${mt("manualVehicleClean")}<input id="dnManualVehicle" placeholder="z. B. MAN TGX DU-MH-123"></label>
 <label>${mt("description")}<textarea id="dnDesc" placeholder="${mt("description")}"></textarea></label>
 <label>${mt("photo")}<input id="dnPhoto" type="file" accept="image/*,.pdf"></label>
 <button onclick="saveDriverNotice()">💾 ${mt("save")}</button></section>`;
}
function driverNoticesList(){
 ensureDriverNotices();
 var list=(admin()||isDashboardRole()||work()) ? S.driverNotices : S.driverNotices.filter(function(n){return Number(n.driver)===Number(S.user&&S.user.id)});
 return `<section class="card"><h2>${mt("driverNotices")}</h2>${list.map(function(n){var actions=(work()||admin()||isDashboardRole())?`<div class="noticeActions"><button onclick="setDriverNoticeStatus(${n.id},'progress')">${mt("takeOverNotice")}</button><button onclick="setDriverNoticeStatus(${n.id},'done')">${mt("finishNotice")}</button></div>`:"";return `<div class="driverNoticeItem"><b>${n.typeLabel}</b><small>${n.created} · ${n.driverName||"-"} · ${n.vehicleLabel||"-"}</small><p>${n.description||""}</p><p>${priorityText(n.priority)} · ${noticeStatusText(n.status)}</p>${n.photo?`<p>📎 ${n.photo}</p>`:""}${actions}</div>`;}).join("")||'<p class="muted">-</p>'}</section>`;
}
function driverNoticesPage(){return shell(`<h1 class="sectionTitle">${mt("driverNotices")}</h1>${driverNoticeForm()}${driverNoticesList()}`);}

/* DAMAGE REPORT ALSO CREATES WORKSHOP ORDER */
var FC_OLD_SAVE_DAMAGE_V1811_CLEAN = typeof saveDamage==="function" ? saveDamage : null;
function saveDamage(){
 if(FC_OLD_SAVE_DAMAGE_V1811_CLEAN)FC_OLD_SAVE_DAMAGE_V1811_CLEAN();
 try{
   ensureDriverNotices();
   var vehicle=(document.getElementById("dVehicle")||{}).value || (currentVehicleForNotice()?noticeVehicleLabel(currentVehicleForNotice()):"");
   var desc=((document.getElementById("dDesc")||{}).value||"").trim();
   var pos=((document.getElementById("dPosition")||{}).value||"").trim();
   var fileEl=document.getElementById("dPhoto");
   var photo=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";
   if(vehicle||desc){
     var n={id:Date.now()+3,driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicleId:S.activeVehicle||null,vehicleLabel:vehicle,type:"damage",typeLabel:mt("reportDamageClean"),description:(pos?pos+" · ":"")+desc,photo:photo,created:new Date().toLocaleString(),status:"open",priority:"medium",updatedBy:S.user?S.user.name:""};
     S.driverNotices.unshift(n);createWorkshopOrderFromNotice(n);saveDriverNotices();
   }
 }catch(e){}
}

/* WORK ORDERS PAGE WITH DRIVER NOTICES, WITHOUT WRAPPING OLD FUNCTIONS */
function workOrdersPage(){
 if(typeof workshopDataInit==="function")workshopDataInit();
 ensureDriverNotices();
 var form=(work()||admin())?`<section class="card"><h2>${mt('newWorkOrder')}</h2><select id="woVehicle">${typeof workVehiclesOptions==="function"?workVehiclesOptions():""}</select><input id="woTitle" placeholder="${mt('orderTitle')}"><textarea id="woDesc" placeholder="${t('description')}"></textarea><input id="woMechanic" placeholder="${mt('assignedMechanic')}"><input id="woParts" placeholder="${mt('parts')}"><input id="woHours" type="number" step="0.25" placeholder="${mt('laborHours')}"><textarea id="woSign" placeholder="${mt('mechanicSignature')}"></textarea><button onclick="addWorkOrder()">${mt('createOrder')}</button></section>`:"";
 var orderHtml=(S.workOrders||[]).map(function(o){return typeof workOrderCard==="function"?workOrderCard(o):`<div class="workItem"><b>${o.title}</b><small>${o.vehicle||""} · ${o.status||""}</small></div>`}).join("")||'<p class="muted">-</p>';
 return shell(`<h1 class="sectionTitle">${mt("workOrders")}</h1>${form}<section class="card"><h2>${mt("workOrders")}</h2>${orderHtml}</section><section class="card"><h2>${mt("workshopDriverNotices")}</h2>${driverNoticesList()}</section>`);
}

/* SETTINGS MENU WITH DRIVER NOTICES */
function more(){
 var buttons='';
 buttons+=`<button onclick="go('driverNotices')">🛠 ${mt("driverNotices")} <span>›</span></button>`;
 buttons+=`<button onclick="go('trailerMeetings')">🔁 ${mt("trailerMeetings")} <span>›</span></button>`;
 buttons+=`<button onclick="go('license')">🪪 ${mt("scanLicense")} <span>›</span></button>`;
 buttons+=`<button onclick="go('documents')">📂 ${mt("documentFolderClean")} <span>›</span></button>`;
 if(admin()||isDashboardRole())buttons+=`<button onclick="go('drivers')">👤 ${mt("driverFiles")} <span>›</span></button>`;
 if(typeof canSeeWorkshopInsight==="function"&&canSeeWorkshopInsight())buttons+=`<button onclick="go('workshopInsight')">🔧 ${mt("workshopInsight")} <span>›</span></button>`;
 if(admin()||work())buttons+=`<button onclick="go('vehicleHistory')">📁 ${mt("vehicleHistory")} <span>›</span></button><button onclick="go('workOrders')">🔧 ${mt("workOrders")} <span>›</span></button><button onclick="go('parts')">📦 ${mt("partsInventory")} <span>›</span></button>`;
 if(isDeputyRole()||admin()||work()||isDashboardRole())buttons+=`<button onclick="go('pdfArchive')">📄 ${mt("pdfArchiveMain")} <span>›</span></button>`;
 return shell(`<section class="rolePhone settingsPanel"><div class="phoneGreeting"><span>${t("settings")}</span></div><h2>${t("settings")}</h2><label>${t("language")}<select onchange="setLang(this.value)">${LANG.map(function(l){return `<option value="${l[0]}" ${S.lang===l[0]?"selected":""}>${l[1]}</option>`}).join("")}</select></label><div class="settingsList">${buttons}</div><button class="logoutAction" onclick="logout()">↩ ${t("logout")}</button></section>`);
}

/* FINAL RENDER WITHOUT RECURSION */
function render(){
 masterNormalizeUsers();
 if(typeof workshopDataInit==="function")workshopDataInit();
 if(typeof ensurePdfArchive==="function")ensurePdfArchive();
 ensureDriverNotices();
 if(document&&document.body&&document.body.classList)document.body.classList.toggle("dark",S.theme==="dark");
 var routes={home:home,vehicles:vehicles,check:check,report:report,more:more,status:statusPage,points:pointsPage,safety:safetyPage,notifications:notificationsPage,license:licensePage,fleetlive:fleetLivePage,maintenance:maintenancePage,costs:costsPage,documents:documentsPage,ranking:rankingPage,damageSummary:damageSummaryPage,damageBonus:damageBonusPage,aiDamage:aiDamagePage,aiTraining:aiTrainingPage,pdfArchive:deputyPdfArchivePage,settings:more,workOrders:workOrdersPage,parts:partsPage,workCalendar:workCalendarPage,vehicleHistory:vehicleHistoryPage,workCosts:workCostsPage,workshopInsight:managementWorkshopInsightPage,driverFile:function(){return driverFilePage(S.selectedDriverId)},drivers:driversPage,trailerMeetings:trailerMeetingsPage,driverNotices:driverNoticesPage};
 var root=document.getElementById("root");
 if(!root)return;
 if(!S.user){root.innerHTML=loginView();return}
 root.innerHTML=(routes[S.tab]||home)();
 setTimeout(function(){if(S.tab==="check"&&typeof initSig==="function")initSig()},50);
}
ensureDriverNotices();
fcV1811ApplyUsers();


/* === FLEETCONTROL MASTER RELEASE AB AUTHORITATIVE CORE === */
(function(){
"use strict";
const FC_STORAGE={session:"fc_release_session",tab:"fc_release_tab",lang:"fc_v17_lang",users:"fc_release_users",vehicles:"fc_release_vehicles",docs:"fc_release_docs",driverNotices:"fc_release_driver_notices",workOrders:"fc_release_work_orders"};
function fcLoad(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}}
function fcSave(k,v){localStorage.setItem(k,JSON.stringify(v))}
function fcNow(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"})}
function fcNorm(v){return String(v||"").trim().toLowerCase()}
function fcVehicleLabel(v){if(!v)return"";const n=String(v.name||v.vehicle||"").trim(),p=String(v.plate||v.licensePlate||"").trim();return n&&p&&!n.includes(p)?n+" · "+p:(n||p||String(v.manualText||"").trim())}
function fcCurrentVehicle(){return (S.vehicles||[]).find(v=>Number(v.id)===Number(S.activeVehicle))||(S.vehicles||[]).find(v=>S.user&&Number(v.assigned)===Number(S.user.id))||null}
const FC_USERS=[
{id:101,name:"Hidir Daglioglu",login:"Hidir Daglioglu",pass:"Wassermelonen",role:"boss",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
{id:102,name:"Sascha",login:"Sascha",pass:"Fuhrpark",role:"deputy",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
{id:103,name:"Marcel",login:"Marcel",pass:"Fuhrpark",role:"fleet",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
{id:104,name:"Tamara",login:"Tamara",pass:"Fuhrpark",role:"boss",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
{id:105,name:"Werkstatt",login:"Werkstatt",pass:"Eisbecher",role:"workshop",extraRoles:["workshop"],points:0,status:"online"},
{id:201,name:"Fahrer 01",login:"Fahrer01",pass:"Fahrer2026",role:"driver",extraRoles:[],points:85,status:"unterwegs"},
{id:202,name:"Fahrer 02",login:"Fahrer02",pass:"Fahrer2026",role:"driver",extraRoles:[],points:70,status:"unterwegs"}];
function fcNormalizeUsers(){
 S.users=Array.isArray(S.users)?S.users:[];
 FC_USERS.forEach(f=>{
  let ex=S.users.find(u=>{
   const s=fcNorm((u.login||"")+" "+(u.name||""));
   return fcNorm(u.login)===fcNorm(f.login)||fcNorm(u.name)===fcNorm(f.name)||(f.id===101&&/chef|hidir|klos/.test(s))||(f.id===102&&/sascha/.test(s))||(f.id===103&&/marcel|hoppe/.test(s))||(f.id===104&&/tamara/.test(s));
  });
  if(ex)Object.assign(ex,f); else S.users.push({...f});
 });
 fcSave(FC_STORAGE.users,S.users);return S.users;
}
function fcEnsure(){
 fcNormalizeUsers();
 S.vehicles=Array.isArray(S.vehicles)?S.vehicles:fcLoad(FC_STORAGE.vehicles,[]);
 S.docs=Array.isArray(S.docs)?S.docs:fcLoad(FC_STORAGE.docs,[]);
 S.driverNotices=Array.isArray(S.driverNotices)?S.driverNotices:fcLoad(FC_STORAGE.driverNotices,[]);
 S.workOrders=Array.isArray(S.workOrders)?S.workOrders:fcLoad(FC_STORAGE.workOrders,[]);
 return S;
}
function fcSaveAll(){
 fcSave(FC_STORAGE.users,S.users||[]);fcSave(FC_STORAGE.vehicles,S.vehicles||[]);fcSave(FC_STORAGE.docs,S.docs||[]);fcSave(FC_STORAGE.driverNotices,S.driverNotices||[]);fcSave(FC_STORAGE.workOrders,S.workOrders||[]);
 if(S.user)fcSave(FC_STORAGE.session,{id:S.user.id,login:S.user.login});
 if(S.tab)fcSave(FC_STORAGE.tab,S.tab);
}
window.masterNormalizeUsers=fcNormalizeUsers;
window.mExtra=r=>!!(S.user&&Array.isArray(S.user.extraRoles)&&S.user.extraRoles.includes(r));
window.isPureDriver=()=>!!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||!S.user.extraRoles.length));
window.isDashboardRole=()=>!!(S.user&&!isPureDriver()&&(["boss","fleet","deputy","admin","developer"].includes(S.user.role)||mExtra("management")||mExtra("boss")||mExtra("fleet")||mExtra("deputy")));
window.admin=()=>!!(S.user&&!isPureDriver()&&(["boss","fleet","admin","developer"].includes(S.user.role)||mExtra("management")||mExtra("boss")||mExtra("fleet")));
window.work=()=>!!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||admin()));
window.isDeputyRole=()=>!!(S.user&&!isPureDriver()&&(S.user.role==="deputy"||mExtra("deputy")));
window.canAwardPoints=()=>!!(admin()||isDashboardRole());
window.canEditDriverFile=()=>!!(admin()||isDashboardRole()||isDeputyRole());
function fcCanManage(){return !!(admin()||isDashboardRole()||isDeputyRole())}
function fcCanWorkshop(){return !!(work()||fcCanManage())}

window.login=function(e){
 if(e&&e.preventDefault)e.preventDefault();
 fcNormalizeUsers();
 const name=(document.getElementById("loginName")||{}).value||"",pass=(document.getElementById("loginPass")||{}).value||"";
 const u=FC_USERS.find(x=>fcNorm(x.login)===fcNorm(name)&&String(x.pass)===String(pass));
 if(!u){const err=document.getElementById("loginError");if(err){err.textContent=t("loginFailed")||"Login fehlgeschlagen";err.style.display="block"}return false}
 S.user={...u,lastLogin:fcNow()};S.tab=fcLoad(FC_STORAGE.tab,"home")||"home";if(S.tab==="login")S.tab="home";fcSaveAll();render();return true;
};
window.logout=function(){localStorage.removeItem(FC_STORAGE.session);S.user=null;S.tab="home";render()};
window.go=function(tab){S.tab=tab;fcSave(FC_STORAGE.tab,tab);render()};

(function(){
 if(Array.isArray(window.LANG)){window.LANG=LANG.filter(x=>x[0]!=="nl");if(!LANG.find(x=>x[0]==="ar"))LANG.push(["ar","العربية"])}
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 const de={loginFailed:"Login fehlgeschlagen",required:"Bitte alle Pflichtfelder ausfüllen.",notAllowed:"Keine Berechtigung",save:"Speichern",description:"Beschreibung",photo:"Foto",driverNotice:"Fahrzeugmeldung",driverNotices:"Fahrermeldungen",newDriverNotice:"Neue Fahrzeugmeldung",noticeType:"Meldungstyp",oilChange:"Ölwechsel erforderlich",serviceDue:"Service fällig",tireProblem:"Reifenproblem",brakeProblem:"Bremsenproblem",lightingProblem:"Beleuchtung defekt",huTuvNotice:"HU/TÜV Hinweis",spNotice:"SP Hinweis",tachoNotice:"Tachoprüfung Hinweis",otherVehicleNotice:"Sonstige Fahrzeugmeldung",noticeOpen:"Offen",noticeProgress:"In Bearbeitung",noticeDone:"Erledigt",takeOverNotice:"Auftrag übernehmen",finishNotice:"Meldung abschließen",driverNoticeSaved:"Fahrermeldung gespeichert und automatisch an die Werkstatt übertragen",workshopDriverNotices:"Fahrermeldungen im Werkstatt-Dashboard",manualVehicleClean:"Fahrzeug / Kennzeichen manuell eintragen",reportDamageClean:"Schaden melden",workOrders:"Arbeitsaufträge"};
 const en={loginFailed:"Login failed",required:"Please complete all required fields.",notAllowed:"Not authorized",save:"Save",description:"Description",photo:"Photo",driverNotice:"Vehicle notice",driverNotices:"Driver notices",newDriverNotice:"New vehicle notice",noticeType:"Notice type",oilChange:"Oil change required",serviceDue:"Service due",tireProblem:"Tire problem",brakeProblem:"Brake problem",lightingProblem:"Lighting defect",huTuvNotice:"HU/TÜV notice",spNotice:"SP notice",tachoNotice:"Tachograph check notice",otherVehicleNotice:"Other vehicle notice",noticeOpen:"Open",noticeProgress:"In progress",noticeDone:"Done",takeOverNotice:"Take over order",finishNotice:"Complete notice",driverNoticeSaved:"Driver notice saved and automatically sent to workshop",workshopDriverNotices:"Driver notices in workshop dashboard",manualVehicleClean:"Enter vehicle / plate manually",reportDamageClean:"Report damage",workOrders:"Work orders"};
 const ar={loginFailed:"فشل تسجيل الدخول",required:"يرجى ملء جميع الحقول المطلوبة.",notAllowed:"لا توجد صلاحية",save:"حفظ",description:"الوصف",photo:"الصورة",driverNotice:"بلاغ المركبة",driverNotices:"بلاغات السائقين",newDriverNotice:"بلاغ مركبة جديد",noticeType:"نوع البلاغ",oilChange:"يلزم تغيير الزيت",serviceDue:"الصيانة مستحقة",tireProblem:"مشكلة في الإطارات",brakeProblem:"مشكلة في الفرامل",lightingProblem:"عطل في الإضاءة",huTuvNotice:"تنبيه الفحص الفني",spNotice:"تنبيه SP",tachoNotice:"تنبيه فحص التاكوغراف",otherVehicleNotice:"بلاغ مركبة آخر",noticeOpen:"مفتوح",noticeProgress:"قيد المعالجة",noticeDone:"منجز",takeOverNotice:"استلام الطلب",finishNotice:"إنهاء البلاغ",driverNoticeSaved:"تم حفظ البلاغ وإرساله تلقائياً إلى الورشة",workshopDriverNotices:"بلاغات السائقين في لوحة الورشة",manualVehicleClean:"إدخال المركبة / اللوحة يدوياً",reportDamageClean:"الإبلاغ عن ضرر",workOrders:"أوامر العمل"};
 ["de","en","tr","pl","ro","ru","uk","ar"].forEach(lang=>{MASTER_I18N[lang]=Object.assign({},en,MASTER_I18N[lang]||{},lang==="de"?de:{},lang==="ar"?ar:{})});
})();
window.t=window.mt=function(key){let lang=S.lang||fcLoad(FC_STORAGE.lang,"de")||"de";if(typeof lang==="string"&&lang.charAt(0)==='"'){try{lang=JSON.parse(lang)}catch(e){}}if(lang==="nl")lang="ar";return (MASTER_I18N[lang]&&MASTER_I18N[lang][key])||(MASTER_I18N.de&&MASTER_I18N.de[key])||(MASTER_I18N.en&&MASTER_I18N.en[key])||String(key).replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase())};
window.setLang=function(lang){if(lang==="nl")lang="ar";S.lang=lang;fcSave(FC_STORAGE.lang,lang);document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";render()};

function fcNoticePriority(type){if(/brake|bremse/i.test(type))return"critical";if(/tire|reifen|lighting|beleuchtung/i.test(type))return"high";if(/damage|schaden|hu|tüv|sp|tacho|oil|öl|service/i.test(type))return"medium";return"low"}
function fcPriorityText(p){return p==="critical"?"🔴 Kritisch":p==="high"?"🟠 Hoch":p==="medium"?"🟡 Mittel":"🟢 Niedrig"}
function fcStatusText(s){return s==="progress"?t("noticeProgress"):s==="done"?t("noticeDone"):t("noticeOpen")}
function fcCreateWorkOrder(n){const ex=(S.workOrders||[]).find(o=>Number(o.driverNoticeId)===Number(n.id));if(ex)return ex;const o={id:Date.now()+13,driverNoticeId:n.id,category:"driverNotice",title:`${t("driverNotice")} · ${n.typeLabel}`,description:n.description,vehicleId:n.vehicleId||null,vehicle:n.vehicleLabel||"",driver:n.driver,driverName:n.driverName,status:"open",priority:n.priority,source:"driver",created:n.created,parts:"",laborHours:"",comments:[],photos:n.photo?[n.photo]:[]};S.workOrders.unshift(o);return o}
window.saveDriverNotice=function(){
 fcEnsure();
 const typeEl=document.getElementById("dnType"),type=(typeEl||{}).value||"damage",typeLabel=typeEl&&typeEl.selectedOptions&&typeEl.selectedOptions[0]?typeEl.selectedOptions[0].textContent:type;
 const desc=((document.getElementById("dnDesc")||{}).value||"").trim(),manual=((document.getElementById("dnManualVehicle")||{}).value||"").trim(),fileEl=document.getElementById("dnPhoto"),photo=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";
 const v=fcCurrentVehicle(),vehicle=manual||fcVehicleLabel(v);
 if(!vehicle||!desc){alert(t("required"));return}
 const n={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicleId:v?v.id:null,vehicleLabel:vehicle,plate:v?(v.plate||""):"",type,typeLabel,description:desc,photo,created:fcNow(),status:"open",priority:fcNoticePriority(type),updatedBy:S.user?S.user.name:""};
 S.driverNotices.unshift(n);fcCreateWorkOrder(n);fcSaveAll();alert(t("driverNoticeSaved"));render();
};
window.setDriverNoticeStatus=function(id,status){
 fcEnsure();const n=(S.driverNotices||[]).find(x=>Number(x.id)===Number(id));if(!n)return;
 if(!fcCanWorkshop()&&Number(n.driver)!==Number(S.user&&S.user.id)){alert(t("notAllowed"));return}
 n.status=status;n.updated=fcNow();n.updatedBy=S.user?S.user.name:"";
 const o=(S.workOrders||[]).find(x=>Number(x.driverNoticeId)===Number(id));if(o)o.status=status==="done"?"done":status;
 fcSaveAll();render();
};
function fcDriverNoticeForm(){return `<section class="card driverNoticeForm"><h2>${t("newDriverNotice")}</h2><label>${t("noticeType")}<select id="dnType"><option value="damage">${t("reportDamageClean")}</option><option value="oil">${t("oilChange")}</option><option value="service">${t("serviceDue")}</option><option value="tire">${t("tireProblem")}</option><option value="brake">${t("brakeProblem")}</option><option value="lighting">${t("lightingProblem")}</option><option value="hu">${t("huTuvNotice")}</option><option value="sp">${t("spNotice")}</option><option value="tacho">${t("tachoNotice")}</option><option value="other">${t("otherVehicleNotice")}</option></select></label><label>${t("manualVehicleClean")}<input id="dnManualVehicle" placeholder="z. B. MAN TGX DU-MH-123"></label><label>${t("description")}<textarea id="dnDesc"></textarea></label><label>${t("photo")}<input id="dnPhoto" type="file" accept="image/*,.pdf"></label><button onclick="saveDriverNotice()">💾 ${t("save")}</button></section>`}
function fcDriverNoticeList(){const list=fcCanWorkshop()?S.driverNotices:S.driverNotices.filter(n=>Number(n.driver)===Number(S.user&&S.user.id));return `<section class="card"><h2>${t("driverNotices")}</h2>${list.map(n=>{const actions=fcCanWorkshop()?`<div class="noticeActions"><button onclick="setDriverNoticeStatus(${n.id},'progress')">${t("takeOverNotice")}</button><button onclick="setDriverNoticeStatus(${n.id},'done')">${t("finishNotice")}</button></div>`:"";return `<div class="driverNoticeItem"><b>${n.typeLabel}</b><small>${n.created} · ${n.driverName||"-"} · ${n.vehicleLabel||"-"}</small><p>${n.description||""}</p><p>${fcPriorityText(n.priority)} · ${fcStatusText(n.status)}</p>${n.photo?`<p>📎 ${n.photo}</p>`:""}${actions}</div>`}).join("")||'<p class="muted">-</p>'}</section>`}
window.driverNoticesPage=function(){return shell(`<h1 class="sectionTitle">${t("driverNotices")}</h1>${isPureDriver()?fcDriverNoticeForm():""}${fcDriverNoticeList()}`)};
window.workOrdersPage=function(){fcEnsure();const orders=(S.workOrders||[]).map(o=>`<div class="driverNoticeItem"><b>${o.title||"-"}</b><small>${o.created||""} · ${o.driverName||""} · ${o.vehicle||""}</small><p>${o.description||""}</p><p>${fcPriorityText(o.priority)} · ${fcStatusText(o.status)}</p></div>`).join("")||'<p class="muted">-</p>';return shell(`<h1 class="sectionTitle">${t("workOrders")}</h1><section class="card"><h2>${t("workOrders")}</h2>${orders}</section><section class="card"><h2>${t("workshopDriverNotices")}</h2>${fcDriverNoticeList()}</section>`)};
const oldMore=window.more;window.more=function(){let html=typeof oldMore==="function"?oldMore():shell('<section class="settingsList"></section>');const button=`<button onclick="go('driverNotices')">🛠 ${t("driverNotices")} <span>›</span></button>`;if(!html.includes("driverNotices"))html=html.replace('<div class="settingsList">','<div class="settingsList">'+button);return html};
window.render=function(){fcEnsure();if(document.documentElement){document.documentElement.lang=S.lang||"de";document.documentElement.dir=S.lang==="ar"?"rtl":"ltr"}if(document.body&&document.body.classList)document.body.classList.toggle("dark",S.theme==="dark");const root=document.getElementById("root");if(!root)return;if(!S.user){root.innerHTML=loginView();return}const routes={home:window.home,vehicles:window.vehicles,check:window.check,report:window.report,more:window.more,settings:window.more,status:window.statusPage,points:window.pointsPage,safety:window.safetyPage,notifications:window.notificationsPage,license:window.licensePage,fleetlive:window.fleetLivePage,maintenance:window.maintenancePage,costs:window.costsPage,documents:window.documentsPage,ranking:window.rankingPage,damageSummary:window.damageSummaryPage,damageBonus:window.damageBonusPage,aiDamage:window.aiDamagePage,aiTraining:window.aiTrainingPage,pdfArchive:window.deputyPdfArchivePage,workOrders:window.workOrdersPage,parts:window.partsPage,workCalendar:window.workshopCalendarPage,vehicleHistory:window.vehicleHistoryPage,workCosts:window.workCostsPage,workshopInsight:window.managementWorkshopInsightPage,driverFile:()=>window.driverFilePage?window.driverFilePage(S.selectedDriverId):shell(""),drivers:window.driversPage,trailerMeetings:window.trailerMeetingsPage,driverNotices:window.driverNoticesPage};const page=routes[S.tab]||routes.home;root.innerHTML=typeof page==="function"?page():shell("");setTimeout(()=>{if(S.tab==="check"&&typeof initSig==="function")initSig()},50)};
window.fcReleaseAB={users:FC_USERS,storage:FC_STORAGE,ensure:fcEnsure,save:fcSaveAll};
fcEnsure();
const session=fcLoad(FC_STORAGE.session,null)||fcLoad("fc_v17_session_user",null);
if(session&&!S.user){const u=FC_USERS.find(x=>Number(x.id)===Number(session.id)||fcNorm(x.login)===fcNorm(session.login));if(u)S.user={...u}}
})();


/* === FLEETCONTROL MASTER V19 RELEASE STABLE CORE === */
(function(){
"use strict";

const FCV19_STORAGE={
 session:"fc_v19_session",tab:"fc_v19_tab",lang:"fc_v17_lang",
 users:"fc_v19_users",vehicles:"fc_v19_vehicles",docs:"fc_v19_docs",
 driverNotices:"fc_v19_driver_notices",workOrders:"fc_v19_work_orders",
 pdfArchive:"fc_v19_pdf_archive",workshopArchive:"fc_v19_workshop_archive",
 licenseArchive:"fc_v19_license_archive",trailerMeetings:"fc_v19_trailer_meetings"
};
const FCV19_USERS=[
 {id:101,name:"Hidir Daglioglu",login:"Hidir Daglioglu",pass:"Wassermelonen",role:"boss",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
 {id:102,name:"Sascha",login:"Sascha",pass:"Fuhrpark",role:"deputy",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
 {id:103,name:"Marcel",login:"Marcel",pass:"Fuhrpark",role:"fleet",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
 {id:104,name:"Tamara",login:"Tamara",pass:"Fuhrpark",role:"boss",extraRoles:["boss","fleet","deputy","management"],points:0,status:"online"},
 {id:105,name:"Werkstatt",login:"Werkstatt",pass:"Eisbecher",role:"workshop",extraRoles:["workshop"],points:0,status:"online"},
 {id:201,name:"Fahrer 01",login:"Fahrer01",pass:"Fahrer2026",role:"driver",extraRoles:[],points:85,status:"unterwegs"},
 {id:202,name:"Fahrer 02",login:"Fahrer02",pass:"Fahrer2026",role:"driver",extraRoles:[],points:70,status:"unterwegs"}
];

function v19Load(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}}
function v19Save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function v19Now(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"})}
function v19Date(){return new Date().toLocaleDateString("de-DE",{timeZone:"Europe/Berlin"})}
function v19Norm(v){return String(v||"").trim().toLowerCase()}
function v19Plate(v){return String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"")}
function v19Get(id){return document.getElementById(id)}
function v19Val(id){return ((v19Get(id)||{}).value||"").trim()}
function v19File(id){const el=v19Get(id);return el&&el.files&&el.files[0]?el.files[0].name:""}
function v19ById(list,id){return (list||[]).find(x=>Number(x.id)===Number(id))}
function v19VehicleLabel(v){
 if(!v)return "";
 const n=String(v.name||v.vehicle||v.model||"").trim();
 const p=String(v.plate||v.licensePlate||v.kennzeichen||"").trim();
 return n&&p&&!n.includes(p)?n+" · "+p:(n||p||String(v.manualText||"").trim());
}
function v19CurrentVehicle(){
 return (S.vehicles||[]).find(v=>Number(v.id)===Number(S.activeVehicle)) ||
        (S.vehicles||[]).find(v=>S.user&&Number(v.assigned)===Number(S.user.id)) || null;
}
function v19EnsureArray(key,store){
 if(!Array.isArray(S[key]))S[key]=v19Load(store,[]);
 return S[key];
}
function v19NormalizeUsers(){
 S.users=Array.isArray(S.users)?S.users:[];
 FCV19_USERS.forEach(f=>{
  let ex=S.users.find(u=>{
   const s=v19Norm((u.login||"")+" "+(u.name||""));
   return v19Norm(u.login)===v19Norm(f.login)||v19Norm(u.name)===v19Norm(f.name)||
    (f.id===101&&/chef|hidir|klos/.test(s))||(f.id===102&&/sascha/.test(s))||
    (f.id===103&&/marcel|hoppe/.test(s))||(f.id===104&&/tamara/.test(s));
  });
  if(ex)Object.assign(ex,f);else S.users.push({...f});
 });
 v19Save(FCV19_STORAGE.users,S.users);
 return S.users;
}
function v19Ensure(){
 v19NormalizeUsers();
 v19EnsureArray("vehicles",FCV19_STORAGE.vehicles);
 v19EnsureArray("docs",FCV19_STORAGE.docs);
 v19EnsureArray("driverNotices",FCV19_STORAGE.driverNotices);
 v19EnsureArray("workOrders",FCV19_STORAGE.workOrders);
 v19EnsureArray("pdfArchive",FCV19_STORAGE.pdfArchive);
 v19EnsureArray("workshopPdfArchive",FCV19_STORAGE.workshopArchive);
 v19EnsureArray("licensePdfArchive",FCV19_STORAGE.licenseArchive);
 v19EnsureArray("trailerMeetings",FCV19_STORAGE.trailerMeetings);
 return S;
}
function v19SaveAll(){
 v19Save(FCV19_STORAGE.users,S.users||[]);
 v19Save(FCV19_STORAGE.vehicles,S.vehicles||[]);
 v19Save(FCV19_STORAGE.docs,S.docs||[]);
 v19Save(FCV19_STORAGE.driverNotices,S.driverNotices||[]);
 v19Save(FCV19_STORAGE.workOrders,S.workOrders||[]);
 v19Save(FCV19_STORAGE.pdfArchive,S.pdfArchive||[]);
 v19Save(FCV19_STORAGE.workshopArchive,S.workshopPdfArchive||[]);
 v19Save(FCV19_STORAGE.licenseArchive,S.licensePdfArchive||[]);
 v19Save(FCV19_STORAGE.trailerMeetings,S.trailerMeetings||[]);
 if(S.user)v19Save(FCV19_STORAGE.session,{id:S.user.id,login:S.user.login});
 if(S.tab)v19Save(FCV19_STORAGE.tab,S.tab);
}

/* Roles */
window.masterNormalizeUsers=v19NormalizeUsers;
window.mExtra=r=>!!(S.user&&Array.isArray(S.user.extraRoles)&&S.user.extraRoles.includes(r));
window.isPureDriver=()=>!!(S.user&&S.user.role==="driver"&&(!S.user.extraRoles||!S.user.extraRoles.length));
window.isDashboardRole=()=>!!(S.user&&!isPureDriver()&&(["boss","fleet","deputy","admin","developer"].includes(S.user.role)||mExtra("management")||mExtra("boss")||mExtra("fleet")||mExtra("deputy")));
window.admin=()=>!!(S.user&&!isPureDriver()&&(["boss","fleet","admin","developer"].includes(S.user.role)||mExtra("management")||mExtra("boss")||mExtra("fleet")));
window.work=()=>!!(S.user&&!isPureDriver()&&(S.user.role==="workshop"||mExtra("workshop")||admin()));
window.isDeputyRole=()=>!!(S.user&&!isPureDriver()&&(S.user.role==="deputy"||mExtra("deputy")));
window.canAwardPoints=()=>!!(admin()||isDashboardRole());
window.canEditDriverFile=()=>!!(admin()||isDashboardRole()||isDeputyRole());
function v19CanManage(){return !!(admin()||isDashboardRole()||isDeputyRole())}
function v19CanWorkshop(){return !!(work()||v19CanManage())}

/* Login */
window.login=function(e){
 if(e&&e.preventDefault)e.preventDefault();
 v19NormalizeUsers();
 const name=v19Val("loginName"),pass=v19Val("loginPass");
 const u=FCV19_USERS.find(x=>v19Norm(x.login)===v19Norm(name)&&String(x.pass)===String(pass));
 if(!u){
  const err=v19Get("loginError");
  if(err){err.textContent=t("loginFailed")||"Login fehlgeschlagen";err.style.display="block"}
  return false;
 }
 S.user={...u,lastLogin:v19Now()};
 S.tab=v19Load(FCV19_STORAGE.tab,"home")||"home";
 if(S.tab==="login")S.tab="home";
 v19SaveAll();render();return true;
};
window.logout=function(){localStorage.removeItem(FCV19_STORAGE.session);localStorage.removeItem("fc_v17_session_user");S.user=null;S.tab="home";render()};
window.go=function(tab){S.tab=tab;v19Save(FCV19_STORAGE.tab,tab);render()};

/* i18n */
(function(){
 if(Array.isArray(window.LANG)){
  window.LANG=LANG.filter(x=>x[0]!=="nl");
  if(!LANG.find(x=>x[0]==="ar"))LANG.push(["ar","العربية"]);
 }
 if(typeof MASTER_I18N==="undefined")window.MASTER_I18N={de:{}};
 const de={loginFailed:"Login fehlgeschlagen",required:"Bitte alle Pflichtfelder ausfüllen.",notAllowed:"Keine Berechtigung",save:"Speichern",edit:"Bearbeiten",delete:"Löschen",settings:"Einstellungen",language:"Sprache",logout:"Abmelden",description:"Beschreibung",photo:"Foto",driverNotice:"Fahrzeugmeldung",driverNotices:"Fahrermeldungen",newDriverNotice:"Neue Fahrzeugmeldung",noticeType:"Meldungstyp",oilChange:"Ölwechsel erforderlich",serviceDue:"Service fällig",tireProblem:"Reifenproblem",brakeProblem:"Bremsenproblem",lightingProblem:"Beleuchtung defekt",huTuvNotice:"HU/TÜV Hinweis",spNotice:"SP Hinweis",tachoNotice:"Tachoprüfung Hinweis",otherVehicleNotice:"Sonstige Fahrzeugmeldung",noticeOpen:"Offen",noticeProgress:"In Bearbeitung",noticeDone:"Erledigt",takeOverNotice:"Auftrag übernehmen",finishNotice:"Meldung abschließen",driverNoticeSaved:"Fahrermeldung gespeichert und automatisch an die Werkstatt übertragen",workshopDriverNotices:"Fahrermeldungen im Werkstatt-Dashboard",manualVehicleClean:"Fahrzeug / Kennzeichen manuell eintragen",reportDamageClean:"Schaden melden",workOrders:"Arbeitsaufträge",driverFile:"Fahrerakte",driverFiles:"Fahrerakten",editDriverFile:"Fahrerakte bearbeiten",saveDriverFile:"Fahrerakte speichern",driverFileSaved:"Fahrerakte gespeichert",vehicleFile:"Fahrzeugakte",saveVehicleFile:"Fahrzeugakte speichern",vehicleFileSaved:"Fahrzeugakte gespeichert",licensePlate:"Kennzeichen",pdfArchiveMain:"PDF-Archiv",documentFolderClean:"Dokumentenmappe",trailerMeetings:"Auflieger-Treffpunkte",scanLicense:"Führerschein einscannen",departureCheck:"Abfahrtskontrolle",points:"Punkte"};
 const en={...de,loginFailed:"Login failed",required:"Please complete all required fields.",notAllowed:"Not authorized",save:"Save",edit:"Edit",delete:"Delete",settings:"Settings",language:"Language",logout:"Logout",description:"Description",photo:"Photo",driverNotice:"Vehicle notice",driverNotices:"Driver notices",newDriverNotice:"New vehicle notice",noticeType:"Notice type",oilChange:"Oil change required",serviceDue:"Service due",tireProblem:"Tire problem",brakeProblem:"Brake problem",lightingProblem:"Lighting defect",huTuvNotice:"HU/TÜV notice",spNotice:"SP notice",tachoNotice:"Tachograph check notice",otherVehicleNotice:"Other vehicle notice",noticeOpen:"Open",noticeProgress:"In progress",noticeDone:"Done",takeOverNotice:"Take over order",finishNotice:"Complete notice",driverNoticeSaved:"Driver notice saved and automatically sent to workshop",workshopDriverNotices:"Driver notices in workshop dashboard",manualVehicleClean:"Enter vehicle / plate manually",reportDamageClean:"Report damage",workOrders:"Work orders",driverFile:"Driver file",driverFiles:"Driver files",editDriverFile:"Edit driver file",saveDriverFile:"Save driver file",driverFileSaved:"Driver file saved",vehicleFile:"Vehicle file",saveVehicleFile:"Save vehicle file",vehicleFileSaved:"Vehicle file saved",licensePlate:"License plate",pdfArchiveMain:"PDF archive",documentFolderClean:"Document folder",trailerMeetings:"Trailer meeting points",scanLicense:"Scan driving license",departureCheck:"Departure check",points:"Points"};
 const ar={loginFailed:"فشل تسجيل الدخول",required:"يرجى ملء جميع الحقول المطلوبة.",notAllowed:"لا توجد صلاحية",save:"حفظ",edit:"تعديل",delete:"حذف",settings:"الإعدادات",language:"اللغة",logout:"تسجيل الخروج",description:"الوصف",photo:"الصورة",driverNotice:"بلاغ المركبة",driverNotices:"بلاغات السائقين",newDriverNotice:"بلاغ مركبة جديد",noticeType:"نوع البلاغ",oilChange:"يلزم تغيير الزيت",serviceDue:"الصيانة مستحقة",tireProblem:"مشكلة في الإطارات",brakeProblem:"مشكلة في الفرامل",lightingProblem:"عطل في الإضاءة",huTuvNotice:"تنبيه الفحص الفني",spNotice:"تنبيه SP",tachoNotice:"تنبيه فحص التاكوغراف",otherVehicleNotice:"بلاغ مركبة آخر",noticeOpen:"مفتوح",noticeProgress:"قيد المعالجة",noticeDone:"منجز",takeOverNotice:"استلام الطلب",finishNotice:"إنهاء البلاغ",driverNoticeSaved:"تم حفظ البلاغ وإرساله تلقائياً إلى الورشة",workshopDriverNotices:"بلاغات السائقين في لوحة الورشة",manualVehicleClean:"إدخال المركبة / اللوحة يدوياً",reportDamageClean:"الإبلاغ عن ضرر",workOrders:"أوامر العمل",driverFile:"ملف السائق",driverFiles:"ملفات السائقين",editDriverFile:"تعديل ملف السائق",saveDriverFile:"حفظ ملف السائق",driverFileSaved:"تم حفظ ملف السائق",vehicleFile:"ملف المركبة",saveVehicleFile:"حفظ ملف المركبة",vehicleFileSaved:"تم حفظ ملف المركبة",licensePlate:"رقم اللوحة",pdfArchiveMain:"أرشيف PDF",documentFolderClean:"ملف المستندات",trailerMeetings:"نقاط لقاء المقطورة",scanLicense:"مسح رخصة القيادة",departureCheck:"فحص الانطلاق",points:"النقاط"};
 ["de","en","tr","pl","ro","ru","uk","ar"].forEach(lang=>{MASTER_I18N[lang]=Object.assign({},en,MASTER_I18N[lang]||{},lang==="de"?de:{},lang==="ar"?ar:{})});
})();
window.t=window.mt=function(key){
 let lang=S.lang||v19Load(FCV19_STORAGE.lang,"de")||"de";
 if(typeof lang==="string"&&lang.charAt(0)==='"'){try{lang=JSON.parse(lang)}catch(e){}}
 if(lang==="nl")lang="ar";
 return (MASTER_I18N[lang]&&MASTER_I18N[lang][key])||(MASTER_I18N.de&&MASTER_I18N.de[key])||(MASTER_I18N.en&&MASTER_I18N.en[key])||String(key).replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());
};
window.setLang=function(lang){if(lang==="nl")lang="ar";S.lang=lang;v19Save(FCV19_STORAGE.lang,lang);document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";render()};

/* Vehicle file */
window.saveVehicleFile=function(id){
 if(!v19CanManage()&&!work()){alert(t("notAllowed"));return}
 v19Ensure();
 const name=v19Val("vfName"),plate=v19Val("vfPlate");
 if(!name||!plate){alert(t("required"));return}
 let v=id?v19ById(S.vehicles,id):null;
 if(!v){v={id:Date.now(),created:v19Now()};S.vehicles.unshift(v)}
 Object.assign(v,{name,plate,type:v19Val("vfType"),assigned:Number(v19Val("vfAssigned")||0)||null,hu:v19Val("vfHu"),tuv:v19Val("vfHu"),sp:v19Val("vfSp"),tacho:v19Val("vfTacho"),tireCheck:v19Val("vfTire"),brakeCheck:v19Val("vfBrake"),oilService:v19Val("vfOil"),nextService:v19Val("vfService"),vin:v19Val("vfVin"),mileage:v19Val("vfMileage"),firstRegistration:v19Val("vfFirstReg"),insurance:v19Val("vfInsurance"),notes:v19Val("vfNotes")});
 v19SaveAll();alert(t("vehicleFileSaved"));render();
};

/* Driver file */
window.saveDriverFile=function(id){
 if(!canEditDriverFile()){alert(t("notAllowed"));return}
 v19Ensure();const d=v19ById(S.users,id);if(!d)return;
 const map={dfName:"name",dfEmployeeNo:"employeeNo",dfPhone:"phone",dfEmail:"email",dfLocation:"location",dfEntryDate:"entryDate",dfDepartment:"department",dfLicenseClasses:"licenseClasses",dfLicenseValidUntil:"licenseValidUntil",dfDriverCardNumber:"driverCardNumber",dfDriverCardValidUntil:"driverCardValidUntil"};
 Object.keys(map).forEach(k=>{const el=v19Get(k);if(el)d[map[k]]=el.value||""});
 const vehId=Number(v19Val("dfVehicle")||0);
 (S.vehicles||[]).forEach(v=>{if(Number(v.assigned)===Number(id))v.assigned=null});
 if(vehId){const v=v19ById(S.vehicles,vehId);if(v)v.assigned=id}
 v19SaveAll();alert(t("driverFileSaved"));S.selectedDriverId=id;render();
};

/* Docs visibility */
window.fcDocsForUser=function(){
 v19Ensure();
 if(v19CanManage()||work())return S.docs||[];
 const v=v19CurrentVehicle();const p=v19Plate(v&&(v.plate||v.licensePlate));
 return (S.docs||[]).filter(d=>Number(d.driver)===Number(S.user&&S.user.id)||v19Plate(d.plate||d.vehiclePlate)===p||v19Plate(d.vehicle||d.vehicleLabel).includes(p));
};

/* Notices -> workshop */
function v19Priority(type){if(/brake|bremse/i.test(type))return"critical";if(/tire|reifen|lighting|beleuchtung/i.test(type))return"high";if(/damage|schaden|hu|tüv|sp|tacho|oil|öl|service/i.test(type))return"medium";return"low"}
function v19PriorityText(p){return p==="critical"?"🔴 Kritisch":p==="high"?"🟠 Hoch":p==="medium"?"🟡 Mittel":"🟢 Niedrig"}
function v19StatusText(s){return s==="progress"?t("noticeProgress"):s==="done"?t("noticeDone"):t("noticeOpen")}
function v19CreateWorkOrder(n){
 const ex=(S.workOrders||[]).find(o=>Number(o.driverNoticeId)===Number(n.id));if(ex)return ex;
 const o={id:Date.now()+19,driverNoticeId:n.id,category:"driverNotice",title:`${t("driverNotice")} · ${n.typeLabel}`,description:n.description,vehicleId:n.vehicleId||null,vehicle:n.vehicleLabel||"",driver:n.driver,driverName:n.driverName,status:"open",priority:n.priority,source:"driver",created:n.created,parts:"",laborHours:"",comments:[],photos:n.photo?[n.photo]:[]};
 S.workOrders.unshift(o);return o;
}
window.saveDriverNotice=function(){
 v19Ensure();
 const typeEl=v19Get("dnType"),type=(typeEl||{}).value||"damage",typeLabel=typeEl&&typeEl.selectedOptions&&typeEl.selectedOptions[0]?typeEl.selectedOptions[0].textContent:type;
 const desc=v19Val("dnDesc"),manual=v19Val("dnManualVehicle"),photo=v19File("dnPhoto");
 const v=v19CurrentVehicle(),vehicle=manual||v19VehicleLabel(v);
 if(!vehicle||!desc){alert(t("required"));return}
 const n={id:Date.now(),driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicleId:v?v.id:null,vehicleLabel:vehicle,plate:v?(v.plate||""):"",type,typeLabel,description:desc,photo,created:v19Now(),status:"open",priority:v19Priority(type),updatedBy:S.user?S.user.name:""};
 S.driverNotices.unshift(n);v19CreateWorkOrder(n);v19SaveAll();alert(t("driverNoticeSaved"));render();
};
window.setDriverNoticeStatus=function(id,status){
 v19Ensure();const n=(S.driverNotices||[]).find(x=>Number(x.id)===Number(id));if(!n)return;
 if(!v19CanWorkshop()&&Number(n.driver)!==Number(S.user&&S.user.id)){alert(t("notAllowed"));return}
 n.status=status;n.updated=v19Now();n.updatedBy=S.user?S.user.name:"";
 const o=(S.workOrders||[]).find(x=>Number(x.driverNoticeId)===Number(id));if(o)o.status=status==="done"?"done":status;
 v19SaveAll();render();
};
function v19NoticeForm(){return `<section class="card driverNoticeForm"><h2>${t("newDriverNotice")}</h2><label>${t("noticeType")}<select id="dnType"><option value="damage">${t("reportDamageClean")}</option><option value="oil">${t("oilChange")}</option><option value="service">${t("serviceDue")}</option><option value="tire">${t("tireProblem")}</option><option value="brake">${t("brakeProblem")}</option><option value="lighting">${t("lightingProblem")}</option><option value="hu">${t("huTuvNotice")}</option><option value="sp">${t("spNotice")}</option><option value="tacho">${t("tachoNotice")}</option><option value="other">${t("otherVehicleNotice")}</option></select></label><label>${t("manualVehicleClean")}<input id="dnManualVehicle" placeholder="z. B. MAN TGX DU-MH-123"></label><label>${t("description")}<textarea id="dnDesc"></textarea></label><label>${t("photo")}<input id="dnPhoto" type="file" accept="image/*,.pdf"></label><button onclick="saveDriverNotice()">💾 ${t("save")}</button></section>`}
function v19NoticeList(){
 const list=v19CanWorkshop()?S.driverNotices:S.driverNotices.filter(n=>Number(n.driver)===Number(S.user&&S.user.id));
 return `<section class="card"><h2>${t("driverNotices")}</h2>${list.map(n=>{const actions=v19CanWorkshop()?`<div class="noticeActions"><button onclick="setDriverNoticeStatus(${n.id},'progress')">${t("takeOverNotice")}</button><button onclick="setDriverNoticeStatus(${n.id},'done')">${t("finishNotice")}</button></div>`:"";return `<div class="driverNoticeItem"><b>${n.typeLabel}</b><small>${n.created} · ${n.driverName||"-"} · ${n.vehicleLabel||"-"}</small><p>${n.description||""}</p><p>${v19PriorityText(n.priority)} · ${v19StatusText(n.status)}</p>${n.photo?`<p>📎 ${n.photo}</p>`:""}${actions}</div>`}).join("")||'<p class="muted">-</p>'}</section>`;
}
window.driverNoticesPage=function(){return shell(`<h1 class="sectionTitle">${t("driverNotices")}</h1>${isPureDriver()?v19NoticeForm():""}${v19NoticeList()}`)};

const oldDamage=window.saveDamage;
window.saveDamage=function(){
 if(typeof oldDamage==="function")oldDamage();
 try{
  v19Ensure();const vehicle=v19Val("dVehicle")||v19VehicleLabel(v19CurrentVehicle()),desc=v19Val("dDesc"),pos=v19Val("dPosition"),photo=v19File("dPhoto");
  if(vehicle||desc){const n={id:Date.now()+5,driver:S.user?S.user.id:null,driverName:S.user?S.user.name:"",vehicleId:S.activeVehicle||null,vehicleLabel:vehicle,type:"damage",typeLabel:t("reportDamageClean"),description:(pos?pos+" · ":"")+desc,photo,created:v19Now(),status:"open",priority:"medium"};S.driverNotices.unshift(n);v19CreateWorkOrder(n);v19SaveAll()}
 }catch(e){}
};

window.workOrdersPage=function(){
 v19Ensure();const orders=(S.workOrders||[]).map(o=>`<div class="driverNoticeItem"><b>${o.title||"-"}</b><small>${o.created||""} · ${o.driverName||""} · ${o.vehicle||""}</small><p>${o.description||""}</p><p>${v19PriorityText(o.priority)} · ${v19StatusText(o.status)}</p></div>`).join("")||'<p class="muted">-</p>';
 return shell(`<h1 class="sectionTitle">${t("workOrders")}</h1><section class="card"><h2>${t("workOrders")}</h2>${orders}</section><section class="card"><h2>${t("workshopDriverNotices")}</h2>${v19NoticeList()}</section>`);
};

const oldMore=window.more;
window.more=function(){
 let html=typeof oldMore==="function"?oldMore():shell('<section class="settingsList"></section>');
 const button=`<button onclick="go('driverNotices')">🛠 ${t("driverNotices")} <span>›</span></button>`;
 if(!html.includes("driverNotices"))html=html.replace('<div class="settingsList">','<div class="settingsList">'+button);
 return html;
};

/* Final router */
window.render=function(){
 v19Ensure();
 if(document.documentElement){document.documentElement.lang=S.lang||"de";document.documentElement.dir=S.lang==="ar"?"rtl":"ltr"}
 if(document.body&&document.body.classList)document.body.classList.toggle("dark",S.theme==="dark");
 const root=document.getElementById("root");if(!root)return;
 if(!S.user){root.innerHTML=loginView();return}
 const routes={home:window.home,vehicles:window.vehicles,check:window.check,report:window.report,more:window.more,settings:window.more,status:window.statusPage,points:window.pointsPage,safety:window.safetyPage,notifications:window.notificationsPage,license:window.licensePage,fleetlive:window.fleetLivePage,maintenance:window.maintenancePage,costs:window.costsPage,documents:window.documentsPage,ranking:window.rankingPage,damageSummary:window.damageSummaryPage,damageBonus:window.damageBonusPage,aiDamage:window.aiDamagePage,aiTraining:window.aiTrainingPage,pdfArchive:window.deputyPdfArchivePage,workOrders:window.workOrdersPage,parts:window.partsPage,workCalendar:window.workshopCalendarPage,vehicleHistory:window.vehicleHistoryPage,workCosts:window.workCostsPage,workshopInsight:window.managementWorkshopInsightPage,driverFile:()=>window.driverFilePage?window.driverFilePage(S.selectedDriverId):shell(""),drivers:window.driversPage,trailerMeetings:window.trailerMeetingsPage,driverNotices:window.driverNoticesPage};
 const page=routes[S.tab]||routes.home;root.innerHTML=typeof page==="function"?page():shell("");
 setTimeout(()=>{if(S.tab==="check"&&typeof initSig==="function")initSig()},50);
};
window.fcV19={users:FCV19_USERS,storage:FCV19_STORAGE,ensure:v19Ensure,save:v19SaveAll};
v19Ensure();
const sess=v19Load(FCV19_STORAGE.session,null)||v19Load("fc_v17_session_user",null);
if(sess&&!S.user){const u=FCV19_USERS.find(x=>Number(x.id)===Number(sess.id)||v19Norm(x.login)===v19Norm(sess.login));if(u)S.user={...u}}
})();


/* === FLEETCONTROL PHASE 2.1 CLEAN LOGIN ROLES CORE === */
(function(){
"use strict";

/*
  PHASE 2.1 CLEAN CORE
  Scope:
  - zentrale Benutzerliste
  - zentrale Rollenprofile
  - zentrale Rechteprüfung
  - eine autoritative Login-Funktion
  - eine autoritative Session-Funktion
  - Login immer Home
  - Login-Sprache immer Deutsch
  - Kompatibilitätsfunktionen für alte Module
*/

const FC21_STORAGE = {
  session: "fc21_session",
  tab: "fc21_tab",
  lang: "fc_v17_lang",
  activeVehicle: "fc21_active_vehicle",
  users: "fc21_users"
};

const FC21_USERS = [
  {
    id:101,
    name:"Hidir Daglioglu",
    login:"Hidir Daglioglu",
    pass:"Wassermelonen",
    role:"boss",
    displayRole:"Chef",
    permissions:["dashboard","management","drivers","driverEdit","vehicles","vehicleEdit","documents","archives","workshopView","workshopManage","points","assignVehicle"]
  },
  {
    id:104,
    name:"Tamara",
    login:"Tamara",
    pass:"Fuhrpark",
    role:"management",
    displayRole:"Management",
    permissions:["dashboard","management","drivers","driverEdit","vehicles","vehicleEdit","documents","archives","workshopView","workshopManage","points","assignVehicle"]
  },
  {
    id:102,
    name:"Sascha",
    login:"Sascha",
    pass:"Fuhrpark",
    role:"deputy",
    displayRole:"Stellvertretung",
    permissions:["dashboard","management","drivers","driverEdit","vehicles","vehicleEdit","documents","archives","workshopView","workshopManage","points","assignVehicle"]
  },
  {
    id:103,
    name:"Marcel",
    login:"Marcel",
    pass:"Fuhrpark",
    role:"fleet",
    displayRole:"Fuhrparkmanagement",
    permissions:["dashboard","management","drivers","driverEdit","vehicles","vehicleEdit","documents","archives","workshopView","workshopManage","points","assignVehicle"]
  },
  {
    id:105,
    name:"Werkstatt",
    login:"Werkstatt",
    pass:"Eisbecher",
    role:"workshop",
    displayRole:"Werkstatt",
    permissions:["dashboard","workshopView","workshopManage","vehicles","archives"]
  },
  {
    id:201,
    name:"Fahrer 01",
    login:"Fahrer01",
    pass:"Fahrer2026",
    role:"driver",
    displayRole:"Fahrer",
    permissions:["dashboard","driverOwn","check","damageReport","documentsOwn","licenseOwn","trailerMeetingsOwn"]
  },
  {
    id:202,
    name:"Fahrer 02",
    login:"Fahrer02",
    pass:"Fahrer2026",
    role:"driver",
    displayRole:"Fahrer",
    permissions:["dashboard","driverOwn","check","damageReport","documentsOwn","licenseOwn","trailerMeetingsOwn"]
  }
];

function fc21Load(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  }catch(e){
    return fallback;
  }
}
function fc21Save(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
}
function fc21Norm(v){
  return String(v || "").trim().toLowerCase();
}
function fc21Now(){
  return new Date().toLocaleString("de-DE", {timeZone:"Europe/Berlin"});
}
function fc21CloneUser(u){
  return {
    id:u.id,
    name:u.name,
    login:u.login,
    pass:u.pass,
    role:u.role,
    displayRole:u.displayRole,
    permissions:[...(u.permissions || [])],
    extraRoles: fc21ExtraRolesFor(u.role),
    points:u.points || 0,
    status:u.status || "online",
    lastLogin:u.lastLogin || ""
  };
}
function fc21ExtraRolesFor(role){
  if(["boss","management","deputy","fleet"].includes(role)) return ["boss","fleet","deputy","management"];
  if(role === "workshop") return ["workshop"];
  return [];
}
function fc21FindUser(loginName, password){
  return FC21_USERS.find(u => fc21Norm(u.login) === fc21Norm(loginName) && String(u.pass) === String(password));
}
function fc21NormalizeUsers(){
  if(!window.S) window.S = {};
  S.users = Array.isArray(S.users) ? S.users : [];
  FC21_USERS.forEach(core => {
    let existing = S.users.find(u => {
      const hay = fc21Norm((u.login || "") + " " + (u.name || ""));
      return fc21Norm(u.login) === fc21Norm(core.login) ||
             fc21Norm(u.name) === fc21Norm(core.name) ||
             (core.id === 101 && /chef|hidir|klos/.test(hay)) ||
             (core.id === 102 && /sascha/.test(hay)) ||
             (core.id === 103 && /marcel|hoppe/.test(hay)) ||
             (core.id === 104 && /tamara/.test(hay));
    });
    const clean = fc21CloneUser(core);
    if(existing) Object.assign(existing, clean);
    else S.users.push(clean);
  });
  fc21Save(FC21_STORAGE.users, S.users);
  return S.users;
}
function fc21UserHas(permission){
  if(!S || !S.user) return false;
  const perms = Array.isArray(S.user.permissions) ? S.user.permissions : [];
  return perms.includes(permission);
}
function fc21IsManagement(){
  return !!(S && S.user && ["boss","management","deputy","fleet"].includes(S.user.role));
}
function fc21IsWorkshop(){
  return !!(S && S.user && S.user.role === "workshop");
}
function fc21IsDriver(){
  return !!(S && S.user && S.user.role === "driver");
}
function fc21ApplyLoginDefaults(){
  S.lang = "de";
  S.tab = "home";
  fc21Save(FC21_STORAGE.lang, "de");
  fc21Save(FC21_STORAGE.tab, "home");
  // legacy compatibility keys
  fc21Save("fc_v17_lang", "de");
  fc21Save("fc_v17_session_tab", "home");
  fc21Save("fc_v19_tab", "home");
  fc21Save("fc_release_tab", "home");
  if(document && document.documentElement){
    document.documentElement.lang = "de";
    document.documentElement.dir = "ltr";
  }
}
function fc21CreateSession(user){
  const session = {
    id:user.id,
    login:user.login,
    role:user.role,
    name:user.name,
    createdAt:fc21Now(),
    activeVehicle:S.activeVehicle || fc21Load(FC21_STORAGE.activeVehicle, null)
  };
  fc21Save(FC21_STORAGE.session, session);
  fc21Save("fc_v17_session_user", {id:user.id, login:user.login});
  fc21Save("fc_v19_session", {id:user.id, login:user.login});
  fc21Save("fc_release_session", {id:user.id, login:user.login});
  return session;
}
function fc21RestoreSession(){
  fc21NormalizeUsers();
  const session = fc21Load(FC21_STORAGE.session, null) || fc21Load("fc_v17_session_user", null) || fc21Load("fc_v19_session", null);
  if(!session) return null;
  const core = FC21_USERS.find(u => Number(u.id) === Number(session.id) || fc21Norm(u.login) === fc21Norm(session.login));
  if(!core) return null;
  S.user = fc21CloneUser(core);
  S.activeVehicle = session.activeVehicle || fc21Load(FC21_STORAGE.activeVehicle, S.activeVehicle || null);
  S.tab = fc21Load(FC21_STORAGE.tab, "home") || "home";
  S.lang = fc21Load(FC21_STORAGE.lang, "de") || "de";
  if(S.tab === "login") S.tab = "home";
  return S.user;
}
function fc21Login(loginName, password){
  fc21NormalizeUsers();
  const core = fc21FindUser(loginName, password);
  if(!core) return null;
  const user = fc21CloneUser(core);
  user.lastLogin = fc21Now();
  S.user = user;
  fc21ApplyLoginDefaults();
  fc21CreateSession(user);
  fc21Save(FC21_STORAGE.users, S.users);
  return user;
}
function fc21Logout(){
  try{
    localStorage.removeItem(FC21_STORAGE.session);
    localStorage.removeItem("fc_v17_session_user");
    localStorage.removeItem("fc_v19_session");
    localStorage.removeItem("fc_release_session");
  }catch(e){}
  S.user = null;
  S.tab = "home";
}

/* public clean core */
window.fc21Core = {
  version:"2.1",
  users:FC21_USERS,
  storage:FC21_STORAGE,
  normalizeUsers:fc21NormalizeUsers,
  restoreSession:fc21RestoreSession,
  login:fc21Login,
  logout:fc21Logout,
  has:fc21UserHas,
  isManagement:fc21IsManagement,
  isWorkshop:fc21IsWorkshop,
  isDriver:fc21IsDriver
};

/* compatibility API for old modules */
window.masterNormalizeUsers = fc21NormalizeUsers;
window.restoreSession = fc21RestoreSession;
window.mExtra = function(role){
  if(!S || !S.user || !Array.isArray(S.user.extraRoles)) return false;
  return S.user.extraRoles.includes(role);
};
window.isPureDriver = function(){ return fc21IsDriver(); };
window.isDashboardRole = function(){ return fc21IsManagement(); };
window.admin = function(){ return fc21IsManagement(); };
window.work = function(){ return fc21IsWorkshop() || fc21IsManagement(); };
window.isDeputyRole = function(){ return !!(S && S.user && (S.user.role === "deputy" || fc21IsManagement())); };
window.canAwardPoints = function(){ return fc21UserHas("points"); };
window.canEditDriverFile = function(){ return fc21UserHas("driverEdit"); };
window.canManageWorkshopInsight = function(){ return fc21UserHas("workshopManage") || fc21UserHas("workshopView"); };
window.canSeeWorkshopInsight = function(){ return fc21UserHas("workshopView") || fc21UserHas("workshopManage"); };
window.canApproveAiDamage = function(){ return fc21IsManagement(); };
window.canManageWorkshop = function(){ return fc21UserHas("workshopManage"); };

window.login = function(e){
  if(e && e.preventDefault) e.preventDefault();
  const loginInput = document.getElementById("loginName");
  const passInput = document.getElementById("loginPass");
  const err = document.getElementById("loginError");
  const loginName = loginInput ? loginInput.value : "";
  const password = passInput ? passInput.value : "";
  const user = fc21Login(loginName, password);
  if(!user){
    if(err){
      err.textContent = "Login fehlgeschlagen";
      err.style.display = "block";
    }
    return false;
  }
  if(typeof render === "function") render();
  return true;
};
window.logout = function(){
  fc21Logout();
  if(typeof render === "function") render();
};
window.go = function(tab){
  S.tab = tab || "home";
  fc21Save(FC21_STORAGE.tab, S.tab);
  if(typeof render === "function") render();
};
window.setLang = function(lang){
  if(lang === "nl") lang = "ar";
  S.lang = lang || "de";
  fc21Save(FC21_STORAGE.lang, S.lang);
  fc21Save("fc_v17_lang", S.lang);
  if(document && document.documentElement){
    document.documentElement.lang = S.lang;
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  }
  if(typeof render === "function") render();
};

/* boot normalization only, no forced render */
fc21NormalizeUsers();
if(!S.user) fc21RestoreSession();

})();


/* === FLEETCONTROL PHASE 2.2 DASHBOARD NAVIGATION CORE === */
(function(){
"use strict";
function fc22Save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function fc22Load(k,f){try{let r=localStorage.getItem(k);return r?JSON.parse(r):f}catch(e){return f}}
function fc22Driver(){return !!(S.user&&S.user.role==="driver")}
function fc22Workshop(){return !!(S.user&&S.user.role==="workshop")}
function fc22Mgmt(){return !!(S.user&&["boss","management","deputy","fleet"].includes(S.user.role))}
function fc22Time(){return new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Berlin"})}
function fc22Date(){return new Date().toLocaleDateString("de-DE",{timeZone:"Europe/Berlin"})}
function fc22Greeting(){let h=parseInt(new Date().toLocaleString("de-DE",{hour:"numeric",hour12:false,timeZone:"Europe/Berlin"}),10);if(h>=5&&h<11)return"Guten Morgen";if(h>=11&&h<17)return"Guten Tag";if(h>=17&&h<22)return"Guten Abend";return"Gute Nacht"}
function fc22RoleTitle(){if(!S.user)return"";return S.user.displayRole||(S.user.role==="driver"?"Fahrer":S.user.role==="workshop"?"Werkstatt":S.user.role==="fleet"?"Fuhrparkmanagement":S.user.role==="deputy"?"Stellvertretung":S.user.role==="management"?"Management":"Chef")}
function fc22Shell(content){return '<main class="fc22Main">'+content+'</main>'+fc22BottomNav()}
function fc22GreetingBlock(){return '<section class="fc22Greeting"><div><small>'+fc22Greeting()+'</small><h1>'+(S.user?(S.user.name||S.user.login):"")+'</h1><p>'+fc22RoleTitle()+'</p></div><div class="fc22Clock"><small>'+fc22Date()+'</small><b>'+fc22Time()+'</b></div></section>'}
function fc22Stats(){let v=Array.isArray(S.vehicles)?S.vehicles.length:0,n=Array.isArray(S.driverNotices)?S.driverNotices.length:0,w=Array.isArray(S.workOrders)?S.workOrders.length:0,d=Array.isArray(S.docs)?S.docs.length:0;return '<div class="fc22Stats"><div><b>'+v+'</b><small>Fahrzeuge</small></div><div><b>'+n+'</b><small>Meldungen</small></div><div><b>'+w+'</b><small>Werkstatt</small></div><div><b>'+d+'</b><small>Dokumente</small></div></div>'}
function fc22Actions(){let a=fc22Driver()? [["check","✅","Check"],["driverNotices","🛠","Melden"],["documents","📂","Dokumente"],["license","🪪","Führerschein"]] : fc22Workshop()? [["workOrders","🔧","Aufträge"],["vehicleHistory","📁","Historie"],["parts","📦","Ersatzteile"],["pdfArchive","📄","Archiv"]] : [["drivers","👤","Fahrerakten"],["vehicles","🚛","Fahrzeuge"],["workOrders","🔧","Werkstatt"],["pdfArchive","📄","Archiv"]];return '<div class="fc22Actions">'+a.map(x=>'<button onclick="go(\''+x[0]+'\')"><span>'+x[1]+'</span><b>'+x[2]+'</b></button>').join("")+'</div>'}
function fc22HomePage(){let b=fc22Driver()?"Fahrerbereich":fc22Workshop()?"Werkstattbereich":"Managementbereich";return fc22Shell(fc22GreetingBlock()+fc22Stats()+fc22Actions()+'<section class="card fc22Card"><h2>'+b+'</h2><p>Dashboard und Schnellzugriffe.</p></section>')}
function fc22BottomNav(){if(!S.user)return"";let tabs=fc22Driver()? [["home","⌂","Home"],["check","✅","Check"],["driverNotices","🛠","Melden"],["more","☰","Mehr"]] : fc22Workshop()? [["home","⌂","Home"],["workOrders","🔧","Aufträge"],["vehicleHistory","📁","Historie"],["more","☰","Mehr"]] : [["home","⌂","Home"],["vehicles","🚛","Fahrzeuge"],["driverNotices","🛠","Meldungen"],["more","☰","Mehr"]];return '<nav class="fc22BottomNav">'+tabs.map(t=>'<button class="'+(S.tab===t[0]?'active':'')+'" onclick="go(\''+t[0]+'\')"><span>'+t[1]+'</span><b>'+t[2]+'</b></button>').join("")+'</nav>'}
function fc22MorePage(){let items=fc22Driver()? [["driverNotices","🛠","Fahrermeldungen"],["trailerMeetings","🔁","Auflieger-Treffpunkte"],["license","🪪","Führerschein"],["documents","📂","Dokumentenmappe"],["points","⭐","Punkte"]] : fc22Workshop()? [["workOrders","🔧","Arbeitsaufträge"],["vehicleHistory","📁","Fahrzeughistorie"],["parts","📦","Ersatzteillager"],["pdfArchive","📄","Archiv"]] : [["drivers","👤","Fahrerakten"],["vehicles","🚛","Fahrzeugakten"],["workOrders","🔧","Werkstatt"],["documents","📂","Dokumente"],["pdfArchive","📄","PDF-Archiv"],["trailerMeetings","🔁","Auflieger-Treffpunkte"],["points","⭐","Punkte"]];items.push(["settings","⚙️","Einstellungen"]);return fc22Shell('<section class="card fc22Menu"><h2>Mehr</h2>'+items.map(i=>'<button onclick="go(\''+i[0]+'\')"><span>'+i[1]+'</span><b>'+i[2]+'</b><em>›</em></button>').join("")+'<button onclick="logout()"><span>↩</span><b>Abmelden</b><em>›</em></button></section>')}
function fc22SettingsPage(){let langs=Array.isArray(window.LANG)?window.LANG:[["de","Deutsch"],["en","English"],["ar","العربية"]];let opts=langs.map(l=>'<option value="'+l[0]+'" '+(S.lang===l[0]?'selected':'')+'>'+l[1]+'</option>').join("");return fc22Shell('<section class="card fc22Menu"><h2>Einstellungen</h2><label>Sprache<select onchange="setLang(this.value)">'+opts+'</select></label></section>')}
function fc22Wrap(name){return function(){let fn=window[name];if(typeof fn==="function"){try{let html=String(fn());return html.includes("fc22BottomNav")?html:html+fc22BottomNav()}catch(e){return fc22Shell('<section class="card"><h2>Fehler</h2><p>'+name+': '+e.message+'</p></section>')}}return fc22Shell('<section class="card"><h2>'+name+'</h2><p>Seite noch nicht verfügbar.</p></section>')}}
window.fc22Routes={home:fc22HomePage,more:fc22MorePage,settings:fc22SettingsPage,vehicles:fc22Wrap("vehicles"),check:fc22Wrap("check"),report:fc22Wrap("report"),driverNotices:fc22Wrap("driverNoticesPage"),workOrders:fc22Wrap("workOrdersPage"),vehicleHistory:fc22Wrap("vehicleHistoryPage"),parts:fc22Wrap("partsPage"),documents:fc22Wrap("documentsPage"),license:fc22Wrap("licensePage"),points:fc22Wrap("pointsPage"),drivers:fc22Wrap("driversPage"),pdfArchive:fc22Wrap("deputyPdfArchivePage"),trailerMeetings:fc22Wrap("trailerMeetingsPage"),driverFile:function(){return (typeof driverFilePage==="function"?driverFilePage(S.selectedDriverId):fc22Shell('<section class="card"><h2>Fahrerakte</h2></section>'))+fc22BottomNav()}};
window.go=function(tab){S.tab=tab||"home";fc22Save("fc21_tab",S.tab);render()};
window.render=function(){if(typeof masterNormalizeUsers==="function")masterNormalizeUsers();if(document&&document.documentElement){document.documentElement.lang=S.lang||fc22Load("fc_v17_lang","de")||"de";document.documentElement.dir=S.lang==="ar"?"rtl":"ltr"}if(document&&document.body&&document.body.classList)document.body.classList.toggle("dark",S.theme==="dark");let root=document.getElementById("root");if(!root)return;if(!S.user){root.innerHTML=typeof loginView==="function"?loginView():'<main class="fc22Main"><section class="card"><h1>Login</h1></section></main>';return}if(!S.tab||S.tab==="login")S.tab="home";let page=fc22Routes[S.tab]||fc22Routes.home;try{root.innerHTML=page()}catch(e){root.innerHTML=fc22Shell('<section class="card"><h2>Render-Fehler</h2><p>'+e.message+'</p></section>')}setTimeout(function(){if(S.tab==="check"&&typeof initSig==="function")initSig()},50)};
window.fc22Navigation={version:"2.2",routes:Object.keys(window.fc22Routes),render:window.render,go:window.go,home:fc22HomePage,bottomNav:fc22BottomNav};
})();


/* === FLEETCONTROL PHASE 2.3 TRANSLATION CORE === */
(function(){
"use strict";
const LANGS=[["de","Deutsch"],["en","English"],["tr","Türkçe"],["pl","Polski"],["ro","Română"],["ru","Русский"],["uk","Українська"],["ar","العربية"]];
const DE={home:"Home",more:"Mehr",settings:"Einstellungen",language:"Sprache",logout:"Abmelden",save:"Speichern",edit:"Bearbeiten",delete:"Löschen",back:"Zurück",required:"Bitte alle Pflichtfelder ausfüllen.",notAllowed:"Keine Berechtigung",loginFailed:"Login fehlgeschlagen",boss:"Chef",management:"Management",deputy:"Stellvertretung",fleet:"Fuhrparkmanagement",workshop:"Werkstatt",driver:"Fahrer",dashboard:"Dashboard",managementArea:"Managementbereich",workshopArea:"Werkstattbereich",driverArea:"Fahrerbereich",vehicles:"Fahrzeuge",vehicle:"Fahrzeug",vehicleFile:"Fahrzeugakte",vehicleFiles:"Fahrzeugakten",driverFile:"Fahrerakte",driverFiles:"Fahrerakten",workOrders:"Arbeitsaufträge",documents:"Dokumente",documentFolderClean:"Dokumentenmappe",archive:"Archiv",archives:"Archive",pdfArchiveMain:"PDF-Archiv",departureArchive:"Abfahrtskontrollen",workshopArchive:"Werkstatt",licenseArchive:"Führerscheine",vehicleArchive:"Fahrzeugakten",check:"Check",departureCheck:"Abfahrtskontrolle",reportDamageClean:"Schaden melden",driverNotice:"Fahrzeugmeldung",driverNotices:"Fahrermeldungen",newDriverNotice:"Neue Fahrzeugmeldung",noticeType:"Meldungstyp",oilChange:"Ölwechsel erforderlich",serviceDue:"Service fällig",tireProblem:"Reifenproblem",brakeProblem:"Bremsenproblem",lightingProblem:"Beleuchtung defekt",huTuvNotice:"HU/TÜV Hinweis",spNotice:"SP Hinweis",tachoNotice:"Tachoprüfung Hinweis",otherVehicleNotice:"Sonstige Fahrzeugmeldung",noticeOpen:"Offen",noticeProgress:"In Bearbeitung",noticeDone:"Erledigt",takeOverNotice:"Auftrag übernehmen",finishNotice:"Meldung abschließen",driverNoticeSaved:"Fahrermeldung gespeichert und automatisch an die Werkstatt übertragen",license:"Führerschein",scanLicense:"Führerschein einscannen",points:"Punkte",trailerMeetings:"Auflieger-Treffpunkte",partsInventory:"Ersatzteillager",vehicleHistory:"Fahrzeughistorie",costs:"Kosten",maintenance:"Wartung",fixedVehicleAssignment:"Feste Fahrzeugzuordnung",assignFixedVehicle:"Festes Fahrzeug zuweisen",assignedVehicles:"Zugewiesene Fahrzeuge",driverVehicleConfirmation:"Zugewiesenen Zug bestätigen",confirmAssignedVehicle:"Zug bestätigen",vehicleConfirmed:"Zug bestätigt",vehicleAssigned:"Fahrzeug wurde fest zugewiesen",noAssignedVehicle:"Kein festes Fahrzeug zugewiesen",assignmentDate:"Zuweisungsdatum",confirmedAt:"Bestätigt am",licensePlate:"Kennzeichen",description:"Beschreibung",photo:"Foto",manualVehicleClean:"Fahrzeug / Kennzeichen manuell eintragen",goodMorning:"Guten Morgen",goodDay:"Guten Tag",goodEvening:"Guten Abend",goodNight:"Gute Nacht"};
const EN=Object.assign({},DE,{more:"More",settings:"Settings",language:"Language",logout:"Logout",save:"Save",edit:"Edit",delete:"Delete",back:"Back",required:"Please complete all required fields.",notAllowed:"Not authorized",loginFailed:"Login failed",boss:"Boss",management:"Management",deputy:"Deputy",fleet:"Fleet management",workshop:"Workshop",driver:"Driver",managementArea:"Management area",workshopArea:"Workshop area",driverArea:"Driver area",vehicles:"Vehicles",vehicle:"Vehicle",vehicleFile:"Vehicle file",vehicleFiles:"Vehicle files",driverFile:"Driver file",driverFiles:"Driver files",workOrders:"Work orders",documents:"Documents",documentFolderClean:"Document folder",archive:"Archive",archives:"Archives",pdfArchiveMain:"PDF archive",departureArchive:"Departure checks",licenseArchive:"Driving licenses",vehicleArchive:"Vehicle files",departureCheck:"Departure check",reportDamageClean:"Report damage",driverNotice:"Vehicle notice",driverNotices:"Driver notices",newDriverNotice:"New vehicle notice",noticeType:"Notice type",oilChange:"Oil change required",serviceDue:"Service due",tireProblem:"Tire problem",brakeProblem:"Brake problem",lightingProblem:"Lighting defect",huTuvNotice:"HU/TÜV notice",spNotice:"SP notice",tachoNotice:"Tachograph check notice",otherVehicleNotice:"Other vehicle notice",noticeOpen:"Open",noticeProgress:"In progress",noticeDone:"Done",takeOverNotice:"Take over order",finishNotice:"Complete notice",driverNoticeSaved:"Driver notice saved and automatically sent to workshop",license:"Driving license",scanLicense:"Scan driving license",points:"Points",trailerMeetings:"Trailer meeting points",partsInventory:"Parts inventory",vehicleHistory:"Vehicle history",costs:"Costs",maintenance:"Maintenance",fixedVehicleAssignment:"Fixed vehicle assignment",assignFixedVehicle:"Assign fixed vehicle",assignedVehicles:"Assigned vehicles",driverVehicleConfirmation:"Confirm assigned vehicle",confirmAssignedVehicle:"Confirm vehicle",vehicleConfirmed:"Vehicle confirmed",vehicleAssigned:"Vehicle assigned permanently",noAssignedVehicle:"No fixed vehicle assigned",assignmentDate:"Assignment date",confirmedAt:"Confirmed at",licensePlate:"License plate",description:"Description",photo:"Photo",manualVehicleClean:"Enter vehicle / plate manually",goodMorning:"Good morning",goodDay:"Good day",goodEvening:"Good evening",goodNight:"Good night"});
const AR={home:"الرئيسية",more:"المزيد",settings:"الإعدادات",language:"اللغة",logout:"تسجيل الخروج",save:"حفظ",edit:"تعديل",delete:"حذف",back:"رجوع",required:"يرجى ملء جميع الحقول المطلوبة.",notAllowed:"لا توجد صلاحية",loginFailed:"فشل تسجيل الدخول",boss:"المدير",management:"الإدارة",deputy:"النائب",fleet:"إدارة الأسطول",workshop:"الورشة",driver:"السائق",dashboard:"لوحة التحكم",managementArea:"منطقة الإدارة",workshopArea:"منطقة الورشة",driverArea:"منطقة السائق",vehicles:"المركبات",vehicle:"المركبة",vehicleFile:"ملف المركبة",vehicleFiles:"ملفات المركبات",driverFile:"ملف السائق",driverFiles:"ملفات السائقين",workOrders:"أوامر العمل",documents:"المستندات",documentFolderClean:"ملف المستندات",archive:"الأرشيف",archives:"الأرشيفات",pdfArchiveMain:"أرشيف PDF",departureArchive:"فحوصات الانطلاق",workshopArchive:"الورشة",licenseArchive:"رخص القيادة",vehicleArchive:"ملفات المركبات",check:"الفحص",departureCheck:"فحص الانطلاق",reportDamageClean:"الإبلاغ عن ضرر",driverNotice:"بلاغ المركبة",driverNotices:"بلاغات السائقين",newDriverNotice:"بلاغ مركبة جديد",noticeType:"نوع البلاغ",oilChange:"يلزم تغيير الزيت",serviceDue:"الصيانة مستحقة",tireProblem:"مشكلة في الإطارات",brakeProblem:"مشكلة في الفرامل",lightingProblem:"عطل في الإضاءة",huTuvNotice:"تنبيه الفحص الفني",spNotice:"تنبيه SP",tachoNotice:"تنبيه فحص التاكوغراف",otherVehicleNotice:"بلاغ مركبة آخر",noticeOpen:"مفتوح",noticeProgress:"قيد المعالجة",noticeDone:"منجز",takeOverNotice:"استلام الطلب",finishNotice:"إنهاء البلاغ",driverNoticeSaved:"تم حفظ البلاغ وإرساله تلقائياً إلى الورشة",license:"رخصة القيادة",scanLicense:"مسح رخصة القيادة",points:"النقاط",trailerMeetings:"نقاط لقاء المقطورة",partsInventory:"مخزون القطع",vehicleHistory:"سجل المركبة",costs:"التكاليف",maintenance:"الصيانة",fixedVehicleAssignment:"تخصيص مركبة ثابتة",assignFixedVehicle:"تعيين مركبة ثابتة",assignedVehicles:"المركبات المخصصة",driverVehicleConfirmation:"تأكيد المركبة المخصصة",confirmAssignedVehicle:"تأكيد المركبة",vehicleConfirmed:"تم تأكيد المركبة",vehicleAssigned:"تم تخصيص المركبة بشكل ثابت",noAssignedVehicle:"لا توجد مركبة ثابتة مخصصة",assignmentDate:"تاريخ التخصيص",confirmedAt:"تم التأكيد في",licensePlate:"رقم اللوحة",description:"الوصف",photo:"الصورة",manualVehicleClean:"إدخال المركبة / اللوحة يدوياً",goodMorning:"صباح الخير",goodDay:"نهارك سعيد",goodEvening:"مساء الخير",goodNight:"تصبح على خير"};
const I18N={de:DE,en:EN,tr:EN,pl:EN,ro:EN,ru:EN,uk:EN,ar:Object.assign({},EN,AR)};
function lang(){let l="de";try{l=S&&S.lang?S.lang:JSON.parse(localStorage.getItem("fc_v17_lang")||'"de"')}catch(e){} if(l==="nl")l="ar";return I18N[l]?l:"de"}
function translate(k){let l=lang();return (I18N[l]&&I18N[l][k])||DE[k]||EN[k]||String(k).replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase())}
function dir(){let l=lang();if(document&&document.documentElement){document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}return l}
window.LANG=LANGS.slice();window.MASTER_I18N=Object.assign({},window.MASTER_I18N||{},I18N);window.fc23I18N={version:"2.3",languages:LANGS,dict:I18N,t:translate,applyDirection:dir,keys:Object.keys(DE)};window.t=window.mt=window.tt=translate;
window.setLang=function(l){if(l==="nl")l="ar";if(!I18N[l])l="de";S.lang=l;try{localStorage.setItem("fc_v17_lang",JSON.stringify(l));localStorage.setItem("fc21_lang",JSON.stringify(l))}catch(e){}dir();if(typeof render==="function")render()};
if(window.fc22Navigation){const oldRender=window.render;window.render=function(){dir();return oldRender()}}
dir();
})();


/* === FLEETCONTROL PHASE 3.1 DATA MODEL LINK CORE === */
(function(){
"use strict";

/*
  PHASE 3.1 DATA MODEL & LINK CORE
  Scope:
  - ein zentrales Datenmodell fc31Data
  - Fahrer, Fahrzeuge, Dokumente, Schäden, Werkstattaufträge, Archive, Führerscheine, Begegnungspunkte zentral verknüpfen
  - stabile ID-Erzeugung
  - automatische Werkstattaufträge aus Fahrermeldungen
  - automatische Archivierung
  - Fahrer/Fahrzeug/Dokument-Verknüpfung über IDs und Kennzeichen
  - Kompatibilität mit bestehenden Legacy-Seiten
*/

const FC31_STORAGE = {
  drivers:"fc31_drivers",
  vehicles:"fc31_vehicles",
  trailers:"fc31_trailers",
  documents:"fc31_documents",
  damages:"fc31_damages",
  driverNotices:"fc31_driver_notices",
  workOrders:"fc31_work_orders",
  archives:"fc31_archives",
  licenses:"fc31_licenses",
  meetings:"fc31_trailer_meetings",
  points:"fc31_points",
  checks:"fc31_departure_checks"
};

function fc31Now(){
  return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"});
}
function fc31DateKey(){
  return new Date().toISOString().slice(0,10);
}
function fc31Load(k,f){
  try{ const r=localStorage.getItem(k); return r?JSON.parse(r):f; }catch(e){ return f; }
}
function fc31Save(k,v){
  try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){}
}
function fc31Id(prefix){
  return prefix+"_"+Date.now()+"_"+Math.floor(Math.random()*99999);
}
function fc31Arr(name,key){
  if(!Array.isArray(S[name])) S[name]=fc31Load(key,[]);
  return S[name];
}
function fc31NormPlate(v){
  return String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
}
function fc31VehicleLabel(v){
  if(!v) return "";
  const n=String(v.name||v.vehicle||v.model||"").trim();
  const p=String(v.plate||v.licensePlate||v.kennzeichen||"").trim();
  return n&&p&&!n.includes(p)?n+" · "+p:(n||p||"");
}
function fc31DriverName(id){
  const d=(S.users||[]).find(u=>Number(u.id)===Number(id)) || (S.drivers||[]).find(u=>Number(u.id)===Number(id));
  return d ? (d.name||d.login||"") : "";
}
function fc31ById(list,id){
  return (list||[]).find(x=>String(x.id)===String(id) || Number(x.id)===Number(id));
}
function fc31CurrentDriverId(){
  return S.user && S.user.role==="driver" ? S.user.id : null;
}
function fc31CurrentVehicle(){
  return (S.vehicles||[]).find(v=>Number(v.id)===Number(S.activeVehicle)) ||
         (S.vehicles||[]).find(v=>S.user&&Number(v.assigned)===Number(S.user.id)) ||
         (S.vehicles||[]).find(v=>S.user&&Number(v.fixedDriverId)===Number(S.user.id)) || null;
}
function fc31CanManage(){
  return typeof fc21Core==="object" ? fc21Core.isManagement() : (typeof admin==="function" && admin());
}
function fc31CanWorkshop(){
  return (typeof work==="function" && work()) || fc31CanManage();
}

/* ---------- Initialization / normalization ---------- */
function fc31Ensure(){
  if(typeof masterNormalizeUsers==="function") masterNormalizeUsers();
  S.drivers = (S.users||[]).filter(u=>u.role==="driver");
  fc31Arr("vehicles",FC31_STORAGE.vehicles);
  fc31Arr("trailers",FC31_STORAGE.trailers);
  fc31Arr("docs",FC31_STORAGE.documents);
  fc31Arr("damages",FC31_STORAGE.damages);
  fc31Arr("driverNotices",FC31_STORAGE.driverNotices);
  fc31Arr("workOrders",FC31_STORAGE.workOrders);
  fc31Arr("archives",FC31_STORAGE.archives);
  fc31Arr("licenseArchive",FC31_STORAGE.licenses);
  fc31Arr("trailerMeetings",FC31_STORAGE.meetings);
  fc31Arr("pointsLog",FC31_STORAGE.points);
  fc31Arr("departureChecks",FC31_STORAGE.checks);

  // migrate older archive buckets into central archives without duplicates
  ["archive","departureArchive","workshopArchive","vehicleArchive","workshopPdfArchive"].forEach(bucket=>{
    if(Array.isArray(S[bucket])){
      S[bucket].forEach(entry=>fc31Archive(entry.category||bucket,entry,{silent:true}));
    }
  });

  // normalize vehicle-driver assignment backlinks
  (S.vehicles||[]).forEach(v=>{
    if(v.assigned && !v.fixedDriverId) v.fixedDriverId=Number(v.assigned);
    if(v.fixedDriverId && !v.assigned) v.assigned=Number(v.fixedDriverId);
    if(v.plate) v.plateKey=fc31NormPlate(v.plate);
  });

  // normalize document plate keys
  (S.docs||[]).forEach(d=>{
    d.plateKey=fc31NormPlate(d.plate||d.vehiclePlate||d.vehicle||d.vehicleLabel);
  });

  fc31SaveAll();
  return S;
}
function fc31SaveAll(){
  fc31Save(FC31_STORAGE.drivers,S.drivers||[]);
  fc31Save(FC31_STORAGE.vehicles,S.vehicles||[]);
  fc31Save(FC31_STORAGE.trailers,S.trailers||[]);
  fc31Save(FC31_STORAGE.documents,S.docs||[]);
  fc31Save(FC31_STORAGE.damages,S.damages||[]);
  fc31Save(FC31_STORAGE.driverNotices,S.driverNotices||[]);
  fc31Save(FC31_STORAGE.workOrders,S.workOrders||[]);
  fc31Save(FC31_STORAGE.archives,S.archives||[]);
  fc31Save(FC31_STORAGE.licenses,S.licenseArchive||[]);
  fc31Save(FC31_STORAGE.meetings,S.trailerMeetings||[]);
  fc31Save(FC31_STORAGE.points,S.pointsLog||[]);
  fc31Save(FC31_STORAGE.checks,S.departureChecks||[]);
  // legacy compatibility
  fc31Save("fc_v19_vehicles",S.vehicles||[]);
  fc31Save("fc_v19_driver_notices",S.driverNotices||[]);
  fc31Save("fc_v19_work_orders",S.workOrders||[]);
  fc31Save("fc_v19_pdf_archive",S.archives||[]);
  fc31Save("fc_release_vehicles",S.vehicles||[]);
  fc31Save("fc_release_driver_notices",S.driverNotices||[]);
  fc31Save("fc_release_work_orders",S.workOrders||[]);
}

/* ---------- Archive ---------- */
function fc31Archive(category,item,opt){
  fc31Arr("archives",FC31_STORAGE.archives);
  const sourceId = item && item.id ? item.id : "";
  const type = category || (item&&item.category) || "general";
  const duplicate = sourceId && S.archives.find(a=>String(a.sourceId)===String(sourceId) && a.category===type && a.status===(item.status||""));
  if(duplicate) return duplicate;

  const entry = {
    id: item.archiveId || fc31Id("arc"),
    category:type,
    sourceId:sourceId,
    title:item.title||item.typeLabel||type,
    description:item.description||item.notes||"",
    driverId:item.driverId||item.driver||null,
    driverName:item.driverName||fc31DriverName(item.driverId||item.driver)||"",
    vehicleId:item.vehicleId||null,
    vehicleLabel:item.vehicleLabel||item.vehicle||"",
    plate:item.plate||"",
    plateKey:fc31NormPlate(item.plate||item.vehicleLabel||item.vehicle),
    status:item.status||"",
    photo:item.photo||"",
    file:item.file||item.pdf||"",
    created:item.created||fc31Now(),
    archivedAt:fc31Now(),
    data:item
  };
  S.archives.unshift(entry);
  if(!opt || !opt.silent) fc31SaveAll();
  return entry;
}
window.archiveAdd=fc31Archive;

/* ---------- Driver ↔ Vehicle assignment ---------- */
function fc31AssignVehicle(driverId,vehicleId){
  if(!fc31CanManage()) { alert(t("notAllowed")); return false; }
  fc31Ensure();
  const v=fc31ById(S.vehicles,vehicleId);
  const d=(S.users||[]).find(u=>Number(u.id)===Number(driverId));
  if(!v||!d){ alert(t("required")); return false; }
  v.assigned=Number(driverId);
  v.fixedDriverId=Number(driverId);
  v.assignedDrivers=[Number(driverId)];
  v.assignmentDate=fc31Now();
  v.assignmentBy=S.user?S.user.name:"";
  v.driverConfirmed=false;
  v.driverConfirmedAt="";
  d.fixedVehicleId=Number(vehicleId);
  d.fixedVehicleLabel=fc31VehicleLabel(v);
  d.fixedVehicleAssignedAt=v.assignmentDate;
  d.fixedVehicleConfirmed=false;
  fc31Archive("vehicleAssignment",{id:fc31Id("assign"),title:t("fixedVehicleAssignment"),description:d.name+" → "+fc31VehicleLabel(v),driverId:d.id,driverName:d.name,vehicleId:v.id,vehicleLabel:fc31VehicleLabel(v),plate:v.plate});
  fc31SaveAll();
  return true;
}
function fc31ConfirmVehicle(vehicleId){
  if(!S.user||S.user.role!=="driver"){ alert(t("notAllowed")); return false; }
  fc31Ensure();
  const v=fc31ById(S.vehicles,vehicleId);
  if(!v){ alert(t("required")); return false; }
  const ok=Number(v.assigned)===Number(S.user.id)||Number(v.fixedDriverId)===Number(S.user.id)||(Array.isArray(v.assignedDrivers)&&v.assignedDrivers.map(Number).includes(Number(S.user.id)));
  if(!ok){ alert(t("notAllowed")); return false; }
  S.activeVehicle=Number(vehicleId);
  v.driverConfirmed=true;
  v.driverConfirmedAt=fc31Now();
  v.driverConfirmedBy=S.user.name;
  const d=(S.users||[]).find(u=>Number(u.id)===Number(S.user.id));
  if(d){
    d.fixedVehicleId=Number(vehicleId);
    d.fixedVehicleLabel=fc31VehicleLabel(v);
    d.fixedVehicleConfirmed=true;
    d.fixedVehicleConfirmedAt=v.driverConfirmedAt;
  }
  fc31Archive("vehicleConfirmation",{id:fc31Id("confirm"),title:t("vehicleConfirmed"),description:S.user.name+" bestätigt "+fc31VehicleLabel(v),driverId:S.user.id,driverName:S.user.name,vehicleId:v.id,vehicleLabel:fc31VehicleLabel(v),plate:v.plate});
  fc31Save("fc21_active_vehicle",S.activeVehicle);
  fc31SaveAll();
  return true;
}
window.assignFixedVehicleToDriver=fc31AssignVehicle;
window.confirmAssignedVehicle=fc31ConfirmVehicle;

/* ---------- Documents linked by plate ---------- */
function fc31DocsForUser(userId){
  fc31Ensure();
  if(fc31CanManage()||fc31CanWorkshop()) return S.docs||[];
  const driverId=userId||fc31CurrentDriverId();
  const vehicles=(S.vehicles||[]).filter(v=>Number(v.assigned)===Number(driverId)||Number(v.fixedDriverId)===Number(driverId)||Number(v.driverId)===Number(driverId));
  const keys=vehicles.map(v=>fc31NormPlate(v.plate||v.licensePlate));
  return (S.docs||[]).filter(d=>{
    const dk=fc31NormPlate(d.plate||d.vehiclePlate||d.vehicle||d.vehicleLabel);
    return Number(d.driverId||d.driver)===Number(driverId) || keys.includes(dk);
  });
}
window.fcDocsForUser=function(){return fc31DocsForUser()};
window.docsVisibleForCurrentUser=function(){return fc31DocsForUser()};

/* ---------- Damage / driver notices / work orders ---------- */
function fc31Priority(type){
  if(/brake|bremse/i.test(type)) return "critical";
  if(/tire|reifen|lighting|beleuchtung/i.test(type)) return "high";
  if(/damage|schaden|hu|tüv|sp|tacho|oil|öl|service/i.test(type)) return "medium";
  return "low";
}
function fc31CreateWorkOrder(notice){
  fc31Arr("workOrders",FC31_STORAGE.workOrders);
  const ex=S.workOrders.find(o=>String(o.driverNoticeId)===String(notice.id));
  if(ex) return ex;
  const order={
    id:fc31Id("wo"),
    driverNoticeId:notice.id,
    damageId:notice.damageId||null,
    category:"driverNotice",
    title:(t("driverNotice")||"Fahrzeugmeldung")+" · "+(notice.typeLabel||notice.type||""),
    description:notice.description||"",
    vehicleId:notice.vehicleId||null,
    vehicle:notice.vehicleLabel||"",
    plate:notice.plate||"",
    plateKey:fc31NormPlate(notice.plate||notice.vehicleLabel),
    driver:notice.driverId||notice.driver||null,
    driverName:notice.driverName||"",
    status:"open",
    priority:notice.priority||fc31Priority(notice.type),
    source:"driver",
    created:fc31Now(),
    parts:"",
    laborHours:"",
    comments:[],
    photos:notice.photo?[notice.photo]:[]
  };
  S.workOrders.unshift(order);
  fc31Archive("workshop",order);
  return order;
}
function fc31SaveDriverNotice(data){
  fc31Ensure();
  const v=data.vehicleId?fc31ById(S.vehicles,data.vehicleId):fc31CurrentVehicle();
  const vehicleLabel=data.vehicleLabel||fc31VehicleLabel(v)||data.manualVehicle||"";
  if(!vehicleLabel||!data.description){ alert(t("required")); return false; }
  const notice={
    id:data.id||fc31Id("notice"),
    driverId:data.driverId||(S.user?S.user.id:null),
    driver:data.driverId||(S.user?S.user.id:null),
    driverName:data.driverName||(S.user?S.user.name:""),
    vehicleId:v?v.id:data.vehicleId||null,
    vehicleLabel:vehicleLabel,
    plate:v?(v.plate||""):(data.plate||""),
    plateKey:fc31NormPlate(v?(v.plate||""):(data.plate||vehicleLabel)),
    type:data.type||"other",
    typeLabel:data.typeLabel||data.type||"Meldung",
    description:data.description,
    photo:data.photo||"",
    created:fc31Now(),
    status:"open",
    priority:data.priority||fc31Priority(data.type||"other")
  };
  S.driverNotices.unshift(notice);
  if(notice.type==="damage"){
    const damage=Object.assign({},notice,{id:fc31Id("dmg"),noticeId:notice.id,title:notice.typeLabel});
    S.damages.unshift(damage);
    notice.damageId=damage.id;
    fc31Archive("damage",damage);
  }
  fc31CreateWorkOrder(notice);
  fc31Archive("driverNotice",notice);
  fc31SaveAll();
  return notice;
}
window.saveDriverNotice=function(){
  const typeEl=document.getElementById("dnType");
  const type=(typeEl||{}).value||"damage";
  const typeLabel=typeEl&&typeEl.selectedOptions&&typeEl.selectedOptions[0]?typeEl.selectedOptions[0].textContent:type;
  const desc=((document.getElementById("dnDesc")||{}).value||"").trim();
  const manual=((document.getElementById("dnManualVehicle")||{}).value||"").trim();
  const fileEl=document.getElementById("dnPhoto");
  const photo=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";
  const saved=fc31SaveDriverNotice({type,typeLabel,description:desc,manualVehicle:manual,photo});
  if(saved){ alert(t("driverNoticeSaved")); if(typeof render==="function")render(); }
  return !!saved;
};
window.saveDamage=function(){
  const desc=((document.getElementById("dDesc")||{}).value||"").trim();
  const pos=((document.getElementById("dPosition")||{}).value||"").trim();
  const veh=((document.getElementById("dVehicle")||{}).value||"").trim();
  const fileEl=document.getElementById("dPhoto");
  const photo=fileEl&&fileEl.files&&fileEl.files[0]?fileEl.files[0].name:"";
  const saved=fc31SaveDriverNotice({type:"damage",typeLabel:t("reportDamageClean"),description:(pos?pos+" · ":"")+desc,manualVehicle:veh,photo});
  if(saved){ alert(t("driverNoticeSaved")); if(typeof render==="function")render(); }
  return !!saved;
};
window.setDriverNoticeStatus=function(id,status){
  fc31Ensure();
  const notice=fc31ById(S.driverNotices,id);
  if(!notice) return false;
  if(!fc31CanWorkshop()&&Number(notice.driverId||notice.driver)!==Number(S.user&&S.user.id)){ alert(t("notAllowed")); return false; }
  notice.status=status;
  notice.updated=fc31Now();
  notice.updatedBy=S.user?S.user.name:"";
  const order=S.workOrders.find(o=>String(o.driverNoticeId)===String(id));
  if(order){
    order.status=status==="done"?"done":status;
    order.updated=fc31Now();
    order.updatedBy=S.user?S.user.name:"";
    fc31Archive("workshop",order);
    if(order.vehicleId) fc31Archive("vehicleHistory",order);
  }
  fc31Archive("driverNotice",notice);
  fc31SaveAll();
  if(typeof render==="function")render();
  return true;
};

/* ---------- Vehicle / driver file save hooks ---------- */
const fc31OldSaveVehicleFile=window.saveVehicleFile;
window.saveVehicleFile=function(id){
  if(typeof fc31OldSaveVehicleFile==="function"){
    try{ fc31OldSaveVehicleFile(id); }catch(e){}
  }
  fc31Ensure();
  const name=((document.getElementById("vfName")||{}).value||"").trim();
  const p=((document.getElementById("vfPlate")||{}).value||"").trim();
  if(name&&p){
    let v=id?fc31ById(S.vehicles,id):null;
    if(!v){ v={id:id||fc31Id("veh"),created:fc31Now()}; S.vehicles.unshift(v); }
    Object.assign(v,{name,plate:p,plateKey:fc31NormPlate(p),hu:((document.getElementById("vfHu")||{}).value||""),sp:((document.getElementById("vfSp")||{}).value||""),tacho:((document.getElementById("vfTacho")||{}).value||""),vin:((document.getElementById("vfVin")||{}).value||""),mileage:((document.getElementById("vfMileage")||{}).value||""),notes:((document.getElementById("vfNotes")||{}).value||"")});
    fc31Archive("vehicle",{id:fc31Id("vehArc"),title:t("vehicleFile"),description:v.notes||"",vehicleId:v.id,vehicleLabel:fc31VehicleLabel(v),plate:v.plate});
    fc31SaveAll();
  }
  return true;
};
const fc31OldSaveDriverFile=window.saveDriverFile;
window.saveDriverFile=function(id){
  if(typeof fc31OldSaveDriverFile==="function"){
    try{ fc31OldSaveDriverFile(id); }catch(e){}
  }
  fc31Ensure();
  const d=(S.users||[]).find(u=>Number(u.id)===Number(id));
  if(d){
    const emp=document.getElementById("dfEmployeeNo");
    const card=document.getElementById("dfDriverCardNumber");
    const veh=document.getElementById("dfVehicle");
    if(emp) d.employeeNo=emp.value||"";
    if(card) d.driverCardNumber=card.value||"";
    if(veh&&veh.value) fc31AssignVehicle(id,veh.value);
    fc31Archive("driverFile",{id:fc31Id("drvArc"),title:t("driverFile"),description:d.name||"",driverId:d.id,driverName:d.name});
    fc31SaveAll();
  }
  return true;
};

/* ---------- Public API ---------- */
window.fc31Data={
  version:"3.1",
  storage:FC31_STORAGE,
  ensure:fc31Ensure,
  save:fc31SaveAll,
  archive:fc31Archive,
  assignVehicle:fc31AssignVehicle,
  confirmVehicle:fc31ConfirmVehicle,
  docsForUser:fc31DocsForUser,
  saveDriverNotice:fc31SaveDriverNotice,
  createWorkOrder:fc31CreateWorkOrder,
  currentVehicle:fc31CurrentVehicle
};

fc31Ensure();

})();


/* === FLEETCONTROL PHASE 3.2 MODULE CONSOLIDATION CORE === */
(function(){
"use strict";

/*
  PHASE 3.2 MODULE CONSOLIDATION
  Scope:
  - Fachmodule verwenden fc31Data als zentrale Basis
  - Fahrzeugakte, Fahrerakte, Werkstatt, Schäden, Dokumente, Führerschein, Abfahrtskontrolle, Archive, Begegnungspunkte, Punkte
  - einheitliche Pages für zentrale Module
*/

function M(){ if(window.fc31Data && typeof fc31Data.ensure==="function") fc31Data.ensure(); }
function canMgmt(){ return window.fc21Core ? fc21Core.isManagement() : (typeof admin==="function"&&admin()); }
function canWork(){ return (typeof work==="function"&&work()) || canMgmt(); }
function isDriver(){ return S.user && S.user.role==="driver"; }
function esc(v){ return String(v==null?"":v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function id(prefix){ return prefix+"_"+Date.now()+"_"+Math.floor(Math.random()*99999); }
function now(){ return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"}); }
function plateKey(v){ return String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,""); }
function vehicleLabel(v){ if(!v)return""; let n=String(v.name||v.vehicle||"").trim(),p=String(v.plate||v.licensePlate||"").trim(); return n&&p&&!n.includes(p)?n+" · "+p:(n||p||""); }
function currentVehicle(){ return fc31Data.currentVehicle ? fc31Data.currentVehicle() : null; }
function card(title, body){ return '<section class="card fc32Card"><h2>'+title+'</h2>'+body+'</section>'; }
function shell32(content){ return '<main class="fc22Main fc32Main">'+content+'</main>'+(window.fc22Navigation&&fc22Navigation.bottomNav?fc22Navigation.bottomNav():""); }

/* ---------- Vehicle file module ---------- */
window.vehicles = function(){
  M();
  const can=canMgmt()||canWork();
  const rows=(S.vehicles||[]).map(v=>'<div class="fc32Item"><b>🚛 '+esc(vehicleLabel(v))+'</b><small>'+esc(v.vin||"")+' · HU: '+esc(v.hu||v.tuv||"-")+' · SP: '+esc(v.sp||"-")+' · Tacho: '+esc(v.tacho||"-")+'</small><p>'+esc(v.notes||"")+'</p></div>').join("") || '<p class="muted">Keine Fahrzeuge vorhanden.</p>';
  const form=can?'<section class="card fc32Form"><h2>'+t("vehicleFile")+'</h2><label>Name<input id="vfName"></label><label>'+t("licensePlate")+'<input id="vfPlate"></label><label>HU/TÜV<input id="vfHu" type="date"></label><label>SP<input id="vfSp" type="date"></label><label>Tachoprüfung<input id="vfTacho" type="date"></label><label>FIN<input id="vfVin"></label><label>Kilometerstand<input id="vfMileage"></label><label>'+t("description")+'<textarea id="vfNotes"></textarea></label><button onclick="saveVehicleFile(0)">💾 '+t("save")+'</button></section>':"";
  return shell32(form+card(t("vehicleFiles"),rows));
};

/* ---------- Driver files module ---------- */
window.driversPage = function(){
  M();
  if(!canMgmt()) return shell32(card(t("notAllowed"),""));
  const drivers=(S.users||[]).filter(u=>u.role==="driver");
  const rows=drivers.map(d=>'<div class="fc32Item"><b>👤 '+esc(d.name)+'</b><small>'+esc(d.employeeNo||"-")+' · '+esc(d.phone||"-")+' · '+esc(d.fixedVehicleLabel||"-")+'</small><button onclick="S.selectedDriverId='+d.id+';go(\'driverFile\')">'+t("edit")+'</button></div>').join("");
  return shell32(card(t("driverFiles"),rows||'<p class="muted">-</p>'));
};
window.driverFilePage = function(driverId){
  M();
  if(!canMgmt()) return shell32(card(t("notAllowed"),""));
  const d=(S.users||[]).find(u=>Number(u.id)===Number(driverId||S.selectedDriverId)) || (S.users||[]).find(u=>u.role==="driver");
  if(!d) return shell32(card(t("driverFile"),'<p>-</p>'));
  const options=(S.vehicles||[]).map(v=>'<option value="'+v.id+'" '+(Number(v.assigned)===Number(d.id)?"selected":"")+'>'+esc(vehicleLabel(v))+'</option>').join("");
  const body='<div class="fc32Form"><label>Name<input id="dfName" value="'+esc(d.name||"")+'"></label><label>Personalnummer<input id="dfEmployeeNo" value="'+esc(d.employeeNo||"")+'"></label><label>Telefon<input id="dfPhone" value="'+esc(d.phone||"")+'"></label><label>E-Mail<input id="dfEmail" value="'+esc(d.email||"")+'"></label><label>Führerscheinklassen<input id="dfLicenseClasses" value="'+esc(d.licenseClasses||"")+'"></label><label>Fahrerkarte<input id="dfDriverCardNumber" value="'+esc(d.driverCardNumber||"")+'"></label><label>'+t("assignedVehicles")+'<select id="dfVehicle"><option value="">-</option>'+options+'</select></label><button onclick="saveDriverFile('+d.id+')">💾 '+t("save")+'</button></div>';
  return shell32(card(t("driverFile")+" · "+esc(d.name),body));
};

/* ---------- Driver notice / damage module ---------- */
window.driverNoticesPage = function(){
  M();
  const form=isDriver()?'<section class="card fc32Form"><h2>'+t("newDriverNotice")+'</h2><label>'+t("noticeType")+'<select id="dnType"><option value="damage">'+t("reportDamageClean")+'</option><option value="oil">'+t("oilChange")+'</option><option value="service">'+t("serviceDue")+'</option><option value="tire">'+t("tireProblem")+'</option><option value="brake">'+t("brakeProblem")+'</option><option value="lighting">'+t("lightingProblem")+'</option><option value="hu">'+t("huTuvNotice")+'</option><option value="sp">'+t("spNotice")+'</option><option value="tacho">'+t("tachoNotice")+'</option><option value="other">'+t("otherVehicleNotice")+'</option></select></label><label>'+t("manualVehicleClean")+'<input id="dnManualVehicle"></label><label>'+t("description")+'<textarea id="dnDesc"></textarea></label><label>'+t("photo")+'<input id="dnPhoto" type="file"></label><button onclick="saveDriverNotice()">💾 '+t("save")+'</button></section>':"";
  const list=(canWork()?S.driverNotices:(S.driverNotices||[]).filter(n=>Number(n.driverId||n.driver)===Number(S.user&&S.user.id))).map(n=>'<div class="fc32Item"><b>'+esc(n.typeLabel||n.type)+'</b><small>'+esc(n.created||"")+' · '+esc(n.driverName||"")+' · '+esc(n.vehicleLabel||"")+'</small><p>'+esc(n.description||"")+'</p><p>Status: '+esc(n.status||"open")+'</p>'+(canWork()?'<button onclick="setDriverNoticeStatus(\''+n.id+'\',\'progress\')">'+t("takeOverNotice")+'</button><button onclick="setDriverNoticeStatus(\''+n.id+'\',\'done\')">'+t("finishNotice")+'</button>':"")+'</div>').join("") || '<p class="muted">-</p>';
  return shell32(form+card(t("driverNotices"),list));
};

/* ---------- Workshop module ---------- */
window.workOrdersPage = function(){
  M();
  if(!canWork()) return shell32(card(t("notAllowed"),""));
  const rows=(S.workOrders||[]).map(o=>'<div class="fc32Item"><b>🔧 '+esc(o.title||"-")+'</b><small>'+esc(o.created||"")+' · '+esc(o.driverName||"")+' · '+esc(o.vehicle||"")+'</small><p>'+esc(o.description||"")+'</p><p>Status: '+esc(o.status||"open")+'</p><button onclick="setDriverNoticeStatus(\''+o.driverNoticeId+'\',\'progress\')">'+t("takeOverNotice")+'</button><button onclick="setDriverNoticeStatus(\''+o.driverNoticeId+'\',\'done\')">'+t("finishNotice")+'</button></div>').join("") || '<p class="muted">-</p>';
  return shell32(card(t("workOrders"),rows));
};

/* ---------- Documents module ---------- */
window.documentsPage = function(){
  M();
  const docs=(window.fcDocsForUser?fcDocsForUser():(S.docs||[]));
  const upload=canMgmt()?'<section class="card fc32Form"><h2>'+t("documentFolderClean")+'</h2><label>Dokumentname<input id="docName"></label><label>'+t("licensePlate")+'<input id="docPlate"></label><label>Datei<input id="docFile" type="file"></label><button onclick="fc32SaveDocument()">💾 '+t("save")+'</button></section>':"";
  const rows=docs.map(d=>'<div class="fc32Item"><b>📄 '+esc(d.name||d.title||"-")+'</b><small>'+esc(d.plate||d.vehiclePlate||"")+' · '+esc(d.file||"")+'</small></div>').join("") || '<p class="muted">-</p>';
  return shell32(upload+card(t("documentFolderClean"),rows));
};
window.fc32SaveDocument=function(){
  M();
  if(!canMgmt()){alert(t("notAllowed"));return false}
  const f=document.getElementById("docFile");
  const doc={id:id("doc"),name:(document.getElementById("docName")||{}).value||"Dokument",plate:(document.getElementById("docPlate")||{}).value||"",file:f&&f.files&&f.files[0]?f.files[0].name:"",created:now(),createdBy:S.user?S.user.name:""};
  doc.plateKey=plateKey(doc.plate);
  S.docs.unshift(doc);
  fc31Data.archive("document",doc);
  fc31Data.save();
  render();
  return true;
};

/* ---------- License module ---------- */
window.licensePage = function(){
  M();
  const own=isDriver();
  const form=own?'<section class="card fc32Form"><h2>'+t("scanLicense")+'</h2><label>Datei<input id="licenseFile" type="file"></label><button onclick="fc32SaveLicense()">💾 '+t("save")+'</button></section>':"";
  const list=(canMgmt()?S.licenseArchive:(S.licenseArchive||[]).filter(l=>Number(l.driverId)===Number(S.user&&S.user.id))).map(l=>'<div class="fc32Item"><b>🪪 '+esc(l.title||t("license"))+'</b><small>'+esc(l.driverName||"")+' · '+esc(l.file||l.photo||"")+'</small></div>').join("")||'<p class="muted">-</p>';
  return shell32(form+card(t("licenseArchive"),list));
};
window.fc32SaveLicense=function(){
  M();
  if(!isDriver()){alert(t("notAllowed"));return false}
  const f=document.getElementById("licenseFile");
  const entry={id:id("lic"),title:t("license"),driverId:S.user.id,driverName:S.user.name,file:f&&f.files&&f.files[0]?f.files[0].name:"license.pdf",created:now()};
  S.licenseArchive.unshift(entry);
  fc31Data.archive("license",entry);
  fc31Data.save();
  render();
  return true;
};

/* ---------- Departure check module ---------- */
window.check = function(){
  M();
  if(!isDriver()) return shell32(card(t("notAllowed"),""));
  return shell32('<section class="card fc32Form"><h2>'+t("departureCheck")+'</h2><label>Kommentar<textarea id="checkComment"></textarea></label><label>'+t("photo")+'<input id="checkPhoto" type="file"></label><label>Unterschrift<input id="checkSignature" placeholder="Name / Unterschrift"></label><button onclick="fc32SaveDepartureCheck()">💾 '+t("save")+'</button></section>');
};
window.fc32SaveDepartureCheck=function(){
  M();
  const v=currentVehicle();
  const f=document.getElementById("checkPhoto");
  const entry={id:id("chk"),title:t("departureCheck"),driverId:S.user.id,driverName:S.user.name,vehicleId:v?v.id:null,vehicleLabel:v?vehicleLabel(v):"",plate:v?v.plate:"",description:(document.getElementById("checkComment")||{}).value||"",signature:(document.getElementById("checkSignature")||{}).value||"",photo:f&&f.files&&f.files[0]?f.files[0].name:"",created:now()};
  S.departureChecks=S.departureChecks||[];
  S.departureChecks.unshift(entry);
  fc31Data.archive("departure",entry);
  fc31Data.save();
  render();
  return true;
};

/* ---------- Archive module ---------- */
window.deputyPdfArchivePage = function(){
  M();
  const rows=(S.archives||[]).map(a=>'<div class="fc32Item"><b>📄 '+esc(a.title||a.category)+'</b><small>'+esc(a.category||"")+' · '+esc(a.created||a.archivedAt||"")+' · '+esc(a.driverName||"")+' · '+esc(a.vehicleLabel||"")+'</small><p>'+esc(a.description||"")+'</p></div>').join("")||'<p class="muted">-</p>';
  return shell32(card(t("pdfArchiveMain"),rows));
};

/* ---------- Trailer meetings module ---------- */
window.trailerMeetingsPage = function(){
  M();
  const form=isDriver()?'<section class="card fc32Form"><h2>'+t("trailerMeetings")+'</h2><label>Ort<input id="tmPlace"></label><label>Datum<input id="tmDate" type="date"></label><label>Uhrzeit<input id="tmTime" type="time"></label><label>Telefon<input id="tmPhone"></label><label>Info<textarea id="tmNote"></textarea></label><button onclick="fc32SaveTrailerMeeting()">💾 '+t("save")+'</button></section>':"";
  const rows=(S.trailerMeetings||[]).map(m=>'<div class="fc32Item"><b>🔁 '+esc(m.place||"-")+'</b><small>'+esc(m.date||"")+' '+esc(m.time||"")+' · '+esc(m.driverName||"")+' · '+esc(m.phone||"")+'</small><p>'+esc(m.note||"")+'</p></div>').join("")||'<p class="muted">-</p>';
  return shell32(form+card(t("trailerMeetings"),rows));
};
window.fc32SaveTrailerMeeting=function(){
  M();
  if(!isDriver()){alert(t("notAllowed"));return false}
  const entry={id:id("meet"),driverId:S.user.id,driverName:S.user.name,place:(document.getElementById("tmPlace")||{}).value||"",date:(document.getElementById("tmDate")||{}).value||"",time:(document.getElementById("tmTime")||{}).value||"",phone:(document.getElementById("tmPhone")||{}).value||"",note:(document.getElementById("tmNote")||{}).value||"",created:now()};
  S.trailerMeetings.unshift(entry);
  fc31Data.archive("trailerMeeting",entry);
  fc31Data.save();
  render();
  return true;
};

/* ---------- Points module ---------- */
window.pointsPage = function(){
  M();
  const list=(S.pointsLog||[]).filter(p=>canMgmt()||Number(p.driverId)===Number(S.user&&S.user.id)).map(p=>'<div class="fc32Item"><b>⭐ '+esc(p.points||0)+'</b><small>'+esc(p.driverName||"")+' · '+esc(p.created||"")+'</small><p>'+esc(p.reason||"")+'</p></div>').join("")||'<p class="muted">-</p>';
  const form=canMgmt()?'<section class="card fc32Form"><h2>'+t("points")+'</h2><label>Fahrer-ID<input id="ptDriver"></label><label>Punkte<input id="ptPoints" type="number"></label><label>Grund<input id="ptReason"></label><button onclick="fc32AddPoints()">💾 '+t("save")+'</button></section>':"";
  return shell32(form+card(t("points"),list));
};
window.fc32AddPoints=function(){
  M();
  if(!canMgmt()){alert(t("notAllowed"));return false}
  const driverId=Number((document.getElementById("ptDriver")||{}).value||0);
  const d=(S.users||[]).find(u=>Number(u.id)===driverId);
  const entry={id:id("pt"),driverId,driverName:d?d.name:"",points:Number((document.getElementById("ptPoints")||{}).value||0),reason:(document.getElementById("ptReason")||{}).value||"",created:now()};
  S.pointsLog.unshift(entry);
  if(d)d.points=(Number(d.points)||0)+entry.points;
  fc31Data.archive("points",entry);
  fc31Data.save();
  render();
  return true;
};

window.fc32Modules={version:"3.2",modules:["vehicles","drivers","driverNotices","workOrders","documents","license","check","archives","trailerMeetings","points"]};
})();


/* === FLEETCONTROL PHASE 3.2 POINTS FIX === */
(function(){
"use strict";

/*
  Fix:
  Punkte werden zusätzlich in S.pointsLedger gespeichert.
  Die Fahrer-Gesamtpunkte werden aus dem Ledger berechnet, damit masterNormalizeUsers()
  sie nicht durch Standardwerte überschreibt.
*/

function p32Arr(name){ if(!Array.isArray(S[name])) S[name]=[]; return S[name]; }
function p32Now(){ return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"}); }
function p32Id(){ return "pt_"+Date.now()+"_"+Math.floor(Math.random()*99999); }
function p32Save(){
  try{
    localStorage.setItem("fc31_points",JSON.stringify(S.pointsLog||[]));
    localStorage.setItem("fc32_points_ledger",JSON.stringify(S.pointsLedger||[]));
    localStorage.setItem("fc21_users",JSON.stringify(S.users||[]));
  }catch(e){}
  if(window.fc31Data&&typeof fc31Data.save==="function")try{fc31Data.save()}catch(e){}
}
function p32RecalculateDriverPoints(driverId){
  p32Arr("pointsLedger");
  const total=S.pointsLedger.filter(p=>Number(p.driverId)===Number(driverId)).reduce((sum,p)=>sum+(Number(p.points)||0),0);
  const d=(S.users||[]).find(u=>Number(u.id)===Number(driverId));
  if(d)d.points=total;
  return total;
}
window.fc32AddPoints=function(){
  if(!(window.fc21Core?fc21Core.isManagement():(typeof admin==="function"&&admin()))){alert(t("notAllowed"));return false}
  p32Arr("pointsLog");p32Arr("pointsLedger");
  const driverId=Number((document.getElementById("ptDriver")||{}).value||0);
  const d=(S.users||[]).find(u=>Number(u.id)===Number(driverId));
  const entry={id:p32Id(),driverId,driverName:d?d.name:"",points:Number((document.getElementById("ptPoints")||{}).value||0),reason:(document.getElementById("ptReason")||{}).value||"",created:p32Now()};
  S.pointsLog.unshift(entry);
  S.pointsLedger.unshift(entry);
  p32RecalculateDriverPoints(driverId);
  if(window.fc31Data&&typeof fc31Data.archive==="function")fc31Data.archive("points",entry);
  p32Save();
  if(typeof render==="function")render();
  return true;
};
window.fc32RecalculateDriverPoints=p32RecalculateDriverPoints;
})();


/* === FLEETCONTROL PHASE 3.2 POINTS FINAL FIX === */
(function(){
"use strict";
function arr(n){if(!Array.isArray(S[n]))S[n]=[];return S[n]}
function now(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"})}
function id(){return"pt_"+Date.now()+"_"+Math.floor(Math.random()*99999)}
function findDriver(driverId){return (S.users||[]).find(u=>Number(u.id)===Number(driverId))}
function recalc(driverId){
  arr("pointsLedger");
  const total=S.pointsLedger.filter(p=>Number(p.driverId)===Number(driverId)).reduce((s,p)=>s+(Number(p.points)||0),0);
  const d=findDriver(driverId);
  if(d)d.points=total;
  return total;
}
function recalcAll(){
  arr("pointsLedger");
  const ids=[...new Set(S.pointsLedger.map(p=>Number(p.driverId)).filter(Boolean))];
  ids.forEach(recalc);
}
window.fc32RecalculateDriverPoints=recalc;
window.fc32RecalculateAllPoints=recalcAll;
window.fc32AddPoints=function(){
  const isMgmt=window.fc21Core?fc21Core.isManagement():(typeof admin==="function"&&admin());
  if(!isMgmt){alert(t("notAllowed"));return false}
  arr("pointsLog");arr("pointsLedger");
  const driverId=Number((document.getElementById("ptDriver")||{}).value||0);
  const d=findDriver(driverId);
  const entry={id:id(),driverId,driverName:d?d.name:"",points:Number((document.getElementById("ptPoints")||{}).value||0),reason:(document.getElementById("ptReason")||{}).value||"",created:now()};
  S.pointsLog.unshift(entry);
  S.pointsLedger.unshift(entry);
  recalc(driverId);
  try{localStorage.setItem("fc31_points",JSON.stringify(S.pointsLog));localStorage.setItem("fc32_points_ledger",JSON.stringify(S.pointsLedger));localStorage.setItem("fc21_users",JSON.stringify(S.users||[]));}catch(e){}
  if(window.fc31Data&&typeof fc31Data.archive==="function")fc31Data.archive("points",entry);
  recalc(driverId);
  return true;
};
const oldRender=window.render;
window.render=function(){
  const out=oldRender.apply(this,arguments);
  try{recalcAll()}catch(e){}
  return out;
};
recalcAll();
})();


/* === FLEETCONTROL PHASE 4.1 VEHICLE CONFIRM FIX === */
(function(){
"use strict";

/*
  Fix für Phase 4.1:
  Fahrer bestätigt zugewiesenes Fahrzeug.
  Problem war, dass S.activeVehicle in manchen Datenpfaden als String/ID-Mix
  oder nach Normalisierung nicht zuverlässig erhalten blieb.
  Diese finale Funktion setzt:
  - S.activeVehicle
  - Session-/Legacy-Storage
  - Fahrzeugbestätigung
  - Fahrerakte
  - Fahrzeug-Archivverknüpfung
*/

function f41Load(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):f}catch(e){return f}}
function f41Save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function f41Now(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"})}
function f41NormId(v){return String(v)}
function f41VehicleLabel(v){
  if(!v)return"";
  const n=String(v.name||v.vehicle||v.model||"").trim();
  const p=String(v.plate||v.licensePlate||v.kennzeichen||"").trim();
  return n&&p&&!n.includes(p)?n+" · "+p:(n||p||"");
}
function f41FindVehicle(vehicleId){
  const id=f41NormId(vehicleId);
  return (S.vehicles||[]).find(v=>f41NormId(v.id)===id || Number(v.id)===Number(vehicleId));
}
function f41Allowed(v,userId){
  return Number(v.assigned)===Number(userId) ||
         Number(v.fixedDriverId)===Number(userId) ||
         (Array.isArray(v.assignedDrivers) && v.assignedDrivers.map(Number).includes(Number(userId)));
}
function f41PersistActiveVehicle(vehicleId){
  S.activeVehicle = vehicleId;
  f41Save("fc21_active_vehicle", vehicleId);
  f41Save("fc31_active_vehicle", vehicleId);
  f41Save("fc_v17_active_vehicle", vehicleId);
  f41Save("activeVehicle", vehicleId);
  const session = f41Load("fc21_session", null);
  if(session){
    session.activeVehicle = vehicleId;
    f41Save("fc21_session", session);
  }
}
window.confirmAssignedVehicle=function(vehicleId){
  if(!S.user || S.user.role!=="driver"){ alert(t("notAllowed")); return false; }
  if(window.fc31Data && typeof fc31Data.ensure==="function") fc31Data.ensure();

  const v=f41FindVehicle(vehicleId);
  if(!v){ alert(t("required")); return false; }

  if(!f41Allowed(v,S.user.id)){ alert(t("notAllowed")); return false; }

  const activeId = v.id;
  f41PersistActiveVehicle(activeId);

  v.assigned = Number(S.user.id);
  v.fixedDriverId = Number(S.user.id);
  v.assignedDrivers = [Number(S.user.id)];
  v.driverConfirmed = true;
  v.driverConfirmedAt = f41Now();
  v.driverConfirmedBy = S.user.name;
  v.activeForDriver = Number(S.user.id);

  const d=(S.users||[]).find(u=>Number(u.id)===Number(S.user.id));
  if(d){
    d.fixedVehicleId = v.id;
    d.fixedVehicleLabel = f41VehicleLabel(v);
    d.fixedVehicleConfirmed = true;
    d.fixedVehicleConfirmedAt = v.driverConfirmedAt;
    d.activeVehicle = v.id;
  }

  if(window.fc31Data && typeof fc31Data.archive==="function"){
    fc31Data.archive("vehicleConfirmation",{
      id:"confirm_"+Date.now(),
      title:t("vehicleConfirmed"),
      description:(S.user.name||"")+" bestätigt "+f41VehicleLabel(v),
      driverId:S.user.id,
      driverName:S.user.name,
      vehicleId:v.id,
      vehicleLabel:f41VehicleLabel(v),
      plate:v.plate||"",
      created:f41Now()
    });
  }

  if(window.fc31Data && typeof fc31Data.save==="function") fc31Data.save();
  else {
    f41Save("fc31_vehicles",S.vehicles||[]);
    f41Save("fc21_users",S.users||[]);
  }

  if(typeof render==="function") render();
  return true;
};

if(window.fc31Data){
  window.fc31Data.confirmVehicle = window.confirmAssignedVehicle;
}
})();

/* === FLEETCONTROL PHASE 4.2 CLEANUP METADATA === */
window.FLEETCONTROL_CLEAN_REBUILD = {
  version: "V20_CLEAN_REBUILD_RC",
  phase: "4.2",
  status: "cleanup_passed",
  integration: "16/16 OK",
  next: "Phase 4.3 Final Master ZIP"
};


/* === FLEETCONTROL MASTER V20 WORKSHOP SIGNATURE MODULE === */
(function(){
"use strict";
function wsNow(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin"});}
function wsCan(){return window.fc21Core?(fc21Core.isWorkshop()||fc21Core.isManagement()):((typeof work==="function"&&work())||(typeof admin==="function"&&admin()));}
function wsFind(orderId){return (S.workOrders||[]).find(o=>String(o.id)===String(orderId)||String(o.driverNoticeId)===String(orderId));}
window.workshopSignature=function(orderId,signatureText){
  if(!wsCan()){alert(t("notAllowed"));return false;}
  if(window.fc31Data&&typeof fc31Data.ensure==="function")fc31Data.ensure();
  const order=wsFind(orderId);
  if(!order){alert(t("required"));return false;}
  const sig=String(signatureText||"").trim();
  if(!sig){alert(t("required"));return false;}
  order.workshopSignature=sig;
  order.signature=sig;
  order.workshopSignedBy=S.user?(S.user.name||S.user.login):"";
  order.workshopSignedAt=wsNow();
  if(!Array.isArray(order.comments))order.comments=[];
  order.comments.push({type:"workshopSignature",text:sig,by:order.workshopSignedBy,created:order.workshopSignedAt});
  if(window.fc31Data&&typeof fc31Data.archive==="function"){
    fc31Data.archive("workshopSignature",{id:"wsig_"+Date.now(),title:"Werkstatt-Unterschrift",description:order.workshopSignedBy+" · "+sig,driverId:order.driver||order.driverId||null,driverName:order.driverName||"",vehicleId:order.vehicleId||null,vehicleLabel:order.vehicle||order.vehicleLabel||"",plate:order.plate||"",status:order.status||"",sourceId:order.id,signature:sig,created:order.workshopSignedAt});
    fc31Data.save();
  }else{
    try{localStorage.setItem("fc31_work_orders",JSON.stringify(S.workOrders||[]));}catch(e){}
  }
  if(typeof render==="function")render();
  return true;
};
const oldWorkOrdersPage=window.workOrdersPage;
window.workOrdersPage=function(){
  const html=typeof oldWorkOrdersPage==="function"?String(oldWorkOrdersPage()):"";
  if(!wsCan())return html;
  const ui=`<section class="card fc32Form"><h2>Werkstatt-Unterschrift</h2>
    <label>Auftrag-ID oder Meldungs-ID<input id="workshopSignatureOrderId" placeholder="Auftrag auswählen / ID"></label>
    <label>Digitale Unterschrift<input id="workshopSignatureText" placeholder="Name / Unterschrift"></label>
    <button onclick="workshopSignature((document.getElementById('workshopSignatureOrderId')||{}).value,(document.getElementById('workshopSignatureText')||{}).value)">💾 Unterschrift speichern</button>
  </section>`;
  return html.includes("</main>")?html.replace("</main>",ui+"</main>"):html+ui;
};
const oldStatus=window.setDriverNoticeStatus;
window.setDriverNoticeStatus=function(id,status){
  const result=typeof oldStatus==="function"?oldStatus(id,status):false;
  if(status==="done"){
    const order=wsFind(id);
    if(order&&order.workshopSignature&&window.fc31Data&&typeof fc31Data.archive==="function"){
      fc31Data.archive("workshopSignature",{id:"wsig_done_"+Date.now(),title:"Werkstatt-Unterschrift Abschluss",description:(order.workshopSignedBy||"")+" · "+order.workshopSignature,driverId:order.driver||order.driverId||null,driverName:order.driverName||"",vehicleId:order.vehicleId||null,vehicleLabel:order.vehicle||order.vehicleLabel||"",plate:order.plate||"",status:order.status||"",sourceId:order.id,signature:order.workshopSignature,created:order.workshopSignedAt||wsNow()});
      fc31Data.save();
    }
  }
  return result;
};
})();

/* === FLEETCONTROL MASTER V20 FINAL BUILD METADATA === */
window.FLEETCONTROL_MASTER_FINAL = {
  version: "FleetControl_MASTER_V20_FINAL",
  build: "Clean Rebuild Final",
  basedOn: "V18.9 bis Phase 4.3",
  status: "final_integration_passed",
  integration: "final endtest passed",
  backendRequiredFor: [
    "echter E-Mail-Versand",
    "Cloud-Synchronisation",
    "echte Server-Datenbank",
    "echte KI-Bildanalyse"
  ]
};
