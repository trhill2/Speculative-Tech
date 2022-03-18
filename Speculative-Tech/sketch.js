/*******************************************************************************************************************
      Moody
    by Scott Kildall
 
  Color Palette Values:

  Black: #031927
  Turquoise: #3ED8D2
  Canary: #FFF689
  Sizzling Red: #F2545B
  Pale Purple: #E9D6EC

    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/
//tyishaHill

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var currentStateName = "";
var moodImage;

var bkColor = '#D4B6C6';
var textColor = '#E9D6EC';

var buttonFont;


const nextIndex = 0;
const droneIndex= 4;
//const iconIndex= 2;
const studentIndex = 14;
const momIndex = 15;
const influenceIndex = 16;
const sfnativeIndex = 17;

var nextImg;
var nextHoverImg;

var droneimg;
var doneimghover;

var StudentIcon;
var studentHover;

var momIcon;
var momHover;

var InfluenceIcon;
var InfluenceHover;

var sfIcon;
var sfHover;


function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  buttonFont = loadFont("AtariClassic-ExtraSmooth.ttf");

  nextImg  = loadImage("assets/start.png");
  nextHoverImg = loadImage("assets/starthover.png");

  droneImg = loadImage("assets/drone3-02.png");
  droneImgHover = loadImage("assets/droneimghover2-02.png");

  StudentIcon = loadImage("assets/studenticon.png");
  studentHover = loadImage("assets/studentcard.png");

  InfluenceIcon = loadImage("assets/influenceicon.png");
  InfluenceHover = loadImage("assets/influencecard.png");

  momIcon = loadImage("assets/momicon.png");
  momHover = loadImage("assets/momcard.png");

  sfIcon = loadImage("assets/sficon.png");
  sfHover = loadImage("assets/sfcard.png");

 
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage, stateChanged);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawOther();
  drawUI();
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = "AtariClassic-ExtraSmooth";
    clickables[i].width = 220;
  }

  clickables[0].drawImageOnly = true;
}

// tint when mouse is over
clickableButtonHover = function () {


  if( this.id === nextIndex ) {
    this.setImage(nextHoverImg);
  } 

  if( this.id === droneIndex ) {
    this.setImage(droneImgHover);
  } 

  if( this.id === studentIndex ) {
    this.setImage(studentHover);
  } 

  if( this.id === momIndex ) {
    this.setImage(momHover);
  } 

  if( this.id === sfnativeIndex ) {
    this.setImage(sfHover);
  } 

  if( this.id === influenceIndex ) {
    this.setImage(InfluenceHover);
  } 
}

// color a light gray if off
clickableButtonOnOutside = function () {
 

  if( this.id === nextIndex ) {
    this.setImage(nextImg);
  } 
  if( this.id === droneIndex ) {
    this.setImage(droneImg);
  } 

  if( this.id === studentIndex ) {
    this.setImage(StudentIcon);
  } 

  if( this.id === momIndex ) {
    this.setImage(momIcon);
  } 

  if( this.id === sfnativeIndex ) {
    this.setImage(sfIcon);
  } 

  if( this.id === influenceIndex ) {
    this.setImage(InfluenceIcon);
  } 
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image(background image)
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
} 

// this is a callback, which we can use for different effects
function stateChanged(newStateName) {
    currentStateName = newStateName;
    console.log(currentStateName);
} 


//==== KEYPRESSED ====/
function mousePressed() {
  // if( currentStateName === "Splash" ) {
  //   complexStateMachine.newState("Instructions");
  // }  /// using the page to the user to next page 
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(bkColor));
}

function drawImage() {
  if( moodImage !== undefined ) {
    image(moodImage, width/2, height/2);
  }  
}

function drawOther() {
  push();

   // Draw mood — if not on Splash or Instructions screen  
   if( currentStateName !== "Splash" && currentStateName !== "Instructions") {
    fill(color(textColor));
    textFont(buttonFont);
    textSize(24);
  }
  //makes all other type the same font as button 

  pop();
}

//-- right now, it is just the clickables
function drawUI() {
  push();
  imageMode(CORNER);
  clickablesManager.draw();
  pop();
}
