/*
Course: SENG 513
Date October 25, 2023
Assignment 2
Name: Haider Tawfik
UCID: 30097912
*/

const p2ItemsToMove = [p2background, p2foreground, ...p2Boundaries, ...wave.p2enemies, spawnoffsetp2];
let curWave = 1;
function p2GameLoop() {
    window.requestAnimationFrame(p2GameLoop);
    if(curWave != wave.currentWave) {
        p2ItemsToMove.push(...wave.p2enemies);
        curWave++;
    }
    p2background.draw();
    player2.draw();
    p2Enemies.forEach(enemy => {
        enemy.moveTowardsPlayer(player2, p2Boundaries);
        enemy.draw();
    });
    p2foreground.draw();
    let canMove = true;
    player2.moving = false;
    if(p2KeysPressed.up) {
        player2.moving = true;
        player2.direction = 3;
        p2Boundaries.forEach(boundary => {
            boundary.y += 2;
            if(detectCollisionEntityWall(player2, boundary)) {
                canMove = false;
            }
            boundary.y -= 2;
        });
        if(canMove) {
            p2ItemsToMove.forEach(item => {
                item.y += 2;
            });
        }
    }
    if(p2KeysPressed.down) {
        player2.moving = true;
        player2.direction = 0;
        p2Boundaries.forEach(boundary => {
            boundary.y -= 2;
            if(detectCollisionEntityWall(player2, boundary)) {
                canMove = false;
            }
            boundary.y += 2;
        });
        if(canMove) {
            p2ItemsToMove.forEach(item => {
                item.y -= 2;
            });
        }
    }
    if(p2KeysPressed.left) {
        player2.moving = true;
        player2.direction = 1;
        p2Boundaries.forEach(boundary => {
            boundary.x += 2;
            if(detectCollisionEntityWall(player2, boundary)) {
                canMove = false;
            }
            boundary.x -= 2;
        });
        if(canMove) {
            p2ItemsToMove.forEach(item => {
                item.x += 2;
            });
        }
    }
    if(p2KeysPressed.right) {
        player2.direction = 2;
        player2.moving = true;
        p2Boundaries.forEach(boundary => {
            boundary.x -= 2;
            if(detectCollisionEntityWall(player2, boundary)) {
                canMove = false;
            }
            boundary.x += 2;
        });
        if(canMove) {
            p2ItemsToMove.forEach(item => {
                item.x -= 2;
            });
        }
    }
    if(p2KeysPressed.attack) {
        player2.swingSword();
        p2KeysPressed.attack = false;
        p2Enemies.forEach(enemy => {
            detectCollisionPlayerSwordEnemy(player2, enemy);
        });
    }
}
p2GameLoop();


window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowUp': 
            p2KeysPressed.up = true;
            break;
        case 'ArrowLeft':
            p2KeysPressed.left = true;
            break;
        case 'ArrowDown':
            p2KeysPressed.down = true;
            break;
        case 'ArrowRight':
            p2KeysPressed.right = true;
            break;
        case '/':
            p2KeysPressed.attack = true;
            break;
    }
});

window.addEventListener('keyup', function(e) {
    switch(e.key) {
        case 'ArrowUp': 
            p2KeysPressed.up = false;
            break;
        case 'ArrowLeft':
            p2KeysPressed.left = false;
            break;
        case 'ArrowDown':
            p2KeysPressed.down = false;
            break;
        case 'ArrowRight':
            p2KeysPressed.right = false;
            break;
        case '/':
            p2KeysPressed.attack = false;
            break;
    }
});