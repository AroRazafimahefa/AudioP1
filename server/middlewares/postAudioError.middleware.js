module.exports.postAudioErrors = (err)=>{
	const errors = {maxsize:'' , inncorecteName : '', inncorrecteFile : ''}
	var ErrorChecker = err.getMessage()
	if(ErrorChecker.includes("le Nom de fichier n'est pas valide")){
		errors.inncorecteName = " Nom de fichier invalide ."
	}
	else if(ErrorChecker.includes("Le fichier est trop volumineux")){
		errors.maxsize =  'invalid taille de fichier , veuillez que le fichier soit moins de 12Mo.'
	}else if(ErrorChecker.includes(""))
	{
		errors.inncorrecteFile = 'le fichier est inncorecte , veuillez envoyer des fichier audio mp3.'
	}
return errors
}