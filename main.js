"use strict";
{
    // panelクラス
    // 各要素を取得してpanelクラスにつける
    class Panel{
        constructor(){
            
            // panel作成時にまずは何を持っている？
            //3枚のimg/cardを持つsectionを3つ含んでいる
            const main = document.getElementById("panel");
            const section = document.createElement("section");
            section.classList.add("card");
            this.div = document.createElement("div");
            this.div.classList.add("img");
            this.img = document.createElement("img");
            this.img.src = this.getRandomImages();

            this.timeoutId = undefined;
            
            this.stop = document.createElement("p");
            this.stop.textContent = "STOP"

            this.stop.addEventListener("click",()=>{
                clearTimeout(this.timeoutId);
            });
            
            this.div.appendChild(this.img);
            section.appendChild(this.div);
            section.appendChild(this.stop);
            main.appendChild(section);

            
        }
        getRandomImages(){
            //画像3種類の配列を作ってそこからランダムに1枚選択する
            const images = [
                "./img/lucci.png",
                "./img/Lufy.png",
                "./img/nami.png",
            ]
            return images[Math.floor(Math.random()*images.length)];
        }
        spinImages(){
            this.img.src = this.getRandomImages();
            this.timeoutId = setTimeout(()=>{
                this.spinImages();
            },50);
        }
    }

    // let img;

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ]

    const spin = document.getElementById("spin");
    spin.addEventListener("click",()=>{
        panels.forEach(panel => {
            panel.spinImages();
        })
    })
}