import edgeTunnel from './_worker.js';

const fallbackHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to nginx!</title>
  <style>
    body{width:35em;margin:4rem auto;font-family:Tahoma,Verdana,Arial,sans-serif;line-height:1.5}
    code{background:#f4f4f4;padding:.1rem .3rem}
  </style>
</head>
<body>
  <h1>Welcome to nginx!</h1>
  <p>If you see this page, the web server is successfully installed and working.</p>
  <p><em>Thank you for using nginx.</em></p>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    try {
      return await edgeTunnel.fetch(request, env, ctx);
    } catch (error) {
      console.error('EdgeTunnel request failed', error?.stack || error?.message || String(error));

      const upgrade = (request.headers.get('Upgrade') || '').toLowerCase();
      const acceptsHtml = (request.headers.get('Accept') || '').includes('text/html');
      if (request.method === 'GET' && upgrade !== 'websocket' && acceptsHtml) {
        return new Response(fallbackHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-store',
            'X-EdgeTunnel-Fallback': '1',
          },
        });
      }

      throw error;
    }
  },
};
