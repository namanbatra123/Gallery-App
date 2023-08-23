(function(){
    let saveAlbum = document.querySelector("#saveAlbum"); 
    let addAlbum = document.querySelector("#addAlbum"); 
    let deleteAlbum = document.querySelector("#deleteAlbum"); 
    let importAlbum = document.querySelector("#importAlbum"); 
    let exportAlbum = document.querySelector("#exportAlbum"); 
    let playAlbum = document.querySelector("#playAlbum"); 
    let selectAlbum = document.querySelector("#selectAlbum");
    let allTemplates = document.querySelector("#allTemplates");
    let overlay = document.querySelector("#overlay");
    let contentDetailsOverlay = document.querySelector("#content-overlay");
    let newSlide = document.querySelector("#new-slide");
    let createSlide = document.querySelector("#create-slide");
    let showSlide = document.querySelector("#show-slide");
    let slideList = document.querySelector("#slide-list");
    let btnSaveSlide = document.querySelector("#btnSaveSlide");
    let txtImgUrl = document.querySelector("#txtImgUrl");
    let txtTitle = document.querySelector("#txtTitle");
    let txtSlideDesc = document.querySelector("#txtSlideDesc");
    
    let albums = [{
        name: "test",
        slides: []
    }];

    addAlbum.addEventListener("click", handleAddAlbum);
    selectAlbum.addEventListener("change", handleSelectAlbum);
    newSlide.addEventListener("click", handleNewSlideClick)
    btnSaveSlide.addEventListener("click", handleSaveSlide);

    function handleAddAlbum(){
        let albumName = prompt("Enter album name");
        if(albumName == null){
            return; 
        }

        albumName = albumName.trim(); 

        if(!albumName){
            alert("Empty name not allowed");
            return;
        }

        let exists = albums.some(a => a.name == albumName);
        if(exists){
            alert("Can not enter same name. Kindly enter a new name");
            return; 
        }

        let album = {
            name: albumName,
            slides: []
        };
        albums.push(album);

        let optionTemplate = allTemplates.content.querySelector("[purpose=new-album]");
        let newAlbumOption = document.importNode(optionTemplate, true); 
        
        newAlbumOption.setAttribute("value", albumName);
        newAlbumOption.innerHTML = albumName; 
        selectAlbum.appendChild(newAlbumOption);

        selectAlbum.value = albumName; 
        selectAlbum.dispatchEvent(new Event("change"));
    }

    function handleSelectAlbum(){
        if(this.value == "-1"){
            overlay.style.display = "block";
            contentDetailsOverlay.style.display = "none";
            createSlide.style.display = "none";
        }
        else{
            overlay.style.display = "none";
            contentDetailsOverlay.style.display = "block";
            createSlide.style.display = "none";
        }
    }

    function handleNewSlideClick(){
        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display = "block";
        showSlide.style.display= "block";
    }

    function handleSaveSlide(){
        let url = txtImgUrl.value;
        let title = txtTitle.value;
        let desc = txtSlideDesc.value;

        let slideTemplate = allTemplates.content.querySelector(".slide");
        let slide = document.importNode(slideTemplate, true);

        slide.querySelector(".title").innerHTML = title;
        slide.querySelector(".desc").innerHTML = desc;
        slide.querySelector("img").setAttribute("src", url);
        slide.addEventListener("click", handleSlideClick);

        slideList.appendChild(slide);
        slide.dispatchEvent(new Event("click"));
    }

    function handleSlideClick(){
        overlay.style.display = "none";
        contentDetailsOverlay.style.display = "none";
        createSlide.style.display = "none";
        showSlide.style.display= "block";
    }
})();