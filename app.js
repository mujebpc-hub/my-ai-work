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

const downloadBtn =
document.getElementById("downloadBtn");

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

    /* AI PROMPT ENHANCER */

    let enhancedPrompt = `
    ${prompt},
    ultra realistic,
    cinematic lighting,
    highly detailed,
    8k quality,
    masterpiece,
    dramatic atmosphere,
    professional AI art
    `;

    generateBtn.innerText =
    "Generating...";

    placeholder.style.display =
    "flex";

    placeholder.innerHTML =
    `
    <h2>Generating Image...</h2>
    <div class="loader"></div>
    `;

    resultImage.style.display =
    "none";

    downloadBtn.style.display =
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

        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",

        {

            method:"POST",

            headers:{

                "Authorization":
                `Bearer ${API_TOKEN}`,

                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                inputs:enhancedPrompt,

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

        downloadBtn.href =
        imageUrl;

        downloadBtn.style.display =
        "block";

    }

    catch(error){

        console.log(error);

        placeholder.style.display =
        "flex";

        placeholder.innerHTML =
        `
        <h2>Image Generation Failed</h2>
        <p>Try Another Prompt</p>
        `;
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
