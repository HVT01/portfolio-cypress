# ---------- Builder Stage ----------
# ----------------------------------
# Base Image mit Node + Browsern
# ----------------------------------
FROM cypress/browsers:node-22.19.0-chrome-139.0.7258.154-1-ff-142.0.1-edge-139.0.3405.125-1 AS builder

# ----------------------------------
# Arbeitsverzeichnis
# ----------------------------------
WORKDIR /app

# ----------------------------------
# Package Files kopieren
# ----------------------------------
COPY package.json package-lock.json ./

# ----------------------------------
# Dependencies installieren
# ----------------------------------
RUN npm ci
RUN npx cypress install
RUN npm install --save-dev wait-on
RUN RUN npm install -g wait-on
RUN npm install
# ----------------------------------
# Restlichen Code kopieren
# ----------------------------------
COPY . .

# Verzeichnis für Reports vorbereiten
RUN mkdir -p /app/results /app/cypress/screenshots /app/cypress/videos

# Environment Variables default
ENV CYPRESS_baseUrl="http://localhost:3000"
ENV CYPRESS_loginPath="/login"
ENV CYPRESS_dashboardPath="/dashboard"

# ---------- Runtime Stage ----------
FROM cypress/browsers:node-22.19.0-chrome-139.0.7258.154-1-ff-142.0.1-edge-139.0.3405.125-1

WORKDIR /app

COPY --from=builder /app /app
EXPOSE 3000
# ----------------------------------
# Local Tests Execution
# ----------------------------------