import { useEffect, useState } from "react";
import axios from "axios";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACK_URL}/workers`).then((res) => {
      setEmployees(res.data.workers);
    });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Lista de empleados</h2>
      <ul className="space-y-2">
        {employees.map((emp) => (
          <li key={emp.id} className="border p-3 rounded shadow-sm">
            <p><strong>{emp.name} {emp.last_name}</strong></p>
            <p>DNI: {emp.dni}</p>
            <p>Área: {emp.area.name}</p>
            <p>{emp.is_developer ? "💻 Desarrollador" : "👷‍♂️ No desarrollador"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};