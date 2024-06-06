import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import MessageItem from './MessageItem';

import { messagesSelectors } from '../../slices/messageSlice';
import { getActiveChannelId, getChannelMessages } from '../../slices/selectors';

const MessageBox = () => {
  const allChatMessages = useSelector(messagesSelectors.selectAll);
  const activeChannelId = useSelector(getActiveChannelId);

  const channelMessages = getChannelMessages(activeChannelId, allChatMessages);

  const divElem = useRef();
  useEffect(() => {
    divElem.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, []);

  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {channelMessages
        .map(({ id, username, body }) => (
          <MessageItem
            key={id}
            username={username}
            body={body}
          />
        ))}
      <div ref={divElem} />
    </div>
  );
};

export default MessageBox;
