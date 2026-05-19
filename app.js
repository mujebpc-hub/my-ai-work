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

/* YOUR TOKEN */

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

    placeholder.innerHTML =
    "<h2>Generating Image...</h2>";

    resultImage.style.display =
    "none";

    let width = 1024;
    let height = 1024;

    /* RATIO */

    if(ratioSelect.value === "landscape"){

        width = 1280;
        height = 720;
    }

    if(ratioSelect.value === "portrait"){

        width = 720;
        height = 1280;
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

                parameters:{

                    width:width,
                    height:height,

                    guidance_scale:7.5,

                    num_inference_steps:30

                },

                options:{
                    wait_for_model:true
                }

            })

        });

        /* ERROR CHECK */

        if(!response.ok){

            throw new Error(
            "API Error");
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

});

/* ENTER KEY */

userInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        generateBtn.click();
    }

});
