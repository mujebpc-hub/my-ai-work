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

generateBtn.addEventListener("click", async () => {

    const prompt = userInput.value;

    if (!prompt) {
        alert("Please enter a prompt");
        return;
    }

    placeholder.style.display = "flex";

    resultImage.style.display = "none";

    try {

        const response = await fetch(
            "http://localhost:3000/generate-image",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    prompt,
                    ratio: ratioSelect.value
                })
            }
        );

        const data = await response.json();

        if (data.imageUrl) {

            resultImage.src = data.imageUrl;

            resultImage.style.display = "block";

            placeholder.style.display = "none";

            downloadBtn.href = data.imageUrl;
        }

        else {

            placeholder.innerHTML =
            "Image Generation Failed";
        }

    }

    catch (error) {

        console.log(error);

        placeholder.innerHTML =
        "Failed to fetch";
    }
});
