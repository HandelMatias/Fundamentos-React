import { useState } from "react"
import { useFetch } from "../customHook/useFecth"

const Cuarto = () => {
  const [products, setProducts] = useState([])
  const [memes, setMemes] = useState([])

  const fetchDataBackend = useFetch()

  const getDataProducts = async () => {
    const products = await fetchDataBackend("https://fakestoreapi.com/products")
    setProducts(products)
    console.log(products)
  }

  const getDataMemes = async () => {
    const memes = await fetchDataBackend("https://api.imgflip.com/get_memes")
    setMemes(memes)
    console.log(memes)
  }

  return (
    <>
      <h1 className="font-bold text-2xl">customHook</h1>

      <hr className="border-gray-400 mb-8" />

      <ul className="list-disc pl-5">
        <li>
          Es un Hook que permite encapsular lógica reutilizable y que puede ser utilizado en cualquier componente.
        </li>
      </ul>

      <div className="flex justify-center mb-8 mt-8">
        <div className="border rounded-lg p-4 w-80 text-center">
          <h2 className="text-lg font-semibold mb-2 underline">Vista previa</h2>

          {/* Contenido nuevo dentro del recuadro: */}
          <div className="mb-4 text-left">
            {/* Productos (muestra hasta 3) */}
            {products?.length > 0 ? (
              <div>
                <p className="font-medium mb-2">Productos (preview):</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {products.slice(0, 3).map((p) => (
                    <div key={p.id} className="w-36 border rounded p-2 bg-white text-sm">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="mx-auto h-20 object-contain mb-2"
                      />
                      <p className="truncate font-semibold" title={p.title}>{p.title}</p>
                      <p className="text-xs">Precio: ${p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Memes (muestra hasta 3) */}
            {memes?.data?.memes?.length > 0 ? (
              <div className="mt-3">
                <p className="font-medium mb-2">Memes (preview):</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {memes.data.memes.slice(0, 3).map((m) => (
                    <div key={m.id} className="w-36 border rounded p-2 bg-white text-sm">
                      <img
                        src={m.url}
                        alt={m.name}
                        className="mx-auto h-20 object-contain mb-2"
                      />
                      <p className="truncate" title={m.name}>{m.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Mensaje cuando no hay datos */}
            {products.length === 0 && (!memes?.data?.memes || memes.data.memes.length === 0) && (
              <p className="text-sm text-gray-600">Haz clic en "Obtener Productos" o "Obtener Memes" para ver una vista previa aquí.</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-violet-700 text-white py-1 px-3 mx-1 rounded"
              onClick={getDataProducts}
            >
              Obtener Productos
            </button>
            <button
              className="bg-violet-700 text-white py-1 px-3 rounded"
              onClick={getDataMemes}
            >
              Obtener Memes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cuarto
