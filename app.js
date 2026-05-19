const generateBtn =
document.getElementById("generateBtn");

const resultImage =
document.getElementById("resultImage");

const userInput =
document.getElementById("userInput");

const ratioSelect =
document.getElementById("ratioSelect");

generateBtn.addEventListener("click",()=>{

const prompt =
userInput.value;

if(prompt === ""){

alert("Enter Prompt");

return;
}

let width = 512;
let height = 512;

if(ratioSelect.value === "landscape"){

width = 768;
height = 432;
}

if(ratioSelect.value === "portrait"){

width = 432;
height = 768;
}

resultImage.style.display = "block";

resultImage.src =
`https://picsum.photos/${width}/${height}?random=${Math.random()}`;

});
