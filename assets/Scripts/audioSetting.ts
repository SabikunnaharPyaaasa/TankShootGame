import { _decorator, AudioClip, AudioSource, Component, loader, Node, Slider, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioSetting')
export class audioSetting extends Component {
    static isSoundEnable: boolean = true;

    @property(AudioSource)
    gameAudio: AudioSource = null;

    static gameplayAudio: AudioSource = null;

    @property(Slider)
    volumeSlider: Slider = null;

    @property(Node)
    settingIcon: Node = null;

    @property(Node)
    volumeNode: Node = null;

    newValue:number;
    isSliderEnable: Boolean = false;

     onLoad() {
        // Register a callback for the slider's value change event
        this.volumeSlider.node.on('slide', this.onVolumeChange, this);
        audioSetting.gameplayAudio = this.gameAudio;
    }

    start() {
        audioSetting.gameplayAudio.volume = audioSetting.getVolumeLevel();
        this.volumeSlider.progress = audioSetting.getVolumeLevel();
       // const currentVolume = audioSetting.getVolumeLevel();
        audioSetting.gameplayAudio.play();
        this.volumeNode.active = false;
        this.onTouchListener();
        
        console.log("audio not playing", audioSetting.getVolumeLevel());
    }

    onVolumeChange() {
        // Update the audio source volume based on the slider's value
        audioSetting.gameplayAudio.volume = this.volumeSlider.progress;
        audioSetting.setVolumeLevel(audioSetting.gameplayAudio.volume);
        audioSetting.getVolumeLevel();
    }

    static muteSound()
    {
        audioSetting.gameplayAudio.volume = 0;
    }

    static unmuteSound()
    {
        audioSetting.gameplayAudio.volume = audioSetting.getVolumeLevel();
        audioSetting.setVolumeLevel(audioSetting.getVolumeLevel());
    }

    onTouchListener()
    {
        this.settingIcon.on(Node.EventType.TOUCH_START, (event) =>
        {
            if(this.isSliderEnable==false)
            {
                this.volumeNode.active = true;
                this.isSliderEnable = true;
                return;
            }
            if(this.isSliderEnable==true)
            {
                this.volumeNode.active = false;
                this.isSliderEnable = false;
                return;
            }
        } )

        this.settingIcon.on(Node.EventType.TOUCH_END, (event) =>
        {
            
        } )    
    }

    static getVolumeLevel() :number
    {
        let volume = 1;
        const volumeLevelString = sys.localStorage.getItem("TankShoot_volumeLevel");
        if (volumeLevelString !== null && volumeLevelString !== undefined) {
            const volumeLevel= parseFloat(volumeLevelString);
    
            if (!isNaN(volumeLevel)) {
                console.log("Volume fixed", volumeLevel);
                volume = volumeLevel;
                
                //return this.levelData;
            }
            
        }
        else
            {
                this.setVolumeLevel(volume);
                console.log("Volume error");
            }
        
        return volume;
    }


    static setVolumeLevel(gameLevelData:number) 
    {
        let gameLevel = gameLevelData;
        sys.localStorage.setItem("TankShoot_volumeLevel", gameLevel.toString());
    }
    
    update(deltaTime: number) {
        
    }
}

