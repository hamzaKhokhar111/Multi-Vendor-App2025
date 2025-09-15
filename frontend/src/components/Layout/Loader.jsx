import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-18 h-18 border-8 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
