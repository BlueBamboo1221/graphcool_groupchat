import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('chatStore')
@observer
class SignIn extends Component {
    state = {
        email                   : '',
        password                : '',
        error                   : ''
    }
    componentWillMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/chat')
        }
    }

    handleSubmit = async (e, email, password) => {
        e.preventDefault();
        // let { email, password } = this.state;
        await this.props.chatStore.signIn(email, password)
        .then(({data: { signinUser: { token, user: {id, name } }}}) => {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', name);
            this.props.history.push('/chat')
            console.log(name,id,token)
        }).catch(error => {
            this.setState({
                error: 'No user found with that information'
            })
        });
        
        console.log(this.state.email, this.state.password)
    }

    render() {
        let { email, password, error } = this.state;
        return (
            <div className='container'>
                <h2 style={{textAlign:'center'}}>Sign In</h2>
                <form style={styles.formStyle}
                    onSubmit={(e) => this.handleSubmit(e,email,password)}
                >
                    <div>
                        <label className="input-label" htmlFor="email">Email:</label>
                        <input className="input-field" onChange={e => this.setState({email: e.target.value, error: ''})} value={email} name="email" type="email" placeholder="Your Email..." />
                    </div>

                    <div>
                        <label className="input-label" htmlFor="password">Password:</label>
                        <input className="input-field" onChange={e => this.setState({password: e.target.value, error: ''})} value={password} name="password" type="password" placeholder="Your Password..." />
                    </div>

                    <button className='input-submit'>Sign In</button>
                </form>

                {(error !== '') ? <div className='form-error'>{error}</div> : ''}
            </div>

        )
    }
}

const styles = {
    formStyle: {
        width                   : '25%',
        margin                  : '0 auto',
        textAlign               : 'center'
    }
}

export default SignIn;