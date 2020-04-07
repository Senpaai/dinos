const Dino = require('../../structures/Dino.js')
const config = require('../../config.json')
module.exports.run = (app, message, [ , dino, gender, count ]) => {
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
		message.embeder.warn('У данного пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
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
	if(!count || !(+count == count)){
		message.embeder.warn('Укажите количество дино которое нужно добавить.')
		return;
	}
	member.dino.add(dino, gender, count);
	message.embeder.send('[addDino]', `Дино "${dino}" успешно добавлен в хранилище`)
}
exports.config = {
	name: 'adddino',
	aliases: []
}