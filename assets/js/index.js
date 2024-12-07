// table sorting
var options = {
valueNames: [ 'name', 'tried', 'to_try', 'mean_rating' ]
};

var whiskyList = new List('regions', options);

makeRowsUnsortable(whiskyList);

whiskyList.sort('tried', { order: 'desc' });

// search functionality
const apiURL = 'api/whisky.json';

fetch(apiURL)
.then(response => response.json())
.then(data => {
  const searchInput = document.getElementById('search');
  const resultsList = document.getElementById('results');

  const whiskyList = Object.entries(data).flatMap(([country, categories]) => {
    const toTry = categories.to_try ? categories.to_try.map(whisky => ({ name: whisky.name, country })) : [];
    const tried = categories.tried ? categories.tried.map(whisky => ({ name: whisky.name, country })) : [];
    return [...toTry, ...tried];
  });

  // search and render results in a list
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
  
    if (query === '') {
      resultsList.innerHTML = '';
      return;
    }
  
    const filtered = whiskyList.filter(whisky =>
      whisky.name.toLowerCase().includes(query)
    );
  
    const sorted = filtered.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(query);
      const bStartsWith = b.name.toLowerCase().startsWith(query);
  
      if (aStartsWith && !bStartsWith) return -1; // prioritize matches at the beginning
      if (!aStartsWith && bStartsWith) return 1;
      return a.name.localeCompare(b.name); // alphabetical order
    });
  
    resultsList.innerHTML = '';
    sorted.forEach(whisky => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/${whisky.country}/?whisky_name=${encodeURIComponent(whisky.name)}`;
      
      // highlight the matching part
      const whiskyName = whisky.name;
      const matchIndex = whiskyName.toLowerCase().indexOf(query);
      if (matchIndex !== -1) {
        const beforeMatch = whiskyName.slice(0, matchIndex);
        const match = whiskyName.slice(matchIndex, matchIndex + query.length);
        const afterMatch = whiskyName.slice(matchIndex + query.length);

        link.innerHTML = `${beforeMatch}<span class="highlight">${match}</span>${afterMatch} <span class="country">${whisky.country}</span>`;
      } else {
        link.textContent = whiskyName;
      }

      listItem.appendChild(link);
      resultsList.appendChild(listItem);
    });
  });
})
.catch(error => console.error('Error fetching whisky data:', error));
