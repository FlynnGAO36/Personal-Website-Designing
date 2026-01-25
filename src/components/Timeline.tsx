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
    
    <div className="py-20 bg-slate-50/50 border-4 border-red-500">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Study in Melbourne</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          {timelineData.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* 圆点 */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-3 h-3 bg-current rounded-full"></div>
              </div>
              
              {/* 卡片内容 */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <time className="font-mono text-sm text-blue-600 font-semibold">{item.date}</time>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-slate-600 mt-2 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}