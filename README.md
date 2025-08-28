
# Node.js Enterprise Demo Monorepo

This project demonstrates a production-ready Node.js + TypeScript monorepo with enterprise features commonly used in MNCs.


## Architecture & Usage Flow Diagram

```
		 +-------------------+         +-------------------+
		 |   Mobile Client   |         |   Web Client      |
		 +-------------------+         +-------------------+
				   |                           |
				   v                           v
		 +---------------------------------------------+
		 |                API Gateway                 |
		 | REST / GraphQL / gRPC / BFF / Auth / RBAC  |
		 +---------------------------------------------+
				   |             |             |
				   v             v             v
		 +----------------+ +----------------+ +----------------+
		 | User Service   | | Notification   | | Metrics/Tracing|
		 | (gRPC, Kafka)  | | Service        | | Prometheus,    |
		 | MongoDB, Redis | | Kafka, BullMQ  | | OpenTelemetry  |
		 +----------------+ +----------------+ +----------------+
				   |             |             |
				   v             v             v
		 +----------------+ +----------------+ +----------------+
		 |   MongoDB      | |    Redis       | |    Kafka       |
		 +----------------+ +----------------+ +----------------+
				   |             |             |
				   v             v             v
		 +---------------------------------------------+
		 |           Docker Compose Network            |
		 +---------------------------------------------+

How to use:
1. Run `docker-compose up --build` to start all services and dependencies.
2. Access API Gateway at `http://localhost:3000` for REST, GraphQL, BFF, and metrics endpoints.
3. User Service and Notification Service communicate via gRPC and Kafka.
4. MongoDB, Redis, and Kafka are managed as containers and used by all services.
5. Prometheus metrics and OpenTelemetry traces are exposed for monitoring.
6. All services are orchestrated and networked via Docker Compose.
```


## Local Development & Testing Guide (macOS)

### Prerequisites
- macOS (Apple Silicon or Intel)
- Node.js 20+ (recommended via [nvm](https://github.com/nvm-sh/nvm))
- Docker Desktop (for containers)
- npm (comes with Node.js)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd nodejs-enterprise-demo
npm install
```

### 2. Environment Setup
- Copy `.env.example` to `.env` and update secrets as needed:
	```bash
	cp .env.example .env
	# Edit .env for your local secrets
	```

### 3. Start All Services (Recommended: Docker Compose)
```bash
docker-compose up --build
```
- This will start MongoDB, Redis, Kafka, Zookeeper, and all Node.js services.
- You can also run each service manually:
	```bash
	npm run dev --workspace packages/api-gateway
	npm run dev --workspace packages/user-service
	npm run dev --workspace packages/notification-service
	# Start MongoDB, Redis, Kafka separately if not using Docker
	```

### 4. Test Endpoints
- API Gateway: http://localhost:3000
	- `/users` (REST)
	- `/graphql` (GraphQL)
	- `/bff/mobile` (BFF)
	- `/metrics` (Prometheus)
	- `/notifications` (Kafka)
- User Service: gRPC on port 50051
- Notification Service: REST/Kafka on port 4000

### 5. Run Tests
```bash
npm test
```
- Or run tests in each package:
	```bash
	npm test --workspace packages/api-gateway
	npm test --workspace packages/user-service
	npm test --workspace packages/notification-service
	```

### 6. Lint & Format
```bash
npm run lint
npm run format
```

### 7. CI/CD Pipeline
- See `.github/workflows/ci.yml` for automated build, lint, test, and Docker image build.

### 8. DevOps & Deployment
- Dockerfile and docker-compose for local dev
- Kubernetes manifests in `k8s/`
- Helm chart in `helm/`
- Terraform mock AWS infra in `terraform/`

### Troubleshooting
- If you see port conflicts, stop other local DBs/Redis/Kafka or change ports in `.env` and `docker-compose.yml`.
- For Apple Silicon, use compatible Docker images (all provided images are compatible).
- If you see TypeScript or npm errors, run `npm install` in the root and each package.
- For Kafka, Zookeeper, and Redis, ensure Docker containers are healthy before starting Node.js services.

---
Expand stubs and TODOs with Copilot for full implementations.

## Service-Specific Instructions

### API Gateway
- Entry point for all clients (REST, GraphQL, gRPC, BFF)
- Handles authentication, rate limiting, feature flags, i18n
- See `src/index.ts` for main logic and comments
- See `src/featureFlags.ts`, `src/i18n.ts`, `src/rateLimiter.ts` for advanced features
- Expand stubs for OpenTelemetry, Prometheus, OAuth2, RBAC, etc.

### User Service
- Handles user CRUD, authentication, and events
- Integrates with MongoDB, Redis, Kafka
- See `src/index.ts` for main logic and comments
- See `src/featureFlags.ts`, `src/i18n.ts`, `src/rateLimiter.ts` for advanced features
- Expand stubs for JWT, RBAC, gRPC, Kafka event handlers

### Notification Service
- Handles notifications via Kafka and BullMQ
- Integrates with Redis
- See `src/index.ts` for main logic and comments
- See `src/featureFlags.ts`, `src/i18n.ts`, `src/rateLimiter.ts` for advanced features
- Expand stubs for job processing, Kafka event handlers

## Code Comments & Stubs
- All complex logic and stubs are commented in the codebase.
	Look for `TODO` and comments in each file to expand with Copilot.
- Example: gRPC, Kafka, RBAC, OpenTelemetry, Prometheus, serverless, edge, AI/ML, etc.

---
Expand stubs and TODOs with Copilot for full implementations.



==========================================================================================

    1. Start the services (if not already running):
        Run docker-compose up --build in your project root.
    2. Open Postman and create a new request.
    3. Set the request URL to your API Gateway endpoint, e.g.:
        http://localhost:3000/users (GET) — returns users.
        http://localhost:3000/graphql (POST) — for GraphQL queries.
        http://localhost:3000/bff/mobile (GET) — BFF endpoint.
        http://localhost:3000/metrics (GET) — Prometheus metrics.
        http://localhost:3000/notifications (POST) — send notification.
    4. Set method and body:
        For users, use GET.
        For /notifications, use POST and set body to JSON:
    5. Send the request and view the response.

# nodejs-enterprise


