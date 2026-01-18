import React from "react";
import { AppView } from "../types";
import { Icons } from "../constants";

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  setActiveView,
}) => {
  const navItems = [
    { view: AppView.CHAT, icon: <Icons.Chat />, label: "Companion" },
    { view: AppView.MOOD, icon: <Icons.Mood />, label: "Moods" },
    { view: AppView.WELLNESS, icon: <Icons.Wellness />, label: "Wellness" },
    { view: AppView.RESOURCES, icon: <Icons.Resources />, label: "Resources" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-8">
          <h1 className="text-3xl font-serif font-bold text-teal-700 tracking-tight">
            Serenity
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Wellness Companion
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex items-center space-x-3 w-full p-4 rounded-2xl transition-all duration-200 ${
                activeView === item.view
                  ? "bg-teal-50 text-teal-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <div
                className={
                  activeView === item.view ? "text-teal-600" : "text-slate-400"
                }
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="p-4 bg-teal-600 rounded-2xl text-white shadow-lg shadow-teal-200">
            <h3 className="text-sm font-bold mb-1">Daily Affirmation</h3>
            <p className="text-xs opacity-90 leading-relaxed italic">
              "I am at peace with who I am, and I'm growing every day."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100">
          <h1 className="text-2xl font-serif font-bold text-teal-700">
            Serenity
          </h1>
          <div className="p-2 bg-teal-50 rounded-full text-teal-600">
            <Icons.Mood />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          {children}
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 pb-6 z-50">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeView === item.view ? "text-teal-600" : "text-slate-400"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-semibold uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};
