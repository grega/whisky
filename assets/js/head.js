// makes specific rows unsortable for a List.js instance
function makeRowsUnsortable(
  listInstance,
  listContainerSelector = '.list',
  unsortableSelector = '.unsortable'
) {
  // override sorting behaviour
  listInstance.on('sortStart', function() {
    const unsortableRows = document.querySelectorAll(unsortableSelector);

    // temporarily remove unsortable rows before sorting
    unsortableRows.forEach(row => {
      row.parentNode.removeChild(row);
    });

    listInstance.on('sortComplete', function() {
      // re-append the unsortable rows to the bottom
      const listContainer = document.querySelector(listContainerSelector);
      unsortableRows.forEach(row => {
        listContainer.appendChild(row);
      });
    });
  });
}
