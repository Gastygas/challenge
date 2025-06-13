import { useState, useEffect } from "react";
import { createWorker, getAllAreas } from "../services/api";
import { EmployeeForm } from "../components/EmployeeForm";
import { toast } from "react-hot-toast";


const Form = () => {
    const initialData = {
        name: "",
        last_name: "",
        dni: "",
        birthdate: "",
        is_developer: false,
        about: "",
        area_id: "",
    }

    const [form, setForm] = useState(initialData);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getAllAreas()
            .then((areasArray) => setAreas(areasArray))
            .catch((err) => toast.error(err.message || "Error al cargar empleados"))
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createWorker(form);
            toast.success("Empleado creado correctamente");
        } catch (error) {
            toast.error(error.message || "Error al crear al empleado");
        }
    };

    const handleCleanForm = (e) => {
        e.preventDefault()
        setForm(initialData)
    }
    return (
        <div className="min-h-screen w-full p-12">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold">Dar alta a nuevo empleado</h2>
            </div>
            <EmployeeForm handleCleanForm={handleCleanForm} handleChange={handleChange} handleSubmit={handleSubmit} form={form} areas={areas} />
        </div>
    )
}

export default Form;