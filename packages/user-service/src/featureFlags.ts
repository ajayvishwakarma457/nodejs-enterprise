// Feature flag integration with Unleash
import { initialize } from 'unleash-client';

const unleash = initialize({
  url: process.env.UNLEASH_URL || 'http://localhost:4242/api',
  appName: 'user-service',
  instanceId: 'user-service-1',
});

export default unleash;
