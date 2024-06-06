export const getActiveChannelId = (state) => state.channels.activeChannelId;

export const getChannelMessages = (id, messages) => messages.filter((m) => m.channelId === id);
