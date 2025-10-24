/*

  1- Props 

*/

import { useState } from "react"
import Sexto from "./Sexto"

const Quinto = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Matew",
    rol: "Employee",
    email: "matew@gmail.com",
  })

  // funciones que actualizan el estado (y por ende las props enviadas al hijo)
  const promoteToManager = () =>
    setUserProfile((p) => ({ ...p, rol: p.rol === "Manager" ? "Employee" : "Manager" }))

  const randomizeEmail = () =>
    setUserProfile((p) => ({ ...p, email: p.name.toLowerCase() + Math.floor(Math.random()*100) + "@mail.com" }))

  const updateName = (e) => setUserProfile((p) => ({ ...p, name: e.target.value }))

  return (
    <>
      <h1 className="font-bold text-2xl">Props</h1>

      <hr className="border-gray-400 mb-8"/>

      <ul className="list-disc pl-5">
        <li>Permiten pasar datos de un componente padre a un hijo.</li>
      </ul>

      <h2 className="text-green-700 text-center mt-8">Padre</h2>

      <div className="border-2 border-green-500 flex flex-col justify-center items-center w-80 mx-auto mb-8 p-4">
        {/* Recuadro: vista interactiva que demuestra props */}
        <h3 className="font-semibold mb-2">Perfil (estado en el padre)</h3>

        <div className="text-left w-full mb-3">
          <label className="text-sm block mb-1">Nombre (editar):</label>
          <input
            value={userProfile.name}
            onChange={updateName}
            className="w-full px-2 py-1 border rounded mb-2"
            placeholder="Escribe un nombre..."
          />

          <p className="text-sm"><strong>Rol:</strong> {userProfile.rol}</p>
          <p className="text-sm"><strong>Email:</strong> {userProfile.email}</p>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={promoteToManager}
            className="bg-green-600 text-white py-1 px-3 rounded text-sm"
            aria-label="Cambiar rol"
          >
            Alternar Rol
          </button>

          <button
            onClick={randomizeEmail}
            className="bg-blue-600 text-white py-1 px-3 rounded text-sm"
            aria-label="Randomizar correo"
          >
            Randomizar Email
          </button>

          <button
            onClick={() => setUserProfile({ name: "Matew", rol: "Employee", email: "matew@gmail.com" })}
            className="bg-gray-300 text-black py-1 px-3 rounded text-sm"
            aria-label="Reset"
          >
            Reset
          </button>
        </div>

        <p className="text-xs text-gray-600 mb-2">
          El objeto `userProfile` se pasa como <code>data</code> al componente hijo.
        </p>

        {/* Paso de props al hijo; también le pasamos onUpdate por si el hijo necesita actualizar */}
        <div className="w-full pt-2 border-t">
          <Sexto data={userProfile} onUpdate={setUserProfile} />
        </div>
      </div>

    </>
  )
}

export default Quinto
