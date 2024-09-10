'use client';
import './globals.css';
import { NewToDoForm } from "./_components/new-todo-form";
import { ToDoList } from "./_components/to-do-list";
import Loader from "./_components/Loader";
import { useState, useEffect, useRef } from 'react';
import { FaSquarePlus, FaUser } from "react-icons/fa6";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">To-Do List</h1>
          <UserButton />
        </div>
      </nav>

      {/* Main Content */}
      <div className="mt-[60px]"> {/* Adjust 'mt-[64px]' to match the height of your navbar */}
        <Authenticated>
          {/* Content for larger screens */}
          <div className="hidden lg:flex">
            <div className="w-1/2 bg-gray-100 p-4 shadow-lg">
              <ToDoList />
            </div>
            <div className="w-1/2 bg-gray-200 p-4 shadow-lg">
              <NewToDoForm />
            </div>
          </div>

          {/* Mobile floating button and sidebar */}
          <div className="lg:hidden">
            <ToDoList />

            {/* Floating button */}
            <button
              className="fixed bottom-5 right-5 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
              onClick={handleSidebarToggle}
            >
              <FaSquarePlus />
            </button>

            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="p-4">
                <button
                  className="text-red-500 mb-4"
                  onClick={handleSidebarToggle}
                >
                  Close
                </button>
                <NewToDoForm closeSidebar={closeSidebar} />
              </div>
            </div>
          </div>
        </Authenticated>

        <Unauthenticated>
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
        </Unauthenticated>

        <AuthLoading>
          <div className='relative min-h-screen flex items-center justify-center'>
            <Loader />
          </div>
        </AuthLoading>
      </div>
    </div>
  );
}

