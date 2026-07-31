# Filmoteka

Filmoteka is a full-stack movie collection application.

It allows managing a movie database with film details, genres, countries, actors, directors, and poster images.

## Current development version

**Filmoteka 2.0.0-SNAPSHOT**

The first complete version of Filmoteka provides an administrator-facing movie catalog application with:

* film, actor, and director management
* searching, filtering, sorting, and pagination
* poster upload and processing
* PostgreSQL persistence with Flyway migrations
* Docker Compose setup for the complete application
* automated tests and GitHub Actions CI
* OpenAPI documentation, health checks, request logging, and correlation IDs

## Repositories

This repository contains Docker Compose and shared local setup.

Related repositories:

* `filmoteka-catalog` — Java/Spring Boot catalog API
* `filmoteka-media` — Kotlin/Spring Boot media service for poster upload and retrieval
* `filmoteka-ui` — React/TypeScript frontend
* `filmoteka` — Docker Compose setup

## Architecture

```text
React UI
   |
   | REST API
   v
Catalog service  ---- PostgreSQL
   |
   | stores poster filename
   v
Media service ---- local media storage
```

The catalog manages film data.
The media service stores and serves poster images.
The UI communicates with both services.

## Tech stack

* Java 25
* Kotlin
* Spring Boot
* PostgreSQL
* Flyway
* React
* TypeScript
* Vite
* React Query
* Axios
* Docker
* Docker Compose
* GitHub Actions

## Features

* Film list and details page
* Create and update films
* Actors and directors
* Genres and countries
* Poster upload and display
* Separate media service
* Docker Compose local setup
* Health checks
* Request logging with correlation IDs

## Running with Docker Compose

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Start the application:

```powershell
docker compose up --build
```

Useful URLs:

```text
UI:                 http://localhost
Catalog health:     http://localhost:8080/actuator/health
Catalog Swagger UI: http://localhost:8080/swagger-ui/index.html
Media health:       http://localhost:8081/actuator/health
Media Swagger UI:   http://localhost:8081/swagger-ui/index.html
```

Stop the application:

```powershell
docker compose down
```

Stop and remove volumes:

```powershell
docker compose down -v
```

## Local development

Services can also be run separately:

```text
filmoteka-catalog  -> http://localhost:8080
filmoteka-media    -> http://localhost:8081
filmoteka-ui       -> http://localhost:5173
```

Frontend:

```powershell
npm install
npm run dev
```

Catalog tests:

```powershell
.\mvnw.cmd test
```

Media service tests:

```powershell
.\gradlew.bat test
```

Frontend checks:

```powershell
npm run lint
npm run test
npm run build
```

## Environment variables

Example environment variables are provided in:

```text
.env.example
```

The local `.env` file is ignored by Git.

## Observability

Catalog and media services expose Spring Boot Actuator health endpoints.

Both services log completed requests and include a correlation ID when available.

Example:

```text
INFO [correlationId=00000000-0000-0000-0000-000000000000] Request completed: method=GET, path=/api/v1/films, status=200, durationMs=42
```
