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
	remove(name){
		if(!this.includes(name))return undefined;
		this.splice(this.indexOf(name), 1)
		this.save()
		return name
	}
	has(name){
		return this.includes(name)
	}
}

module.exports = Storage