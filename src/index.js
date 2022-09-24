import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/styles.css';
import ImgApiService from './img-service';
import LoadMoreBtn from './load-more-btn';

const imgApiService = new ImgApiService();
const refs = {
  formEl: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const { height: pageHeaderHeight } = document
  .querySelector('.search-form')
  .getBoundingClientRect();
document.body.style.paddingTop = `${pageHeaderHeight + 5}px`;

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

refs.formEl.addEventListener('submit', onSearchRequest);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearchRequest(evt) {
  evt.preventDefault();

  imgApiService.query = evt.currentTarget.elements.searchQuery.value;
  refs.galleryContainer.innerHTML = '';
  loadMoreBtn.hide();
  if (!imgApiService.query.trim()) {
    Notiflix.Notify.failure(
      'Sorry, you have to enter query string. Please try again.'
    );
    return;
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  imgApiService.resetPage();
  imgApiService.fetchImg().then(images => {
    if (images.totalHits === 0) {
      loadMoreBtn.hide();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${images.totalHits} images.`);
    appendImgMarkup(images.hits);
    simpleLigthbox.refresh();
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  imgApiService.fetchImg().then(images => {
    appendImgMarkup(images.hits);
    simpleLigthbox.refresh();
    loadMoreBtn.enable();
    if ((imgApiService.page - 1) * imgApiService.per_page > images.totalHits) {
      loadMoreBtn.hide();
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
}

function appendImgMarkup(images = []) {
  const imgMarkup = images
    .map(image => {
      return `
      
      <a class="gallery__item" href="${image.largeImageURL}">
        <div class="photo-card">
          <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />  
          <div class="info">
            <p class="info-item">
              <b class="info-name">Likes</b>
              <span class="info-number">${image.likes}</span>
            </p>
            <p class="info-item">
              <b class="info-name">Views</b>
              <span class="info-number">${image.views}</span>
            </p>
            <p class="info-item">
              <b class="info-name">Comments</b>
              <span class="info-number">${image.comments}</span>
            </p>
            <p class="info-item">
              <b class="info-name">Downloads</b>
              <span class="info-number">${image.downloads}</span>
            </p>
          </div>
          </div>
          </a>

      `;
    })
    .join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', imgMarkup);
}

const simpleLigthbox = new SimpleLightbox('.gallery a', {
  nav: true,
  close: true,
  caption: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
