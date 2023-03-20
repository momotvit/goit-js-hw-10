import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;


const searchEl = document.querySelector('#search-box');
const countryEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');


searchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


/////////// on input changes in markup


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
            return Notify.info("Too many matches found. Please enter a more specific name.",{
                className: 'notiflix-report',
                width: '320px',
                backgroundColor: '#f8f8f8',
                borderRadius: '25px',
                rtl: false,
                zindex: 4002,
                backOverlay: true,
                backOverlayColor: 'rgba(0,0,0,0.5)',
                backOverlayClickToClose: false,
                fontFamily: 'Quicksand',
                svgSize: '110px',
                plainText: true,
                titleFontSize: '16px',
                titleMaxLength: 34,
                messageFontSize: '13px',
                messageMaxLength: 400,
                buttonFontSize: '14px',
                buttonMaxLength: 34,
                cssAnimation: true,
                cssAnimationDuration: 360,
                cssAnimationStyle: 'fade' - 'zoom',
                svgColor: '#ff5549',
                titleColor: '#1e1e1e',
                messageColor: '#242424',
                buttonBackground: '#ff5549',
                buttonColor: '#fff',
                backOverlayColor: 'rgba(255,85,73,0.2)',
        });
        } else if (countries.length >= 2 && countries.length <= 10) {
            return countries.map(renderCountryMarkup);
        } else if (countries.length === 1) {
            return renderCountryInfo(countries);
        }
        })
       .catch((error) => {
        showWarning(error);
        clearMarkup();
     })
}
 

/////markup for country info

function renderCountryInfo(countries) {
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
 

///////////markup list of contries

function renderCountryMarkup(country) {
    const { 
            name,  
            flags,  
        } = country;
    const markup = `<li><img src="${flags.svg}" alt="${name.official}" width="40" height="25"><span>${name.official}</span></li>`;
    return countryListEl.insertAdjacentHTML("beforeend", markup); 
    
}


/////////deleting markups


function clearMarkup() {
    countryEl.innerHTML = '';
    countryListEl.innerHTML = '';
}


/////////showing warning messages using notifyMessage

function showWarning(error) { Notify.failure('Oops, there is no country with that name',{
                className: 'notiflix-report',
                width: '320px',
                backgroundColor: '#f8f8f8',
                borderRadius: '25px',
                rtl: false,
                zindex: 4002,
                backOverlay: true,
                backOverlayColor: 'rgba(0,0,0,0.5)',
                backOverlayClickToClose: false,
                fontFamily: 'Quicksand',
                svgSize: '110px',
                plainText: true,
                titleFontSize: '16px',
                titleMaxLength: 34,
                messageFontSize: '13px',
                messageMaxLength: 400,
                buttonFontSize: '14px',
                buttonMaxLength: 34,
                cssAnimation: true,
                cssAnimationDuration: 360,
                cssAnimationStyle: 'fade' - 'zoom',
                svgColor: '#ff5549',
                titleColor: '#1e1e1e',
                messageColor: '#242424',
                buttonBackground: '#ff5549',
                buttonColor: '#fff',
                backOverlayColor: 'rgba(255,85,73,0.2)',
})
};







