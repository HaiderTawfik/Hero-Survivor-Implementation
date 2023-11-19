Reflection:<br>
Developing the map: <br>
    The difficulty I faced when developing the map was learning a completely new software called Tiled. Tiled is a program that allows for creating a map based on a tiled system.
    By developing a map I learned how to create a custom tiled map using a tiled map editor and tilesets, how to layer a map properly, how to use the exported jpg of the map in a way that works with the player's characters, and how to use this map to define things such as collision blocks, spawn points, etc. <br>

Developing player movement:<br>
    The challenge for this was understanding that the method I was using was moving the background not necessarily the player, such as understanding how I needed to move enemy entities such that when a player wants to move towards an enemy it appears as such, when in reality the enemy and the background are being manipulated to move towards the player and the player stays constant. Also understanding how to use the sprite image, its width, height, and the possible collision item's width, height, and position to detect a collision between a player and a wall, object, or enemy was difficult. <br>

    I learned how to manipulate the background environment, enemy entities, spawn points, and collision blocks whenever the player moved in order to assist in the illusion of the player moving when in reality it is just the background image moving, with the player sprite changing directions based on user input, as well as how to use the player's width and height to detect collision with enemies and boundaries based on their location, width, and height. 


Developing custom animation for players and enemies: <br>
    The challenge was figuring out how sprite sheets worked, and how I could manipulate the drawImage() function in Javascript to use the sprite sheet to the correct sprite for the given circumstance.<br>

    From this, I learned how sprite sheets are laid out, and how the drawImage function can be used to manipulate what part of the sprite sheet is being drawn. From this knowledge, I was able to further understand how I could use the sprite sheet to draw out player and enemy movement based on the direction they intend to go.

Having the player reach the enemy: <br>
    The challenge for this was that in the game there are two enemy types, one can move through walls, and the other cannot. Figuring out a way to have the enemy find a route to the player proved difficult, as despite being a tile-based map the map is constantly moving based on my implementation, therefore, I couldn’t figure out a way to use the generated collision block array to create a routing algorithm to the player, instead, I opted to make a much simpler algorithm where the enemy will make attempts to reach the x, y coordinate of the player based on their x, y, however, the enemies will stick get stuck on walls. <br>

How I managed the complexity of the game <br>
    In order to manage the game's complexity I opted to remove certain features that I originally intended to include from Assignment 2. These features were things such as a boss enemy, having a chest that gave players power-ups, and having enemies give players debuffs. I decided to do this as my inexperience in javascript caused me to focus my time more on the core game mechanics such as implementing player animation, collision detection, player and enemy movement, spawning enemies in specified locations based on what wave the player is on, etc. <br>


How does the final product compare to the initial design <br>
    Aside from the removed features mentioned in “How I managed the complexity of the game”, I decided to use HTML canvas for my game, as I learned for HTML, CSS, and JS games the canvas element easily allows for dynamic image changing/modification which is very useful when working with sprite images to create animation when paired with requestAnimationFrame(). I also decided to change the map to a custom-created one as previously it was just a PNG image and it was proving difficult to develop boundary checks for this, so I decided to move to a custom map as from using Tiled I could easily add tiles to indicated collision blocks then export it as a JSON file to get an array indicating what areas on the map the player should not be able to move through. I also decided to give each player their own screen that way it wasn’t extremely zoomed out and difficult to see, however, as a result, it made it difficult to have them play on the same map so I decided to give each player half of the map, and each player has the defeat the set amount of enemies on their half in order to progress to the next wave. I also decided to remove all sword assets in favor of a slashing animation as I felt this was much cleaner based on the character sprite.
