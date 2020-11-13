import React, { useState } from 'react';
import ContactsList from './ContactsList';
import UsersList from './UsersList';

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { fetchUser } from '../_redux/actions';
import { useDispatch } from 'react-redux';

const ChatTabs = ()=>{
    /*
          const  groups = [
                { id: 1, image: "G", name: "General" },
                { id: 2, image: "R", name: "Reporting" },
                { id: 3, image: "M", name: "Meeting" },
                { id: 4, image: "A", name: "Project A" },
                { id: 5, image: "B", name: "Project B" }
            ];
    */      
    const [activeTab, setactiveTab] = useState('1');

    const dispatch = useDispatch();

    function toggleTab(tab) {
        if (activeTab !== tab) {
            setactiveTab(tab)
        }
    }


    function userChatOpen(id, name){

        dispatch(fetchUser(id,name));

    }
 

    return (
        <div className="chat-leftsidebar-nav">
            <Nav pills justified>
                <NavItem >
                    <NavLink
                        className={activeTab === '1'?'active':""}
                        onClick={() => { toggleTab('1'); }}
                    >
                        <i className="fas fa-chat font-size-20 d-sm-none"></i>
                        <span className="d-none d-sm-block">Conversaciones</span>
                    </NavLink>
                </NavItem>
                {/*
                <NavItem className="m-0" >
                    <NavLink
                        className={activeTab === '2'?'active':""}
                        onClick={() => { toggleTab('2'); }}
                    >
                        <i className="fas fa-group font-size-20 d-sm-none"></i>
                        <span className="d-none d-sm-block">Group</span>
                    </NavLink>
                </NavItem>
                */}
                <NavItem className="m-0" >
                    <NavLink
                        className={activeTab === '2'?'active':""}
                        onClick={() => { toggleTab('2'); }}
                    >
                        <i className="fas fa-book-content font-size-20 d-sm-none"></i>
                        <span className="d-none d-sm-block">Usuarios</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="py-4 bg-transparent">
                <TabPane tabId="1">
                    <ContactsList userChatOpen={userChatOpen} ></ContactsList>
                </TabPane>
  
                {/*
                <TabPane tabId="2">
                    <h5 className="font-size-14 mb-3">Group</h5>
                    <ul className="list-unstyled chat-list">
                        <PerfectScrollbar style={{ height: "410px" }}>
                            {
                                groups.map((group) =>
                                    <li key={"test" + group.image}>
                                        <Link to="#" onClick={() => { UserChatOpen(group.id, group.name, group.status) }}>
                                            <Media className="align-items-center">
                                                <div className="avatar-xs mr-3">
                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        {group.image}
                                                    </      span>
                                                </div>      
                                                <Media body>
                                                    <h5 className="font-size-14 mb-0">{group.name}</h5>
                                                </Media>
                                            </Media>
                                        </Link>
                                    </li>
                                )
                            }
                        </PerfectScrollbar>
                    </ul>       
                </TabPane> 
                */}     
                <TabPane tabId="2">
                    <UsersList userChatOpen={userChatOpen} ></UsersList>
                </TabPane>
            </TabContent>
        </div>
    );

}

export default ChatTabs