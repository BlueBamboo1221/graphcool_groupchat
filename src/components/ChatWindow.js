import React, { Component } from 'react';
import SideBar from './SideBar';
import MessageContainer from './MessageContainer';
import { inject, observer } from 'mobx-react';

@inject('chatStore')
@observer
export default class ChatWindow extends Component {
    
    componentWillMount() {
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/signin')
        }
    }
    render() {
        return(
            <div style={styles.container}>
                <SideBar />
                <MessageContainer roomId={this.props.chatStore.roomId} />
            </div>
        )
    }
}

const styles = {
    container: {
        display                 : 'flex',
        justifyContent          : 'flex-start',
        flexWrap                : 'wrap'
    }
}