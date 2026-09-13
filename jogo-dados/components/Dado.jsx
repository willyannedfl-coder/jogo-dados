import styles from "./Dado.module.css";

const IMAGENS_DADO = {
  1: "/dados/dado-1.svg",
  2: "/dados/dado-2.svg",
  3: "/dados/dado-3.svg",
  4: "/dados/dado-4.svg",
  5: "/dados/dado-5.svg",
  6: "/dados/dado-6.svg",
};

/**
 * Exibe a imagem do dado correspondente ao valor sorteado (1 a 6).
 * As imagens ficam em /public/dados e são servidas pelo próprio projeto.
 */
export default function Dado({ valor, animando = false }) {
  const src = IMAGENS_DADO[valor] ?? IMAGENS_DADO[1];

  return (
    <div className={`${styles.dado} ${animando ? styles.rolando : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Dado mostrando o número ${valor}`}
        className={styles.imagem}
        draggable={false}
      />
    </div>
  );
}
