import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;


const searchEl = document.querySelector('#search-box');
const countryEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');


searchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const countryName = (e.target.value).trim();
    if (!countryName) {
        clearMarkup();
        return;
    }
    fetchCountries(countryName)
        .then(countries => {
            clearMarkup();
               if (countries.length > 10) {
            return Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (countries.length >= 2 && countries.length <= 10) {
            return countries.map(renderCountryMarkup);
        } else if (countries.length === 1) {
            return renderMarkupDiv(countries);
        }
        })
       .catch((error) => {
        showWarning(error);
        clearMarkup();
     })
}


function renderMarkupDiv(countries) {
    return countries.map((country) => {
        const { name, capital, population, flags, languages } = country;
        const listOfLangs = Object.values(languages).join(', ');

        return countryEl.innerHTML =
            `<div class="header-wrapper">
                <img src="${flags.svg}" alt="${name.official}" width="40" height="27">
                <h1>${name.official}</h1>
                </div>
                <p><span class="accent">Capital:</span> ${capital}</p>
                <p><span class="accent">Population:</span> ${population}</p>
                <p><span class="accent">Languages:</span> ${listOfLangs}</p>`

    })
};
 
function renderCountryMarkup(country) {
    const { 
            name,  
            flags,  
        } = country;
    const markup = `<li><img src="${flags.svg}" alt="${name.official}" width="40" height="25"><span>${name.official}</span></li>`;
    return countryListEl.insertAdjacentHTML("beforeend", markup); 
    
}

function clearMarkup() {
    countryEl.innerHTML = '';
    countryListEl.innerHTML = '';
}


function showWarning(error) { Notify.failure('Oops, there is no country with that name'); };







