import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { FaTrash } from "react-icons/fa6";


export function ToDoList() {
    const todos = useQuery(api.functions.listTodos);

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto pl-3 pr-3">
            <ul className="space-y-2">
                {todos?.map(({ _id, title, description, completed }, index) => (
                    <ToDoItem
                        key={index}
                        id={_id}
                        title={title}
                        description={description}
                        completed={completed}
                    />
                ))}
            </ul>
        </div>
    )
}

function ToDoItem({ id, title, description, completed }: {
    id: Id<"todos">;
    title: string;
    description: string;
    completed: boolean;
}) {
    const updateTodo = useMutation(api.functions.updateTodo);
    const removeTodo = useMutation(api.functions.removeTodo);
    return (
        <li className="w-full items-center flex gap-2 border rounded p-2">
            <input
                type="checkbox"
                checked={completed}
                onChange={e => updateTodo({ id, completed: e.target.checked })}
            />
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="ml-auto">
                <button className="text-red-500" type="button" onClick={e => removeTodo({ id })}><FaTrash /></button>
            </div>
        </li>
    )
}