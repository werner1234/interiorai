import Replicate from "replicate";
import { writeFile } from "node:fs/promises";

const generateImage = async (req, res) => {
  console.log("Starting gen");
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: "Invalid prompt: Please provide a string." });
    }

    const replicate = new Replicate();
    const [output] = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt
        },
      }
    );
    const result = await output.blob();

    // await writeFile("./output.png", output);
    console.log("blob:  " + result); // Blob

    // res.setHeader('Content-Type', 'application/octet-stream');
    res.type(result.type)
    result.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf))
    });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., return a 500 status code
    return res.status(500).json({ message: "Image generation failed" });
  }
};

export default {
  generateImage,
};
