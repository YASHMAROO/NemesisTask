import React, { useState} from 'react'
import axios from 'axios';

const Details = () => {
    const [username, setUsername] = useState();
    const [usernameErr, setUsernameErr] = useState({});
    const [address, setAddress] = useState();
    const [number, setNumber] = useState();
    const [email, setEmail] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) {
            let formData = {
                username: username.trim(),
                email: email,
                number: number,
                address: address
            }
            let token=localStorage.getItem('token')
            console.log(typeof (token))
            axios.post('http://localhost:5000/details', formData, {
                headers: {
                    'x-access-token': token
                }
            })
                .then(res => {
                    if(res.status===200) {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err);
                })
            console.log(formData);
        }
    }

    const formValidation = () => {
        const usernameErr = {};
        let isValid = true;
        for(let i=0; i<username.trim().length;i++) {
            if((username[i]>='a' && username[i]<='z') || (username[i]>='A' && username[i]<='Z') || (username[i]>='0' && username[i]<='9')) {
                continue;
            } else {
                console.log(username[i]);
                usernameErr.error = "Invalid Username (Can Contain only alphanumeric characters)";
                isValid = false;
                break;
            }
        }
        setUsernameErr(usernameErr);
        return isValid;
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
            <h1>Enter the user Details</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label><br />
                    <input
                      type="text"
                      value={username}
                      name="username"
                      placeholder="Username"
                      required
                      onChange={e=>{setUsername(e.target.value)}} 
                    />
                </div>
                <br />
                {Object.keys(usernameErr).map(key => {
                    return (
                        <div>
                            <div>{usernameErr[key]}</div><br />
                        </div>
                    )
                })}
                
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="John@doe.in"
                      required
                      onChange={e=>{setEmail(e.target.value)}} 
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="number">
                        Phone Number
                        Requested format: 10digit standard number
                    </label><br />
                    <input
                      type="tel"
                      value={number}
                      name="number"
                      pattern="[0-9]{10}"
                      placeholder="987654321"
                      required
                      onChange={e=>{setNumber(e.target.value)}} 
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="address">Address</label><br />
                    <input
                      type="text"
                      value={address}
                      name="address"
                      placeholder="Address"
                      required
                      onChange={e=>{setAddress(e.target.value)}} 
                    />
                </div>
                <br />
                <div>
                    <input type="submit" value="Submit" /><br />
                </div>
            </form>
        </div>
    )
}

export default Details
