"use strict";
var sky = require('aframe-sun-sky');
var physics = require('aframe-physics-system');
var leapHands = require("aframe-leap-hands").registerAll();
var Leap = require("leapjs");


function handStateFromHistory(hand, historySamples) {
  if (hand.grabStrength === 1)
    return "rock";
  else if (hand.grabStrength === 0)
    return "paper";
  else {
    var sum = 0;
    for (var s = 0; s < historySamples; s++) {
      var oldHand = controller.frame(s).hand(hand.id);
      if (!oldHand.valid) break;
      sum += oldHand.grabStrength;
    }
    var avg = sum / s;
    if (hand.grabStrength - avg < 0) return "opening";
    else if (hand.grabStrength > 0) return "closing";
  }
  return "not detected";
}

function handStateScissors(hand, handSamples) {
	var indexFinger = hand.indexFinger;
	var middleFinger = hand.middleFinger;
	
	if (indexFinger.extended && middleFinger.extended) {
		console.log('Scissors');
	}
}

function numFingers(hand, handSamples) {
	
}


function getComputerChoice() {
	var computerChoice = Math.random();
	if (computerChoice < 0.34)
		computerChoice = "rock";
	else if(computerChoice <= 0.67)
		computerChoice = "paper";
	else
		computerChoice = "scissors";
	
	return computerChoice;
}


// Main frame loop for application
var controller = Leap.loop({ enableGestures: true }, function(frame) {
	// check if hands are present in scene 
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
//		var environment = document.querySelector("a-sky");
//    if (handStateFromHistory(hand, 10) === "closed") environment.setAttribute('color', 'blue');
//		else environment.setAttribute('color', 'pink'); 
		//console.log(getComputerChoice());
		console.log(handStateScissors(hand, 10));
		
  }
});

/*


*/

