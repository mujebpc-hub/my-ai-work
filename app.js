const generateBtn =
document.getElementById("generateBtn");

const resultImage =
document.getElementById("resultImage");

const userInput =
document.getElementById("userInput");

const ratioSelect =
document.getElementById("ratioSelect");

const placeholder =
document.getElementById("placeholder");

/* YOUR HUGGING FACE TOKEN */

const API_TOKEN =
"APNA_NEW_TOKEN_YAHA_PASTE_KARO";

/* GENERATE IMAGE */

generateBtn.addEventListener("click", async()=>{

    const prompt =
    userInput.value;

    if(prompt === ""){

        alert("Enter Prompt");

        return;
    }

    generateBtn.innerText =
    "Generating...";

    generateBtn.disabled = true;

    resultImage.style.display =
    "none";

    placeholder.style.display =
    "flex";

    placeholder.innerHTML =
    "<h2>Generating AI Image...</h2>";

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

    try{

        const response = await fetch(

        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",

        {

            method:"POST",

            headers:{

                "Authorization":
                `Bearer ${API_TOKEN}`,

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                inputs:prompt,

                options:{
                    wait_for_model:true
                }

            })

        });

        if(!response.ok){

            throw new Error("Failed");

        }

        const blob =
        await response.blob();

        const imageUrl =
        URL.createObjectURL(blob);

        resultImage.src =
        imageUrl;

        resultImage.style.display =
        "block";

        placeholder.style.display =
        "none";

    }

    catch(error){

        console.log(error);

        placeholder.style.display =
        "flex";

        placeholder.innerHTML =
        "<h2>Image Generation Failed</h2>";

    }

    generateBtn.innerText =
    "Generate";

    generateBtn.disabled = false;

});

/* ENTER KEY */

userInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        generateBtn.click();

    }

});
