var playing = false;
var score;
var step;
var trialsLeft;
var action; //used for setInterval


$(function(){
  //click on start reset button
$("#start-reset").click(function(){
  //we are playing
	if(playing == true){
      //reload page
		location.reload();
	}else{
    //we are not playing
		playing = true;//game initiated
    //set score to 0
		score = 0;
		 $("#points").html(score);
     //show trials left 
		 $("#life-ramaining").show();
     //hide game over box
       $('#game-over').hide();
		 trialsLeft = 3;
		 addHearts();
      //change button text to reset game
		 $("#start-reset").html('Reset Game')
     //start sending fruits
		   startAction();

		 


	}
});

//slice a fruit

$('#fruit1').mouseover(function(){
     score++;
      $('#points').html(score);
     new Audio("sounds/slice.mp3").play();

     clearInterval(action);

     $('#fruit1').hide('explode', {pieces: 4});
      

     
     setTimeout(startAction, 500);

     // startAction();

    

})


//fill trialLeft box with hearts
function addHearts(){
$("#life-ramaining").empty();
for(var i = 0 ; i < trialsLeft ; i++){
$("#life-ramaining").append("<img class='life' src = 'images/life.png'>");
		 }
}

function startAction(){
  //generate a fruit
$("#fruit1").show();
 randomImage();
 $("#fruit1").css({'left': Math.round(850*Math.random()), 'top': -50});
 //generate a random step
 step = 1+ Math.round(10*Math.random());
// Move fruit down by one
  action = setInterval(function(){
          //move fruit by one step
          $('#fruit1').css('top', $('#fruit1').position().top + step);
          //check if the fruit is too low
          if($('#fruit1').position().top > $('#fruit-box').height())
               //check if we have trials left
               if(trialsLeft > 1){
                //generate a fruit
                    $("#fruit1").show();
                    randomImage();//choose a random fruit
                    
               $("#fruit1").css({'left': Math.round(850*Math.random()), 'top': -50});
                 //reduce trials by one
                step = 1+ Math.round(5*Math.random());
                 //reduce trials by one
                trialsLeft--;
                //populate trialsLeft box
                addHearts();

               }else{ // game over
                    playing = false; //we are not playing anymore

                    $('#start-reset').html("Start Game");// change button to Start Game
                    $('#game-over').show();
                    $('#game-over').html("<h2>Game Over</h2><br><p>Your Score is: "+score+"</p>")
                    $('#life-ramaining').hide();
                     stopAction();
               }

      }, 10)

 
}
// generate a random fruit
function randomImage(){
var images = ['fruit1','fruit2','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11'];
var randomImage = Math.round(Math.random()*9);
$("#fruit1").attr('src','images/'+images[randomImage]+'.png')
}



function stopAction(){
clearInterval(action);
$("#fruit1").hide();

}


});



    $('#points').html(score)




