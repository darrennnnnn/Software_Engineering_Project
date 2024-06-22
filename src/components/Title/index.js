import React from "react";

export default function Title() {
    return (
        <div
            className="min-h-[50vh] flex flex-col justify-center relative bg-cover bg-center"
            style={{
                backgroundColor: "#808080", // Gray background color
                backgroundImage: "linear-gradient(rgba(128, 128, 128, 0.5), rgba(128, 128, 128, 0.5)), url(/food.jpg)", // Gray overlay with 50% opacity
            }}
        >
            <h4 className="absolute top-4 left-1 text-xl font-semibold tracking-tight mx-20 text-white">
                Nutrizen
            </h4>
            <div className="flex-grow flex flex-col justify-center">
                <h1 className="text-white scroll-m-20 text-7xl font-extrabold tracking-tight mx-20">
                    Food Nutrition Scanner
                </h1>
            </div>
        </div>
    );
}
