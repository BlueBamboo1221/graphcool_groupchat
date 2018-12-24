import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('chatStore')
@observer
class Register extends Component {
    state = {
        email                   : '',
        password                : '',
        passwordConfirm         : '',
        name                    : '',
        error                   : ''
    }
    componentWillMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/chat')
        }
    }

    handleSubmit = async (e, email, password, name) => {
        e.preventDefault();
        let { passwordConfirm } = this.state;
        if (password !== passwordConfirm) {
            this.setState({
                error: 'Passwords must be an equal! Try again!'
            });
            return;
        }
        await this.props.chatStore.register(email, password, name)
        .then((data) => {
            console.log(data)
            this.props.history.push('/signin')
        }).catch((error) => {
            console.log("ЁБА...",error)
            this.setState({
                error: "Oops! User already exists with that information"
            })
        })
        // this.props.history.push('/chat')
        console.log(name, email, password)
    }

    render() {
        let { email, password, passwordConfirm, name, error } = this.state;
        return (
            <div className='container'>
                <h2 style={{textAlign: 'center'}}>Register User</h2>
                <form style={{width: '25%', margin: '0 auto'}} onSubmit={e => this.handleSubmit(e, email, password, name)}>
                    <div>
                        <label className='input-label' htmlFor="name">Name:</label>
                        <input className='input-field' onChange={e => this.setState({name: e.target.value, error: ''})} value={name} name="name" autoComplete='name' type="text" placeholder="Your Name..." required />
                    </div>
                    <div>
                        <label className='input-label' htmlFor="email">Email:</label>
                        <input className='input-field' onChange={e => this.setState({email: e.target.value, error: ''})} value={email} name="email" autoComplete='email' type="email" placeholder="Your Email..." required/>
                    </div>
                    <div>
                        <label className='input-label' htmlFor="password">Password:</label>
                        <input className='input-field' onChange={e => this.setState({password: e.target.value})} value={password} autoComplete='current-password' name="password" type="password" placeholder="Your Password..." required/>
                    </div>
                    <div>
                        <label className='input-label' htmlFor="password">Confirm Password:</label>
                        <input className='input-field' onChange={e => this.setState({passwordConfirm: e.target.value})} value={passwordConfirm} autoComplete='current-password' name="password" type="password" placeholder="Your Password..." required/>
                    </div>
                    <button className='input-submit' type='submit'>Create Account</button>
                </form>
                { error ? <div className='form-error'>{error}</div> : ''}
            </div>
        )
    }
}

export default Register;