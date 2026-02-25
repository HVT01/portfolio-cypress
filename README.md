# Cypress End-to-End Test Automation
**Portfolio von Thanh Trung Tran**

## Portfolio

Dieses Projekt zeigt eine modulare, skalierbare Architektur für End-to-End-Testautomatisierung mit Cypress.  
Die Tests sind containerisiert (Docker), CI/CD-integriert (GitLab CI) und für eine cloudbasierte Ausführung in Kubernetes-Clustern ausgelegt.

## Architektur
- Page Object Model (POM): Strukturierung der UI-Interaktionen in wiederverwendbare Seitenobjekte zur Kapselung von Selektoren und Aktionen sowie zur Verbesserung von Wartbarkeit und Lesbarkeit
- Custom Commands: wiederverwendbare Befehle zur Reduzierung von Redundanz und Erhöhung der Testklarheit
- Fixtures: Externe Verwaltung von Testressourcen wie Testdaten und UI-Selektoren zur klaren Trennung von Testlogik
- Utilities: Helper Funktionen, Environment Handling  

## CI/CD
- GitLab CI/CD Pipeline mit install → test → report stages  
- Artefakt-Sicherung: Screenshots, Videos  
- MR-Trigger und Headless Execution  

## Kubernetes & Containerization
- Dockerfile: Cypress + Browser Container  
- Kubernetes Deployment & Job: skalierbare, reproduzierbare Testausführung  
- Cloud-native und DevOps-ready  