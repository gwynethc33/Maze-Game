/* VARIABLES */
let player, walls, obstacles;
let enterButton;
let gameState= "coverPage"
let starImg, playerImg, backgroundImg, mazeImg, coverImg
let collectedStars = 0;
let messages = ["Keep going!", "You're strong!", "Believe in yourself!", "You're loved!", "Have Hope!"];
let currentMessage = "";
let messageDuration = 120;
let messageTimer = 0;


//Function for images
function preload(){
  starImg = loadImage("assets/pngtree-goldan-3d-star-emoji-icon-png-image_10459560.png");
  playerImg= loadImage( "assets/White-Moon-Transparent-PNG.png")
  backgroundImg = loadImage("assets/360_F_134085808_Vm7Twy29swDBLiZ2MavEmYDEmpjIu3OG.jpg");
  mazeImg = loadImage("assets/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg");
  coverImg = loadImage("assets/hope-background-n7tf5k3isoba3l0b.jpg")
}
/* SETUP RUNS ONCE */
  function setup() {
    createCanvas(600, 400);
    textAlign(CENTER);
    textSize(20);
    noStroke();
    // Create player sprite but keep it invisible
      player = new Sprite(playerImg, 350, 50, 40, 40);
      player.visible = false;
      player.rotationLock = true;

    //resize 
    playerImg.resize(100,0);

      // Create walls group
      walls = new Group();
      walls.visible= false;

    //obstalces
    obstacles = new Group();
    obstacles.visible = false;

      // Create maze walls
      createMazeWalls();
    
    //create obstacles
    createObstacles();
    
    //Enter buttons
    enterButton = new Sprite(300,250,100,50, "k"); 
      enterButton.color = color(150);
      enterButton.text = "Enter"; 
      enterButton.textSize = 20; 
    }
function draw() {
  if (gameState === "coverPage") {
    drawCoverPage();
 } else if (gameState === "game") {
  drawGame();
  }
}
    // Function to draw the cover page
function drawCoverPage() {
  background(coverImg,200);
  fill(0);
  textSize(32);
  textAlign(CENTER);
  text("Stars of Hope Maze", width / 2, height / 2 - 40);
  textSize(16);
  text("Click Enter to start", width / 2, height / 2);
  // Draw the button
  enterButton.draw();
}
// Check if the "Enter" button is pressed
function mousePressed () {
  if (gameState === "coverPage" && enterButton.mouse.presses){
    startGame();
    print ("pressed")
}
}
function startGame() {
  gameState = "game";
  enterButton.remove();
  player.visible = true; 
  walls.visible = true;
  obstacles.visible = true; // Show the obstacles
   print("Game started");

    // Draw start and end text
    fill(0);
    textSize(20);
    text('Start', 330, 20);
    text('End', 22, 395);
  }
  
function drawGame() {
    background(mazeImg,220);

    // Handle player movement
    if (kb.pressing("left")) {
      player.vel.x = -3;
    } else if (kb.pressing("right")) {
      player.vel.x = 3;
    } else if (kb.pressing("up")) {
      player.vel.y = -3;
    } else if (kb.pressing("down")) {
      player.vel.y = 3;
    } else {
      player.vel.x = 0;
      player.vel.y = 0;
    }
    // Prevent player from going above the maze
    if (player.y < 20) {
      player.y = 20;
    }
     // Iterate through obstacles to check for collisions
     for (let i = obstacles.length - 1; i >= 0; i--) {
       let obstacle = obstacles[i];

       // Check for collision between player and obstacle
       if (player.collide(obstacle)) {
         obstacle.remove(); // Remove the obstacle (star)
         displayNewMessage();
       }
     }

      // Display the current message if the timer is active
      if (messageTimer > 0) {
        fill("white");
        textSize(18);
        text(currentMessage, width / 2, 50);
        messageTimer--;
      }
  // Draw start and end text
  fill("white");
  textSize(20);
  text('Start', 350, 20);
  text('End', 50, 385);
  
  // Check for win condition
  if (player.y>380) {
     background(backgroundImg, 255, 255, 0);
    fill("white");
    textSize(18);
    textAlign(CENTER);
    text("Congratulations! You collected all stars!\nDon't ever lose hope.\n'Shoot for the stars but if you happen to miss, shoot for the \nmoon instead'\n- Neil Armstrong", width / 2, height / 2);
    messageTimer = messageDuration;
    winMessageDisplayed = true;
    walls.visible = false;
    player.visible = false;
  }

      drawSprites();
    }
    // Function to display a new message
      function displayNewMessage() {
        if (messages.length > 0) {
          let randomIndex =             
         floor(random(messages.length));
          currentMessage = 
          messages.splice(randomIndex, 1)            [0];
          messageTimer = messageDuration; 
        } else {
          currentMessage = "All stars collected!";
          messageTimer = messageDuration; 
        }
      }
    //Create the maze
   function createMazeWalls(){
  walls = new Group();
  walls.color=color("white");
  walls.collider="s";

      new walls.Sprite(160, 10, 300, 5,);
      new walls.Sprite(10, height/2, 5, height - 15);  
      new walls.Sprite(150, 60, 5, 100);
      new walls.Sprite(width/2 + 35, 390, 325, 5);
      new walls.Sprite(50, 300, 75, 5); 
      new walls.Sprite(340, 146, 110, 5);
      new walls.Sprite(340, 250, 110, 5);
      new walls.Sprite(285, 198, 5, 109);
      new walls.Sprite(185, 332, 5, 109);
      new walls.Sprite(190, 197, 185, 5);
      new walls.Sprite(395, 200, 5, 380);
     }
// Create obstacles and add the star image to them
function createObstacles() {
  // Create individual obstacles with the star image
  let obstacle1 = new obstacles.Sprite(200, 150, 50, 50);
  obstacle1.addImage(starImg);
  obstacle1.scale = 0.1;
  obstacles.add(obstacle1);

  let obstacle2 = new obstacles.Sprite(50, 200, 20, 80);
  obstacle2.addImage(starImg);
  obstacle2.scale = 0.1;
  obstacles.add(obstacle2);

  let obstacle3 = new obstacles.Sprite(150, 300, 30, 30);
  obstacle3.addImage(starImg);
  obstacle3.scale = 0.1;
  obstacles.add(obstacle3);

  let obstacle4 = new obstacles.Sprite(200, 50, 40, 40);
  obstacle4.addImage(starImg);
  obstacle4.scale = 0.1;
  obstacles.add(obstacle4);

  let obstacle5 = new obstacles.Sprite(120, 150, 30, 30);
  obstacle5.addImage(starImg);
  obstacle5.scale = 0.1;
  obstacles.add(obstacle5);

  let obstacle6 = new obstacles.Sprite(70, 250, 30, 30);
  obstacle6.addImage(starImg);
  obstacle6.scale = 0.1;
  obstacles.add(obstacle6);
}