// Like Dislike Subscribe

var likeimage = document.getElementById('like-video');
var dislikeimage = document.getElementById('dislike-video');
var subbutton = document.querySelector('.sub-button');

function like_video() {
    if (likeimage.src.match("images/like.png")) {
      likeimage.src = "images/liked.png";
      dislikeimage.src = "images/dislike.png";
    } else {
      likeimage.src = "images/like.png";
    }
  }
function dislike_video() {
    if (dislikeimage.src.match("images/dislike.png")) {
      dislikeimage.src = "images/disliked.png";
      likeimage.src = "images/like.png";
    } else {
      dislikeimage.src = "images/dislike.png";
    }
  }
function sub_channel(){
    subbutton.innerHTML='<img src="images/notification.png">Subscribed';
    subbutton.style = "color: black; background: #E5E5E5;"
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

//API for Right Side Bar
const right_sidebar = document.querySelector(".right-sidebar");

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
    right_sidebar.innerHTML += `
    
    <div class="side-video-list">
        <a href="https://youtube.com/watch?v=${data.id}" class="small-thumbnail"><img src="${data.snippet.thumbnails.high.url}" alt=""></a>
            <div class="vid-info">
                <a href="https://youtube.com/watch?v=${data.id}">${data.snippet.title}</a>
                <p>${data.snippet.channelTitle}</p>
            </div>
    </div>
        
    `
}