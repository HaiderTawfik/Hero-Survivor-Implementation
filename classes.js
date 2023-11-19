/*
Course: SENG 513
Date: November 18, 2023
Assignment 3
Name: Haider Tawfik
UCID: 30097912
*/

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
enemy class, include things such as health, attack, defense, etc, and current x, y position.
*/
class Enemy{
    constructor(maxHealth, health, attack, defense, x, y, image, context, group, moveThroughWalls){
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
        this.moveThroughWalls = moveThroughWalls;
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
            if(!this.moveThroughWalls) {
            boundaries.forEach(boundary => {
                if (detectCollisionEntityWall(potentialCollision, boundary)) {
                    canMove = false;
                }
            });
        }
    
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

class SpawnPoints {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64
        this.height = 64;
    }

}

class SpawnPointOffset {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
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

/*
wave class, include things such as current wave, enemies to spawn, enemies left, and chest locations to spawn, and a function to spawn the enemies
*/
class Wave{
    constructor(currentWave, p1enemies, p2enemies){
        this.currentWave = currentWave;
        this.p1enemies = p1enemies;
        this.p2enemies = p2enemies;
        this.enemiesLeft = p1enemies.length + p2enemies.length;
    }
    //function to spawn enemies
    p1spawnEnemies(){
        if(this.currentWave === 1) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave1p1.length; i+= 60) {
                spawnPoints.push(spawnpointswave1p1.slice(i, i+60));
            }
            for (let i = 0; i < spawnPoints.length; i++) {
                for (let j = 0; j < spawnPoints[i].length; j++) {
                    if (spawnPoints[i][j] === 2122) {
                        this.p1enemies.push(new Enemy(30, 30, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, skeletonImage, c1, this.p1enemies, false));
                    }
                }
            }
        } else if(this.currentWave == 2) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave2p1.length; i+= 60) {
                spawnPoints.push(spawnpointswave2p1.slice(i, i+60));
            }
            let counter = 0;
            for (let i = 0; i < spawnPoints.length; i++) {
                for (let j = 0; j < spawnPoints[i].length; j++) {
                    if (spawnPoints[i][j] === 2122) {
                        if(counter % 2 === 0) {
                            this.p1enemies.push(new Enemy(20, 20, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, ghostImage, c1, this.p1enemies, true));
                        } else {
                            this.p1enemies.push(new Enemy(30, 30, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, skeletonImage, c1, this.p1enemies, false));
                        }
                    }
                    counter ++;
                }
            }
        }
        else if(this.currentWave === 3) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave3p1.length; i+= 60) {
                spawnPoints.push(spawnpointswave3p1.slice(i, i+60));
            }
            let counter = 0;
            for (let i = 0; i < spawnPoints.length; i++) {
                for (let j = 0; j < spawnPoints[i].length; j++) {
                    if (spawnPoints[i][j] === 2122) {
                        if(counter % 3 === 0){
                            this.p1enemies.push(new Enemy(30, 30, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, ghostImage, c1, this.p1enemies, true));
                        } else {
                            this.p1enemies.push(new Enemy(50, 50, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, skeletonImage, c1, this.p1enemies, false));
                        }
                        counter++;
                    }
                }
            }
        }
        this.enemiesLeft += this.p1enemies.length;
    }
    p2spawnEnemies(){
        if(this.currentWave === 1) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave1p2.length; i+= 60) {
                spawnPoints.push(spawnpointswave1p2.slice(i, i+60));
            }
            for(let i = 0; i < spawnPoints.length; i++) {
                for(let j = 0; j < spawnPoints[i].length; j++) {
                    if(spawnPoints[i][j] === 2122) {
                        this.p2enemies.push(new Enemy(30, 30, 10, 10, j*64 + -64 * 44 + spawnoffsetp2.x, i*64 + -64 * 26 + spawnoffsetp2.y, skeletonImage, c2, this.p2enemies, false));
                    }
                }
            }
        }  else if(this.currentWave === 2) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave2p2.length; i+= 60) {
                spawnPoints.push(spawnpointswave2p2.slice(i, i+60));
            }
            let counter = 0;
            for(let i = 0; i < spawnPoints.length; i++) {
                for(let j = 0; j < spawnPoints[i].length; j++) {
                    if(spawnPoints[i][j] === 2122) {
                        if(counter % 2 === 0) {
                            this.p2enemies.push(new Enemy(20, 20, 10, 10, j*64 + -64 * 44 + spawnoffsetp2.x, i*64 + -64 * 26 + spawnoffsetp2.y, ghostImage, c2, this.p2enemies, true));
                        } else {
                            this.p2enemies.push(new Enemy(30, 30, 10, 10, j*64 + -64 * 44 + spawnoffsetp2.x, i*64 + -64 * 26 + spawnoffsetp2.y, skeletonImage, c2, this.p2enemies, false));
                        }
                        counter ++;
                    }
                }
            }
        }else if (this.currentWave === 3) {
            const spawnPoints = [];
            for (let i = 0; i < spawnpointswave3p2.length; i+= 60) {
                spawnPoints.push(spawnpointswave3p2.slice(i, i+60));
            }
            let counter = 0;
            for(let i = 0; i < spawnPoints.length; i++) {
                for(let j = 0; j < spawnPoints[i].length; j++) {
                    if(spawnPoints[i][j] === 2122) {
                        if(counter % 3 === 0){
                            this.p2enemies.push(new Enemy(20, 20, 10, 10, j*64 + -64 * 44 + spawnoffsetp2.x, i*64 + -64 * 26 + spawnoffsetp2.y, ghostImage, c2, this.p2enemies, true));
                        } else {
                            this.p2enemies.push(new Enemy(50, 50, 10, 10, j*64 + -64 * 44 + spawnoffsetp2.x, i*64 + -64 * 26 + spawnoffsetp2.y, skeletonImage, c2, this.p2enemies, false));
                        }
                        counter++;
                    }
                }
            }
        }
        this.enemiesLeft += this.p2enemies.length;
    }

    //function to check if wave is over (if enemies left is 0), 
    // and to check if game is won (wave is 3 and enemies left is 0)
    // increments the current wave if game is not over
    // calls startNextWave with enemiesToSpawn, enemiesLeft(length of array enemiestToSpawn), and chestLocations
    isWaveOver(){
        console.log(this.enemiesLeft)
        if(this.enemiesLeft === 0){
            if(this.currentWave === 3){
                window.location.href = 'victory.html';
            } else {
                this.currentWave++;
                console.log('wave over' + this.currentWave)
                this.startNextWave();
            }
        }
    }
    //function to start the next wave
    startNextWave(){
        this.p1spawnEnemies();
        this.p2spawnEnemies();
        document.getElementById('wave').innerHTML = `Wave: ${this.currentWave}`;  
        document.getElementById('enemiesLeftp0').innerHTML = `Enemies Left: ${wave.p1enemies.length}`;
        document.getElementById('enemiesLeftp1').innerHTML = `Enemies Left: ${wave.p2enemies.length}`; 
    }
}
