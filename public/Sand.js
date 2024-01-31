let isSandFalling = true;
let pauseButton;
let brushSize = 5;

let colorButtons = [];
let useRainbowColors = true;
let rainbowButtonColor = "purple";
let hueValue = 200;

let pauseButtonText = "Pause";
let toggleButtonText = "Toggle Brush Size";
let rainbowButtonText = "Rainbow";

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 5;
let cols, rows;
let hueValue2 = 200;

function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function background() {
  document.body.style.backgroundImage = "url('images/for.png')";

  const meImage = new Image();
  meImage.src = "images/ME.png";
  meImage.style.position = "fixed";
  meImage.style.left = "70px";
  meImage.style.bottom = "0px";
  meImage.style.width = "200px";
  meImage.style.height = "auto";
  meImage.style.zIndex = "10";

  document.body.appendChild(meImage);
}
background();

function setup() {
  let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]; // Lowercase color names
  let buttonX = 600;
  let buttonY = 70;
  let buttonSpacing = 70;

  for (let i = 0; i < colors.length; i++) {
    let colorButton = createButton(colors[i]);
    colorButton.position(buttonX, buttonY);
    colorButton.mousePressed(() => setColor(colors[i]));

    colorButton.style("width", "100px");
    colorButton.style("height", "50px");
    colorButton.style("padding", "10px");

    colorButton.style("background-color", colors[i]);
    colorButton.style("color", "black");
    colorButton.style("border", "1px solid black");
    colorButtons.push(colorButton);

    buttonY += buttonSpacing;
  }

  rainbowButton = createButton("[R] Rainbow");
  rainbowButton.position(100, 350);
  rainbowButton.mousePressed(toggleRainbow);
  rainbowButton.style("width", "150px");
  rainbowButton.style("height", "50px");
  rainbowButton.style("padding", "10px");
  rainbowButton.style("background-color", "purple");
  rainbowButton.style("color", "black");
  rainbowButton.style("border", "none");
  rainbowButton.style("border", "1px solid black");

  let canvas = createCanvas(1000, 800);
  canvas.position(800, 70);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  canvas.style("border", "10px solid black");
  canvas.elt.style.transition = "border-color 1.2s ease";

  setInterval(() => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 61) + 20;
    const newBorderColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    canvas.style("border-color", newBorderColor);
  }, 1000);

  toggleButton = createButton("[B]Toggle Brush Size (5)");
  toggleButton.position(100, 70);
  toggleButton.mousePressed(toggleBrushSize);
  toggleButton.style("width", "150px");
  toggleButton.style("height", "50px");
  toggleButton.style("padding", "10px");
  toggleButton.style("background-color", "cyan");
  toggleButton.style("color", "black");
  toggleButton.style("border", "none");
  toggleButton.style("border", "1px solid black");

  let clearButton = createButton("[C] Clear Canvas");
  clearButton.position(100, 140);
  clearButton.mousePressed(clearCanvas);
  clearButton.style("width", "150px");
  clearButton.style("height", "50px");
  clearButton.style("padding", "10px");
  clearButton.style("background-color", "#008CBA");
  clearButton.style("color", "black");
  clearButton.style("border", "none");
  clearButton.style("border", "1px solid black");

  pauseButton = createButton("[SPACE] Pause");
  pauseButton.position(100, 210);
  pauseButton.mousePressed(toggleSandFalling);
  pauseButton.style("width", "150px");
  pauseButton.style("height", "50px");
  pauseButton.style("padding", "10px");
  pauseButton.style("background-color", "LightSeaGreen");
  pauseButton.style("color", "black");
  pauseButton.style("border", "none");
  pauseButton.style("border", "1px solid black");
}

function setColor(color) {
  hueValue = colorToHue(color);
  useRainbowColors = false;
  playSound("/audio/Single.wav", 0.01);
}

function toggleRainbow() {
  useRainbowColors = !useRainbowColors;
  if (useRainbowColors) {
    rainbowButtonText = "[R] Rainbow";
  } else {
    rainbowButtonText = "[R] Single Color";
  }
  playSound("/audio/Button.wav", 0.05);
  rainbowButton.html(rainbowButtonText);
}

function colorToHue(color) {
  switch (color) {
    case "red":
      return 359;
    case "orange":
      return 38;
    case "yellow":
      return 60;
    case "green":
      return 120;
    case "blue":
      return 240;
    case "indigo":
      return 277;
    case "violet":
      return 300;
    default:
      return 200;
  }
}

function clearCanvas() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  playSound("/audio/Chat.mp3", 0.05);
}

function toggleBrushSize() {
  if (brushSize === 1) {
    brushSize = 5;
    toggleButtonText = "[B] Toggle Brush Size (5)";
  } else if (brushSize === 5) {
    brushSize = 10;
    toggleButtonText = "[B] Toggle Brush Size (10)";
  } else if (brushSize === 10) {
    brushSize = 20;
    toggleButtonText = "[B] Toggle Brush Size (20)";
  } else if (brushSize === 20) {
    brushSize = 1;
    toggleButtonText = "[B] Toggle Brush Size (1)";
  }
  playSound("/audio/Clear.wav", 0.1);
  toggleButton.html(toggleButtonText);
}

function toggleSandFalling() {
  isSandFalling = !isSandFalling;

  if (isSandFalling) {
    pauseButtonText = "[SPACE] Pause";
    pauseButton.style("background-color", "LightSeaGreen");
  } else {
    pauseButtonText = "[SPACE] Resume";
    pauseButton.style("background-color", "Red");
  }
  playSound("/audio/Pause.wav", 0.05);
  pauseButton.html(pauseButtonText);
}

function keyPressed() {
  if (key === " ") {
    toggleSandFalling();
  } else if (key === "B" || key === "b") {
    toggleBrushSize();
  } else if (key === "R" || key === "r") {
    toggleRainbow();
  } else if (key === "C" || key === "c") {
    clearCanvas();
  } else if (keyCode === TAB) {
  }
}

function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = brushSize;
  let extent = floor(matrix / 2);

  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }

  if (useRainbowColors) {
    hueValue += 1;
    if (hueValue > 360) {
      hueValue = 1;
    }
  }
}

function mouseClicked() {
  playSound("/audio/Typing.wav", 0.01);
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = brushSize;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }

  if (useRainbowColors) {
    hueValue += 1;
    if (hueValue > 360) {
      hueValue = 1;
    }
  }
}

function draw() {
  background(0);

  if (useRainbowColors) {
    rainbowButtonColor = `hsl(${frameCount % 360}, 100%, 50%)`;
    rainbowButton.style("background-color", rainbowButtonColor);
    hueValue = frameCount % 360;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        if (hueValue === "rainbow") {
          fill((frameCount * 2 + i * 10) % 360, 255, 255);
        } else {
          fill(hueValue, 255, 255);
        }
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);

  if (isSandFalling) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];

        if (state > 0) {
          let below = grid[i][j + 1];

          let dir = 1;
          if (random(1) < 0.5) {
            dir *= -1;
          }

          let belowA = -1;
          let belowB = -1;
          if (withinCols(i + dir)) {
            belowA = grid[i + dir][j + 1];
          }
          if (withinCols(i - dir)) {
            belowB = grid[i - dir][j + 1];
          }

          if (below === 0) {
            nextGrid[i][j + 1] = state;
          } else if (belowA === 0) {
            nextGrid[i + dir][j + 1] = state;
          } else if (belowB === 0) {
            nextGrid[i - dir][j + 1] = state;
          } else {
            nextGrid[i][j] = state;
          }
        }
      }
    }
    grid = nextGrid;
  }
}

function playSound(url, volume) {
  var audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}
