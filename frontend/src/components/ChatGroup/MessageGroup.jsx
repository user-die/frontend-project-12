import React from 'react';

import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import SendMessageForm from '../Forms/SendMessageForm';

const MessageGroup = () => (
  <>
    <ChatHeader />
    <MessageBox />
    <SendMessageForm />
  </>
);

export default MessageGroup;
