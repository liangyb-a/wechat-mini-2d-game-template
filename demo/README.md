# Browser demo notes

This simple demo is a lightweight, plain-JS reproduction of a single-tap scoring mechanic for fast prototyping. It is not a Cocos Creator build — to run a Cocos demo, open the project in Cocos Creator and create a scene, then attach the TypeScript scripts located in assets/scripts.

To run the browser demo locally:
1. Install a static server: npm i -g http-server (or use the included npm script)
2. Run: npm start
3. Open http://localhost:8080

To import the project into Cocos Creator (3.x):
1. Clone this repo
2. Open Cocos Creator and choose "Open Project" -> point to the repo root
3. Create a new scene (MainScene), create Canvas and nodes, attach the TypeScript scripts in assets/scripts
4. Build -> Platform: Web Mobile or WeChat Mini Game

