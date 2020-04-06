const { RichEmbed } = require('discord.js');

let defaultEmbed = new RichEmbed()
.setColor('BLACK')
.setFooter('Deity Senpai ~ <3')
.setTimestamp();

class Embeder{
	constructor({ channel, author, guild } = {}){
		this.embed = defaultEmbed;
		this.channel = channel;
		this.guild = guild;
		if(author) this.embed.setAuthor(author.username, author.avatarURL)
	}
	warn(err){
		let embed = new RichEmbed(defaultEmbed.toJSON);
		embed.setColor('RED');
		embed.setTitle('Предупреждение');
		embed.setDescription(err);
		this.channel.send(embed);
	}
	send(title, desc){
		let embed = new RichEmbed(defaultEmbed.toJSON);
		embed.setColor('GREEN');
		embed.setTitle(title);
		embed.setDescription(desc);
		this.channel.send(embed);
	}
	editSend(fn){
		let embed = fn(new RichEmbed(defaultEmbed.toJSON))
		this.channel.send(embed);
	}
}

module.exports = Embeder