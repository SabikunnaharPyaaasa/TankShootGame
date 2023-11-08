import { _decorator, Component, Node, Sprite, input, Input, EventTouch, Label, instantiate } from 'cc';
import { EnemyCell } from './EnemyCell';
const { ccclass, property } = _decorator;


@ccclass('playerController')
export class playerController extends Component {

    

    @property(Node) crosshair : Node = null;
   

    @property nodeArray: Node[] = [];


// Assuming you have a scene or a node you want to push into the array
    //@property node1: Sprite | null = cc.find("Canvas/minigame-bg"); // Change this to the path of your node
   // @property node2: Node | null = cc.find("Canvas/Node2"); 


    
    // @property(Node) card2 : Node = null;
    // @property(Node) cardClose : Node = null;
    // @property(Sprite) crosshair : Sprite = null;

     //@property(float) disx : float = null;
    
    
   

    //onLoad()
    //{
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, true );
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove , this , true );
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this, true);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled, this, true);


        //this.crosshair.on(Node.EventType.TOUCH_START, this.onTouchBegan, this);
        //this.crosshair.on(Node.EventType.TOUCH_MOVE, this.onTouchMove , this );
    //}

    // onDestroy () {
    //     //this.crosshair.off(Node.EventType.TOUCH_START, this.onTouchBegan, this);
    // }

    onTouchBegan(event: EventTouch){
        console.log("Mouse enter");
        console.log(event.getLocation());
    }

    onTouchMove(event: EventTouch){
        console.log("Mouse moving");
        console.log(event.getLocation());
        
    }

    // onTouchEnded(event){
    //     if (this.touch_moved) {
    //         event.stopPropagation();
    //     } else {
    //         this.stopPropagationIfTargetIsMe(event);
    //     }
    // }

    // onTouchCancelled(event){
    //     this.stopPropagationIfTargetIsMe(event);
    // }

    // onTouchMove(event){

    //     let touches = event.getTouches();
            
    //     let touch1 = touches[0];
    //     let delta1 = touch1.getDelta();

    //     this.pos_offset.x = delta1.x;
    //     this.pos_offset.y = delta1.y;

    //     let cam_pos = this.Camera_Base.getPosition();

    //     cam_pos.x = cam_pos.x - this.pos_offset.x;
    //     cam_pos.z = cam_pos.z + this.pos_offset.y;

    //     this.Camera_Base.setPosition(cam_pos);

    //     this.Cancel_Inner_Touch(event);
    //     this.stopPropagationIfTargetIsMe(event);

    // },

  

    start() {
        const myObject = new EnemyCell();
        this.onTouchListener();
    }

    loadEnemyCells()
    {
         
    }

    initPosCrosshairX:number;
    initPosCrosshairY:number;
    disx:number;
    disy:number;

    onTouchListener()
    {
        this.crosshair.on(Node.EventType.TOUCH_START, (event) =>
        {
            this.disx = event.getUILocation().x-this.crosshair.getPosition().x;
            this.disy = event.getUILocation().y-this.crosshair.getPosition().y;
            this.initPosCrosshairX = this.crosshair.getPosition().x;
            this.initPosCrosshairY = this.crosshair.getPosition().y;
            console.log("Mouse enter");

            
            // const enemyCellBack = instantiate(this.enemyBlock);
            // enemyCellBack.setPosition(0,255);
            // this.node.addChild(enemyCellBack);
        } )

        this.crosshair.on(Node.EventType.TOUCH_MOVE, (event) =>
        {
            console.log("Mouse Moving");
            
            this.crosshair.setPosition(event.getUILocation().x-this.disx,event.getUILocation().y-this.disy);
        } )

        this.crosshair.on(Node.EventType.TOUCH_END, (event) =>
        {
            console.log("Mouse leave");
            //this.card1.setPosition(event.getPosition.x,event.getPosition.y);
            console.log();
            console.log(event.getUILocation());

             console.log(event.getUILocation().x-this.crosshair.getPosition().x);
             console.log(event.getUILocation().y-this.crosshair.getPosition().y);

            //let fingerpos = cc.find("Canvas").convertToNodeSpaceAR(event.touch.getLocation());
            this.crosshair.setPosition(this.initPosCrosshairX,this.initPosCrosshairY);
            
        } )    
    }

    

    update(deltaTime: number) {
        
    }

}

