module.exports.run = (app, message, [ , ]) => {
	let member = message.mentions.members.first() || message.member
	if(!member.hasSteamid){
		message.embeder.warn('У данного пользователя не подтверждён аккаунт steam')
		return;
	}
	message.embeder.send('[Dinosaurs]', `
Информация об участнике ${member.toString()}
Steam id: ${member.db.steamid}
Выбранный динозавр: ${member.dino.selected}
Количество динозавров в хранилище: ${member.dino.storage.length}
хранилище: 
${member.dino.storage.join(', ')}`)	
}
exports.config = {
	name: 'info',
	aliases: []
}