First segment of code: <br>
---


```javascript
const itemsToMove = [p1background, p1foreground, ...boundaries, ...wave.p1enemies, spawnoffsetp1];

let currWave = 1;

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    if(currWave != wave.currentWave) {
        itemsToMove.push(...wave.p1enemies);
        currWave++;
    }
    p1background.draw();
    player1.draw();
    enemies.forEach(enemy => {
        enemy.moveTowardsPlayer(player1, boundaries);
        enemy.draw();
    });
    p1foreground.draw();
    let canMove = true;
    player1.moving = false;
    if(keysPressed.w) {
        player1.moving = true;
        player1.direction = 3;
        boundaries.forEach(boundary => {
            boundary.y += 2;
            if(detectCollisionEntityWall(player1, boundary)) {
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

```
This segment of code is responsible for player1s movement and playing out the animation loop <br>

```javascript
const itemsToMove = [p1background, p1foreground, ...boundaries, ...wave.p1enemies, spawnoffsetp1];
```
First, we create a list of items that need to be moved when the player presses the wasd keys. p1background corresponds to the image background, p1foreground corresponds to the foreground image (items the player can walk behind), the items in the boundaries list are items from the boundary class that define the location where the player cannot go, wave.p1enemies define the current enemies on the board for player1, spawnoffsetp1 is used to determine the offset of the location on where to spawn enemies when they need to be spawned in. <br>

```javascript
let currWave = 1;
```
Next, we will define a variable called currWave which inside the game loop function is used to check if the wave has advanced due to the final enemy being defeated, we do this by comparing it to the actual current wave, if they do not match the current wave has ended and we need to add wave.p1enemies to the itemsToMove list otherwise the new enemies added to the list when the wave progressed would not move correctly. <br>


```javascript
    p1background.draw();
    player1.draw();
    enemies.forEach(enemy => {
        enemy.moveTowardsPlayer(player1, boundaries);
        enemy.draw();
    });
    p1foreground.draw();
```

In the above segment of code, we draw the items in order of how they should appear in terms of layers, so the background first, then the player, then the enemies, then the foreground.

```javascript
if(keysPressed.w) {
    player1.moving = true;
    player1.direction = 3;
    boundaries.forEach(boundary => {
        boundary.y += 2;
        if(detectCollisionEntityWall(player1, boundary)) {
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
```
The segment of code shows what we do when a player presses the w key, similar things happen when the player presses the wasd so I will just focus on this. In another part of the code, there is a listener from when the w key is pressed, when it is pressed we set the value for keysPressed.w to true. If keysPressed.w is true we the property of moving in the player class to true to animate the movement to the next movement sprite in the sprite sheet. Then we set the direction to the corresponding direction in the sprite sheet for animation purposes. Then for each defined boundary, we increment the y value as if the player was going to move, then check if this movement would cause a collision if it does set canMove to false indicating this is not a valid move, we then change the boundaries y value back to it's original by subtracting two. Then check if the canMove variable is true or not, if it is we move each item in itemsToMove accordingly, if not due to it resulting in a collision occurring, we do not move anything. The rest of the movement keys follow this pattern.

```javascript
if(keysPressed.q) {
    player1.swingSword();
    keysPressed.q = false;
    enemies.forEach(enemy => {
        detectCollisionPlayerSwordEnemy(player1, enemy);
    });
}
```
Lastly, we check if player 1's attack key is pressed, if so we call player1.swingSword() for the animation to play, and check if this swing would have successfully collided with any enemy on their side of the map by calling detectCollisionPlayerSwordEnemy for each enemy on player 1's side of the map. <br>


Second segment of code: 
---

```javascript
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
```
This segment of code is a simple algorithm for enemies attempting to reach the player. For this segment of code I had CoPilot assist me in writing it. 

```javascript
const speed = 1; 
```
First, we define a constant called speed to be 1, originally intended to increase as the waves increased, however, this was not implemented due to time constraints. We define speed to be 1 as the player moves at a constant rate of 2 in terms of x, y positioning, this way the enemy will not be as fast as the player.<br>

This section was written by copilot:
```javascript
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
```
In the section of code we define a target value to the player's x y coordinates, then we determine if moving towards the player in terms of x or y by 1 will get us closer to the player, or if we should not move due to being in the same x or y coordinate as the player.

```javascript
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
```

We then check if moving to these new values will cause a collision by creating a new object with the properties that the enemy would have if they were to make this movement. First we check if the enemy is able to move through walls, if not we check if this movement will cause a collision, and if it does, we make it so the enemy cannot move.

```javascript
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
    } 
```
If the enemy can successfully move without colliding with the wall we change the x and y coordinates to the new ones (either incremented or decremented by one). Then change the direction property for animation purposes so that the image is facing the correct direction based on where the enemy is moving. <br>

Copilot assisted in the remaining segments
```javascript
else {
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
    }
```
Here if the enemy could not make a move it was due to either the new x AND new y value causing a collision, but we should also check if changing x OR y would result in the enemy moving closer to the player. First we check if changing the x value would cause a collision by changing the y value in the potential collision object to the current y value of the enemy, then check for collisions. If the enemy can move we will update the x value accordingly. The same can be said for the following code segment, except it checks if we can move in terms of y value instead.

```javascript
else {
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
```


```javascript
this.moving = canMove;   

detectCollisionPlayerEnemy(player, this);
```
Here we set this.moving = canMove for animation purposes, and we check if the updated position has caused the player to collide with the enemy.

Third code segment
---
```javascript
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
```

This segment is responsible for spawning the enemies for player1 based on the current wave. The spawning function for player two follows very similarly, except for changing some values.

```javascript
if(this.currentWave === 1) {
    const spawnPoints = [];
    for (let i = 0; i < spawnpointswave1p1.length; i+= 60) {
        spawnPoints.push(spawnpointswave1p1.slice(i, i+60));
    }
```
In this first if statement we check what the current wave is, then define an array list of spawn points. We then loop through an array called spawnpointswave1p1 which is defined in the mapLocations javascript file in order to find where the spawn points should be based on the map tiles. Then we loop through the entire array list of spawnpointswave1p1 and increment the variable i by 60 each time, since the map width is 60 tiles wide. Then by slicing spawnpointswave1p1 at i to i+60 and pushing the array into spawPoints, spawnPoints will contain a 2D representation of the map where each row corresponds to the row in the original tiled map, and each column corresponds to the original column in the tiled map.

```javascript
for (let i = 0; i < spawnPoints.length; i++) {
    for (let j = 0; j < spawnPoints[i].length; j++) {
        if (spawnPoints[i][j] === 2122) {
            this.p1enemies.push(new Enemy(30, 30, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, skeletonImage, c1, this.p1enemies, false));
        }
    }
}
```

Then we loop through each row and column in the spawnPoints array list, and check if the value at that row and column is 2122 which means that in the tiled map it is a spawn point tile. So if at a row and column we find the value 2122 we add a new enemy to player1's array list of enemies. However in order to ensure it spawns in the correct position some adjustments must be to the enemy's x, y coordinates.

```javascript
new Enemy(30, 30, 10, 10, j*64 + offset.x + spawnoffsetp1.x, i*64 + offset.y + spawnoffsetp1.y, skeletonImage, c1, this.p1enemies, false)
```

First, we start off by setting the enemy's max hp to 30, current hp to 30, and attack and defense to 10 (not yet used due to time constraints). Then we set the enemies x coordinate based on the column in which we found a spawn point in the array list and multiply it by 64, since each tile is 16x16 pixels, and the image is zoomed in by 400%, therefore, 16x4 = 64. We then add an offset called offset.x that was used to offset the background image when the game first started to have the player1 roughly in the center of the screen, and then we add spawnoffsetp1.x which is determined in code segment 1 based on the player moving left and right. The same is done for the enemy y value (i*64 + offset.y + spawnoffsetp1.y) except in terms of y. Then we define the image to be used, in this case, it is skeletonImage, then context c1 which is for player one, the list the enemy belongs to (this.p1enemies) in order to make it simpler to remove the enemy from the list once they are defeated, and if the enemy can move through walls (in this case false). <br>

```javascript
else if(this.currentWave == 2) {
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
```
Waves two and three follow a similar premise, except in this case we define a counter and use it to spawn different types of enemies

```javascript
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
```

Here every second enemy is a ghost spawned is a ghost, to do this I implemented a counter and for every enemy spawned we increment the counter, and when spawning a new enemy we check if the counter is divisible by two, if it is we spawn a ghost enemy instead with fewer health points, and setting its ability to move through walls to true. Wave 3 does something very similar except every third enemy is a ghost and enemies have increased max hp.
