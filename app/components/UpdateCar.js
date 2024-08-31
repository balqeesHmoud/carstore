import { useState } from "react";
import useResource from "../hooks/useResource";
 
export default function UpdateCar({ car, onClose }) {
    const { updateResource } = useResource();
    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [year, setYear] = useState(car.year);
    const [isUpdating, setIsUpdating] = useState(false);
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsUpdating(true);
        try {
            await updateResource(car.id, { make, model, year });
            alert('Car updated successfully');
            onClose(); 
        } catch (error) {
            alert('Error updating car');
        } finally {
            setIsUpdating(false);
        }
    };
 
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
            <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Update Car</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Make:</label>
                        <input
                            type="text"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Model:</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Year:</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className={`px-4 py-2 rounded-md font-semibold text-white focus:outline-none ${
                                isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {isUpdating ? 'Updating...' : 'Update Car'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
 