# RocketLab - Sistema de Compras Online

RocketLab é um projeto de frontend para um sistema de e-commerce moderno, desenvolvido com React, TypeScript, Vite e TailwindCSS. O objetivo é oferecer uma experiência de compra intuitiva, responsiva e com recursos de favoritos e carrinho persistentes.

## ✨ Funcionalidades

- Visualizar uma lista de produtos na Home
- Filtrar produtos por categoria, preço e avaliação
- Pesquisar produtos pelo nome
- Visualizar informações detalhadas de um produto
- Adicionar ou remover produtos do carrinho de compras
- Visualizar o valor total do carrinho em tempo real
- Adicionar ou remover produtos dos favoritos (com persistência)
- Visualizar todos os produtos favoritos em uma página dedicada
- Contagem de itens do carrinho e favoritos na Navbar
- Finalizar a compra do carrinho (simulação)
- Layout responsivo e moderno com TailwindCSS

## 🚀 Tecnologias Utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build e dev server)
- [TailwindCSS](https://tailwindcss.com/) (estilização)
- [React Router](https://reactrouter.com/) (rotas)
- Context API para gerenciamento global de estado (carrinho e favoritos)

## 📦 Estrutura de Pastas

```
frontend-rocketlab/
├── src/
│   ├── components/         # Componentes reutilizáveis (Navbar, ProductCard, Sidebar)
│   ├── contexts/           # Contextos globais (CartContext, FavoritesContext)
│   ├── data/               # Mock de produtos
│   ├── Pages/              # Páginas principais (Home, Produto, Carrinho, Favoritos)
│   ├── App.tsx             # Componente principal e rotas
│   └── ...
├── public/                 # Arquivos estáticos
├── package.json            # Dependências e scripts
└── ...
```

## 🛠️ Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [pnpm](https://pnpm.io/) instalado (ou use npm/yarn se preferir)

### Passo a passo

1. Clone o repositório:

   ```powershell
   git clone https://github.com/SardinhaK/RocketLab/
   cd RocketLab/frontend-rocketlab
   ```

2. Instale as dependências:

   ```powershell
   pnpm install
   ```

3. Rode o projeto:

   ```powershell
   pnpm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

## 🧩 Principais Contextos Globais

- **CartContext**: Gerencia o estado do carrinho de compras, incluindo produtos, quantidades e valor total. Persistência automática no localStorage.
- **FavoritesContext**: Gerencia os produtos favoritos do usuário, com persistência no localStorage. Permite adicionar/remover favoritos de qualquer lugar do app.

## 📄 Páginas

- **Home**: Lista de produtos, filtros, busca e navegação.
- **Detalhe do Produto**: Informações detalhadas, botão de adicionar ao carrinho e favoritar.
- **Carrinho**: Lista de produtos adicionados, alteração de quantidades, valor total e finalização.
- **Favoritos**: Lista de produtos marcados como favoritos, com opção de remover.
- **404**: Página de erro para rotas não encontradas.

## 💡 Observações

- O projeto utiliza apenas frontend (não há backend incluso).
- Os dados dos produtos são mockados em `src/data/products.ts`.
- O estado do carrinho e dos favoritos é persistido no localStorage do navegador.
- O layout é totalmente responsivo e adaptado para dispositivos móveis.


---

RocketLab © 2025 —