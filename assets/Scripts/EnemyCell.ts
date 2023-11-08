import { _decorator, Component, instantiate, Node, Prefab, BoxCollider2D, Rect, Sprite, UITransform, tween, Vec3, Label, Color, misc, Quat, sp, resources, sys, JsonAsset, view, game} from 'cc';
const { ccclass, property } = _decorator;

let playerNode: Node | null = null;
@ccclass('EnemyCell')
export class EnemyCell extends Component {
    //@property(Sprite) enemy_tower_cell_back : Sprite = null;
    @property(Node) bg : Node = null;
    @property(Node) cloud : Node = null;
    @property(Node) cloud2 : Node = null;
    @property(Node) cloud3 : Node = null;
    @property(Prefab) // Use a property field for your prefab
   
    @property(Prefab) enemy_tower_tomb: Prefab = null;
    @property(Prefab) enemy_tower_cell_back: Prefab = null;
    @property(Prefab) enemy_tower_cell: Prefab = null;
    @property(Prefab) enemy_tower_highlight: Prefab = null;
    @property(Prefab) enemy_tank: Prefab[] = [];
    @property(Node) crosshair : Node = null;
   
    //@property(Sprite) pin : Sprite = null;

    private prefabEnemyCellArray: Node[] = [];
    //public enemy_tank: Prefab[] = [];
    

    @property(Node) player_tower_tomb: Node = null;
    @property(Node) player_tower_cell_back: Node = null;
    @property(Node) player_tower_cell: Node = null;
    @property(Node) player_tank: Node = null;
    @property(Node) bullet : Node = null;

    @property(Node) fire : Node = null;

    @property(Prefab) gameOver : Prefab = null;

    
    levelData: number = 0;
    static isTapEnable:boolean = true;
    isTouching:boolean = true;

    //enemyValueArray = [7, 40, 14, 26];
    arrTankShootMinigame: number[][] = [
        [3,2],
        [5,5,3],
        [5,3,5],
        [8,6,12,22],
        [7,12,6,20],
        [9,12,8,20],
        [10,8,10,25,45],
        [9,32,8,16,63],
        [13,11,18,37,69],
        [20,45,10,25],
        [11,4,5,18],
        [12,35,15,10],
        [15,16,10,28],
        [15,40,25,14,90],
        [16,10,15,35],
        [17,12,25],
        [20,35,18,50],
        [24,16,20,49,99],
        [25,25,30,15,85],
        [26,20,4,45,80],
        [27,30,20,70,95],
        [28,99,76,50,23],
        [31,15,5,47,85],
        [31,29,80,55],
        [32,35,65,20,120],
        [32,48,30,100],
        [33,110,31,52],
        [34,40,15,36,120],
        [35,10,30,65,139],
        [36,35,65,30,150],
        [38,140,35,69],
        [45,22,25,30,115],
        [47,25,90,55,180],
        [49,80,48,260,160],
        [50,80,255,40,100]
        
    ];
    playerValue:number = 3;
    initPosCrosshairX:number;
    initPosCrosshairY:number;
    disx:number;
    disy:number;

    async start() {
        this.loadAll();

        // try {
        //     const levelData = await this.loadJSONData(); // Wait for the level data to load
        //     if (levelData !== null) {
                
        //     } else {
        //         console.log('Level data not found.');
        //     }
        // } catch (error) {
        //     console.error('Failed to load JSON data:', error);
        // }
        
    }

    loadAll()
    {
        //this.loadJSONData();
        this.initGameLevelData();
        this.loadPlayerCell();
        this.resetCrosshairPosition();
        this.loadEnemyCells();
        this.enemyCellPosition();
        this.onTouchListener();

       //this.addPlayerCell();
    }

    initGameLevelData()
    {
        if(this.getGameLevel()==null)
        {
            console.log("game level ",this.getGameLevel());
        }
        
        this.playerValue = this.arrTankShootMinigame[this.getGameLevel()][0];

        
        
        const labelNode = new Node();
        labelNode.name = "GameLabel"; 
        labelNode.setPosition(0,300);
        this.node.addChild(labelNode);

        const gameLevelValue = this.getGameLevel()+1;
        const lblEnemy = labelNode.addComponent(Label);
        lblEnemy.string = "Level "+gameLevelValue.toString();
        lblEnemy.fontSize = 52;
        lblEnemy.lineHeight = 60;
        lblEnemy.color = Color.WHITE;

        
    }

    loadPlayerCell()
    {
        // this.player_tower_tomb.setSiblingIndex(2);
        // this.player_tower_cell_back.setSiblingIndex(2);
        // this.player_tower_cell.setSiblingIndex(3);
        // this.player_tank.setSiblingIndex(4);
        // Populate the level data
        
      
    //     resources.load("Prefab/enemy-tower-cell", Prefab, (err, prefab) => {
    //     if (err) {
    //         console.error("Error loading prefab:", err);
    //         return;
    //     }
    //     const prefabNode = instantiate(prefab);
    
    //     this.node.addChild(prefabNode); // Assuming you're in a Cocos Creator script
    // });
    

        playerNode = new Node();
        playerNode.setPosition(-300,-210);
        this.node.addChild(playerNode);

        playerNode.addChild(this.player_tower_tomb);
        this.player_tower_tomb.setPosition(0,100);
        playerNode.addChild(this.player_tower_cell_back);
        this.player_tower_cell_back.setPosition(0,-40);
        playerNode.addChild(this.player_tower_cell);
        this.player_tower_cell.setPosition(this.player_tower_cell_back.getPosition());
        playerNode.addChild(this.player_tank);
        this.player_tank.setPosition(this.player_tower_cell_back.getPosition());

        let playerLabelNode = new Node();
        playerLabelNode.name = "PlayerLabel"; // Set a name for the label node
        //playerLabelNode.setPosition(-300,-220);
        playerNode.addChild(playerLabelNode);
        // Create a label component and add it to the label node
        const lblPlayer = playerLabelNode.addComponent(Label);
        lblPlayer.string = this.playerValue.toString();
        lblPlayer.fontSize = 32;
        lblPlayer.lineHeight = 40;
        lblPlayer.color = Color.BLACK;

        

        tween(this.cloud)
        .by(1.0, {position: new Vec3(-50,0)})
        .repeatForever()
        .start();

        tween(this.cloud2)
        .by(1.0, {position: new Vec3(-50,0)})
        .repeatForever()
        .start();

        tween(this.cloud3)
        .by(1.0, {position: new Vec3(-50,0)})
        .repeatForever()
        .start();
    }

    resetCrosshairPosition()
    {
        this.crosshair.setPosition(playerNode.getPosition().x+60,playerNode.getPosition().y-30);

        this.initPosCrosshairX = this.crosshair.getPosition().x;
        this.initPosCrosshairY = this.crosshair.getPosition().y;
    }

    public enemyCellPosition()
    {
        console.log("aaaaa");
        
        for (let i = 0; i < this.prefabEnemyCellArray.length; i++) {
            const posY = this.prefabEnemyCellArray[i].getComponent(UITransform).contentSize.height;
            // this.prefabEnemyCellArray[i].setPosition(300,-255+i*128);
            this.prefabEnemyCellArray[i].setPosition(300,-255+i*posY);
            if(i==this.prefabEnemyCellArray.length-1)
            {
                this.prefabEnemyCellArray[i].setPosition(300,this.prefabEnemyCellArray[i-1].getPosition().y+this.prefabEnemyCellArray[i-1].getComponent(UITransform).contentSize.height/2+this.prefabEnemyCellArray[i].getComponent(UITransform).contentSize.height/2);
            }
        }
    }

    loadEnemyCells()
    {
        const cell = this.arrTankShootMinigame[this.getGameLevel()].length;
        for (let i = 0; i < cell; i++) {

            if(i==(cell-1))
            {
                const enemyCellBack = instantiate(this.enemy_tower_tomb);
                this.node.addChild(enemyCellBack);
                this.prefabEnemyCellArray.push(enemyCellBack);
                console.log("tower");
                return;
            }
            const enemyCellBack = instantiate(this.enemy_tower_cell_back);
            //enemyCellBack.setPosition(300,-255+i*150);
            this.node.addChild(enemyCellBack);
            this.prefabEnemyCellArray.push(enemyCellBack); // Push the instances into the prefabArray
            
            const enemyCell = instantiate(this.enemy_tower_cell);
            enemyCell.name = "imgCell";
            enemyCellBack.addChild(enemyCell);

            //const enemyTank = instantiate(this.levelData[this.getGameLevel()][i]);
            const randomInteger = this.getRandomInt(0, this.enemy_tank.length-1);
            const enemyTank = instantiate(this.enemy_tank[randomInteger]);
            
            enemyTank.name = "enemy";
            enemyCell.addChild(enemyTank);

            const enemyCellHighlight = instantiate(this.enemy_tower_highlight);
            enemyCellBack.addChild(enemyCellHighlight );
            enemyCellHighlight.name = "Highlight";
            enemyCellHighlight.active = false;

            const labelNode = new Node();
            labelNode.name = "EnemyLabel"; // Set a name for the label node
            labelNode.setPosition(enemyCell.getPosition().x-35,enemyCell.getPosition().y+25);
            enemyCell.addChild(labelNode);

            const intValue = this.arrTankShootMinigame[this.getGameLevel()][i+1];
            //const intValue = 5;
            // Create a label component and add it to the label node
            const lblEnemy = labelNode.addComponent(Label);
            lblEnemy.string = intValue.toString();
            lblEnemy.fontSize = 32;
            lblEnemy.lineHeight = 40;
            lblEnemy.color = Color.RED;
        }
    }

    onTouchListener()
    {
        this.crosshair.on(Node.EventType.TOUCH_START, (event) =>
        {
            if(EnemyCell.isTapEnable==false)
            {
                this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
                return;
            }
            this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);

            this.disx = event.getUILocation().x-this.crosshair.getPosition().x;
            this.disy = event.getUILocation().y-this.crosshair.getPosition().y;
            
            console.log("Mouse enter");

            // const enemyCellBack = instantiate(this.enemyBlock);
            // enemyCellBack.setPosition(0,255);
            // this.node.addChild(enemyCellBack);
        } )

        this.bg.on(Node.EventType.TOUCH_MOVE, (event) =>
        {
            console.log("Mouse Moving");
            if(EnemyCell.isTapEnable==false)
            {
                this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
                return;
            }
            
            this.crosshair.setPosition(event.getUILocation().x-this.disx,event.getUILocation().y-this.disy);
            this.showHighlightEffect(event);
            // const screenSize = view.getCanvasSize();
            // if(event.getUILocation().x>screenSize.width-5)
            // {
            //     this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
            // }
           // console.log(screenSize);
        } )

        this.bg.on(Node.EventType.TOUCH_END, (event) =>
        {
            if(EnemyCell.isTapEnable==false)
            {
                this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
                return;
            }

            this.removeCell(event);
            this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
            console.log("touch end");
            
        } )    
    }

    showHighlightEffect(event)
    {
        //const touchNodeBoundingBox = this.crosshair.getBoundingBox(); 
        //const crosshairBoundingBox = this.crosshair.getComponent(UITransform).getBoundingBoxToWorld();

        const crosshairBoundingBox = event.getUILocation();

        for (let i = 0; i < this.prefabEnemyCellArray.length-1; i++) {
            const blockBoundingBox = this.prefabEnemyCellArray[i].getComponent(UITransform).getBoundingBoxToWorld();

            const childNode = this.prefabEnemyCellArray[i].getChildByName('Highlight'); 

            if (blockBoundingBox.contains(crosshairBoundingBox)) {
                
                if(childNode)
                {
                    this.prefabEnemyCellArray[i].getChildByName('Highlight').active = true;
                }
            }
            else
            {
                if(childNode)
                {
                    this.prefabEnemyCellArray[i].getChildByName('Highlight').active = false;
                }
                
            }
        }
    }
    
    removeCell(event)
    {
        const crosshairBoundingBox = event.getUILocation();

        for (let i = 0; i < this.prefabEnemyCellArray.length-1; i++) {
            this.prefabEnemyCellArray[i].getChildByName('Highlight').active = false;
            const blockBoundingBox = this.prefabEnemyCellArray[i].getComponent(UITransform).getBoundingBoxToWorld();

            if (blockBoundingBox.contains(crosshairBoundingBox))
             {
                if(this.playerValue>=this.arrTankShootMinigame[this.getGameLevel()][i+1])
                {
                    this.playerValue = this.playerValue+this.arrTankShootMinigame[this.getGameLevel()][i+1];
                    EnemyCell.isTapEnable= false;
                    this.triggerBulletToEnemy(i);
                    tween(this.prefabEnemyCellArray[i].getChildByName('imgCell'))
                    .delay(1.5)
                    .to(0.4, {scale: new Vec3(0,0,0)})
                    .call(() => {
                    this.removeEnemyCell(i);
                    console.log("Move Animation Complete");
                    //this.setLevelDataIntoJson();
                    
                    })
                    .delay(0.35)
                    .call(() => {
                    this.prefabEnemyCellArray[i].removeFromParent();
                    this.prefabEnemyCellArray.splice(i,1);
                    this.arrTankShootMinigame[this.getGameLevel()].splice(i+1,1);
                    
                    })
                
                    .start();
                }
                else
                {
                    this.triggerBulletToPlayer(i);
                }
                
            }
        }
    }

    triggerBulletToEnemy(idx:number)
    {
        const imgBullet = instantiate(this.bullet);
        imgBullet.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
        this.node.addChild(imgBullet);
        imgBullet.active = true;
        this.bullet.active = false;
        //const direction = this.prefabEnemyCellArray[idx].getPosition().sub(imgBullet).normalize();
        let width = this.prefabEnemyCellArray[idx].getPosition().x-this.initPosCrosshairX;
        let height = this.prefabEnemyCellArray[idx].getPosition().y-this.initPosCrosshairY;

        // Calculate the rotation angle in radians
        const angle = Math.atan2(height, width);
        const degreeAngle = -misc.radiansToDegrees(angle);
        console.log("enemy", this.prefabEnemyCellArray[idx].getPosition().x);
        console.log("player", this.crosshair.getPosition().x);

        const newRotationQuat = new Quat();
        Quat.fromEuler(newRotationQuat, 0, 0, -degreeAngle);

        imgBullet.setRotation(newRotationQuat);

        tween(imgBullet)
        .to(1.0, {position: new Vec3(this.prefabEnemyCellArray[idx].getPosition().x,this.prefabEnemyCellArray[idx].getPosition().y,0)})
        .call(() => {
            imgBullet.removeFromParent();
        })
        .call(() => {
            const imgFire = instantiate(this.fire);
            imgFire.setScale(0,0,0);
            imgFire.setPosition(this.prefabEnemyCellArray[idx].getPosition());
            this.node.addChild(imgFire);
            imgFire.active = true;
            console.log("fired");
            tween(imgFire)
            .to(0.5, {scale: new Vec3(0.9,0.9,0)})
            .call(() => {
                //this.prefabEnemyCellArray[idx].getChildByName("enemy").active = false;
                this.prefabEnemyCellArray[idx].getChildByName('imgCell').getChildByName('enemy').active = false;
                imgFire.removeFromParent();
            })
            .start();
        })
        .start();
    }

    triggerBulletToPlayer(idx:number)
    {
        const imgBullet = instantiate(this.bullet);
        imgBullet.setPosition(this.prefabEnemyCellArray[idx].getPosition());
        this.node.addChild(imgBullet);
        imgBullet.active = true;
        this.bullet.active = false;
        //const direction = this.prefabEnemyCellArray[idx].getPosition().sub(imgBullet).normalize();
        let width = this.initPosCrosshairX-this.prefabEnemyCellArray[idx].getPosition().x;
        let height = this.initPosCrosshairY-this.prefabEnemyCellArray[idx].getPosition().y;

        // Calculate the rotation angle in radians
        const angle = Math.atan2(height, width);
        const degreeAngle = -misc.radiansToDegrees(angle);

        const newRotationQuat = new Quat();
        Quat.fromEuler(newRotationQuat, 0, 0, -degreeAngle);

        imgBullet.setRotation(newRotationQuat);

        tween(imgBullet)
        .to(1.0, {position: new Vec3(this.initPosCrosshairX-40,this.initPosCrosshairY-30,0)})
        .call(() => {
            imgBullet.removeFromParent();
        })
        .call(() => {
            const imgFire = instantiate(this.fire);
            imgFire.setScale(0,0,0);
            imgFire.setPosition(this.initPosCrosshairX-40,this.initPosCrosshairY-30);
            this.node.addChild(imgFire);
            imgFire.active = true;
            console.log("fired");
            tween(imgFire)
            .to(0.5, {scale: new Vec3(0.9,0.9,0)})
            .call(() => {
                //this.prefabEnemyCellArray[idx].getChildByName("enemy").active = false;
                this.player_tank.active = false;
                imgFire.removeFromParent();
                const gameOverScene = instantiate(this.gameOver);
                gameOverScene.name = "Lose";
                this.node.parent.addChild(gameOverScene);
                this.node.removeFromParent();
            })
            .start();
        })
        .start();
    }

    removeEnemyCell(idx:number)
    {
        const posY = this.prefabEnemyCellArray[0].getComponent(UITransform).contentSize.height;
        if(idx<this.prefabEnemyCellArray.length-1)
        {
            for(let j=idx+1; j<this.prefabEnemyCellArray.length;j++)
            {
                tween(this.prefabEnemyCellArray[j])
                .by(0.4, {position: new Vec3(0,-posY,0)})
                .start();
            }
        }
        if(this.prefabEnemyCellArray.length>2)
        {this.addPlayerCell();}
        else
        {
            this.setGameLevel(this.getGameLevel()+1);
            const gameOverScene = instantiate(this.gameOver);
            gameOverScene.name = "Win";
            this.node.parent.addChild(gameOverScene);
            //this.gameOver.active = true;
            
            this.node.removeFromParent();
        }
        
    
    }

    addPlayerCell()
    {
        const posX = playerNode.getPosition().x;
        const posY = playerNode.getPosition().y-40;

        const playerCellBack = instantiate(this.player_tower_cell_back);
        playerCellBack.setPosition(posX ,posY);
        this.node.addChild(playerCellBack);

        const playerCell = instantiate(this.player_tower_cell);
        playerCell.setScale(0,0,0);
        playerCell.setPosition(posX ,posY);
        this.node.addChild(playerCell);

        tween(playerCell)
        .by(0.4, {scale: new Vec3(1,1,0)})
        .start();

        tween(playerNode)
            .by(0.4, {position: new Vec3(0,this.player_tower_cell_back.getComponent(UITransform).contentSize.height,0)})
            .start();

        tween(this.crosshair)
        .by(0.4, {position: new Vec3(0,this.player_tower_cell_back.getComponent(UITransform).contentSize.height,0)})
        .delay(0.4)
        .call(() => {
            playerNode.getChildByName('PlayerLabel').getComponent(Label).string = this.playerValue.toString();
            EnemyCell.isTapEnable = true;
            this.resetCrosshairPosition();
        })
        .start();
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    

    getGameLevel() :number
    {
        const gameLevelString = sys.localStorage.getItem("dataLevel");
        if (gameLevelString !== null && gameLevelString !== undefined) {
            const gameLevel= parseInt(gameLevelString, 10);
    
            if (!isNaN(gameLevel)) {
                this.levelData = gameLevel;
                return this.levelData;
            }
        }
        if(this.levelData==0)
        {
            this.setGameLevel(this.levelData);
        }
        return this.levelData;
    }


    setGameLevel(gameLevelData:number) 
    {
        let gameLevel = gameLevelData;
        if(gameLevel>34)
        {
            gameLevel = 0;
            this.levelData = 0;
        }
        sys.localStorage.setItem("dataLevel", gameLevel.toString());
    }

    update(deltaTime: number) {
       
        if(this.cloud.getPosition().x<-900)
        {
            this.cloud.setPosition(900,this.cloud.getPosition().y);
            tween(this.cloud)
            .by(1.0, {position: new Vec3(-50,0)})
            .repeatForever()
            .start();
        }
        if(this.cloud2.getPosition().x<-900)
        {
            this.cloud2.setPosition(900,this.cloud2.getPosition().y);
            tween(this.cloud2)
            .by(1.0, {position: new Vec3(-50,0)})
            .repeatForever()
            .start();
        }
        if(this.cloud2.getPosition().x>900)
        {
            this.cloud2.setPosition(900,this.cloud2.getPosition().y);
            tween(this.cloud2)
            .by(1.0, {position: new Vec3(-50,0)})
            .repeatForever()
            .start();
        }
        if(this.cloud3.getPosition().x<-900)
        {
            this.cloud3.setPosition(900,this.cloud3.getPosition().y);
            tween(this.cloud3)
            .by(1.0, {position: new Vec3(-50,0)})
            .repeatForever()
            .start();
        }
        //console.log("animation  ",this.cloud.getPosition().x);
    }













    //read json file

    async loadJSONData() {
        return new Promise<number | null>((resolve, reject) => {
            resources.load('data', JsonAsset, (err, jsonAsset) => {
                if (!err) {
                    const jsonData = jsonAsset.json;
                    this.levelData =  jsonData.LevelInfo.level;
                    console.log("JSON LEVEL ",jsonData.LevelInfo.level); 
                    resolve(jsonData.LevelInfo.level); // Resolve the Promise with the JSON data
                } else {
                    reject(err); // Reject the Promise in case of an error
                }
            });
        });
    }

    setLevelDataIntoJson() {
        resources.load('data', JsonAsset, (err, jsonAsset) => {
            if (!err) {
                const jsonData = jsonAsset.json;
    
                // Modify the JSON data (e.g., update a property)
                jsonData.LevelInfo.level = this.getGameLevel()+1; // Change the level value to 5
                console.log("data " ,jsonData.LevelInfo.level);
    
                // Save the modified JSON object back to local storage or another storage mechanism
                this.saveModifiedData(jsonData);
            } else {
                console.error('Failed to load existing JSON data:', err);
            }
        });
    }

    saveModifiedData(data: any) {
        try {
            const jsonDataString = JSON.stringify(data);
    
            // Save the modified JSON string back to local storage or another storage mechanism
            sys.localStorage.setItem("dataLevel", data.LevelInfo.level);

            console.log(sys.localStorage.getItem("dataLevel"));
    
            console.log("JSON data modified and saved successfully.");
        } catch (error) {
            console.error("Failed to save modified JSON data:", error);
        }
    }
}

