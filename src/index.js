
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault()
    removeDate ()
  // получили значения input
  const valueInput = e.target.value.trim();

  if (valueInput) {
    return fetchCountries(valueInput)
      .then(data => {
        choseMarkup(data);
      })
      .catch(error => {
        removeDate ()
        Notify.failure('Oops, there is no country with that name');
     });
}

function removeDate () {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

}
function choseMarkup(countryArray) {
  if (countryArray.length === 1) {
    countryList.innerHTML = '';
    return markupCountryInfo(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    countryInfo.innerHTML = '';
    return markupCountryList(countryArray);
  }

  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function markupCountryList(data) {
  const markup = data
    .map(el => {
      return `<li class="country_item">
            <img src="${el.flags.svg}" alt="${el.name.official}" width="40"/><p> ${el.name.official} </p>
            </li>`;
    })
    .join('');

    countryList.innerHTML = markup;
}

function markupCountryInfo(data) {
  const markup = data
    .map(el => {
      return `<h1>
       <img src="${el.flags.svg}" alt="${el.name.official}" width="40"/> ${el.name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital: </h2>
          <p>${el.capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population: </h2>
          <p>${el.population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages: </h2>
          <p>${Object.values(el.languages).join(', ')}</p>
        </li>
      </ul>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
}