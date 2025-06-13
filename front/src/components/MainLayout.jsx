import { Outlet } from "react-router-dom"
import Dashboard from "../screens/dashboard"
import Navbar from "./Navbar"
import Footer from "./Footer"

const MainLayout = () => {

    return (
        <>
            <Navbar />
            <main className="bg-[#0E1A29] text-white">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default MainLayout