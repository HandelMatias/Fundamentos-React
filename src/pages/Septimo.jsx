/*

  1- Zustand 

*/



import { useState } from "react"
import storeGalleta from "../context/storeGalleta"
import Octavo from "./Octavo"

const Septimo = () => {
  const { detalle = { nombre: "", tipo: "" }, setGalleta } = storeGalleta()

  // estados locales para el formulario y el historial de cambios
  const [nombre, setNombre] = useState(detalle.nombre ?? "")
  const [tipo, setTipo] = useState(detalle.tipo ?? "")
  const [history, setHistory] = useState([])

  const applyChange = () => {
    const nuevo = { nombre: nombre || "Sin nombre", tipo: tipo || "Sin tipo" }
    // actualizar el store
    setGalleta(nuevo)
    // guardar en historial local (para mostrar evidencia de cambios)
    setHistory((h) => [{ ...nuevo, at: new Date().toLocaleTimeString() }, ...h].slice(0, 6))
  }

  const randomize = () => {
    const names = ["BIMBO", "Oreo", "ChipsAhoy", "María", "Figaro"]
    const types = ["Ponkey", "Chocolate", "Doble", "Integral", "Clásica"]
    const nuevo = {
      nombre: names[Math.floor(Math.random() * names.length)],
      tipo: types[Math.floor(Math.random() * types.length)],
    }
    setNombre(nuevo.nombre)
    setTipo(nuevo.tipo)
    setGalleta(nuevo)
    setHistory((h) => [{ ...nuevo, at: new Date().toLocaleTimeString() }, ...h].slice(0, 6))
  }

  const reset = () => {
    const inicial = { nombre: "MatewCookie", tipo: "Default" }
    setNombre(inicial.nombre)
    setTipo(inicial.tipo)
    setGalleta(inicial)
    setHistory((h) => [{ ...inicial, at: new Date().toLocaleTimeString() }, ...h].slice(0, 6))
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Zustand </h1>

      <hr className="border-gray-400 mb-8"/>

      <ul className="list-disc pl-5">
        <li>
          Librería para manejar el estado global. Además, funciona como un store que cualquier componente puede usar.
        </li>
      </ul>

      <h2 className="text-blue-700 text-center mt-8">Padre</h2>

      <div className="border-2 border-blue-500 flex flex-col justify-center items-center w-80 mx-auto mb-8 p-4">

        {/* Componente hijo que también consume el store */}
        <div className="w-full mb-3">
          <Octavo />
        </div>

        {/* Recuadro interactivo */}
        <div className="w-full bg-white border rounded p-3 text-left">
          <h3 className="font-semibold mb-2">Editor de Galleta (store)</h3>

          <label className="text-sm block mb-1">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-2 py-1 border rounded mb-2"
            placeholder="Ej: BIMBO"
          />

          <label className="text-sm block mb-1">Tipo</label>
          <input
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-2 py-1 border rounded mb-3"
            placeholder="Ej: Ponkey"
          />

          <div className="flex gap-2 mb-3">
            <button
              onClick={applyChange}
              className="bg-blue-600 text-white py-1 px-3 rounded text-sm"
            >
              Aplicar al Store
            </button>

            <button
              onClick={randomize}
              className="bg-purple-600 text-white py-1 px-3 rounded text-sm"
            >
              Randomizar
            </button>

            <button
              onClick={reset}
              className="bg-gray-300 text-black py-1 px-3 rounded text-sm"
            >
              Reset
            </button>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-600">Valor actual (desde el store):</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-sm font-medium">🍪 {detalle?.nombre ?? "—"}</span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-sm">{detalle?.tipo ?? "—"}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Historial de cambios (local):</p>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">Aún no hay cambios aplicados desde este componente.</p>
            ) : (
              <ul className="text-sm space-y-1 max-h-32 overflow-auto">
                {history.map((h, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-1">
                    <span>{h.nombre} — {h.tipo}</span>
                    <span className="text-xs text-gray-500">{h.at}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>

    </>
  )
}

export default Septimo
