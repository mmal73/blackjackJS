/* Vars */
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let deck = [];
let playerPoints = 0,
  oponentPoints = 0;

/* Html references */
const btnNewGame = document.querySelector('#btnNewGame');
const btnHit = document.querySelector('#btnHit');
const btnStand = document.querySelector('#btnStand');
const pointsContainer = document.querySelectorAll('small');
const playerCardsContainer = document.querySelector('#player-cards');
const oponentCardsContainer = document.querySelector('#oponent-cards');

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

const startGame = () => {
  btnHit.disabled = false;
  btnStand.disabled = false;
  playerPoints = 0;
  oponentPoints = 0;
  pointsContainer[0].innerText = 0;
  pointsContainer[1].innerText = 0;
  playerCardsContainer.innerHTML = '';
  oponentCardsContainer.innerHTML = '';
  deck = createDeck();
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

const cardImg = (currentCard) => {
  const img = document.createElement('img');
  img.src = `assets/cards/${currentCard}.png`;
  img.classList.add('card');
  return img;
};

const oponentHit = () => {
  do {
    const currentCard = hit();
    const img = cardImg(currentCard);
    oponentPoints += cardValue(currentCard);
    pointsContainer[1].innerText = oponentPoints;
    oponentCardsContainer.append(img);
    if (playerPoints > 21) {
      break;
    }
  } while (oponentPoints <= playerPoints && playerPoints <= 21);
  if (
    (oponentPoints > playerPoints && oponentPoints <= 21) ||
    playerPoints > 21
  ) {
    alert('Oponent Win');
  } else {
    alert('Player Win');
  }
};

btnHit.addEventListener('click', () => {
  const currentCard = hit();
  playerPoints += cardValue(currentCard);
  pointsContainer[0].innerText = playerPoints;
  const img = cardImg(currentCard);
  playerCardsContainer.append(img);
  if (playerPoints > 21) {
    btnHit.disabled = true;
    oponentHit();
  } else if (playerPoints == 21) {
    alert('Player 1 Win');
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
