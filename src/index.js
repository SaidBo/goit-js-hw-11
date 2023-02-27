import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchImage from './fetchImages';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const searchImage = new SearchImage();

let markup;

function gallerylightbox() {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    enableKeyboard: true,
  });
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  refs.loadMoreBtn.hidden = true;

  searchImage.image = e.currentTarget.elements.searchQuery.value.trim();
  if (searchImage.image === '') {
    return;
  }

  searchImage.resetPage();
  searchImage.fetchImages().then(hits => {
    clearHitsContainer(),
      createMarkup(hits),
      gallerylightbox(),
      (refs.loadMoreBtn.hidden = false);

      if (hits.length < 40) {
        refs.loadMoreBtn.hidden = true;
      }
  });
  SimpleLightbox.refresh();
}

function onLoadMore(e) {
  searchImage.fetchImages().then(hits => {
    createMarkup(hits);
    if (hits.length < 40) {
      refs.loadMoreBtn.hidden = true;
    }
  });
  SimpleLightbox.refresh();
}

function createMarkup(array) {
  markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery-item" href="${largeImageURL}">

        <div class="gallery-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${downloads}</b>
            </p>
          </div>
    
          
        </div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearHitsContainer() {
  refs.gallery.innerHTML = '';
}
