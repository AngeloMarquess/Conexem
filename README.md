# Conexem - EdTech Platform 🚀

[![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Fastify](https://img.shields.io/badge/Fastify-5.x-black?style=for-the-badge&logo=fastify)](https://www.fastify.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Conexem** é uma plataforma EdTech de ponta focada em engajamento extremo, construída com uma experiência de consumo inspirada nas interfaces de streaming (estilo Netflix) com Gamificação e Dashboards dinâmicos.

Desenvolvido projetando a erradicação do turnover (*churn*) educacional e elevando a experiência do aluno, a plataforma conta com integrações avançadas, gestão escalável e métricas em tempo real.

---

## 🔥 Principais Funcionalidades

### 🎓 **Experiência do Aluno (Streaming-Style)**
*   **Trilha Estilo Netflix:** Interface escura, limpa e moderna utilizando *TailwindCSS*.
*   **Hero Section Autoplay:** Destaque para a próxima aula sugerida, permitindo retomar de onde parou com um único clique.
*   **Gamificação Nativa:** Sistema real de XP, dias de ofensiva e crachás para incentivar acesso diário.
*   **Video Player Imersivo:** Experiência de visualização focada no conteúdo com Sidebar inteligente.

### 💼 **Painel Administrativo (Admin & Módulos)**
*   **Gestão de Integrações (Onipublish):** Fluxo robusto de ingestão externa via API para catálogos interconectados com um clique.
*   **Gestão de Cursos e Trilhas:** Adição de categorias visuais (Popups) e Thumbnails com Bucket nativo.
*   **Cadastro Complexo de Usuários:** Roles dinâmicas (`Administrador`, `Professor`, e `Aluno`) suportando sub-uploads de diplomas em buckets restritos de segurança.

### ⚙️ **Autenticação, Backend e Banco de Dados**
*   **Magic Auth & Google OAuth:** Infraestrutura Serverless focada com Supabase, login simplificado sem senhas obrigatórias e sincronização automática base-local via *Triggers*.
*   **Performance (Fastify + Vite):** Comunicação baseada em micro-rotas, entregando menor latência e tipagem restrita end-to-end com *Zod* e *TypeScript*.
*   **Telemetry & Observability:** Setup construído idealizando métricas de negócio.

---

## 🛠️ Arquitetura Técnica
A camada do projeto foi estruturada como um **Monorepo** dividido em duas aplicações unidas de ponta:

*   **`frontend`:** React 18, Vite, TailwindCSS v3, Zustand (Gerenciamento de contexto), React Router DOM e Lucide React para iconografia premium.
*   **`backend`:** Node.js 22, Fastify, Supabase SDK (Server-Side admin mappings), PostgreSQL logic bindings.

---

## 🚀 Como testar localmente

Clone o projeto para seu ambiente local:

```bash
git clone git@github.com:AngeloMarquess/Conexem.git
cd Conexem
```

### 1. Inicializando o Backend
```bash
cd backend
npm install

# Copie e preencha as variáveis de ambiente
cp .env.example .env

# Configure o banco (rode o arquivo schema.sql no seu painel do Supabase)
# Inicie a porta da API Fastify:
npm run dev
```

### 2. Inicializando o Frontend
```bash
cd frontend
npm install

# Configure sua Anon Key pública do Supabase
cp .env.example .env 

# Suba a interface do Vite
npm run dev
```
Acesse o app através da porta exibida, por padrão em `http://localhost:5173`.

---

## 📱 Capturas de Tela

*(Adicione prints do Dashboard Netflix e do Painel Administrativo com Tailwind Dark aqui para destacar a UI Premium no Portfólio)*

---

*Desenvolvido como case de inovação em arquitetura Educacional.* 🌟
