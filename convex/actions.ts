import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import OpenAI from "openai";
import { requireUser } from "./helpers";


if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("Error: OpenAI API key is not set.")
}
const openai = new OpenAI({
    baseURL: process.env.NEXT_PUBLIC_OPENROUTER_ENDPOINT,
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateTodos = action({
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);

        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
                        Generate a list of to-dos based on the given prompt.

                        Guidelines for generating to-dos:
                        1. Content: Include a title and description.
                        2. Count: Return a maximum of 5 todos.
                        3. Focus on Key Concepts: Identify and emphasize the most important tasks/information that the prompt specifies.
                        4. Title Length: Keep the title text length under 50 characters.
                        5. Description Length: Keep the description text length under 100 characters.

                        Return in the following JSON format:
                        {
                            "todos": [
                                {
                                    "title": str,
                                    "description": str
                                }
                            ]
                        }
                    `
                },
                {
                    role: "system",
                    content: `Prompt: ${args.prompt}`
                }
            ],
            response_format: { type: "json_object" }
        });
        const content = JSON.parse(response.choices[0].message.content!) as {
            todos: {title: string; description: string}[]
        };
        await ctx.runMutation(internal.functions.createManyTodos, {
            todos: content.todos,
            userId: user.tokenIdentifier,
        });
        return content.todos;
    }
});