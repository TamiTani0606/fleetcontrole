Fleet Control V17 Testversion

GitHub Pages:
Lade diese Dateien ins Repository hoch:
- index.html
- app.js
- styles.css
- translations.js
- _redirects
- netlify.toml
- README.txt

Logins:
Hoppe.M / Besen
Thollembeek.S / Erdbeere
Klos.T / Einhorn
fuhrpark / demo
werkstatt / demo

V17 enthält:
- Statusseite mit Fristenampel
- Pflicht-Hinweis Abfahrtskontrolle
- Mautgerät-Prüfpunkt
- Zentrale Foto-Sektion
- Finger-/Maus-Unterschrift
- Punktehistorie und Punktevergabe
- Sicherheitsbereich
- Werkstattstatus
- PDF/Print-Ausgabe vorbereitet


V17.1 Fix:
- Benachrichtigungsglocke ist klickbar und zeigt offene Hinweise.
- Roter Zähler an der Glocke.
- Drei Striche links oben entfernt.
- Fahrer können ihr aktuelles Fahrzeug selbst auswählen und speichern.
- Marcel/Sascha können Fahrzeuge selbst übernehmen.
- Abfahrtskontrolle: Kommentare/Beschreibungen/Fotos sind freiwillig; Pflicht sind Fahrzeugauswahl und abgehakte Prüfpunkte.


V17.2 Erweiterungen:
- Führerschein-Kontrolle mit Ablaufdatum und Benachrichtigung.
- Live-Flottenübersicht.
- Wartungsplaner für HU, SP, Tacho, Reifenwechsel, Ölwechsel und freie Aufgaben.
- Kostenübersicht pro Fahrzeug.
- Fahrzeug-Dokumentenmappe.
- Monatsranking und Bonus-/Prämiensystem.
- Kritische Mängel aus Kommentaren bei Bremsen/Reifen/Lenkung/Beleuchtung werden automatisch als Werkstatt-Schaden angelegt.

V17.2.1 Prüfung/Fix:
- Speicherung der neuen Module Führerschein, Wartung, Kosten und Dokumente repariert.
- Abfahrtskontrolle geprüft: Abschluss funktioniert mit Fahrzeugauswahl + allen abgehakten Prüfpunkten.
- Kommentare, Beschreibung, Fotos und Unterschrift blockieren den Abschluss nicht.
- PDF/Druckfenster wird nach Abschluss geöffnet; echter E-Mail-Versand ist weiterhin nur vorbereitet.

Werkstatt-Login ergänzt: Benutzername Werkstatt / Passwort Eisbecher


V17.2.3 Prüfung/Fix:
- Werkstatt-Login repariert: Werkstatt / Eisbecher.
- Login robuster gemacht, damit alte lokale Benutzerdaten mit user/pass nicht hängen bleiben.
- Abfahrtskontrolle getestet: Abschluss funktioniert mit Fahrzeug + allen abgehakten Prüfpunkten.
- Kommentare, Beschreibungen, Fotos und Unterschrift sind freiwillig und blockieren den Abschluss nicht.
- Speichern von Führerschein, Wartung, Kosten und Dokumenten geprüft.

V17.2.4 Erweiterungen:
- Zurück-Button auf Unterseiten.
- Schadenszusammenfassung mit Gesamtzahl, offenen, erledigten und kritischen Schäden.
- Übersicht der Schäden nach Fahrzeug.
- Bonus Schadensfreiheit: Chef kann +10 Punkte für schadenfreien Monat vergeben.

V17.3 KI-Schadenprüfung Beta:
- Foto-Upload für KI-Schadenprüfung.
- Schadensart auswählbar: Karosserie, Spiegel/Licht, Reifen, Bremse/Lenkung, Ladungssicherung.
- Automatische Punkteempfehlung:
  Karosserie 0, Spiegel/Licht -5, Reifen -10, Bremse/Lenkung -20, Ladungssicherung -10.
- Verspätet gemeldet zieht zusätzlich -5 Punkte ab.
- Ergebnis erzeugt automatisch Schadens-/Werkstattmeldung.
- Punkteverlauf wird automatisch aktualisiert.
Hinweis: Dies ist eine Beta-Regellogik. Echte Bilderkennung benötigt später ein Backend mit KI/API.

V17.5 Textpflege:
- Zusätzliche Übersetzungsschlüssel für V17.2–V17.4 ergänzt.
- KI-Schadenprüfung, Schadenszusammenfassung, Bonus Schadensfreiheit, Führerschein, Wartung, Kosten, Dokumente und Benachrichtigungen in alle 8 Sprachen erweitert.
- Hinweis: Für rechtliche Texte und finale Produktivversion sollten Übersetzungen durch Muttersprachler geprüft werden.

Zusätzlicher Admin-Login:
- Chef / Wassermelonen

V17.6: Entwickler / Laubblätter und KI-Trainingsdaten-Bereich ergänzt.


Rollenupdate V17.6.1:
- Sascha (Thollembeek.S) hat zusätzliche Rechte: Chef/Admin + Werkstatt
- Marcel (Hoppe.M) hat zusätzliche Rechte: Fuhrpark

V17.6.2 KostenFix: Kostenübersicht repariert und automatisiert geprüft.

V17.6.3 BonusFix: Bonus Schadensfreiheit repariert und geprüft.

V17.7 Pre-Live IT-Ready Paket erstellt.

V17.8 Lavender Mist Design eingebaut: Loginseite, Farben, Buttons, Karten, Navigation.

V17.8.1 Stabilisiert:
- Abfahrtskontrolle repariert.
- Abschluss funktioniert mit Fahrzeug + allen Prüfpunkten.
- Kommentare, Fotos und Unterschrift blockieren nicht.
- Pilot-Logins Marcel/Sascha/Tamara ergänzt.
- Rollenrechte für Zusatzrollen robuster gemacht.

V17.8.2 Final Pilot: final geprüft und gepackt.

V17.9 ZielDesign Final: Referenzdesign, Einstellungen-Logout, erweiterte Übersetzungen und Volltest.

V17.9.1 RollenFix: Rollenverteilung und rollenbasierte Startseiten/Navigation korrigiert. Design unverändert.

V17.9.2:
- Chef-Vollzugriff auf Fahrer-, Fuhrpark- und Werkstattdaten ergänzt.
- Fahrerschadensmeldung verknüpft automatisch KI-Trainingsdaten und Werkstattbereich.
- Abfahrtskontrolle erzeugt nach Abschluss zusätzlich eine Mail-/PDF-Versandvorbereitung an die hinterlegte Adresse.
- Hinweis: Echter E-Mail-Versand benötigt Backend/Mailservice.

V17.9.3: Chef-Vollübersicht ergänzt und Passwort-Anzeige im Login.

V17.9.4: Fahrer-Schadensmeldung mit KI-Punkteempfehlung und Freigabe durch Chef/Fuhrpark/Stellvertretung ergänzt.

V17.9.5: Punktevergabe-Rechte, Fahrer-Punkteanzeige, digitale Unterschrift, Abfahrtskontrolle und Mail-Queue ohne sichtbaren PDF-Zwischenschritt korrigiert.

V17.9.5: Punktevergabe-Rechte, Fahrer-Punkteanzeige, digitale Unterschrift, Abfahrtskontrolle und Mail-Queue ohne sichtbaren PDF-Zwischenschritt korrigiert.

V17.9.6 LoginFix: Tamara, Fuhrpark, Sascha, Werkstatt und Marcel Logins korrigiert.
