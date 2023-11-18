/*
Course: SENG 513
Date October 25, 2023
Assignment 2
Name: Haider Tawfik
UCID: 30097912
*/

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

const p2Image = new Image();
p2Image.src = 'assets/hero2.png';


const skeletonImage = new Image();
skeletonImage.src = 'assets/skeleton.png';

const slashImage = new Image();
slashImage.src = 'assets/swordSlash.png';

const ghostImage = new Image(); 
ghostImage.src = 'assets/ghost.png';

const foregroundImage = new Image();
foregroundImage.src = 'assets/foreground.png';

const offset = {
    x: -64 * 4,
    y: -64 * 4
}

const p2Offset = {
    x: -64 * 44,
    y: -64 * 26
}

const p1background = new Background(offset.x, offset.y, image, c1);
const p1foreground = new Background(offset.x, offset.y, foregroundImage, c1);

const p2background = new Background(p2Offset.x, p2Offset.y, image, c2);
const p2foreground = new Background(p2Offset.x, p2Offset.y, foregroundImage, c2);

const player1 = new Player(100, 10, 10, 12 * 32, 10 * 32, false, c1, p1Image, 0);
const player2 = new Player(100, 10, 10, 8 * 32, 6 * 32, false, c2, p2Image, 1);

const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    q: false
};


const p2KeysPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
    attack: false
}


const spawnoffsetp1 = new SpawnPointOffset(0, 0);
const spawnoffsetp2 = new SpawnPointOffset(0, 0);

const enemies = [];
const p2enemies = [];
const wave = new Wave (1, enemies, p2enemies);
wave.startNextWave();


const mapCollision = [];
for (let i = 0; i < collisions.length; i+= 60) {
    mapCollision.push(collisions.slice(i, i+60));
}


const boundaries = [];
for (let i = 0; i < mapCollision.length; i++) {
    for (let j = 0; j < mapCollision[i].length; j++) {
        if (mapCollision[i][j] === 1097) {
            boundaries.push(new Boundary(j*64 + offset.x, i*64 + offset.y, 64, 64));
        }
    }
}

const p2Boundaries = [];
const p2Enemies = wave.p2enemies;
for (let i = 0; i < mapCollision.length; i++) {
    for (let j = 0; j < mapCollision[i].length; j++) {
        if (mapCollision[i][j] === 1097) {
           p2Boundaries.push(new Boundary(j*64 + p2Offset.x, i*64 + p2Offset.y, 64, 64));
        }
    }
}


function detectCollisionEntityWall(entity1, wall){
    return(entity1.x + entity1.width >= wall.x &&
    entity1.x <= wall.x + wall.width &&
    entity1.y <= wall.y + wall.height &&
    entity1.y + entity1.height >= wall.y);
}

/*
function for when player is hit by enemy, 
calculate how much to decrease the players health by depending on the enemy's attack and player's defense
change the player health bar visual aswell
*/
function decreasePlayerHealth(player){
    player.health -= 10;
    const healthPercentage = player.health/100
    const healthBar = document.getElementById(`p${player.id}Hp`);
    const healthFill = healthBar.querySelector('.health-fill');

    if (healthFill) {
        healthFill.style.width = (healthPercentage * 100) + '%';
    }
}
function detectCollisionEntityEntity (player, enemy) {
    return(player.x + player.width >= enemy.x &&
    player.x <= enemy.x + enemy.width &&
    player.y <= enemy.y + enemy.height &&
    player.y + player.height >= enemy.y);
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
function detectCollisionPlayerEnemy(player, enemy){
    if (player.isInvincible) {
        return;
    } else {
        if (detectCollisionEntityEntity(player, enemy)) {
            decreasePlayerHealth(player);
            player.isInvincible = true;
            setTimeout(() => {
                player.isInvincible = false;
            }, 1000);
        }
        if(player.health === 0){
            window.location.href = `gameover.html?player=${player.id+1}`;
        }
    }
}

/*
function to call when enemy is defeated to remove them from the screen.
should also decrement enemys left in the wave
should check if the wave is finished using the method in the wave class
*/
function enemyDefeated(enemy){
    const index = enemy.group.indexOf(enemy);
    if (index !== -1) {
        enemy.group.splice(index, 1);
    }
    wave.enemiesLeft--;
    wave.isWaveOver();
    document.getElementById('enemiesLeftp0').innerHTML = `Enemies Left: ${wave.p1enemies.length}`;
    document.getElementById('enemiesLeftp1').innerHTML = `Enemies Left: ${wave.p2enemies.length}`;
}
/*
called when enemy is hit by player sword,
determine how much to decrease enemy health by depending on the player's attack and enemy's defense
change the enemy health bar visual aswell
*/
function decreaseEnemyHealth(enemy){
    enemy.health -= 10;
    if(enemy.health <= 0) {
        enemyDefeated(enemy);
    }
}
/*
detect player sword collision with enemy, decrease enemy health as a result
*/
function detectCollisionPlayerSwordEnemy(player, enemy) {
    let swordX = player.x;
    let swordY = player.y;
    let swordWidth = player.width;
    let swordHeight = player.height;

    if (player.direction === 3) {
        swordY-= player.height/2;
    } else if (player.direction === 0) {
        swordY += player.height/2;
    } else if (player.direction === 1) {
        swordX -= player.width * 1.2;
    } else if (player.direction === 2) {
        swordX += player.width * 1.2;

    }

    const enemyX = enemy.x;
    const enemyY = enemy.y;
    const enemyWidth = enemy.width;
    const enemyHeight = enemy.height;

    if (swordX < enemyX + enemyWidth && 
        swordX + swordWidth > enemyX && 
        swordY < enemyY + enemyHeight && 
        swordY + swordHeight > enemyY) {
        decreaseEnemyHealth(enemy);
    }
}
