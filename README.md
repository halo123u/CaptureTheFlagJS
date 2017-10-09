# CaptureTheFlagJS
A simple capture the flag game using html,css, js, and jquery

[screenshot]

## What is Capture the Flag?
  Capture the Flag js is a simple, online multiplayer game. the purpose of the game is to grab a specific amount of black dots in order to win. The reason why this game is online, is to allow more players in the game since they wont have to share the same keyboard.

## Technical Discussion
The game is made using html,css, and javascript.
It is using jquery to generate the game layout.
The online component is being run on socket.io and express.
the server is being hosted on heroku and is running using nodejs.

### Notes on Game Structure
The hardest part of this project was making sure that all the clients were in sync. Since this is a peer to peer game, every single client has to be updated anytime something changes. if player 1 moves 100px, this chang has to be emitted to every single client. What makes this difficult is having to keep track of all the various variables. The way I over came this was by keeping all the player variables in the server instead of the client. All the client has to do is listen for any changes and rerender the page. Another challenge that i needed to overcome was giving the controls of the various players to each client. It was difficult because once a client connected it would automatically give it control of the player. this  was a problem since two players could have control over the same player which would make the game unplayable. I overcame this by creating a variable id that started at 0. When a client connected I assigned them the current value of id and then increase by one. once it reached the number of (players-1), it would no longer assigned ids to the new clients that connected since there wasnt any more playable objects available. once a client disconnected all i had to do was decrease the id by 1 which would allow new clients to gain control of an object. 


## The Making of Capture The Flag 
  Ryan Jada helped with the idea of the game.
  Mitch Severe, Joseph Diperi, and Asher Shaheen helped with the collision detection as well as testing the game.
  Constantine Apostolou introduced me to socket.io 
  

## Opportunities for Future Growth
Definitely add Rooms in order to have different number of players. maybe 1v1 ,2v2, 4v4
Add obstacles throughout the game board.
improve player movement.


