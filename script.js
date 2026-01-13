const prerequisitos = {
  mate2: ["mate1"],
  estad1: ["prog", "mate2"],
  mate3: ["mate2"],
  macro1: ["mate2", "micro1"],
  tec: ["prog"],
  estad2: ["estad1"],
  micro2: ["micro1", "macro1"],
  cont2: ["cont1", "tec"],
  personas: ["fan2"],
  liderazgo: ["fan2", "taller2"],
  eco1: ["mate3", "estad2"],
  macro2: ["mate3", "micro2"],
  fin1: ["cont2", "estad2"],
  estrategia: ["tec", "personas"],
  etica: ["personas", "liderazgo"],
  cd: ["eco1"],
  global: ["estad2", "macro2", "estrategia"],
  marketing: ["estad2", "estrategia"],
  operaciones: ["estad2", "estrategia"],
  mateeco: ["cd"],
  eco2: ["cd"],
  juegos: ["micro2", "global"],
  crecimiento: ["macro2"],
  cd2: ["eco2"],
  info: ["juegos"],
  politica: ["crecimiento"],
  simulacion: ["mateeco", "macro2"]
};

const ramos = document.querySelectorAll(".ramo");

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const reqs = prerequisitos[id];

    if (!reqs) {
      ramo.classList.remove("bloqueado");
      return;
    }

    const habilitado = reqs.every(req => {
      const r = document.querySelector(`.ramo[data-id="${req}"]`);
      return r && r.classList.contains("aprobado");
    });

    ramo.classList.toggle("bloqueado", !habilitado);
  });
}

ramos.forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;
    ramo.classList.toggle("aprobado");
    actualizarBloqueos();
  });
});

actualizarBloqueos();
