# Fake Store

Este repositório contém uma aplicação front-end construída com React + TypeScript e empacotada com Vite. É uma implementação leve de uma "Fake Store" com suporte a PWA (service worker), componentes UI reutilizáveis e integração com Tailwind.

## Principais características

- React 19 + TypeScript
- Vite como bundler e servidor de desenvolvimento
- Tailwind CSS para estilos utilitários
- PWA (arquivos de service worker e registros em `dev-dist/`)
- Componentes reutilizáveis em `src/components` (ex.: `CamCapture.tsx`)

## Requisitos

- Node.js (versão LTS recomendada). Verifique com `node -v`.
- npm ou yarn

## Como rodar (Desenvolvimento)

Abra um terminal (PowerShell no Windows) na raiz do projeto e execute:

```powershell
# instalar dependências
npm install

# iniciar o servidor de desenvolvimento (Vite)
npm run dev
```

O Vite iniciará um servidor de desenvolvimento (por padrão em http://localhost:5173). O HMR atualizará a aplicação enquanto você edita os arquivos.

## Build e Preview (produção)

```powershell
# compilar TypeScript e gerar build de produção
npm run build

# ver um preview local do build de produção
npm run preview
```

## Scripts úteis (conforme `package.json`)

- `npm run dev` - Inicia o servidor de desenvolvimento (Vite)
- `npm run build` - Compila TypeScript (tsc -b) e gera o build com Vite
- `npm run preview` - Serve o diretório de produção para preview
- `npm run lint` - Executa o ESLint na base de código

## Estrutura do projeto

Principais arquivos e pastas:

- `index.html` - entrada HTML
- `src/` - código-fonte da aplicação
  - `main.tsx` - bootstrap do React
  - `App.tsx` - componente raiz
  - `components/` - componentes React (ex.: `CamCapture.tsx`, `ui/`)
  - `lib/utils.ts` - utilitários
  - `index.css` - estilos globais (Tailwind)
- `public/` - ativos estáticos e ícones PWA
- `dev-dist/` - artefatos relacionados ao service worker e PWA (ex.: `sw.js`, `registerSW.js`)
- `vite.config.ts`, `tsconfig.json` - configuração do build/tooling

## Observações sobre PWA

O projeto já inclui arquivos relacionados a PWA em `dev-dist/` e ícones em `public/`. Se quiser testar o comportamento PWA localmente numa build de produção, gere o build (`npm run build`) e então use `npm run preview` para servir o conteúdo.

## Componentes notáveis

- `src/components/CamCapture.tsx` — componente para captura de câmera
- `src/components/ui/` — coleção de componentes UI (botões, cards, inputs) com variações utilitárias

## Contribuição

1. Fork o repositório
2. Crie uma branch com a sua feature: `git checkout -b feature/nome-da-feature`
3. Faça commits atômicos e descritivos
4. Abra um pull request descrevendo a mudança

Sinta-se à vontade para abrir issues em caso de bugs ou sugestões.

## Licença

Este projeto vem sem uma licença explícita no repositório. Se você pretende publicar ou compartilhar, recomendo adicionar um arquivo `LICENSE` (por exemplo, MIT).
