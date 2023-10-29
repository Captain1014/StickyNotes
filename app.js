import { Point } from "./point.js";
import { Dialog } from "./dialog.js";

class App {
    constructor() {
        this.clickCount = 0;
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.mousePos = new Point();
        this.curItem = null;

        this.items = [];
        this.total = 100;
        for (let i = 0; i < this.total; i++) {
            this.items[i] = new Dialog();
        }
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);

         // Initialize click counter
         this.clickCount = 0;
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowBlur = 40;
        this.ctx.shadowColor = `rgba(0, 0, 0, 0.2)`;

        this.ctx.lineWidth = 2;

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].animate(this.ctx);
        }

        if(this.curItem) {
           
            this.ctx.fillStyle = `#ff4338`;
            this.ctx.strokeStyle = `#ff4338`;
        }
        this.ctx.beginPath();
       

    }

    onDown(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i].down(this.mousePos.clone());
            if (item) {
                this.curItem = item;
                const index = this.items.indexOf(item);
                this.items.push(this.items.splice(index, 1)[0]);
                break;
            }
        }

        // Increment the click counter
        this.clickCount++;

        // Check if the click count has reached 2
        if (this.clickCount >= 1) {
            // Display your text message here
            this.items.forEach(item => item.showText1 = true);
        }

        if (this.clickCount >= 2) {
            // Display your text message here
            this.items.forEach(item => item.showText2 = true);
        }

        if (this.clickCount >= 3) {
            // Display your text message here
            this.items.forEach(item => item.showText3 = true);
        }



    }

    onMove(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].move(this.mousePos.clone());
        }
    }

    onUp(e) {
        this.curItem = null;

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].up();
        }
    }

     // Helper function to display text
     displayText(message) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "24px Arial";
        this.ctx.fillText(message, this.stageWidth / 2, this.stageHeight / 2);
    }

  
}

new App();
