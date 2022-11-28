import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {

    const [email, setEmail] = useState("");
    const {mostrarAlerta, alerta, submitColaborador} = useProyectos();

    const handleSubmit = async e =>{
        e.preventDefault();

        if (email=== "") {
            mostrarAlerta({
                msg: "Email Obligatorio",
                error: true    
            });
            return;
        }

        await submitColaborador(email);
    }

    const {msg} = alerta;

    return (
        <form className="bg-white px-5 py-10 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta}/>}
            <div className='mb-5'>
                <label htmlFor="email" className='text-gray-700 uppercase font-bold text-sm'>Email Colaborador</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder='Email del Usuario' 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <input 
                type="submit"
                value="Buscar Colaborador"
                className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'    
            />
        </form>
    )
}

export default FormularioColaborador
