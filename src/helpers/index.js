export function capitalize(str) {
  return str.split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
}

export function checkForParentOfType(element, parentType, classPresent='') {
  try {
      if (element.parentNode.localName === parentType && element.parentNode.className.match(classPresent)) return true;
      if (element.parentNode.localName.match(/html/i)) return false;
      const parent = element.parentNode;
      return checkForParentOfType(parent, parentType, classPresent);
  }
  catch (error) {
      return false;
  }
}