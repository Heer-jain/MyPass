import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import LoginPage from "../components/LoginPage";
 
const Signup = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 // As explained in the Login page.
 const { emailPasswordSignup } = useContext(UserContext);
 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // As explained in the Login page.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 
 // As explained in the Login page.
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // As explained in the Login page.
 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } 
   catch (error) {
     alert(error);
   }
 };
 
 return <div className="body h-[100vh]">
 <form style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "auto" }}>
    <LoginPage/>
   <h1 className="text-3xl font-bold">Signup</h1>
   <input placeholder="Enter your email" className="text-white bg-transparent border border-gray-500 p-2 my-2 rounded-md"
     label="Email"
     type="email"
    //  variant="outlined"
     name="email"
     value={form.email}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <input placeholder="Password" className="text-white bg-transparent border border-gray-500 p-2 my-2 rounded-md"
     label="Password"
     type="password"
    //  variant="outlined"
     name="password"
     value={form.password}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Signup
   </Button>
   <p className="my-2">Have an account already? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
 </form>
 </div>
}
 
export default Signup;