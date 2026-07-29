# HTML JIG ⚡
## Gerador de Sites com Inteligência Artificial (Node.js + NVIDIA AI)

[![HTML Jig Video](https://img.youtube.com/vi/uD-li67fNmg/0.jpg)](https://www.youtube.com/watch?v=uD-li67fNmg "Vídeo Demonstrativo do HTML Jig")

O **HTML Jig** é um gerador autônomo de páginas web desenvolvido em **Node.js** e **Express**, integrado aos servidores de Inteligência Artificial gratuitos da **NVIDIA** ([build.nvidia.com](https://build.nvidia.com)).

Ele permite criar sites completos, responsivos e estilizados em poucos segundos a partir de simples descrições em texto e escolha de modelos visuais.

---

## 🚀 Funcionalidades

- **100% Node.js & Express:** Funciona sem dependência do Google Firebase ou serviços pagos em nuvem.
- **Inteligência Artificial NVIDIA:** Conectado à API oficial de LLMs da NVIDIA (`https://integrate.api.nvidia.com/v1`) utilizando o modelo `meta/llama-3.1-8b-instruct` (ou outros modelos compatíveis).
- **Organização Automática:** Todas as novas páginas geradas são salvas automaticamente na pasta **`public/criacoes/`**.
- **Interface Web Interativa:** Formulário intuitivo para preenchimento de informações e escolha de templates W3.CSS.

---

## 📋 Pré-requisitos

1. **Node.js** (versão 18 ou superior): [Baixar Node.js](https://nodejs.org/pt-br/download/)
2. **Chave de API Gratuita da NVIDIA:** Obtenha gratuitamente em [build.nvidia.com](https://build.nvidia.com)

---

## 🛠️ Passo a Passo de Instalação e Execução

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/pwasystem/htmljig.git
   cd htmljig
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente (`.env`):**
   Crie ou edite o arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   NVIDIA_API_KEY=sua_chave_nvidia_aqui
   NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
   NVIDIA_MODEL=meta/llama-3.1-8b-instruct
   MAX_TOKENS=4096
   ```

4. **Iniciar o Servidor:**
   ```bash
   npm start
   ```

5. **Acessar o Sistema:**
   - **Página Inicial & Instruções:** [http://localhost:3000](http://localhost:3000)
   - **Formulário de Criação (Jig):** [http://localhost:3000/jig.html](http://localhost:3000/jig.html)

---

## 💡 Como Utilizar o HTML Jig

1. Abra a aplicação em `http://localhost:3000/jig.html`.
2. Preencha os campos solicitados:
   - **Nome do Arquivo (File Name):** O nome identificador para a página (ex: `minha-empresa`).
   - **Título (Title):** O nome da sua marca, empresa ou projeto.
   - **Descrição (Description):** Descreva os produtos, serviços, cores preferidas e seções desejadas.
   - **Template:** Selecione a estrutura base desejada (ex: *Website, Cafe, Band, Portfólio*, etc.).
   - **Imagens (opcional):** Adicione URLs de fotos para serem incluídas no layout.
3. Clique em **Criar** e aguarde a inteligência artificial gerar seu site.
4. Clique no link gerado para visualizar seu novo site diretamente na pasta de criações (`http://localhost:3000/criacoes/nome-do-arquivo.html`).

---

## 📂 Estrutura do Projeto

```
htmljig/
├── public/                # Arquivos estáticos da interface web
│   ├── criacoes/          # Pasta onde as páginas geradas são salvas
│   ├── index.html         # Página inicial e instruções
│   ├── jig.html           # Formulário de geração com a IA
│   └── ...
├── server.js              # Servidor Express & Integração com NVIDIA AI
├── package.json           # Dependências do Node.js
├── .env                   # Variáveis de ambiente (Chave NVIDIA, porta, etc.)
└── README.md              # Documentação do projeto
```

---

## 📄 Licença

Este projeto é disponibilizado sob a licença ISC. Desenvolvido por PWA System.
