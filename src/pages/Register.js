import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    let navigate = useNavigate();

    const OnSubmit = async (e) => {
        e.preventDefault();
        const new_user = {username, email, password, password2}
    
        try{
            const res = await fetch('http://127.0.0.1:8000/api/employees/register/', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(new_user)})
            if(res.status === 200){
                navigate('/')
            }
            else{
                alert('There was something wrong with your input! Please try again')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css	"/>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <h2>
                        Register
                    </h2>
                    <br/>
                        <div className="form-data">
                            <div className="forms-inputs mb-4"> <span>Username</span> <input autoComplete="off" type="text" onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                            <div className="forms-inputs mb-4"> <span>Email</span> <input autoComplete="off" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="forms-inputs mb-4"> <span>Password</span> <input autoComplete="off" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="forms-inputs mb-4"> <span>Confirm Password</span> <input autoComplete="off" type="password" onChange={(e) => setPassword2(e.target.value)} required/>
                            </div>
                            <div className="mb-3"> <button className="btn btn-dark w-100" onClick={OnSubmit}>Register</button> </div>
                            <Link to='/login' style={{color:'black'}}>
                                Login
                            </Link>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register
