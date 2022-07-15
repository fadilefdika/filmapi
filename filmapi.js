const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {
  const inputKeyword = document.querySelector('.input-keyword');

  fetch('http://www.omdbapi.com/?apikey=884de077&s=' + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movie = response.Search;
      let cards = '';
      movie.forEach((m) => {
        cards += showCards(m);
      });
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;

      //untuk tombol selengkapnya

      const selengkapnya = document.querySelectorAll('.modal-detail-button');
      selengkapnya.forEach((btn) => {
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=884de077&i=' + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = movieDetails(m);
            });
        });
      });
    })
    .catch(() => {
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = ifNotFound(inputKeyword.value);
    });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                data-target="#movieDetailModal" data-imdbid="${m.imdbID}">selengkapnya</a>
              </div>
            </div>
          </div>`;
}

function movieDetails(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Title :</strong>${m.Title}</li>
                  <li class="list-group-item"><strong>Year :</strong>${m.Year}</li>
                  <li class="list-group-item"><strong>Runtime : </strong>${m.Runtime}</li>
                  <li class="list-group-item"><strong>Genre :</strong>${m.Genre}</li>
                  <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>                
                </ul>
              </div>
            </div>
          </div>`;
}

function ifNotFound(m) {
  return ` <div class="mt-5 ml-5">
            <h4>${m} tidak tersedia blok</h4>
          </div>`;
}
