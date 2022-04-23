function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

console.log(refs.startBtn);
console.log(refs.stopBtn);

refs.startBtn.addEventListener('click', () => {
    console.log('start');
    refs.startBtn.setAttribute('disabled', true);
    chengColor.start();
});

refs.stopBtn.addEventListener('click', () => {
    console.log('stop');
    refs.startBtn.removeAttribute('disabled');
    chengColor.stop();
});

const chengColor = {
    intervaId: null,
    // isActive: false,

    start() {
        // if (this.isActive) {
        //     return;
        // }
        // this.isActive = true;
        
        this.intervaId = setInterval(() => {
            const bodyColor = document.body.style.background = getRandomHexColor();
            console.log(`color hex:${bodyColor}`);
        }, 1000);
    },   
    
    stop() {
        clearInterval(this.intervaId);
        // this.isActive = false;
    },
}









