"use client";

import GridLoader from "react-spinners/GridLoader";

const LoadingScreen = () => {
  return (
    <div className="m-auto flex min-h-screen w-full items-center justify-center ">
      <GridLoader color="#2563eb" />
    </div>
  );
};

export default LoadingScreen;
