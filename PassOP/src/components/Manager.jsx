import React from 'react'
import { useRef , useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref=useRef()
  const passwordRef=useRef()
  const [form, setform] = useState({site:"", username:"", password:""})
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords=localStorage.getItem("passwords")
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  
  }, [])
  

  const showpassword=() => {
    passwordRef.current.type="text"
    if(ref.current.src.includes("icons/eyecross.png")){
      ref.current.src="icons/eye.png"
      passwordRef.current.type="password"
    }
    else{
      ref.current.src="icons/eyecross.png"
      passwordRef.current.type="text"
    }
    
  }

  const savepassword=() => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length>3){

      setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
      localStorage.setItem("passwords",JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
      setform({site:"", username:"", password:""})
      toast('Password saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast('Error:Password not saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const deletepassword=(id) => {
    let c=confirm("Do you really want to delete this Password?")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
  }

  const editpassword=(id) => {
    setform(passwordArray.filter(item=>item.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    // setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
    // localStorage.setItem("passwords",JSON.stringify([...passwordArray,form]))
 
  }
  
  const handlechange=(e) => {
    setform({...form, [e.target.name]:e.target.value})
  }

  const copytext=(text)=>{
    toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    navigator.clipboard.writeText(text)
  }
  
  return (
    <>
    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
      linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full
     bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

        <div className=" p-2 md:p-0 mycontainer min-h-[84.5vh]">
            <h1 className='text-4xl font-bold text-center'>
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </h1>
            <p className='text-green-900 text-lg text-center'>Your own password manager</p>
            <div className="flex flex-col p-4 text-black gap-8 items-center">
                <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='bg-white rounded-full border border-green-700 w-full p-4 py-1' type="text"  name="site" id="site"/>
                <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                     <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='bg-white rounded-full border border-green-700 w-full p-4 py-1' type="text" name="username" id="username"/>
                     <div className="relative flex items-center">
                        <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='bg-white rounded-full border border-green-700 w-full p-4 py-1' type="password" name="password" id="password"/>
                        <span className='absolute right-0 cursor-pointer' onClick={showpassword}>
                          <img ref={ref} className='w-6 mx-2' with={26} src="icons/eye.png" alt="eye" />
                        </span>
                     </div>
                </div>
                <button onClick={savepassword} className='cursor-pointer flex justify-center gap-4 items-center bg-green-600 hover:bg-green-500 rounded-full w-fit px-8 py-2'>
                    <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                    </lord-icon>
                    Add Password</button>
            </div>

            <div className="passwords">
              <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
              {passwordArray.length===0 && <div>No Passwords to show </div>}
              {passwordArray.length!=0 && 
              <table className="table-auto w-full rounded-md overflow-hidden">
                  <thead className='bg-green-800 text-white'>
                    <tr>
                      <th className='py-2'>Site</th>
                      <th className='py-2'>Username</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-green-100'>
                    {passwordArray.map((item,index)=>{
                      return <tr key={index}>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <a href={item.site} target='_blank'>{item.site}</a>
                            <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copytext(item.site)}}>
                              <lord-icon
                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover" >
                              </lord-icon>
                            </div>
                          </div>  
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <span>{item.username}</span>
                            <div className='lordinconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                              <lord-icon
                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover" >
                              </lord-icon>
                            </div> 
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <span>{item.password}</span>
                            <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copytext(item.password)}}>
                              <lord-icon
                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover" >
                              </lord-icon>
                            </div> 
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <span className='cursor-pointer mx-1' onClick={()=>{editpassword(item.id)}}>
                            <lord-icon
                               src="https://cdn.lordicon.com/gwlusjdu.json"
                               trigger="hover"
                               style={{"width":"25px", "height":"25px"}}>
                            </lord-icon>
                          </span> 
                          <span className='cursor-pointer mx-1' onClick={()=>{deletepassword(item.id)}}>
                            <lord-icon
                               src="https://cdn.lordicon.com/skkahier.json"
                               trigger="hover"
                               style={{"width":"25px", "height":"25px"}}>
                            </lord-icon>
                          </span>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>}
            </div>
        </div>

        
        </>
  )
}

export default Manager
