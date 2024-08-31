import { useContext } from "react";
import { AuthContext } from "../context/auth";
import useSWR, { mutate } from "swr";
// Function to fetch the resource
async function fetchResource([url, tokens], config) {
    if (!tokens) {
        return;
    }
    try {
        const res = await fetch(url, config());
        if (!res.ok) {
            throw new Error('Failed to fetch resource');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
// useResource hook
export default function useResource() {
    const URL = process.env.NEXT_PUBLIC_URL + 'api/cars/';
    const { tokens, logout } = useContext(AuthContext);
    function config(method = 'GET', body = null) {
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens?.access}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        };
    }
    function handleError(error) {
        console.log(error);
        logout();
    }
    const { data, error } = useSWR([URL, tokens], (key) => fetchResource(key, config));
    // CREATE
    async function createResource(newCar) {
        try {
            const res = await fetch(URL, config('POST', newCar));
            if (!res.ok) {
                throw new Error('Failed to create resource');
            }
            const created = await res.json();
            // Update local data after creation
            mutate([URL, tokens]);
            return created;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
    // UPDATE
    async function updateResource(id, updatedCar) {
        try {
            const res = await fetch(`${URL}${id}/`, config('PUT', updatedCar));
            if (!res.ok) {
                throw new Error('Failed to update resource');
            }
            const updated = await res.json();
            // Update local data after update
            mutate([URL, tokens]);
            return updated;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
    // DELETE
    async function deleteResource(id) {
        try {
            const res = await fetch(`${URL}${id}/`, config('DELETE'));
            if (!res.ok) {
                throw new Error('Failed to delete resource');
            }
            mutate([URL, tokens]);
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
    return {
        resource: data,
        error,
        isLoading: !error && !data,
        isError: !!error,
        createResource,
        updateResource,
        deleteResource,
    };
}