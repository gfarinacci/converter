module.exports = {
  apps : [{
    name: "converter",
    script: "./index.js",
    watch: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
