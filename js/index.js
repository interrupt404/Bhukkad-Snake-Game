// Constants and variables
let InputDir ={ x:0, y:0}
const foodSound= new Audio('../music/food.mp3')
const gameoverSound= new Audio('../music/gameover.mp3')
const moveSound= new Audio('../music/move.mp3')
const musicSound= new Audio('../music/music.mp3')
let speed=15;
let score=0;
let lastPaintTime=0;    // last time animated
let snakeArr=[          // snake array is body of snake, as he eats elements in snake array increases
    {x:13,y:15}         // +ve y here indicates in downward direction
]
let food ={x:5,y:6};

// Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime- lastPaintTime)/1000 < 1/speed){  // divide by 1000 cause it's in ms
        return;
        //we dont want fn to run if bracked value is less than 0.5sec
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    // if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // if snake bump against the wall 
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    // part 1: updating snake array and food 
        if(isCollide(snakeArr)){
            gameoverSound.play();
            musicSound.pause();
            InputDir={x:0,y:0};
            alert("Game Over, press any key to play again !");
            snakeArr=[{x:13,y:15}];
            musicSound.play();
            score=0;
            scorebox.innerHTML="Score: "+score;
        }

        // if snake ate the food, increment score and regenerate food 
        if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
            foodSound.play();
            score+=1;
            if(score>hiscoreval){
                hiscoreval=score;
                localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
                hiscorebox.innerHTML="Hi-Score: "+hiscoreval;

            }
            scorebox.innerHTML=`Score: ${score}`
            snakeArr.unshift({x: snakeArr[0].x + InputDir.x , y: snakeArr[0].y + InputDir.y});
            // unshift adds new element in start of snake body 

            let a=2;    // grid size
            let b=16;
            food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
        }

    // moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};   // need to create new element by "...",
                                            // otherwise each element point to same
    }
    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;


    // part 2: display snake and food 
        // display the snake 
        board.innerHTML="";
        snakeArr.forEach((e,index) =>{
        SnakeElement=document.createElement('div');
        SnakeElement.style.gridRowStart= e.y;   // places element at given position
        SnakeElement.style.gridColumnStart= e.x;
        if(index===0){
            SnakeElement.classList.add('head');
        }
        else {
            SnakeElement.classList.add('snake');
        }
        board.appendChild(SnakeElement); 

        // display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart= food.y;   
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement); 
    })
}









// main logic starts here
window.requestAnimationFrame(main);
/* requestAnimationFrame is better than setTimeout, read resources.txt */
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Hi-Score: "+hiscore;
}
window.addEventListener('keydown',e=>{
    InputDir={x:0, y:1};    // game start
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            InputDir.x= 0;
            InputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log('ArrowDown');
            InputDir.x= 0;
            InputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log('ArrowLeft');
            InputDir.x= -1;
            InputDir.y= 0;
            break;
        
        case "ArrowRight":
            console.log('ArrowRight');
            InputDir.x= 1;
            InputDir.y= 0;
            break;
        
        default:
            break;
    }
})