require('./prototype.js')
const discord = require('discord.js');
const App = require('./structures/App.js');
const fs = require('fs')
const app = require('./app.js')
const config = require('./config.json')

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


fs.watchFile(config.logPath, (curr, prev) => {
	let file = fs.readFileSync(config.logPath, 'utf8');
	let [ text ] = file.split('\n').reverse().filter(Boolean)
	let guild = app.client.guilds.first();
	if(!guild)return;
	let channel = guild.channels.get(config.logChannelID)
	if(!channel)return;
	let [msg, ...data] = text.split(':').slice(2).reverse()
	if(text.includes('@admin')) channel.send(`<@&${config.adminRoleID}>`)
	console.log(data.reverse().join(':'), msg)
	channel.embeder.send(data.reverse().join(':'), msg.replace('@admin',`<@&${config.adminRoleID}>`))
});