let blackjackGame = {     //Global klass meed olika variabler som man lätt kan kalla på med klassnamnet "blackJackGame["variabelnamn"]"
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  cards: ["h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "hK", "hJ", "hQ", "hA",  //En array som innehåller namn för alla kort. Den används för att dra kort när spelet väl är igång
          "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "dK", "dJ", "dQ", "dA",
          "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "sK", "sJ", "sQ", "sA",
          "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "cK", "cJ", "cQ", "cA"],

  cardsMap: {
    h2: 2, h3: 3, h4: 4, h5: 5, h6: 6, h7: 7, h8: 8, h9: 9, h10: 10, hK: 10, hJ: 10, hQ: 10, hA: [1, 11],    //En "map" som bestämmer värde på alla korten. Alla ess är arrayer med 2 olika värden för att kunna representera riktiga ess
    s2: 2, s3: 3, s4: 4, s5: 5, s6: 6, s7: 7, s8: 8, s9: 9, s10: 10, sK: 10, sJ: 10, sQ: 10, sA: [1, 11],
    d2: 2, d3: 3, d4: 4, d5: 5, d6: 6, d7: 7, d8: 8, d9: 9, d10: 10, dK: 10, dJ: 10, dQ: 10, dA: [1, 11],
    c2: 2, c3: 3, c4: 4, c5: 5, c6: 6, c7: 7, c8: 8, c9: 9, c10: 10, cK: 10, cJ: 10, cQ: 10, cA: [1, 11]
  },

  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  isTurnsOver: false,
  pressOnce: false,

  
};

const YOU = blackjackGame["you"]; //döpa om variabler för din och dealerns hand
const DEALER = blackjackGame["dealer"];



let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;
let play = false
//lyssnare som kopplar knapparna till funktioner
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);
document
  .querySelector("#blackjack-reset-button")
  .addEventListener("click", blackjackRestart);

function blackjackHit() { //funktionen kallar på hjälpfunktioner och lägger till ett kort i spelarens hand, samt uppdaterar score och visar kortet
  
  if (play === true) {
    if (blackjackGame["isStand"] === false) {
      let card = randomCard();
      showCard(card, YOU);
      updateScore(card, YOU);
      showScore(YOU)
      if (YOU["score"] === 21) {
        blackjackStand()
      }
    }
  }
}

function randomCard() {   //funktion som väljer slumpmässigt kort från arrayen med kortnamnen
  let randomIndex = Math.floor(Math.random() * 52);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) { //hjälpfunktion som tar in "card" och lägger till en bild på kortet åt "activeplayer". Genom att döpa bilderna till samma namn som korten blev det enkelt att navigera till kortet i mappen
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `img/card_deck/${card}.png`;
    cardImage.style = `width:130px; height:200px;`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    
  }
}
function updateScore(card, activePlayer) {    //Funktionen kollar om kortet som precis drogs är ett ess.
  //Om kortet är ett ess så kollar funktionen vad din hand är värd och om esset ska vara värt antingen 11 eller 1
  if (card[1] === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } 
    else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  //hjälpfunktion som kontrollerar om någon förlorat och i sådanna fall i sin tur kallar på en hjälpfunktion för att visa vinnaren
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    blackjackGame["isTurnsOver"] = true;
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER['score']);
    showScore(DEALER['score']);
    computeWinner();
    showWinner(winner);

  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
  }
}

function blackjackStand() { //funktion för att avsluta omgången och som kallar på hjälpfunktioner för att bestämma vinnare
  if (blackjackGame["isTurnsOver"] === false) {
    if (blackjackGame.pressOnce === false) {
      blackjackGame["isStand"] = true;
      let yourImages = document
        .querySelector("#your-box")
        .querySelectorAll("img");
  

      while (DEALER['score'] < YOU['score']) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);

      }

      blackjackGame["isTurnsOver"] = true;
  
      computeWinner();
      showWinner(winner);
    }
  
    blackjackGame.pressOnce = true;
  }
}

function computeWinner() { //hjälpfunktion som räknar ut en vinnare
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      winner = "Draw";
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    winner = "None";
  }

  return winner;
}

function showWinner(winner) { //hjälpfunktion som visar vem som vann och uppdaterar scoreboard
  let message, messageColor;

  if (winner === YOU) {
    message = "You Won";
    messageColor = "#00e676";
    document.querySelector("#wins").textContent = blackjackGame["wins"] += 1;
  } else if (winner === DEALER) {
    message = "You Lost";
    messageColor = "red";
    document.querySelector("#losses").textContent = blackjackGame[
      "losses"
    ] += 1;
  } else if (winner === "Draw") {
    message = "You Drew";
    messageColor = "yellow";
    document.querySelector("#draws").textContent = blackjackGame["draws"] += 1;
  } else if (winner === "None") {
    message = "You Both Busted!";
    messageColor = "orange";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}

function blackjackDeal() {//funktion som startar ny omgång 
  play = true;
  if (blackjackGame["isTurnsOver"] === true) {
    // Select all the images in both the user and dealer box
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    document.querySelector("#blackjack-result").style.color = "white";


    YOU["score"] = DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Lets Play";

    //tar bort korten 
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
  
    blackjackGame["isStand"] = false;
    blackjackGame.pressOnce = false;
    blackjackGame["isTurnsOver"] = false;
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    blackjackHit()
    blackjackHit()
  }

}

function blackjackRestart() {//funktion som nollställer scoreboard och börjar en ny omgång genom att kalla på "deal" hjälpfunktionen
  document.querySelector("#wins").textContent = 0;
  document.querySelector("#losses").textContent = 0;
  document.querySelector("#draws").textContent = 0;
  blackjackGame.wins = 0;
  blackjackGame.losses = 0;
  blackjackGame.draws = 0;
  blackjackDeal();
}
blackjackGame["isTurnsOver"] = true;

 blackjackDeal();