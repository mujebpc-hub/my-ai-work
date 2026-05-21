const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* FRONTEND */

app.use(express.static("./"));

/* HOME PAGE */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

/* IMAGE API */

app.post("/generate-image", async (req, res) => {

    try {

        console.log(process.env.HF_TOKEN);

        const prompt = req.body.prompt;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    inputs: prompt
                })
            }
        );

        if (!response.ok) {

            const errorText =
            await response.text();

            console.log(errorText);

            return res.status(500).json({
                error: "AI generation failed"
            });
        }

        const arrayBuffer =
        await response.arrayBuffer();

        const base64 =
        Buffer.from(arrayBuffer).toString("base64");

        const imageUrl =
        `data:image/png;base64,${base64}`;

        res.json({
            imageUrl
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server failed"
        });
    }
});

/* START SERVER */

app.listen(3000, () => {

    console.log("Server Running On Port 3000");
});
