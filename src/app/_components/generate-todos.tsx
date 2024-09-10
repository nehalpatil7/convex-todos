import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import Loader from "./loader";


export function GenerateTodoForm({ closeAiSidebar }: { closeAiSidebar?: () => void }) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const generateTodos = useAction(api.actions.generateTodos);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const todos = await generateTodos({ prompt });
            console.log("Todos generated.")
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setPrompt('');
            setLoading(false);

            if (closeAiSidebar) {
                closeAiSidebar();
            }
        }
    };

    return (
        <div className="lg:w-full mt-10 mb-20 flex justify-center self-center relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                    <Loader />
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <h3 className="pb-5 text-xl font-bold text-black">Generate todos with AI 🪄</h3>
                <div className="flex flex-col gap-2 lg:gap-6">
                    <div className="flex-1">
                        <label className="text-sm font-semibold" htmlFor="prompt">Prompt</label>
                        <input
                            className="p-1 border rounded w-full"
                            type="text"
                            name="prompt"
                            id="prompt"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                        />
                    </div>
                    <button className="bg-blue-500 p-1 rounded text-white w-full" type="submit">
                        Generate
                    </button>
                </div>
            </form>
        </div>
    );
};
