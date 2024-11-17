function convertPersianToEnglish(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
}

function createTable() {
  const table = document.getElementById("resizable-table");
  const headers = table.querySelectorAll("th");
  let draggingCol = null;
  let startX, startWidth;
  let draggedHeader = null;
  const LOCAL_STORAGE_KEY = "tableColumnStates";
  const COLUMN_ORDER_KEY = "tableColumnOrder";

  // Load column order from localStorage or initialize default order
  let columnOrder =
    JSON.parse(localStorage.getItem(COLUMN_ORDER_KEY)) ||
    Array.from(headers).map((_, index) => index);

  // Apply initial column order
  function applyColumnOrder() {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = Array.from(row.children);
      const reorderedCells = columnOrder.map((index) => cells[index]);
      row.innerHTML = "";
      reorderedCells.forEach((cell) => row.appendChild(cell));
    });
  }

  // Load columns order from localStorage
  applyColumnOrder();

  // Sorting function
  function sortingHandler(e, header) {
    // Ignore click if it's on handle or resizer
    if (
      e.target.classList.contains("handle") ||
      e.target.classList.contains("resizer") ||
      e.target.classList.contains("column-menu-button") ||
      e.target.closest(".column-menu")
    ) {
      return;
    }

    // Get the current column index based on DOM position
    const currentIndex = Array.from(header.parentElement.children).indexOf(
      header
    );

    const currentSort = header.getAttribute("data-sort");

    // Reset all other headers
    headers.forEach((h) => {
      if (h !== header) h.setAttribute("data-sort", "none");
    });

    // Cycle through sort states
    let newSort;
    switch (currentSort) {
      case "none":
        newSort = "asc";
        break;
      case "asc":
        newSort = "desc";
        break;
      case "desc":
        newSort = "none";
        break;
    }

    header.setAttribute("data-sort", newSort);

    // Get table data and sort
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    if (newSort !== "none") {
      rows.sort((a, b) => {
        let aVal = a.cells[currentIndex].textContent.trim();
        let bVal = b.cells[currentIndex].textContent.trim();

        console.log(aVal, bVal);

        // Convert Persian numbers for comparison if needed
        if (a.cells[currentIndex].querySelector(".persian-number")) {
          aVal = convertPersianToEnglish(aVal);
          bVal = convertPersianToEnglish(bVal);
          aVal = parseInt(aVal);
          bVal = parseInt(bVal);
        }

        if (newSort === "asc") {
          return bVal.toString().localeCompare(aVal.toString(), "fa");
        } else {
          return aVal.toString().localeCompare(bVal.toString(), "fa");
        }
      });
    } else {
      // Reset to original order based on DOM position
      rows.sort((a, b) => {
        return (
          Array.from(tbody.children).indexOf(a) -
          Array.from(tbody.children).indexOf(b)
        );
      });
    }

    // Reorder the table
    rows.forEach((row) => tbody.appendChild(row));
  }

  // Column resizing functionality
  headers.forEach((header) => {
    // Sorting event
    header.addEventListener("click", (e) => {
      sortingHandler(e, header);
    });

    // Set default width for columns
    header.style.width = `${header.offsetWidth}px`;

    // Resizing logic
    const resizer = header.querySelector(".resizer");
    if (resizer) {
      resizer.addEventListener("mousedown", function (e) {
        headers.forEach((header) => {
          header.style.width = `${header.offsetWidth - 20}px`;
        });

        table.style.width = "fit-content";

        e.stopPropagation();
        e.preventDefault();
        draggingCol = header;
        startX = e.pageX;
        startWidth = header.offsetWidth;

        document.addEventListener("mousemove", onResize);
        document.addEventListener("mouseup", stopResize);

        table.classList.add("resizing");
      });
    }

    // Column moving functionality
    const handle = header.querySelector(".handle");
    handle.addEventListener("mousedown", function (e) {
      draggedHeader = header;
      header.classList.add("dragging");

      document.querySelector("table").classList.add("prevent-select");

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stopMove);
    });
  });

  function onResize(e) {
    if (draggingCol) {
      // Calculate the difference from the starting point
      const diffX = e.pageX - startX;
      // For RTL, we need to invert the difference
      const newWidth = Math.max(startWidth - diffX, 150); // Minimum width of 100px
      draggingCol.style.width = `${newWidth}px`;

      // headers.forEach(header => {
      //   console.log(header.dataset.col, header.clientWidth);
      //   header.style.width = `${header.clientWidth}px`;
      // });
    }
  }

  function stopResize() {
    draggingCol = null;
    table.classList.remove("resizing");
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);

    // headers.forEach(header => {
    //   console.log(header.dataset.col, header.clientWidth);
    //   header.style.width = `${header.offsetWidth}px`;
    // });
  }

  function onMove(e) {
    e.preventDefault();
    headers.forEach((header) => {
      if (header !== draggedHeader) {
        const rect = header.getBoundingClientRect();
        const min = rect.x;
        const max = rect.x + rect.width;

        header.classList.toggle(
          "drag-over",
          e.clientX < max && e.clientX > min
        );
      }
    });
  }

  function stopMove() {
    document.querySelector("table").classList.remove("prevent-select");

    if (draggedHeader) {
      const dragOverHeader = table.querySelector("th.drag-over");
      if (dragOverHeader) {
        const draggedIndex = Array.from(
          draggedHeader.parentElement.children
        ).indexOf(draggedHeader);
        const dropIndex = Array.from(
          dragOverHeader.parentElement.children
        ).indexOf(dragOverHeader);

        // Update column order array
        const [removed] = columnOrder.splice(draggedIndex, 1);
        columnOrder.splice(dropIndex, 0, removed);

        // Save to localStorage
        localStorage.setItem(COLUMN_ORDER_KEY, JSON.stringify(columnOrder));

        // Swap columns in the table
        const rows = table.querySelectorAll("tr");
        rows.forEach((row) => {
          const cells = row.children;
          const draggedCell = cells[draggedIndex];

          if (draggedIndex < dropIndex) {
            row.insertBefore(draggedCell, cells[dropIndex].nextSibling);
          } else {
            row.insertBefore(draggedCell, cells[dropIndex]);
          }
        });
      }

      draggedHeader.classList.remove("dragging");
      headers.forEach((header) => header.classList.remove("drag-over"));
      draggedHeader = null;
    }

    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", stopMove);

    // Update column states after reordering
    const newStates = new Map();
    headers.forEach((header, newIndex) => {
      const originalIndex = parseInt(header.getAttribute("data-col"));
      const oldState = columnStates.get(originalIndex);
      if (oldState) {
        newStates.set(newIndex, {
          ...oldState,
          originalIndex: oldState.originalIndex,
        });
      }
    });
    columnStates.clear();
    newStates.forEach((state, index) => columnStates.set(index, state));
    updateAllSubmenus();
    saveVisibilityStates();
  }

  //
  // Menu
  //

  // Store column states globally
  const columnStates = new Map();

  // Load visibility states from localStorage
  function loadVisibilityStates() {
    try {
      const savedStates = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStates) {
        return JSON.parse(savedStates);
      }
    } catch (error) {
      console.error("Error loading visibility states:", error);
    }
    return {};
  }

  // Save visibility states to localStorage
  function saveVisibilityStates() {
    const states = {};
    columnStates.forEach((state, index) => {
      states[state.name] = state.visible;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(states));
  }

  // Initialize column states
  function initializeColumnStates() {
    const savedStates = loadVisibilityStates();

    Array.from(headers).forEach((header, index) => {
      const columnName = header.querySelector(
        ".header-content span:nth-child(2)"
      )?.textContent;
      const isVisible = savedStates.hasOwnProperty(columnName)
        ? savedStates[columnName]
        : true;

      columnStates.set(index, {
        name: columnName,
        visible: isVisible,
        originalIndex: index,
      });
    });

    // Apply initial visibility states
    updateColumnVisibility();
  }

  function updateSubmenu(submenu) {
    submenu.innerHTML = "";
    const sortedStates = Array.from(columnStates.entries()).sort(
      (a, b) => a[1].originalIndex - b[1].originalIndex
    );

    sortedStates.forEach(([index, state]) => {
      const item = document.createElement("div");
      item.className = "checkbox-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.visible;

      checkbox.addEventListener(
        "change",
        (function (columnIndex) {
          return function (e) {
            e.stopPropagation();
            toggleColumn(columnIndex, e.target.checked);
            updateAllSubmenus();
            saveVisibilityStates();
          };
        })(index)
      );

      const label = document.createElement("label");
      label.textContent = state.name;

      item.appendChild(checkbox);
      item.appendChild(label);
      submenu.appendChild(item);
    });
  }

  function updateAllSubmenus() {
    const allSubmenus = table.querySelectorAll(".submenu");
    allSubmenus.forEach((submenu) => {
      updateSubmenu(submenu);
    });
  }

  function toggleColumn(index, visible) {
    const state = columnStates.get(index);
    if (state) {
      state.visible = visible;
      updateColumnVisibility();
      saveVisibilityStates();
    }
  }

  function hideColumn(index) {
    toggleColumn(index, false);
    updateAllSubmenus();
  }

  function updateColumnVisibility() {
    headers.forEach((header, index) => {
      const state = columnStates.get(index);
      if (state) {
        if (!state.visible) {
          header.classList.add("hidden-column");
        } else {
          header.classList.remove("hidden-column");
        }
      }
    });

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      Array.from(row.cells).forEach((cell, index) => {
        const state = columnStates.get(index);
        if (state) {
          if (!state.visible) {
            cell.classList.add("hidden-column");
          } else {
            cell.classList.remove("hidden-column");
          }
        }
      });
    });
  }

  function initializeMenus() {
    const menuButtons = table.querySelectorAll(".column-menu-button");

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".column-menu-button")) {
        table.querySelectorAll(".column-menu.show").forEach((menu) => {
          menu.classList.remove("show");
        });
      }
    });

    menuButtons.forEach((button, index) => {
      const menu = button.nextElementSibling;

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        table.querySelectorAll(".column-menu.show").forEach((m) => {
          if (m !== menu) m.classList.remove("show");
        });
        menu.classList.toggle("show");
      });

      menu.addEventListener("click", (e) => e.stopPropagation());

      const hideButton = menu.querySelector(".hide-column");
      hideButton.addEventListener("click", (e) => {
        e.stopPropagation();
        hideColumn(index);
        menu.classList.remove("show");
        saveVisibilityStates();
      });

      updateSubmenu(menu.querySelector(".submenu"));
    });
  }

  // Handle column reordering
  const originalStopMove = stopMove;
  stopMove = function () {
    originalStopMove();
    const newStates = new Map();
    headers.forEach((header, newIndex) => {
      const originalIndex = parseInt(header.getAttribute("data-col"));
      const oldState = columnStates.get(originalIndex);
      if (oldState) {
        newStates.set(newIndex, {
          ...oldState,
          originalIndex: oldState.originalIndex,
        });
      }
    });
    columnStates.clear();
    newStates.forEach((state, index) => columnStates.set(index, state));
    updateAllSubmenus();
    saveVisibilityStates();
  };

  // Filtering

  const filters = new Map();

  function getColumnName(columnIndex) {
    const table = document.getElementById("resizable-table");
    const headers = table.querySelectorAll("th");
    const header = headers[columnIndex];
    return header.querySelector(".header-content span:nth-child(2)")
      ?.textContent;
  }

  function getColumnIndexByName(columnName) {
    const table = document.getElementById("resizable-table");
    const headers = table.querySelectorAll("th");
    return Array.from(headers).findIndex(
      (header) =>
        header.querySelector(".header-content span:nth-child(2)")
          ?.textContent === columnName
    );
  }

  function applyFilter(columnIndex, filterType, filterValue) {
    const columnName = getColumnName(columnIndex);
    console.log(getColumnName(columnIndex), columnIndex);
    filters.set(columnName, { type: filterType, value: filterValue });
    updateTableFilters();
  }

  function clearFilter(columnIndex) {
    const columnName = getColumnName(columnIndex);
    filters.delete(columnName);

    // Clear input and select values
    const header = headers[columnIndex];
    const menu = header.querySelector(".column-menu");
    const input = menu.querySelector(".filter-input");
    const select = menu.querySelector(".filter-select");

    if (input) input.value = "";
    if (select) select.selectedIndex = 0;

    updateTableFilters();
    updateClearAllFiltersButton();
  }

  const clearFilterButtons = table.querySelectorAll(".clear-filter");
  clearFilterButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Clear the filter input and reset select
      const container = button.closest(".filter-container");
      const input = container.querySelector(".filter-input");
      const select = container.querySelector(".filter-select");
      input.value = "";
      select.selectedIndex = 0;

      // Clear the filter from our filters Map
      clearFilter(index);

      // Hide menu after clearing filter
      container.closest(".column-menu").classList.remove("show");
    });
  });

  // Clear all filters button
  const clearAllFiltersButton = document.querySelector(".clear-all-filters");

  // Function to update clear all filters button visibility
  function updateClearAllFiltersButton() {
    clearAllFiltersButton.classList.toggle("visible", filters.size > 0);
  }

  clearAllFiltersButton.addEventListener("click", () => {
    // Clear all filter inputs and selects
    table.querySelectorAll(".filter-input").forEach((input) => {
      input.value = "";
    });
    table.querySelectorAll(".filter-select").forEach((select) => {
      select.selectedIndex = 0;
    });

    // Clear all filters
    filters.clear();
    updateTableFilters();

    // Hide filter badges
    table.querySelectorAll(".filter-badge").forEach((badge) => {
      badge.style.display = "none";
    });
  });

  // const originalUpdateTableFilters = updateTableFilters;
  function updateTableFilters() {
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      let showRow = true;

      filters.forEach((filter, columnName) => {
        const columnIndex = getColumnIndexByName(columnName);
        if (columnIndex === -1) return; // Skip if column not found

        const cell = row.cells[columnIndex];
        const cellValue = cell.textContent.trim();
        const isPersianNumber = cell.querySelector(".persian-number") !== null;

        let testValue = cellValue;
        let filterValue = filter.value;

        if (isPersianNumber) {
          testValue = convertPersianToEnglish(testValue);
          filterValue = convertPersianToEnglish(filterValue);
        }

        switch (filter.type) {
          case "equals":
            showRow = showRow && testValue === filterValue;
            break;
          case "not-equals":
            showRow = showRow && testValue !== filterValue;
            break;
          case "starts-with":
            showRow = showRow && testValue.startsWith(filterValue);
            break;
          case "contains":
            showRow = showRow && testValue.includes(filterValue);
            break;
          case "not-contains":
            showRow = showRow && !testValue.includes(filterValue);
            break;
          case "ends-with":
            showRow = showRow && testValue.endsWith(filterValue);
            break;
          case "is-empty":
            showRow = showRow && testValue === "";
            break;
          case "is-not-empty":
            showRow = showRow && testValue !== "";
            break;
        }
      });

      row.style.display = showRow ? "" : "none";
    });

    // Update filter badges
    headers.forEach((header) => {
      const columnName = header.querySelector(
        ".header-content span:nth-child(2)"
      )?.textContent;

      const badge =
        header.querySelector(".filter-badge") ||
        (() => {
          const badge = document.createElement("span");
          badge.className = "filter-badge";
          badge.textContent = "🔍";
          header.querySelector(".header-content").appendChild(badge);
          return badge;
        })();

      badge.style.display = filters.has(columnName) ? "inline-block" : "none";
    });

    // Update clear all filters button visibility
    updateClearAllFiltersButton();
  }

  // Update the filter initialization
  function initializeFilters() {
    const filterContainers = table.querySelectorAll(".filter-container");

    filterContainers.forEach((container, index) => {
      const select = container.querySelector(".filter-select");
      const input = container.querySelector(".filter-input");
      const applyButton = container.querySelector(".apply-filter");

      applyButton.addEventListener("click", () => {
        const filterType = select.value;
        const filterValue = input.value;

        if (
          filterType === "is-empty" ||
          filterType === "is-not-empty" ||
          filterValue
        ) {
          applyFilter(index, filterType, filterValue);
        } else {
          clearFilter(index);
        }

        // Hide menu after applying filter
        container.closest(".column-menu").classList.remove("show");
      });

      // Add input shortcuts
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          applyButton.click();
        }
      });
    });
  }

  // Initialize everything
  initializeColumnStates();
  initializeMenus();
  initializeFilters();
  // initializeClearFilters();
}

document.addEventListener("DOMContentLoaded", function () {
  createTable();
});
