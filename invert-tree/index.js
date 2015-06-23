'use strict';
  
function invert(tree) {
  if (tree == null) {
    return tree;
  }

  invert(tree.left);
  invert(tree.right);

  var left = tree.left;
  var right = tree.right;

  if (left != null) {
    tree.right = left;
  }

  if (right != null) {
    tree.left = right;
  }
  
  return tree;
}

module.exports = invert;
