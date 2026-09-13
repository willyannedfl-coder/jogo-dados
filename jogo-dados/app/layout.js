import "./globals.css";

export const metadata = {
  title: "Jogo de Dados",
  description: "Jogo de dados para 2 jogadores, em 5 rodadas — feito em Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
