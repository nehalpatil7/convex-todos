import React from 'react';
import { FaSquarePlus, FaMicrochip } from "react-icons/fa6";

interface FloatingButtonsProps {
    onNewTodoClick: () => void;
    onAiToolClick: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onNewTodoClick, onAiToolClick }) => {
    return (
        <>
            {/* Floating button for New ToDo Form */}
            <button
                className="fixed bottom-5 right-[6rem] bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
                onClick={onNewTodoClick}
            >
                <FaSquarePlus />
            </button>

            {/* Floating button for AI Tool */}
            <button
                className="fixed bottom-5 right-5 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
                onClick={onAiToolClick}
            >
                <FaMicrochip />
            </button>
        </>
    );
};

export default FloatingButtons;
