import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt cannot be empty." }, { status: 400 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const modelVersion = "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996";

    const output = await replicate.run(modelVersion, {
      input: {
        prompt: prompt,
      },
    });

    const generatedCode = output.join("");

    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error("API Route Error:", error.message);
    return NextResponse.json({ error: "Failed to generate code." }, { status: 500 });
  }
}
