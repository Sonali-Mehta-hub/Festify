
import { pipeline } from "@huggingface/transformers";

const MODEL_NAME = "Xenova/multilingual-e5-small";

let extractor = null;

async function getExtractor() {
    if (!extractor) {
        console.log("1. Starting model initialization...");

        extractor = await pipeline(
            "feature-extraction",
            MODEL_NAME,
            {
                progress_callback: (progress) => {
                    console.log("Model status:", progress);
                }
            }
        );

        console.log("2. Model successfully loaded!");
    }

    return extractor;
}

export async function generateEmbedding(text, type = "document") {
    console.log("3. Starting embedding generation...");

    const model = await getExtractor();

    const prefix = type === "query" ? "query: " : "passage: ";

    const output = await model(prefix + text, {
        pooling: "mean",
        normalize: true
    });

    console.log("4. Embedding generated!");

    return Array.from(output.data);
}
