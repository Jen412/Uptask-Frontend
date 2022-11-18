import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [cliente, setCliente] = useState("");

    const {mostrarAlerta, alerta, sumbmitProyecto} = useProyectos();

    const handleSumit =  async(e) =>{
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
            mostrarAlerta({
                msg: "Todos los Campos son Obligatorios", 
                error: true
            });
            return;
        }
        //Pasar los datos 
        await sumbmitProyecto({nombre,descripcion,fechaEntrega, cliente});
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setDescripcion("")

    }

    const {msg} = alerta;

    return (
        <form onSubmit={handleSumit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            {msg && <Alerta alerta={alerta}/>}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
                <input 
                    id="nombre"
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Descripción</label>
                <textarea 
                    id="nombre"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>
                <input 
                    id="fecha-entrega"
                    type="date" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre del Cliente</label>
                <input 
                    id="cliente"
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear Proyecto"
                className="bg-sky-600 w-full text-white p-3 uppercase font-bold rounded cursor-pointer hover:bg-sky-800 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto
