const Navbar = () => {
    return (
        <div className=" sticky top-0 z-20 bg-white w-full h-[70px] flex justify-between  items-center ">
            <div className="flex items-center">
                <a href="/"><img src="./logo.png" alt="logo" className="w-[100px] h-[70px] mr-10" /></a>
                <p className="font-medium text-xl">Challenge Ingreso SOTAMIT</p>
            </div>
            <div className="w-1/2">
                <ul className="flex justify-around w-1/2">
                    <a href="/form" className="text-black hover:text-[#FAD20A]"><li className="font-medium text-base cursor-pointer">Dar alta</li></a>
                    <a href="/workers" className="text-black hover:text-[#FAD20A]"><li className="font-medium text-base cursor-pointer">Empleados</li></a>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;