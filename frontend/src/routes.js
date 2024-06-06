const apiPath = '/api/v1';

const routes = {
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  idChannelPath: (id) => [apiPath, 'channels', id].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  chatPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  randomPagePath: () => '*',
};

export default routes;
