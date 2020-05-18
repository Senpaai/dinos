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


	// ULTRA KLUGE

	if(message.member.dino && message.member.dino._currDino.name){
		let { selected, _currDino } = message.member.dino
		if(JSON.stringify(selected) !== JSON.stringify(_currDino)){
			let [ adminId ] = config.admins
			let user = app.client.users.get(adminId);
			if(!user){
				let guild = app.client.guilds.first()
				if(!guild)return;
				let channel = guild.channels.first();
				if(!channel)return;
				channel.embeder.warn('Тупа пасхалка\nЯ не нашёл шизика, приём! \nТут какой то чел ломает рамки. а я не могу отправить это сообщение шизику, приёёёёём')
			}
			user.embeder.warn(`
СТРАННУЮ ХУИТУ ТВОРИТ ЭТОТ ЧЕЛ

КОД КРАСНЫЙ


Информация об участнике ${message.member.toString()}
Steam id: ${message.member.db.steamid}
Выбранный дино: ${message.member.dino.selected.name} ${message.member.dino.selected.gender ? ':female_sign:' : ':male_sign:'}
Количество динозавров в хранилище: ${message.member.dino.storage.length}
хранилище: 
${[...message.member.dino.storage].map(i => `${i.name} ${i.gender ? ':female_sign:' : ':male_sign:'} [${i.count}]`).join(',\n')}`)
		}
		message.member.dino._currDino = { name: null, gender: null }
	}

	// ULTRA KLUGE

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