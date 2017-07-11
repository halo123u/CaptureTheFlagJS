*** Oswaldo Almazo / 07/11/17 ***

# Capture the Flag Proposal

## What is Capture the Flag?
It is a two player game where both players aim to capture a single object in the center. They would be able to hit the other player in order for them to drop the object they capture. Debating wether the winner should be determined by who holds it the longest or by reaching an area with a target.

## Wireframe

(Your wireframes go here. Preferably two or more)

## Initial thoughts on game structure
-A container and three divs in it. two for the players and one for the object itself.
-the object should be appended to the element that touches it first.
-elements should have a function that moves a line a few pixels in front to get the other to drop the object in order to pick it up and win.
-maybe add a boost that cause the element to move faster fora small timeframe to catch up with the other element

//maybe implement a simple socket.io app in order to make it multiplayer.

(Write out what challenges you expect to encounter, or ideas you want to come up with)

## Phases of Completion
phase 1 
Create the html structure of the game;
add styling

phase 2
add movement to the elements.
add collision detection
add shooting/hitting mechanism

phase 3
add winning condition 
add score keeping

extra phase(if there is enough time )
implement socket.io for real time game play
host on heroku for fun

Final phase 
game should work  



## Links and Resources
Ryan Jada
(Anything you've looked up so far or are thinking about using.)