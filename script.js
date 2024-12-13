let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImg,rocketImg,bulletImg,enemyImg,gameOverImg;

let gameOver = false;

//우주선 좌표
let rocketImgX = canvas.width/2 - 29;
let rocketImgY = canvas.height - 58;

function loadImg(){
    backgroundImg = new Image();
    backgroundImg.src = 'img/bg.jpg';

    rocketImg = new Image();
    rocketImg.src = 'img/rocket.png';

    bulletImg = new Image();
    bulletImg.src = 'img/bulletImg.png'

    enemyImg = new Image();
    enemyImg.src = 'img/enemy.png'

    gameOverImg = new Image();
    gameOverImg.src = 'img/gameover.png'
}

let bulletList = [];
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = rocketImgX + 20;
        this.y = rocketImgY;

        bulletList.push(this)
    }
    this.update = function(){
        this.y -=7;
    }
}

function randomValue(min, max){
    let randomNum = Math.floor(Math.random()*(max - min + 1)) + min
    return randomNum;
}

let enemyList = [];
function enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0;
        this.x = randomValue(0, canvas.width - 58);

        enemyList.push(this)
    }
    this.update = function(){
        this.y += 2;

        if(this.y > canvas.height - 40){
            gameOver = true;
        }
    }
    
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new enemy();
        e.init();
        console.log('적군생성');
        
    }, 1000);
}

let keysDown = {};
function setupKeyboardListener(){
    document.addEventListener('keydown', function(event){
        keysDown[event.key] = true;
    })
    document.addEventListener('keyup', function(event){
        delete keysDown[event.key]

        if(event.keyCode == 32){
            createBullet();
        }
    })
}

function createBullet(){
    let b = new Bullet();
    b.init();
}

function update(){
    if('ArrowRight' in keysDown){
        rocketImgX +=5;
    }
    if('ArrowLeft' in keysDown){
        rocketImgX -=5;
    }
    if(rocketImgX <= 0){
        rocketImgX = 0;
    }
    if(rocketImgX >= canvas.width - 58){
        rocketImgX = canvas.width - 58;
    }

    for(let i=0;i<bulletList.length;i++){
        bulletList[i].update();
    }

    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(backgroundImg, 0, 0,canvas.width, canvas.height );
    ctx.drawImage(rocketImg, rocketImgX, rocketImgY );
    
    for(let i=0;i<bulletList.length;i++){
        ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y, 20, 20)
    } 

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y, 40, 40)
    }
}

function main(){
    if(!gameOver){
        update()
        render()
        requestAnimationFrame(main)
    }else{
        ctx.drawImage(gameOverImg, 0, 150, 400, 300)
    }
}

loadImg()
createEnemy();
main()
setupKeyboardListener()