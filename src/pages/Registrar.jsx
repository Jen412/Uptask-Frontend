import { useState } from "react";
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit  = async e =>{
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: "Los Passwords No son Iguales",
                error: true
            });
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: "El password es muy corto agrega por lo menos 6 caracteres",
                error: true
            });
            return
        }

        setAlerta({})
        //Crear usuario en API
        try {
            const {data} = await clienteAxios.post(`/usuarios`, 
            {nombre, password, email});
            setAlerta({
                msg: data.msg, 
                error: false
            })
            setNombre("")
            setEmail("")
            setPassword("")
            setRepetirPassword("")

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            })
        }
    }
    const msg = alerta.msg
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus {' '}<span className="text-slate-700">proyectos</span></h1>
            
            {msg && <Alerta alerta={alerta}/>}

            <form 
                onSubmit={handleSubmit}
                method="post" className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder="Tu Nombre"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                    />
                </div>
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                    />
                </div>
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                    />
                </div>
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="password2">Confirmar Password</label>
                    <input 
                        type="password" 
                        id="password2"
                        value={repetirPassword}
                        onChange={ e => setRepetirPassword(e.target.value)}
                        placeholder="Confirmar Password"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                    />
                </div>
                <input 
                    type="submit" 
                    value="Crear Cuenta"
                    className="bg-sky-700 w-full mb-3 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/"
                >¿Ya tienes Una Cuenta? Inicia Sesión</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar
