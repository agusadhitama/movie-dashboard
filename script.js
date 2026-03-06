const movies = [
  { title:"Avengers: Endgame", genre:"Action", rating:8.4, poster:"assets/poster/avengers.jpg", trailer:"https://www.youtube.com/embed/TcMBFSGVi1c", year:2019, duration:"3h 1m", desc:"The epic conclusion to the Infinity Saga."},
  { title:"Soul", genre:"Animation", rating:8.1, poster:"assets/poster/soul.jpg", trailer:"https://www.youtube.com/embed/xOsLIiBStEs", year:2020, duration:"1h 40m", desc:"A musician's journey to the afterlife."},
  { title:"Everything Everywhere", genre:"Sci-Fi", rating:8.0, poster:"assets/poster/eee.jpg", trailer:"https://www.youtube.com/embed/wxN1T1uxQ2g", year:2022, duration:"2h 20m", desc:"A wild multiverse adventure."},
  { title:"Jujutsu Kaisen 0", genre:"Anime", rating:7.9, poster:"assets/poster/jujutsu.jpg", trailer:"https://www.youtube.com/embed/8QkHWlrHqlE", year:2021, duration:"1h 45m", desc:"Epic anime action origin story."},
];

const container = document.getElementById("movie-container");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const ratingFilter = document.getElementById("rating-filter");
const ratingValue = document.getElementById("rating-value");
const ratingTooltip = document.getElementById("rating-tooltip");
const toggleDark = document.getElementById("toggle-dark");

const modal = document.getElementById("modal");
const trailer = document.getElementById("trailer");
const modalClose = document.querySelector(".close");

// Populate genre filter
[...new Set(movies.map(m=>m.genre))].forEach(g=>{
  const option=document.createElement("option"); option.value=g; option.textContent=g; genreFilter.appendChild(option);
});

// Render Movies Function
function renderMovies(filterText="", filterGenre="", minRating=0){
  container.innerHTML="";
  const filtered = movies.filter(m=>m.title.toLowerCase().includes(filterText.toLowerCase()) && (filterGenre==""||m.genre===filterGenre) && m.rating>=minRating);
  filtered.forEach(movie=>{
    const card = document.createElement("div"); card.className="movie-card";
    card.innerHTML=`
      <div class="movie-card-inner">
        <div class="movie-card-front"><img src="${movie.poster}" alt="${movie.title}"></div>
        <div class="movie-card-back">
          <h3 class="back-title">${movie.title}</h3>
          <p class="back-genre">${movie.genre} | ⭐ ${movie.rating}</p>
          <p class="back-desc">${movie.desc}</p>
          <p class="back-year">${movie.year} | ${movie.duration}</p>
          <button data-trailer="${movie.trailer}">Watch Trailer</button>
        </div>
      </div>`;
    container.appendChild(card);

    // Animate back content fade in
    const back = card.querySelector(".movie-card-back");
    back.style.opacity=0;
    card.querySelector(".movie-card-inner").addEventListener("mouseenter",()=>{back.style.transition="opacity 0.5s ease"; back.style.opacity=1;});
    card.querySelector(".movie-card-inner").addEventListener("mouseleave",()=>{back.style.opacity=0;});
  });

  // Add trailer button events
  document.querySelectorAll(".movie-card-back button").forEach(btn=>btn.addEventListener("click",e=>{trailer.src=e.target.dataset.trailer; modal.classList.add("show");}));
}

// Slider Tooltip
ratingFilter.addEventListener("input",e=>{
  const value=e.target.value; ratingValue.textContent=value; ratingTooltip.textContent=value;
  const min=e.target.min; const max=e.target.max; const percent=(value-min)/(max-min);
  ratingTooltip.style.left=`${percent*e.target.offsetWidth}px`;
  renderMovies(searchInput.value, genreFilter.value, value);
});

// Filters
searchInput.addEventListener("input",e=>renderMovies(e.target.value, genreFilter.value, ratingFilter.value));
genreFilter.addEventListener("change",e=>renderMovies(searchInput.value, e.target.value, ratingFilter.value));

// Modal close
function closeModal(){ modal.classList.remove("show"); setTimeout(()=> trailer.src="",300);}
modalClose.addEventListener("click",closeModal);
window.addEventListener("click",e=>{if(e.target===modal)closeModal();});

// Dark mode toggle
toggleDark.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  toggleDark.style.transition="transform 0.3s ease,color 0.3s ease";
  toggleDark.style.transform="rotate(360deg)";
  setTimeout(()=>toggleDark.style.transform="rotate(0deg)",300);
});

// Initial render
renderMovies();