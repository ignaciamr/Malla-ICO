const malla = [
  {
    semestre: "Semestre I",
    ramos: [
      { id: "mate1", nombre: "Matemáticas I", creditos: 4 },
      { id: "prog", nombre: "Programación", creditos: 4 },
      { id: "fan1", nombre: "FAN I", creditos: 2 },
      { id: "taller1", nombre: "Taller Comunicación I", creditos: 2 },
      { id: "ing1", nombre: "Inglés I", creditos: 2 }
    ]
  },
  {
    semestre: "Semestre II",
    ramos: [
      { id: "mate2", nombre: "Matemáticas II", creditos: 3, req: ["mate1"] },
      { id: "micro1", nombre: "Microeconomía I", creditos: 1 },
      { id: "cont1", nombre: "Contabilidad I", creditos: 2 },
      { id: "fan2", nombre: "FAN II", creditos: 4, req: ["fan1"] },
      { id: "ing2", nombre: "Inglés II", creditos: 2, req: ["ing1"] }
    ]
  },
  {
    semestre: "Semestre III",
    ramos: [
      { id: "mate3", nombre: "Matemáticas III", creditos: 4, req: ["mate2"] },
      { id: "estad1", nombre: "Estadística I", creditos: 1, req: ["prog", "mate2"] },
      { id: "macro1", nombre: "Macroeconomía I", creditos: 1, req: ["mate2", "micro1"] },
      { id: "tec", nombre: "Tecnología y Empresa", creditos: 4, req: ["prog"] },
      { id: "taller2", nombre: "Taller Comunicación II", creditos: 2, req: ["taller1"] },
      { id: "ing3", nombre: "Inglés III", creditos: 2, req: ["ing2"] }
    ]
  }
  // 👉 aquí se siguen agregando EXACTAMENTE igual
];

const contenedor = document.getElementById("malla");
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function crearMalla() {
  contenedor.innerHTML = "";

  malla.forEach(bloque => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${bloque.semestre}</h2>`;

    bloque.ramos.forEach(ramo => {
      const r = document.createElement("div");
      r.className = "ramo";
      r.textContent = `${ramo.nombre} (${ramo.creditos})`;
      r.dataset.id = ramo.id;

      if (aprobados.includes(ramo.id)) {
        r.classList.add("aprobado");
      }

      if (ramo.req && !ramo.req.every(id => aprobados.includes(id))) {
        r.classList.add("bloqueado");
      }

      r.onclick = () => toggleRamo(ramo);

      div.appendChild(r);
    });

    contenedor.appendChild(div);
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
    `${porcentaje}% (${hecho}/${total} créditos)`;
}

crearMalla();
