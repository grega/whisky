document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});

// get query parameter value by name (e.g. ?whisky_name=Ardbeg) when searching
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// scroll to and highlight whisky row
function highlightWhiskyRow(whiskyName) {
  const row = [...document.querySelectorAll('td.name')].find(td =>
    td.textContent.trim() === whiskyName
  );

  if (row) {
    const tableRow = row.parentElement; // get the parent <tr>
    tableRow.scrollIntoView({ behavior: 'smooth', block: 'center' }); // scroll to the row
    tableRow.classList.add('highlight'); // add the highlight class to the <tr>
    setTimeout(() => tableRow.classList.remove('highlight'), 3000);
  }
}

// get whisky_name from query string and highlight the corresponding row
const whiskyName = getQueryParam('whisky_name');
if (whiskyName) {
  highlightWhiskyRow(decodeURIComponent(whiskyName));
}
