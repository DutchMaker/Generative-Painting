const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

require('dotenv').config();

const app = express();
const port = 3000;

const paintings = [
  ["Mona Lisa", "Leonardo da Vinci"],
  ["Girl with a Pearl Earring", "Johannes Vermeer"],
  ["The Arnolfini Portrait", "Jan van Eyck"],
  ["American Gothic", "Grant Wood"],
  ["Portrait of Dr. Gachet", "Vincent van Gogh"],
  ["Napoleon Crossing the Alps", "Jacques-Louis David"],
  ["Self-Portrait", "Vincent van Gogh"],
  ["The Son of Man", "René Magritte"],
  ["The Milkmaid", "Johannes Vermeer"],
  ["Self-Portrait", "Rembrandt van Rijn"],
];

const generateImage = async () => {
  const randomPainting =
    paintings[Math.floor(Math.random() * paintings.length)];

  const prompt = `Generate a modern day reinterpretation of the famous painting "${randomPainting[0]}" by the artist "${randomPainting[1]}" in portrait aspect ratio (9:16). Make sure the picture uses all the available space in the generated image and there is no border, spacing, padding or picture frame around the image. There may also be no painting frame visible. The generated image must be a portrait and the subject is presented in upright position (vertically, never rotated 90 degrees on its side).`;
  const apiKey = process.env.OPENAI_API_KEY;

  console.log("Executing prompt:", prompt);

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          model: "dall-e-3",
          size: "1024x1792",
          n: 1,
        }),
      }
    );

    const data = await response.json();
    console.log("Response:", data);

    return data.data[0].url;
  } catch (error) {
    console.error("Error fetching image:", error);
  }

  return null;
};

const saveImage = async (url) => {
    const response = await axios({
        method: "GET",
        url: url,
        responseType: "stream",
    });
    
    const date = new Date();
    const timestamp = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    const publicPath = path.join("generated", `${timestamp}.png`);
    const filePath = path.resolve(__dirname, "public", publicPath);
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);

    console.log("Saved image to:", filePath);
    console.log("Public path:", publicPath);
    
    return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(`/${publicPath}`));
        writer.on("error", reject);
    });
};

app.use(express.static('public'));

app.get("/image", async (req, res) => {
  const imageUrl = await generateImage();

  if (imageUrl) {
    res.redirect(await saveImage(imageUrl));
  } else {
    res.redirect("/assets/error.webp")
  }
});

app.get

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
