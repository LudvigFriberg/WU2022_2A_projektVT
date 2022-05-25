if ((activePlayer["score"] + blackjackGame["cardsMap"][card]) > 21) {
    x = 0;
    while (x <= current_hand.length && activePlayer['score'] > 21) {
      if (current_hand[x][1] === "A") {
        activePlayer["score"] += (blackjackGame["cardsMap"][card] - 10)
      }
      x += 1;
    }

  }