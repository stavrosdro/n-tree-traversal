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

function increaseContrast(node) {
  // set filter css property, void
  if (hasFilter(node)) {
    var newValue = Number(getFilterNumericValue(node) + 10);
    node.style.filter = 'contrast(' + newValue + '%)';
  } else {
    node.style.filter = 'contrast(110%)';
  }
}

function decreaseContrast(node) {
  // set filter css property, void
  if (hasFilter(node)) {
    var newValue = Number(getFilterNumericValue(node) - 10);
    node.style.filter = 'contrast(' + newValue + '%)';
    node.style.filter = 'contrast(' + newValue < 0 ? 0 : newValue + '%)';
  } else {
    node.style.filter = 'contrast(90%)';
  }
}

function removeFilter(node) {
  // set filter css property, void
  node.style.filter = null;
}

function hasFilter(node) {
  // checks if node has filter css property return boolean value
  return node.style.filter ? true : false;
}

function getFilterNumericValue(node) {
  // get the filter numeric value, works for contrast filters return string value
  var filter = node.style.filter;
  if (filter.includes('contrast')) {
    var valueWithoutContrast = filter.replace("contrast(", "").replace("%)", "");
    return Number(valueWithoutContrast);
  }
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

function increaseContrastToNodes(node) {
  if (getColor(node) === "B") {
    increaseContrast(node);
  } else {
    if (hasPositionFixed(node)) {
      increaseContrast(node);
    } else {
      getChildren(node).forEach(child => {
        increaseContrastToNodes(child);
      })
    }
  }
}

function decreaseContrastToNodes(node) {
  if (getColor(node) === "B") {
    decreaseContrast(node);
  } else {
    if (hasPositionFixed(node)) {
      decreaseContrast(node);
    } else {
      getChildren(node).forEach(child => {
        decreaseContrastToNodes(child);
      })
    }
  }
}

function removeFilterFromNodes(node) {
  if (hasFilter(node)) {
    removeFilter(node);
  }
  if (hasChildren(node)) {
    getChildren(node).forEach(child => {
      removeFilterFromNodes(child);
    });
  }
}

// function that applies the filter globally
function increaseContrastFilter() {
  var body = document.getElementsByTagName("body")[0];
  nTree(body);
  increaseContrastToNodes(body);
}

function decreaseContrastFilter() {
  var body = document.getElementsByTagName("body")[0];
  nTree(body);
  decreaseContrastToNodes(body);
}

// function that removes the filter globally
function removeContrastFilter() {
  var body = document.getElementsByTagName("body")[0];
  removeFilterFromNodes(body)
}
