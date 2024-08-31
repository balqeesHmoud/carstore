import { useState } from "react";
import useResource from "../hooks/useResource";
import CarCard from "./CarCard";
import UpdateCar from "./UpdateCar";
import DeleteCar from "./DeleteCar";
 
export default function CarsList() {
    const { resource, isLoading, isError, updateResource, deleteResource } = useResource();
    const [editingCar, setEditingCar] = useState(null);
    const [deletingCarId, setDeletingCarId] = useState(null);
 
    if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load cars.</p>;
 
    const handleUpdate = (carId) => {
        const carToUpdate = resource.find(car => car.id === carId);
        setEditingCar(carToUpdate);
    };
 
    const handleDelete = (carId) => {
        setDeletingCarId(carId);
    };
 
    const closeUpdateForm = () => {
        setEditingCar(null);
    };
 
    const closeDeleteConfirmation = () => {
        setDeletingCarId(null);
    };
 
    return (
        <div className="p-8 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Car Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {resource?.length > 0 ? (
                    resource.map(car => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No cars available.</p>
                )}
            </div>
            {editingCar && (
                <UpdateCar
                    car={editingCar}
                    onClose={closeUpdateForm}
                    updateResource={updateResource}
                />
            )}
            {deletingCarId && (
                <DeleteCar
                    carId={deletingCarId}
                    onClose={closeDeleteConfirmation}
                    deleteResource={deleteResource}
                />
            )}
        </div>
    );
}
 
 