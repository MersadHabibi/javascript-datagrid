function createTable() {
  const table = document.getElementById("resizable-table");
  const headers = table.querySelectorAll("th");
  let draggingCol = null;
  let startX, startWidth;
  let draggedHeader = null;

  // Store column states
  const columnStates = new Map(
    Array.from(headers).map((header, index) => [
      index,
      {
        name: header.querySelector(".header-content span:nth-child(2)").textContent,
        visible: true,
      },
    ])
  );

  // Initialize menu functionality
  function initializeMenus() {
    const menuButtons = table.querySelectorAll(".column-menu-button");

    // Close all menus when clicking outside
    document.addEventListener("click", e => {
      if (!e.target.closest(".column-menu-button")) {
        table.querySelectorAll(".column-menu.show").forEach(menu => {
          menu.classList.remove("show");
        });
      }
    });

    menuButtons.forEach((button, index) => {
      const menu = button.nextElementSibling;
      const header = button.closest("th");

      // Toggle menu
      button.addEventListener("click", e => {
        e.stopPropagation();

        // Close other menus
        table.querySelectorAll(".column-menu.show").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });

        menu.classList.toggle("show");
      });

      // Hide column handler
      const hideButton = menu.querySelector(".hide-column");
      hideButton.addEventListener("click", () => {
        hideColumn(index);
        menu.classList.remove("show");
      });

      // Initialize submenu
      updateSubmenu(menu.querySelector(".submenu"));
    });
  }

  function updateSubmenu(submenu) {
    submenu.innerHTML = "";
    columnStates.forEach((state, index) => {
      const item = document.createElement("div");
      item.className = "checkbox-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.visible;
      checkbox.addEventListener("change", () => toggleColumn(index, checkbox.checked));

      const label = document.createElement("label");
      label.textContent = state.name;

      item.appendChild(checkbox);
      item.appendChild(label);
      submenu.appendChild(item);
    });
  }

  function hideColumn(index) {
    const columnState = columnStates.get(index);
    if (columnState) {
      columnState.visible = false;
      updateColumnVisibility();
      updateAllSubmenus();
    }
  }

  function toggleColumn(index, visible) {
    const columnState = columnStates.get(index);
    if (columnState) {
      columnState.visible = visible;
      updateColumnVisibility();
    }
  }

  function updateColumnVisibility() {
    // Update header visibility
    headers.forEach((header, index) => {
      const state = columnStates.get(index);
      if (state) {
        header.classList.toggle("hidden-column", !state.visible);
      }
    });

    // Update cell visibility
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
      Array.from(row.cells).forEach((cell, index) => {
        const state = columnStates.get(index);
        if (state) {
          cell.classList.toggle("hidden-column", !state.visible);
        }
      });
    });
  }

  function updateAllSubmenus() {
    table.querySelectorAll(".submenu").forEach(submenu => {
      updateSubmenu(submenu);
    });
  }

  // Previous functionality (sorting, resizing, moving) remains the same
  // ... (Keep all the previous code for sorting, resizing, and moving columns)

  // Initialize the table
  initializeMenus();

  // Modify stopMove function to update menus after column movement
  const originalStopMove = stopMove;
  function newStopMove() {
    originalStopMove();
    updateAllSubmenus();
  }
  stopMove = newStopMove;
}

document.addEventListener("DOMContentLoaded", function () {
  createTable();
});
