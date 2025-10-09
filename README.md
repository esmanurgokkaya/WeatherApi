# WeatherApi

A small Node.js + Express backend for a personal weather service. It includes authentication, user/profile management, location storage, weather lookups (via OpenWeather), alerts and user preferences. Use it as a starter or extend it for your own app.

Table of contents
1. Requirements
2. Setup (local)
3. Environment variables
4. Run (dev / prod)
5. Database (Prisma)
6. Docker
7. API overview (endpoints)
8. Error handling & validation
9. Implementation notes
10. Useful commands

1) Requirements
- Node 18+ (or recent LTS)
- PostgreSQL (local, container, or managed)
- npm
- OpenWeather API key (for weather lookups)

2) Setup (local)
Clone and install:
```sh
git clone https://github.com/esmanurgokkaya/WeatherApi.git
cd WeatherApi
npm install
cp .env.example .env
```
Edit `.env` with your values (see section 3).

3) Environment variables
Copy `.env.example` to `.env` and set the values. Main variables used by the code:
- NODE_ENV — development | production
- PORT — server port (default 3000)
- JWT_SECRET — signing secret for access tokens
- JWT_REFRESH_SECRET — signing secret for refresh tokens
- JWT_EXPIRES_IN — access token lifespan (e.g. "15m")
- JWT_REFRESH_EXPIRES_IN — refresh token lifespan (e.g. "7d")
- DATABASE_URL — PostgreSQL connection string used by Prisma
- OPENWEATHER_API_KEY — key used by the weather service

Files that read environment variables:
- `src/utils/env.js`
- `src/services/token.service.js`
- `src/services/weather.service.js`
- `src/config/db.js`

4) Run (development / production)
Development (with nodemon):
```sh
npm run dev
# entry: src/server.js -> loads src/app.js
```
Production:
```sh
npm start
```
Server entry point: `src/server.js`. Express app: `src/app.js`.

5) Database (Prisma)
This project uses Prisma and PostgreSQL. Important files:
- `prisma/schema.prisma`
- `prisma/seed.js`
- `prisma/migrations/`

Common commands:
```sh
# generate client
npm run prisma:generate
# create/migrate DB (development)
npm run prisma:migrate
# seed demo data
npm run prisma:seed
# push schema without creating a migration
npx prisma db push
```
The Prisma client is created and exported in `src/config/db.js`.

6) Docker
There are Docker files and compose configs for local development and building an image.

Quick start (compose):
```sh
docker compose up --build
```
- By default the API will be available at http://localhost:3000 (unless you change PORT).
- `docker-compose.yml` in the repo runs the app with Postgres + pgAdmin for local development.
- `Dockerfile` + `compose.yaml` are available to build an image for deployment.

Notes:
- If your cloud uses a different CPU architecture (e.g., mac M1 -> amd64), build with:
```sh
docker build --platform=linux/amd64 -t weatherapi .
```
- Copy your `.env` and set DB connection and secrets before starting containers.
- Prisma migrations & seeding must run against the DB the containers expose (or be executed by your CI).

See `README.Docker.md` for additional Docker tips.

7) API overview (endpoints)
Routes are registered in `src/routes/index.route.js`. Below are the main endpoints and what they do.

Auth
- POST /auth/register
  - Register a new user. Uses `src/controllers/auth.controller.js` and `src/services/auth.service.js`.
- POST /auth/login
  - Log in and receive an access token and refresh token.
- POST /auth/refresh-token
  - Exchange refresh token for a new access token.
- DELETE /auth/logout
  - Invalidate refresh token / logout.

Profile (requires Bearer token)
- GET /profile/me
  - Get current user profile (`src/controllers/user.controller.js`).
- PUT /profile/me
  - Update profile fields.
- PUT /profile/me/password
  - Change password.
- DELETE /profile/me
  - Delete account.

Locations (authenticated)
- POST /location
  - Add a location (latitude/longitude). Reverse-geocoding helpers in `src/models/location.model.js`.
- GET /location/all
  - List saved locations for the user.
- GET /location/:id
  - Get a location by id.
- PUT /location/:id
  - Update a location.
- DELETE /location/:id
  - Remove a location.

Weather
- GET /weather/current?locationId=
- GET /weather/hourly?locationId=
- GET /weather/daily?locationId=
Weather logic and caching live in `src/services/weather.service.js` and `src/models/weather.model.js`. Weather calls use the OpenWeather API via `OPENWEATHER_API_KEY`.

Alerts & Preferences
- Alerts API in `src/controllers/alert.controller.js` + `src/services/alert.service.js`.
- Preferences API in `src/controllers/preferences.controller.js` + `src/services/preferences.service.js`. Preferences are upserted and normalized before saving.

8) Error handling & validation
- Request validation with Zod schemas in `src/utils/zod.schemas.js`.
- Centralized error handling in `src/middlewares/error.middleware.js`.
- API response helpers in `src/utils/api.response.js`.
- HTTP error types in `src/utils/http.errors.js`.

9) Implementation notes
- Token management: `src/services/token.service.js` signs/verifies access and refresh tokens and persists refresh tokens in DB via `src/models/token.model.js`.
- Token cleanup job: `src/jobs/token.job.js` removes expired refresh tokens and is scheduled in `src/server.js`.
- Weather caching: recent weather responses are cached in DB for a short time (default ~5 minutes) to reduce external API calls.
- Single Prisma client instance is created in `src/config/db.js`.
- Logger helpers are in `src/utils/logger.js`.

10) Useful commands
```sh
npm install
cp .env.example .env
npm run dev           # development with nodemon
npm start             # production start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npx prisma db push

# Docker
docker compose up --build
docker build -t weatherapi .
```

References
- OpenWeather: https://openweathermap.org/api
- Prisma: https://www.prisma.io/
- Docker Node.js guide: https://docs.docker.com/language/nodejs/
