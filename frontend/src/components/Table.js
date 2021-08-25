import axios from 'axios';
import React, {useEffect, useState} from 'react'

const Table = () => {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        let token=localStorage.getItem('token');
        axios.get('http://localhost:5000/get_details', {
            headers: {
                'x-access-token': token
            }
        }).then(res => {
            setDetails(
                res.data.details
            )
        })
    },[])

    const deleteUser = (e) => {
        const url="http://localhost:5000/delete_user/" + e.target.id;
        let token=localStorage.getItem('token');
        axios.delete(url , {
            headers: {
                'x-access-token': token
            }
        }).then(res => {
            if(res.status===200) {
                alert(res.data.message)
                window.location.reload(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="/screen2/details_table">Users Table</a>
                    </li>
                    <li>
                        <a href="/screen2">Add User</a>
                    </li>
                </ul>
            </nav>
            <br />
            <br />
            <table>
                <tr>
                    <th>Username</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Delete</th>
                </tr>
                {
                    details.length>0 && (
                        details.map(detail => {
                            return (
                                <tr>
                                    <td>
                                        {detail.username}
                                    </td>
                                    <td>
                                        {detail.number}
                                    </td>
                                    <td>
                                        {detail.email}
                                    </td>
                                    <td>
                                        {detail.address}
                                    </td>
                                    <td>
                                        <button onClick={deleteUser} id={detail._id}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    )
                }
            </table>
        </div>
    )
}

export default Table
