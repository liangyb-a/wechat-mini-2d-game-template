Updated demo: instructions to set up a playable scene in Cocos Creator 3.x

Steps to create the MainScene inside Cocos Creator (so the pushed scripts become a working demo):

1) Open Cocos Creator 3.x and open this project folder.
2) In the Assets panel, right-click -> Create -> Scene -> name it "MainScene".
3) In the scene hierarchy, create a Canvas node. Under Canvas create the following nodes:
   - Background (Node for static bg)
   - SpawnRoot (Node) -> this will be the parent for obstacles. Position at x=0,y=0
   - Player (empty Node) -> add the Player component, attach a Sprite if you like; set position x=-200,y=0
   - UI (Node) -> create a Label (Label component) for score and a Node for MainMenu and GameOver
4) Add a new Node in Assets -> Prefab for Player and Obstacle:
   - Create a Node, add necessary components (Sprite/Collider), then drag to Assets to create Prefab
5) Add an empty Node named "Managers" and attach GameManager, ObjectPool, UIManager components to it.
   - On GameManager component, assign: playerPrefab (the Player prefab), obstaclePrefab (the Obstacle prefab), spawnRoot (SpawnRoot node), uiManager (UIManager component instance), obstaclePool (ObjectPool component instance).
   - On UIManager, assign scoreLabel (the Label node), mainMenu (MainMenu node), gameOverNode (GameOver node), reviveButton (a child Button node inside GameOver)
6) Configure colliders:
   - Player: add a Collider2D (BoxCollider2D) and a RigidBody2D (if using physics) or rely on bounding box collision checks.
   - Obstacle: add BoxCollider2D and ensure isTrigger is true if using collision callbacks.
7) Save scene and click Play in the Editor to test. Touch / click in the Game view to make the player "jump" (demo logic uses small translate) and obstacles will spawn and move left. On collision GameManager.endGame is called and GameOver UI shows. Revive uses AdManager simulation which simply resumes the game.

Notes:
- This setup is intentionally lightweight and focuses on gameplay plumbing: object pool -> spawn -> move -> recycle, HUD updates, ad/ revive flow.
- You can refine physics, animation, and visuals inside the editor.
