import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// read one prompt
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch "), { status: 500 });
  }
};

// updating the prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch "), { status: 500 });
  }
};

// deleting the prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch "), { status: 500 });
  }
};
