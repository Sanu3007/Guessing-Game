const msgEl=document.getElementById('msg')
const heading=document.getElementById('main-heading')
const startGame=document.getElementById('btn')
// console.log(heading.innerText)
const message=new SpeechSynthesisUtterance()

startGame.addEventListener('click',(e)=>{
    startGame.style.display="none"
    setText(heading.innerText)
    speakText()
})


function setText(text){
    message.text=text;
    console.log(message)
}

function speakText(){
    speechSynthesis.speak(message)
}




let chance=5
let text=''


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
        text='Not a valid number'
        setText(text)
        speakText()
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
            text='Number should be between 1-100'
            setText(text)
            speakText()

            text=`You have only ${chance} chances left`
            setText(text)
            speakText()
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
            text='Please go  lower'
            setText(text)
            speakText()

            text=`You have only ${chance} chances left`
            setText(text)
            speakText()
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
            text=`Better luck next time`
            setText(text)
            speakText()
            text=`Actual number was ${number}`
            setText(text)
            speakText()
            
            document.body.innerHTML=`
                <h2>Better Luck Next Time!!</h2>
                <h3>Actual Number:: ${number}</h3>
                <button class="play-again" id="play-again">Play again</button>
            `
        }else{
            text='Please go higher'
            setText(text)
            speakText()

            text=`You have only ${chance} chances left`
            setText(text)
            speakText()

            msgEl.innerHTML+=`
            <p>GO HIGHER</p>
            <h3>Chance left ::${chance}</h3>
        `
        }
       
        return;
    }
    if(num==number){
        text='Congratulations !! You won the game'
        setText(text)
        speakText()
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