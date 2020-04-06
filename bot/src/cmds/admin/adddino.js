const Dino = require('../../structures/Dino.js')
const config = require('../../config.json')
module.exports.run = (app, message, [ , dino, gender ]) => {
	if(!config.admins.includes(message.member.id)){
		message.embeder.warn('Данную комманду могут использовать только определённый круг лиц')
		return
	}
	let member = message.mentions.members.first();
	if(!member){
		message.embeder.warn('Укажите пользователя')
		return;
	}
	if(!member.hasSteamid){
		message.embeder.warn('пользователь не подтвердил свой steam id')
		return;
	}
	if(!Dino.ALL.has(dino)){
		message.embeder.warn(`Дино не найден. \nСписок существующих дино: ${[...Dino.ALL].join(', ')}`)
		return;
	}
	if(!(gender == 'male' || gender == 'female' )){
		message.embeder.warn('Укажите пол: male | female')
		return;
	}
	member.dino.add(dino, gender);
	message.embeder.send('[addDino]', `Дино "${dino}" успешно добавлен в хранилище`)
}
exports.config = {
	name: 'adddino',
	aliases: []
}