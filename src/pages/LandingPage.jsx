import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'

const LandingPage = () => 
{

  const location = useLocation()
  const urlActual = location.pathname

  return (
    <div className='md:flex md:min-h-screen'>

      <div className='md:w-1/4 bg-sky-900 px-5 py-10'>

        <h2 className='text-4xl font-black text-center text-white underline'>Fundamentos</h2>

        <nav className='mt-10'>

          <Link to='/fundamentos' className={`${urlActual === '/fundamentos' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>1.React</Link>

          <Link to='/usestate' className={`${urlActual === '/usestate' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>2.useState</Link>
          
          <Link to='/useffect' className={`${urlActual === '/useffect' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>3.useEffect</Link>
          
          <Link to='/customhook' className={`${urlActual === '/customhook' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>4.customHook</Link>
          
          <Link to='/props' className={`${urlActual === '/props' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>5.Props</Link>
          
          <Link to='/zustand' className={`${urlActual === '/zustand' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>7.Zustand</Link>
          
          <Link to='/rederizado' className={`${urlActual === '/rederizado' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>9.Renderizado</Link>
          
          <Link to='/localstorage' className={`${urlActual === '/localstorage' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>10.localStorage</Link>
          
        </nav>

      </div>

      <div className='md:w-3/4 p-10 md:h-screen overflow-y-scroll'>

          <Outlet/>

      </div>

    </div>
  )
}

export default LandingPage