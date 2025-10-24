/*

  1- Localstorage

*/

import { useEffect, useState } from "react"

const Decimo = () => {
  const [userToken, setUserToken] = useState(null)

  // formulario local
  const [name, setName] = useState("")
  const [rol, setRol] = useState("")
  const [token, setToken] = useState("")

  // lee localStorage de forma segura
  const readFromStorage = () => {
    try {
      const raw = localStorage.getItem("token-user")
      if (!raw) return null
      return JSON.parse(raw)
    } catch (e) {
      console.error("Error parseando token-user:", e)
      return null
    }
  }

  // cargar al montar (si existe)
  useEffect(() => {
    const existing = readFromStorage()
    if (existing) {
      setUserToken(existing)
      setName(existing.name ?? "")
      setRol(existing.rol ?? "")
      setToken(existing.token ?? "")
    }
  }, [])

  const guardarToken = () => {
    const objeto = {
      name: name || "Sin nombre",
      rol: rol || "Sin rol",
      token: token || Math.random().toString(36).slice(2, 10),
    }
    try {
      localStorage.setItem("token-user", JSON.stringify(objeto))
      setUserToken(objeto)
    } catch (e) {
      console.error("No se pudo guardar en localStorage:", e)
      alert("Error al guardar en localStorage.")
    }
  }

  const obtenerToken = () => {
    const t = readFromStorage()
    setUserToken(t)
    if (!t) alert("No hay token en localStorage.")
  }

  const limpiarToken = () => {
    localStorage.removeItem("token-user")
    setUserToken(null)
    setName("")
    setRol("")
    setToken("")
  }

  const guardarEjemplo = () => {
    const ejemplo = { name: "Byron", rol: "Admin", token: "1234***" }
    localStorage.setItem("token-user", JSON.stringify(ejemplo))
    setUserToken(ejemplo)
    setName(ejemplo.name)
    setRol(ejemplo.rol)
    setToken(ejemplo.token)
  }

  const copiarToken = async () => {
    try {
      const raw = readFromStorage()
      if (!raw?.token) {
        alert("No hay token para copiar.")
        return
      }
      await navigator.clipboard.writeText(raw.token)
      alert("Token copiado al portapapeles.")
    } catch (e) {
      console.error("No se pudo copiar:", e)
      alert("No se pudo copiar el token.")
    }
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Localstorage</h1>

      <hr className="border-gray-400 mb-8" />

      <ul className="list-disc pl-5 mb-6">
        <li>
          LocalStorage sirve para mantener información en el navegador incluso después de recargar o cerrar la página.
        </li>
        <li>Los datos se guardan en pares clave–valor y solo admiten strings (usar JSON).</li>
        <li>Usa JSON.stringify() para guardar y JSON.parse() para leer.</li>
      </ul>

      <div className="flex justify-center mb-8 mt-8">
        <div className="w-80 border rounded-lg p-4 text-center bg-white">
          <h2 className="text-lg font-semibold mb-2">Gestión de token (LocalStorage)</h2>

          {/* Formulario */}
          <div className="text-left mb-3">
            <label className="text-sm block mb-1">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="Ej: Byron"
            />

            <label className="text-sm block mb-1">Rol</label>
            <input
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="Ej: Admin"
            />

            <label className="text-sm block mb-1">Token</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="Si lo dejas vacío se generará uno aleatorio al guardar"
            />
          </div>

          {/* Botones de acciones */}
          <div className="flex flex-col gap-2 mb-3">
            <button
              onClick={guardarToken}
              className="bg-green-600 text-white py-1 px-3 rounded"
              aria-label="Guardar token en localStorage"
            >
              Guardar token
            </button>

            <div className="flex gap-2">
              <button
                onClick={obtenerToken}
                className="flex-1 bg-blue-600 text-white py-1 px-3 rounded"
                aria-label="Obtener token desde localStorage"
              >
                Obtener token
              </button>
              <button
                onClick={limpiarToken}
                className="flex-1 bg-red-600 text-white py-1 px-3 rounded"
                aria-label="Eliminar token"
              >
                Limpiar token
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={guardarEjemplo}
                className="flex-1 bg-gray-200 text-black py-1 px-3 rounded"
                aria-label="Guardar ejemplo"
              >
                Guardar ejemplo
              </button>
              <button
                onClick={copiarToken}
                className="flex-1 bg-yellow-400 text-black py-1 px-3 rounded"
                aria-label="Copiar token"
              >
                Copiar token
              </button>
            </div>
          </div>

          {/* Vista previa */}
          <div className="text-left border-t pt-3">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>

            {userToken ? (
              <div>
                <p className="font-medium">Nombre: <span className="font-normal">{userToken.name}</span></p>
                <p className="font-medium">Rol: <span className="font-normal">{userToken.rol}</span></p>
                <p className="font-medium">Token: <span className="font-normal">{userToken.token}</span></p>

                <pre className="text-xs mt-2 p-2 bg-gray-50 rounded overflow-auto">
                  {JSON.stringify(userToken, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay token guardado en localStorage.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Decimo
