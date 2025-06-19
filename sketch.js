let couleurSerpent = [0, 180, 0];
let isPaused = false;

function setup() {
  createCanvas(400, 400);
  time = 0;
  stroke('white');
  pomme = [];
  ko = true;
  pommeNbr = document.getElementById('pomme');
  tempsNbr = document.getElementById('temps');
  create_pomme(10);
  snake = [];
  snake.push([90, 90]);
  snake.push([90, 100]);
  snake.push([90, 110]);
  snake_direction = "up";
  interval = setInterval(() => {
    if (!isPaused && ko) {
      keyPressed();
      next_direction();
      move_snake();
      texte_score();
    }
  }, 100);
}

function draw() {
  background(220);

  for (i = 0; i < 40; i++) {
    line(i * 10, 0, i * 10, 400);
    line(0, i * 10, 400, i * 10);
  }

  snake.forEach((element) => {
    fill(couleurSerpent[0], couleurSerpent[1], couleurSerpent[2]);
    rect(element[0], element[1], 10, 10);
  });

  draw_pomme();

  if (isPaused) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('PAUSE', width / 2, height / 2);
  }

  if (!ko) {
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Tu es MORT !', width / 2, height / 2);
    textSize("10")
  }
    
}

function keyPressed() {
  if (keyCode == 80) {
    isPaused = true;
    return;
  }

  if (keyCode == 79) { 
    isPaused = false;
    return;
  }

  if (keyCode == 82) {
    restartGame()
  }

  if (keyCode == UP_ARROW && snake_direction != "down") {
    snake_direction = "up";
  } else if (keyCode == DOWN_ARROW && snake_direction != "up") {
    snake_direction = "down";
  } else if (keyCode == LEFT_ARROW && snake_direction != "right") {
    snake_direction = "left";
  } else if (keyCode == RIGHT_ARROW && snake_direction != "left") {
    snake_direction = "right";
  }
}

function next_direction() {
  snake_next_direction = null;
  if (snake_direction == "up") {
    snake_next_direction = [snake[0][0], snake[0][1] - 10];
  } else if (snake_direction == "down") {
    snake_next_direction = [snake[0][0], snake[0][1] + 10];
  } else if (snake_direction == "left") {
    snake_next_direction = [snake[0][0] - 10, snake[0][1]];
  } else if (snake_direction == "right") {
    snake_next_direction = [snake[0][0] + 10, snake[0][1]];
  }
}

function move_snake() {
  mange = false;

  for (p = 0; p < pomme.length; p++) {
    npomme = pomme[p];
    if (snake_next_direction[0] === npomme[0] && snake_next_direction[1] === npomme[1]) {
      pomme.splice(p, 1);
      mange = true;
      create_pomme(1);
    }
  }

  if (!mange) {
    snake.pop();
  }
  snake.unshift(snake_next_direction);

  check_collision();
  time++;
}

function create_pomme(nbr) {
  for (u = 0; u < nbr; u++) {
    const x = Math.floor(random(0, 39));
    const y = Math.floor(random(0, 39));
    pomme.push([x * 10, y * 10]);
  }
}

function draw_pomme() {
  fill('red');
  pomme.forEach((element) => {
    rect(element[0], element[1], 10, 10);
  });
}

function check_collision() {
  for (b = 1; b < snake.length; b++) {
    if (snake[0][0] === snake[b][0] && snake[0][1] == snake[b][1]) {
      noLoop();
      ko = false;
    }
    if (
      snake[0][0] < 0 ||
      snake[0][0] >= width ||
      snake[0][1] < 0 ||
      snake[0][1] >= height
    ) {
      noLoop();
      ko = false;
    }
  }
}

function texte_score() {
  const a = snake.length - 3;
  pommeNbr.textContent = `Pomme(s) : ${a}`;
  if (ko) {
    tempsNbr.textContent = `Temps de jeu : ${floor(time / 10)}s`;
  }
}

function restartGame() {
  clearInterval(interval);
  setup();
  loop();
  ko = true;
  time = 0;
  pommeNbr.textContent = `Pomme(s) : 0`;
  tempsNbr.textContent = `Temps de jeu : 0s`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnRestart = document.getElementById('restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      restartGame();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".boutons img");

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const alt = btn.getAttribute("alt");

      if (alt.includes("vert")) {
  couleurSerpent = [0, 180, 0];
  isMulticolore = false;
} else if (alt.includes("rouge")) {
  couleurSerpent = [255, 0, 0];
  isMulticolore = false;
} else if (alt.includes("violet")) {
  couleurSerpent = [128, 0, 128];
  isMulticolore = false;
} else if (alt.includes("jaune")) {
  couleurSerpent = [255, 255, 0];
  isMulticolore = false;
}

    });
  });
});

window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
