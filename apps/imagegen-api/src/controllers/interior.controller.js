import Replicate from "replicate";

const generateImage = async (req, res) => {
  console.log("Starting gen");
  try {
    const {prompt, refImageUrl} = req.body;

    if (!prompt || typeof prompt !== 'string' || !refImageUrl || typeof refImageUrl !== 'string') {
      console.log("Invalid request.")
      return res.status(400).json({message: "Invalid request."});
    }

    const replicate = new Replicate();
    // const [output] = await replicate.run(
    //   "black-forest-labs/flux-schnell",
    //   {
    //     input: {
    //       prompt
    //     },
    //   }
    // );

    const output = await replicate.run(
      "jschoormans/comfyui-interior-remodel:2a360362540e1f6cfe59c9db4aa8aa9059233d40e638aae0cdeb6b41f3d0dcce",
      {
        input: {
          image: refImageUrl,
          prompt: "photo of a beautiful room, cozy, high resolution, highly detailed, " + prompt,
          output_format: "png",
          output_quality: 80,
          negative_prompt: "blurry, illustration, distorted, horror, lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly",
          randomise_seeds: true,
          return_temp_files: false
        }
      }
    );

    console.log("Received gen");
    // To stream the file back to a browser:
    // let a = await output;
    // res.setHeader('Content-Type', 'image/webp');
    // for (const [index, item] of Object.entries(output)) {
    //   await writeFile(`./output_${index}.webp`, item);
    // }
    // res.send('done');
    const result = await output[0].blob();

    res.setHeader('Content-Type', 'application/octet-stream');
    res.type(result.type)
    result.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf))
    });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., return a 500 status code
    return res.status(500).json({message: "Image generation failed"});
  }
};

export default {
  generateImage,
};
