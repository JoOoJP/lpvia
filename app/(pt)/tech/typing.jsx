"use client";

import { useEffect } from "react";

// Mesmos números do CSS: milissegundos por caractere e a entrada da saída.
const CHAR_MS = 45;
const OUTPUT_MS = 160 + 320;

/*
 * Os comandos se digitam quando entram na tela, um de cada vez, e a saída
 * aparece depois. O HTML chega completo: só depois de montar este componente
 * os blocos ainda não vistos são escondidos, então sem JavaScript, para robôs
 * de busca e com movimento reduzido a página fica inteira e parada.
 */
export function Typing() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const queue = [];
    let busy = false;
    let timer;

    const next = () => {
      const block = queue.shift();
      if (!block) {
        busy = false;
        return;
      }

      busy = true;
      block.dataset.typing = "run";
      const chars = Number(block.style.getPropertyValue("--chars")) || 0;
      // Timer em vez de animationend: numa aba em segundo plano o evento pode
      // não vir, e a fila travaria com o resto da página escondido.
      timer = setTimeout(() => {
        block.dataset.typing = "done";
        next();
      }, chars * CHAR_MS + OUTPUT_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry) => {
            observer.unobserve(entry.target);
            queue.push(entry.target);
          });
        // Quem rola rápido não espera a fila: o que ficou para trás aparece
        // pronto e só os mais recentes digitam.
        while (queue.length > 2) queue.shift().dataset.typing = "done";
        if (!busy) next();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const blocks = document.querySelectorAll("[data-typing]");
    blocks.forEach((block) => {
      // O que já ficou para trás (chegada por âncora) não volta a digitar.
      if (block.getBoundingClientRect().bottom <= 0) return;
      block.dataset.typing = "pending";
      observer.observe(block);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      // Desmontar no meio não pode deixar bloco escondido.
      blocks.forEach((block) => {
        block.dataset.typing = "";
      });
    };
  }, []);

  return null;
}
