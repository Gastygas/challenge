import { useState, useEffect } from "react";
import { createWorker, getAllAreas } from "../services/api";
import { EmployeeForm } from "../components/EmployeeForm";
import { toast } from "react-hot-toast";
import { validateDni, validateNameAndLastName } from "../helpers/validations";


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

    const initialDirty = {
        name: false,
        last_name: false,
        dni: false,
        birthdate: false,
        is_developer: false,
        about: false,
        area_id: false,
    }

    const [form, setForm] = useState(initialData);
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState(initialData);
    const [dirty, setDirty] = useState(initialDirty);


    useEffect(() => {
        getAllAreas()
            .then((areasArray) => setAreas(areasArray))
            .catch((err) => toast.error(err.message || "Error al cargar empleados"))
    }, []);

    const handleChange = (e) => {
        setDirty({ ...dirty, [e.target.name]: true });;
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

    useEffect(() => {
        setError({
            name: validateNameAndLastName(form.name),
            last_name: validateNameAndLastName(form.name),
            dni: validateDni(form.dni)
        })
    },[form])
    return (
        <div className="min-h-screen w-full p-12">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold">Dar alta a nuevo empleado</h2>
            </div>
            <EmployeeForm dirty={dirty} error={error} handleCleanForm={handleCleanForm} handleChange={handleChange} handleSubmit={handleSubmit} form={form} areas={areas} />
        </div>
    )
}

export default Form;