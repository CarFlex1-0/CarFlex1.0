import React from 'react';
import TypingEffect from './TypingEffect';

const Suggestions = ({ suggestions }) => {
  const { carEnhancements = '', terrainAnalysis = '', weatherConditions = '' } = suggestions;

  return (
    <div className="flex space-x-4 mt-6">
      <div className="flex-1 p-4 shadow-xl rounded-lg bg-slate-700 border-b-2 border-t-2 border-gray-200/70 outline-none text-slate-200  focus:border-purple-400 transition duration-300">
        <h3 className="text-lg font-semibold mb-2 ">Car Enhancements</h3>
        <TypingEffect text={carEnhancements ? carEnhancements.replace(/(?:\d\.) /g, '\n$&') : "Loading..."} />
      </div>
      <div className="flex-1 p-4 shadow-xl rounded-lg bg-slate-700 border-b-2 border-t-2 border-gray-200/70 outline-none text-slate-200  focus:border-purple-400 transition duration-300">
        <h3 className="text-lg font-semibold mb-2">Terrain Analysis</h3>
        <TypingEffect text={terrainAnalysis || "Loading..."} />
      </div>
      <div className="flex-1 p-4 shadow-xl rounded-lg bg-slate-700 border-b-2 border-t-2 border-gray-200/70 outline-none text-slate-200  focus:border-purple-400 transition duration-300">
        <h3 className="text-lg font-semibold mb-2">Weather Conditions</h3>
        <TypingEffect text={weatherConditions || "Loading..."} />
      </div>
    </div>
  );
};

export default Suggestions;
