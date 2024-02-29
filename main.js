// country

// const countryInput = document.querySelector('.countryInput');
// const countryListContainer = document.querySelector('.countryList');
// const countryInfoContainer = document.querySelector('.countryInfo');
// let debounceTimer;

// countryInput.addEventListener('input', () => {
//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     const countryName = countryInput.value.trim();

//     if (countryName) {
//       fetch(`https://restcountries.com/v2/name/${encodeURIComponent(countryName)}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Country not found');
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.length > 10) {
//             showErrorNotification('Make the search more specific.');
//           } else if (data.length >= 2 && data.length <= 10) {
//             showCountryList(data);
//           } else if (data.length === 1) {
//             showCountryInfo(data[0]);
//           } else {
//             showErrorNotification('No matching countries found.');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching country data:', error);
//           showErrorNotification('Country not found or an error occurred.');
//         });
//     } else {
//       clearContainers();
//     }
//   }, 500);
// });

// function showErrorNotification(message) {
//   alert(message); 
// }

// function showCountryList(countries) {
//   const countryNames = countries.map(country => country.name);
//   countryListContainer.innerHTML = `<p>Found countries: ${countryNames.join(', ')}</p>`;
//   clearCountryInfo();
// }

// function showCountryInfo(country) {
//     const { name, capital, population, languages, flags } = country;
//     let flagSrc = '';
//     if (flags && flags.length > 0) {
//       flagSrc = flags[0];
//     } else if (country.hasOwnProperty('flag')) {
//       flagSrc = country.flag;
//     }
  
//     countryInfoContainer.innerHTML = `
//       <h2>${name}</h2>
//       <p>Capital: ${capital}</p>
//       <p>Population: ${population}</p>
//       <p>Languages: ${languages.map(lang => lang.name).join(', ')}</p>
//       ${flagSrc ? `<img src="${flagSrc}" alt="Flag of ${name}" style="max-width: 200px;">` : 'No flag available'}
//     `;
  
//     clearCountryList();
// }


// function clearContainers() {
//   clearCountryList();
//   clearCountryInfo();
// }

// function clearCountryList() {
//   countryListContainer.innerHTML = '';
// }

// function clearCountryInfo() {
//   countryInfoContainer.innerHTML = '';
// }


// pokemon

const form = document.querySelector('.js-search-form');  

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formControl = document.querySelector('.form-control');
  const cardContainer = document.querySelector('.js-card-container');
  const searchTerm = formControl.value.trim().toLowerCase(); 

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    if (!response.ok) {
        alert('Помилки не знайдено');
        return;
    }
    const data = await response.json();
    const namesPokemons = data.results.filter(pokemon => pokemon.name.includes(searchTerm));
    if (namesPokemons.length === 0) {
      alert('Покемонів з такими буквами не знайдено');
      return;
    }
    const promises = namesPokemons.map(async (pokemon) => {
      const pokemonData = await fetch(pokemon.url).then(response => response.json());
      return cardTemplate(pokemonData);
    });
    const cardsHtml = await Promise.all(promises);
    cardContainer.innerHTML = cardsHtml.join('');
    formControl.value = '';
  } 
  catch (error) {
      console.error(error);
      alert('Помилка під час отримання даних');
  }
});

function cardTemplate(data) {
  return `
    <div class="card">
      <h2>${data.name}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p>Type: ${data.types[0].type.name}</p>
    </div>
  `;
}