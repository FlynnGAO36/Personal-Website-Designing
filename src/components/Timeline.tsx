import React from 'react';

const timelineData = [
  {
    date: "Feb 2024",
    title: "Started Bachelor of Science (CS)",
    description: "Orientation week at Parkville campus. First encounter with COMP10001.",
  },
  {
    date: "July 2024",
    title: "First Major Project",
    description: "Built a Python-based data analyzer for the mid-year project.",
  },
  {
    date: "Dec 2027 (Expected)",
    title: "Graduation",
    description: "Completing my journey at Unimelb.",
  }
];

export function Timeline() {
  return (
    <div className="py-20 bg-slate-900/30 backdrop-blur-sm relative">
      {/* 背景光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          Study in Melbourne
        </h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500/50 before:to-transparent before:shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          
          {timelineData.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* 圆点 - 添加脉冲动画 */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-500/50 bg-slate-900 group-hover:border-fuchsia-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative">
                <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:bg-fuchsia-400 animate-pulse"></div>
                {/* 外层脉冲环 */}
                <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping opacity-75"></div>
              </div>
              
              {/* 卡片内容 */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-xl border border-purple-500/30 bg-slate-900/70 backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-fuchsia-500/50 transition-all duration-300">
                <time className="font-mono text-sm text-fuchsia-400 font-semibold">{item.date}</time>
                <h3 className="text-lg font-bold mt-1 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-purple-200/80 mt-2 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
