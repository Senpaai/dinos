const path = require('path');
const fs = require('fs')
const config = require('../config.json');
const Storage = require('./Storage.js');
const dbPath = path.join(process.cwd(), '../TheIsle/Saved/Databases/Survival/Players/') 
class Dino{
	constructor(id){
		let filePath = path.join(dbPath, id + '.json');
		if(!fs.existsSync(filePath)){
			throw new Error(`user with id ${id} is not exists`)
			return;
		}
		let file = JSON.parse(fs.readFileSync(filePath));
		this._file = file
		this._filePath = filePath
		this.storage = new Storage(id) 
	}
	save(){
		fs.writeFileSync(this._filePath, JSON.stringify(this._file, null, 8))
	}
	set(name, gender){
		if(!this.storage.has(i => i.name == name))return;
		if(this.grown) this.add(this.selected.name, this.selected.gender);
		this._file['CharacterClass'] = name;
		this._file['bGender'] = gender == 'male' ? false : true
		this.storage.remove(i => i.name == name);
		this.setMaxStats();
		this.save()

	}
	get selected(){
		return {
			name: this._file['CharacterClass'],
			gender: this._file['bGender'] ? 'female' : 'male'
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
		this._file['Growth'] = '1.0'
		this._file['Hunger'] = '99999'
		this._file['Thirst'] = '99999'
		this._file['Stamina'] = '99999'
		this._file['Health'] = '99999'
		this.save()
	}
}
Dino.ALL = new Set(config.dinosaurs)

module.exports = Dino