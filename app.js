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

/* API TOKEN */

const API_TOKEN =
"YOUR_HUGGINGFACE_TOKEN";

/* GENERATE IMAGE */

generateBtn.addEventListener("click", async () => {

    const prompt =
    userInput.value.trim();

    /* EMPTY PROMPT */

    if(prompt === ""){

        alert("Enter Prompt");
        return;
    }

    /* PROMPT ENHANCER */

    let enhancedPrompt = `
    ${prompt},
    ultra realistic,
    cinematic lighting,
    highly detailed,
    masterpiece,
    8k,
    professional photography
    `;

    /* BUTTON STATE */

    generateBtn.innerText =
    "Generating...";

    generateBtn.disabled =
    true;

    /* SHOW LOADER */

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

    /* IMAGE SIZE */

    let width = 1024;
    let height = 1024;

    if(ratioSelect.value === "landscape"){

        width = 1280;
        height = 720;
    }

    if(ratioSelect.value === "portrait"){

        width = 720;
        height = 1280;
    }

    try{

        /* API REQUEST */

        const response = await fetch(

        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",

        {

            method:"POST",

            headers:{

                "Authorization":
                `Bearer ${API_TOKEN}`,

                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                inputs: enhancedPrompt,

                parameters:{
                    width: width,
                    height: height
                },

                options:{
                    wait_for_model:true
                }

            })

        });

        /* RESPONSE ERROR */

        if(!response.ok){

            const errorText =
            await response.text();

            console.log(errorText);

            throw new Error(
            "API Failed"
            );
        }

        /* CHECK JSON ERROR */

        const contentType =
        response.headers.get(
        "content-type"
        );

        if(contentType &&
        contentType.includes(
        "application/json")){

            const errorData =
            await response.json();

            console.log(errorData);

            throw new Error(
            errorData.error ||
            "Model Error"
            );
        }

        /* GET IMAGE */

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

        /* DOWNLOAD */

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

        <p>
        ${error.message}
        </p>

        `;
    }

    /* RESET BUTTON */

    generateBtn.innerText =
    "Generate";

    generateBtn.disabled =
    false;

});

/* ENTER KEY SUPPORT */

userInput.addEventListener(
"keypress",
(e)=>{

    if(e.key === "Enter"){

        generateBtn.click();
    }

});
