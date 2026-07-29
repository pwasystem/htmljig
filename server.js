require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o cliente OpenAI apontando para o endpoint da NVIDIA / NIM Service
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || 'dummy-key',
  baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
});

app.use(cors());
app.use(express.json());
app.use(express.text({ type: '*/*' }));
app.use(express.static(path.join(__dirname, 'public')));

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

// Rota principal para gerar HTML
app.post('/jig', async (req, res) => {
  try {
    let data;
    if (typeof req.body === 'string') {
      try {
        data = JSON.parse(req.body);
      } catch (err) {
        data = req.body;
      }
    } else {
      data = req.body || {};
    }

    console.log('[HTMLJig] Iniciando geração...', { title: data.title, template: data.template });

    const htmlTemplate = await getTemplate(data.template || 'website');
    const imagesInfo = data.images ? ` and this image list: ${data.images} ;` : '';
    const message = `Always return ONLY valid HTML code without explanations.\nUse the HTML template below ${imagesInfo} to create a website for your company:\n${data.title}, ${data.description}.\nYou must create all the texts and find images relevant to the topic, create an html and just provide the code.\n\n\`\`\`html\n${htmlTemplate}\n\`\`\``;

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

    const completion = await openai.chat.completions.create(payload);

    let code = completion.choices[0]?.message?.content || '';

    // Limpar delimitadores de markdown se houver
    code = code.replace(/```html/gi, '').replace(/```/g, '').trim();

    const fileHash = hash(data.file || data.title);

    const criacoesDir = path.join(__dirname, 'public', 'criacoes');
    if (!fs.existsSync(criacoesDir)) {
      fs.mkdirSync(criacoesDir, { recursive: true });
    }

    const targetPath = path.join(criacoesDir, `${fileHash}.html`);
    fs.writeFileSync(targetPath, code, 'utf8');

    console.log(`[HTMLJig] Arquivo gerado com sucesso: public/criacoes/${fileHash}.html`);

    res.json({
      title: data.title,
      hash: `criacoes/${fileHash}`,
    });
  } catch (error) {
    console.error('[HTMLJig] Erro na geração:', error);
    res.status(500).json({ error: error.message || 'Erro ao gerar página HTML.' });
  }
});

app.listen(PORT, () => {
  console.log(`[HTMLJig] Servidor rodando em http://localhost:${PORT}`);
  console.log(`[HTMLJig] Endpoint IA: ${process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'}`);
  console.log(`[HTMLJig] Modelo: ${process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct'}`);
});
