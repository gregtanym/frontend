import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Form = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [nric, setNric] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState(null)
    const [birthday, setBirthday] = useState("")
    const [address, setAddress] = useState("")
    const [bank, setBank] = useState("")
    const [bank_number, setBankNumber] = useState("")
    const [salary, setSalary] = useState("")

    const [isPending, setIsPending] = useState(false)
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const entry = {name, email, gender, nric, start, end, birthday, address, bank, bank_number, salary}
        setIsPending(true)
        console.log(entry)

        try{
            const res = await fetch('http://127.0.0.1:8000/api/employees/create/', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(entry)})
            setIsPending(false)
            if (res.status === 400) {
                navigate('../formerror')
            }
            else{
                navigate('../submitted')
            }
        }catch(error){
            console.log('error')
            setIsPending(false)
        }
    }


    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css	"/>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <h2>Reluvate Employee Details</h2>
                        <br/>
                        <div className="form-data">
                            <form onSubmit={onSubmit} >
                                <div className='forms-inputs mb-4'>
                                    <span>Name</span>
                                    <input type='text' autoComplete='off' onChange={(e) => setName(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Email Address</span>
                                    <input type='text' autoComplete='off' onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className='form-check'>
                                    <span>
                                        Gender
                                    </span>
                                    <br/>
                                    <div className='radio-input'>
                                        <input className="form-check-input" type='radio' value='Male' name='gender' onClick={() => setGender('Male')} required/>
                                        <label className='form-check-label' >
                                            Male
                                        </label>
                                    </div>
                                    <div className='radio-input'>
                                        <input className='form-check-input' type='radio' value='Female' name='gender' onClick={() => setGender('Female')}/>
                                        <label className='form-check-label' >
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>NRIC</span>
                                    <input type='text' autoComplete='off' onChange={(e) => setNric(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Start Date of Employment</span>
                                    <input type='date' onChange={(e) => setStart(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>End Date of Employment</span>
                                    <input type='date' onChange={(e) => setEnd(e.target.value)}/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Date Of Birth</span>
                                    <input type='date' onChange={(e) => setBirthday(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Home Address</span>
                                    <input type='text' autoComplete='off' onChange={(e) => setAddress(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Bank Provider</span>
                                    <input type='text' autoComplete='off' onChange={(e) => setBank(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Bank Account Number</span>
                                    <input type='number' autoComplete='off' onChange={(e) => setBankNumber(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Salary</span>
                                    <input type='number' autoComplete='off' onChange={(e) => setSalary(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    {!isPending ? <input type='submit' className='btn btn-dark w-100'/> : <input type='submit' disabled='disabled' className='btn btn-dark w-100' value='Loading...'/>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form


// have a new state that had true or false value and changes everytime the radio button is clicked. when true, assign the value of the input to the state
// likely have to use useeffect too. and do one for male and one for female 