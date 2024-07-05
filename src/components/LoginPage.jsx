import Logo from "./Logo"

const Login = () => {
  return (
    <div className='my-20 space-y-2'>
      <h1 className='text-6xl text-center flex gap-5 font-serif font-bold m-3'><Logo/>MyPass</h1>
      <div className='text-lg'>Let's MyPass make to remember your passwords</div>
      <div className='text-lg'>And keeps it between you and MyPass</div>
    </div>
  )
}

export default Login
