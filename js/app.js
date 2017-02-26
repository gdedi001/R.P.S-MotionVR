"use strict";
var sky = require("aframe-sun-sky");
var physics = require("aframe-physics-system");
var leapHands = require("aframe-leap-hands").registerAll();
var Leap = require("leapjs");

function getComputerChoice() {
  var computerChoice = Math.random();
  if (computerChoice < 0.34) computerChoice = "rock";
  else if (computerChoice <= 0.67) computerChoice = "paper";
  else computerChoice = "scissors";

  return computerChoice;
}

function compare(user, computer) {
  if (user === computer) {
    return "The result is a tie!";
  }
  if (user === "rock") {
    if (computer === "scissors") {
      return "rock wins";
    } 
		else {
      return "paper wins";
    }
  }
  if (user === "paper") {
    if (computer === "rock") {
      return "paper wins";
    } 
		else {
      return "scissors wins";
    }
  }
  if (user === "scissors") {
    if (computer === "rock") {
      return "rock wins";
    } 
		else {
      return "scissors wins";
    }
  }
}

function numFingers(hand) {
  var extendedFingers = 0;

  for (var f = 0; f < hand.fingers.length; f++) {
    var finger = hand.fingers[f];
    if (finger.extended) extendedFingers++;
  }

  // console.log("Extended fingers: " + extendedFingers);
  return extendedFingers;
}

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
  var maxFingers = 2;

  if ((indexFinger.extended && middleFinger.extended) && numFingers(hand) === maxFingers) {
    return "scissors";
  }
}

// Main frame loop for application
var controller = Leap.loop({ enableGestures: true }, function(frame) {
  // check if hands are present in scene
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
  
    //console.log(getComputerChoice());
    console.log(handStateScissors(hand, 10));
  }
});

/*
	Notes
	-----
	  var environment = document.querySelector("a-sky");
    if (handStateFromHistory(hand, 10) === "closed") environment.setAttribute('color', 'blue');
    else environment.setAttribute('color', 'pink');
*/
