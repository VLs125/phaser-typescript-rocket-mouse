import Phaser from 'phaser';
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextureKeys from '~/consts/TextureKeys';
import LaserObstacle from '~/game/LaserObstacle';
import RocketMouse from '~/game/RocketMouse';

export default class Game extends Phaser.Scene
{
    private background!:Phaser.GameObjects.TileSprite;
    private mouseHole!:Phaser.GameObjects.Image;

    private window1!:Phaser.GameObjects.Image;
    private window2!:Phaser.GameObjects.Image;

    private bookcase1!: Phaser.GameObjects.Image;
    private bookcase2!: Phaser.GameObjects.Image;

    private bookcases:Phaser.GameObjects.Image[] = [];
    private windows:Phaser.GameObjects.Image[] = [];

    private laserObstacle!: LaserObstacle



    constructor(){
        super(SceneKeys.Game);
    }

    create(){
        
        const width = this.scale.width;
        const height = this.scale.height;

        this.laserObstacle = new LaserObstacle(this,900,100)

        this.add.existing(this.laserObstacle)

        this.background = this.add.tileSprite(0,0,width,height,TextureKeys.Background)
        .setOrigin(0,0)
        .setScrollFactor(0,0);

        this.window1 = this.add.image(
            Phaser.Math.Between(900,1300),
            200,
            TextureKeys.Window1
        );
        this.window2 = this.add.image(
            Phaser.Math.Between(1600,2000),
            200,
            TextureKeys.Window2
        );

        this.windows = [this.window1, this.window2];

        this.mouseHole = this.add.image(
         Phaser.Math.Between(900,1500),
         501,
         TextureKeys.MouseHole
     );
        this.bookcase1 = this.add.image(
            Phaser.Math.Between(2200,2700),
            580,
            TextureKeys.Bookcase1
        )
        .setOrigin(0.5,1);
        

        this.bookcase2 = this.add.image(
            Phaser.Math.Between(2900,3400),
            580,
            TextureKeys.Bookcase2
        )
        .setOrigin(0.5,1);


        this.bookcases = [this.bookcase1,this.bookcase2];

      const mouse = new RocketMouse(this,width * 0.5, height -30);
      this.add.existing(mouse);
    
        const body = mouse.body as Phaser.Physics.Arcade.Body;

        body.setCollideWorldBounds(true);
        body.setVelocityX(200); // ???????????????????????? ???????????????? ?????????????????????????? ?????? ??????????????

        this.cameras.main.startFollow(mouse) // ?????????????? ???????????? ?????????????????? ???? ???????????????? mouse
        this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER, height) // ?????????????????????????? ?????????????? ?????? ????????????

        this.physics.world.setBounds(
            0,0,
            Number.MAX_SAFE_INTEGER, height-30 //  
        )

        // this.add.image(0,0,'background')
        // .setOrigin(0,0);

    }
    private wrapMouseHole(){
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        if(this.mouseHole.x + this.mouseHole.width < scrollX){
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )
        }
    }

    private wrapBookcases(){
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;
        let width = this.bookcase1.width * 2;
        if (this.bookcase1.x + width < scrollX){
            this.bookcase1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );

            const overlap = this.windows.find(win=>{
                return Math.abs(this.bookcase1.x - win.x) <= this.bookcase1.width
            });
                this.bookcase1.visible = !overlap
        };

        width = this.bookcase2.width;
        if (this.bookcase2.x + width < scrollX){
            this.bookcase1.x = Phaser.Math.Between(
                this.bookcase1.x + width,
                this.bookcase1.x + width + 800

                
            );
            const overlap = this.windows.find(win=>{
                return Math.abs(this.bookcase2.x - win.x) <= this.bookcase2.width
            });
                this.bookcase2.visible = !overlap
        }
    }

    private wrapWindows(){
        const scrollx = this.cameras.main.scrollX;
        const rightEdge = scrollx + this.scale.width;

        let width = this.window1.width *2;

        if(this.window1.x + width < scrollx){
            this.window1.x = Phaser.Math.Between(
                rightEdge+width,
                rightEdge+width + 800
            )

            const overlap = this.bookcases.find(bc=>{
                return Math.abs(this.window1.x - bc.x) <= this.window1.width
            })
            this.window1.visible = !overlap
        }

        width = this.window2.width;
        if(this.window2.x + width < scrollx){
            this.window2.x = Phaser.Math.Between(
                this.window1.x+width,
                this.window1.x+width + 800
            );
        const overlap = this.bookcases.find(bc=>{
            return Math.abs(this.window2.x - bc.x) <= this.window2.width
        })
            this.window2.visible = !overlap

    }
}

private wrapLaserObtacle(){
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    const width = this.laserObstacle.width
    if(this.laserObstacle.x + width < scrollX){
        this.laserObstacle.x = Phaser.Math.Between(
            rightEdge + width,
            rightEdge + width + 1000
        );
        this.laserObstacle.y = Phaser.Math.Between(0,300);
    }
}

    update(t:number, dt:number){
        this.wrapMouseHole();

        this.wrapWindows();

        this.wrapBookcases();

        this.wrapLaserObtacle();

        this.background.setTilePosition(this.cameras.main.scrollX) // ?????????????????? ?????????????????? ????????????????????

       



    }
}