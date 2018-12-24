import React from 'react';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';

const UsersList = inject('chatStore')(observer(props => {
    const addNewRoomWithUser = (userName, userId) => {
        props.chatStore.createRoom(userName, [localStorage.getItem('userId'), userId]);
    }
    if (props.chatStore.usersLoading) {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Loader type="Puff" color="rgb(225, 0, 152)" height={30} width={30} />
            </div>
        )
    }
    return (
        <div className="users-list">
            {props.chatStore.users.map(user => (
                <div
                    className="single-user"
                    id={user.id}
                    key={user.id}
                >
                    <div style={(user.id === localStorage.getItem('userId')) ? {backgroundColor:'green'} : {}} className="user-thumb"></div>
                    <div>{user.name === localStorage.getItem('userName') ? <div>{user.name} - is You!</div> : user.name}</div>
                    <button 
                        className="default-button chat-button"
                        onClick={() => addNewRoomWithUser(user.name, user.id)}
                    >
                        Chat
                    </button>
                </div>
            ))}
        </div>
    )
}));

export default UsersList;
