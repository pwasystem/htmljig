# HTML JIG ⚡
## Gerador de Sites com Inteligência Artificial (Node.js 100% Nativo - 0 Dependências NPM)

[![HTML Jig Video](https://img.youtube.com/vi/uD-li67fNmg/0.jpg)](https://www.youtube.com/watch?v=uD-li67fNmg "Vídeo Demonstrativo do HTML Jig")

O **HTML Jig** é um gerador de páginas web autônomo e ultrarrápido desenvolvido utilizando **100% de recursos nativos do Node.js** (`http`, `fs`, `path`, `fetch`), sem necessidade de instalar nenhuma biblioteca externa (0 dependências no `package.json`).

Conectado gratuitamente à API de IA da **NVIDIA** ([build.nvidia.com](https://build.nvidia.com)), ele gera sites profissionais completos a partir de uma simples descrição de texto.

---

## 🚀 Destaques da Arquitetura Nativa

- **Zero Dependências NPM:** Não necessita de Express, Cors, Dotenv ou SDKs de terceiros. Roda nativamente com os módulos da biblioteca padrão do Node.js.
- **Fetch API Nativo:** Conecta-se diretamente aos servidores de IA da NVIDIA (`https://integrate.api.nvidia.com/v1`) através da `fetch` API nativa do Node.js.
- **Organização Automática:** Salva todas as novas páginas geradas dentro do diretório **`public/criacoes/`**.
- **Servidor Estático Integrado:** Serve arquivos HTML, CSS, JavaScript e mídias diretamente da pasta `public/`.

---

## 📋 Pré-requisitos

1. **Node.js** (v18 ou superior): [Baixar Node.js](https://nodejs.org/pt-br/download/)
2. **Chave de API Gratuita da NVIDIA:** Obtenha em [build.nvidia.com](https://build.nvidia.com)

---

## 🛠️ Instalação e Execução

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/pwasystem/htmljig.git
   cd htmljig
   ```

2. **Configurar o Arquivo `.env`:**
   Crie ou edite o arquivo `.env` na raiz do projeto com sua chave:
   ```env
   PORT=3000
   NVIDIA_API_KEY=sua_chave_nvidia_aqui
   NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
   NVIDIA_MODEL=meta/llama-3.1-8b-instruct
   MAX_TOKENS=4096
   ```

3. **Iniciar o Servidor Nativo (sem precisar dar `npm install`!):**
   ```bash
   npm start
   # ou
   node server.js
   ```

4. **Acessar o Sistema:**
   - **Página Inicial:** [http://localhost:3000](http://localhost:3000)
   - **Formulário de Criação:** [http://localhost:3000/jig.html](http://localhost:3000/jig.html)

---

## 💡 Como Usar

1. Abra [http://localhost:3000/jig.html](http://localhost:3000/jig.html).
2. Informe o **Nome do Arquivo**, **Título**, **Descrição** do seu projeto e selecione um **Template**.
3. Clique em **Criar** e aguarde a IA construir seu site.
4. Clique no link para visualizar sua página gerada na pasta de criações (`http://localhost:3000/criacoes/nome-do-arquivo.html`).

---

## 📄 Licença

Desenvolvido por PWA System sob a licença ISC.
