import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-black text-white min-h-[50vh] flex flex-col justify-center items-center px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Gaston Gonzalez</h2>
            
            <a
                href="https://www.linkedin.com/in/gaston-gonzalez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-500 transition mb-4 flex items-center"
            >
               <FaLinkedin size={20} className="mr-2"/> Conectá conmigo en LinkedIn
            </a>

            <p className="text-sm text-gray-400 max-w-md">
                ⚠️ Sitio creado por Gaston Gonzalez 2025.
            </p>
        </footer>
    );
};

export default Footer;
