import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{
    
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});  
    const [proyecto, setProyecto] = useState({});  
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
    const [tarea, setTarea] = useState({});
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [colaborador, setColaborador] = useState({});
    const [modalElimnarColaborador, setModalElimnarColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false);

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
        if (proyecto.id) {
            await editarProyecto(proyecto);
        }
        else{
            await nuevoProyecto(proyecto);
        }
        
    }

    const editarProyecto = async proyecto =>{
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

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);
            //Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id ===data._id ? data: proyectoState)
            setProyectos(proyectosActualizados);
            //Mostrar la alerta
            setAlerta({
                msg: "Proyecto Actualizado Correctamente", 
                error: false
            })
            //Redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 23 ~ sumbmitProyecto ~ error", error)
        }
    }
    const nuevoProyecto = async proyecto =>{
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
            setAlerta({});
        } catch (error) {
            navigate("/proyectos");
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }finally{
            setCargando(false);
        }
    }

    const eliminarProyecto = async id =>{
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

            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);
            //Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);
            setProyectos(proyectosActualizados);
            setAlerta({
                msg: data.msg, 
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

    const handleModalTarea = () =>{
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }

    const submitTarea = async tarea => {
        if (tarea.id) {
            await editarTarea(tarea);
        }
        else{
            await crearTarea(tarea);
        }
        
    }

    const crearTarea = async tarea =>{
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
            const {data} = await clienteAxios.post("/tareas", tarea, config);
            //Agrega la tarea al state
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado);
            setAlerta({})
            setModalFormularioTarea(false);
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 179 ~ submitTarea ~ error", error)
        }
    }

    const editarTarea = async tarea=>{
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
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
            //Se Actualiza el state
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas= proyectoActualizado.tareas.map(tareaState=> tareaState._id ===data._id ? data : tareaState)
            setProyecto(proyectoActualizado)
            setAlerta({});
            setModalFormularioTarea(false);
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 225 ~ editarTarea ~ error", error)
        }
    }

    const handleModalEditarTarea= tarea =>{
        setTarea(tarea);
        setModalFormularioTarea(true);
    }

    const handleModalEliminarTarea = tarea =>{
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const eliminarTarea = async () =>{
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
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
            setAlerta({
                msg: data.msg,
                error:false
            });
            //Se Actualiza el state
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas= proyectoActualizado.tareas.filter(tareaState=> tareaState._id !==tarea._id);
            setProyecto(proyectoActualizado)
            
            setModalEliminarTarea(false);
            setTarea({});
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx ~ line 251 ~ eliminarTarea ~ error", error)
        }
    }

    const submitColaborador = async email =>{
        setCargando(true);
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
            const {data} = await clienteAxios.post("/proyectos/colaboradores", {email}, config); 
            setColaborador(data);
            setAlerta({});
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            });
        }
        finally{
            setCargando(false);
        }
    }

    const agregarColaborador = async email =>{
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
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config); 
            setAlerta({
                msg: data.msg,
                error:false            
            })
            setColaborador({});
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            });
        }
    }

    const handleModalElimnarColaborador = colaborador =>{
        setModalElimnarColaborador(!modalElimnarColaborador);
        setColaborador(colaborador);
    }

    const elimnarColaborador = async ()=>{
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
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config); 
            const proyectoActualzado = {...proyecto};
            proyectoActualzado.colaboradores = proyectoActualzado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id);
            setProyecto(proyectoActualzado);
            setAlerta({
                msg: data.msg,
                error: false
            });
            setColaborador({});
            setModalElimnarColaborador(false);
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }
        catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const completarTarea = async id =>{
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
            const {data}= await clienteAxios.post(`/tareas/estado/${id}`,{}, config);
            
            const proyectoActualizado ={...proyecto};
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualizado);
            setTarea({});
            setAlerta({})
        } catch (error) {
            console.log("🚀 ~ file: ProyectosProvider.jsx:383 ~ completarTarea ~ error", error)
        }
    }

    const handleBuscador =()=>{
        setBuscador(!buscador);
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
                cargando,
                eliminarProyecto,
                modalFormularioTarea, 
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea, 
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalElimnarColaborador,
                modalElimnarColaborador,
                elimnarColaborador,
                completarTarea,
                buscador, 
                handleBuscador
            }}
        >{children}
        </ProyectosContext.Provider>
    );
}


export {
    ProyectosProvider,
    
}

export default ProyectosContext