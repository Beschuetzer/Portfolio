export function capitalize(str) {
  return str.split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
}

export function checkForParentOfType(clickedElement, parentType, classPresent='') {
  try {
      if (clickedElement.parentNode.localName === parentType && clickedElement.parentNode.className.search(classPresent) !== -1) return true;
      if (clickedElement.parentNode.localName.search(/html/i) !== -1) return false;
      const parent = clickedElement.parentNode;
      return checkForParentOfType(parent, parentType, classPresent);
  }
  catch (error) {
      return false;
  }
}