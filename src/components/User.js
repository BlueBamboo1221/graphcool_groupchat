import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('chatStore')
@observer
class User extends Component {
    state = {
        editMessage: false,
    }
    render() {
        let { name, btnName, btnClick, key, id } = this.props;
    return (
        <div key={key} id={id} className="modal-add-users">
            <div>{name}</div>
            <button className="default-button" onClick={btnClick}>{btnName}</button>
        </div>
    )
    }
}

const styles = {
    edit: {
        background: 'transparent',
        border: 'none',
        color: 'black'
    },
    delete: {
        background: 'transparent',
        border: 'none',
        color: 'red'
    }
}

export default User;