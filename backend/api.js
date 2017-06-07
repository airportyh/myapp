function funWrapper(fn) {
  return (req, resp, next) => {
    let result = fn(req, resp, next);
    if (result.then && result.catch) {
      result
        .then(data => resp.json(data))
        .catch(next);
    }
  };
}

module.exports = function Api(app) {
  return {
    get: (path, fn) => app.get(path, funWrapper(fn)),
    put: (path, fn) => app.put(path, funWrapper(fn)),
    post: (path, fn) => app.post(path, funWrapper(fn)),
    delete: (path, fn) => app.delete(path, funWrapper(fn)),
  }
}
