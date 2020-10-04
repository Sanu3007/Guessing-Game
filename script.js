const msgEl=document.getElementById('msg')

let chance=5
msgEl.innerHTML=`<h2 class="chance">Total Chances::${chance}</h2>`
const number=getRandomNumber();
console.log('Number:',number)

window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

let recognition=new window.SpeechRecognition()

recognition.start();

const onSpeak=(e)=>{
    const msg=e.results[0][0].transcript;

    writeMsg(msg)
    checkNumber(msg)
}

function writeMsg(msg){
    msgEl.innerHTML=`
        <p>You said:${msg}</p>
    `
}

function checkNumber(msg){
    const num=+msg;
    if(Number.isNaN(num)){
        msgEl.innerHTML+=`
            <p>Not a valid number</p>
        `
        return;
    }
    if(num<0 || num>100){
        chance=chance-1;
        if(chance===0){
            document.body.innerHTML=`
                <h2>Better Luck Next Time!!</h2>
                <h3>Actual Number:: ${number}</h3>
                <button class="play-again" id="play-again">Play again</button>
            `
        }else{
            msgEl.innerHTML+=`
            <p>Number should be between 1-100</p>
            <h3>Chance left ::${chance}</h3>
        `
        }
       
        return;
    }
    if(num>number){
        chance=chance-1;
        if(chance===0){
            document.body.innerHTML=`
                <h2>Better Luck Next Time!!</h2>
                <h3>Actual Number:: ${number}</h3>
                <button class="play-again" id="play-again">Play again</button>
            `
        }else{
            msgEl.innerHTML+=`
            <p>GO LOWER</p>
            <h3>Chance left ::${chance}</h3>
        `
        }
        return;
        
    }
    if(num<number){
        chance=chance-1;
        if(chance===0){
            document.body.innerHTML=`
                <h2>Better Luck Next Time!!</h2>
                <h3>Actual Number:: ${number}</h3>
                <button class="play-again" id="play-again">Play again</button>
            `
        }else{
            msgEl.innerHTML+=`
            <p>GO HIGHER</p>
            <h3>Chance left ::${chance}</h3>
        `
        }
       
        return;
    }
    if(num==number){
        document.body.innerHTML=`
            <h2>Congrats! You win</h2>
            <button class="play-again" id="play-again">Play again</button>
        `
    }
}

document.body.addEventListener('click',e=>{
    if(e.target.id=='play-again'){
        window.location.reload()
    }
})

recognition.addEventListener('result',onSpeak)


recognition.addEventListener('end', () => recognition.start());

function getRandomNumber(){
    return Math.floor(Math.random()*100)+1;
}