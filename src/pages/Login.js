import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const OnSubmit = async (e) => {
        e.preventDefault();
        const user = {username, password}
    
        try{
            const res = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)})
            const data = await res.json()
            localStorage.setItem('token', data.access)
            localStorage.setItem('refresh', data.refresh)
            if(res.status === 200){
                navigate('/')
            }
            else{
                for(var propName in data) {
                    if(data.hasOwnProperty(propName)) {
                        var propValue = data[propName];
                        alert(propName.charAt(0).toUpperCase() + propName.slice(1) + ': ' + propValue)
                    }
                }
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
                        Login
                    </h2>
                    <br/>
                    <div className="card p-5" id="form1">
                        <form className="form-data">
                            <div className="forms-inputs mb-4"> <span>Username</span> <input autoComplete="off" type="text" onChange={e => setUsername(e.target.value)} required/>
                            </div>
                            <div className="forms-inputs mb-4"> <span>Password</span> <input autoComplete="off" type="password" onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3"> <button className="btn btn-dark w-100" onClick={OnSubmit}>Login</button> </div>
                            <Link to='/register' style={{color:'black'}}>
                                Register
                            </Link>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login