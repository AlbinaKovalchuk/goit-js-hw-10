const URL_NAME = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(country) {
  return fetch(`${URL_NAME}${country}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов