import React from "react";
import { CRISIS_RESOURCES } from "../constants";

export const Resources: React.FC = () => {
  return (
    <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
          Support & Resources
        </h2>
        <p className="text-slate-500">
          Serenity is here to support you, but professional help is invaluable.
          If you are in immediate danger, please contact emergency services or
          use the resources below.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {CRISIS_RESOURCES.map((resource, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {resource.name}
            </h3>
            <p className="text-2xl font-serif font-bold text-teal-700 mb-3">
              {resource.contact}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {resource.description}
            </p>
          </div>
        ))}
      </div>

      <section className="bg-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-serif font-bold">
              Seeking Professional Help
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Talking to a licensed therapist can provide personalized tools and
              coping strategies. Modern therapy is accessible through video,
              text, or in-person sessions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </div>
                <p className="text-sm">
                  Check your insurance directory for local providers.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </div>
                <p className="text-sm">
                  Explore online platforms like BetterHelp or Talkspace.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </div>
                <p className="text-sm">
                  Speak with your primary care doctor about mental health
                  referrals.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-64 h-64 bg-slate-700 rounded-3xl overflow-hidden">
            <img
              src="https://picsum.photos/seed/therapy/400/400"
              alt="Support"
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
