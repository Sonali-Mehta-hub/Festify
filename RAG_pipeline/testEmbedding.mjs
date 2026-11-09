
import { generateEmbedding } from "./embedding.mjs";

async function testEmbedding() {
    try {
        console.log("Starting embedding test...");

        const embedding = await generateEmbedding(
            "Outdoor wedding venue with catering in Ranchi",
            "document"
        );

        console.log("SUCCESS!");
        console.log("Vector dimensions:", embedding.length);
        console.log("First 5 values:", embedding.slice(0, 5));

    } catch (error) {
        console.error("TEST FAILED!");
        console.error(error.stack || error);
        process.exitCode = 1;
    }
}

testEmbedding();
