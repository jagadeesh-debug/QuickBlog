'use client'; // only needed in App Router

import { useState } from 'react';

export default function Blogs() {
  const tabs = ['All', 'Technology', 'StartUp', 'LifeStyle', 'Finance'];
  const [hovered, setHovered] = useState<number | null>(0); // default to first tab

  return (
    <div className="w-screen flex flex-col items-center px-2  -mt-22 ">
      <div className="hidden sm:block w-1/2 relative p-1 overflow-hidden text-sm text-center ">
        {/* Sliding background that follows hover without reset */}
        <div
          className="absolute  h-8 bg-[#5044E5] rounded-full z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * (hovered ?? 0)}%`,
            opacity: hovered !== null ? 1 : 0,
          }}
        />

        <div className="flex justify-between relative z-10">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`w-1/6 py-2 text-center cursor-pointer transition-all duration-300 ${
                hovered === idx ? 'text-white' : 'text-black hover:text-[#5044E5]'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Blog section placeholder */}
      <div className="w-full flex justify-center mt-6">
      </div>
    </div>
  );
}
