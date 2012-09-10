window.onload = init;
function init(){
	loadSongs();
	var button = document.getElementById("addButton");
	button.onclick = handleAddSongClick;
}
function handleAddSongClick(){
	var songName = document.getElementById("songTextInput").value;
	if(songName.length > 0){
		/*console.log(songName);*/
		var li = document.createElement("li");
		li.innerHTML = songName;
		var ul = document.getElementById("playlist");
		ul.appendChild(li);
		saveSong(songName);
		console.log(li);
	}
}

function getSongList(){
	return  getStorageArray("playList");
}

function getStorageArray(key){
	var songList = localStorage.getItem(key);
	if(songList == null || songList == ""){
		songList = [];
	}
	else{
		songList = JSON.parse(songList);
	}
	console.log(songList);
	return songList
}

function saveSong(songName){
	var songList = getSongList();
	console.log(songList);
	songList.push(songName);
	localStorage.setItem("playList" , JSON.stringify(songList));
	console.log(localStorage.getItem("playList"));
}

function loadSongs(){
	var songs = getSongList();
	var ul = document.getElementById("playlist");
	if(ul != null){
		for(var i = 0 ; i < songs.length ; i++){
			var li = document.createElement("li");
			li.innerHTML = songs[i];
			ul.appendChild(li);
		}
	}
}
