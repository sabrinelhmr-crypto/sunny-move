document.addEventListener("DOMContentLoaded", () => {

  const annee = document.getElementById("annee");
  if (annee) annee.textContent = new Date().getFullYear();

  const filtres = document.querySelectorAll(".filtre-btn");
  const motos = document.querySelectorAll(".moto-card[data-etat]");

  filtres.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtres.forEach((b) => b.classList.remove("actif"));
      btn.classList.add("actif");
      const cible = btn.dataset.filtre;
      motos.forEach((card) => {
        const visible = cible === "toutes" || card.dataset.etat === cible;
        card.style.display = visible ? "" : "none";
      });
    });
  });

  const form = document.getElementById("form-contact");
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const motoParam = params.get("moto");
    const selectMoto = document.getElementById("moto");
    if (motoParam && selectMoto) {
      [...selectMoto.options].forEach((opt) => {
        if (opt.text === motoParam) opt.selected = true;
      });
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const succes = document.getElementById("form-success");
      form.reset();
      if (succes) {
        succes.classList.add("visible");
        succes.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => succes.classList.remove("visible"), 6000);
      }
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), (i % 6) * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

});
