import React, { Component } from 'react';
import AUTH_SERVICE from '../../../services/AuthService';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        message: null
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmission = event => {
        event.preventDefault();
        const { email, password } = this.state;

        AUTH_SERVICE
            .login({ email, password })
            .then(responseFromServer => {
                const { user } = responseFromServer.data;
                // lift user up to App.js
                this.props.onUserChange(user);
                this.props.history.push('/profile'); // redirect back to the home page
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    return this.setState({ message: err.response.data.message });
                }
            });
    }

    render() {
        return (
            <section className='center-content'>
                <form className='form' onSubmit={this.handleFormSubmission}>
                    <h3>Login</h3>
                    <input
                        name='email'
                        type='email'
                        placeholder='Email address'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <br/>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <br/>
                    <button> Login </button>
                </form>
                {this.state.message && <div> {this.state.message} </div>}
            </section>
        )
    }
}
