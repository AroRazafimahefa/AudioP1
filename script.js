const contenair  = document.querySelector(".contenair")
const audio = document.getElementById("audio")
const controlsPlay = document.createElement('button')
var keeperEnd = false;
var titre = "";
var PrevSongWasPaused = false;
var autoPlay = false;
var nextSongChoise ;
var nextMove;
var stoper;
var SongAPI = [];
// tableau des chanson 
	fetch("http://localhost:5000/Audio/") 
	.then(res=>res.json())
	.then((data)=>{
		var interData = []
		for(let x = 0 ; x < data.data.length ; x++){
			interData.push(data.data[x])
		}
		SongAPI.push(interData)
		console.log(SongAPI);
	})
	.catch(err=>{
		return "Error fetching " +err
	})

setTimeout(()=>{
console.log(SongAPI);
SetAllSong(SongAPI[0])
},1000)	
	var Songs = [      
	"08-letters",
	"08-Heat",
	"08-Lodeur-de-lessence",
	"08-On-a-trop-charbonné",
	"08-On-refait-le-monde",
	"09-Future-Ex",
	"09-Jour-meilleur",
	"09-Le-nord-se-souvient",
	"09-Légendaire",
	"09-Miami-Vice",
	"09-Pas-le-moral",
	"09-Terrible",
	"10-On-se-connait"
]

var audio1 = new Audio();

async function SetAllSong(Songs){
	autoPlay = false;
	await Songs.map(song=>{	
		// console.log(song);
		contenair.innerHTML += `	
		<div class="song">
			<span class="song-title" source="${song.source}" idPlayed="${song.id}" >  ${song.songDescription} </span>
			<span class="song-control-play">Play</span>
		</div>	
		`
	}) 	
		// partie de gestion des controls
	var SongChoice = await document.querySelectorAll(".song");	   			
	SongChoice.forEach(chs=>{
	async function DefaultPlay(){
		// keeperEnd = false;
			titre = await chs.children[0].getAttribute('source');			
			IdPlay = await chs.children[0].getAttribute('idPlayed');	
			// console.log(chs.children[0].getAttribute('source'));		
			// parite visuel et Play
		for(let x = 0 ; x < SongChoice.length  ; x++){
				SongChoice[x].addEventListener("mouseenter",e=>{
					for(let y= 0 ; y< SongChoice.length ;y++)
					{
						if(e.target === SongChoice[y] && SongChoice[y].children[0].getAttribute("source") !==titre || e.target ===SongChoice[y].children[y] && SongChoice[y].children[y]!==undefined){
							SongChoice[y].style.background = "rgba(131, 175, 216, 0.432)"	    
						}else if(e.target!==SongChoice[y] && SongChoice[y].children[0].getAttribute("source")!== titre) {
							SongChoice[y].style.background = 'rgba(37, 102, 163, 0.432)' 		
						}else if(SongChoice[y].children[0].getAttribute("source")===titre)	
						{
							SongChoice[y].style.background = 'rgb(20, 98, 112)' 		
						}					
					}
				})				
				// console.log(SongChoice[x].children[0].innerText , );
			if(SongChoice[x].children[0].getAttribute("idPlayed")===IdPlay){
				SongChoice[x].style.background = 'rgb(20, 98, 112)'
				SongChoice[x].children[1].innerText = "Pause"
				nextSongChoise = SongChoice[x+1] !==undefined ? SongChoice[x+1] : SongChoice[0] 
				nextMove = nextSongChoise.children[0].getAttribute("source");
				stoper ? clearInterval(stoper) : null
				Ended(audio1,nextSongChoise,nextMove) 
			}			
			else{
				SongChoice[x].style.background = 'rgba(37, 102, 163, 0.432)'
				SongChoice[x].children[2] ? SongChoice[x].children[2].remove() : null
				SongChoice[x].children[1].innerText = "Play"
				// SongChoice[x].children[1].style.background = 'rgb(98, 16, 192)'
			}
		}	
		PauserEvent(SongChoice,audio1);
		PlayAudio(titre);
	}	

		chs.children[1].addEventListener('click',DefaultPlay) 
	//  Partie de pause
	function PauserEvent(SongChoice,audio){

		for(let x = 0 ; x < SongChoice.length  ; x++){
			if(SongChoice[x].children[1].innerText==="Pause"){

				function CreateBtn(text){
					var btn = document.createElement("span")
					btn.classList.add("song-control-pause")				
					btn.innerText = text
					return SongChoice[x].appendChild(btn)	
				}				
				PrevSongWasPaused = true				
				function Pause (){
					var pause =  CreateBtn("Pause")		
					pause.addEventListener('click',e=>{
						e.preventDefault()
					SongChoice[x].children[1].innerText="Play";
						audio.pause()
						pause.remove()
						var continu = CreateBtn("Continue")
						continu.addEventListener('click',e=>{
							audio.play();
							continu.remove()
							Pause()
						})								
					})			
				}
				Pause();
			}
		}

	}

// tester la fin de l'audio et next si true


function Ended(audio, element,nextMove){
		stoper = setTimeout(()=>{
		 	Ended(audio,element,nextMove)
			if(audio.ended){
				clearInterval(stoper);
				if(PrevSongWasPaused){
					PlayNextAudio(nextMove,SongChoice,PauserEvent,Ended);
				}
			}
		},1000)
	}
})
}

function PlayAudio(titre){
	audio1.src ='../audio/'.concat(titre);
	audio1.play();
}

// fonction pour le next Automatique
function PlayNextAudio(NextTitle, SongChoice,PauserEvent,Ended){
	autoPlay = true;
	audio1.src ='../audio/'.concat(NextTitle);
	audio1.play();
	// partie visuel suivant
for(let x = 0 ; x < SongChoice.length  ; x++){
	if(SongChoice[x].children[0].getAttribute("source")===NextTitle){
		clearInterval(stoper); 
		SongChoice[x].style.background = 'rgb(20, 98, 112)'
		SongChoice[x].children[1].innerText = "Pause"
		nextSongChoise = SongChoice[x+1] !==undefined ? SongChoice[x+1] : SongChoice[0]
		nextMove = nextSongChoise.children[0].getAttribute("source") 
		Ended(audio1,nextSongChoise,nextMove) 
	}			
	else
	{
		SongChoice[x].style.background = 'rgba(37, 102, 163, 0.432)'
		SongChoice[x].children[2] ? SongChoice[x].children[2].remove() : null
		SongChoice[x].children[1].innerText = "Play"
	}
}	
PauserEvent(SongChoice,audio1);
}
