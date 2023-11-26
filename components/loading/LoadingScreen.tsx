'use client'

import GridLoader from "react-spinners/GridLoader";

const LoadingScreen = () => {
    return (
        <div className="h-full w-full flex justify-center items-center m-auto ">
            <GridLoader color="#36d7b7" />
        </div>
    )
}

export default LoadingScreen