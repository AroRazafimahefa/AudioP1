const { ModeleAudio } = require("../src/dataBase/Sequelize")

module.exports.postAudio = (app)=>{
	return app.post('/Audio/',(req,res)=>{
		if( req.files && req.body.songName)
		{
			console.log(req.files);
			var Song = req.body.songName
			var Fichier = req.files.name
			if(Song=="" || Song ===undefined && Fichier.mimetype!=='audio/mpeg' &&Fichier.mimetype!=='audio/mp3'){
			const err = {
				message : '',
				getMessage  : ()=>{
					return this.message
				}
			}
			if(Song=='' || Song === undefined){
				err.message = "le Nom de fichier n'est pas valide"
			}	
			else if(Fichier.mimetype!=='audio/mpeg' &&Fichier.mimetype!=='audio/mp3'){
				err.message = "Le Type de fichier est invalide"
			}		 	
			else if(Fichier.size > 12000000)
			{
				err.message = "Le fichier est trop volumineux"
			}
			const Errors = postAudioError(err)
				res.status(404).json({Errors})
			}else{
				var fileName = Fichier.name + Date.now() 
				ModeleAudio.create({
					songDescription : req.body.songName,
					source : `../audio/${fileName}.mp3`
				})
				.then(data=>{
					const message = "Creation de votre Audio réussi"
					Fichier.mv(`${__dirname}../../../audio/${fileName}.mp3`)
					res.status(200).send({message, data})
				})
				.catch(err=>{
					const Errors = err;
					res.status(500).json({Errors})
				})
			}
		}
		else{
			const message = 'le fichier et le nom de doit pas être vide'
			res.status(400).send({message})
		}
	})
}