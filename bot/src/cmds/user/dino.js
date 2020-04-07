const Dino = require('../../structures/Dino.js')
module.exports.run = (app, message, [ n ]) => {
	if(!message.member.hasSteamid){
		message.embeder.warn('У данного пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
		return;
	}
	let dinos = [...message.member.dino.storage]
	if(!n){
		message.embeder.send('[Storage]',
`
Текущий дино: ${message.member.dino.selected.name} ${message.member.dino.selected.gender}
Список доступных дино:
${dinos.map((e, i) => `**[${i+1}]** ${e.name} ${e.gender}`).join(',\n')}
для смены дино используйте комманду
!dino [номер дино]
`)
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
	aliases: []
}