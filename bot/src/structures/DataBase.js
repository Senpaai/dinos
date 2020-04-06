const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

class DataBase{
	constructor(name){
		let dirPath = path.join(__dirname, 'DataBase')
		if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
		let filePath = path.join(dirPath, name + '.json');
		if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({
			name,
			data: [],
			createAt: Date.now(), 
		}, null, 2))
		let file = JSON.parse(fs.readFileSync(filePath));
		this._filePath = filePath;
		this._file = {
			...file,
			data: new Collection(file.data)
		};
		this.name = file.name
		this.createAt = file.createAt
	}
	save(){
		let data = {
			...this._file,
			data: [...this._file.data.entries()]
		}
		fs.writeFileSync(this._filePath, JSON.stringify(data, null, 2))
	}
	has(key){
		return this._file.data.has(key);
	}
	get(key){
		return this._file.data.get(key)  
	}
	set(key, data){
		this._file.data.set(key, data);
		this.save()
	}
	remove(key){
		this._file.data.delete(key);
		this.save()
	}
}

module.exports = DataBase