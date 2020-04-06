const Dino = require('../../structures/Dino.js')
module.exports.run = (app, message, [ n ]) => {
	if(!message.member.hasSteamid){
		message.embeder.warn('вы не подтвердили свой steam id')
		return;
	}
	let dinos = [...message.member.dino.storage]
	if(!n){
		message.embeder.send('[Storage]',
`
Текущий дино: ${message.member.dino.selected}
Список доступных дино:
${dinos.map((e, i) => `**[${i+1}]** ${e}`).join('\n')}
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
	message.member.dino.set(dino)
	message.embeder.send('[Dino]', `Ваш текущий дино: ${dinos[n-1]}`)
}
exports.config = {
	name: 'dino',
	aliases: []
}