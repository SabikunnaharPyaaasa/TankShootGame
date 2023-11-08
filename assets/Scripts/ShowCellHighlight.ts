import { _decorator, Component, Node, Sprite, Contact2DType, Collider2D, IPhysics2DContact} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowCellHighlight')

export class ShowCellHighlight extends Component {
 
    @property(Sprite) cellHighlight : Sprite = null;

    Start()
    {
     
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        // Called when a collision begins
        // Handle the collision here
        console.log("detected");
        //const touchNodeBoundingBox = this.node.getBoundingBox(); 
    }
    
    // onCollisionEnter(otherCollider, selfCollider) {

    //     console.log("detected");
        
    //     //otherCollider.node.destroy();
    // }

    update(deltaTime: number) {
        
    }
}

