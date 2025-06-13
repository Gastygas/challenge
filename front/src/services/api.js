import axios from "axios"

export const disableOrEnableWorker = async (id) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACK_URL}/workers/status/${id}`);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "No se pudo dar de baja al empleado.");
        }

        return data;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al intentar dar de baja al empleado.";
        throw new Error(errorMsg);
    }
};

export const createWorker = async (newWorker) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/workers`,newWorker);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "No se pudo crear al empleado.");
        }

        return data;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al intentar crear al empleado.";
        throw new Error(errorMsg);
    }
};
export const modifyWorker = async (id,newWorker) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACK_URL}/workers/${id}`,newWorker);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "No se pudo modificar al empleado.");
        }

        return data;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al intentar modificar al empleado.";
        throw new Error(errorMsg);
    }
};

export const deleteWorker = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACK_URL}/workers/${id}`);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "No se pudo elimina al empleado.");
        }

        return data;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al intentar eliminar al empleado.";
        throw new Error(errorMsg);
    }
};

export const getAllWorkers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/workers`);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "No se pudieron obtener los empleados.");
        }

        return data.workers;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al obtener los empleados.";
        throw new Error(errorMsg);
    }
};


export const getAllAreas = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/areas`);
        const data = response.data;

        if (!data) {
            throw new Error(data.message || "No se pudieron obtener las areas.");
        }
        return data;
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || error.message || "Error al obtener las areas.";
        throw new Error(errorMsg);
    }
};