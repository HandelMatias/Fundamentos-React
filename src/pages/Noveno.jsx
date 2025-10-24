import { useState } from "react"

const Noveno = () => {
  const [login, setLogin] = useState(false)
  const [filter, setFilter] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [habilidades, setHabilidades] = useState([
    { id: 1, nombre: "HTML", icono: "📙" },
    { id: 2, nombre: "CSS", icono: "📘" },
    { id: 3, nombre: "JavaScript", icono: "📒" },
    { id: 4, nombre: "React", icono: "⚛️" },
    { id: 5, nombre: "Node.js", icono: "📗" },
  ])
  const [favoriteId, setFavoriteId] = useState(null)

  const toggleLogin = () => setLogin((l) => !l)

  const addSkill = () => {
    const name = newSkill.trim()
    if (!name) return
    const next = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      nombre: name,
      icono: "🔰",
    }
    setHabilidades((h) => [next, ...h])
    setNewSkill("")
  }

  const removeSkill = (id) => {
    setHabilidades((h) => h.filter((s) => s.id !== id))
    if (favoriteId === id) setFavoriteId(null)
  }

  const editSkill = (id) => {
    const actual = habilidades.find((s) => s.id === id)
    const nuevo = prompt("Editar nombre de habilidad:", actual?.nombre ?? "")
    if (nuevo !== null) {
      setHabilidades((h) => h.map((s) => (s.id === id ? { ...s, nombre: nuevo } : s)))
    }
  }

  const filtered = habilidades.filter((h) =>
    h.nombre.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <h1 className="font-bold text-2xl">Renderizado</h1>

      <hr className="border-gray-400 mb-8" />

      <ul className="list-disc pl-5 mb-6">
        <li>
          <strong>Renderizado condicional:</strong> Permite mostrar u ocultar elementos de la interfaz según ciertas condiciones.
        </li>
        <li>
          <strong>Renderizado de listas:</strong> Permite mostrar múltiples elementos a partir de un array usando métodos de los arreglos.
        </li>
      </ul>

      <div className="flex justify-center mb-8 mt-8">
        <div className="border rounded-lg p-4 w-96 mx-auto text-center">
          <h2 className="text-lg font-bold text-left underline mb-4">Condicional</h2>

          {/* Condicional simple: vista distinta según login */}
          {login ? (
            <div className="text-left">
              <p className="mb-2">¡Bienvenido de nuevo! 😎</p>
              <p className="text-sm text-gray-600 mb-3">Puedes ver y editar tus habilidades abajo.</p>

              <div className="flex gap-2 mb-3">
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filtrar habilidades..."
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => { setFilter(""); }}
                  className="px-3 py-1 border rounded bg-gray-100"
                >
                  Limpiar
                </button>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Agregar nueva habilidad..."
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={addSkill}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Añadir
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-2">
                Total: <strong>{habilidades.length}</strong> — Mostrando: <strong>{filtered.length}</strong>
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2">Por favor, inicia sesión para ver y editar las habilidades.</p>
              <p className="text-sm text-gray-600">Haz clic en el botón para simular el login.</p>
            </div>
          )}

          <div className="mt-4">
            <button
              className="mt-2 bg-blue-600 text-white py-1 px-3 rounded"
              onClick={toggleLogin}
            >
              {login ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="border rounded-lg p-4 w-96 mx-auto text-left">
          <h2 className="text-lg font-bold underline mb-3">Listas</h2>

          {/* Lista con acciones: editar, eliminar, favorito */}
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No hay habilidades que coincidan.</p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((habilidad) => (
                <li
                  key={habilidad.id}
                  className="flex items-center justify-between border rounded p-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habilidad.icono}</span>
                    <div>
                      <p className="font-medium">{habilidad.nombre}</p>
                      <p className="text-xs text-gray-500">ID: {habilidad.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      title="Marcar favorito"
                      onClick={() =>
                        setFavoriteId((f) => (f === habilidad.id ? null : habilidad.id))
                      }
                      className={`px-2 py-1 rounded ${favoriteId === habilidad.id ? "bg-yellow-300" : "bg-gray-100"}`}
                    >
                      {favoriteId === habilidad.id ? "★" : "☆"}
                    </button>

                    <button
                      title="Editar"
                      onClick={() => editSkill(habilidad.id)}
                      className="px-2 py-1 rounded bg-green-100"
                    >
                      Edit
                    </button>

                    <button
                      title="Eliminar"
                      onClick={() => removeSkill(habilidad.id)}
                      className="px-2 py-1 rounded bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Muestra el favorito */}
          <div className="mt-4 text-sm text-gray-600">
            Favorito:{" "}
            {favoriteId
              ? habilidades.find((s) => s.id === favoriteId)?.nombre ?? "—"
              : "Ninguno marcado"}
          </div>
        </div>
      </div>
    </>
  )
}

export default Noveno
