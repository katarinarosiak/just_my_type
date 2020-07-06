$(document).ready(function () {


	//key id code 
	let keys = {
		//uppercase
		"~": "#k126", "!": "#k33", "@": "#k64","#": "#k35","$": "#k36","%": "#k37","^": "#k94","&": "#k38",
		"*": "#k42","(": "#k40",")": "#k41","_": "#k95","+": "#k43","Q": "#k81","W": "#k87","E": "#k69","R": "#k82",
		"T": "k#84","Y": "#k89","U": "#k85","I": "#k73","O": "#k79","P": "#k80","{": "#k123","}": "#k125","|": "#k124","A": "k#65",
		"S": "k#83","D": "#k68","F": "#k70","G": "#k71","H": "#k72","J": "#k74","K": "#k75","L": "#k76",":": "#k186",' " ': "#k222",
		"Z": "#k90","X": "#k88","C": "#k67","V": "#k86","B": "#k66","N": "#k78","M": "#k77","<": "#k60",">":"#k62", "?": "#k63",
		//lowercase
		"`": "#k96","1": "#k49","2": "#k50","3": "#k51","4": "#k52","5": "#k53","6": "#k54",
		"7": "#k55","8": "#k56","9": "#k57","0": "#k48","-": "#k45","=": "#k61","q": "#k113",
		"w": "#k119", "e": "#k101","r": "#k114","t": "#k116","y": "#k121","u": "#k117","i": "#k105",
		"o": "#k111", "p": "#k112","[": "#k91","]": "#k93"," \ ": "#k92","a": "#k97", "s": "#k115",
		"d": "#k100","f": "#k102","g": "#k103","h": "#k104","j": "#k106", "k": "#k107", "l": "#k108",
		";": "#k59","'": "#k39","z": "#k122", "x": "#k120","c": "#k99","v": "#k118","b": "#k98",
		"n": "#k110","m": "#k109",",": "#k44",".": "#k46","/": "#k47", " ": "#k32"
	};
	//------------KEYBOARD AND SOUND -----------
	//upload keysound 
	let audio = new Audio('keySound.mp3');
	audio.muted = false;

	//key sound plays when buttons clicked 
	$('.buttonKey').click(function () {
		audio.play();
	});

	$('.button').click(function () {
		audio.play();
	});



	//upload winner sound 
	let winner = new Audio('winner.mp3');

	//change the keyboard when "shift" clicked 
	//keydown - show uppercase
	$(document).on('keydown', function(event) {
		if(event.keyCode === 16){
			$('#keyboardLower').addClass('hide');
			$('#keyboardUpper').removeClass('hide');
		}
	});
	//keyup show lowercase
	$(document).on('keyup', function(event) {
		if(event.keyCode === 16){
			$('#keyboardUpper').addClass('hide');
			$('#keyboardLower').removeClass('hide');
			
		}
	});

	//-------------MENU--------------
	//show menu whe  clicked on setting icon
		$('.fas').click(function (){
			$('.menu').toggleClass('visible');
		});
			const $menu = $('.menu');
			$(document).mouseup(function (e){
				if (!$menu.is(e.target) // if the target of the click isn't the container...
				&& $menu.has(e.target).length === 0) // ... nor a descendant of the container
					{
						$menu.removeClass('visible');
				};
			});
		
		// $(document).mouseup(e => {
		// 	if (!('$menu').is(e.target) // if the target of the click isn't the container...
		// 	&& ('$menu').has(e.target).length === 0) // ... nor a descendant of the container
		// 	{
		// 	  ('$menu').removeClass('visible');
		//    }
		//   });






	//turn off/on the sound                       /////DOESNT WORK
		$('#soundOff').click(function(){	
			$('#soundOff').toggle('audio', function(){
				audio.muted = true;
			});
			$('#soundOff').toggle('wrong', function(){
				wrong.muted = true;
			});
		});

	//change the game level 
	$('#levelEasy').click(function(){
		gameLevel = textEasy;
	});
	$('#levelMedium').click(function(){
		gameLevel = textMedium;
	});
	$('#levelHard').click(function(){
		gameLevel = textHard;
	});

	/////////////////////////////////////////

	//texts for the game according to level 
	let textEasy = "Grfkd jkld dfg jkdf gkld fgjl dfjg lkj dfg lkj gjf"
	let textMedium = "jie fiw  rar fhaeei fhla aerihf ncir eirhf nrfuei"
	let textHard = "Beasts of the Southern Wild is a 2012 American drama"

	//variables
	let gameLevel = textEasy; //default level
	let currentInstruction = "<p id='instructions'>Begin to type</p>"
	let currentLetter;
	let currentKey;
	let index = 0;
	let textToPrint;
	let totalTime = 0;


	//////////////////////////////////

							//START THE GAME  

	
	$('#start').click(function(){
		
		//reset 
		reset();

		//set timer 	
		let date = setInterval(myTimer, 1000);
		function myTimer() {
			totalTime++;
		}
		

		//focus on text area
		$(".userInput").focus();

		//highlight chosen letter 
		textToPrint = highlightLetter(index, gameLevel);

		//remove the text in the instrtruction box from the screen
		clear('#instructions');

		//if not clean the area first
		clear('.textParagraph');

		//print new instruction text on the screen
		$('.instructions').append(currentInstruction);
		
		//determine what is the first letter 
		currentLetter = gameLevel[index];	

		//add paragrpah class to the printed text: '.textParagraph'
		$('.text').prepend('<p class="textParagraph">');

		// print text according to the level with highlighted first character
		$('.textParagraph').append(textToPrint);
		
		//hihlight the key on the keyboard according to the first letter (let highlightedKey)	
		currentKey = keys[currentLetter];
		$(currentKey).addClass('keyHighlight');   

					//////////////////////end of start ///////////// 
	});

		/////////////////////on key clicked /////////////////////

	
	$(window).keyup(function(event){ 
		
		//detemine which key is pressed and compare it with the currentLetter
		//asign the value of user input to userText
		userText = $('.userInput').val();

		//assign the current event key to userKey var
		let userKey = event.key;

		//if user press shift do nothing
		if(userKey === "Shift"){
		}else if(userKey === "Backspace"){
			audio.play();
		//if user choose any other letter and is not equal current letter run uncorrect() else run correct()
		}else if(userKey !== currentLetter && userKey !== "Shift" && userKey !== "Backspace"){
			uncorrect();
		}else{
			correct();
		};
	});



					//-----------------FUNCTIONS-------------------------
	//function that block elements to be used
	function block(what){
		console.log("this area is blocked");
	};

	//function that clear the text area 
	function clear(what){
		$(what).remove();	
	};

	let numberOfMistakes = 0;
//function run when uncorrect letter chosen 
	let wrong = new Audio('wrong.mp3');
	function uncorrect() {
		//play uncorrect sound
		wrong.play();
		
		//increase number of mistakes
		numberOfMistakes++;
		
		
	};

//function run when correct letter has been chosen 
	function correct() {
		//play key sound 
		audio.play();
		
		//add 1 to the index 
		index++;
		
		//determine what is the first letter 
		currentLetter = gameLevel[index];
		
		//clear the text area 
		clear('.textParagraph');

		//highlight chosen letter 
		textToPrint = highlightLetter(index, gameLevel);
		
		//add paragrpah class to the printed text: '.textParagraph'
		$('.text').prepend('<p class="textParagraph">');
	
		// print text according to the level with highlighted first character
		$('.textParagraph').append(textToPrint);
				
		//remove the previos key highlight 
		$(currentKey).removeClass('keyHighlight'); 

		//hihlight the key on the keyboard according to the first letter (let highlightedKey)	
		currentKey = keys[currentLetter];
		$(currentKey).addClass('keyHighlight'); 

		//
		// let userInput = $('.userInput').val();
		// console.log(userInput);
		//
		if(index === gameLevel.length){
			finish();
		}

	};

	//function that highlight the first letter of the text
	function highlightLetter(index, inWhat){
		return inWhat.slice(0, index) + '<span class="highlight">' + inWhat.slice(index,index+1) + '</span>' + inWhat.slice(index + 1); 
	};

	//function that checks if finished
	// function ifFinished(){
	// 	if(currentLetter === gameLevel[-1]{
	// 		console.group('ok');
	// 	}
	// }
	//function when the sentence is finsihed
	function finish(){

		//play winner sound
		winner.play();
		//count word per minut
		
		let numberOfWords = gameLevel.split(" ");
		numberOfWords = numberOfWords.length;
	

		let wpm = Math.floor(numberOfWords / (totalTime - 2) * 60 );
		
		//remove the text in the instrtruction box from the screen
		clear('#instructions');

		//print new instruction text on the screen
		$('.instructions').append(`<p id="instructions">Congratulation! You got ${wpm} wpm. Press start to play again.</p>`);
		

		//block all the keys extept start 
		//play winner sound 
		//count accuaracy
		//count total time
		//count words per minute 
	}

	function reset(){
		//clear input area if not empty 
		$(".userInput").val('');
		index = 0;
		currentLetter;
		currentKey;
		numberOfMistakes = 0;
		$(currentKey).removeClass('keyHighlight');
	}



	//end
});






//if correct print in green, change current letter to the next index change keyboard highlight to the current letter 

	//separate letters with span 
		// let separatedText = separate('.textParagraph');
		
		//choose the first letter from the text and assign it to let currentLetter

				
	//hihlight the key on the keyboard according to the first letter (let highlightedKey)
		//create a class: good, wrong 
		//

		//find the first letter input <span id="letter"</span> before and after the index of 
	//user press keyboard key. save to var. check index of the letter in the string

	//according to the index of the user input letter slice the letters from the text

	//compare the letters 

	//if the equal go ahead if not equal make the last letter red and make a sound "uncorrect"

	//if text === user imput print congratulation and block the screen 



	//what i need: function function block(what), function clear(what), 
	//function compare(what, withWhat), 


