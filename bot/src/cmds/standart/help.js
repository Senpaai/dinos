module.exports.run = (app, message, [ name ]) => {
	if(!name){
		message.embeder.editSend(embed =>{
				embed.setTitle('[Categories]')
				embed.setDescription('Список категорий и комманд в данных категории.\nЧто бы узнать больше о конкретной комманде, используйте \n!help <cmd name>')
				for(let category of app.commands.categories){
					embed.addField(category, app.commands.filter(i => i.config.category == category).map(i => i.config.name).join(', '))
				}
				return embed;
		})
		return;
	}
	if(!app.commands.has(name)){
		message.embeder.warn('Комманды с названеим "' + name + '" не существует')
		return;
	}
	let { config } = app.commands.get(name);
	message.embeder.send(config.name, `описание: ${config.description}
		использование: ${config.usage}
		${!config.aliases.length ? '' : 'алиасы: ' + config.aliases.map(i => `*${i}*`).join(', ')}`)
}
exports.config = {
	name: 'help',
	aliases: ['помощь'],
	usage: '!help <cmd name>',
	description: 'Помощь по коммандам'
}
