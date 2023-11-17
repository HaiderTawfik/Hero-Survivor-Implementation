const canvasp2 = document.getElementById('canvasp2');
const c2 = canvasp2.getContext('2d');

canvasp2.width = 700;
canvasp2.height = 700;

const p2Image = new Image();
p2Image.src = 'assets/hero2.png';

const p2Offset = {
    x: -64 * 44,
    y: -64 * 26
}

const p2background = new Background(p2Offset.x, p2Offset.y, image, c2);
const player2 = new Player(100, 10, 10, 8 * 32, 6 * 32, false, c2, p2Image, 1);

const p2KeysPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
    attack: false
}

const p2Boundaries = [];
const p2Enemies = [];
for (let i = 0; i < mapCollision.length; i++) {
    for (let j = 0; j < mapCollision[i].length; j++) {
        if (mapCollision[i][j] === 1097) {
           p2Boundaries.push(new Boundary(j*64 + p2Offset.x, i*64 + p2Offset.y, 64, 64));
        }
    }
}

const testEnemy = new Enemy(30, 30, 30, 20, 64, 64, skeletonImage, c2, p2Enemies);
p2Enemies.push(testEnemy);
const p2ItemsToMove = [p2background, ...p2Boundaries, ...p2Enemies];

function p2GameLoop() {
    window.requestAnimationFrame(p2GameLoop);
    p2background.draw();
    player2.draw();
    p2Enemies.forEach(enemy => {
        enemy.moveTowardsPlayer(player2, p2Boundaries);
        enemy.draw();
    });

    // p2Boundaries.forEach(boundary => {
    //     boundary.draw();
    // });

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
                // console.log('collision');
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
                // console.log('collision');
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