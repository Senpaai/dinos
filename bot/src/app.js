const { token } = require('./config.json');
const App = require('./structures/App.js');
const app = new App({
	cmdFolders: './src/cmds/',
	eventFolders: './src/events/',
	clientOptions: { token }
})

module.exports = app