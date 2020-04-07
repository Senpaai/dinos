const config = require('../../config.json')
module.exports.run = (app, message, [ , id ]) => {
	if(!config.admins.includes(message.member.id)){
		message.embeder.warn('Данную комманду могут использовать только определённый круг лиц')
		return
	}
	let member = message.mentions.members.first();
	if(!member){
		message.embeder.warn('Укажите пользователя')
		return;
	}
	if(!id){
		message.embeder.warn('Укажите id который нужно присвоить пользователю')
		return
	}
	member.setSteamid(id);
	message.embeder.send('[SteamId]', `Вы успешно присвоили id "${id}" для ${member.user.toString()}`)
}
exports.config = {
	name: 'setid',
	aliases: [],
	usage: '!setid {@member} [id]',
	discription: 'присваивает steam id конкретному пользователю'
}