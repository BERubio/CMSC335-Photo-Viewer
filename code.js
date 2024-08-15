
//call main function and initialize event listeners
//window.onload = main;


let photoNameField = document.querySelector("#photoName");

let startNum = document.getElementById("start").value;
let endNum = document.getElementById("end").value;
let folderName = document.getElementById("folder").value;
let commonName = document.getElementById("name").value;

let photos = [];
let currentPhotoIndex = 0;
let slideShowInterval;

//Using the main function was not necessary for this script. Just as Prof. said!

/*function main(){
    let loadPhotosButton = document.getElementById("loadPhotosButton");
    loadPhotosButton.onclick = loadPhotos(startNum, endNum, folderName, commonName);

    //let jsonFile = document.getElementById("jsonURL").value;
    let loadJSONFile = document.querySelector("#loadJsonButton");
    loadJSONFile.onclick = loadJSON();

    let previous = document.getElementById("previousButton");
    previous.onclick = previousPhoto;

    let clickImage = document.getElementById("images");
    clickImage.onclick = nextPhoto;

    let next = document.getElementById("nextButton");
    next.onclick = nextPhoto;

    let first = document.getElementById("firstButton");
    first.onclick = firstPhoto;

    let last = document.getElementById("lastButton");
    last.onclick = lastPhoto;
}*/

function loadPhotos(start, end, folder, name) {
    start = document.getElementById("start").value;
    end = document.getElementById("end").value;
    folder = document.getElementById("folder").value;
    name = document.getElementById("name").value;

    if (start > end || isNaN(start) || isNaN(end)) {
        document.getElementById("status").innerHTML = "Error: Invalid Range";
        return;
    }
    //reset photos array
    photos = [];
    for (let i = start; i <= end; i++) {
        photos.push(`${folder}${name}${i}.jpg`);
    }
    //update text status display
    displayStatus("Photo Viewer System");
    //display the first photo in the range
    //showFirstPhoto();
    displayPhoto(0);
};

function loadJSON(){
    /* QUERY SELECTOR USAGE BELOW!!! */
    let URL = document.querySelector("#jsonURL").value;
    const promise = fetch(URL);
    promise.then(response => response.json()).then(
        data => {
            //clear photos array
            photos = [];
            //extract each imageURL and push that to the array
            photos = data.images.map(item => item.imageURL);
            
            displayStatus("Photo Viewer System");
            displayPhoto(0);
        }).catch(error => console.error("Error loading JSON", error));
}

function displayPhoto(index) {
    if(photos.length === 0){
        displayError("You must load data first");
        return;
    }

    if(index < 0){
        index = photos.length - 1;
    }else if (index >= photos.length){
        index = 0;
    }

    const nameOfPhoto = photos[index];
    document.getElementById("image").src = photos[index];

    document.getElementById("photoName").value = nameOfPhoto;
    currentPhotoIndex = index; 
};

/* LAMBDA!!! */
const firstPhoto = () =>{
    displayPhoto(0);
} 

function lastPhoto() {
    displayPhoto(photos.length - 1);
};

function nextPhoto() {
    currentIndex = (currentPhotoIndex + 1) % photos.length;
    displayPhoto(currentIndex);
};

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    displayPhoto(currentPhotoIndex);
};

function startSlideShow() {
    slideShowInterval = setInterval(nextPhoto, 1000);
};

function randomSlideShow() {
    slideShowInterval = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * photos.length);
        displayPhoto(randomIndex);
    }, 1000);
};

function stopSlideShow() {
    clearInterval(slideShowInterval);
};

function displayStatus(message) {
    document.getElementById("status").innerHTML = message;
}

function displayError(message) {
    displayStatus("Error: " + message);
}




