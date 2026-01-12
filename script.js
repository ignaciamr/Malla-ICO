const prerequisitos = {
  mate2: ["mate1"],
  estad1: ["prog", "mate2"]
};

function marcar(ramo) {
  const id = ramo.dataset.ramo;

  // revisar si tiene prerrequisitos
  if (prerequisitos[id]) {
    for (let req of prerequisitos[id]) {
      const ramoReq = document.querySelector(
        `.ramo[data-ramo="${req}"]`
      );
      if (!ramoReq.classList.contains("aprobado")) {
        alert("Debes aprobar los ramos previos primero");
        return;
      }
    }
  }

  ramo.classList.toggle("aprobado");
}
