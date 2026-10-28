const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Menu de navigation
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      nav.querySelectorAll("a").forEach(item => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });
}

// Élément qui affiche les messages de confirmation
const feedback = document.getElementById("copyFeedback");
const portFeedback = document.getElementById("portFeedback");

// Fonction commune pour copier une valeur
async function copierTexte(texte) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch (error) {
    // Méthode de secours
    const champ = document.createElement("textarea");
    champ.value = texte;
    champ.style.position = "fixed";
    champ.style.left = "-9999px";

    document.body.appendChild(champ);
    champ.select();

    let succes = false;

    try {
      succes = document.execCommand("copy");
    } catch (e) {
      succes = false;
    }

    champ.remove();
    return succes;
  }
}

// Copier l'adresse IP
const copyButton = document.getElementById("copyIp");
const serverIp = document.getElementById("serverIp");

if (copyButton && serverIp) {
  copyButton.addEventListener("click", async () => {
    const ip = serverIp.textContent.trim();
    const succes = await copierTexte(ip);

    copyButton.textContent = succes ? "✓ Copié !" : "Réessayer";

    if (feedback) {
      feedback.textContent = succes
        ? "L'adresse IP a été copiée !"
        : "Copie impossible. Adresse : " + ip;
    }

    setTimeout(() => {
      copyButton.textContent = "Copier l’IP";
    }, 2000);
  });
}

// Copier le port
const copyPortButton = document.getElementById("copyPort");
const serverPort = document.getElementById("serverPort");

if (copyPortButton && serverPort) {
  copyPortButton.addEventListener("click", async () => {
    const port = serverPort.textContent.trim();
    const succes = await copierTexte(port);

    copyPortButton.textContent = succes ? "✓ Copié !" : "Réessayer";

    if (feedback) {
      portFeedback.textContent = succes
        ? "Le port a été copié !"
        : "Copie impossible. Port : " + port;
    }

    setTimeout(() => {
      copyPortButton.textContent = "Copier le port";
    }, 2000);
  });
}

// Année automatique dans le pied de page
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
