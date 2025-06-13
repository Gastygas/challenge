const SeeMore = ({ editMode, formData, handleChange, selectedWorker, setIsOpenEdit, handleDisableOrEnable, areas, handleConfirm, setFormData, handleDelete, setEditMode }) => {
    return (

        <div className="fixed inset-0 bg-[#21202079] flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-8 w-[500px] shadow-xl text-black">
                <h3 className="text-xl font-bold mb-4">Detalles del empleado</h3>

                <div className="space-y-2">
                    <div>
                        <p className="font-semibold">Nombre:</p>
                        {editMode ? (
                            <input
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                className="border px-3 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{selectedWorker.name}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Apellido:</p>
                        {editMode ? (
                            <input
                                name="last_name"
                                value={formData.last_name || ""}
                                onChange={handleChange}
                                className="border px-3 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{selectedWorker.last_name}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">DNI:</p>
                        {editMode ? (
                            <input
                                name="dni"
                                value={formData.dni || ""}
                                onChange={handleChange}
                                className="border px-3 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{selectedWorker.dni}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Fecha de nacimiento:</p>
                        {editMode ? (
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate || ""}
                                onChange={handleChange}
                                className="border px-3 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{selectedWorker.birthdate}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Acerca de:</p>
                        {editMode ? (
                            <textarea
                                name="about"
                                value={formData.about || ""}
                                onChange={handleChange}
                                className="border px-3 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{selectedWorker.about}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Área:</p>
                        {editMode ? (
                            <select
                                name="area"
                                id="area"
                                value={formData.area?.id || ""}
                                onChange={(e) => {
                                    const selected = areas.find((a) => a.id === e.target.value);
                                    setFormData({ ...formData, area: selected });
                                }}
                                className="border px-3 py-1 rounded w-full"
                            >
                                <option value="">Seleccione un área</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>{selectedWorker.area?.name}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Estado:</p>
                        <p>{selectedWorker.status ? "Activo" : "Inactivo"}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                        onClick={() => setIsOpenEdit(false)}
                    >
                        Cancelar
                    </button>
                    {editMode ?
                        (
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                onClick={handleConfirm}
                            >
                                Confirmar
                            </button>
                        )
                        :
                        (
                            <>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={selectedWorker.status ? handleDisableOrEnable : handleDelete}
                                >
                                    {selectedWorker.status ? "Dar baja" : "Eliminar"}
                                </button>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    onClick={selectedWorker.status ? () => setEditMode(true) : handleDisableOrEnable}
                                >
                                    {selectedWorker.status ? "Editar" : "Dar alta"}
                                </button>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default SeeMore;