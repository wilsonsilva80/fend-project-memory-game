/*
 * Create a list that holds all of your cards
 */
function cardList(){
    const cards = document.querySelectorAll('.deck  li');
    return cards;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(cards){
    const arr = [];
    let addHTML = '';

    //retrieve trimmed HTML of each card
    for(let i = 0; i < cards.length; i++){
        let card = cards[i].outerHTML.trim();
        arr.push(card);
    }

    //shuffle the cards
    const shuffled = shuffle(arr);
    console.log('shuffle ' + shuffled);

    //Remove all child elements function from  https://stackoverflow.com/a/3955238
    const deck = document.getElementById('deck');
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    //add HTML to deck element
    for(let i = 0; i < shuffled.length; i++){
        addHTML += shuffled[i];
    }
    console.log('innerhtml ' + addHTML);
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
