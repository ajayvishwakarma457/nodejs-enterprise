// Cloudflare Worker style handler stub
export default {
  async fetch(request: Request) {
    // TODO: Implement edge logic for notification-service
    return new Response('Hello from Edge (notification-service)!', { status: 200 });
  },
};
