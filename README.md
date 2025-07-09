# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)

## Padrões de Projeto
- **Componentização**: Componentes reutilizáveis organizados em `src/components`.
- **Pages/Rotas**: Páginas principais em `src/pages` usando React Router.
- **Hooks e React Query**: Gestão de dados assíncronos com React Query.
- **Estilos utilitários**: TailwindCSS para estilos rápidos e consistentes.

## Estrutura do Projeto
```
NLW-Agents-frontend/
├── public/                # Assets públicos
├── src/
│   ├── app.tsx            # Componente principal da aplicação
│   ├── main.tsx           # Ponto de entrada
│   ├── index.css          # Estilos globais (TailwindCSS)
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   └── lib/               # Librarias
```

## Instruções de Setup
1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/renatomachadoo/NLW-Agents-frontend
   cd NLW-Agents-frontend
   ```
2. **Instalar dependências:**
   ```bash
   npm install
   ```
3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
4. A aplicação estará disponível em `http://localhost:5173` (por predefinição).

## Notas
- Certifica-te que tens o Node.js instalado.
- O projeto utiliza o [Biome](https://biomejs.dev/) para lint e organização de imports (ver `.vscode/settings.json`).
- Algumas funcionalidades podem depender de uma API backend.
- Repositório da [API](https://github.com/renatomachadoo/NLW-Agents-backend)

---
Desenvolvido com 💜 durante o NLW da Rocketseat. 