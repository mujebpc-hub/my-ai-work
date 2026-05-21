const express = require("express");

const cors = require("cors");

const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

/* IMAGE GENERATION API */

app.post("/generate", async (req, res) => {

    try{

        const { prompt, width, height } = req.body;

        const enhancedPrompt = `
        ${prompt},
        ultra realistic,
        cinematic lighting,
        highly detailed,
        masterpiece,
        8k
        `;

        const response = await fetch(

        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",

        {

            method:"POST",

            headers:{

                "Authorization":
                `Bearer ${process.env.HF_TOKEN}`,

                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                inputs: enhancedPrompt,

                parameters:{
                    width,
                    height
                },

                options:{
                    wait_for_model:true
                }

            })

        });

        if(!response.ok){

            const error =
            await response.text();

            console.log(error);

            return res.status(500).json({

                error:"Image generation failed"

            });
        }

        const arrayBuffer =
        await response.arrayBuffer();

        const buffer =
        Buffer.from(arrayBuffer);

        res.set("Content-Type","image/png");

        res.send(buffer);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            error:"Server Error"

        });
    }

});

/* SERVER START */

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

    console.log(
    `Server running on port ${PORT}`
    );

});
