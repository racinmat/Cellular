/// <reference path="references.ts"/>

class Game {


    button1 : Phaser.Button;
    button2 : Phaser.Button;
    button4 : Phaser.Button;
    button3 : Phaser.Button;
    game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    preload() {
        this.game.load.image('yellow', 'images/yellow.png');
        this.game.load.image('brown', 'images/brown.png');
        this.game.load.image('red', 'images/red.png');
        this.game.load.image('blue', 'images/blue.png');
    }

    create() {
        this.button1 = this.game.add.button(100, 100, 'yellow', Square.click, this);
        this.button2 = this.game.add.button(300, 100, 'brown', Square.click, this);
        this.button3 = this.game.add.button(500, 100, 'red', Square.click, this);
        this.button4 = this.game.add.button(100, 300, 'blue', Square.click, this);
    }

}

window.onload = () => {

    var game = new Game();

};