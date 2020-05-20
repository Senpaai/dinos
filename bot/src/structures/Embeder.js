const { RichEmbed } = require('discord.js');

function defaultEmbed(){
	return new RichEmbed()
	.setColor('BLACK')
	.setFooter('Deity Senpai ~ <3')
	.setTimestamp();
}
class Embeder{
	constructor({ channel, author, guild } = {}){
		this.embed = defaultEmbed();
		this.channel = channel;
		this.guild = guild;
		if(author) this.embed.setAuthor(author.username, author.avatarURL)
	}
	warn(err){
		let embed = defaultEmbed()
		embed.setColor('RED');
		embed.setTitle('Предупреждение');
		embed.setDescription(err);
		this.channel.send(embed);
	}
	send(title, desc){
		let embed = defaultEmbed()
		embed.setColor('GREEN');
		embed.setTitle(title);
		embed.setDescription(desc);
		this.channel.send(embed);
	}
	editSend(fn){
		let embed = fn(defaultEmbed())
		this.channel.send(embed);
	}
}

module.exports = Embeder