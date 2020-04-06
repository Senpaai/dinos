require('./prototype.js')
const discord = require('discord.js');
const App = require('./structures/App.js');
const fs = require('fs')
const app = require('./app.js')

app.handler('cmds', (props, file, folder) => {
	let { config, run } = props
	if(!config || !run)return;
	let { name, aliases } = config;
	if(!name)return;
	console.log('[cmds]', `[${folder}]`, name)
	if(!app.commands.categories.includes(folder)) app.commands.categories.push(folder);
	config.category = folder;
	app.commands.set(name, props);
	if(aliases && aliases.length) for(const alias of aliases) app.aliases.set(alias, app.commands.get(name))
})

app.cmdRun(({ message, args, cmd }) => {
	cmd.run(app, message, args)
})