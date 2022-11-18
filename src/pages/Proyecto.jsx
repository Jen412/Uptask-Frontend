import { useEffect } from "react";
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos";
import Spinner from "../components/Spinner";
const Proyecto = () => {
    const {id} = useParams();
    const {proyecto,obtenerProyecto, cargando}= useProyectos();    
    useEffect(() => {
        obtenerProyecto(id);    
    }, []);
    const {nombre} = proyecto;
    return (
        cargando ? <Spinner/>: (<div>
            <h1 className="font-black text-4xl">{nombre}</h1>
        </div>)
        
    )
}

export default Proyecto
