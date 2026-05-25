import React from 'react';

const VideoSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 animate-pulse">
      <div className="aspect-video rounded-2xl bg-slate-200" />
      <div className="mt-4 h-3 w-24 rounded bg-slate-200" />
      <div className="mt-3 h-5 w-4/5 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-3/5 rounded bg-slate-200" />
      <div className="mt-5 h-2 w-full rounded bg-slate-100" />
    </div>
  );
};

export default VideoSkeleton;
