const nameIn = document.getElementById("nameIn");
const yIn = document.getElementById("yIn");
const findBtn = document.getElementById("findBtn");
const resBtn = document.getElementById("resBtn");
const movieInfo = document.getElementById('movieInfo');

const allData = [
    "Title",
    "Year",
    "Released",
    "Genre",
    "Actors"
]

findBtn.addEventListener("click", async () => {
    find();
});
resBtn.addEventListener("click", async () => {
    movieInfo.innerHTML = "";
});
yIn.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        find();
    }
});
nameIn.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        find();
    }
});

async function find(){
    const name = nameIn.value;
    const year = yIn.value;
    const data = await findMovie (name , year);

    movieInfo.innerHTML = "";
    if(data.Response == "True"){
        const posetrDiv = document.createElement('div');
        posetrDiv.id = "posetr";
        const img = document.createElement('img');
        img.src = data.Poster && data.Poster.replace('._V1_SX300', '');
        img.alt = 'Poster Not Found';
        img.width = 400;
        posetrDiv.appendChild(img);
        movieInfo.appendChild(posetrDiv);

        
        const infoDiv = document.createElement('div');
        infoDiv.id = "info";
        allData.forEach(item => {
            const div = document.createElement('div');
            div.className = "data-item";
            const keyDiv = document.createElement("div");
            keyDiv.textContent = item + ":";
            div.appendChild(keyDiv);
            const textDiv = document.createElement("div");
            textDiv.textContent = data[item];
            div.appendChild(textDiv);
            infoDiv.appendChild(div);
        })
        const div = document.createElement('div');
            div.className = "data-item";
            const keyDiv = document.createElement("div");
            keyDiv.textContent = "IMDB Score:";
            div.appendChild(keyDiv);
            const textDiv = document.createElement("div");
            textDiv.textContent = data.imdbRating            ;
            div.appendChild(textDiv);
            infoDiv.appendChild(div);
        movieInfo.appendChild(infoDiv);
    } else {
        const div = document.createElement('div');
        div.id = "data-error";
        div.textContent = "Movie Not Found!";
        movieInfo.appendChild(div);
    }
    
    nameIn.value = ""; 
    yIn.value = ""; 
}

async function findMovie (name , year) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${name}&y=${year}&apikey=e7bc5b63`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("error" ,e);
    }
   

}
