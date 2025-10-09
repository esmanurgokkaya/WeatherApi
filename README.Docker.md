# Docker — Build & Run

This file explains how to build and run WeatherApi with Docker for local development and for building an image to deploy.

Quick start (compose)
1. Copy your environment file:
   ```sh
   cp .env.example .env
   # edit .env: DATABASE_URL, OPENWEATHER_API_KEY, JWT_SECRET, JWT_REFRESH_SECRET, PORT
   ```
2. Start app + DB (compose):
   ```sh
   docker compose up --build
   ```
3. By default the API is available at:
   ```
   http://localhost:3000
   ```

Build an image
- Build for the current platform:
  ```sh
  docker build -t weatherapi .
  ```
- Build for a specific platform (e.g. amd64 on Apple Silicon):
  ```sh
  docker build --platform=linux/amd64 -t weatherapi .
  ```

Push to registry
```sh
docker tag weatherapi myregistry.com/myapp:latest
docker push myregistry.com/myapp:latest
```

Prisma / database notes
- The compose setup includes Postgres. Migrations and seeding must run against that DB.
- Options:
  - Run migrations from the host (with DATABASE_URL pointing to the container).
  - Or exec into the app container after it starts:
    ```sh
    docker compose exec <app-service-name> sh -c "npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed"
    ```
  - If you only want to push schema without creating a migration:
    ```sh
    npx prisma db push --preview-feature
    ```

Environment & secrets
- Ensure .env variables are available to the container (compose file should mount or set them).
- Required: DATABASE_URL, OPENWEATHER_API_KEY, JWT_SECRET, JWT_REFRESH_SECRET (and PORT if you change it).

Common commands
- Rebuild and restart:
  ```sh
  docker compose up --build -d
  ```
- View logs:
  ```sh
  docker compose logs -f
  ```
- Stop & remove:
  ```sh
  docker compose down
  ```

Troubleshooting
- Port conflict: change PORT in .env or stop the process using the port.
- If app fails to connect to DB: confirm DATABASE_URL points to the Postgres container host/port and DB is ready before running migrations.
- Check container logs for errors: `docker compose logs -f`.

Notes
- The provided Dockerfile is intended for building a runnable image. Adjust the CMD in the Dockerfile if you want a production start command (the repo's default may use the dev script).
- If your CI/CD environment uses a different CPU architecture, add the `--platform` flag when building.

References
- Docker + Node: https://docs.docker.com/language/nodejs/
- Prisma deployment: https://www.prisma.io/docs