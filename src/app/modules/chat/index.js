import React from 'react';
import Chat from './Chat';

import { ChatProvider } from './ChatContext';

const ChatPage = () => {

        return (
            <ChatProvider>
                <Chat></Chat>
            </ChatProvider>
            );
        }
            
export default ChatPage;