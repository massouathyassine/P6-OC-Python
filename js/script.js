getDataByCat('comedy')
getDataByCat('horror')
getDataByCat('sci-fi')
getDataByBest()
slider("1")
slider("2")
slider("3")
slider("4");


function slider(n) {
  let slider = document.querySelector(".slider"+n),
    last = slider.lastElementChild,
    first = slider.firstElementChild,
    btn = document.querySelectorAll(".btn"+n);

  slider.insertBefore(last, first);

  btn.forEach(btn => {
    btn.addEventListener("click", movement);
  });

  function movement(e) {
    slider = document.querySelector(".slider"+n);
    last = slider.lastElementChild;
    first = slider.firstElementChild;

    const activeSlide = document.querySelector(".active");

    if (e.target.id === "next") {
      slider.insertBefore(first, last.nextSibling);

      activeSlide.classList.remove("active");
      activeSlide.nextElementSibling.classList.add("active");
    } else {
      slider.insertBefore(last, first);
      activeSlide.classList.remove("active");
      activeSlide.previousElementSibling.classList.add("active");
    }
  }
}


function getDataByBest() {
    let resultsp1;
    let resultsp2;
    let results;
    let url_page1 = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
    let url_page2 = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2';

    $.get(url_page1).done(
        function(data) {
            resultsp1 = data.results;
            $.get(url_page2).done(
                function(data) {
                    resultsp2 = data.results;

                    results = resultsp1.concat(resultsp2);

                    ContentBestMovie(results)
                }
            );
        }
    );

}

function ContentBestMovie(data) {

    let best = document.getElementById('best-movie');
    let button = document.getElementById('best-button');
    let bestdesc = document.getElementById('best-desc');
    let besttitle = document.getElementById('best-title');

    //meuilleur film imdb
    let bestimg = best.getElementsByTagName('img')[0];
    bestimg.src = data[0].image_url;
    bestimg.alt = data[0].title;
    button.setAttribute('onclick','showModal(' + data[0].id + ')');
    besttitle.innerHTML = data[0].title;

    $.get('http://localhost:8000/api/v1/titles/' + data[0].id).done(
        function(data) {
            bestdesc.innerHTML = data.long_description
        });



    let slider = document.getElementById('best');
    let sliders = slider.getElementsByClassName('movie_item');

    for (let i = 0; i < sliders.length; i++) {

        let img = sliders[i].getElementsByTagName('img')[0];
        img.src = data[i+1].image_url;
        img.alt = data[i+1].title;
        img.setAttribute('onclick','showModal(' + data[i+1].id +')' )

      };



};

function getDataByCat(genre) {

    let resultsp1;
    let resultsp2;
    let results;
    let url_page1 = 'http://localhost:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score';
    let url_page2 = 'http://localhost:8000/api/v1/titles/?genre=' + genre + '&sort_by=-imdb_score&page=2';

    $.get(url_page1).done(
        function(data) {
            resultsp1 = data.results;

            $.get(url_page2).done(
                function(data) {
                    resultsp2 = data.results;

                    results = resultsp1.concat(resultsp2);

                    SliderContent(genre, results)
                }
            );
        }
    );
};


function SliderContent(genre, data) {

    let slider = document.getElementById(genre);
    let sliders = slider.getElementsByClassName('movie_item');


    for (let i = 0; i < sliders.length; i++) {

        let img = sliders[i].getElementsByTagName('img')[0];
        img.src = data[i].image_url;
        img.alt = data[i].title;
        img.setAttribute('onclick','showModal(' + data[i].id +')' )

      };

};





let modal = document.getElementById("modalBox");
let span = document.getElementsByClassName("close")[0];
let body = document.getElementsByTagName('body')[0]

let ModalContent = function(data) {
    //récupérer les informations d'une balise identifiée par son id
    let title = document.getElementById('movie-title');
    let desc = document.getElementById('desc');
    let imdb = document.getElementById('imdb');
    let date = document.getElementById('date');
    let sec = document.getElementsByClassName('s-cont');
    let image = document.getElementById('modal-image');


    title.innerHTML = data.title  + " - " + data.duration + "min";
    desc.innerHTML = data.description;
    date.innerHTML = data.year;
    imdb.innerHTML = "Imdb: " + data.imdb_score;
    sec[0].innerHTML = data.genres;
    sec[1].innerHTML = data.rated;
    sec[2].innerHTML = data.directors;
    sec[3].innerHTML = data.actors;
    sec[4].innerHTML = data.countries;
    sec[5].innerHTML = data.worldwide_gross_income + " entrés";
    image.src = data.image_url;
};

function showModal(movieid) {

    let url = "http://localhost:8000/api/v1/titles/" + movieid;
    $.get(url).done(ModalContent);
    modal.style.display = "block";

    document.getElementsByClassName('container')[0].style.filter = 'blur(10px)';
    body.style.overflowY = 'hidden';
};

span.onclick = function () {
    modal.style.display = "none";
    body.style.overflowY = 'visible';
    document.getElementsByClassName('container')[0].style.filter = 'none'
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflowY = 'visible';
        document.getElementsByClassName('container')[0].style.filter = 'none'


  }
};





