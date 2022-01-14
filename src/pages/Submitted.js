import React from 'react'
import { Link } from 'react-router-dom'

const Submitted = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css	"/>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <h2>Thank you for your entry!</h2>
                        <br/>
                        <Link to='/form'><button className='btn btn-dark w-100'>Submit another entry</button></Link>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Submitted
