

export const EmployeeForm = ({ dirty, error, handleSubmit, form, handleChange, areas, handleCleanForm }) => {

    const buttonDisabled =
        !form.dni ||
        !form.area_id ||
        !form.name ||
        !form.last_name ||
        !form.birthdate || error.name || error.last_name || error.dni

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-5">
            <div>
                <label className="font-semibold">Nombre:</label>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="w-full p-2 border" required />
                {dirty.name && <p className="text-red-500 font-medium">{error.name}</p>}
            </div>
            <div>
                <label className="font-semibold">Apellido:</label>
                <input name="last_name" placeholder="Apellido" value={form.last_name} onChange={handleChange} className="w-full p-2 border" required />
                {dirty.last_name && <p className="text-red-500 font-medium">{error.last_name}</p>}
            </div>

            <div>
                <label className="font-semibold">DNI (sin puntos)</label>
                <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="w-full p-2 border" required />
                {dirty.dni && <p className="text-red-500 font-medium">{error.dni}</p>}

            </div>

            <div>
                <label className="font-semibold">Fecha de nacimiento</label>
                <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} className="w-full p-2 border" required />
            </div>

            <div>
                <label className="font-semibold">Descripción sobre el empleado</label>
                <textarea name="about" placeholder="..." value={form.about} onChange={handleChange} className="w-full p-2 border" />
            </div>

            <div className="flex items-center w-fit">
                <label className="w-64 font-semibold">
                    ¿Es desarrollador?
                </label>
                <input className="" type="checkbox" name="is_developer" checked={form.is_developer} onChange={handleChange} />
            </div>

            <div>
                <label className="font-semibold">Selecciona un área</label>
                <select name="area_id" value={form.area_id} onChange={handleChange} className="w-full p-2 border" required>
                    <option value="" className="text-black">...</option>
                    {areas && areas.map((a) => (
                        <option key={a.id} value={a.id} className="text-black">{a.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between w-1/2">

                <button
                    type="submit"
                    className={`${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        } text-white px-4 py-2 font-bold rounded-md transition`}
                    disabled={buttonDisabled}
                >Registrar</button>
                <button type="button" className="bg-yellow-700 text-white px-4 py-2 font-bold rounded-md" onClick={handleCleanForm}>Limpiar</button>
            </div>
        </form>
    );
};