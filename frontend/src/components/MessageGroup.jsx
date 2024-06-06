import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { messagesSelectors } from '../slices/messageSlice';
import { channelsSelectors } from '../slices/channelSlice';
import { getActiveChannelId, getChannelMessages } from '../slices/selectors';

const MessageGroup = () => {
  const allChatMessages = useSelector(messagesSelectors.selectAll);
  const activeChannelId = useSelector(getActiveChannelId);
  const name = useSelector((state) => channelsSelectors.selectById(state, activeChannelId));

  const channelMessages = getChannelMessages(activeChannelId, allChatMessages);
  const count = channelMessages.length;

  const { t } = useTranslation();

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {name?.name}
          </b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count })}</span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5">
        {channelMessages
          .map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {message.body}
            </div>
          ))}
      </div>
    </>
  );
};

export default MessageGroup;
