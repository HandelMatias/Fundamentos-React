
/*

  1- useEffect

*/

import { useEffect, useState } from "react"

const Cuarto = () => {

  const [post, setPost] = useState({})
  const [recargar, setRecargar] = useState(1)

  const getRandomPost = async () => {
    const id = Math.floor(Math.random() * 10) + 1
    const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const response = await request.json()
    console.log(response)
    setPost(response)
  }

  useEffect(() => {
    getRandomPost()
  }, [recargar])

  return (
    <>
      <h1 className="font-bold text-2xl">useEffect</h1>

      <hr className="border-gray-400 mb-8"/>

      <ul className="list-disc pl-5">
        <li>
          Es un Hook que permite ejecutar efectos secundarios, como peticiones a APIs o actualizar el DOM.
        </li>
      </ul>

      <div className="flex justify-center mb-8 mt-8">

        <div className="w-120 border rounded-lg p-4 w-96 text-left bg-gray-50">

          <h2 className="text-lg font-semibold mb-2">Post ID: {post.id}</h2>
          <p className="mb-3"><strong>Título:</strong> {post.title}</p>
          <p className="mb-3"><strong>Contenido:</strong> {post.body}</p>

          <button 
            className="bg-blue-600 text-white py-1 px-3 rounded w-full mt-4 hover:bg-blue-700"
            onClick={() => setRecargar(recargar + 1)}
          >
            Obtener otro post
          </button>

        </div>
      </div>
    </>
  )
}

export default Cuarto
