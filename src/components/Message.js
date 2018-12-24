import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('chatStore')
@observer
class Message extends Component {
    state = {
        editMessage: false,
        newMessage: this.props.post.description
    }
    render() {
        let { from, userName, files, time, post: { description }, id } = this.props;
    return (
        <div
            className="messageContainer" style={(from === 'You') ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}
        >
            <div className="message" style={(from === 'You') ? { borderBottomRightRadius: '0' } : { borderBottomLeftRadius: '0' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginRight: '20px' }}>{userName}</div>
                    <div>{time}</div>
                </div>

                <br />

                {!this.state.editMessage
                    ? <div>{description}</div> 
                    : <div style={{display: 'flex', alignItems: 'flex-start'}}>
                        <textarea
                            style={{padding: 5, border: '1px solid lightgrey', borderRadius: 5, boxSizing: 'border-box'}}
                            type="text"
                            value={this.state.newMessage}
                            onChange={(e) => this.setState({newMessage: e.target.value})}
                        />
                        <button 
                            className="default-button ml-15"
                            onClick={() => {
                                this.props.chatStore.editPost(id, this.state.newMessage);
                                this.setState({
                                    editMessage: false,
                                    newMessage: ''
                                })
                            }}
                        >
                            Change
                        </button>
                    </div>
                }

                {files !== undefined ? <a href={files.url} target="_blank"><img alt={files.url} src={files.url} /></a> : ''}

                <div className="message-buttons">
                    <button 
                        style={styles.edit}
                        onClick={() => this.setState({editMessage: true})}
                    >
                        Edit
                    </button>

                    <button
                        style={styles.delete}
                        onClick={() => this.props.chatStore.deletePost(id)} 
                    >
                        Delete
                    </button>
                </div>
            </div>
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

export default Message;