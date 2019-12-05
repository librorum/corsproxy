module.exports = {
  apps: [
    {
      name: "proxy",
      script: "app.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      // args: 'one two',
      instances: 1,
      autorestart: true,
      error_file: "../logs/stderr.log",
      out_file: "../logs/stdout.log",
      // max_memory_restart: '1G',
      env: {
        watch: true
        // NODE_ENV: 'production',
        // DEBUG: 'winepoint:*,express:*',
      }
    }
  ],
  // pm2 deploy live setup
  // pm2 deploy live update
  deploy: {
    live: {
      host: "face.codingpen.io",
      user: "ubuntu",
      ref: "origin/master",
      repo: "git@github.com:librorum/corsproxy.git",
      path: "/home/ubuntu/admin",
      "post-deploy": "yarn install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
