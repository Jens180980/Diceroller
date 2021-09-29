///////////////////////////////////////////////////////////////////////////////////////////
                             // MODEL //
//////////////////////////////////////////////////////////////////////////////////////////

// Global Scopes for diceRoller
const numberOfDice = 5
const hook = document.getElementById("diceRoller")
let score = 0
let arrDiceRoll = []
let strScore = ""

///////////////////////////////////////////////////////////////////////////////////////////
                             // VIEW //
//////////////////////////////////////////////////////////////////////////////////////////

// DOM creation
const diceWrap = document.createElement('section')
const button = document.createElement('button')
const scoreboard = document.createElement('p')
const strScoreHTML = document.createElement('p')

diceWrap.style.display = 'flex'
diceWrap.style.justifyContent = 'space-around'
diceWrap.style.padding = '4rem 2rem'
hook.appendChild(diceWrap)



// Kalder startskærm med funktionen init
init()

// funktion cardsHTML laver HTML til terninger
function cardsHTML(value) {
    let card = document.createElement('div')
    let face = createDice(value)
    card.classList.add('card')
    card.appendChild(face)
    diceWrap.appendChild(card)
}

// funktion init laver en startskærm
function init(){
    for(let i = 0; i < numberOfDice; i++) { cardsHTML(6) }
    showScore()
    createButton('Kast terninger')
    strScoreHTML.innerText = 'Held og lykke'
    hook.appendChild(strScoreHTML)
}

// funktion createButton skaber en knap
function createButton(text) {
    hook.appendChild(button)
    button.innerText = text
}

// Funktion score lægger værdier af kast sammen og viser på skærm
function showScore() {
    scoreboard.innerText = score
    hook.appendChild(scoreboard)
}



// Nulstiller HTML
function reset() {
    diceWrap.innerHTML = ""
    score = 0
    arrDiceRoll = []
}

/**
 * Genererer svg html til terning
 * @param {number} num_eyes 
 * @returns {string} html streng med svg og dice face
 */
 function createDice(num_eyes) {
    let mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
    mySvg.classList.add('dice');

    let myRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

    myRect.setAttribute('x', 10);
    myRect.setAttribute('y', 10);
    myRect.setAttribute('width', 100);
    myRect.setAttribute('height', 100);
    myRect.setAttribute('rx', '20');
    myRect.setAttribute('fill', 'white');
    myRect.setAttribute('stroke', 'black');
    myRect.setAttribute('stroke-width', '3');

    mySvg.appendChild(myRect);

    switch (num_eyes) {
        case 1:
            mySvg.appendChild(drawCircle(50, 50));
            break;
        case 2:
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(20, 80));
            break;

        case 3:
            mySvg.appendChild(drawCircle(50, 50));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(20, 80));
            break;

        case 4:
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));
            break;

        case 5:
            mySvg.appendChild(drawCircle(50, 50));
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));
            break;

        case 6:
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));

            mySvg.appendChild(drawCircle(20, 50));
            mySvg.appendChild(drawCircle(80, 50));
            break;

        default:
    }


    return mySvg;


}

/**
 * Tegner øjne cirkler 
 * @param {number} x X position
 * @param {number} y Y position
 * @returns {string} html streng med svg circle
 */
function drawCircle(x, y) {
    let myCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    myCircle.setAttribute('r', '10');
    myCircle.setAttribute('cx', x + 10);
    myCircle.setAttribute('cy', y + 10);
    myCircle.setAttribute('fill', 'black');
    return myCircle;
}

///////////////////////////////////////////////////////////////////////////////////////////
                             // CONTROLLER //
//////////////////////////////////////////////////////////////////////////////////////////


// funktion randomValues skaber et tilfældigt helt tal mellem 1 og 6
function randomValue() {
    let value = Math.ceil(Math.random() * 6)
    return value
}

// funktion showDice vælger billede af terningside
function showDice(dices) {
    for(let i = 0; i<dices; i++) {
        let roll = randomValue()
        score += roll
        arrDiceRoll.push(roll)
        cardsHTML(roll)
    }  
}

// Eventlistener på knap der starter terningerul
button.addEventListener('click', function(){
    reset()
    let btnText = 'Kast igen'
    button.innerText = btnText
    showDice(numberOfDice, randomValue())
    showScore()
    createButton(btnText)
    calcStrScore()
})


// Funktion calcStrScore finder par, tre ens, osv.
function calcStrScore() {
    
    const diceReduced = arrDiceRoll.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); 
    let arrMap = Array.from(diceReduced.values()); // Reducerer array til nyt array med tilfælde

    switch(arrMap.length) {

        case 1 : strScoreHTML.innerText = 'Balut!'
            break
        case 2 : arrMap.includes(4) ? strScoreHTML.innerText = '4 ens!' : strScoreHTML.innerText = 'Full House!'
            break
        case 3 : arrMap.includes(3) ? strScoreHTML.innerText = '3 ens!' : strScoreHTML.innerText = '2 par!'
            break
        case 4 : strScoreHTML.innerText = '1 par'
            break
        case 5 : if(score == 15) {strScoreHTML.innerText = 'Lille trappe!'}
                    else if(score == 20) {strScoreHTML.innerText = 'Stor trappe!'}
                    else (strScoreHTML.innerText = 'Desværre. Prøv igen.')
    }

    hook.appendChild(strScoreHTML)
   
    }














