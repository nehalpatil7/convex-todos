import React from 'react';
import { SignInButton } from "@clerk/nextjs";
import { FaUser } from "react-icons/fa6";

const UnauthenticatedContent: React.FC = () => {
    return (
        <div className="relative flex h-screen overflow-hidden">
            {/* Left half with image */}
            <div className="w-full lg:w-1/2 max-h-screen h-full">
                <img
                    src="/images/todo.webp"
                    alt="To-Do List"
                    className="w-full h-full object-cover"
                />
                {/* Overlay content for small screens */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 lg:hidden">
                    <p className="text-gray-600 text-center mb-4">Please Sign In to continue</p>
                    <SignInButton>
                        <button className="flex items-center p-3 bg-blue-500 text-white rounded-full gap-2">
                            <span>Sign In</span>
                            <FaUser />
                        </button>
                    </SignInButton>
                </div>
            </div>

            {/* Right half with Sign In content on large screens */}
            <div className="hidden lg:flex w-1/2 h-full flex-col justify-center items-center p-10 bg-green-100">
                <p className="text-gray-600 text-center mb-4">Please Sign In to continue</p>
                <SignInButton>
                    <button className="flex items-center p-3 bg-blue-500 text-white rounded-full gap-2">
                        <span>Sign In</span>
                        <FaUser />
                    </button>
                </SignInButton>
            </div>
        </div>
    );
};

export default UnauthenticatedContent;
