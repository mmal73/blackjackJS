const game = (() => {
  'use-strict';

  let numPlayers = 2;
  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];

  let deck = [];
  let playersPoints = [];

  /* Html references */
  const btnNewGame = document.querySelector('#btnNewGame'),
    btnHit = document.querySelector('#btnHit'),
    btnStand = document.querySelector('#btnStand');

  const pointsContainer = document.querySelectorAll('small'),
    cardsContainer = document.querySelectorAll('.cards-container');

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const createDeck = () => {
    let own_deck = [];
    types.forEach((type) => {
      for (let i = 2; i <= 10; i++) {
        own_deck.push(i + type);
      }
      for (const special of specials) {
        own_deck.push(special + type);
      }
    });
    return shuffle(own_deck);
  };

  const hit = () => {
    if (!deck.length) {
      throw 'Without cards';
    }
    return deck.pop();
  };

  const cardValue = (card) => {
    const cardValue = card.substring(0, card.length - 1);
    return isNaN(cardValue) ? (cardValue == 'A' ? 11 : 10) : Number(cardValue);
  };

  const createCardImg = (currentCard, turno) => {
    const img = document.createElement('img');
    img.src = `assets/cards/${currentCard}.png`;
    img.classList.add('card');
    cardsContainer[turno].append(img);
  };

  const checkWinner = () => {
    setTimeout(() => {
      if (playersPoints[1] > playersPoints[0] && playersPoints[1] <= 21) {
        alert('Oponent win');
      } else {
        alert('Player1 Gana');
      }
    }, 100);
  };

  const oponentHit = () => {
    btnHit.disabled = true;
    btnStand.disabled = true;
    do {
      const currentCard = hit();
      createCardImg(currentCard, 1);
      sumPoints(currentCard, 1);
    } while (playersPoints[1] <= playersPoints[0] && playersPoints[0] <= 21);

    checkWinner();
  };

  const startGame = () => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
      pointsContainer[i].innerText = 0;
      cardsContainer[i].innerHTML = '';
    }
    btnHit.disabled = false;
    btnStand.disabled = false;
  };

  const sumPoints = (currentCard, turno) => {
    playersPoints[turno] += cardValue(currentCard);
    pointsContainer[turno].innerText = playersPoints[turno];
  };

  btnHit.addEventListener('click', () => {
    const currentCard = hit();
    sumPoints(currentCard, 0);
    createCardImg(currentCard, 0);

    if (playersPoints[0] === 21) {
      alert('Player1 win');
      startGame();
    } else if (playersPoints[0] > 21) {
      alert('Oponent win');
      startGame();
    }
  });

  btnStand.addEventListener('click', () => {
    btnHit.disabled = true;
    btnStand.disabled = true;
    oponentHit();
  });

  btnNewGame.addEventListener('click', () => {
    startGame();
  });

  startGame();

  return {
    startGame,
  };
})();
