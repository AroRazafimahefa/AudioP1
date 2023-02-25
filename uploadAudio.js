const InputAudio = document.createElement("input")
const InputAudioContenair = document.querySelector('.upload')
InputAudio.setAttribute('type','file')
InputAudio.setAttribute("accept",'.mp3')
InputAudioContenair.appendChild(InputAudio)
InputAudio.classList.add('Input-audio') 
InputAudio.name = ' Upload_Audio'
var AudioTitle = '';
var DataAudio = new FormData()
var fichierBrute;
const btn = document.createElement("button") 
// C:\fakepath\16
InputAudio.addEventListener("input",e=>{
	AudioTitle = AudioSlicer(e.target.files[0].name)
	fichierBrute = e.target.files[0];
	if(e.isTrusted){
		var Mp3Extension = fichierBrute.name.slice(fichierBrute.name.length-4,fichierBrute.name.length);
		if(Mp3Extension!==".mp3"){
			alert("invalide fichier");			
			btn.classList.remove("btnSubmit-file");
		}
		else{
			DataAudio.append('songName',AudioTitle)
			DataAudio.append('name',fichierBrute)
			btn.classList.add("btnSubmit-file") 
			var songDefile = document.querySelector(".uploadP") 
			songDefile.innerText = AudioTitle
			InputAudio.setAttribute("name",AudioTitle) 
			InputAudioContenair.appendChild(btn) 
			btn.innerHTML = `Add Song <i class="bi bi-patch-check"></i>`
	
			// post the message
			btn.addEventListener("click",e=>{
				e.preventDefault()
				fetch("http://localhost:5000/Audio/",{
					method: "POST",
					body :DataAudio,
					mode : "cors",
					credentials : "same-origin"
				})
				.then(res=>{
					console.log(res);
					document.location.reload()
				})
				.catch(err=>{
					console.log(err);
				})	
			})
	
		}
	}
})
/* 
			const optionPost = {
				method: "POST",
				headers :{
					"Content-type": "application/json",	
				},
				body : JSON.stringify({
					usersname :"moi",
					message: Mymessages
				}),
				mode : "cors",
				credentials:"same-origin"
			}		
*/ 
function AudioSlicer(title){
	title =  [...title]
	for(let y = 0 ; y< title.length ; y++){
		if(title[y]==' ')
		{
			title[y] = '-'
		}
	}
	title.splice(title.length - 4 , title.length);
	title = title.join('')
	// console.log(title);
	return title		
}