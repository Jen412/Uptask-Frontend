import { Link } from "react-router-dom"
const Header = () => {
    return (
        <header className="px-4 py-5 border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>

                <input 
                    type="search" 
                    className="rounded-lg lg:w-96 p-2 block border"
                    placeholder="Buscar Proyecto"
                    name="" 
                    id="" 
                />
                
                <div className="flex items-center gap-4">
                    <Link
                    to="/proyectos"
                    className="font-bold uppercase"
                    >Proyectos</Link>

                    <button
                        type="button"
                        className="bg-sky-600 text-white text-sm uppercase font-bold p-3 rounded-md"
                    >Cerrar Sesión</button>
                </div>
            </div>
        </header>
    )
}

export default Header
