const config = require('../../config.json')
module.exports.run = (app, message, [ , ]) => {
	let mention = message.mentions.members.first()
	let member = !config.admins.includes(message.member.id) ?
	message.member : !mention ? 
	message.member : mention
	if(!member.hasSteamid){
		message.embeder.warn('У данного пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
		return;
	}
	message.author.embeder.send('[Dinosaurs]', `
Информация об участнике ${member.toString()}
Steam id: ${member.db.steamid}
Выбранный дино: ${member.dino.selected.name} ${member.dino.selected.gender}
Количество динозавров в хранилище: ${member.dino.storage.length}
хранилище: 
${[...member.dino.storage].map(i => `${i.name} ${i.gender}`).join(',\n')}`)
	message.embeder.send('[Dinosaurs]', `Информация участника ${member.toString()} отправлена вам в личные сообщения`)
}
exports.config = {
	name: 'info',
	aliases: []
}