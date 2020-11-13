import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import * as moment from 'moment';

const Message = ({ownAuthor, message})=>{
    return(
        <li className={ownAuthor ? "right" : ""}>
            <div className="conversation-list">
                <div className="ctext-wrap">
                    <div className="conversation-name">{message.name}</div>
                    <p>
                        {message.message}
                    </p>
                    <p className="chat-time mb-0"><i className="far fa-clock align-middle mr-1"></i> {moment(message.created_at).format('DD/MM/YYYY HH:MM')}</p>
                </div>      
            </div>
        </li>
    )
}

export default Message;
