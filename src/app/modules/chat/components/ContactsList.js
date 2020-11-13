import React from "react";

import PerfectScrollbar from 'react-perfect-scrollbar';
import { shallowEqual, useSelector } from "react-redux";

import * as moment from 'moment'

import { Link } from "react-router-dom";
import { Media } from "reactstrap";
import { ContactsListSelector, selectedUserSelector } from "../_redux/selectors";

const ContactsList = ({userChatOpen})=>{

    const {user} = useSelector(
        state=>({user:state.auth.user}),
        shallowEqual
    );

    const selectedUser= useSelector(
        selectedUserSelector,
        shallowEqual
    );

    const users = useSelector(
        ContactsListSelector(user),
        shallowEqual
    );

    return(
        <div>
            <h5 className="font-size-14 mb-3">Recientes</h5>
            <ul className="list-unstyled chat-list">
                <PerfectScrollbar style={{ height: "410px" }}>
                    {
                        users&&users.length?users.map((user) =>
                            <li key={user.id} className={ selectedUser==user.id ? "active" : ""}>
                                <Link to="#" onClick={() => { userChatOpen(user.id, user.name) }}>
                                    <Media className="align-items-center" >
                                        {/*
                                        <div className="align-self-center mr-3">
                                            <i className={"fas fa-circle text-sm "+(chat.status === "online"
                                                ? " text-success"
                                                : chat.status === "intermediate" ? " text-warning" : "")
                                            }></i>
                                        </div>
                                        */}
                                        <div className="avatar-sm align-self-center mr-3 mb-0">
                                                <span 
                                                className="avatar-title rounded-circle bg-soft-primary text-primary h2" >
                                                    {user.name.length?user.name[0]:'?'}
                                                </span>
                                        </div>      
                                        <Media className="overflow-hidden align-items-center" body>
                                            <h5 className="text-truncate font-size-14 mb-0">{user.name}</h5>
                                            <p className="text-truncate mt-1 mb-0">{user.lastMessage}</p>
                                        </Media>
                                        <div className="font-size-11">{moment(user.date).format('HH:MM')}</div>
                                    </Media>
                                </Link>
                            </li>
                        ):<></>
                    }
                </PerfectScrollbar>
            </ul>
        </div>
    );

}

export default ContactsList;