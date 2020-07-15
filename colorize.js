/*
  Author: Stavros Droutsas
  Summary: apply CSS class to all nodes who DON'T have a descendant with "position: fixed"
  Colors: 
    C (Critical),
    W (Not Visited),
    B (Visited and children have not "position fixed"),
    G (W but has a critical sibling, will receive filter if is not critical)
*/

function isLeaf(node) {
  // has neither right nor left child, return boolean value
  return !(hasLeft(node) && hasRight(node));
}

function hasLeft(node) {
  // return boolean value
  return node.left ? true : false;
}

function hasRight(node) {
  // return boolean value
  return node.right ? true : false;
}

function getLeft(node) {
  // get left child, return node value
  return node.left
}

function getRight(node) {
  // get right child, return node value
  return node.right
}

// function getParent(node) {
//   // get parent node, return node value
// }

function hasPositionFixed(node) {
  // checks if has position fixed css property return boolean value
  return node.fixed
}

function applyFilter(node) {
  // set filter css property, void
  node.filter = true;
}

function setColor(node, color) {
  // set node color, void
  node.color = color
}

function getColor(node) {
  // get node color, return string
  return node.color
}

function colorize(node, root) {
  if (hasLeft(node) && getColor(getLeft(node)) === "W") {
    colorize(getLeft(node), root);
  }
  if (hasRight(node) && getColor(getRight(node)) === "W") {
    colorize(getRight(node), root);
  }
  if (hasLeft(node) && hasRight(node)) {
    if (getColor(getLeft(node)) === "B" && getColor(getRight(node)) === "B") {
      if (hasPositionFixed(node)) {
        setColor(node, "C");
        applyFilter(node);
      } else {
        setColor(node, "B")
      }
    } else {
      setColor(node, "C");
    }
  } else if (hasLeft(node)) {
    if (getColor(getLeft(node)) === "B") {
      if (hasPositionFixed(node)) {
        setColor(node, "C");
        applyFilter(node);
      } else {
        setColor(node, "B")
      }
    } else {
      setColor(node, "C");
    }
  } else if (hasRight(node)) {
    if (getColor(getRight(node)) === "B") {
      if (hasPositionFixed(node)) {
        setColor(node, "C");
        applyFilter(node);
      } else {
        setColor(node, "B")
      }
    } else {
      setColor(node, "C");
    }
  } else { // isLeaf
    if (hasPositionFixed(node)) {
      setColor(node, "C");
      applyFilter(node);
    } else {
      setColor(node, "B");
    }
  }
}

function applyFilterToSiblings(node) {
  if (getColor(node) === "B") {
    applyFilter(node)
  } else {
    if (hasRight(node) && hasLeft(node)) {
      if (getColor(getRight(node)) === "B" && getColor(getLeft(node)) === "B") {
        applyFilter(node)
      } else {
        if (hasLeft(node) && getColor(getLeft(node)) === "C") {
          applyFilterToSiblings(getLeft(node));
        }
        if (hasRight(node) && getColor(getRight(node)) === "C") {
          applyFilterToSiblings(getRight(node));
        }
        if (hasLeft(node) && getColor(getLeft(node)) === "B") {
          applyFilter(getLeft(node));
        }
        if (hasRight(node) && getColor(getRight(node)) === "B") {
          applyFilter(getRight(node));
        }
      }
    }
  }
}

function start() {
  root = {
    left: {
      left: {
        left: {
          left: null,
          right: null,
          fixed: true,
          filter: false,
          color: "W"
        },
        right: {
          left: {
            left: null,
            right: null,
            fixed: false,
            filter: false,
            color: "W"
          },
          right: {
            left: null,
            right: null,
            fixed: false,
            filter: false,
            color: "W"
          },
          fixed: false,
          filter: false,
          color: "W"
        },
        fixed: false,
        filter: false,
        color: "W"
      },
      right: {
        left: null,
        right: null,
        fixed: false,
        filter: false,
        color: "W"
      },
      fixed: false,
      filter: false,
      color: "W"
    },
    right: {
      left: {
        left: null,
        right: null,
        fixed: false,
        filter: false,
        color: "W"
      },
      right: {
        left: {
          left: null,
          right: {
            left: null,
            right: null,
            fixed: false,
            filter: false,
            color: "W"
          },
          fixed: false,
          filter: false,
          color: "W"
        },
        right: null,
        fixed: false,
        filter: false,
        color: "W"
      },
      fixed: false,
      filter: false,
      color: "W"
    },
    fixed: false,
    filter: false,
    color: "W"
  }

  console.log(root);
  colorize(root);
  console.log(root);
  applyFilterToSiblings(root)
  console.log(root);
}

start();