import isAsync from 'is-async-fn';

export default fn => isAsync(fn) || !!fn.toString().match('return _?ref.apply\\(this, arguments\\);');
