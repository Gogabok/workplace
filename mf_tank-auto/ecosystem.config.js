module.exports = {
  apps : [{
	name: "app",
	script: "./.nuxt/App.js",
	env: {
	  NODE_ENV: "dev",
	},
	env_production: {
	  NODE_ENV: "prod",
	}
  }]
}
