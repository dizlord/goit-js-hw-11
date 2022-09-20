import './css/styles.css';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const refs = {
  searchInput: document.querySelector('#search-box'),
};

// Notiflix.Notify.failure('Oops, there is no country with that name');
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

// function clearCountryContainer() {
//   refs.countryListUl.innerHTML = '';
//   refs.countryInfoDiv.innerHTML = '';
// }
