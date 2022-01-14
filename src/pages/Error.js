import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <section>
            <div>
                <h1>oops! it's a dead end</h1>
                <Link to='/' >back home</Link>
            </div>
        </section>   
    )
}

export default Error
