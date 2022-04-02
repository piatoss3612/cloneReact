class Router {
  routes = [];
  notFoundCallback = () => {};

  init() {
    window.addEventListener('hashchange', this.checkRoutes);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.checkRoutes();
  }

  addRoute = (url, callback) => {
    this.routes.push({ url, callback });
    return this;
  };

  checkRoutes = () => {
    const currentRoute = this.routes.find(
      route => route.url === window.location.hash,
    );

    if (!currentRoute) {
      this.notFoundCallback();
      return;
    }

    currentRoute.callback();
  };

  setNotFound = callback => {
    this.notFoundCallback = callback;
    return this;
  };
}

export default Router;
