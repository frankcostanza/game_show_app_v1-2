var qwerty = document.getElementById('qwerty');
var phrase = document.getElementById('phrase');
var missed = 0;
var phrases = ['Pearl Jam', 'Rolling Stones', 'Alice in Chains', 'Stone Temple Pilots', 'Iron Maiden']; 
var startButton = document.getElementById('los');
var overlay = document.getElementById('overlay');
var ul = document.getElementById('wordGuess');
var li;
var wordSplit;
var buttonContent;


startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});


//chhosse a random Content from an array and split it up in a new array.
//Here take the array phrase and split it up in his letters as an array.
function getRandomPhraseAsArray(word) {
    var i = Math.floor(Math.random(word) * word.length);
    var word = phrases[i];
    wordSplit = word.split("");
    return wordSplit;
}

//loop through an array and each time create and list Element an append it to ul. Then add the class letter to the li element if it is a letter. 
//Here: Use the created Array wordsplit from the function getRandomPhraseAsArray and create the worde as list items. The class letter makes them disappear.
function addPhraseToDisplay(array) {
    for (var i = 0; i < array.length; i++) {
        li = document.createElement("li");
        li.textContent = array[i].toUpperCase();
        ul.appendChild(li);
        if (array[i] !== " ") {
            li.classList.add("letter");
        } else {
            li.classList.add("space");
        }
    }
}


//click on a letter of the integrted Keyboard and compare the pressed Letter with all Letters in the Array, if its the pressed Letter match
// with a letter in the Array give the class "show on the matching letter


qwerty.addEventListener('click', (event) => {
    if (event.target.nodeName.toLowerCase() === "button") {
        const letterFound = checkLetter(event.target);
        if (!letterFound) {
            // hole mir alle tries aus der ID scoreboard
            const triesElements = document.querySelectorAll('#scoreboard .tries');

            // wähle mir das nächste tries aus markiere mit der Class lost (index ist gleich wert aus 'missed')
            triesElements[missed].classList.add('lost');
            missed = missed + 1;
        }
        checkWin();
    }
});

function checkWin() {
    const overlayEl = document.getElementById('overlay');
    // if the number of letters with class “show” is equal to the number of letters with class “letters” --> win
    if (document.querySelectorAll('.letter.show').length === document.querySelectorAll('.letter').length) {
        overlayEl.classList.add('win');
        overlayEl.querySelector('.title').innerText = 'Congrats, you won!';
        overlay.style.display = 'block';
    }
    // wenn missed gleich 5 ist, ist das spiel verloren --> lost
    else if (missed === 5) {
        overlayEl.classList.add('lost');
        overlayEl.querySelector('.title').innerText = 'Dang, you lost!';
        overlay.style.display = 'block';
    }

}


// checks if the letter of the button was found
/**
 *
 * @param {EventTarget} button - the element that was clicked on the keyboard
 * @returns {boolean} returns if the letter was found or not
 */
function checkLetter(button) {
    const pressedLetter = button.textContent.toUpperCase();
    console.log(`the letter %o was pressed`, pressedLetter);


    const wordSplitLetter = document.getElementsByClassName("letter");
    let letterFound = false;
    for (let i = 0; i < wordSplitLetter.length; i++) {
        const letter = wordSplitLetter[i].innerText;
        if (letter === pressedLetter) {
            // the letter was found
            wordSplitLetter[i].classList.add("show");
            letterFound = true;
        }

    }
    return letterFound;
}

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.className = 'chosen';
        event.target.disabled = true;
    }
});


getRandomPhraseAsArray(phrases);
addPhraseToDisplay(wordSplit);



