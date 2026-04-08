// Game state
let gameState = {
  light: false,
  key: false
};

let gameLog = [];

function displayText(text) {
  gameLog.push(text);
  updateDisplay();
}

function updateDisplay() {
  const container = document.getElementById('game-container');
  container.innerHTML = gameLog.map(text => `<p>${text}</p>`).join('');
}

function showChoice(question, choices) {
  displayText(question);
  const container = document.getElementById('game-container');
  
  const choiceDiv = document.createElement('div');
  choiceDiv.id = 'choice-buttons';
  
  choices.forEach(([label, callback]) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = () => {
      removeChoiceButtons();
      callback();
    };
    choiceDiv.appendChild(btn);
  });
  
  container.appendChild(choiceDiv);
}

function removeChoiceButtons() {
  const buttons = document.getElementById('choice-buttons');
  if (buttons) buttons.remove();
}

// Game functions
function startGame() {
  gameLog = [];
  displayText("You now have to survive 5 nights with Raian");
  displayText("You will be paid £50 for each day survived by criminals");
  displayText("He doesn't know you are in his house so don't get caught");
  displayText("After 1st day door is locked and requires a key");
  setTimeout(() => pizzaroom(), 500);
}

function pizzaroom() {
  showChoice("Do you want to enter Pizza Room?", [
    ["Yes", death1],
    ["No", livingroom]
  ]);
}

function death1() {
  displayText("Raian saw you and chopped off all the limbs in your body");
  displayText("Game Over");
  showRestartButton();
}

function livingroom() {
  showChoice("You see a vase spin out of control. Do you stop it from falling?", [
    ["Yes", bigdecision],
    ["No", death2]
  ]);
}

function death2() {
  displayText("Raian ran to livingroom and caught you");
  displayText("Game over");
  showRestartButton();
}

function bigdecision() {
  showChoice("Raian is near where you are. Do you turn on light to see better?", [
    ["Yes", lightday1],
    ["No", day1]
  ]);
}

function lightday1() {
  gameState.light = true;
  showChoice("Do you want to leave?", [
    ["Yes", () => {
      displayText("You saw Raian but when he left you went to the exit");
      displayText("You survived");
      showRestartButton();
    }],
    ["No", upstairs]
  ]);
}

function day1() {
  showChoice("Do you want to leave?", [
    ["Yes", () => {
      displayText("You weren't able to see Raian without the light so he caught you");
      displayText("You died");
      displayText("Game over");
      showRestartButton();
    }],
    ["No", upstairs]
  ]);
}

function upstairs() {
  showChoice("Do you want to go to the Bathroom?", [
    ["Yes", () => {
      displayText("Raian found you in the toilet");
      displayText("Raian put your head in the toilet");
      displayText("You died");
      showRestartButton();
    }],
    ["No", bedroom]
  ]);
}

function bedroom() {
  displayText("It's the second day");
  showChoice("Do you want to go to the bedroom? Else you will try and leave.", [
    ["Bedroom", bed],
    ["Leave", door]
  ]);
}

function bed() {
  showChoice("Do you want to sleep in his bed?", [
    ["Yes", () => {
      displayText("Raian hears a creak in bed and jumps on the bed with you");
      displayText("He then ate you in the pizza room");
      showRestartButton();
    }],
    ["No", drawer]
  ]);
}

function door() {
  displayText("You try to open door but realise it's locked");
  displayText("Raian finds you and cooks you into a curry");
  showRestartButton();
}

function drawer() {
  displayText("You found key");
  gameState.key = true;
  newdoor();
}

function newdoor() {
  showChoice("Do you finally want to leave?", [
    ["Yes", () => {
      displayText("Well Done, you survived with £250");
      showRestartButton();
    }],
    ["No", basement]
  ]);
}

function basement() {
  displayText("You go to the basement");
  displayText("Raian finds you and asks you to give a good picture to make him trust you");
  showChoice("Do you give him a picture of a random person?", [
    ["Yes", () => {
      displayText("It was a picture of Soham and Kavi");
      displayText("You died");
      showRestartButton();
    }],
    ["No", () => {
      displayText("You told him a lie and he believes it and trusts you");
      displayText("You survived... Or maybe not");
      downstairs();
    }]
  ]);
}

function downstairs() {
  displayText("You go downstairs but he changes his mind on you.");
  displayText("He grabs a knife and shield and charges on to you");
  showChoice("Do you want to hide in the drawers or vents?", [
    ["Drawers", () => {
      displayText("You didn't fit in drawers");
      displayText("You died");
      showRestartButton();
    }],
    ["Vents", secretroom]
  ]);
}

function secretroom() {
  displayText("Welcome to the secret endings");
  displayText("You see that Raian has been hiding a big secret");
  displayText("Raian has been a part of criminal activities in this room");
  showChoice("Do you want to expose secret right now online?", [
    ["Yes", () => {
      displayText("You expose it to the internet");
      displayText("Raian immediately goes into room");
      displayText("Raian live streams killing you");
      showRestartButton();
    }],
    ["No", () => {
      displayText("You slowly leave holding evidence and leave");
      policestation();
    }]
  ]);
}

function policestation() {
  displayText("You are thinking about snitching about Raian's deadly crimes");
  showChoice("Do you want to do it?", [
    ["Yes", () => {
      displayText("You snitch to police and Raian is in prison for 25 years");
      displayText("You survived");
      showRestartButton();
    }],
    ["No", () => {
      displayText("You are thinking about joining Raian");
      house();
    }]
  ]);
}

function house() {
  displayText("You decide to ask Raian to join his group and commit deadly acts");
  displayText("You will be the villain");
  showChoice("Would you change your mind mid sentence and not want to join?", [
    ["Yes", () => {
      displayText("Raian kills you as you have too much information");
      showRestartButton();
    }],
    ["No", newpizzaroom]
  ]);
}

function newpizzaroom() {
  displayText("You see a guy called Olaf Grela in pizza room");
  showChoice("Do you kill him?", [
    ["Yes", () => {
      displayText("Olaf gets cooked in the pizza room into a pizza");
      newbasement();
    }],
    ["No", () => {
      displayText("Why would you let him go, you are a killer!");
      newbasement();
    }]
  ]);
}

function newbasement() {
  displayText("You see a guy called Arkash Asokarajan in basement");
  showChoice("Do you want to kill him?", [
    ["Yes", () => {
      displayText("Arkash got thrown from the stairs and cracked his head open");
      newbedroom();
    }],
    ["No", () => {
      displayText("Why would you let him go, you are a killer!");
      newbedroom();
    }]
  ]);
}

function newbedroom() {
  displayText("You see a guy called Lavlin Singh");
  showChoice("Do you want to kill him?", [
    ["Yes", () => {
      displayText("You kill him on a tiktok live");
      newhouse();
    }],
    ["No", () => {
      displayText("Why would you let him go, you are a killer!");
      newhouse();
    }]
  ]);
}

function newhouse() {
  displayText("You see someone called Idrees Noori");
  showChoice("Do you want to kill him?", [
    ["Yes", () => {
      displayText("Idrees is killed by getting his head flushed into toilet");
      newbathroom();
    }],
    ["No", () => {
      displayText("Idrees convinces you to join a terrorist group");
      showChoice("Will you say yes?", [
        ["Yes", () => {
          displayText("You betray Raian and kill him");
          displayText("You are now a part of Idrees's group");
          showRestartButton();
        }],
        ["No", () => {
          displayText("He kills you by throwing a bomb at you");
          showRestartButton();
        }]
      ]);
    }]
  ]);
}

function newbathroom() {
  displayText("You see a guy called Kacper Kazimirowicz");
  displayText("You see a harness underneath clothes");
  showChoice("Do you want to kill him?", [
    ["Yes", () => {
      displayText("Kacper was a police officer and he shot you with a gun");
      showRestartButton();
    }],
    ["No", () => {
      displayText("He left after 1 hour of searching the area");
      newlivingroom();
    }]
  ]);
}

function newlivingroom() {
  displayText("You see a guy called Soham Mevada");
  showChoice("Do you want to kill him?", [
    ["Yes", () => {
      displayText("You torture him for 5 months, leaving him almost starving");
      displayText("You beat him to death everyday as he is crying for help");
      displayText("You impressed everyone and is now permanently Raian");
      showRestartButton();
    }],
    ["No", () => {
      displayText("You should have killed him");
      displayText("He kills you out of nowhere");
      showRestartButton();
    }]
  ]);
}

function showRestartButton() {
  const container = document.getElementById('game-container');
  const btn = document.createElement('button');
  btn.textContent = 'Play Again';
  btn.style.marginTop = '20px';
  btn.onclick = startGame;
  container.appendChild(btn);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.onclick = startGame;
  }
});
