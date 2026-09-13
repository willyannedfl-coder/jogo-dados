"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "./JogoDados.module.css";

const TOTAL_RODADAS = 5;

const ESTADO_INICIAL = {
  rodada: 1,
  vez: 1, 
  dadosJogador1: null, 
  dadosJogador2: null,
  mensagemRodada: "",
  mensagemFinal: null, 
  animando: null, 
  placar: { jogador1: 0, jogador2: 0, empates: 0 },
  jogoFinalizado: false,
};

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function somaDados([a, b]) {
  return a + b;
}

function textoRodada(resultado) {
  if (resultado === "jogador1") return "Jogador 1 venceu";
  if (resultado === "jogador2") return "Jogador 2 venceu";
  return "Empate";
}

function textoFinal(placar) {
  if (placar.jogador1 > placar.jogador2) return "Jogador 1 venceu o jogo";
  if (placar.jogador2 > placar.jogador1) return "Jogador 2 venceu o jogo";
  return "Empate geral";
}

export default function JogoDados() {
  const [estado, setEstado] = useState(ESTADO_INICIAL);

  const {
    rodada,
    vez,
    dadosJogador1,
    dadosJogador2,
    mensagemRodada,
    mensagemFinal,
    animando,
    jogoFinalizado,
  } = estado;

  function jogarJogador1() {
    setEstado((atual) => {
      if (atual.vez !== 1 || atual.jogoFinalizado) return atual;
      return {
        ...atual,
        dadosJogador1: [rolarDado(), rolarDado()],
        
        dadosJogador2: null,
        vez: 2,
        animando: 1,
      };
    });
  }

  function jogarJogador2() {
    setEstado((atual) => {
      if (atual.vez !== 2 || atual.jogoFinalizado || !atual.dadosJogador1) {
        return atual;
      }

      const novosDadosJogador2 = [rolarDado(), rolarDado()];
      const soma1 = somaDados(atual.dadosJogador1);
      const soma2 = somaDados(novosDadosJogador2);

      let resultado;
      if (soma1 > soma2) resultado = "jogador1";
      else if (soma2 > soma1) resultado = "jogador2";
      else resultado = "empate";

      const novoPlacar = { ...atual.placar };
      if (resultado === "jogador1") novoPlacar.jogador1 += 1;
      else if (resultado === "jogador2") novoPlacar.jogador2 += 1;
      else novoPlacar.empates += 1;

      const foiUltimaRodada = atual.rodada >= TOTAL_RODADAS;

      if (foiUltimaRodada) {
        return {
          ...atual,
          dadosJogador2: novosDadosJogador2,
          placar: novoPlacar,
          
          mensagemRodada: textoRodada(resultado),
          mensagemFinal: textoFinal(novoPlacar),
          jogoFinalizado: true,
          animando: 2,
        };
      }

      return {
        ...atual,
        dadosJogador2: novosDadosJogador2,
        placar: novoPlacar,
        mensagemRodada: textoRodada(resultado),
        animando: 2,
        rodada: atual.rodada + 1,
        vez: 1,
      };
    });
  }

  function jogarNovamente() {
    setEstado(ESTADO_INICIAL);
  }

  const botao1Habilitado = !jogoFinalizado && vez === 1;
  const botao2Habilitado = !jogoFinalizado && vez === 2;

  return (
    <div className={styles.cartao}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>Jogo de Dados</h1>
        <p
          className={`${styles.subtitulo} ${
            jogoFinalizado ? styles.subtituloFinal : ""
          }`}
        >
          {jogoFinalizado ? mensagemFinal : `Rodada ${rodada}/${TOTAL_RODADAS}`}
        </p>
      </header>

      <div className={styles.mesa}>
        <section className={styles.painelJogador}>
          <h2 className={`${styles.nomeJogador} ${styles.corJogador1}`}>
            Jogador 1
          </h2>
          <div className={styles.dados}>
            {dadosJogador1 ? (
              <>
                <Dado valor={dadosJogador1[0]} animando={animando === 1} />
                <Dado valor={dadosJogador1[1]} animando={animando === 1} />
              </>
            ) : (
              <>
                <div className={styles.dadoVazio} aria-hidden="true" />
                <div className={styles.dadoVazio} aria-hidden="true" />
              </>
            )}
          </div>
          <button
            type="button"
            className={`${styles.botaoJogar} ${styles.botaoJogador1}`}
            onClick={jogarJogador1}
            disabled={!botao1Habilitado}
          >
            Jogar
          </button>
        </section>

        <section className={styles.painelJogador}>
          <h2 className={`${styles.nomeJogador} ${styles.corJogador2}`}>
            Jogador 2
          </h2>
          <div className={styles.dados}>
            {dadosJogador2 ? (
              <>
                <Dado valor={dadosJogador2[0]} animando={animando === 2} />
                <Dado valor={dadosJogador2[1]} animando={animando === 2} />
              </>
            ) : (
              <>
                <div className={styles.dadoVazio} aria-hidden="true" />
                <div className={styles.dadoVazio} aria-hidden="true" />
              </>
            )}
          </div>
          <button
            type="button"
            className={`${styles.botaoJogar} ${styles.botaoJogador2}`}
            onClick={jogarJogador2}
            disabled={!botao2Habilitado}
          >
            Jogar
          </button>
        </section>
      </div>

      <div className={styles.mensagem} role="status" aria-live="polite">
        {mensagemRodada || "Clique em Jogar para começar a rodada"}
      </div>

      {jogoFinalizado && (
        <button
          type="button"
          className={styles.botaoReiniciar}
          onClick={jogarNovamente}
        >
          Jogar Novamente
        </button>
      )}
    </div>
  );
}
