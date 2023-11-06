# AI Toolkit

AI Toolkit is a Next.js application with a MySQL database, packaged in Docker containers.

## Requirements

- Docker
- Docker Compose
- Make (Optional for convenience)

## Getting Started

To get started with AI Toolkit, follow these steps:

### Build and Run the Application

To build and run the application in containers, execute:

```
make build
```

Or, you can use Docker Compose directly:

```
docker-compose up -d --build
```

### Stopping the Application

To stop the application, run:

```
make stop
```

Or with Docker Compose:

```
docker-compose down
```

### Database Migrations

To update or create new migrations, run:

```
make migrate-dev
```

This command will create a migration file named "init" in the `/prisma/migrations` directory. The migration file contains the raw SQL that needs to be executed against the database. Running this command will apply the changes defined in your Prisma schema to the database, creating or updating the necessary tables. It is important to run this command whenever you make changes to your models in the schema.prisma file.

After running the command, you will have a `/prisma/migrations` directory that contains all the migration files. You can safely ignore this directory, but make sure to commit it to your repository.

@TODO add doc about other prisma commands

### Access Prisma Studio

To access Prisma Studio for database management, run:

```
make prisma-studio
```

### Access the Application

The Next.js application is available at `http://localhost:3000`.

The Prisma Studio is available at `http://localhost:5555` when running.

## Environmental Variables

Ensure you have the following environment variables set up in your `.env` file or in the `environment` section of your `docker-compose.yml`:

- `DATABASE_URL`: The database connection string.

## Notes

- Adjust the Docker Compose file's `environment` settings for the `ai-toolkit-app` service if you are using a custom `.env` file.
- The `Makefile` assumes you have a Unix-like environment to use `make` commands; on Windows, you might need to use `nmake` or run the Docker Compose commands directly.
- The Prisma commands in the `Makefile` assume that your `node` container has access to Prisma CLI. Ensure your Next.js project has Prisma installed as a dependency.
- Before running migrations, you will need to have your Prisma schema set up correctly, pointing to the Dockerized MySQL service.

