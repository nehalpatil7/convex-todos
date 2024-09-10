import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function NewToDoForm({ closeSidebar }: { closeSidebar?: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createTodo = useMutation(api.functions.createTodo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTodo({ title, description });
        setTitle('');
        setDescription('');

        if (closeSidebar) {
            closeSidebar();
        }
    };

    return (
        <div className="lg:w-full mt-10 flex justify-center self-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <h3 className="pb-5 text-xl font-bold text-black">Add new todos:</h3>
                <div className="flex flex-col gap-2 lg:gap-6">
                    <div className="flex-1">
                        <label className="text-sm font-semibold" htmlFor="title">Title</label>
                        <input
                            className="p-1 border rounded w-full"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm font-semibold" htmlFor="description">Description</label>
                        <input
                            className="p-1 border rounded w-full"
                            type="text"
                            name="description"
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="bg-blue-500 p-1 rounded text-white w-full" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
