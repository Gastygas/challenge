const Section2 = () => {
    return (
        <div className="min-h-screen w-full bg-[#0E1A29] px-8 py-20 text-white">
            <div className="mb-20">
                <h2 className="text-4xl font-bold text-center">¿Qué hacemos hoy?</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                {/* Card 1 */}
                <div
                    className="relative w-[300px] h-[400px] bg-cover bg-center rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
                    style={{
                        backgroundImage: "url('./writing.jfif')",
                    }}
                >
                    <div className="absolute inset-0  flex flex-col justify-center items-center p-6 text-center space-y-6">
                        <p className="text-2xl font-semibold text-shadow-md text-shadow-black">Dar alta</p>
                        <a
                            href="/form"
                            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                        >
                            Completar formulario
                        </a>
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    className="relative w-[300px] h-[400px] bg-cover bg-right rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
                    style={{
                        backgroundImage: "url('./employee.jpg')",
                    }}
                >
                    <div className="absolute inset-0  flex flex-col justify-center items-center p-6 text-center space-y-6">
                        <p className="text-2xl font-semibold text-shadow-md text-shadow-black">Ver empleados</p>
                        <a
                            href="/employees"
                            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                        >
                            Empleados activos
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;