const { ModeleAudio } = require("../src/dataBase/Sequelize")

module.exports.getAudio = (app)=>{
	return app.get("/Audio/",(req,res)=>{
		ModeleAudio.findAll()
		.then(audio=>{
			const message ="tout les audio .";
			res.status(200).json({message, data :audio})
		})
		.catch(err=>{
			const message = "Erreur lors de votre requete):"
			res.status(500).json({message, Error: err})
		})
	})
}