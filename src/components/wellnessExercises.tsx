import React, { useState, useEffect } from "react";

export const WellnessExercises: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<"In" | "Hold" | "Out" | "Pause">("Pause");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((t) => {
          const next = t + 1;
          // Box breathing: 4s inhale, 4s hold, 4s exhale, 4s pause
          if (next <= 4) setPhase("In");
          else if (next <= 8) setPhase("Hold");
          else if (next <= 12) setPhase("Out");
          else if (next <= 16) setPhase("Pause");

          return next > 16 ? 1 : next;
        });
      }, 1000);
    } else {
      setTimer(0);
      setPhase("Pause");
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
          Mindful Breathing
        </h2>
        <p className="text-slate-500 mb-12">
          Use the Box Breathing technique to calm your nervous system and
          refocus your mind.
        </p>

        <div className="relative flex items-center justify-center h-80">
          {/* Breathing Circle */}
          <div
            className={`absolute rounded-full transition-all duration-[4000ms] ease-linear bg-teal-100 ${
              isBreathing && phase === "In"
                ? "scale-[2.5] opacity-50"
                : isBreathing && phase === "Hold"
                  ? "scale-[2.5] opacity-50"
                  : isBreathing && phase === "Out"
                    ? "scale-100 opacity-20"
                    : "scale-100 opacity-20"
            }`}
            style={{ width: "100px", height: "100px" }}
          ></div>

          <div
            className={`rounded-full bg-teal-600 shadow-2xl shadow-teal-200 flex flex-col items-center justify-center text-white z-10 transition-all duration-[4000ms] ease-linear ${
              isBreathing && phase === "In"
                ? "scale-[2] w-40 h-40"
                : isBreathing && phase === "Hold"
                  ? "scale-[2] w-40 h-40"
                  : isBreathing && (phase === "Out" || phase === "Pause")
                    ? "scale-100 w-40 h-40"
                    : "w-40 h-40"
            }`}
          >
            <span className="text-2xl font-bold tracking-widest">
              {isBreathing ? phase : "Ready?"}
            </span>
            {isBreathing && (
              <span className="text-sm opacity-70 mt-1">{timer % 4 || 4}s</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className={`mt-12 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
            isBreathing
              ? "bg-white text-teal-600 border border-teal-100"
              : "bg-teal-600 text-white shadow-teal-100"
          }`}
        >
          {isBreathing ? "Stop Exercise" : "Start Box Breathing"}
        </button>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">
            Guided Journaling
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Writing helps organize thoughts and reduce stress. Try these prompts
            with Serenity.
          </p>
          <ul className="space-y-4">
            {[
              "What are three things I'm grateful for today?",
              "How did I handle a challenge recently?",
              "What does my ideal 'calm' look like?",
            ].map((prompt, i) => (
              <li
                key={i}
                className="flex items-start space-x-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic"
              >
                <span>"{prompt}"</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-teal-700 p-8 rounded-[2rem] text-white">
          <h3 className="text-xl font-serif font-bold mb-4">
            5-4-3-2-1 Grounding
          </h3>
          <p className="text-sm opacity-80 mb-6">
            A powerful technique to snap out of anxiety by engaging your senses.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-teal-600 pb-2">
              <span>
                5 things you can <strong>see</strong>
              </span>
              <span>👀</span>
            </div>
            <div className="flex justify-between border-b border-teal-600 pb-2">
              <span>
                4 things you can <strong>touch</strong>
              </span>
              <span>✋</span>
            </div>
            <div className="flex justify-between border-b border-teal-600 pb-2">
              <span>
                3 things you can <strong>hear</strong>
              </span>
              <span>👂</span>
            </div>
            <div className="flex justify-between border-b border-teal-600 pb-2">
              <span>
                2 things you can <strong>smell</strong>
              </span>
              <span>👃</span>
            </div>
            <div className="flex justify-between pb-2">
              <span>
                1 thing you can <strong>taste</strong>
              </span>
              <span>👅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
