import { _decorator, Color, Component, Graphics, Node, Vec3 } from 'cc';
import { EnemyCell } from './EnemyCell';
const { ccclass, property } = _decorator;

@ccclass('LineScript')
export class LineScript extends Component {
    
    touches: Vec3[] = []
    @property(Graphics)
    lineGraphics: Graphics = null;
    @property(Node) crosshair : Node = null;

    initPosCrosshairX:number;
    initPosCrosshairY:number;

    start() {
        this.drawLine();
        this.onTouchListener();
        this.stringArrToInt();
    }
    
    drawLine()
    {
        this.lineGraphics = this.getComponent(Graphics);
        // this.graphics.moveTo(0, 0);
        // this.graphics.lineTo(0.1, 0);
        // this.graphics.lineTo(-0.11, 0);
        // this.graphics.stroke();

        this.lineGraphics.lineWidth = 5;
        this.lineGraphics.strokeColor = Color.RED;
        this.lineGraphics.moveTo(this.crosshair.getPosition().x,this.crosshair.getPosition().y);
        this.lineGraphics.lineTo(this.crosshair.getPosition().x,this.crosshair.getPosition().y);
        this.lineGraphics.stroke();
        
    }


    onTouchListener()
    {
        this.crosshair.on(Node.EventType.TOUCH_START, (event) =>
        {
            if(EnemyCell.isTapEnable==false)
            {
                return;
            }
            this.lineGraphics.clear();
            console.log("Mouse enter");
            this.initPosCrosshairX = this.crosshair.getPosition().x;
            this.initPosCrosshairY = this.crosshair.getPosition().y;
            this.touches.length = 0;
            this.touches.push(this.crosshair.getPosition());

        } )

        this.crosshair.on(Node.EventType.TOUCH_MOVE, (event) =>
        {
            if(EnemyCell.isTapEnable==false)
            {
                return;
            }
            console.log("Mouse Moving");
            let touches = this.touches;
            this.touches.push(event.touch.getLocation());
    
            const MIN_POINT_DISTANCE = 2;
    
            this.lineGraphics.clear();

            this.lineGraphics.moveTo(touches[0].x, touches[0].y);
            let lastIndex = 0;
            for (let i = 1, l = touches.length; i < l; i++) {
                if ((touches[i].x-(touches[lastIndex].x)) < MIN_POINT_DISTANCE) {
                    continue;
                }
                lastIndex = i;
                this.lineGraphics.lineTo(this.crosshair.getPosition().x,this.crosshair.getPosition().y);
            }
            this.lineGraphics.stroke();
            
        } )

        this.crosshair.on(Node.EventType.TOUCH_END, (event) =>
        {
           
            console.log("touch end");
            this.lineGraphics.clear();
        } )    
    }

    update(deltaTime: number) {
        
    }

    stringArrToInt()
    {
        const towerMinigameData = [
            "3,2",
            "5,5,3",
            "5,3,5",
            "8,6,12&8,22",
            // ... other data
        ];
        
        const firstLevelData: number[] = towerMinigameData[3].split(',').map(Number);
        
        // Test: Output the first level data
        console.log("Array Data: ",firstLevelData);
    }
}

