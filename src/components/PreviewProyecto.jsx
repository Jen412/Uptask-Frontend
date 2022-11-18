import { Link } from "react-router-dom"

const PreviewProyecto = ({proyecto}) => {
    const {nombre, _id, cliente}= proyecto
    return (
        <div>
            <div className="border-b p-5 flex">
                <p className="flex-1">
                    {nombre}
                    <span className="text-sm text-gray-500 uppercase">{''} {cliente}</span>
                </p>
                <Link 
                    to={`${_id}`}
                    className="text-gray-600 text-sm hover:text-gray-800 font-bold uppercase"
                >Ver Proyecto</Link>
            </div>
        </div>
    )
}

export default PreviewProyecto
