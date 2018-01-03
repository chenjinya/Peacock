module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'Peacock',
      script    : 'server/app.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env_production : {
        RUNTIME_ENVIRONMENT: "PROD"
      },
      
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'not root is better',
      host : [
        '127.0.0.1',
      ],
      ref  : 'master',
      repo : 'https://github.com/chenjinya/agora-web-client.git',
      path : '/deploy/to/path',
      "pre-setup" : "some thing",
      'post-deploy' : 'npm install &&  pm2 reload ecosystem.config.js --env production',
    },
  }
};
