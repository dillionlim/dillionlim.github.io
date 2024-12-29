import React from "react";

type TimelineNodeProps = {
  isLeft: boolean;
};

const TimelineNode = ({ isLeft }: TimelineNodeProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white relative z-10" />
      <div 
        className={`absolute h-[2px] w-[8rem] bg-gray-200 ${
          isLeft ? 'right-1/2' : 'left-1/2'
        }`}
      />
    </div>
  );
};

export default TimelineNode;