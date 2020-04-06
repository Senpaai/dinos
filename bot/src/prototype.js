let { Guild, GuildMember } = require('discord.js')
const { RichEmbed, TextChannel, Message, User } = require('discord.js');


const Embeder = require('./structures/Embeder.js');
const MemberDB = require('./structures/MemberDB.js');
const Dino = require('./structures/Dino.js');

Object.defineProperties(GuildMember.prototype, {
	db: {
		get(){
			if(!this.hasOwnProperty('_db')) this._db = new MemberDB({
				guildID: this.guild.id,
				memberID: this.id
			});
			return this._db 
		}
	},
	hasSteamid: {
		get(){
			return !!this.db.steamid
		}
	},
	dino: {
		get(){
			if(!this.hasSteamid)return undefined;
			if(!this.hasOwnProperty('_dino')) this._dino = new Dino(this.db.steamid);
			return this._dino
		}
	},
	setSteamid: {
		value: function setSteamid(id){
			this.db.steamid = id;
			this.db.save()
		}
	}
})













Object.defineProperty(User.prototype, 'embeder', { 
	get(){
		return new Embeder({ 
			channel: this, 
			author: this, 
			guild: null 
		})
	}
})

Object.defineProperty(Message.prototype, 'embeder', { 
	get(){
		return new Embeder({ 
			channel: this.channel, 
			author: this.author || null, 
			guild: this.guild || null 
		})
	}
})
Object.defineProperty(TextChannel.prototype, 'embeder', {
	get(){
		return new Embeder({ 
			channel: this, 
			author: null,
			guild: this.guild || null 
		})
	}
});