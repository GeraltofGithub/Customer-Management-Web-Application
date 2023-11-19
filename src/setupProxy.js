{const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/sunbase',  // Match any request starting with '/sunbase'
    createProxyMiddleware({
      target: 'https://qa2.sunbasedata.com',
      changeOrigin: true,
    })
  );
};
}