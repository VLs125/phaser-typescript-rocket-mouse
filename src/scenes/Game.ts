import Phaser from 'phaser';
import SceneKeys from '~/consts/SceneKeys';

export default class Game extends Phaser.Scene
{
    constructor(){
        super(SceneKeys.Game);
    }

    create(){
        
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.tileSprite(0,0,width,height,'background')
        .setOrigin(0);

        this.add.sprite(
            width*0.5,
            height*0.5,
            'rocket-mouse',
            'rocketmouse_flying01.png',
            
        )
        .play('rocket-mouse-run')

        // this.add.image(0,0,'background')
        // .setOrigin(0,0);

    }
}