export const EmployeeList = ({ employees, onEdit }) => {

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-8 gap-4 bg-gray-800 text-white font-semibold p-3 rounded-t">
        <div>Nombre</div>
        <div>Apellido</div>
        <div>DNI</div>
        <div>Fecha de nacimiento</div>
        <div>Área</div>
        <div>Desarrollador</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {/* Data Rows */}
      {employees.map((emp) => {
        const date = new Date(emp.birthdate);

        return (
          <div
            key={emp.id}
            className="capitalize font-medium grid grid-cols-8 gap-4 items-center bg-white text-black p-4 border-b hover:bg-gray-100 transition"
          >
            <div data-testid="employee-name">{emp.name}</div>
            <div>{emp.last_name}</div>
            <div>{emp.dni}</div>
            <div>{date.toLocaleDateString("es-AR")
            }</div>
            <div>{emp.area?.name}</div>
            <div className="pl-6">{emp.is_developer ? "✅" : "❌"}</div>
            <div className={`font-bold ${emp.status ? "text-green-700" : "text-red-600"}`}>{emp.status ? "Activo" : "Inactivo"}</div>
            <div className="flex gap-2">
              {
                (

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                    onClick={() => onEdit(emp)}
                  >
                    Ver más
                  </button>
                )
              }
            </div>
          </div>
        )
      }
      )}

    </div>
  );
};