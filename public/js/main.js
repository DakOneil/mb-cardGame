document.querySelector('#newDeck').addEventListener('click', newDeck)
document.querySelector('#shuffleDeck').addEventListener('click', shuffleDeck)
document.querySelector('#draw').addEventListener('click', draw)

const url = 'https://deckofcardsapi.com/api/deck/'
let deckID 
const p1Span = document.getElementById('playerOneCard')
const p2Span = document.getElementById('playerTwoCard')
const resultSpan = document.getElementById('result')

let pile1 = [].flat()
        let pile2 = [].flat()

function cardVal(card) {
    if (card === "ACE") return 14
    else if (card === 'KING') return 13
    else if (card === 'QUEEN') return 13
    else if (card === 'JACK') return 13
    else return +card
}
function suitVal(suit) {
    if (suit === "SPADES") return 4
    else if (suit === "HEARTS") return 3
    else if (suit === "HEARTS") return 2
    else return 1
}
function addToPile(cards, pile) {
    cards.forEach(el=>pile.push(el))
}

async function newDeck() {
    const newOne = url + 'new/shuffle/?deck_count=1'
    
    try {
        const response = await fetch(newOne)
        const data = await response.json()
        deckID = data.deck_id
        console.log(data)
        console.log([data.deck_id])
    }
    catch(err){
      console.log(`error ${err}`)
    }
}

async function shuffleDeck() {
    const shuffle = url + deckID + '/shuffle/'
    
    try {
        const response = await fetch(shuffle)
        const data = await response.json()
        console.log(data)
        console.log('Deck has been shuffled.')
    }
    catch(err){
      console.log(`error ${err}`)
    }
}

async function draw() {
    const drawURL = url + deckID + '/draw/?count=2'
    try {
        const response = await fetch(drawURL)
        const data = await response.json()
        console.log(data)
        // console.log(data.cards.forEach(el=> {
        //     let i = data.cards.indexOf(el)
        //     console.log('Card ' + i + ' is the ' + el.value + ' of ' + el.suit)
        // }))
        const card = data.cards
        const p1Card = card[0].value + ' of ' + card[0].suit
        const p1CardImg = card[0].image
        const p2Card = card[1].value + ' of ' + card[1].suit
        const p2CardImg = card[1].image

        p1Span.innerText = p1Card
        p1CardImage.src = p1CardImg
        p2Span.innerText = p2Card
        p2CardImage.src = p2CardImg

        if (cardVal(card[0].value) > cardVal(card[1].value)) {
            console.log('Player 1 wins!')
            resultSpan.innerText = 'Player 1 wins!'
            addToPile([card[0],card[1]], pile1)
            document.getElementById('playerOnePile').innerText = pile1.length
        } else if (cardVal(card[1].value) > cardVal(card[0].value)) {
            console.log('Player 2 wins!')
            resultSpan.innerText = 'Player 2 wins!'
            addToPile([card[0],card[1]], pile2)
            document.getElementById('playerTwoPile').innerText = pile2.length
        } else if (suitVal(card[0].suit) > suitVal(card[1].suit)) {
            console.log('Player 1 wins by suit!')
            resultSpan.innerText = 'Player 1 wins by suit!'
            addToPile([card[0],card[1]], pile1)
            document.getElementById('playerOnePile').innerText = pile1.length
        } else {
            console.log('Player 2 wins by suit!')
            resultSpan.innerText = 'Player 2 wins by suit!'
            addToPile([card[0],card[1]], pile2)
            document.getElementById('playerTwoPile').innerText = pile2.length
        }

        document.getElementById('cardsLeft').innerText = 'There are ' + data.remaining + ' cards left.'

    }
    catch(err){
        console.log(err)
    }
    // if (data.remaining)
}


/* 
- need to seperate out the draw function so it is not all just inside there 
- function called 'deal' that takes the initial deck and deals it to each players' hand
- function that when someone's hand reaches 0 from playing, they shuffle their pile and that becomes their hand, then they can continue playing
- conditional that when one player gets 52 cards they win!
*/