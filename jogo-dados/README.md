# jogo-dados

Jogo de dados para 2 jogadores, disputado em 5 rodadas, feito em Next.js (App Router).

## Regras

- Cada jogador possui 2 dados.
- A cada rodada, primeiro o Jogador 1 joga os dados, depois o Jogador 2 (apenas um botão fica habilitado por vez).
- Vence a rodada quem tirar a maior soma dos dois dados; em caso de igualdade, a rodada é empatada.
- Após 5 rodadas, vence a partida quem tiver mais rodadas vencidas; se houver igualdade, a partida termina empatada.
- O botão **Jogar Novamente** reinicia o jogo do zero.

## Estrutura principal

```
app/
  layout.js        -> layout raiz, importa o CSS global
  page.js           -> renderiza <JogoDados />
  globals.css        -> tokens de cor/tipografia e estilos globais
components/
  Dado.jsx            -> recebe a prop "valor" (1 a 6) e exibe a imagem do dado
  Dado.module.css
  JogoDados.jsx       -> estado do jogo (rodadas, placar, turnos) e regras
  JogoDados.module.css
public/dados/
  dado-1.svg ... dado-6.svg  -> imagens dos dados, salvas no próprio projeto
```

## Rodando localmente

Pré-requisito: Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

## Build de produção

```bash
npm run build
npm run start
```

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Jogo de dados em Next.js"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

