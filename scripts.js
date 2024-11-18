const fakeHeaders = ["نام", "شهر", "سن", "کشور"];

const fakeData = [
  ["اریم حسینی", "اصفهان", "۲۵", "ایران"],
  ["پلی محمدی", "تهران", "۳۰", "ایران"],
  ["علی محمدی", "تهران", "۳۰", "ایران"],
  ["علی محمدی", "تهران", "۳۰", "ایران"],
  ["علی محمدی	", "تهران", "۳۰", "ایران"],
  ["e بث صصعخص د صثخ ذصثبضا کریمی	", "اصفهان", "۳۵", "ایران"],
];

function insertData(gridData, headersData) {
  const table = document.getElementById("resizable-table");
  const headersContainer = table.querySelector("thead tr");
  const dataContainer = table.querySelector("tbody");

  headersContainer.innerHTML = `
    <th
      class="select-th"
      data-col="0"
      data-sort="none"
      style="width: 30px !important; min-width: 0px !important">
      <div>
        <input type="checkbox" />
      </div>
      <button class="column-menu-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-ellipsis-vertical">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
      <div class="column-menu">
        <div class="menu-item filter-column">
          <div class="filter-container">
            <div class="filter-row">
              <select class="filter-select">
                <option value="equals">برابر است با</option>
                <option value="not-equals">برابر نیست با</option>
                <option value="starts-with">شروع می‌شود با</option>
                <option value="contains">شامل</option>
                <option value="not-contains">شامل نیست</option>
                <option value="ends-with">پایان می‌یابد با</option>
                <option value="is-empty">خالی است</option>
                <option value="is-not-empty">خالی نیست</option>
              </select>
              <input
                type="text"
                class="filter-input"
                placeholder="مقدار فیلتر..." />
            </div>
            <div class="button-group">
              <button class="clear-filter">پاک کردن</button>
              <button class="apply-filter">اعمال</button>
            </div>
          </div>
        </div>
        <div class="menu-separator"></div>
        <div class="menu-item-button menu-item hide-column">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye-off">
            <path
              d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path
              d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
          </svg>
          <span>پنهان کردن ستون</span>
        </div>
        <div class="menu-separator"></div>
        <div class="menu-item-button menu-item show-columns">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list-todo">
            <rect x="3" y="5" width="6" height="6" rx="1" />
            <path d="m3 17 2 2 4-4" />
            <path d="M13 6h8" />
            <path d="M13 12h8" />
            <path d="M13 18h8" />
          </svg>
          <span>نمایش ستون‌ها</span>
          <div class="submenu"></div>
        </div>
      </div>
      <span class="sort-icon"></span>
    </th>`;

  headersData.forEach((header, index) => {
    headersContainer.insertAdjacentHTML(
      "beforeend",
      `<th data-col="${index + 1}" data-sort="none">
        <div class="header-content">
          <span class="handle">⋮⋮</span>
          <span>${header}</span>
          <div class="resizer"></div>
          <button class="column-menu-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-ellipsis-vertical">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          <div class="column-menu">
            <div class="menu-item filter-column">
              <div class="filter-container">
                <div class="filter-row">
                  <select class="filter-select">
                    <option value="equals">برابر است با</option>
                    <option value="not-equals">برابر نیست با</option>
                    <option value="starts-with">شروع می‌شود با</option>
                    <option value="contains">شامل</option>
                    <option value="not-contains">شامل نیست</option>
                    <option value="ends-with">پایان می‌یابد با</option>
                    <option value="is-empty">خالی است</option>
                    <option value="is-not-empty">خالی نیست</option>
                  </select>
                  <input
                    type="text"
                    class="filter-input"
                    placeholder="مقدار فیلتر..." />
                </div>
                <div class="button-group">
                  <button class="clear-filter">پاک کردن</button>
                  <button class="apply-filter">اعمال</button>
                </div>
              </div>
            </div>
            <div class="menu-separator"></div>
            <div class="menu-item-button menu-item hide-column">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off">
                <path
                  d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path
                  d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
              <span>پنهان کردن ستون</span>
            </div>
            <div class="menu-separator"></div>
            <div class="menu-item-button menu-item show-columns">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-list-todo">
                <rect x="3" y="5" width="6" height="6" rx="1" />
                <path d="m3 17 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </svg>
              <span>نمایش ستون‌ها</span>
              <div class="submenu"></div>
            </div>
          </div>
          <span class="sort-icon"></span>
        </div>
      </th>`
    );
  });

  dataContainer.innerHTML = "";

  gridData.forEach((items) => {
    dataContainer.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td class="select-td">
          <div>
            <input type="checkbox" />
          </div>
        </td>
        ${items.map((item) => `<td>${item}</td>`).join("")}
      </tr>`
    );
  });
}

function convertPersianToEnglish(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
}

function getColumnIndexByName(columnName) {
  const table = document.getElementById("resizable-table");
  const headers = table.querySelectorAll("th");
  return Array.from(headers).findIndex(
    (header) =>
      header.querySelector(".header-content span:nth-child(2)")?.textContent ===
      columnName
  );
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
      e.target.closest(".column-menu") ||
      e.target.classList.contains("filter-badge") ||
      e.target.closest(".select-th")
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
        let aVal = a.cells[currentIndex]?.textContent.trim();
        let bVal = b.cells[currentIndex]?.textContent.trim();

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
    if (header.closest(".select-th")) {
      return;
    }

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
    handle?.addEventListener("mousedown", function (e) {
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
    }
  }

  function stopResize() {
    draggingCol = null;
    table.classList.remove("resizing");
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
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

      columnStates.set(getColumnIndexByName(columnName), {
        name: columnName,
        visible: isVisible,
        originalIndex: index,
      });

      console.log(columnStates);
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
      if (!state.name) {
        return;
      }
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

    console.log(state);
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
        console.log(index);
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

  function updateTableFilters() {
    const table = document.getElementById("resizable-table");
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

    const headers = table.querySelectorAll("th");

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
          badge.innerHTML = `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter-x"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>`;
          header.querySelector(".header-content")?.appendChild(badge);
          return badge;
        })();

      badge?.addEventListener("click", (e) => {
        e.stopPropagation();
        clearFilter(getColumnIndexByName(columnName));
      });

      badge.style.display = filters.has(columnName) ? "flex" : "none";

      if (filters.has(columnName)) {
        header.style.backgroundColor = "#d0d0ff";
        console.log(columnName);
      } else {
        header.style.backgroundColor = "#f1f1f9";
      }
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

      applyButton.addEventListener("click", (e) => {
        const filterType = select.value;
        const filterValue = input.value;

        const columnName =
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
            "span:nth-child(2)"
          )?.textContent;

        console.log(columnName);

        if (
          filterType === "is-empty" ||
          filterType === "is-not-empty" ||
          filterValue
        ) {
          applyFilter(
            getColumnIndexByName(columnName),
            filterType,
            filterValue
          );
        } else {
          clearFilter(getColumnIndexByName(columnName));
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

  // Selection

  const selectAllButton = table.querySelector(".select-th input");
  const selectButtons = table.querySelectorAll(".select-td input");

  selectAllButton.addEventListener("click", (event) => {
    if (event.target.checked) {
      selectButtons.forEach((btn) => {
        btn.checked = true;
      });
    } else {
      selectButtons.forEach((btn) => {
        btn.checked = false;
      });
    }
  });

  selectButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (event.target.checked) {
        let isAllSelected = true;

        selectButtons.forEach((selectBtn) => {
          if (!selectBtn.checked) isAllSelected = false;
        });

        if (isAllSelected) selectAllButton.checked = true;
      } else {
        selectAllButton.checked = false;
      }
    });
  });

  // Initialize everything
  initializeColumnStates();
  initializeMenus();
  initializeFilters();
  // initializeClearFilters();
}

// Grouping

function changeFeaturesVisibility(action) {
  const openMenuButton = document.querySelectorAll(".column-menu-button");
  const sortIcon = document.querySelectorAll(".sort-icon");
  const handle = document.querySelectorAll(".handle");

  if (action === "hide") {
    openMenuButton.forEach((btn) => {
      btn.classList.add("hidden");
    });
    sortIcon.forEach((icon) => {
      icon.classList.add("hidden");
    });
    handle.forEach((elem) => {
      elem.classList.add("hidden");
    });
  } else {
    openMenuButton.forEach((btn) => {
      btn.classList.remove("hidden");
    });
    sortIcon.forEach((icon) => {
      icon.classList.remove("hidden");
    });
    handle.forEach((elem) => {
      elem.classList.remove("hidden");
    });
  }
}

function addGroupByMenuItem() {
  // Add group by menu item to each column menu
  const columnMenus = document.querySelectorAll(".column-menu");
  columnMenus.forEach((menu) => {
    if (!menu.querySelector(".group-by")) {
      const groupByItem = createGroupByMenuItem();
      // Insert before show-columns
      const showColumns = menu.querySelector(".show-columns");
      menu.insertBefore(groupByItem, showColumns);
      menu.insertBefore(createMenuSeparator(), showColumns);
    }
  });
}

function createGroupByMenuItem() {
  const menuItem = document.createElement("div");
  menuItem.className = "menu-item-button menu-item group-by";
  menuItem.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
    <span>گروه‌بندی براساس این ستون</span>
  `;

  menuItem.addEventListener("click", function (e) {
    const th = this.closest("th");
    const columnIndex = th.getAttribute("data-col");
    const columnName = th.querySelector(
      ".header-content span:not(.handle)"
    ).textContent;
    console.log(columnIndex, columnName);
    groupByColumn(getColumnIndexByName(columnName), columnName);
  });

  return menuItem;
}

function createMenuSeparator() {
  const separator = document.createElement("div");
  separator.className = "menu-separator";
  return separator;
}

function addRemoveGroupButton() {
  // Remove existing button if any
  const existingButton = document.querySelector(".remove-group-button");
  if (existingButton) {
    existingButton.remove();
  }

  const tableContainer = document.querySelector(".table-container");
  const removeButton = document.createElement("button");
  removeButton.className = "remove-group-button";
  removeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
    حذف گروه‌بندی
  `;

  removeButton.addEventListener("click", removeGrouping);

  // Insert after clear-all-filters button
  const clearFiltersButton = document.querySelector(".clear-all-filters");
  clearFiltersButton.parentNode.insertBefore(
    removeButton,
    clearFiltersButton.nextSibling
  );
}

function removeGrouping() {
  const table = document.getElementById("resizable-table");
  const tbody = table.querySelector("tbody");

  changeFeaturesVisibility("show");

  // Remove group headers and show all rows
  const groupHeaders = tbody.querySelectorAll(".group-header");
  groupHeaders.forEach((header) => header.remove());

  // Show all regular rows
  tbody.querySelectorAll("tr").forEach((row) => {
    row.style.display = "";
  });

  // Remove the remove-group button
  const removeButton = document.querySelector(".remove-group-button");
  if (removeButton) {
    removeButton.remove();
  }
}

// Update groupByColumn function to maintain sort order
function groupByColumn(columnIndex, columnName) {
  const table = document.getElementById("resizable-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr:not(.group-header)"));

  changeFeaturesVisibility("hide");

  table.style.width = "fit-content";

  // Create groups object
  const groups = new Map();
  rows.forEach((row) => {
    const value = row.cells[columnIndex].textContent.trim();
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(row);
  });

  // Sort groups by key
  const sortedGroups = new Map(
    [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0], "fa"))
  );

  // Clear existing tbody
  tbody.innerHTML = "";

  // Create and add group headers and rows
  sortedGroups.forEach((groupRows, groupValue) => {
    // Create group header
    const groupHeader = document.createElement("tr");
    groupHeader.className = "group-header";
    groupHeader.innerHTML = `
      <td colspan="5" class="group-cell">
        <div class="flex items-center gap-2 p-2 bg-gray-100 cursor-pointer">
          <span class="group-toggle">▼</span>
          <span>${groupValue} (${groupRows.length} مورد)</span>
        </div>
      </td>
    `;

    // Add click handler for expand/collapse
    groupHeader
      .querySelector(".group-cell")
      .addEventListener("click", function () {
        const toggle = this.querySelector(".group-toggle");
        const isExpanded = toggle.textContent === "▼";
        toggle.textContent = isExpanded ? "▶" : "▼";

        groupRows.forEach((row) => {
          row.style.display = isExpanded ? "none" : "";
        });
      });

    // Add group header and rows to tbody
    tbody.appendChild(groupHeader);

    groupRows.forEach((row) => {
      tbody.appendChild(row);
    });
  });

  // Add remove group button
  addRemoveGroupButton();
}

// Add styles for group headers
const style = document.createElement("style");
style.textContent = `
  .group-cell {
    background-color: #f3f4f6;
    font-weight: bold;
  }
  
  .group-toggle {
    display: inline-block;
    width: 20px;
    text-align: center;
    transition: transform 0.2s;
  }
  
  .group-cell:hover {
    background-color: #e5e7eb;
  }
  
  .remove-group-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    margin: 0 8px;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-group-button:hover {
    background-color: #e5e7eb;
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
  insertData(fakeData, fakeHeaders);
  createTable();
  addGroupByMenuItem();
});
