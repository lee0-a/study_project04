let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImg,rocketImg,bulletImg,enemyImg,gameOverImg;
let rocketImgX = canvas.width/2 - 29;
let rocketImgY = canvas.height - 58;

function loadImg(){
    backgroundImg = new Image();
    backgroundImg.src = 'img/bg.jpg';

    rocketImg = new Image();
    rocketImg.src = 'img/rocket.png';
}

let keysDown = {};
function setupKeyboardListener(){
    document.addEventListener('keydown', function(event){
        keysDown[event.key] = true;
        console.log(keysDown);
        
    })
    document.addEventListener('keyup', function(event){
        delete keysDown[event.key]
        console.log(keysDown);
    })
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
}

function render(){
    ctx.drawImage(backgroundImg, 0, 0,canvas.width, canvas.height );
    ctx.drawImage(rocketImg, rocketImgX, rocketImgY )
}

function main(){
    update()
    render()
    requestAnimationFrame(main)
}

loadImg()
main()
setupKeyboardListener()