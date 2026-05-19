const generateBtn =
document.getElementById("generateBtn");

const resultImage =
document.getElementById("resultImage");

const userInput =
document.getElementById("userInput");

const ratioSelect =
document.getElementById("ratioSelect");

/* YOUR HUGGING FACE TOKEN */

const API_TOKEN =
"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";

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

        const blob =
        await response.blob();

        const imageUrl =
        URL.createObjectURL(blob);

        resultImage.style.display =
        "block";

        resultImage.src =
        imageUrl;

    }

    catch(error){

        alert("Image Generation Failed");

        console.log(error);

    }

    generateBtn.innerText =
    "Generate Image";

});
