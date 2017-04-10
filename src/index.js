import handler from './handler';
import plugin from './plugin';

export default plugin({
  name: 'hapi-async',
  register: async (server, options) => {
    server.handler('async', (route, func) => handler(func));
  },
  handler,
  plugin
});
