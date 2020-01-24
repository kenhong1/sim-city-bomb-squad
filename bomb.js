console.log('locked and loaded!');

// ***state variables*** 

var startingTime = 30; 
var remainingTime = 30; 
var gameOver = false; 
var wiresToCut = [];

// ***Timer Variables*** 

var delay = "null"; 
var timer = "null"; 
 
var wiresCut = {
    blue: false, 
    green: false,
    red: false, 
    white: false, 
    yellow: false, 
}; 


var endGame = function(win) {
    console.log('ending the game')
    clearTimeout(delay); 
    clearInterval(timer); 
    gameOver = true; 
    if (win) {
        // we won! 
        console.log("you saved the city scrub.")  
        document.querySelector(".timerbox").classList.add("green");
        document.querySelector(".timerbox").classList.remove("red");
    }
    else{ 
        console.log("boom")
        document.body.classList.add("exploded")
        document.body.classList.remove("unexploded")
    }
    
    }
    




// ***Timer Starting*** 
// note: cannot have it passed 0. it must end on zero and deliver an outcome. 

var updateClock = function(){
  remainingTime--; 
  if (remainingTime<= 0){
      endGame(false); 
  }
  document.querySelector(".timerbox p").textContent = "00:" + remainingTime; 
}


var cutWire = function(){
    //check if this wire is already cut and if the game is over 
    if (!wiresCut[this.id]&& !gameOver){
        this.src = "img/cut-"+this.id+"-wire.png"; 
        wiresCut[this.id]= true;  
    //check if the wire is correct below
    var wireIndex = wiresToCut.indexOf(this.id); 
    if (wireIndex > -1){
        // correct wire below
        console.log(this.id+"was correct"); 
        wiresToCut.splice(wireIndex, 1);
        if (wiresToCut.length===0){
            endGame(true);
        }
            
    } else{
        //incorect wire below
        console.log(this.id+"was incorrect!"); 
        delay = setTimeout(function() {endGame(false);}, 750) }
  }
}


// ***Init Game*** 
var initGame=function(){
    wiresToCut.length=0; 
    remainingTime = startingTime; 
    for (var wire in wiresCut){
        var rand = Math.random(); 
        if (rand > 0.5) {
            wiresToCut.push(wire)

        }
    }

    console.log(wiresToCut);

timer = setInterval(updateClock,1000);

}

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded!");
    for (var wire in wiresCut){
        document.getElementById(wire).addEventListener("click", cutWire)
    }

    initGame(); 

})
