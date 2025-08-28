// Feature flag integration with Unleash
import { initialize } from 'unleash-client';

const unleash = initialize({
  url: process.env.UNLEASH_URL || 'http://localhost:4242/api',
  appName: 'api-gateway',
  instanceId: 'api-gateway-1',
});

export default unleash;
