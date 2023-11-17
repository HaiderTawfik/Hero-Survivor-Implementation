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
    constructor(health, attack, defense, x, y, isInvincible, context, image, id){
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.x = x;
        this.y = y;
        this.isInvincible = isInvincible;
        this.context = context;
        this.image = image;
        this.width = this.image.width/2;
        this.height = this.image.height/2;
        this.animationFrame = 0;
        this.elapsed = 0;
        this.moving = false;
        this.direction = 0;
        this.id = id;
    }   
    //function to move player
    move(x, y){
        this.x = x;
        this.y = y;
    }
    //function to swing sword
    swingSword() {
        this.context.save();
        if(this.direction === 3) {
            this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.context.rotate(-Math.PI / 2);
            this.context.drawImage(
                slashImage,
                0,
                0,
                slashImage.width / 6,
                slashImage.height,
                8,
                -100,
                this.width,
                this.height * 3
            );
        } else if (this.direction === 0) {
            this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.context.rotate(Math.PI / 2);
            this.context.drawImage(
                slashImage,
                0,
                0,
                slashImage.width / 6,
                slashImage.height,
                -8,
                -100,
                this.width,
                this.height * 3
            );
        } else if (this.direction === 1) {
            this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.context.rotate(Math.PI);
            this.context.drawImage(
                slashImage,
                0,
                0,
                slashImage.width / 6,
                slashImage.height,
                -this.width * 0.75,
                -this.height * 0.65,
                this.width * 2,
                this.height
            );
        } else if (this.direction === 2) {
            this.context.drawImage(
                slashImage,
                0,
                0,
                slashImage.width / 6,
                slashImage.height,
                this.x,
                this.y + this.height / 16,
                this.width * 2,
                this.height
            );
        }
        this.context.restore();
    }
    
    
    draw() {
        this.context.drawImage(
            this.image,
            this.animationFrame * this.image.width/3,
            this.direction * this.image.height/4 + 0.1,
            this.image.width/3,
            this.image.height/4, 
            this.x, 
            this.y,
            this.image.width/2,
            this.image.height/2, 
        );
        if(this.moving) {
            this.elapsed++;
            if(this.elapsed % 10 !== 0) {
                return;
            }
            if(this.animationFrame < 2)
                this.animationFrame++;
            else
                this.animationFrame = 0;
        } 
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



/*
Intialize player objects
*/

/*
Intialize possible buff's array
*/

/*
enemy class, include things such as health, attack, defense, etc, and current x, y position.
*/
class Enemy{
    constructor(maxHealth, health, attack, defense, x, y, image, context, group){
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.x = x;
        this.y = y;
        this.image = image;
        this.context = context;
        this.width = this.image.width/2;
        this.height = this.image.height/2;
        this.direction = 0;
        this.animationFrame = 0;
        this.moving = true;
        this.elapsed = 0;
        this.maxHealth = maxHealth;
        this.group = group;
    }
    //function to move enemy
    moveTowardsPlayer(player, boundaries) {
        const speed = 1; 
    
        let targetX = player.x;
        let targetY = player.y;
        if (this.x < player.x) {
            targetX = Math.min(targetX, this.x + speed);
        } else if (this.x > player.x) {
            targetX = Math.max(targetX, this.x - speed);
        }
        if (this.y < player.y) {
            targetY = Math.min(targetY, this.y + speed);
        } else if (this.y > player.y) {
            targetY = Math.max(targetY, this.y - speed);
        }
        const potentialCollision = {
            x: targetX,
            y: targetY,
            width: this.image.width/2,
            height: this.image.height/2
        };
    
        let canMove = true;
    
        boundaries.forEach(boundary => {
            if (detectCollisionEntityWall(potentialCollision, boundary)) {
                canMove = false;
            }
        });
    
        if (canMove) {
            this.x = targetX;
            this.y = targetY;
            if (this.x < player.x) {
                this.direction = 2;
            } else if (this.x > player.x) {
                this.direction = 1;
            } else if(this.y > player.y) {
                this.direction = 3;
            } else if (this.y < player.y) {
                this.direction = 0;
            }
        } else {
            potentialCollision.y = this.y;
            canMove = true;
    
            boundaries.forEach(boundary => {
                if (detectCollisionEntityWall(potentialCollision, boundary)) {
                    canMove = false;
                }
            });
    
            if (canMove) {
                this.x = targetX;
                if(this.x < player.x) {
                    this.direction = 2;
                } else {
                    this.direction = 1;
                }
            } else {
                potentialCollision.x = this.x;
                potentialCollision.y = targetY;
                canMove = true;
    
                boundaries.forEach(boundary => {
                    if (detectCollisionEntityWall(potentialCollision, boundary)) {
                        canMove = false;
                    }
                });
    
                if (canMove) {
                    this.y = targetY;
                    if(this.y > player.y) {
                        this.direction = 3;
                    } else {
                        this.direction = 0;
                    }
                }
            } 
        }
        this.moving = canMove;   

        detectCollisionPlayerEnemy(player, this);
    }
    draw() {
        this.context.drawImage(
            this.image,
            this.animationFrame * this.image.width/3,
            this.direction * this.image.height/4 + 0.3,
            this.image.width/3,
            this.image.height/4, 
            this.x, 
            this.y,
            this.image.width/2,
            this.image.height/2, 
        );
        // c2.drawImage(
        //     this.image,
        //     this.animationFrame * this.image.width/3,
        //     this.direction * this.image.height/4 + 0.3,
        //     this.image.width/3,
        //     this.image.height/4, 
        //     this.x, 
        //     this.y,
        //     this.image.width/2,
        //     this.image.height/2, 
        // );
        

        const healthBarWidth = this.width* (this.maxHealth / 50); 
        const healthBarHeight = 5; 
        const healthBarX = this.x + (this.image.width/2 - healthBarWidth) / 2;
        const healthBarY = this.y - 10; 
        const healthPercentage = this.health / this.maxHealth;
        this.context.fillStyle = 'red';
        this.context.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        this.context.fillStyle = 'green';
        this.context.fillRect(healthBarX, healthBarY, healthBarWidth * healthPercentage, healthBarHeight);
        this.context.strokeStyle = 'black';
        this.context.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        
        if(this.moving) {
            this.elapsed++;
            if(this.elapsed % 10 !== 0) {
                return;
            }
            if(this.animationFrame < 2)
                this.animationFrame++;
            else
                this.animationFrame = 0;
        }
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
// const canvasp2 = document.getElementById('canvasp2');
// const c2 = canvasp2.getContext('2d');

canvasp1.width = 700;
canvasp1.height = 700;


// canvasp2.width = 700;
// canvasp2.height = 700;


const image = new Image();
image.src = 'assets/map.png';

const p1Image = new Image();
p1Image.src = 'assets/hero.png';

// const p2Image = new Image();
// p2Image.src = 'assets/hero2.png';

const skeletonImage = new Image();
skeletonImage.src = 'assets/skeleton.png';

const slashImage = new Image();
slashImage.src = 'assets/swordSlash.png';


const offset = {
    x: -64 * 2,
    y: -64 * 2
}
const p1background = new Background(offset.x, offset.y, image, c1);
// const p2background = new Background(offset.x, offset.y, image, c2);
const player1 = new Player(100, 10, 10, 8 * 32, 6 * 32, false, c1, p1Image, 0);
// const player2 = new Player(100, 10, 10, 8 * 32, 6 * 32, false, c2, p2Image);
// const testEnemy = new Enemy(100, 10, 10, 4 * 32, 10 * 32, skeletonImage, c1);
// const e = new Enemy(100, 10, 10, 2 * 32, 2 * 32, skeletonImage, c1);
const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    q: false
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

const enemies = [];
// temp
for(let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * 10) * 64 + offset.x;
    const y = Math.floor(Math.random() * 10) * 64 + offset.y
    enemies.push(new Enemy(30, 30, 10, 10, x, y, skeletonImage, c1, enemies));
}
// enemies.push(e);
// enemies.push(testEnemy);
// const testBoundary = new Boundary(128, 128, 64, 64);
const itemsToMove = [p1background, ...boundaries, ...enemies];

/*
function detect collision with entity and walls
*/
function detectCollisionEntityWall(entity1, wall){
    return(entity1.x + entity1.width >= wall.x &&
    entity1.x <= wall.x + wall.width &&
    entity1.y <= wall.y + wall.height &&
    entity1.y + entity1.height >= wall.y);
}
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    p1background.draw();
    // testBoundary.draw();
    // p2background.draw()
    player1.draw();
    // player2.draw();
    enemies.forEach(enemy => {
        enemy.moveTowardsPlayer(player1, boundaries);
        enemy.draw();
    });
    // testEnemy.moveTowardsPlayer(player1, boundaries);
    // e.moveTowardsPlayer(player1, boundaries);
    // if(testEnemy.x< player1.x) {
    //     testEnemy.x += 1;
    // } else if (testEnemy.x > player1.x) {
    //     testEnemy.x -= 1;
    // } else if (testEnemy.y < player1.y) {
    //     testEnemy.y += 1;
    // } else if (testEnemy.y > player1.y) {
    //     testEnemy.y -= 1;
    // }
    // testEnemy.draw();
    // e.draw();
    // console.log("Enemy:", testEnemy.x, testEnemy.y);
    // console.log("Background", player1.x, p1background.y)
    // console.log("Player:", player1.health);

    boundaries.forEach(boundary => {
        boundary.draw();
    });
    // c2.drawImage(image, -(135*16), -(45*16));
    // if(detectCollisionEntityWall(player1, testBoundary)) {
    //     console.log('collision');
    // }
    let canMove = true;
    player1.moving = false;
    if(keysPressed.w) {
        player1.moving = true;
        player1.direction = 3;
        boundaries.forEach(boundary => {
            boundary.y += 2;
            if(detectCollisionEntityWall(player1, boundary)) {
                // console.log('collision');
                canMove = false;
            }
            boundary.y -= 2;
        });
        if(canMove) {
            itemsToMove.forEach(item => {
                item.y += 2;
            });
        }
    }
    if(keysPressed.s) {
        player1.moving = true;
        player1.direction = 0;
        boundaries.forEach(boundary => {
            boundary.y -= 2;
            if(detectCollisionEntityWall(player1, boundary)) {
                // console.log('collision');
                canMove = false;
            }
            boundary.y += 2;
        });
        if(canMove) {
            itemsToMove.forEach(item => {
                item.y -= 2;
            });
        }
    }
    if(keysPressed.a) {
        player1.moving = true;
        player1.direction = 1;
        boundaries.forEach(boundary => {
            boundary.x += 2;
            if(detectCollisionEntityWall(player1, boundary)) {
                // console.log('collision');
                canMove = false;
            }
            boundary.x -= 2;
        });
        if(canMove) {
            itemsToMove.forEach(item => {
                item.x += 2;
            });
        }
    }
    if(keysPressed.d) {
        player1.direction = 2;
        player1.moving = true;
        boundaries.forEach(boundary => {
            boundary.x -= 2;
            if(detectCollisionEntityWall(player1, boundary)) {
                // console.log('collision');
                canMove = false;
            }
            boundary.x += 2;
        });
        if(canMove) {
            itemsToMove.forEach(item => {
                item.x -= 2;
            });
        }
    }
    if(keysPressed.q) {
        player1.swingSword();
        keysPressed.q = false;
        enemies.forEach(enemy => {
            detectCollisionPlayerSwordEnemy(player1, enemy);
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
        case 'q':
            keysPressed.q = true;
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
        case 'q':
            keysPressed.q = false;
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
            console.log(player.health);
            setTimeout(() => {
                player.isInvincible = false;
            }, 1000);
        }
    }
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
    const index = enemy.group.indexOf(enemy);
    if (index !== -1) {
        enemy.group.splice(index, 1);
    }
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