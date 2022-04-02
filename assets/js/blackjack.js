/* Vars */
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let deck = [];
let playerPoints = 0,
  oponentPoints = 0;

/* Html references */
const btnHit = document.querySelector('#btnHit');
const pointsContainer = document.querySelectorAll('small');
const playerCardsContainer = document.querySelector('#player-cards');

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

deck = createDeck();

btnHit.addEventListener('click', () => {
  const currentCard = hit();
  playerPoints += cardValue(currentCard);
  pointsContainer[0].innerHTML = playerPoints;

  const cardImg = document.createElement('img');
  cardImg.src = `assets/cards/${currentCard}.png`;
  cardImg.classList.add('card');
  playerCardsContainer.append(cardImg);
});
