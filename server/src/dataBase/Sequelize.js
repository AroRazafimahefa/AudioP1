const {Sequelize , DataTypes} = require('sequelize')
const { AudioModels } = require('../Models/Audio.models')
const sequelize = new Sequelize(
	"audiobase",
	'root',
	"",
	{
		host: "localhost",
		dialect: 'mysql',
		logging: true
	}
)
const ModeleAudio = AudioModels(sequelize,DataTypes)
const initDB = ()=>{
	return sequelize.sync({force: false})
	.then(_=>{
		console.log("connection at db done.")
	})
	.then(_=>{
		console.log("Suivant ");
		// ModeleAudio.create({
		// 	songDescription : "songTitle",
		// 	source : './audio/test1.mp3'
		// })
		// .then(song=>{
		// 	console.log(song.toJSON());
		// }).catch(err=>{
		// 	console.log("Erreur inserstion " + err);
		// })
	})
	.catch(err=>{
		console.log(err);
	})
}

module.exports = {
	initDB, ModeleAudio
}