const { Collection, Client } = require('discord.js');
const config = require('../config.json');
const DataBase = require('./DataBase.js');
const fs = require('fs')
const path = require('path');
class App{
	constructor({ cmdFolders, eventFolders, clientOptions: { token, ...options} = {} }){
		if(cmdFolders) {
			this.cmdFolders = path.join(process.cwd(), cmdFolders);
			this.commands = new Collection();
			this.commands.categories = [];
			this.aliases = new Collection();
		}
		if(eventFolders){
			this.eventFolders = path.join(process.cwd(), eventFolders);
		}
		this.dbMembers = new DataBase('dbMembers');
		this.prefixes = [];
		if(token){
			this.client = new Client(options);
			this.client.login(token).catch(console.error)
		} else if(config.token){
			this.client = new Client(options)
			this.client.login(config.token).catch(console.error)
		} else throw new Error('Discord token not specify')
	}
	handler(type, fn){
		let typePath;
		if(type == 'events') {
			if(!this.eventFolders) throw new Error('You don\'t specify path to event folder')
			typePath = this.eventFolders;
		} else if(type == 'cmds'){
			if(!this.cmdFolders) throw new Error('You don\'t specify path to command folder')
			typePath = this.cmdFolders;
		} else new TypeError('first argument must be string \'cmds\' or \'events\'')

		const folders = fs.readdirSync(typePath);
		for(const folder of folders){
			const pathToFolder = path.join(typePath, folder)
			const files = fs.readdirSync(pathToFolder);
			for(const file of files){
				const pathToFile = path.join(pathToFolder, file)
				const props = require(pathToFile);
				fn(props, file, folder)
			}
		}
	}
	cmdRun(fn){
		this.client.on('message', message => {
			if(!message.guild || message.author.bot)return;
			const prefixes = [
				this.client.user.toString(),
				`<@!${this.client.user.id}>`,
				config.prefix
			]
			const prefix = prefixes.find(i => message.content.trim().startsWith(i)) || null;
			if(prefix === null) return;
			let [ command, ...args ] = message.content.slice(prefix.length).trim().split(/ +/g);
			command = command.toLowerCase();
			const cmd = this.commands.get(command) || this.aliases.get(command);
			if(!cmd)return;
			fn({ message, prefix, command, args, cmd })
			
		})
	}
}
module.exports = App