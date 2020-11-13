import React, {createContext, useContext, useEffect, useState, useCallback} from "react";
import {isEqual} from "lodash";
import io from 'socket.io-client';
import {AppSettings} from '../../../app.settings';
import { useDispatch } from "react-redux";
import { chatSlice } from "./_redux/slice";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export const ChatConsumer = ChatContext.Consumer;

export function ChatProvider({children}) {

  const {actions} = chatSlice
  const dispatch = useDispatch();

  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState(null);

  const newConfig = useCallback(newToken => {
    setAuthToken((prevToken) => {
        if (isEqual(prevToken, newToken)) {
          return prevToken;
        }
        else{
            setSocket(prevSocket=>{
                let newSocket = null;
                if(newToken){
                    if(prevSocket) prevSocket.disconnect();
                    newSocket = io.connect(AppSettings.apiUrlPlain,{
                      query: 'token=' + newToken,
                    });
                    return newSocket;
                }
                
            })
            return newToken;
        }
    });

    setIsAuthenticated(() => {
        return newToken?true:false;
    });
  }, []);

  const sendMessage = data => {
    console.log('new message',data,socket);
    socket.emit("new-message", data, response=>{
      console.log(response);
    });
  }

  useEffect(() => {
    if(socket) {
      socket.on('auth', () => {
        console.log('auth')
        socket.emit('messages-list', ()=>{});
        socket.emit('users-list', ()=>{});
      });

      socket.on('messages', messages=>{
        console.log('messages', messages);
        if(messages.length) dispatch(actions.messagesFetched({messages}))
      });

      socket.on('users', users=>{
        if(users.length) dispatch(actions.usersFetched({users}));
      })

      socket.on('message-add', message=>{
        dispatch(actions.newMessage({message}));
      })

      socket.on('on-error', error=>{
        console.log(error);
      })

    }
  },[socket]);

  const value = {
    authToken,
    setAuthToken,
    isAuthenticated,
    setIsAuthenticated,
    socket,
    setSocket,
    newConfig,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}