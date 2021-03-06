import Phaser from 'phaser'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		}
	},
	scale:{
		mode:Phaser.Scale.FIT,
		autoCenter:Phaser.Scale.CENTER_BOTH
	},
	scene: [Preloader,Game]
}

export default new Phaser.Game(config)
