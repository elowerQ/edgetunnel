const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to nginx!</title>
  <style>
    body{width:35em;margin:4rem auto;font-family:Tahoma,Verdana,Arial,sans-serif;line-height:1.5}
  </style>
</head>
<body>
  <h1>Welcome to nginx!</h1>
  <p>If you see this page, the nginx web server is successfully installed and working.</p>
  <p><em>Thank you for using nginx.</em></p>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(page, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-store',
      },
    });
  },
};
