// Main = "dragstart", "dragend", "dragover, [...spreadSyntax], "clientY", "offset", "insertBefore";

const sortableList = document.querySelector(".sortable-list");
const items = document.querySelectorAll(".item");

items.forEach(item => {
  // For desktop drag events
  item.addEventListener("dragstart", () => {
    setTimeout(() => item.classList.add("dragging"), 0);
  });

  item.addEventListener("dragend", () => item.classList.remove("dragging"));

  // For mobile touch events
  item.addEventListener("touchstart", (e) => {
    // Prevent scrolling while dragging on mobile
    e.preventDefault();
    item.classList.add("dragging");
  });

  item.addEventListener("touchend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = sortableList.querySelector(".dragging");

  // Item ထဲက dragging မပါတဲ့ class တွေကို spreadSyntax သုံး array ပုံစံပြောင်းပြီး siblings ထဲကိုထည့်
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  // Calculate the touch position for mobile
  const touchY = e.type.includes('touch') ? e.changedTouches[0].clientY : e.clientY;

  let nextSibling = siblings.find(sibling => {
    return touchY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  sortableList.insertBefore(draggingItem, nextSibling);
};

// For desktop
sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());

// For mobile
sortableList.addEventListener("touchmove", initSortableList);
sortableList.addEventListener("touchenter", e => e.preventDefault());








