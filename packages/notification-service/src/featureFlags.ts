// Feature flag integration with Unleash
import { initialize } from 'unleash-client';

const unleash = initialize({
  url: process.env.UNLEASH_URL || 'http://localhost:4242/api',
  appName: 'notification-service',
  instanceId: 'notification-service-1',
});

export default unleash;
