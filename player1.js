/*
Course: SENG 513
Date October 25, 2023
Assignment 2
Name: Haider Tawfik
UCID: 30097912
*/


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

