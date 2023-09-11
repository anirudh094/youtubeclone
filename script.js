var menuIcon = document.querySelector('.menu-icon');
var sidebar = document.querySelector('.sidebar');
var containeryt = document.querySelector('.containeryt');

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    containeryt.classList.toggle("large-container");
};

//API for HOME PAGE
const list_container = document.querySelector(".list-container");

let api_key = "AIzaSyAdxJUAxI6zNv62e8vuHSH_um6MHR9Bpg8";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
})).then(res => res.json())
.then(data =>{
    data.items.forEach(item => {
        getChannelIcon(item)
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: video_data.snippet.channelId
    })).then(res => res.json())
    .then(data =>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) =>{
    list_container.innerHTML += `
    
        <div class="vid-list">
            <a href="https://youtube.com/watch?v=${data.id}"><img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=""></a>
            <div class="flex-div">
                <img src="${data.channelThumbnail}" alt="">
                <div class="vid-info">
                    <a href="https://youtube.com/watch?v=${data.id}">${data.snippet.title}</a>
                    <p>${data.snippet.channelTitle}</p>
                    
                </div>
            </div>
        </div>
        
    `
}

// Search Bar

const searchInut = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click",()=> {
    if(searchInut.value.length){
        location.href = searchLink + searchInut.value;
    }
})