const app = require('../app.js');
const { dbMembers: db, dbGuilds } = app;
const config = require('../config.json')
const { Collection } = require('discord.js')

class MemberDB{
	constructor({ guildID, memberID } = {}){
		this.id = `${guildID}.${memberID}`;

		let memberDB = db.get(this.id) || {};
		
		this.steamid = memberDB.steamid || null
		this.dinosaurs =  memberDB.dinosaurs || []

		if(!db.has(this.id)) db.set(this.id, this)
	}
	save(){
		db.set(this.id, this);
	}
	get member(){
		let [ guildID, memberID ] = this.id.split('.')
		let guild = app.client.guilds.get(guildID)
		if(!guild){
			if(dbGuilds.has(guildID)) dbGuilds.remove(guildID);
			return undefined;
		}
		let member = guild.members.get(memberID)
		if(!member){
			if(db.has(this.id)) db.remove(this.id);
			return undefined;
		}
		return member;
	}
}

module.exports = MemberDB