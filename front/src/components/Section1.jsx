const Section1 = () => {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/city.jfif')",
            }}
        >
            <div className="absolute w-full h-full bg-[#080C2050] z-0"></div>

            <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center space-y-6 px-4">
                <h2 className="text-5xl text-white font-bold text-shadow-black text-shadow-lg">
                    Bienvenido Administrador!
                </h2>
                <h4 className="text-white text-2xl max-w-2xl text-shadow-black text-shadow-md">
                    En esta aplicación podés dar de alta, baja y ver los empleados activos.
                </h4>
            </div>
        </div>
    )
}
export default Section1;