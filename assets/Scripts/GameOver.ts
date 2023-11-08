import { _decorator, Component, director, game, instantiate, Label, Node, Prefab, sys, tween, Vec3 } from 'cc';
import { EnemyCell } from './EnemyCell';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {
    @property(Node) win_midst: Node = null;
    @property(Node) bg_win_resource_varian: Node = null;
    @property(Node) coin: Node = null;
    @property(Label) reward_status: Label = null;

    @property(Prefab) GamePlayScene: Prefab = null;
    
    
    start() {
        if(this.node.name=="Win")
        {
            this.loadWin();
        }
        else
        {
            this.loadLose();
        }
        EnemyCell.isTapEnable=true;
    }

    update(deltaTime: number) {
        
    }

    loadWin()
    {
        tween(this.win_midst)
        .to(0.5, {position: new Vec3(0,this.win_midst.getPosition().y,0)})
        .start();

        tween(this.bg_win_resource_varian)
        .by(0.5, { angle: 45 })
        .repeatForever()
        .start();

       // this.restartGame() ;
       console.log("node name",this.node.name);
    }

    loadLose()
    {
        this.reward_status.getComponent(Label).string = "Oppssss! You Lose";

        tween(this.win_midst)
        .to(0.5, {position: new Vec3(0,this.win_midst.getPosition().y,0)})
        .start();

        this.bg_win_resource_varian.active = false;
        this.coin.active = false;
    }

    quitGame() {
        if (sys.isNative) {
            // If the game is running on a native platform (e.g., mobile or desktop),
            // you can exit the game using the platform-specific method.
            game.end();
        } else {
            // If the game is running in a web browser, handle quitting accordingly.
            // You might show a confirmation dialog or navigate to another page.
            // For example, in a web game, you can redirect the player to your website's homepage.
            window.location.href = 'https://www.example.com';
        }
    }

    restartGame() {
        if (sys.isNative) {
            // If the game is running on a native platform, you can reload the current scene.
            //director.loadScene(director.getScene().name);
            const playAgain = instantiate(this.GamePlayScene);
            this.node.parent.addChild(playAgain);
            this.node.removeFromParent();
        } else {
            // If the game is running in a web browser, you might redirect to the game's homepage or reload the page.
            // Here's an example of reloading the current page:
            //window.location.reload();
            const playAgain = instantiate(this.GamePlayScene);
            this.node.parent.addChild(playAgain);
            this.node.removeFromParent();
        }
    }
}

