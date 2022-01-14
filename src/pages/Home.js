import React, {useState, useEffect} from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const [employeeData, setEmployeeData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {

            // fetch1 is the fucntion that will make a GET request with the current access token in the local storage
            const fetch1 = async () => {
                const res = await fetch('http://127.0.0.1:8000/api/employees/', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.token
                    }
                })
                console.log('fetch1 was called')
                // if the fetch function returns a 401 error, return the response of the fetch function, else return
                if(res.status === 401){
                    console.log('401 error detected')
                }
                else{
                    console.log('passed first if case')
                    const data = await res.json()
                    setEmployeeData(data)
                }
                return res
            }

            // fetch2 is the function that makes a POST request to refresh view to generate new access token to replace access token in local storage and then call fetch1 again if new access token was successful
            const fetch2 = async () => {
                const res2 = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({'refresh': localStorage.refresh})
                })
                console.log('fetch2 was called')

                if(res2.status === 401){
                    navigate('./login')
                    console.log('failed to get new access token, redirecting to login page')
                }
                else{
                    const new_access = await res2.json()
                    localStorage.setItem('token', new_access.access)
                    console.log('new token received, local storage being updated')
                    await fetch1();
                }
            }

            // this portion is the actual implementation of said functions
            const test = await fetch1()
            if(test.status === 401){
                console.log('fetch2 is being called')
                fetch2()
            }
        
        }
        fetchData()
      }, [])

    const onDelete = async (id) => {
    
        await fetch(`http://127.0.0.1:8000/api/employees/${id}/`, {
        method:'DELETE',
        headers: {'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.token}
        ,}
        )
    
        setEmployeeData(employeeData.filter( employee => employee.id !== id ))
    }
    

    return (
        <div>
            <table className='table'>
                <thead className='table-header'>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Email Address
                        </th>
                        <th>
                            Gender
                        </th>
                        <th>
                            NRIC
                        </th>
                        <th>
                            Start Date Of Employment
                        </th>
                        <th>
                            End Date Of Employment
                        </th>
                        <th>
                            Date Of Birth
                        </th>
                        <th>
                            Home Address
                        </th>
                        <th>
                            Bank Provider
                        </th>
                        <th>
                            Bank Account Number
                        </th>
                        <th>
                            Salary
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((employee) =>
                        <tr key={employee.id}>
                            <td>
                                {employee.name}
                            </td>
                            <td>
                                {employee.email}
                            </td>
                            <td>
                                {employee.gender}
                            </td>
                            <td>
                                {employee.nric}
                            </td>
                            <td>
                                {employee.start}
                            </td>
                            <td>
                                {employee.end}
                            </td>
                            <td>
                                {employee.birthday}
                            </td>
                            <td>
                                {employee.address}
                            </td>
                            <td>
                                {employee.bank}
                            </td>
                            <td>
                                {employee.bank_number}
                            </td>
                            <td>
                                {employee.salary}
                            </td>
                            <td>
                                <Link to='/edit' state={{ employee : employee}}>
                                    <FaEdit size='20px' color='black'/>
                                </Link>
                                <button style={{backgroundColor:"transparent", borderColor:'transparent', cursor:'pointer'}} onClick={() => onDelete(employee.id)}>
                                    <FaTrashAlt size='20px' color='black'/>
                                </button>
                            </td>
                        </tr>
                        
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home
