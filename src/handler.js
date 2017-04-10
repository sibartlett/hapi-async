import isAsync from './is-async-fn';

export default func => {
  const _async = isAsync(func);

  return function (request, reply) {
    const result = func(request, reply);

    if (!_async) {
      return result;
    }

    result.then(() => _next()).catch(function(error) {
      if (error instanceof Error) {
        const { name, message, stack } = error;
        request.log(['error', 'uncaught'], {name, message, stack});
      } else {
        request.log(['error', 'uncaught'], {name: 'Error', message: error});
        error = new Error(error);
      }
      reply(error);
    });
  };
};
