const malla = [
  {
    semestre: "Semestre I",
    ramos: [
      { id: "mate1", nombre: "Matemáticas I", creditos: 6 },
      { id: "prog", nombre: "Programación", creditos: 6 },
      { id: "fan1", nombre: "Fundamentos de Administración y Negocios I", creditos: 6 },
      { id: "taller1", nombre: "Taller de Comunicación I", creditos: 3 },
      { id: "ing1", nombre: "Inglés I", creditos: 3 },
      { id: "cfg1", nombre: "CFG I", creditos: 5 }
    ]
  },
  {
    semestre: "Semestre II",
    ramos: [
      { id: "mate2", nombre: "Matemáticas II", creditos: 6, req: ["mate1"] },
      { id: "micro1", nombre: "Microeconomía I", creditos: 6 },
      { id: "cont1", nombre: "Contabilidad I", creditos: 6 },
      { id: "fan2", nombre: "Fundamentos de Administración y Negocios II", creditos: 6, req: ["fan1"] },
      { id: "ing2", nombre: "Inglés II", creditos: 3, req: ["ing1"] },
      { id: "cfg2", nombre: "CFG II", creditos: 5 }
    ]
  },
  {
    semestre: "Semestre III",
    ramos: [
      { id: "mate3", nombre: "Matemáticas III", creditos: 6, req: ["mate2"] },
      { id: "estad1", nombre: "Estadística I", creditos: 6, req: ["prog", "mate2"] },
      { id: "macro1", nombre: "Macroeconomía I", creditos: 6, req: ["mate1", "micro1"] },
      { id: "tec", nombre: "Tecnología y Empresa", creditos: 6, req: ["prog"] },
      { id: "taller2", nombre: "Taller de Comunicación II", creditos: 3, req: ["taller1"] },
      { id: "ing3", nombre: "Inglés III", creditos: 3, req: ["ing2"] }
    ]
  },
  {
    semestre: "Semestre IV",
    ramos: [
      { id: "estad2", nombre: "Estadística II", creditos: 6, req: ["estad1"] },
      { id: "micro2", nombre: "Microeconomía II", creditos: 6, req: ["mate2", "micro1"] },
      { id: "cont2", nombre: "Contabilidad II", creditos: 6, req: ["cont1", "tec"] },
      { id: "personas", nombre: "Personas y Equipos", creditos: 6, req: ["fan2"] },
      { id: "liderazgo", nombre: "Taller de Liderazgo y Trabajo en Equipo", creditos: 3, req: ["taller2", "fan2"] },
      { id: "ing4", nombre: "Inglés IV", creditos: 3, req: ["ing3"] }
    ]
  },
  {
    semestre: "Semestre V",
    ramos: [
      { id: "eco1", nombre: "Econometría I", creditos: 6, req: ["mate3", "estad2"] },
      { id: "macro2", nombre: "Macroeconomía II", creditos: 6, req: ["mate3", "macro1"] },
      { id: "fin1", nombre: "Finanzas I", creditos: 6, req: ["cont2", "estad2"] },
      { id: "estrategia", nombre: "Estrategia", creditos: 6, req: ["personas", "tec"] },
      { id: "etica", nombre: "Taller de Ética en la Toma de Decisiones", creditos: 3, req: ["liderazgo", "personas"] },
      { id: "ing5", nombre: "Inglés V", creditos: 3, req: ["ing4"] }
    ]
  },
  {
    semestre: "Semestre VI",
    ramos: [
      { id: "cd", nombre: "Ciencia de Datos", creditos: 6, req: ["eco1", "tec"] },
      { id: "global", nombre: "Globalización y Sustentabilidad", creditos: 6, req: ["estad2", "macro2", "estrategia"] },
      { id: "marketing", nombre: "Marketing", creditos: 6, req: ["estad2", "estrategia"] },
      { id: "operaciones", nombre: "Gestión de Operaciones", creditos: 6, req: ["estad2", "estrategia"] },
      { id: "cfg3", nombre: "CFG III", creditos: 5 }
    ]
  },
  {
    semestre: "Semestre VII",
    ramos: [
      { id: "mateeco", nombre: "Matemáticas para Economía", creditos: 6, req: ["cd"] },
      { id: "eco2", nombre: "Econometría II", creditos: 6, req: ["cd"] },
      { id: "juegos", nombre: "Teoría de Juego", creditos: 6, req: ["micro2", "global"] },
      { id: "crecimiento", nombre: "Crecimiento y Desarrollo Económico", creditos: 6, req: ["macro2"] },
      { id: "cfg4", nombre: "CFG IV", creditos: 5 }
    ]
  },
  {
    semestre: "Semestre VIII",
    ramos: [
      { id: "cd2", nombre: "Ciencia de Datos para Economía", creditos: 6, req: ["eco2"] },
      { id: "info", nombre: "Economía de la Información y Competencia Imperfecta", creditos: 6, req: ["juegos"] },
      { id: "politica", nombre: "Política Económica", creditos: 6, req: ["crecimiento"] },
      { id: "simulacion", nombre: "Taller de Simulación Económica", creditos: 6, req: ["mateeco", "macro2"] }
    ]
  },
  {
    semestre: "Semestre IX y X",
    ramos: [
      { id: "opt1", nombre: "Optativo I", creditos: 6 },
      { id: "opt2", nombre: "Optativo II", creditos: 6 },
      { id: "opt3", nombre: "Optativo III", creditos: 6 },
      { id: "opt4", nombre: "Optativo IV", creditos: 6 },
      { id: "portafolio", nombre: "Desarrollo de Carrera y E-Portafolio", creditos: 6 },
      { id: "practica", nombre: "Práctica Profesional", creditos: 24 }
    ]
  }
];

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];
const contenedor = document.getElementById("malla");

function crearMalla() {
  contenedor.innerHTML = "";

  malla.forEach(bloque => {
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>${bloque.semestre}</h2>`;

    bloque.ramos.forEach(ramo => {
      const r = document.createElement("div");
      r.className = "ramo";
      r.textContent = `${ramo.nombre} (${ramo.creditos})`;

      if (aprobados.includes(ramo.id)) r.classList.add("aprobado");

      if (ramo.req && !ramo.req.every(id => aprobados.includes(id))) {
        r.classList.add("bloqueado");
      }

      r.onclick = () => toggleRamo(ramo);
      col.appendChild(r);
    });

    contenedor.appendChild(col);
  });

  actualizarProgreso();
}

function toggleRamo(ramo) {
  if (ramo.req && !ramo.req.every(id => aprobados.includes(id))) return;

  if (aprobados.includes(ramo.id)) {
    aprobados = aprobados.filter(r => r !== ramo.id);
  } else {
    aprobados.push(ramo.id);
  }

  localStorage.setItem("aprobados", JSON.stringify(aprobados));
  crearMalla();
}

function actualizarProgreso() {
  let total = 0;
  let hecho = 0;

  malla.forEach(b => {
    b.ramos.forEach(r => {
      total += r.creditos;
      if (aprobados.includes(r.id)) hecho += r.creditos;
    });
  });

  const porcentaje = Math.round((hecho / total) * 100);
  document.getElementById("barra-progreso").style.width = porcentaje + "%";
  document.getElementById("texto-progreso").textContent =
    `${porcentaje}% · ${hecho} / ${total} créditos`;
}

crearMalla();

