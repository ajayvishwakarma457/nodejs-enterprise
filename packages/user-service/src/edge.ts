// Cloudflare Worker style handler stub
export default {
  async fetch(request: Request) {
    // TODO: Implement edge logic for user-service
    return new Response('Hello from Edge (user-service)!', { status: 200 });
  },
};
