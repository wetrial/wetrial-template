/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // '/api': {
    //   target: 'https://localhost:44362',
    //   changeOrigin: true,
    //   secure: false, // 不进行证书验证
    //   // logLevel: 'debug',
    //   // pathRewrite: { '^': '' },
    // },
  },
  test: {
    // '/api/': {
    //   target: 'https://www.wetrial.cn',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
  pre: {
    // '/api/': {
    //   target: 'your pre url',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
};
