import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import UsersList from './UsersList';
import RoomsList from './RoomsList';
import Modal from 'react-modal';

@inject('chatStore')
@observer
class SideBar extends Component {

    state = {
        newRoomInputVisible: false,
        newRoomName: '',
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    addNewRoom = () => {
        this.props.chatStore.createRoom(this.state.newRoomName, [localStorage.getItem('userId')]);
        this.setState({
            newRoomName: '',
            modalIsOpen: false
        })
    }

    renderRoomInput = () => {
        return (
            <div style={styles.userModalContainer}>
                <input
                    className="input-field"
                    onChange={(e) => this.setState({newRoomName: e.target.value})}
                    type="text" value={this.state.newRoomName}
                    placeholder="Type room name..."
                />
            </div>
        )
    }

    render() {
        return(
            <div style={styles.sidebar}>

                <div style={styles.sidebarRoomsHead}>
                    <h3>Rooms:</h3>
                    <button className="default-button" onClick={() => this.setState({modalIsOpen: true})}>Add new</button>
                </div>

                <Modal
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Add Room"
                        style={customModalStyles}
                    >
                        <div style={styles.userModalHeader}>
                            <h3 style={{margin: 0}}>Create new Room:</h3>
                            <button
                                style={styles.userModalClose}
                                onClick={this.closeModal}
                            >
                                <span style={styles.userModalCloseIcon}>+</span>

                            </button>
                        </div>
                        
                        <div style={styles.userModalList}>
                            {this.renderRoomInput()}
                        </div>
                        <div style={styles.userModalFooter}>
                            <button className="default-button ml-15" onClick={this.addNewRoom}>Create</button>
                        </div>
                        
                    </Modal>


                

                <RoomsList />
                
                <h3>Users:</h3>
                <UsersList />
            </div>
        )
    }
}

const styles = {
    sidebar: {
        width: '300px',
        height: '92.5vh',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#d4e0ea'
    },
    sidebarRoomsHead: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    userModalList: {
        maxHeight                  : '400px',
        // overflowY               : 'scroll'
    },
    userModalHeader: {
        display                 : 'flex',
        justifyContent          : 'space-between',
        alignItems              : 'flex-start',
        marginBottom            : 10
    },
    userModalClose: {
        borderRadius            : '50%',
        width                   : 20,
        height                  : 20,
        border                  : 'none',
        position                : 'relative',
        background              : 'rgb(225, 0, 152)'
    },
    userModalCloseIcon: {
        position                : 'absolute',
        top                     : 3,
        left                    : 6,
        color                   : 'white',
        fontWeight              : 'bold',
        transform               : 'rotate(45deg)'
    },
    userModalFooter: {
        display                 : 'flex',
        justifyContent          : 'flex-end'
    },
    userModalContainer: {
        display                 : 'flex',
        alignItems              : 'baseline'
    }
}

const customModalStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '500px',
      
    }
};


export default SideBar;
