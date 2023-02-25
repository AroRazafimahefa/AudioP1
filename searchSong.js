const SongSearchContenair = document.querySelector(".searchSong-contenair")
var recherche = '';
var scrollToSearch = 0
const ScrollHeightSearch = 44;
// Search Input elements
const searchSongInput = document.createElement('input')
searchSongInput.setAttribute('type','text')
searchSongInput.classList.add("SearchSong")
searchSongInput.setAttribute("placeholder",'  Search a Song..');
SongSearchContenair.appendChild(searchSongInput)

// search button 
const searchButton = document.createElement("button")
searchButton.setAttribute('type','submit')
searchButton.classList.add("searchBtn")
SongSearchContenair.appendChild(searchButton)
searchButton.innerHTML= ` <i class="bi bi-telegram"></i>`


// Partie de traitement des recherches
searchSongInput.addEventListener("input",e=>{
	e.preventDefault();
	recherche = e.target.value;
})
console.log(searchButton);
searchButton.addEventListener('click',e=>{
	e.preventDefault();
	setTimeout(()=>{
		console.log(SongAPI);
		CheckerSearch(recherche,SongAPI)
	},500)
})

function CheckerSearch(recherche,SongAPI)
{
	SongAPI = SongAPI[0]
	searchSongInput.value = ""
	for(let y= 0 ; y< SongAPI.length ; y++){
		if(SongAPI[y].songDescription.includes(recherche))
		{
			var AllSongChoice =  document.querySelectorAll(".song");
			AllSongChoice.forEach((chant,index)=>{
				scrollToSearch = (ScrollHeightSearch *(index +1))  
				if(chant.children[0].innerText== SongAPI[y].songDescription){
					setTimeout(()=>{
						contenair.scrollBy(0,scrollToSearch)
						chant.style.background = 'rgba(255, 17, 0,0.4)'	
					},10)
				}else{
					chant.style.background = 'rgba(37, 102, 163, 0.432)'
				}
			})	
		}
	}
}