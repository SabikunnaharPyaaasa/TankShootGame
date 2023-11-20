import { _decorator, Component, Node } from 'cc';
import { audioSetting } from '../audioSetting';
//import gdsdk from 'gamedistribution-sdk'; 
const { ccclass, property } = _decorator;

@ccclass('GameDistribution')
export class GameDistribution extends Component {
    private isMuted: boolean = false;
    private isPaused: boolean = false;

    private static _instance: GameDistribution | null = null;

    static getInstance(): GameDistribution {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    start() {
        
        //this.GDShowAd();
    }

     // use this for initialization
     onLoad() {
        window["GD_OPTIONS"] = {
            "gameId": "e4a73e0423fd4bdf9fea2540bab79808",
            "onEvent": (event: any) => {
                switch (event.name) {
                    case "SDK_GAME_START":
                        // advertisement done, resume game logic and unmute audio
                        audioSetting.unmuteSound();
                        this.onSdkGameResume();
                        console.log("load Ad");
                        break;
                    case "SDK_GAME_PAUSE":
                        // pause game logic / mute audio
                        audioSetting.muteSound();
                        this.onSdkGamePause();
                        break;
                    case "SDK_GDPR_TRACKING":
                        // this event is triggered when your user doesn't want to be tracked
                        break;
                    case "SDK_GDPR_TARGETING":
                        // this event is triggered when your user doesn't want personalized targeting of ads and such
                        break;
                }
            },
        };

        (function (d: Document, s: string, id: string) {
            let js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); // Explicitly cast js to HTMLScriptElement
            // js = d.createElement(s);
            js.id = id;
            js.src = 'https://html5.api.gamedistribution.com/main.min.js';
            fjs.parentNode.insertBefore(js, fjs);
            console.log("GameDistribution SDK script added to the page.");
        }(document, 'script', 'gamedistribution-jssdk'));
    }

    // Event handler for SDK_GAME_PAUSE
    onSdkGamePause(): void {
        // Pause and mute the game when the SDK_GAME_PAUSE event is triggered
        this.pauseGame();
        this.muteGame();
    }

    // Event handler for SDK_GAME_RESUME
    onSdkGameResume(): void {
        // Resume and unmute the game when the SDK_GAME_RESUME event is triggered
        this.resumeGame();
        this.unmuteGame();
    }
    // Function to pause the game
    pauseGame(): void {
        // Your code to pause the game
        this.isPaused = true;
    }

    // Function to mute the game
    muteGame(): void {
        // Your code to mute the game
        this.isMuted = true;
    }

    // Function to resume the game
    resumeGame(): void {
        // Your code to resume the game
        this.isPaused = false;
    }

    // Function to unmute the game
    unmuteGame(): void {
        // Your code to unmute the game
        this.isMuted = false;
    }

    GDShowAd() {
    //     //const gdsdk = window['GD_OPTIONS'];
    //     //console.log("GDSDK",gdsdk);
        // if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
        //     console.log("ad show");
        //     gdsdk.showAd();
            
        // }
        // else {
        //     console.error("GameDistribution SDK not initialized or showAd function not available.");
        // }

        console.log("singleton");
         if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.showAd();
        }
     }

    update(deltaTime: number) {
        
    }
}

