import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{
    
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});  
    const [proyecto, setProyecto] = useState({});  
    const [cargando, setCargando] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyectos= async () =>{
            try {
                const token = localStorage.getItem("token");
                if(!token){
                    return;
                }
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/proyectos", config);
                setProyectos(data);
            } catch (error) {
                console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 19 ~ obtenerProyectos ~ error", error)
            }
        }
        return () =>  {obtenerProyectos()};
    }, []);

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const sumbmitProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem("token");
            if(!token){
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/proyectos", proyecto, config);
            setProyectos([...proyectos, data]);
            setAlerta({
                msg: "Proyecto Creado Correctamente", 
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 23 ~ sumbmitProyecto ~ error", error)
        }
    }

    const obtenerProyecto = async id =>{
        setCargando(true)
        try {
            const token = localStorage.getItem("token");
            if(!token){
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 77 ~ obtenerProyecto ~ error", error)
        }finally{
            setCargando(false);
        }
    }

    return(
        <ProyectosContext.Provider
            value={{
                proyecto,
                proyectos,
                alerta, 
                mostrarAlerta,
                sumbmitProyecto,
                obtenerProyecto,
                cargando
            }}
        >{children}
        </ProyectosContext.Provider>
    );
}


export {
    ProyectosProvider,
    
}

export default ProyectosContext