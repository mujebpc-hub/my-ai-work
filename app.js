const sendBtn = document.getElementById("sendBtn");

const imageBtn = document.getElementById("imageBtn");

const newChatBtn = document.getElementById("newChatBtn");

const userInput = document.getElementById("userInput");

const chatBox = document.getElementById("chatBox");

/* AI BRAIN */

const brain = {

    hello:"Hello 👋 I Am MyGPT",

    hi:"Hi User 👋",

    who:"I Am Your AI Assistant",

    ai:"Artificial Intelligence Is Powerful",

    coding:"Coding Builds Amazing Things",

    html:"HTML Creates Website Structure",

    css:"CSS Makes Websites Beautiful",

    javascript:"JavaScript Adds Interaction",

    movie:"Movies Are Amazing",

    image:"I Can Generate Pixel Images",

    help:"I Can Chat With You"

};

/* ADD MESSAGE */

function addMessage(text,type){

    const div = document.createElement("div");

    div.classList.add("message");

    div.classList.add(type);

    div.innerText = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

/* AI REPLY */

function aiReply(message){

    message = message.toLowerCase();

    let answer = "I Am Learning More Things";

    for(let key in brain){

        if(message.includes(key)){

            answer = brain[key];

        }

    }

    return answer;
}

/* SEND MESSAGE */

function sendMessage(){

    const message = userInput.value;

    if(message === ""){

        return;

    }

    addMessage(message,"user");

    userInput.value = "";

    setTimeout(()=>{

        const reply = aiReply(message);

        addMessage(reply,"ai");

    },500);
}

/* SEND BUTTON */

sendBtn.addEventListener("click",()=>{

    sendMessage();

});

/* ENTER */

userInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        sendMessage();

    }

});

/* NEW CHAT */

newChatBtn.addEventListener("click",()=>{

    chatBox.innerHTML = `

        <div class="welcome">

            <h1>Hello 👋</h1>

            <p>I Am MyGPT AI</p>

        </div>

    `;

});

/* PIXEL IMAGE GENERATOR */

imageBtn.addEventListener("click",()=>{

    const canvas = document.createElement("canvas");

    canvas.width = 16;

    canvas.height = 16;

    canvas.classList.add("pixelCanvas");

    const ctx = canvas.getContext("2d");

    for(let x=0;x<16;x++){

        for(let y=0;y<16;y++){

            const r = Math.random()*255;

            const g = Math.random()*255;

            const b = Math.random()*255;

            ctx.fillStyle = `rgb(${r},${g},${b})`;

            ctx.fillRect(x,y,1,1);

        }

    }

    chatBox.appendChild(canvas);

    chatBox.scrollTop = chatBox.scrollHeight;

});
