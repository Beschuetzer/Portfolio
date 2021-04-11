export function capitalize(str) {
  return str.split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
}

export function checkForParentOfType(element, parentType, classPresent='') {
  try {
      if (element.parentNode.localName === parentType && element.parentNode.className.search(classPresent) !== -1) return true;
      if (element.parentNode.localName.search(/html/i) !== -1) return false;
      const parent = element.parentNode;
      return checkForParentOfType(parent, parentType, classPresent);
  }
  catch (error) {
      return false;
  }
}