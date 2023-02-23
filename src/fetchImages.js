import Notiflix from 'notiflix';

const KEY = '33789988-f9aefe3c6c127df92c9e5d9ec';
const options =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default class SearchImage {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&${options}&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(({ totalHits, hits }) => {
        if (totalHits > 0) {
          Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
          this.incrementPage();
        } else {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }

        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get image() {
    return this.searchQuery;
  }

  set image(newImage) {
    this.searchQuery = newImage;
  }
}
