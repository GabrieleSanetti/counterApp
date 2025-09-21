"use strict";

// Funzione per creazione dinamica elementi
const newElement = function (
  nomeTag,
  nomeClasse,
  attributo,
  valoreAttr,
  testo,
  innerhtml
) {
  const element = document.createElement(nomeTag);
  element.classList.add(nomeClasse);
  if (attributo && valoreAttr) {
    element.setAttribute(attributo, valoreAttr);
  }
  if (testo && innerhtml) {
    element.textContent = testo;
    element.innerHTML += innerhtml;
  } else if (!testo) {
    element.innerHTML = innerhtml;
  } else {
    element.textContent = testo;
  }
  return element;
};

const appendElement = function (parente, elemento) {
  parente.append(elemento);
  return;
};

const addReplaceClasse = function (
  elemento,
  addClasse,
  replaceClasseOld,
  replaceClasseNew
) {
  if (addClasse) {
    elemento.classList.add(addClasse);
  } else {
    elemento.classList.replace(replaceClasseOld, replaceClasseNew);
  }
  return;
};

function contStart() {
  const main = newElement("main", null, null, null, null, null);
  appendElement(document.body, main);

  const section = newElement("section", "contStart", null, null, null, null);
  appendElement(main, section);

  const preBackButton = newElement(
    "button",
    "preBackButton",
    null,
    null,
    null,
    null
  );
  section.before(preBackButton);

  appendElement(
    section,
    newElement("h1", "startH1", null, null, "Benvenuto", null)
  );
  appendElement(
    section,
    newElement(
      "h2",
      "startH2",
      null,
      null,
      null,
      "Premi su <br /><span class='spanStart'>Inizia a Contare</span><br /> per iniziare a contare."
    )
  );

  appendElement(
    section,
    newElement(
      "button",
      "startButton",
      "data-action",
      "conta",
      "Inizia a Contare",
      null
    )
  );

  section.addEventListener("click", (event) => {
    if (event.target.dataset.action === "conta") {
      main.remove();
      startToCount();
    }
  });
}

function startToCount() {
  let contatore = 0;
  const main = newElement("main", null, null, null, null, null);
  appendElement(document.body, main);

  const section = newElement("section", "contCounter", null, null, null, null);
  appendElement(main, section);

  appendElement(
    section,
    newElement("button", "sum", "data-action", "somma", "+", null)
  );

  appendElement(
    section,
    newElement("button", "dif", "data-action", "sottrazione", "-", null)
  );

  function somma() {
    contatore++;
    result.textContent = contatore;
  }

  function sottrazione() {
    if (contatore === 0 && checkbox.checked === true) {
      return;
    } else {
      contatore--;
      result.textContent = contatore;
    }
  }

  function activeCheckbox() {
    if (checkbox.checked === true) {
      labelNegative.textContent = "Non puoi scendere sotto lo 0";
    } else {
      labelNegative.textContent = "";
    }
  }

  const result = newElement(
    "div",
    "result",
    "id",
    "result",
    `${contatore}`,
    null
  );
  appendElement(section, result);

  const label = newElement(
    "label",
    "labelNoBelow0",
    "for",
    "negative",
    "Non Scendere Sotto lo 0",
    null
  );

  const checkbox = newElement(
    "input",
    "negative",
    "id",
    "negative",
    null,
    null
  );
  checkbox.setAttribute("data-action", "negative");
  checkbox.type = "checkbox";

  function disabilitato() {
    if (contatore < 0) {
      checkbox.disabled = true;
    } else {
      checkbox.disabled = false;
    }
  }

  appendElement(section, label);
  appendElement(label, checkbox);

  main.addEventListener("click", (event) => {
    switch (event.target.dataset.action) {
      case "somma":
        somma();
        disabilitato();
        break;
      case "sottrazione":
        sottrazione();
        disabilitato();
        break;
      case "negative":
        activeCheckbox();
        document.querySelector("span").classList.toggle("labelActiveCheck");
        break;
      case "backButton":
        main.remove();
        contStart();
        break;
    }
  });

  const labelNegative = newElement("span", null, null, null, null, null);
  result.after(labelNegative);

  const backButton = newElement(
    "button",
    "backButton",
    "data-action",
    "backButton",
    "Torna al Menu",
    null
  );
  section.before(backButton);
}

document.addEventListener("DOMContentLoaded", function () {
  contStart();
});
