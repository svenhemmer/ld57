# Disclaimer
This is an entry to the Ludum Dare 57 game jam¹. It was created under time constraints in a single weekend with no regards to code quality whatsoever. All code, music, graphics and other assets were created from scratch. Use at your own risk.

¹https://ldjam.com/events/ludum-dare/57/depth-of-field-3

# Quickhelp
## First steps
Run ```npm install``` to get all dependencies and the project in a runable state.

## Structure
```
+- dist (is being build, the final deliverable)
+- public
|  +- assets (all assets for the game, images, sounds, music etc., will be copied by vite - subfolders not tested yet)
+- src
|  +- main.ts (main entry point - typescript)
|  ...
+ index.html (main entry point)
...
```

## Running, building, deploying
### Running locally 
Check the ```vite.config.ts``` and make sure ```base: '/ld57/'``` is set. Just run 
```
npm run dev
```
The game should be visible at http://localhost:9000 

### Deploying to github pages
Check the ```vite.config.ts``` and make sure ```base: ''``` is set. Just run 
```
npm run deploy
```
The game should be visible at https://svenhemmer.github.io/ld57/

Note: The pages are provided from a special branch ```gh-pages```, don't push, merge, rebase something there manually.