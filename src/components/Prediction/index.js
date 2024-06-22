"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Prediction() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProteins, setTotalProteins] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFibers, setTotalFibers] = useState(0);

    useEffect(() => {
        if (result && result.length > 0) {
            let newTotalCalories = 0;
            let newTotalProteins = 0;
            let newTotalFat = 0;
            let newTotalCarbs = 0;
            let newTotalFibers = 0;

            // Calculate total calories
            result.forEach((item) => {
                const { g_per_serving } = item.food[0].food_info;
                const { calories_100g } = item.food[0].food_info.nutrition;
                const { proteins_100g } = item.food[0].food_info.nutrition;
                const { fat_100g } = item.food[0].food_info.nutrition;
                const { carbs_100g } = item.food[0].food_info.nutrition;
                const { fibers_100g } = item.food[0].food_info.nutrition;

                const calculate_calories = Math.round(
                    (g_per_serving / 100) * calories_100g
                );
                newTotalCalories += calculate_calories;

                const calculate_proteins = Math.round(
                    (g_per_serving / 100) * proteins_100g
                );
                newTotalProteins += calculate_proteins;

                const calculate_fat = Math.round(
                    (g_per_serving / 100) * fat_100g
                );
                newTotalFat += calculate_fat;

                const calculate_carbs = Math.round(
                    (g_per_serving / 100) * carbs_100g
                );
                newTotalCarbs += calculate_carbs;

                const calculate_fibers = Math.round(
                    (g_per_serving / 100) * fibers_100g
                );
                newTotalFibers += calculate_fibers;

            });

            // Update total calories state
            setTotalCalories(newTotalCalories);
            setTotalProteins(newTotalProteins);
            setTotalFat(newTotalFat);
            setTotalCarbs(newTotalCarbs);
            setTotalFibers(newTotalFibers);
        } else {
            // If result is null or empty, reset total calories to 0
            setTotalCalories(0);
            setTotalProteins(0);
            setTotalFat(0);
            setTotalCarbs(0);
            setTotalFibers(0);
        }
    }, [result]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("image", selectedFile);

        setLoading(true);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setLoading(false);
            setResult(data.items);
            console.log(data.items);
        } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[50vh]">
            <div className="flex rounded shadow-md w-full h-full">
                <div className="w-1/2 h-full flex justify-center">
                    <form onSubmit={handleSubmit} className=" flex mx-8">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col items-center mr-10">
                                <div className="h-64 w-64 border-2 border-solid border-gray-300 p-6 rounded-md text-center text-black flex items-center justify-center mb-4">
                                    {!selectedFile ? (
                                        <p>
                                            Drag & Drop or select from your
                                            computer
                                        </p>
                                    ) : (
                                        <div className="text-center">
                                            {preview && (
                                                <img
                                                    src={preview}
                                                    alt="Selected"
                                                    className="w-full h-auto max-h-48 object-contain rounded-md mb-4"
                                                />
                                            )}
                                            <p>{selectedFile.name}</p>
                                        </div>
                                    )}
                                </div>
                                <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <p>Select Image</p>
                                </label>
                            </div>
                        </div>
                        <div className="justify-center items-center flex">
                            <button
                                type="submit"
                                className="bg-orange-950 text-white px-24 py-3 rounded"
                            >
                                Upload Image
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
                    {loading && <p className="mt-4 text-center">Loading...</p>}
                    {result && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-center text-black">
                                Analysis Result
                            </h2>
                            <div className="flex flex-col items-center justify-center">
                                <p className="bg-green-200 my-1 px-8 py-3">{totalCalories} Cal</p>
                                <p className="bg-red-200 my-1 px-8 py-3">Proteins: {totalProteins}g</p>
                                <p className="bg-yellow-200 my-1 px-8 py-3">Fat: {totalFat}g</p>
                                <p className="bg-blue-200 my-1 px-8 py-3">Carbs: {totalCarbs}g</p>
                                <p className="bg-orange-200 my-1 px-8 py-3">Fibers: {totalFibers}g</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
