import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}
