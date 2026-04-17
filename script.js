const movies = [
  {
    title: "Avengers",
    img: "https://i.pinimg.com/736x/30/10/22/30102218eeec3858e1440275949d527e.jpg",
    desc: "Superhero berkumpul menyelamatkan dunia"
  },
  {
    title: "Naruto",
    img: "https://i.pinimg.com/1200x/3a/8c/63/3a8c63737ae2d94f9d4f09f477e3df34.jpg",
    desc: "Perjalanan ninja menjadi hokage"
  },
  {
    title: "Conjuring",
    img: "https://i.pinimg.com/736x/9b/11/4a/9b114afbcf94896ee62a8e19e12d314a.jpg",
    desc: "Film horor berdasarkan kisah nyata"
  },

  {
    title: "Spider-Man",
    img: "https://i.pinimg.com/1200x/82/32/2c/82322c815c6ab49813aefa47bd4329ff.jpg",
    desc: "Pahlawan laba-laba melindungi kota"
  },
  {
    title: "One Piece",
    img: "https://i.pinimg.com/736x/30/ff/42/30ff422aac17703702e408efe865df95.jpg",
    desc: "Petualangan Luffy dan kru Topi Jerami mencari One Piece"
  },
  {
    title: "The Batman",
    img: "https://i.pinimg.com/736x/ab/3d/63/ab3d6358c7ee93923de8caec086aa259.jpg",
    desc: "Ksatria gelap Gotham melawan kejahatan"
  },

  {
  title: "Demon Slayer",
  img: "https://i.pinimg.com/736x/39/9b/83/399b83aa72375e3e8aad65b57656f646.jpg",
  desc: "Petualangan Tanjiro melawan iblis untuk menyelamatkan adiknya"
},

{
  title: "Fast & Furious",
  img: "https://i.pinimg.com/1200x/00/b4/69/00b469fc87bb4e85202f0631a14c9065.jpg",
  desc: "Balapan dan aksi mobil penuh adrenalin"
},
{
  title: "Avengers Endgame",
  img: "https://i.pinimg.com/1200x/95/26/68/9526684fe11e38cf6bb6fbd48e37de6a.jpg",
  desc: "Pertarungan terakhir melawan Thanos"
},
{
  title: "Jujutsu Kaisen",
  img: "https://i.pinimg.com/736x/76/ac/0e/76ac0e714bff05658d7eb6423057549b.jpg",
  desc: "Yuji Itadori melawan kutukan berbahaya"
},
{
  title: "Titanic",
  img: "https://i.pinimg.com/736x/41/49/e8/4149e88bc78090b7232ce51bd4270e99.jpg",
  desc: "Kisah cinta Jack dan Rose di kapal Titanic"
},
{
  title: "The Flash",
  img: "https://i.pinimg.com/1200x/38/01/6b/38016b076db8d043ff1b79e49b33a29c.jpg",
  desc: "Pahlawan super dengan kecepatan cahaya"
},
];

const movieList = document.getElementById("movieList");
const search = document.getElementById("search");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");

const favBtn = document.getElementById("favBtn");
const reviewList = document.getElementById("reviewList");

let currentMovie = null;

// tampilkan film
function displayMovies(data) {
  movieList.innerHTML = "";
  data.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${movie.img}">
      <h3>${movie.title}</h3>
    `;

    div.onclick = () => openModal(movie);
    movieList.appendChild(div);
  });
}

// modal
function openModal(movie) {
  currentMovie = movie;
  modal.classList.remove("hidden");
  modalTitle.innerText = movie.title;
  modalDesc.innerText = movie.desc;
  modalImg.src = movie.img;

  loadReviews();
}

// close modal
document.getElementById("close").onclick = () => {
  modal.classList.add("hidden");
};

// search
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(value)
  );
  displayMovies(filtered);
});

// favorit
favBtn.onclick = () => {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  fav.push(currentMovie.title);
  localStorage.setItem("fav", JSON.stringify(fav));
  alert("Ditambahkan ke favorit!");
};

// tambah review
document.getElementById("submitReview").onclick = () => {
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  if (!rating || !comment) {
    alert("Isi semua!");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem(currentMovie.title)) || [];
  reviews.push({ rating, comment });
  localStorage.setItem(currentMovie.title, JSON.stringify(reviews));

  loadReviews();
};

// load review
function loadReviews() {
  reviewList.innerHTML = "";
  let reviews = JSON.parse(localStorage.getItem(currentMovie.title)) || [];

  reviews.forEach(r => {
    const p = document.createElement("p");
    p.innerText = `⭐${r.rating} - ${r.comment}`;
    reviewList.appendChild(p);
  });
}

// awal
displayMovies(movies);