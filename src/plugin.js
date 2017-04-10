import isAsync from './is-async-fn';
import once from 'lodash.once';

export default opts => {
  const _async = isAsync(opts.register);

  const register = (server, options, next) => {
    const _next = once(next);

    const result = opts.register(server, options, _next);
    if (_async) {
      result.then(() => _next()).catch(err => _next(err));
    }
  };

  register.attributes = {
    ...opts.attributes,
    name: opts.name
  };

  const exports = { ...opts, register };
  delete exports.name;
  delete exports.attributes;
  return exports;
};
