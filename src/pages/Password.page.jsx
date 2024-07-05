import { useContext, useEffect } from "react"
import Navbar from "../components/Navbar"
import { UserContext } from "../contexts/user.context"
import Delete from "../components/Delete"
import Edit from "../components/Edit"
import { useNavigate } from "react-router-dom"

const Password  = () => {

  const navigate = useNavigate()

  const {pass, setPass, passes, setPasses} = useContext(UserContext)

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasses(passwords)
    console.log(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, [])
  

  const onEdit = async(e, id) => {
      const redirectTo = location.search.replace("?redirectTo=", "");
      navigate(redirectTo ? redirectTo : "/");
      console.log(id)
      await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id})})
      let index = passes.findIndex(item=>{
        return item.id === id;
      })
      setPass({appName:passes[index].appName, appPassword:passes[index].appPassword})
      console.log(passes[index].appName, passes[index].appPassword)
      let newPasses = passes.filter(item=>{
        return item.id !== id;
      })
      setPasses(newPasses);
  }

  const onDelete = async(e, id) => {
    let newPasses = passes.filter(item=>{
      return item.id !== id;
    })
    setPasses(newPasses);
    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id})})
  }

  return (
      <>
        <Navbar/>
        <h1 className="font-bold text-3xl my-6 text-center">Your Passwords</h1>
        {Array.isArray(passes) && passes.length > 0 ? (
        passes.map((item) => (
          <div
            key={item.id}
            className="box hover:cursor-pointer font-semibold flex w-[50%] mx-auto p-3 justify-center hover:justify-between items-center rounded-xl"
          >
            <div className="app text-2xl text-center">{item.appName}</div>
            <div className="pass">{item.appPassword}</div>
            <div className="flex gap-5">
              <button className="pass hover:bg-[skyblue] rounded-full p-2" onClick={(e)=>{onDelete(e, item.id)}}>
                <Delete/>
              </button>
              <button className="pass hover:bg-[skyblue] rounded-full p-2" onClick={(e)=>{onEdit(e, item.id)}}>
                <Edit/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No save passwords</p>
      )}
      </>
  )
}


export default Password
