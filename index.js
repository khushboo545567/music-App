document.addEventListener("DOMContentLoaded", () => {
  const SongInput = document.getElementById("SongInput");
  const searchBtn = document.getElementById("searchBtn");
  const tranding_songs = document.getElementById("tranding_songs");
  const orgSongs = document.getElementById("orgSongs");
  const Tranding_head = document.getElementById("Tranding_head");
  const description = document.getElementById("description");
  const trandingList = document.getElementById("trandingList");
  const img_Song = document.getElementById("img_Song");
  const publishedAt = document.getElementById("publishedAt");
  const title_main = document.getElementById("title_main");
  const playBtn = document.getElementById("play");
  const pauseBtn = document.getElementById("pause");
  const songList = document.getElementById("songList");
  const youtubePlayer = document.getElementById("youtubePlayer");

  const API_KEY = " AIzaSyAE14rEVXEPs47gOGdoHY-bEqt1HqXExsA";

  async function trandingSection() {
    const res = await fetch("./TrendingMusic.json");
    const data = await res.json();
    console.log(data);

    const li = document.createElement("li");
    li.className =
      "text-white text-md p-5 bg-[#121212] rounded-md hover:bg-[#1F1F1F]";

    const img = document.createElement("img");
    img.src = `${data.imgUrl}`;
    img.className = " rounded-md";
    img.alt = "song Image";

    const title = document.createElement("p");
    title.textContent = `${data.title}`;

    const desc = document.createElement("p");
    desc.textContent = `${data.description}`;

    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(desc);

    trandingList.appendChild(li);

    tranding_songs.classList.remove("hidden");
    orgSongs.classList.add("hidden");
  }

  trandingSection();

  searchBtn.addEventListener("click", async () => {
    const SongName = SongInput.value.trim();
    SongInput.value = "";
    if (!SongName) return;
    try {
      const songData = await getSongDetails(SongName);
      renderSong(songData);
    } catch (error) {
      console.log(error);
    }
  });

  async function getSongDetails(SongName) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      SongName
    )}&type=video&key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("song not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  }

  function renderSong(songData) {
    tranding_songs.classList.add("hidden");
    orgSongs.classList.remove("hidden");
    const allsong = songData.items;
    const defaultSong = songData.items[0];
    img_Song.src = `${defaultSong.snippet.thumbnails.medium.url}`;
    img_Song.className = "rounded-md w-[320px] h-[180px]";
    title_main.textContent = `${defaultSong.snippet.title}`;
    description.textContent = `${defaultSong.snippet.description}`;
    youtubePlayer.src = `https://www.youtube.com/embed/${el.id.videoId}?autoplay=1`;
    // LIST WORK for each
    allsong.forEach((el) => {});
  }

  playBtn.addEventListener("click", () => {});
  pauseBtn.addEventListener("click", () => {});
});
