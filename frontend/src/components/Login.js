import React , { useReducer } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const Login = () => {
    let history = useHistory();
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', 
            formData)
            .then(res => {
                if(res.status === 200) {
                    let token = "Bearer " + res.data.token;
                    localStorage.setItem('token', token);
                    alert(res.data.message);
                    history.push('/screen2');
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                alert("Invalid Credentials");
                history.push('/');
                console.log(err);
            })
    }

    const handleChange = (e) => {
        setFormData ({
            name: e.target.name,
            value: e.target.value
        })
    }   
    return (
        <div>
            <h1>Login</h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                      type="email"
                      name="email"
                      placeholder="John@doe.in"
                      required
                      onChange={handleChange} 
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="password">Password</label><br />
                    <input
                      type="password"
                      name="password"
                      id="pass"
                      required
                      placeholder='Enter
                      your
                      password'
                      onChange={handleChange} 
                    />
                </div>
                <br />

                <div>
                    <input type="submit" value="Login" /><br />
                </div>
            </form>

        </div>
    )
}

export default Login
