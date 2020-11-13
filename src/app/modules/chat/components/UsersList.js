import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { shallowEqual, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import { UsersListSelector } from '../_redux/selectors';

const UsersList = ({userChatOpen})=>{

    const usersList=useSelector(
        UsersListSelector,
        shallowEqual
    );

    console.log(usersList);

    return (
        <div>
            <h5 className="font-size-14 mb-3">Usuarios</h5>      
            <div>
                <PerfectScrollbar style={{ height: "410px" }}>
                    {
                        usersList.map((slice) =>
                            <div key={slice.letter} className={"mt-4"}>
                                <div className="avatar-xs mb-3">
                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                        {slice.letter}
                                    </span>
                                </div>      
                                <ul className="list-unstyled chat-list">
                                    {
                                        slice.users.map((user) =>
                                        <li key={user.id}>
                                            <Link to="#" onClick={() => { userChatOpen(user.id, user.username) }}>
                                                <h5 className="font-size-14 mb-0">{user.username}</h5>
                                            </Link>
                                        </li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    }
                </PerfectScrollbar>
            </div>      
        </div>
    );

}

export default UsersList;

/*
const obj = items.data.reduce((acc, c) => {
    const letter = c.name[0];
    acc[letter] = (acc[letter] || []).concat(c.name);
    return acc;
  }, {})
  
  // `map` over the object entries to return an array of objects
  items.data = Object.entries(obj).map(([letter, names]) => {
    return { letter, names }
  }).sort((a, b) => a.letter > b.letter);
*/