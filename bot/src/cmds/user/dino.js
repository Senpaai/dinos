const Dino = require('../../structures/Dino.js')
module.exports.run = (app, message, [ n ]) => {
	if(!message.member.hasSteamid){
		message.embeder.warn('У данного пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
		return;
	}
	let dinos = [...message.member.dino.storage]
	if(!n){
		message.author.embeder.send('[Storage]',
`
Текущий дино: ${message.member.dino.selected.name} ${message.member.dino.selected.gender ? ':female_sign:' : ':male_sign:'}
Список доступных дино:
${dinos.map((e, i) => `**[${i+1}]** ${e.name} ${e.gender ? ':female_sign:' : ':male_sign:'} [${e.count}]`).join(',\n')}
для смены дино используйте комманду
!dino [номер дино]
`)
		message.embeder.send('[Storage]', 'данные отправлены вам в личные сообщения')
		return;
	}
	if((+n > dinos.length || +n < 1) || +n != n ){
		message.embeder.warn('Вы неправильно указали номер дино')
		return;
	}
	let dino = dinos[n-1]
	message.member.dino.set(dino.name, dino.gender)
	message.embeder.send('[Dino]', `Ваш текущий дино: ${dino.name}`)
}
exports.config = {
	name: 'dino',
	aliases: [],
	usage: '!dino [номер дино]',
	discription: 'изменяет играбельного дино на дино из хранилища'
}