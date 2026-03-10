1 BACKEND 

Você é um Arquiteto de Software Sênior e Especialista em EdTech. Sua tarefa é desenvolver a API REST completa para o backend de uma plataforma de e-learning premium. 

# CONTEXTO E OBJETIVO DO PROJETO
O maior problema desta plataforma é a evasão escolar (churn) causada por desorientação, falta de progresso visível e sobrecarga cognitiva. Para resolver isso, a arquitetura do sistema deve suportar uma "Experiência Netflix", focada em:
1. Microaulas e trilhas curtas (conteúdo direto ao ponto).
2. Gamificação (pontos e medalhas) para manter a motivação.
3. Telemetria avançada (logs comportamentais granulares) para alimentar dashboards de predição de evasão.
4. Comunicação ágil através de "Stories" (avisos curtos de professores para alunos).

# STACK TECNOLÓGICA OBRIGATÓRIA
- Node.js com TypeScript (usando Express ou Fastify).
- Banco de Dados: PostgreSQL gerenciado via Supabase.
- Autenticação: Supabase Auth (JWT).
- Validação de Dados: Zod.
- Arquitetura: Modular (Controllers, Services, Repositories, Routes, Middlewares).

# MODELAGEM DE DADOS (Crie o schema.sql completo)
Desenvolva a modelagem relacional contemplando as seguintes entidades:
- `users`: id (UUID), role (admin, teacher, student), full_name, email, created_at, last_login.
- `courses`: id, title, description, thumbnail_url, category.
- `modules`: id, course_id, title, order_index.
- `lessons`: id, module_id, title, video_url, duration_seconds, type (enum: video, quiz, practical_exercise), order_index. (Foco em microlearning).
- `user_progress`: id, user_id, lesson_id, status (enum: not_started, in_progress, completed), watch_time_seconds, completed_at. (Essencial para o recurso "Continuar Assistindo").
- `gamification_badges`: id, name, icon_url, required_points.
- `user_gamification`: user_id, total_points, current_level, earned_badges (relacionamento).
- `stories`: id, teacher_id, content, media_url, expires_at (default NOW() + 24h), created_at.
- `telemetry_logs` (Obrigatório para Churn Analytics): id, user_id, action_type (login, lesson_start, lesson_complete, story_view), timestamp.

# ROTAS DA API REST A SEREM IMPLEMENTADAS
Separe as rotas por domínios de negócio. Todas as rotas (exceto registro/login) devem usar um middleware `authMiddleware` que verifica o JWT do Supabase.

1. Domínio Auth & Users:
- POST `/auth/register` e POST `/auth/login`.
- GET `/users/profile`: Retorna dados do usuário, progresso global e pontuação de gamificação.

2. Domínio Content (Experiência Netflix):
- GET `/courses/catalog`: Retorna cursos agrupados por categoria para alimentar os carrosséis horizontais.
- GET `/courses/:id/roadmap`: Retorna a estrutura (módulos e aulas) mesclada com o `user_progress` do aluno logado para mostrar exatamente onde ele parou.
- GET `/user/continue-watching`: Retorna a última aula que o usuário deixou com status `in_progress`.

3. Domínio Progresso & Gamificação:
- POST `/lessons/:id/progress`: Recebe { status, watch_time }. Atualiza o progresso. Se status == 'completed', dispara a lógica para dar X pontos ao usuário e gerar um log na tabela `telemetry_logs`.
- GET `/user/badges`: Retorna as medalhas conquistadas pelo aluno.

4. Domínio Comunicação (Stories):
- POST `/stories`: (Middleware restrito a 'teacher'/'admin'). Cria um aviso rápido.
- GET `/stories/active`: Retorna os stories não expirados (expires_at > NOW()) ordenados dos mais recentes para os mais antigos.

5. Domínio Analytics & Prevenção de Evasão (Painel do Professor):
- Rotas restritas a 'teacher' e 'admin'.
- GET `/analytics/churn-risk`: Identifica usuários em risco. A lógica deve cruzar dados: alunos que não têm logs em `telemetry_logs` há mais de 7 dias OU que estão com módulos estagnados.
- GET `/analytics/cohort`: Análise de coorte mostrando a taxa de retenção dos alunos mês a mês.

# REQUISITOS DE SEGURANÇA E PADRÕES
- Implemente RBAC (Role-Based Access Control) nos middlewares para garantir que apenas professores/admins acessem as rotas de criação de cursos e analytics.
- Use transações no banco de dados (Transactions) quando for atualizar o progresso do aluno e sua pontuação de gamificação simultaneamente.
- Trate os erros globais enviando respostas padronizadas (ex: { "error": "User not found", "status": 404 }).

Por favor, gere todo o código backend, incluindo a configuração do Supabase client, os scripts SQL para o banco de dados e a estrutura completa de pastas e arquivos no Node.js.
Este prompt fornece à Inteligência Artificial as estruturas exatas de banco de dados para suportar a análise preditiva de retenção, a lógica de microaulas com gamificação e a restrição de segurança (RBAC) necessária para um sistema sólido
.
Como implementar a telemetria para prever risco de evasão?
Quais gatilhos de gamificação aumentam mais a retenção de alunos?
Como estruturar o esquema SQL para os Stories dos professores?
detalhe mais ainda o prompt para o frontend dando mais contexto e informações  do projeto

Com base nas pesquisas sobre as causas de evasão (como sobrecarga cognitiva, falta de percepção de progresso e desorientação
) e as soluções de design baseadas no comportamento do usuário (layout limpo, navegação intuitiva, progressão automática e painéis analíticos visuais
), estruturei um prompt extremamente detalhado para o Frontend.
Ele explica o porquê de cada tela existir, dando à Inteligência Artificial (como o Google Antigravity) o contexto exato de UX/UI necessário para gerar um código focado em retenção de alunos.


2- FRONTEND

Você é um Arquiteto de Frontend Sênior e Especialista em UX/UI com foco em Retenção de Usuários. Sua tarefa é desenvolver o frontend completo em React para uma plataforma EdTech (E-learning) projetada especificamente para combater a evasão de alunos (churn).

# CONTEXTO DO PROJETO E PROBLEMA A RESOLVER
Estudos mostram que os alunos abandonam cursos por desorientação, interface poluída, falta de percepção de progresso e isolamento. 
Para resolver isso, a plataforma deve ter uma experiência premium inspirada na Netflix: navegação por carrosséis, design limpo (menos é mais), progressão visual evidente (barras de progresso onipresentes), e forte senso de comunidade através de comunicação rápida (Stories de professores).

# STACK TECNOLÓGICA OBRIGATÓRIA
- Framework: React (com Vite) e TypeScript.
- Estilização: TailwindCSS (Mobile-first, Dark Mode nativo).
- Roteamento: React Router DOM.
- Gerenciamento de Estado Global: Zustand (preferencial) ou Context API.
- Requisições: Axios (com interceptors para injetar o JWT token).
- Gráficos (Dashboard): Recharts.
- Ícones: Lucide React ou Phosphor Icons.

# DIRETRIZES DE DESIGN SYSTEM (UX/UI)
- Tema: Dark mode por padrão (fundo escuro, textos claros), transmitindo uma sensação de imersão e foco (estilo cinema/streaming).
- Responsividade: Absoluta. O sistema deve funcionar perfeitamente em smartphones, pois a ubiquidade de acesso é vital para a retenção.
- Esqueletos de Carregamento (Skeleton Screens): Devem ser usados em todas as requisições assíncronas para manter a percepção de alta performance.

# ARQUITETURA DE COMPONENTES E TELAS (Gerar o código para:)

## 1. Área do Aluno (Interface Estilo Streaming)
- `Header`: Fixo no topo. Logo à esquerda, barra de busca (com ícone) no centro, e menu de perfil/notificações à direita.
- `StoriesBar` (Inovação): Uma barra horizontal logo abaixo do header contendo avatares circulares dos professores com bordas coloridas (indicando novos recados). Ao clicar, abre um `StoryModal` em tela cheia com um timer no topo, exibindo um vídeo curto ou texto de aviso, e permitindo pular para o próximo.
- `HeroContinueWatching`: O componente principal da tela. Um banner grande em destaque mostrando a exata última aula que o aluno deixou pela metade, com uma barra de progresso e um botão primário grande: "Continuar Assistindo".
- `CourseCarousel`: Listas horizontais com scroll nativo (swipe no mobile). Categorias dinâmicas ("Seu Progresso", "Recomendações", "Em Alta").
- `CourseCard`: Componente reutilizável contendo a thumbnail da aula, título conciso, e obrigatoriamente uma pequena barra de progresso horizontal na base da imagem (para gamificação visual).

## 2. Sala de Aula Virtual (Foco em Microlearning)
- Layout Dividido: Player de vídeo ocupando a maior parte da tela (com botões customizados de velocidade e picture-in-picture) e uma `Sidebar` colapsável à direita.
- `SidebarRoadmap`: Lista os módulos e aulas. A aula atual deve estar destacada. Aulas concluídas devem ter um ícone de "Check" verde.
- `AutoPlay`: Ao final do vídeo, deve surgir um contador regressivo (ex: 5 segundos) para iniciar automaticamente a "Próxima Aula".
- `GamificationFeedback`: Um toast ou modal de celebração sutil que aparece quando o usuário ganha pontos ou uma medalha (badge) ao concluir um módulo.

## 3. Painel de Prevenção de Evasão (Área do Professor/Admin)
Esta área deve traduzir dados complexos em visuais simples para tomada de decisão rápida.
- `DashboardLayout`: Menu lateral de navegação administrativa.
- `KpiCards`: Cards no topo mostrando: Total de Alunos, Taxa de Engajamento, e Alunos em Risco Crítico.
- `ChurnRiskScatterChart`: Gráfico de dispersão (usando Recharts). Eixo X = "Dias sem acessar" e Eixo Y = "Progresso no Curso (%)". Isso ajuda a identificar visualmente os quadrantes de alunos inativos e estagnados.
- `InactiveUsersTable`: Uma tabela listando alunos inativos há mais de 7 dias, contendo colunas: Nome, Último Acesso, Módulo Atual, Risco (Alto/Médio/Baixo com badges coloridos) e um botão de ação rápida "Enviar Mensagem de Resgate".

# REQUISITOS DE IMPLEMENTAÇÃO
- Crie componentes granulares (ex: separe o `ProgressBar`, `Button`, `Avatar` em uma pasta `/components/ui`).
- Implemente um arquivo central de configuração de rotas protegidas (Private Routes), que redireciona usuários sem token para a tela de `/login`.
- Construa a estrutura de pastas seguindo um padrão escalável (ex: `/src/components`, `/src/pages`, `/src/store`, `/src/services`, `/src/utils`).

Por favor, forneça o código de ponta a ponta, abrangendo a configuração do projeto, o roteamento e a implementação detalhada dos componentes principais solicitados (com foco especial na Home estilo Netflix e no Dashboard do Professor).
Por que esse prompt funciona perfeitamente para IAs geradoras de código?
Especificidade de Bibliotecas: Ao invés de pedir apenas "um gráfico", ele especifica a biblioteca (Recharts) e o tipo de gráfico exato que resolve o seu problema de análise de retenção (ScatterChart cruzando dias sem acesso x notas)
.
Arquitetura de UI: A IA recebe a instrução clara de usar Skeleton Screens e Dark Mode do Tailwind, que são essenciais na experiência premium (estilo Netflix)
.
Regras de Negócio no Frontend: A IA já vai programar a interface da sala de aula com AutoPlay e a barra de Stories interativa, conectando o comportamento visual à sua meta de reduzir a desorientação e aumentar o engajamento