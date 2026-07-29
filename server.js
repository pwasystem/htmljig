const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Carregar variáveis do arquivo .env nativamente
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
}

loadEnv();

const PORT = process.env.PORT || 3000;

// MIME types para o servidor estático nativo
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

// Hash do nome do arquivo
function hash(word) {
  if (!word) word = 'pagina';
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .toLowerCase();
}

// Buscar o template no W3Schools
function getTemplate(template) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.w3schools.com/w3css/tryw3css_templates_${template}.htm`, res => {
      let html = '';
      res.on('data', d => html += d);
      res.on('end', () => resolve(html));
    }).on('error', e => reject(e));
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers nativos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Rota POST /jig - Geração de HTML com IA (NVIDIA)
  if (req.url === '/jig' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        let data = {};
        if (body) {
          try {
            data = JSON.parse(body);
          } catch (e) {
            data = { description: body };
          }
        }

        console.log('[HTMLJig Nativo] Iniciando geração...', { title: data.title, template: data.template });

        const htmlTemplate = await getTemplate(data.template || 'website');
        const imagesInfo = data.images ? ` and this image list: ${data.images} ;` : '';
        const message = `Always return ONLY valid HTML code without explanations.\nUse the HTML template below ${imagesInfo} to create a website for your company:\n${data.title}, ${data.description}.\nYou must create all the texts and find images relevant to the topic, create an html and just provide the code.\n\n\`\`\`html\n${htmlTemplate}\n\`\`\``;

        const baseUrl = (process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
        const apiUrl = `${baseUrl}/chat/completions`;

        const payload = {
          model: process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are an expert web designer AI. Always return ONLY clean, working HTML code without explanations, markdown intros or outros.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          top_p: 1,
          max_tokens: parseInt(process.env.MAX_TOKENS) || 4096,
        };

        const nvidiaRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NVIDIA_API_KEY || ''}`,
          },
          body: JSON.stringify(payload),
        });

        if (!nvidiaRes.ok) {
          const errText = await nvidiaRes.text();
          throw new Error(`NVIDIA API HTTP ${nvidiaRes.status}: ${errText || nvidiaRes.statusText}`);
        }

        const completion = await nvidiaRes.json();
        let code = completion.choices?.[0]?.message?.content || '';

        code = code.replace(/```html/gi, '').replace(/```/g, '').trim();

        const fileHash = hash(data.file || data.title);
        const criacoesDir = path.join(__dirname, 'public', 'criacoes');
        if (!fs.existsSync(criacoesDir)) {
          fs.mkdirSync(criacoesDir, { recursive: true });
        }

        const targetPath = path.join(criacoesDir, `${fileHash}.html`);
        fs.writeFileSync(targetPath, code, 'utf8');

        console.log(`[HTMLJig Nativo] Arquivo gerado com sucesso: public/criacoes/${fileHash}.html`);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          title: data.title,
          hash: `criacoes/${fileHash}`,
        }));
      } catch (error) {
        console.error('[HTMLJig Nativo] Erro na geração:', error);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: error.message || 'Erro ao gerar página HTML.' }));
      }
    });
    return;
  }

  // Servidor de arquivos estáticos da pasta public/
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, 'public', safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Página Não Encontrada</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[HTMLJig Nativo] Servidor rodando em http://localhost:${PORT}`);
  console.log(`[HTMLJig Nativo] Endpoint IA: ${process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'}`);
  console.log(`[HTMLJig Nativo] Modelo: ${process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct'}`);
  console.log(`[HTMLJig Nativo] ⚡ Rodando 100% nativo em Node.js (0 dependências NPM)`);
});
