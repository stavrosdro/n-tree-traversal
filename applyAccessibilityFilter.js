function hasChildren(node) {
  // return boolean value
  return node.children ? true : false;
}

function getChildren(node) {
  // get node children return list of nodes value
  return node.children;
}

function hasPositionFixed(node) {
  // checks if has position fixed css property return boolean value
  style = window.getComputedStyle(node);
  return style.getPropertyValue('position') === 'fixed' ? true : false;
}

function applyFilter(node) {
  // set filter css property, void
  node.filter = true;
  node.classList.add("accessibilityFilter");
}

function removeFilter(node) {
  // set filter css property, void
  node.filter = false;
  node.classList.remove("accessibilityFilter");
}

function getFilter(node) {
  // get existence of filter property, return boolean value
  return node.filter;
}

function setColor(node, color) {
  // set node color, void
  node.color = color
}

function getColor(node) {
  // get node color, return string
  return node.color ? node.color : "W";
}

function nTree(node) {
  if (hasChildren(node)) {
    setColor(node, "B");
    getChildren(node).forEach(child => {
      if (getColor(child) === "W") {
        nTree(child);
      }
      if (getColor(child) === "C") {
        setColor(node, "C");
      }
    });
    if (hasPositionFixed(node)) {
      if (getColor(node) === "B") {
        setColor(node, "C");
      }
    }
  } else {
    if (hasPositionFixed(node)) {
      setColor(node, "C");
    } else {
      setColor(node, "B");
    }
  }
}

function applyFilterToNodes(node) {
  if (getColor(node) === "B") {
    applyFilter(node);
  } else {
    if (hasPositionFixed(node)) {
      applyFilter(node)
    } else {
      getChildren(node).forEach(child => {
        applyFilterToNodes(child);
      })
    }
  }
}

$(document).ready(function () {
  var main = document.getElementsByTagName("main")[0];
  nTree(main);
  applyFilterToNodes(main);
})
