import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Row, Col, Button, Media, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Card } from "reactstrap";

//Import Scrollbar

import Message from "./components/Message"
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useChatContext } from './ChatContext';
import ChatTabs from './components/ChatTabs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { CurrentMessages, selectedUserSelector, selectedNameSelector } from './_redux/selectors';

const Chat = () => {

  const [notification_Menu, setnotification_Menu] = useState(false);
  const [curMessage, setcurMessage] = useState("");

  let scrollbar=useRef(null)

  const { currentAuthState } = useSelector(
    (state) => ({ currentAuthState: state.auth }),
    shallowEqual
  );
  
  const chatContext = useChatContext();
  const chatProps = useMemo(() => {
      return {
        newConfig: chatContext.newConfig,
        sendMessage: chatContext.sendMessage,
      };
  }, [chatContext]);

  const {user,authToken} = currentAuthState;

    const selectedUser = useSelector(
        selectedUserSelector,
        shallowEqual
    );

    const selectedName = useSelector(
        selectedNameSelector,
        shallowEqual
    );
    
    const messages = useSelector(
        CurrentMessages(user, selectedUser),
        shallowEqual    
    );

    useEffect(()=>{
        if(scrollbar) {
            let scrollbarRef= scrollbar.current._container;
            console.log('scrollbar', scrollbar, scrollbarRef.scrollHeight)
            scrollbarRef.scrollTop=scrollbarRef.scrollHeight;
        }
    },[messages])

  useEffect(()=>{

    chatProps.newConfig(authToken);

  },[authToken,user, chatProps]);

   function toggleNotification() {
    setnotification_Menu(!notification_Menu);
    }


   function addMessage() {
       if(curMessage!=='')
        chatProps.sendMessage({
            user2:selectedUser,
            message:curMessage,
        });

        setcurMessage('');
    }

        return (
                 <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col lg="12">
                                <div className="d-lg-flex">
                                    <div className="chat-leftsidebar mr-lg-4">
                                        <div className="">
                                            <div className="py-4 border-bottom">
                                                <Media>
                                                    <div className="avatar-sm 
                                                        align-self-center mr-3 mb-0">
                                                            <span 
                                                            className="avatar-title rounded-circle bg-soft-primary text-primary" 
                                                            style={{fontSize: "1.5rem"}} >
                                                                {user?user.USER_VC_NOMBRE[0]:'U'}
                                                            </span>
                                                    </div>
                                                    <Media body>
                                                        <h5 className="font-size-15 mt-0 mb-1">{user?user.USER_VC_NOMBRE:'Usuario'}</h5>
                                                        <p className="text-dark d-flex align-items-center mb-0"><i className="fas fa-circle text-sm text-success align-middle mr-1"></i> En Linea</p>
                                                    </Media>

                                                    {/*<div>
                                                        <Dropdown isOpen={notification_Menu} toggle={() => { toggleNotification() }} className="chat-noti-dropdown active">
                                                            <DropdownToggle className="btn" tag="i">
                                                                <i className="fas fa-bell bx-tada"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu right>
                                                                <DropdownItem href="#">Action</DropdownItem>
                                                                <DropdownItem href="#">Another action</DropdownItem>
                                                                <DropdownItem href="#">Something else here</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>*/}
                                                </Media>
                                            </div>

                                            <div className="search-box chat-search-box py-4">
                                                <div className="position-relative">
                                                    <Input type="text" className="form-control" placeholder="Buscar..." />
                                                    <i className="fas fa-search-alt search-icon"></i>
                                                </div>
                                            </div>

                                            <ChatTabs ></ChatTabs>
                                            
                                        </div>
                                    </div>
                                    <div className="w-100 user-chat">
                                        <Card>
                                            <div className="p-4 border-bottom ">
                                                <Row>
                                                    <Col size="12" >
                                                        <h5 className="font-size-15 mb-1">{selectedName?selectedName:"Nueva Conversación"}</h5>

                                                        {/*<p className="text-muted mb-0 d-flex align-items-center">
                                                            <i className={"fas fa-circle text-sm text-success align-middle mr-1"}></i>
                                                            Online
                                                        </p>*/}
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div>
                                                <div className="chat-conversation p-3">
                                                    <ul className="list-unstyled" >
                                                        <PerfectScrollbar 
                                                            ref={scrollbar}
                                                            style={{ height: "470px"}}>
                                                            {/*
                                                            <li>
                                                                <div className="chat-day-title">
                                                                    <span className="title">Seleccione un usuario para iniciar una conversación</span>
                                                                </div>
                                                            </li>
                                                            */}
                                                            {
                                                                messages&&messages.map((message,index) =>
                                                                     <Message key={index} message={message} ownAuthor={message.user==user.USER_IN_CODIGO} ></Message>
                                                                )
                                                            }
                                                        </PerfectScrollbar>
                                                    </ul>
                                                </div>
                                                <div className="p-3 chat-input-section">
                                                    <Row>
                                                        <Col>
                                                            <div className="position-relative">
                                                                <input type="text" value={curMessage} onChange={(e) => { setcurMessage(e.target.value) }} className="form-control chat-input px-4" placeholder="Escriba un mensaje..." />
                                                            </div>
                                                        </Col>
                                                        <Col className="col-auto">
                                                            <Button type="button" color="primary" onClick={() => { addMessage() }} className="btn-rounded chat-send w-md waves-effect waves-light"><span className="d-none d-sm-inline-block mr-2">Send</span> <i className="fas fa--send"></i></Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
            );
        }
            
export default Chat;