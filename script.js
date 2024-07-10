const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {

    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (noClicking || event.target.classList.contains("flipped")) return;

  const currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1) {
    card1 = currentCard;
    currentCard.classList.add("flipped");
  } else if (!card2) {
    card2 = currentCard;
    currentCard.classList.add("flipped");
    noClicking = true;

    const gif1 = card1.className;
    const gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      resetCards();
    } else {
      setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        resetCards();
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) {
    alert("You did it!");
  }
}

function resetCards() {
  card1 = null;
  card2 = null;
  noClicking = false;
}

createDivsForColors(shuffledColors);
