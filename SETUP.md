# Steps to Run the Project Locally

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Docker & Docker Compose (for running services)
- (Optional) Helm & Kubernetes (for k8s deployment)

## 1. Clone the Repository
```
git clone https://github.com/ajayvishwakarma457/nodejs-enterprise.git
cd nodejs-enterprise
```

## 2. Install Dependencies
```
npm install
```
Or, for each package:
```
cd packages/api-gateway && npm install
cd ../notification-service && npm install
cd ../user-service && npm install
```

## 3. Environment Setup
- Copy `.env.example` to `.env` in each service (if available)
- Fill in required environment variables

## 4. Run Services Locally
### Using npm scripts (recommended for development)
```
# In each service directory:
npm run dev
```
Or, use the root scripts if available:
```
npm run start:all
```

### Using Docker Compose
```
docker-compose up --build
```

## 5. Run Tests
```
npm test
```
Or, for each package:
```
cd packages/api-gateway && npm test
cd ../notification-service && npm test
cd ../user-service && npm test
```

## 6. Lint & Build
```
npm run lint
npm run build
```

## 7. Kubernetes/Helm Deployment (Optional)
- See `k8s/` and `helm/` directories for deployment manifests and charts
- Example:
```
kubectl apply -f k8s/
# or
helm install nodejs-enterprise ./helm
```

## 8. Accessing the Application
- API Gateway: http://localhost:PORT (see `.env` or Docker Compose)
- Other services: see respective ports in configs

---
For more details, see the README.md and service-specific documentation.
