import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchCountries } from './fetchCountries';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onSearchRequest);

function onSearchRequest(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.elements.searchQuery.value;
}

// Notiflix.Notify.failure('Oops, there is no country with that name');
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

// function clearCountryContainer() {
//   refs.countryListUl.innerHTML = '';
//   refs.countryInfoDiv.innerHTML = '';
// }
