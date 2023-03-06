let gameBox = document.querySelector(".game-box");
let displayScore = document.querySelector(".score");

const letter = [];
let count = 0, score = 0;
displayScore.innerText = "Score: " + score;
let characters = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890<>!@#$%^&*+=-();/.?,{}[]'\"\\";
let colors = [
    "#da00ff",
    "#00ff0a",
    "#fff700",
    "#ff0000",
    "#00eeff",
    "#e91e63",
    "#ff4400",
    "#89ff00"
];

function setLetter(le) {
    le.y = -30;
    le.x = Math.floor(Math.random() * 275);
    le.ele.style.top = le.y + "px";
    le.ele.style.left = le.x + "px";
    le.ch = randChar();
    le.ele.style.color = colors[Math.floor(Math.random() * colors.length)];
    le.ele.innerText = le.ch;
    le.ele.style.transition = "0ms";
}

function randChar() {
    let newCh = characters[Math.floor(Math.random() * characters.length)];
    let i = 0;
    if (letter.length != 0)
        while (true) {
            if (i === letter.length)
                break;
            if (newCh === letter[i].ch) {
                i = 0;
                newCh = characters[Math.floor(Math.random() * characters.length)];
            }
            i++;
        }
    return newCh;
}
let addLetter = setInterval(() => {
    letter[count] = {
        ele: document.createElement("div"),
        ch: "A",
        x: 0,
        y: 0
    };

    letter[count].ele.classList.add("letter");
    gameBox.appendChild(letter[count].ele);
    setLetter(letter[count]);
    count++;

    if (count >= 5)
        clearInterval(addLetter);
}, 1000);

let gameOver = false;

let gameInterval = setInterval(() => {
    letter.forEach(le => {
        if (le.y > -30)
            le.ele.style.transition = "500ms linear";

        le.ele.style.top = le.y + "px";
        le.y += 20;
        if (le.y > 400) {
            gameOver = true;
            clearInterval(gameInterval);
            document.querySelector(".alert").style.display = "block";
            document.querySelector(".alert").children[1].onclick = () => {location.reload();}
        }
    });
}, 500);

onkeydown = event => {
    letter.forEach(le => {
        if (event.key == le.ch && gameOver === false) {
            setLetter(le);
            score++;
            displayScore.innerText = "Score: " + score;
        }
    });
};