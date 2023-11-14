/*
Course: SENG 513
Date October 25, 2023
Assignment 2
Name: Haider Tawfik
UCID: 30097912
/*
player class will include things such as their health, attack, defense, etc, and current x, y position, boolean is invicinble for invicibility frames.
*/
class Player{
    constructor(health, attack, defense, x, y, isInvincible, context){
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.x = x;
        this.y = y;
        this.isInvincible = isInvincible;
        this.context = context;
    }
    //function to move player
    draw() {
        
    }
}

class Background {
    constructor(x, y, image, context){
        this.x = x;
        this.y = y;
        this.image = image; 
        this.context = context
    }
    draw() {
        this.context.drawImage(this.image, this.x, this.y);
    }

}

const player1 = new Player({
    health:100,
    attack:10,
    defense:10,
    x:0,
    y:0,
    isInvincible:false
});

/*
Intialize player objects
*/

/*
Intialize possible buff's array
*/

/*
enemy class, include things such as health, attack, defense, etc, and current x, y position.
*/
class enemy{
    constructor(health, attack, defense, x, y){
    }
    //function to move enemy
    move(x, y){
    }
}


/*
Initalize arrays of enemies for each wave using loops
i.e. first wave will be an 10 skeleton in an array, randomize spawn ensuring that they are valid x y positions
*/

/*
wave class, include things such as current wave, enemies to spawn, enemies left, and chest locations to spawn, and a function to spawn the enemies
*/
class wave{
    constructor(currentWave, enemiesToSpawn, enemiesLeft, chestLocations){
    }
    //function to spawn enemies
    spawnEnemies(enemiesToSpawn){
    }
    //function to spawn chest
    spawnChest(chestLocations){
    }
    //function to check if wave is over (if enemies left is 0), 
    // and to check if game is won (wave is 3 and enemies left is 0)
    // increments the current wave if game is not over
    // calls startNextWave with enemiesToSpawn, enemiesLeft(length of array enemiestToSpawn), and chestLocations
    isWaveOver(){
    }
    //function to start the next wave
    startNextWave(enemiesToSpawn, enemiesLeft, chestLocations){
    }
}


const canvasp1 = document.getElementById('canvasp1');
const c1 = canvasp1.getContext('2d');
const canvasp2 = document.getElementById('canvasp2');
const c2 = canvasp2.getContext('2d');

canvasp1.width = 700;
canvasp1.height = 700;


canvasp2.width = 700;
canvasp2.height = 700;


const image = new Image();
image.src = 'assets/map.png';

const p1Image = new Image();
p1Image.src = 'assets/hero.png';

const offset = {
    x: -64,
    y: -64 * 2
}
const p1background = new Background(offset.x, offset.y, image, c1);
const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false
};

const mapCollision = [];
for (let i = 0; i < collisions.length; i+= 52) {
    mapCollision.push(collisions.slice(i, i+52));
}
class Boundary {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
    }
    draw() {
        c1.beginPath();
        c1.rect(this.x, this.y, this.width, this.height);
        c1.stroke();
    }
}

const boundaries = [];
for (let i = 0; i < mapCollision.length; i++) {
    for (let j = 0; j < mapCollision[i].length; j++) {
        if (mapCollision[i][j] === 1097) {
            boundaries.push(new Boundary(j*64 + offset.x, i*64 + offset.y, 64, 64));
        }
    }
}

const testBoundary = new Boundary(0, 0, 64, 64);
const itemsToMove = [p1background, testBoundary];
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    p1background.draw();
    testBoundary.draw();
    // boundaries.forEach(boundary => {
    //     boundary.draw();
    // });
    c1.drawImage(
        p1Image,
        0,
        0,
        p1Image.width/3,
        p1Image.height/4, 
        4 * 16, 
        8 * 16,
        p1Image.width/2,
        p1Image.height/2, 
    );
    c2.drawImage(image, -(135*16), -(45*16));
    if(keysPressed.w) {
        itemsToMove.forEach(item => {
            item.y += 2;
        });
    }
    if(keysPressed.a) {
        itemsToMove.forEach(item => {
            item.x += 2;
        });
    }
    if(keysPressed.s) {
        itemsToMove.forEach(item => {
            item.y -= 2;
        });
    }
    if(keysPressed.d) {
        itemsToMove.forEach(item => {
            item.x -= 2;
        });
    }
}
gameLoop();

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'w': 
            keysPressed.w = true;
            break;
        case 'a':
            keysPressed.a = true;
            break;
        case 's':
            keysPressed.s = true;
            break;
        case 'd':
            keysPressed.d = true;
            break;
    }
});

window.addEventListener('keyup', function(e) {
    switch(e.key) {
        case 'w': 
            keysPressed.w = false;
            break;
        case 'a':
            keysPressed.a = false;
            break;
        case 's':
            keysPressed.s = false;
            break;
        case 'd':
            keysPressed.d = false;
            break;
    }
});
/*
function to detect collision between chest and player, call playerBuff to give the players a buff
*/
function detectCollisionChestPlayer(){

}

/*
Randomize and choose 1 of 4 predetermined buffs, and give it to the player
remove the buffs from possible buffs array. Buffs include speed buff, attack buff, defense buff, attack buff level 2
*/
function playerBuff(){
}


/*
function for when player is hit by enemy, 
calculate how much to decrease the players health by depending on the enemy's attack and player's defense
change the player health bar visual aswell
*/
function decreasePlayerHealth(player){
}

/*
function to detect collision with player and enemy
decrease player health as a result, 
give grace period for player to get away
i.e. 1 second invicibility to player
Enemy that hit the player has chance to apply a debuff to the player depending on the enemy,
skeltetons will have a chance to slow (decrease their speed),
ghosts can poison (decrease their health over time), etc.
*/
function detectCollisionPlayerEnemy(player){
}

/*
debuff function, if an enemy debuffs a player, apply the debuff to the player
debuff will expire after a certain amount of time
debuff include speed decrease, health decrease.
*/
function setDebuff(debuff){
}

/*
function to call when enemy is defeated to remove them from the screen.
should also decrement enemys left in the wave
should check if the wave is finished using the method in the wave class
*/
function enemyDefeated(enemy){

}
/*
called when enemy is hit by player sword,
determine how much to decrease enemy health by depending on the player's attack and enemy's defense
change the enemy health bar visual aswell
*/
function decreaseEnemyHealth(enemy){
}
/*
detect player sword collision with enemy, decrease enemy health as a result
*/
function detectCollisionPlayerSwordEnemy(enemy){
}

/*
playerswing sword function + animation
*/
function playerSwingSword(player){
}

/*
function detect collision with entity and walls
*/
function detectCollisionEntityWall(){
}

/*
add listeners for player movement, attacks, then call movePlayer1 or movePlayer2
*/
var character = document.querySelector(".character");
var x = 0;
var y = 0;
var speed = 2; //How fast the character moves in pixels per frame



// window.addEventListener("keydown", (e) => {
//     console.log(e.key);
//     switch (e.key) {
//       case "w":
//         movePlayer1("up");
//         break;
//       case "a":
//         movePlayer1("left");
//         break;
//       case "s":
//         movePlayer1("down");
//         break;
//       case "d":
//         movePlayer1("right");
//         break;
//     }
//   });




// /*
// move player1 with animation function
// */
// function movePlayer1(direction){
//     var pixelSize = parseInt(
//         getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
//      );
     
//         if (direction === "right") {x += speed;}
//         if (direction == "left") {x -= speed;}
//         if (direction == "down") {y += speed;}
//         if (direction == "up") {y -= speed;}
//         character.setAttribute("facing", direction);

     
//      if (x < -8) { x = -8; }
//      if (x > (screen.width-8)) { x = screen.width-8; }
//      if (y < 0) { y = 0; }
//      if (y > screen.height - 8) { y = screen.height - 8; }
     
//      character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
// }

/*
move player2 with animation function
*/
function movePlayer2(direction){
}

/*
function to detect which player is the closest to an enemy, used in routing algorithm
*/
function getClosestPlayer(enemy){
}

/*
routing algorithm for enemies that can't go through walls
find the closest player and move towards them avoiding wall collisions
*/
function findPathToPlayer(enemy){
}

/*
routing algorithm for enemies that can go through walls (ghosts)
find the closest player and mvoe towards them, ignore wall collisions
*/
function findPathToPlayerNoWalls(enemy){
}

/*
if time permits, boss will have special moves that players will have to avoid
this will be the function for that
*/