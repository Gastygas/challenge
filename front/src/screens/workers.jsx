"use client"
import { useEffect, useState } from "react";
import { EmployeeList } from "../components/EmployeeList";
import { IoIosSearch } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { deleteWorker, disableOrEnableWorker, getAllAreas, getAllWorkers, modifyWorker } from "../services/api";
import { toast } from "react-hot-toast";
import SeeMore from "../components/SeeMore";
const Workers = () => {

    const [employees, setEmployees] = useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [areas, setAreas] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState("");



    useEffect(() => {
        getAllWorkers()
            .then((workers) => {
                setEmployees(workers);
            })
            .catch((err) => {
                toast.error(err.message || "Error al cargar empleados");
            });
        getAllAreas()
            .then((areasArray) => {
                setAreas(areasArray)
            })
            .catch((err) => {
                toast.error(err.message || "Error al cargar las areas")
            })
    }, []);

    const handleOpenEdit = (worker) => {
        setSelectedWorker(worker);
        setFormData(worker);
        setIsOpenEdit(true);
        setEditMode(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleConfirm = async () => {
        try {
            await modifyWorker(selectedWorker.id, { ...formData, area_id: formData.area.id })
            toast.success("Empleado modificado correctamente");
            setIsOpenEdit(false);
            setEditMode(false);
        } catch (error) {
            toast.error(error.message || "Error al modificar al empleado");
        }
    };

    const handleDisableOrEnable = async () => {
        try {
            await disableOrEnableWorker(selectedWorker.id);

            toast.success(`empleado dado de ${!selectedWorker.status ? "alta" : "baja"} correctamente`);

            const updated = employees.map((emp) =>
                emp.id === selectedWorker.id ? { ...emp, status: !selectedWorker.status ? true : false } : emp
            );
            setEmployees(updated);
            setIsOpenEdit(false);
            setSelectedWorker(null);
        } catch (error) {
            toast.error(error.message || "Error al dar de baja al empleado");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteWorker(selectedWorker.id);

            toast.success("Empleado eliminado correctamente");

            const updated = employees.map((emp) =>
                emp.id === selectedWorker.id ? { ...emp, status: false } : emp
            );
            setEmployees(updated);
            setIsOpenEdit(false);
            setSelectedWorker(null);
        } catch (error) {
            toast.error(error.message || "Error al eliminar al empleado");
        }
    };

    const filteredEmployees = employees.filter((emp) => {
        const fullName = `${emp.name} ${emp.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const sortedEmployees = [...filteredEmployees];

    if (sortOption === "alphabetical") {
        sortedEmployees.sort((a, b) =>
            `${a.name} ${a.last_name}`.localeCompare(`${b.name} ${b.last_name}`)
        );
    } else if (sortOption === "status") {
        sortedEmployees.sort((a, b) => b.status - a.status);
    }
    return (
        <div className="min-h-screen w-full p-12">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold">Lista de empleados</h2>
            </div>
            <div className="my-5 flex justify-around items-center">
                <div className="flex items-center border border-white p-1 w-1/3 rounded-xl">
                    <IoIosSearch size={22} />
                    <input
                        type="text"
                        placeholder="Busca un empleado"
                        className="h-full w-full border-none focus-within: outline-hidden"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex justify-between w-[320px]">
                    <div
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center cursor-pointer hover:scale-90 duration-300">
                        <IoReorderThreeOutline size={20} className="mr-3" />
                        <p className="text-[18px]">Ordenar por</p>
                        {isSortOpen && (
                            <div className="absolute top-full mt-2 right-0 bg-white text-black rounded shadow-lg w-48 z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                    onClick={() => {
                                        setSortOption("alphabetical");
                                        setIsSortOpen(false);
                                    }}
                                >
                                    Alfabéticamente
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                    onClick={() => {
                                        setSortOption("status");
                                        setIsSortOpen(false);
                                    }}
                                >
                                    Por estado (Activo)
                                </button>
                            </div>
                        )}
                    </div>
                    <a href="/form" className="flex items-center cursor-pointer hover:scale-90 duration-300">
                        <MdBorderColor size={18} className="mr-3" />
                        <p className="text-[18px]">Dar alta</p>
                    </a>
                </div>
            </div>
            <EmployeeList employees={filteredEmployees} onEdit={handleOpenEdit} />

            {/* Modal de edición */}
            {isOpenEdit && <SeeMore editMode={editMode} formData={formData} handleChange={handleChange} selectedWorker={selectedWorker} setIsOpenEdit={setIsOpenEdit} handleDisableOrEnable={handleDisableOrEnable} areas={areas} handleConfirm={handleConfirm} setFormData={setFormData} handleDelete={handleDelete} setEditMode={setEditMode} />}
        </div>
    );
}

export default Workers;