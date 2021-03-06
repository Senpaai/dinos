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
		Object.defineProperty(this, '_currDino', {
			configurable: false,
			enumerable: false,
			value: {
				name: null,
				gender: null
			},
			writable: true
		})  //yeah, kluge
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
		let dino = this.storage.find(i => i.name == name && i.gender == gender);
		if(!dino)return console.log('дино нет')
		if(this.grown) this.add(this.selected.name, this.selected.gender)
		this.add(dino.name, dino.gender, -1)
		if(dino.count < 1) this.remove(name, gender)
		this.setMaxStats();
		this.save({
			...this._file,
			"CharacterClass": name,
			"bGender": gender
		})
		this._currDino = { name, gender }
		if(name == 'Slot') this._currDino = { name: null, gender: null }
	}
	get selected(){
		return {
			name: this._file['CharacterClass'],
			gender: this._file['bGender']
		}
	}
	get grown(){
		return '1.0' == this._file['Growth']  
	}
	remove(name,gender){
		this.storage.remove(i => i.name == name && i.gender == gender) 
	}
	add(name, gender, count = 1){
		if(!Dino.ALL.has(name))return;
		if(!this.storage.has(i => i.name == name && i.gender == gender)){
			this.storage.add({ name, gender, count: Number(count) });
			return;
		}
		let dino = this.storage.find(i => i.name == name && i.gender == gender);
		dino.count ? dino.count += Number(count) : dino.count = Number(count)
		if(dino.count < 1) this.remove(name, gender)
		this.storage.save()
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