import React from "react";

export default function CarCard({ car, onUpdate, onDelete }) {
  return (
    <div className="bg-teal-600 shadow-lg rounded-lg p-5 mb-5 flex flex-col items-start space-y-3 dark:bg-gray-900">
      <h3 className="text-xl font-semibold text-gray-100 dark:text-gray-100">
        {car.brand} {car.model}
      </h3>
      <p className="text-teal-200 dark:text-gray-400">Year: {car.year}</p>
      <div className="flex space-x-3">
        {onUpdate && (
          <button
            onClick={() => onUpdate(car.id)}
            className="bg-gray-100 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-200 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(car.id)}
            className="bg-gray-100 text-red-600 px-4 py-2 rounded-md hover:bg-teal-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
