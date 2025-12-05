Resumo
-------
Atlas é  uma "agenda inteligente" que consolida rotinas, insights e métricas de produtividade. O projeto é uma base frontend (React + TypeScript + Vite) destinada a evoluir para um sistema mais completo com backend, data lake e módulo de IA (Neura).

Status
------
MVP — Frontend em desenvolvimento.

Principais objetivos
- Interface limpa e responsiva para exibir métricas, tarefas e progresso de projetos.
- Experiência voltada para produtividade e previsibilidade do usuário.
- Estrutura preparada para integrar backend / data lake e serviços de IA no futuro.

Tecnologias
-----------
- Node.js (recomendado: 16+ / 18+)
- Vite
- React
- TypeScript
- Tailwind CSS
- lucide-react (ícones)
- PostCSS
- ESLint (configuração incluída)

Estrutura do projeto
--------------------
/src
  /components
    Layout.tsx
    Sidebar.tsx
  /data
    mockdata.ts
  /pages
    Cockpit.tsx
    Dashboard.tsx
    Datalake.tsx
    Home.tsx
    Projects.tsx
  App.tsx
  main.tsx
  index.css
  vite-env.d.ts

Arquivos de configuração
- `package.json` — scripts e dependências
- `vite.config.ts` — configuração do Vite
- `tailwind.config.js` — configuração do Tailwind
- `postcss.config.js` — PostCSS
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`
- `.gitignore`

Como rodar (desenvolvimento)
----------------------------
1. Instalar dependências:
   npm install

2. Rodar servidor de desenvolvimento:
   npm run dev

3. Abrir no navegador:
   http://localhost:5173

Build e preview
---------------
- Criar build de produção:
  npm run build

- Servir build localmente (preview):
  npm run preview

Contribuindo
-----------
1. Abra uma issue descrevendo a mudança.
2. Crie uma branch a partir de `main`.
3. Faça PR com descrição clara e screenshots quando necessário.

Contato e referências
--------------------
- Repositórios relacionados:
  - Noésis: https://github.com/JhonTheDev/noesis
  - Cortéx: https://github.com/JhonTheDev/cortex
  - Neura: https://github.com/JhonTheDev/neura