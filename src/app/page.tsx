'use client';
import './globals.css';
import { NewToDoForm } from "./_components/new-todo-form";
import { ToDoList } from "./_components/to-do-list";
import Loader from "./_components/loader";
import { useState, useEffect, useRef } from 'react';
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from './_components/sidebar';
import { GenerateTodoForm } from './_components/generate-todos';
import FloatingButtons from './_components/floating-buttons';
import UnauthenticatedContent from './_components/unauth';


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleAiSidebarToggle = () => {
    setIsAiSidebarOpen(!isAiSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const closeAiSidebar = () => {
    setIsAiSidebarOpen(false);
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
              <hr className="my-4 border-gray-300" />
              <GenerateTodoForm />
            </div>
          </div>

          {/* Mobile floating button and sidebar */}
          <div className="lg:hidden">
            <div className='pt-4'>
              <ToDoList />
            </div>

            {/* Floating button for New ToDo Form */}
            <FloatingButtons
              onNewTodoClick={handleSidebarToggle}
              onAiToolClick={handleAiSidebarToggle}
            />

            {/* Sidebar for New ToDo Form */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
              <NewToDoForm closeSidebar={closeSidebar} />
            </Sidebar>

            {/* Sidebar for AI Tool */}
            <Sidebar isOpen={isAiSidebarOpen} onClose={closeAiSidebar}>
              <GenerateTodoForm closeAiSidebar={closeAiSidebar} />
            </Sidebar>
          </div>
        </Authenticated>

        <Unauthenticated>
          <UnauthenticatedContent />
        </Unauthenticated>

        <AuthLoading>
          <div className='relative min-h-screen flex items-center justify-center'>
            <Loader />
          </div>
        </AuthLoading>
      </div>
    </div>
  );
};

