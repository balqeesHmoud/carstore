import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import useResource from '../hooks/useResource';

export default function AddCarForm() {
    const { createResource } = useResource();
    const { tokens } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        image: '' // Include image field if needed
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newCar = {
            ...formData,
            owner: tokens.user_id, // Use owner ID from tokens
        };

        try {
            await createResource(newCar);
            setFormData({ make: '', model: '', year: '', image: '' }); // Reset form
        } catch (err) {
            setError('Failed to add car');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white max-w-lg mx-auto rounded-lg shadow-md">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Add a New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Brand:</label>
                    <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Model:</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Year:</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-white focus:outline-none ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                >
                    {loading ? 'Adding...' : 'Add Car'}
                </button>
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
}
