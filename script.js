"use strict";

// Inizializzazione della variabile del conteggio
let num = 0;
// Creazione functions

// Funzione che agiunge un numero alla variabile "num" e la stampa assegnandola alla constante "result"
function sum() {
  const result = document.querySelector("#result");
  num++;
  result.textContent = num;
}

// Funzione che rimuove un numero alla variabile "num"
function dif() {
  const result = document.querySelector("#result");
  num--;
  result.textContent = num;
}

// Funzione che se attivata impedisce di andare sotto lo zero
function noNegative() {
  const checkboxDif = document.querySelector("#negative");
  if (num === 0 && checkboxDif.checked === true) {
    return;
  } else {
    dif();
  }
}

// Funzione che disabilita il checkbox se il contatore è sotto lo 0 e lo abilita nuovamente se questo è uguale o supera lo 0
function checkboxUnder0() {
  const checkboxDif = document.querySelector("#negative");
  if (num < 0) {
    checkboxDif.disabled = true;
  } else if (num >= 0) {
    checkboxDif.disabled = false;
  }
}

function labelNoUnder0() {
  const result = document.querySelector("#result");
  const differenza = document.querySelector("#differenza");

  differenza.classList.replace("dif", "neg");
  result.classList.add("resultCols");
  const spanResult = document.createElement("span");
  spanResult.classList.add("labelActiveCheck");
  spanResult.textContent = "Non puoi scendere sotto lo 0";
  result.append(spanResult);
}

// Funzione iniziale che mostra il Menu
function startToCount() {
  const contStart = document.querySelector(".contStart");
  const startH1 = document.createElement("h1");
  const startH2 = document.createElement("h2");
  const startButton = document.createElement("button");

  startButton.classList.add("startButton");
  startH1.classList.add("startH1");
  startH2.classList.add("startH2");

  startH1.textContent = "Benvenuto!";
  startH2.innerHTML =
    "Premi <span class='spanStart'>Start</span> per iniziare a contare.";
  startButton.textContent = "Start";

  contStart.appendChild(startH1);
  contStart.appendChild(startH2);
  contStart.appendChild(startButton);
}

// Inizio elaborazione DOM
document.addEventListener("DOMContentLoaded", function () {
  const main = document.querySelector("main");
  const contStart = document.querySelector(".contStart");
  // const checkboxDif = document.querySelector("#negative");

  startToCount();

  // Evento che gestisce i click su diversi elementi con classi differenti
  contStart.addEventListener("click", (event) => {
    const clickedButton = event.target;
    // Controllo del click sul bottone con classe startButton per la rimozione dell'intero section con classe contStart dove era incluso il menu iniziale
    if (clickedButton.classList.contains("startButton")) {
      contStart.remove();

      // Creazione e sosituzione del section ".contStart" con section con classe ".contCounter" e creazione degli elementi che compongono il counter all'interno
      const contCounter = document.createElement("section");
      const buttonSomma = document.createElement("button");
      const buttonSottrazione = document.createElement("button");
      const contRisultato = document.createElement("div");
      const labelInput = document.createElement("label");
      const checkbox = document.createElement("input");

      // Aggiunta delle varie classi, id, input checkbox e assegnazione testi dei pulsanti
      contCounter.classList.add("contCounter");
      main.appendChild(contCounter);
      contCounter.appendChild(buttonSomma);
      contCounter.appendChild(buttonSottrazione);
      contCounter.appendChild(contRisultato);
      contCounter.appendChild(labelInput);
      checkbox.type = "checkbox";

      buttonSomma.classList.add("sum");
      buttonSomma.textContent = "+";
      buttonSottrazione.classList.add("dif");
      buttonSottrazione.setAttribute("id", "differenza");
      buttonSottrazione.textContent = "-";
      contRisultato.setAttribute("id", "result");
      contRisultato.textContent = num;
      labelInput.setAttribute("for", "negative");
      labelInput.setAttribute("id", "labelNeg");
      labelInput.classList.add("labelNoBelow0");
      labelInput.textContent = "Non Scendere Sotto lo 0";
      checkbox.setAttribute("id", "negative");
      checkbox.classList.add("negative");
      labelInput.appendChild(checkbox);
    }

    // Selezione dei vari elementi per il funzionamento del counter
    const contCounter = document.querySelector(".contCounter");
    const differenza = document.querySelector("#differenza");
    const result = document.querySelector("#result");
    const checkboxDif = document.querySelector("#negative");

    // Gestione dell'evento click su elementi con classi "sum", "dif" e "neg" per l'attivazione delle funzioni sopra realizzate
    contCounter.addEventListener("click", (event) => {
      const clickedButton = event.target;

      if (clickedButton.classList.contains("sum")) {
        sum();
      }

      if (clickedButton.classList.contains("dif")) {
        dif();
      }

      if (clickedButton.classList.contains("neg")) {
        noNegative();
      }

      // Funzione che modifica la classe al pulsante della sottrazione per modificare il suo funzionamento
      if (
        clickedButton.classList.contains("negative") &&
        differenza.classList.contains("dif")
      ) {
        // Sostituisce la classe dif con neg
        differenza.classList.replace("dif", "neg");

        // Crea uno span con testo, aggiunge la classe labelActiveCheck e lo aggiunge sotto il div result alla spunta del checkbox
        const spanResult = document.createElement("span");
        spanResult.classList.add("labelActiveCheck");
        spanResult.textContent = "Non puoi scendere sotto lo 0";
        result.after(spanResult);

        // Aggiunta animazione all'attivazione del checkbox per l'etichetta
        spanResult.style.cssText +=
          "animation-name: pulse; animation-duration: 1.5s;";

        // Sostituzione della classe neg con la classe dif se al checkbox viene tolta la spunta con rimozione dello span con classe labelActiveCheck
      } else if (
        clickedButton.classList.contains("negative") &&
        differenza.classList.contains("neg")
      ) {
        const spanResult = document.querySelector(".labelActiveCheck");
        differenza.classList.replace("neg", "dif");
        // Aggiunta animazione in uscita
        spanResult.style.cssText +=
          "animation-name: pulseBack; animation-duration: 1.5s;";
        // Aggiunta del setTimeout per ritardare la rimozione dell'elemento span così da eseguire l'animazione di uscita
        setTimeout(() => {
          spanResult.remove();
        }, 1480);
      }
    });
  });
  // Creazione di un evento che parte dal tag HTML "main" per la creazione dinamica di un bottone per tornare al menu dal counter;
  // Il bottone inoltre viene distrutto e ricreato solamente all'avvenimento di determinati eventi nel DOM
  main.addEventListener("click", (event) => {
    const clickedEle = event.target;
    const backButton = document.querySelector(".backButton");
    const contCounter = document.querySelector(".contCounter");

    if (clickedEle.classList.contains("startButton")) {
      const backButton = document.createElement("button");
      backButton.classList.add("backButton");
      backButton.textContent = "Torna al Menu";
      main.appendChild(backButton);
    } else if (clickedEle.classList.contains("backButton")) {
      main.removeChild(backButton);
    }

    if (clickedEle.classList.contains("backButton")) {
      main.removeChild(contCounter);
      main.appendChild(contStart);
    }
    checkboxUnder0();
  });
});
