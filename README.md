## CMS Backend

This is the backend for the CMS project, built with Node.js, Express, and Prisma.

---

### Project Setup

#### 1. Non-Docker Setup

1. Install dependencies:
	```bash
	pnpm install
	```
2. Set up your environment variables in `.env` (see below).
3. Run database migrations (if using Prisma):
	```bash
	pnpm prisma migrate dev
	```
4. Start the server:
	```bash
	pnpm start
	```

#### 2. Docker Setup

1. Ensure Docker and Docker Compose are installed.
2. Build and start services:
	```bash
	docker-compose up --build
	```
3. The backend will be available at `http://localhost:3000` (default).

---

### Environment Variables (.env)

The `.env` file is used to configure database connection, authentication secrets, and third-party integrations. Example:

```
PORT=3000
DATABASE_URL="<connection_string>"
BETTER_AUTH_SECRET="<your_secret>"
BETTER_AUTH_URL="<your_backend_server_url>"
FRONTEND_URL="<your_frontend_url>"
```

**Usage:**
- The backend loads environment variables from `.env` automatically when running locally.
- In Docker, you can use the `env_file` option in `docker-compose.yml` to load `.env`.
- Sensitive values (like secrets and database URLs) should be kept in `.env` and not committed to version control.

---

### API Endpoints

#### Author Endpoints
- `GET /author/profile` — Get authenticated author's profile
- `GET /author/profile/:id` — Get public profile by author ID

#### Article Endpoints
- `POST /article/create` — Create a new article (authenticated)
- `GET /article/me` — Get articles by authenticated author
- `GET /article/` — Get all published articles
- `GET /article/:id` — Get article by ID
- `GET /article/author/:authorId` — Get published articles by author
- `GET /article/author/article/:articleId` — Get a specific article by author (authenticated)
- `DELETE /article/:articleId` — Delete an article (authenticated)

---

### Notes
- Make sure your database is running and accessible via the `DATABASE_URL` in `.env`.

---

### Troubleshooting
- If you encounter issues with environment variables in Docker, ensure `env_file: .env` is set in your `docker-compose.yml`.
- For Prisma, environment variables are not automatically loaded; ensure you import `dotenv/config` in your `prisma.config.ts` if needed.

---

### Database Schema

The backend uses a PostgreSQL database managed via Prisma ORM. Below is a summary of the main models:

#### User
- Represents a user of the CMS.
- Fields: `id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`.
- Relations: Has many `Session`, `Account`, and `Author` records.

#### Session
- Tracks user login sessions.
- Fields: `id`, `expiresAt`, `token`, `createdAt`, `updatedAt`, `ipAddress`, `userAgent`, `userId`.
- Relations: Linked to a `User`.

#### Account
- Stores authentication provider accounts (e.g., Google, local).
- Fields: `id`, `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `idToken`, `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope`, `password`, `createdAt`, `updatedAt`.
- Relations: Linked to a `User`.

#### Verification
- Handles verification flows (e.g., email verification).
- Fields: `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`.

#### Author
- Represents an author profile for a user.
- Fields: `id`, `userId`, `createdAt`, `updatedAt`.
- Relations: Linked to a `User` and has many `Article` records.

#### Article
- Represents an article written by an author.
- Fields: `id`, `title`, `body`, `tags`, `isPublished`, `authorId`, `createdAt`, `updatedAt`.
- Relations: Linked to an `Author`.

See prisma/schema.prisma for the full schema definition.
