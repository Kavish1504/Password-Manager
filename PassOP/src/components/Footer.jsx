import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-centerw-full'>
        <div className='text-white font-bold text-2xl logo'>
            <h1 className='text-4xl font-bold text-center'>
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </h1>
        </div>
        <div className='flex justify-center items-center'>Created With <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Kavish</div>
    </div>
  )
}

export default Footer
