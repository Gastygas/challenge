import { useState, useEffect } from "react";
import axios from "axios";

export const EmployeeForm = () => {
    const [form, setForm] = useState({
        name: "",
        last_name: "",
        dni: "",
        birthdate: "",
        is_developer: false,
        about: "",
        area_id: "",
    });

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACK_URL}/areas`).then((res) => {
            setAreas(res.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BACK_URL}/workers`, form);
        alert("Empleado registrado");
        setForm({
            name: "",
            last_name: "",
            dni: "",
            birthdate: "",
            is_developer: false,
            about: "",
            area_id: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="w-full p-2 border" required />
            <input name="last_name" placeholder="Apellido" value={form.last_name} onChange={handleChange} className="w-full p-2 border" required />
            <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="w-full p-2 border" required />
            <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} className="w-full p-2 border" required />
            <textarea name="about" placeholder="Descripción" value={form.about} onChange={handleChange} className="w-full p-2 border" />
            <label className="flex items-center gap-2">
                <input type="checkbox" name="is_developer" checked={form.is_developer} onChange={handleChange} />
                ¿Es desarrollador?
            </label>
            <select name="area_id" value={form.area_id} onChange={handleChange} className="w-full p-2 border" required>
                <option value="">Seleccioná un área</option>
                {areas && areas.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Registrar</button>
        </form>
    );
};