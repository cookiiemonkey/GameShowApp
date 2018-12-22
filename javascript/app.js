const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const heart = document.querySelectorAll('img');
const button = document.querySelectorAll('.keyrow button');
const screen = document.querySelector('.start');
const buttonMain = document.querySelector('.btn__reset');
const phrases = 
    ['pompoen is lekker', 
     'koelheid is cool', 
     'stinkdier stinkt', 
     'facebook', 
     'lasagna is pasta',];

let missed = 0;
let letterFound = "";

function getRandomPhraseAsArray (arr) {
    const randomNumber = Math.floor((Math.random() * 5) + 1);
    let randomPhrase = '';
    switch(randomNumber){
        case 1:
            randomPhrase = arr[0];
            break;
        case 2:
            randomPhrase = arr[1];
            break;
        case 3:
            randomPhrase = arr[2];
            break;
        case 4:
            randomPhrase = arr[3];
            break;
        case 5:
            randomPhrase = arr[4];
            break;
        default:
            console.log("error ! no array");
            break;
    }
    
    return randomPhrase;
}
function createLI(text) {
    const li = document.createElement('li');
    li.textContent = text;
    const ul = document.querySelector('#phrase ul');
    ul.appendChild(li);
    return li;
}
function addPhraseToDisplay (arr){
    for (var i = 0; i < arr.length; i++){
        const li = createLI(arr[i]);
        if (arr[i] != " ") {
            li.className = "letter";
        }else {
            li.className = "space";
        }
    }
}
function checkLetter (button){
    const letters = document.querySelectorAll('.letter');
    let userLetter = button;
    let letter = null;
    for (var i = 0; i < letters.length; i++){
        if (letters[i].innerHTML === userLetter){
            letters[i].className = "show";
            letters[i].disabled = true;
            letter = letters[i].innerHTML;
            }else if (i === letters.length - 1){
            break;
            }
    }
    
    return letter;    
}
function missedGuesses (letter){
    
    if (letter === null) {
        heart[missed].src = "images/lostHeart.png";
        missed++;
        }
}

function checkWin (score){
    
    let missed = score;
    const li = document.querySelectorAll('.letter').length;
    if (li === 0 && missed != 5){
        screen.className = "win";
        restart ();
    }else if (missed === 5) {
        screen.className = "lose";
        restart ();
    }
   
}

function startGame(){
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}


startButton.addEventListener('click', (e) => {
    const startScreen =  document.querySelector('#overlay');
    startScreen.style.display = 'none';
    startGame();
    
});


for (var i = 0; i < button.length; i++) {
    
    button[i].addEventListener("click", function(e) {
        const clickedButton = e.target;
         clickedButton.className = "chosen";
         clickedButton.disabled = true;
        
        console.log(clickedButton.innerHTML);
        
        letterFound = checkLetter(clickedButton.innerHTML);
        missedGuesses(letterFound);

        checkWin(missed);
    })
};


function restart () {
        
    screen.style.display = "flex";
    buttonMain.innerHTML = "Restart";
    missed = 0;
    
     //reset letters 
    var li = document.querySelectorAll('ul li');
    for (var i = 0; i < li.length; i++){
        li[i].parentNode.removeChild(li[i]);
    }
    
    //reset hearts
    for (var i = 0; i < heart.length; i++) {      
        heart[i].src = "images/liveHeart.png";
        }
    
    //reset buttons
    for (var i = 0; i < button.length; i++){      
        button[i].className =  "not-chosen";
        button[i].disabled  =  false;
    }
}

    




































