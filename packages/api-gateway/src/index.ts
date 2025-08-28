import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import csurf from 'csurf';
import dotenv from 'dotenv';
import pino from 'pino';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { trace } from '@opentelemetry/api';
import client from 'prom-client';
// ...other imports (gRPC, BFF, OpenTelemetry, etc.)
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { Kafka } from 'kafkajs';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';


dotenv.config();
// OpenTelemetry Tracing setup
const tracerProvider = new NodeTracerProvider();
tracerProvider.register();
registerInstrumentations({ tracerProvider });
const tracer = trace.getTracer('api-gateway');

// Prometheus metrics setup using prom-client
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const app = express();
const logger = pino();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(csurf({ cookie: true }));

// Example RBAC middleware
function rbac(role: string) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Example: check user role from JWT (stub)
    const user = (req as any).user || {};
    if (user.role === role) return next();
    return res.status(403).json({ error: 'Forbidden' });
  };
}

// Example OAuth2 setup (Google)
passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback',
}, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
  // TODO: Find or create user in DB
  return done(null, profile);
}));
app.use(passport.initialize());
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.json({ message: 'Google OAuth2 success', user: req.user });
});

// Example OAuth2 setup (Facebook)
passport.use(new FacebookStrategy({
  clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID || '',
  clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET || '',
  callbackURL: '/auth/facebook/callback',
}, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
  // TODO: Find or create user in DB
  return done(null, profile);
}));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.json({ message: 'Facebook OAuth2 success', user: req.user });
});

// REST endpoint example
// Example gRPC client call to user-service
app.get('/users', async (req: express.Request, res: express.Response) => {
  // gRPC setup
  const protoPath = __dirname + '/user.proto'; // Place your proto file here
  const packageDef = loadSync(protoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
  const userProto = loadPackageDefinition(packageDef).user as any;
  const client = new userProto.UserService('localhost:50051', credentials.createInsecure());
  client.GetUsers({}, (err: any, response: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.users);
  });
});

// Example Kafka producer call
const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
const producer = kafka.producer();
producer.connect();
app.post('/notifications', async (req: express.Request, res: express.Response) => {
  const { message } = req.body;
  await producer.send({
    topic: 'notifications',
    messages: [{ value: message }],
  });
  res.json({ status: 'Notification sent' });
});

// GraphQL endpoint
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: { hello: () => 'Hello GraphQL!' },
  graphiql: true,
}));

// BFF endpoint for mobile
app.get('/bff/mobile', (req, res) => {
  // TODO: Aggregate data for mobile clients
  res.json({ message: 'BFF response' });
});

// gRPC client stub
// TODO: Implement gRPC client to user-service

// Prometheus metrics endpoint
// Prometheus metrics endpoint (metrics are exposed directly)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  // TODO: Cleanup resources
  process.exit(0);
});

app.listen(process.env.PORT || 3000, () => {
  logger.info(`API Gateway running on port ${process.env.PORT || 3000}`);
});

export default app;
