const deck = document.getElementById('deck');
/*
 * Create a list that holds all of your cards
 */
function cardList() {
    const cards = deck.querySelectorAll('li');
    return cards;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Reset moves counter
 */
function resetCounter() {
    let counter = document.getElementsByClassName('moves')[0];
    counter.textContent = '0';
}
/*
 * Reset ratings stars
 */
function resetRatings() {
    const star = document.querySelectorAll('ul.stars li i');
    backendCounter = 0;
    rating = 3;
    //loop and reset the stars
    for (let i = star.length - 1; i >= 0; i--) {
        if (star[i].className == 'fa fa-star') continue;
        star[i].className = 'fa fa-star';
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(cards) {
    const arr = [];
    let addHTML = '';
    resetCounter();
    resetRatings();

    //retrieve trimmed HTML of each card
    for (let i = 0; i < cards.length; i++) {
        cards[i].className = 'card';
        let card = cards[i].outerHTML.trim();
        arr.push(card);
    }

    //shuffle the cards
    const shuffled = shuffle(arr);

    //Remove all child elements function from  https://stackoverflow.com/a/3955238
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    //add HTML to deck element
    for (let i = 0; i < shuffled.length; i++) {
        addHTML += shuffled[i];
    }

    deck.innerHTML = addHTML;
}
displayCards(cardList());

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var openCards = [];
deck.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() == 'li') { // clicked on a card
        if (evt.target.className == 'card') { // if card is not shown yet
            addCard(evt.target);

            //add delay so that second card is shown
            setTimeout(function(){
                if (openCards.length == 2) {
                        //if both cards are equal lock the cards
                        if (openCards[0].innerHTML == openCards[1].innerHTML) {
                            lockCards();
                        }
                        //cards do not match
                        else {
                            noMatchCards();
                        }
                        openCards = []; // empty the array
                        addCounter();
                    }
                    if(document.querySelectorAll('.match').length == 16){
                        //add delay so that cards css are changed before this
                        setTimeout(endGameMessage, 200);
                    }
                }, 150);
        }
    }
});

/*
 * Add a card to the list
 */
function addCard(el) {
    el.className += ' show open';
    openCards.push(el);
}

/*
 * Lock the cards in the open position
 */
function lockCards() {
    openCards[0].className = 'card match';
    openCards[1].className = 'card match';
}

/*
 * Remove the cards from the list and hide the card's symbol
 */
function noMatchCards() {
    openCards[1].className = 'card';
    openCards[0].className = 'card';
}

/*
 * Increment the move counter and display it on the page
 */
function addCounter() {
    let counter = document.getElementsByClassName('moves')[0];
    let count = 0;
    count = parseInt(counter.textContent) + 1;
    counter.textContent = count;
    //decrease the rating accordingly
    if (count == 12) decreaseRating();
    else if (count == 18) decreaseRating();
    else if (count == 24) decreaseRating();
}

/*
 * Display a message with the final score
 */
function endGameMessage() {
    //TODO add timer and question if they want to play again
    if(confirm(`You completed the game with a rating of ${rating}. Want to play again?`)) displayCards(cardList())
}
/*
 * Start and display a timer
 */
function startTime() {
    //TODO add timer to the game and display it
}

var rating = 3;

/*
 * Decrease the ratings
 */
function decreaseRating() {
    const star = document.querySelectorAll('ul.stars li i');
    if (rating > 0) {
        rating -= 1;

        //loop and check the last star that isn't "removed"
        for (let i = star.length - 1; i >= 0; i--) {
            if (star[i].className == 'fa fa-star') {
                star[i].className = 'fa fa-star-o';
                break;
            }
        }
    }
}

/*
 * Event listener to restart the game after clicking the icon
 */
document.getElementsByClassName('restart')[0].addEventListener('click', function(evt) {
    evt.preventDefault();
    displayCards(cardList());
});
