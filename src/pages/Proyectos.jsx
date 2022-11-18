import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";

const Proyectos = () => {
    const {proyectos} = useProyectos();

    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>
            <div className="bg-white shadow mt-10 rounded-lg">
                {proyectos.length ? 
                    proyectos.map(proyecto => (
                        <PreviewProyecto proyecto={proyecto} key={proyecto._id}/>
                    ))
                : <p className="text-gray-600 text-center uppercase p-5">No hay Proyectos aún</p>}
            </div>
        </>
    )
}

export default Proyectos
