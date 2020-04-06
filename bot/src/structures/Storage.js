const DataBase = require('./DataBase.js')
const db = new DataBase('DinoStorage')
const Dino = require('./Dino.js')

class Storage extends Array{
	constructor(id){
		let dbStorage = db.get(id) || []
		super(...dbStorage)
		this.id = id

		if(!db.has(id)) this.save()
	}
	save(){
		db.set(this.id, this)
	}
	add(name){
		this.push(name)
		this.save()
	}
	remove(fn){
		let dino = this.find(fn)
		if(!dino)return undefined;
		this.splice(this.indexOf(dino), 1)
		this.save()
	}
	has(fn){
		return !!this.find(fn)
	}
}

module.exports = Storage