"use strict";
{
    window.addEventListener('DOMContentLoaded', function(){
        const btn_play = document.getElementById("btn_play");
        const btn_pause = document.getElementById("btn_pause");
        const btn_mute = document.getElementById("btn_mute");
        const slider_volume = document.getElementById("volume");
        const audioElement = document.querySelector("audio");
        
        audioElement.volume = slider_volume.value;

        btn_play.addEventListener("click", e => {
            audioElement.play();
          });
        
          btn_pause.addEventListener("click", e => {
            audioElement.pause();
          });
        
          btn_mute.addEventListener("click", e => {
        
            if( audioElement.muted ) {
              audioElement.muted = false;
              btn_mute.textContent = "消音";
            } else {
              audioElement.muted = true;
              btn_mute.textContent = "消音解除";
            }
          });
        
          slider_volume.addEventListener("input", e => {
            audioElement.volume = slider_volume.value;
          });
          btn_play.addEventListener("click", e => {
    audioElement.play();
  });

  btn_pause.addEventListener("click", e => {
    audioElement.pause();
  });

  btn_mute.addEventListener("click", e => {

    if( audioElement.muted ) {
      audioElement.muted = false;
      btn_mute.textContent = "消音";
    } else {
      audioElement.muted = true;
      btn_mute.textContent = "消音解除";
    }
  });

  slider_volume.addEventListener("input", e => {
    audioElement.volume = slider_volume.value;
  });
});
    // panelクラス
    // 各要素を取得してpanelクラスにつける
    class Panel{
        constructor(){

            this.panelCount = 0;

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

                panelsLeft--;

                if(panelsLeft === 0){
                    checkResult();
                    spin.classList.remove("inactive");
                    panelsLeft = 3;
                }
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
        isUnmatched(p1,p2){
            if(this.img.src !== p1.img.src && this.img.src !== p2.img.src){
                return true;    
            } else {
                return false;
            }
        }
        unmatch(){
            this.img.classList.add("unmatched");
        }
        match(){
            this.img.classList.add("match");
        }
        active(){
            this.img.classList.remove("unmatched");
            this.stop.classList.remove("inactive");
            this.stop.classList.remove("match");
        }
    }

    function checkResult(){
        if(panels[0].isUnmatched(panels[1],panels[2])){
            panels[0].unmatch();
        }else{
            panels[0].match()
        }
        if(panels[1].isUnmatched(panels[0],panels[2])){
            panels[1].unmatch();
        }else{
            panels[1].match()
        }
        if(panels[2].isUnmatched(panels[0],panels[1])){
            panels[2].unmatch();
        }else{
            panels[2].match()
        }
    }

    let panelsLeft = 3;
    
    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ]

    const spin = document.getElementById("spin");
    spin.addEventListener("click",()=>{
        if(spin.classList.contains("inactive")){
            return;
        }
        spin.classList.add("inactive");
        panels.forEach(panel => {
            panel.active();
            panel.spinImages();
        })
    })
}

//spinを複数回押すとstopも複数回押す必要がある
//stopを3回押しおわぅたらdisabledクラスを解除したい

//3枚のカードが揃ったら画像が大きくなるようにしたい
//逆に揃わなければ画像opacityを薄くしたい
