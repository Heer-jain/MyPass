import Navbar from '../components/Navbar';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import {v4 as uuidv4} from "uuid"

const Home = ()=> {
  const [success, setSuccess] = useState("")
  const {pass, setPass, passes, setPasses} = useContext(UserContext);

  const onChangeAppName = (e) => {
    const { name, value } = e.target;
   setPass({ ...pass, [name]: value });
  console.log(name, value)
  }

  // const onChangeAppPassword = (e) => {
  //   setPass.appPassword(e.target.value)
  // }

  const onSave = async() => {
    setPasses([...passes, {id: uuidv4(), appName: pass.appName, appPassword: pass.appPassword}])
    await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify({...passes, id: uuidv4(), appName: pass.appName, appPassword: pass.appPassword})})
    setPass({
      appName: "",
      appPassword: ""
    })
    setSuccess("Saved successfully!")
    setTimeout(() => {
      setSuccess("")
    }, 3000);
  }


 return (
   <>
     <Navbar/>
     <div className=' text-center p-5'>
      <h1 className='text-2xl m-4 font-semibold'>Save your passwords using MyPass</h1> 
        <input type="text" name="appName" value={pass.appName} onChange={onChangeAppName} placeholder='Enter app name' className='p-2 m-3 rounded-lg w-96 text-black'/>
        <div><input type="password" name="appPassword" value={pass.appPassword} onChange={onChangeAppName} placeholder='Enter password' className='p-2 m-3 rounded-lg w-96 text-black'/></div>
        <div className='bg-[skyblue] w-20 rounded-lg text-blue-950 font-semibold my-3 mx-auto px-3 py-1 text-xl'><button onClick={onSave}>Save</button></div>
        <div className='text-green-500 text-2xl'>{success}</div>
      </div>
   </>
 )
}

export default Home