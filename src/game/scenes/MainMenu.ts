import { Scene, GameObjects } from 'phaser';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logo_tween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    init()
    {
        this.logo_tween = null;
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });

        EventBus.emit('current-scene-ready', this);
    }

    
    changeScene()
    {
        this.scene.start('Game');
    }

    moveLogo(callback: ({x, y}: {x: number, y: number}) => void)
    {
        if (this.logo_tween)
        {
            if (this.logo_tween.isPlaying())
            {
                this.logo_tween.pause();
            }
            else
            {
                this.logo_tween.play();
            }
        } else {

            this.logo_tween = this.tweens.add({
                targets: this.logo,
                y: 200,
                x: 600,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (callback) {
                        callback({ x: Math.floor(this.logo.x), y: Math.floor(this.logo.y) })
                    }
                }
            });
        }
    }
}
