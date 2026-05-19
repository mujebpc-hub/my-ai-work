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

/* TOKEN */

const API_TOKEN =
"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";

/* GENERATE IMAGE */

generateBtn.addEventListener("click", async()=>{

    const prompt =
    userInput.value.trim();

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
    masterpiece,
    8k,
    professional photography
    `;

    generateBtn.innerText =
    "Generating...";

    generateBtn.disabled = true;

    placeholder.style.display =
    "flex";

    placeholder.innerHTML = `
    <h2>Generating Image...</h2>
    <p>Please wait few seconds</p>
    <div class="loader"></div>
    `;

    resultImage.style.display =
    "none";

    downloadBtn.style.display =
    "none";

    let width = 1024;
    let height = 1024;

    /* IMAGE RATIO */

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

                inputs: enhancedPrompt

            })

        });

        /* CHECK ERROR */

        if(!response.ok){

            const errorText =
            await response.text();

            console.log(errorText);

            throw new Error("API Failed");
        }

        const blob =
        await response.blob();

        const imageUrl =
        URL.createObjectURL(blob);

        /* SHOW IMAGE */

        resultImage.src =
        imageUrl;

        resultImage.style.display =
        "block";

        placeholder.style.display =
        "none";

        /* DOWNLOAD BUTTON */

        downloadBtn.href =
        imageUrl;

        downloadBtn.style.display =
        "block";

    }

    catch(error){

        console.log(error);

        placeholder.style.display =
        "flex";

        placeholder.innerHTML = `
        <h2>Image Generation Failed</h2>
        <p>Model busy or token issue</p>
        `;
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
