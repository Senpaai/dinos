const Dino = require('../../structures/Dino.js')
module.exports.run = (app, message, [ , n, count ]) => {
    let member = message.mentions.members.first();
    if(!member){
        message.embeder.warn('Укажите пользователя');
        return;
    }
    if(!member.hasSteamid){
        message.embeder.warn('У данного пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
        return
    }
    if(!message.member.hasSteamid){
        message.embeder.warn('У вас пользователя не подтверждён аккаунт steam. И/или под таким id нет аккаунта')
        return;
    }
    let dinos = [...message.member.dino.storage]
    if(!n){
        message.embeder.send('[Storage]',
`
Текущий дино: ${message.member.dino.selected.name} ${message.member.dino.selected.gender ? ':female_sign:' : ':male_sign:'}
Список доступных дино:
${dinos.map((e, i) => `**[${i+1}]** ${e.name} ${e.gender ? ':female_sign:' : ':male_sign:'} [${e.count}]`).join(',\n')}
для передачи дино кому нибудь ещё используйте
!gift {@member} [номер дино] [количество] 
`)
        return;
    }
    if((+n > dinos.length || +n < 1) || +n != n ){
        message.embeder.warn('Вы неправильно указали номер дино')
        return;
    }
    if(!count || !(+count == count) || count < 1){
      message.embeder.warn('Укажите положительное количество дино которое вы хотите передать')
      return;
    }
    let dino = dinos[n-1]
    if(dino.count <= count){
      message.embeder.warn(`У вас недостаточно дино
Ваше количество дино данного типо: ${dino.count}
Вы должны оставить как минимум одного дино этого типа`)
      return;
    }
    message.member.dino.add(dino.name, dino.gender, -count)
    member.dino.add(dino.name, dino.gender, count)
    message.embeder.send('[Dino]', `Вы успешно передали ${dino.name} ${dino.gender ? ':female_sign:' : ':male_sign:'} [${count}] участнику ${member.toString()}`)
}
exports.config = {
    name: 'gift',
    aliases: [],
  usage: '!gift {@member} [номер дино] [количество]',
  discription: 'Передаёт ваших дино из хранилища другому участнику на сервере'
}