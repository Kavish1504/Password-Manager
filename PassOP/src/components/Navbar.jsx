import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14 ">
            <div className="logo font-bold text-2xl">
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
                </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a  className='hover:font-bold' href="/">Home</a>
                    <a  className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold'  href="#">Contact</a>
                </li>
            </ul> */}

            <button className='flex justify-center items-center cursor-pointer bg-slate-800 rounded-lg my-5'>
              <img className='invert w-10 p-1' src="/icons/github.svg" alt="" />
              <span className='px-2 font-bold'>GitHub</span>
            </button>
      </div>
    </nav>
  )
}

export default Navbar
