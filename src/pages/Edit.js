import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Edit = () => {

    const history = useLocation()
    const { employee } = history.state

    const [name, setName] = useState(employee.name)
    const [email, setEmail] = useState(employee.email)
    const [gender, setGender] = useState(employee.gender)
    const [nric, setNric] = useState(employee.nric)
    const [start, setStart] = useState(employee.start)
    const [end, setEnd] = useState(employee.end)
    const [birthday, setBirthday] = useState(employee.birthday)
    const [address, setAddress] = useState(employee.address)
    const [bank, setBank] = useState(employee.bank)
    const [bank_number, setBankNumber] = useState(employee.bank_number)
    const [salary, setSalary] = useState(employee.salary)

    const [isPending, setIsPending] = useState(false)
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const entry = {name, email, gender, nric, start, end, birthday, address, bank, bank_number, salary}
        console.log(end>start)
        setIsPending(true)
        
        try{
            const res = await fetch(`http://127.0.0.1:8000/api/employees/${employee.id}/`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.token
                },
            body: JSON.stringify(entry)})
            if (res.status === 400) {
                alert('There was something wrong with your input! Please try again')
            }
            else{
                console.log('success')
                navigate('/')
            }
            setIsPending(false)
        }
        catch(error){
            console.log(error)
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
                                    <input type='text' autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Email Address</span>
                                    <input type='text' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className='form-check'>
                                    <span>
                                        Gender
                                    </span>
                                    <br/>
                                    <div className='radio-input'>
                                        <input className="form-check-input" type='radio' value='Male' name='gender' defaultChecked={gender === 'Male' ? true : false} onClick={() => setGender('Male')} required />
                                        <label className='form-check-label' >
                                            Male
                                        </label>
                                    </div>
                                    <div className='radio-input'>
                                        <input className='form-check-input' type='radio' value='Female' name='gender' defaultChecked={gender === 'Female' ? true : false} onClick={() => setGender('Female')}/>
                                        <label className='form-check-label' >
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>NRIC</span>
                                    <input type='text' autoComplete='off' value={nric} onChange={(e) => setNric(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Start Date of Employment</span>
                                    <input type='date' value={start} onChange={(e) => setStart(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>End Date of Employment</span>
                                    <input type='date' value={end == null ? "" : end} onChange={(e) => setEnd(e.target.value)}/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Date Of Birth</span>
                                    <input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Home Address</span>
                                    <input type='text' autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Bank Provider</span>
                                    <input type='text' autoComplete='off' value={bank}onChange={(e) => setBank(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Bank Account Number</span>
                                    <input type='number' autoComplete='off' value={bank_number} onChange={(e) => setBankNumber(e.target.value)} required/>
                                </div>
                                <div className='forms-inputs mb-4'>
                                    <span>Salary</span>
                                    <input type='number' autoComplete='off' value={salary} onChange={(e) => setSalary(e.target.value)} required/>
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

export default Edit