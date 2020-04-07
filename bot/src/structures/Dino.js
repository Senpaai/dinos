const path = require('path');
const fs = require('fs')
const dinosaurs = require('../dinosaurs.json');
const config = require('../config.json');
const Storage = require('./Storage.js');
const dbPath = path.isAbsolute(config.dbPath) ?
config.dbPath :  path.join(process.cwd(), config.dbPath) 

class Dino{
	constructor(id){
		let filePath = path.join(dbPath, id + '.json');
		if(!fs.existsSync(filePath)){
			throw new Error(`user with id ${id} is not exists`)
			return;
		}
		this.id = id
		this._filePath = filePath
		this.storage = new Storage(id) 
	}
	get _file(){
		return JSON.parse(fs.readFileSync(this._filePath));
	}
	save(obj){
		fs.writeFileSync(this._filePath, JSON.stringify(obj, null, 8))
	}
	set(name, gender){
		if(!this.storage.has(i => i.name == name))return;
		if(this.grown) this.add(this.selected.name, this.selected.gender);
		this.storage.remove(i => i.name == name);
		this.setMaxStats();
		this.save({
			...this._file,
			"CharacterClass": name,
			"bGender": gender == 'male' ? false : true
		})

	}
	get selected(){
		return {
			name: this._file['CharacterClass'],
			gender: Boolean(this._file['bGender']) ? 'female' : 'male'
		}
	}
	get grown(){
		return '1.0' == this._file['Growth']  
	}
	add(name, gender){
		if(!Dino.ALL.has(name))return;
		this.storage.add({ name, gender });
	}
	setMaxStats(){
		this.save({
			...this._file,
			'Growth': '1.0',
			'Hunger': '99999',
			'Thirst': '99999',
			'Stamina': '99999',
			'Health': '99999'
		})
	}
}
Dino.ALL = new Set(dinosaurs)

module.exports = Dino