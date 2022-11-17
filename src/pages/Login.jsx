import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});


    const handleSumit = async (e)=>{
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlerta({
                msg: "Todos Los Campos son Obligatiorios",
                error: true
            })
            return
        }
        try {
            const {data} = await clienteAxios.post("/usuarios/login", {email, password});
            localStorage.setItem("token", data.token);
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y administra tus {' '}<span className="text-slate-700">proyectos</span></h1>
            
            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSumit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="text-gray-600 uppercase block text-xl font-bold" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 boder rounded-xl bg-gray-50"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-sky-700 w-full mb-3 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="registrar"
                >¿No Tienes una Cuenta? Registrate</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Login
