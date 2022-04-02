const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let deck = [];

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
deck = createDeck();
console.log(deck);
