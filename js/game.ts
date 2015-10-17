class Game {
    fps : number;
    entities : Rect[];
    canvas;
    context;
    mouseX : number;
    mouseY : number;

    constructor() {
        this.fps = 50;
        this.entities = [];
        this.canvas = document.getElementById("viewport");
        this.context = this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
        var that = this;
        this.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(that.canvas, evt);
            that.mouseX = mousePos.x;
            that.mouseY = mousePos.y;
        }, false);
    }

    draw(mouse) {
        this.context.clearRect(0, 0, 640, 480);

        for (var i=0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
        this.context.fillText(this.mouseX,  30, 30);
        this.context.fillText(this.mouseY,  30, 40);
    }

    update(mouse) {
        for (var i=0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    addRect() {
        this.entities.push(new Rect());
    }

}

var game = new Game();


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//var Game = {};
//
//Game.fps = 50;
//
//Game.initialize = function() {
//    this.entities = [];
//    this.canvas = document.getElementById("viewport");
//    this.context = this.canvas.getContext("2d");
//    this.mouseX = 0;
//    this.mouseY = 0;
//
//    var that = this;
//    this.canvas.addEventListener('mousemove', function(evt) {
//        var mousePos = getMousePos(that.canvas, evt);
//        that.mouseX = mousePos.x;
//        that.mouseY = mousePos.y;
//    }, false);
//};
//
//Game.draw = function(mouse) {
//    this.context.clearRect(0, 0, 640, 480);
//
//    for (var i=0; i < this.entities.length; i++) {
//        this.entities[i].draw(this.context);
//    }
//    this.context.fillText(this.mouseX,  30, 30);
//    this.context.fillText(this.mouseY,  30, 40);
//};
//
//Game.update = function(mouse) {
//    for (var i=0; i < this.entities.length; i++) {
//        this.entities[i].update();
//    }
//};
//
//Game.addRect = function() {
//    Game.entities.push(new Rect());
//};
//
//function getMousePos(canvas, evt) {
//    var rect = canvas.getBoundingClientRect();
//    return {
//        x: evt.clientX - rect.left,
//        y: evt.clientY - rect.top
//    };
//}