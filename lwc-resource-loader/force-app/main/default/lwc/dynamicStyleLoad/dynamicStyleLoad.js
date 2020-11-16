import { loadStyle } from "lightning/platformResourceLoader";

export function loadDynamicStyle(element, rules) {
  const css = prepareCSS(rules);
  const blob = new Blob([css]);
  const url = URL.createObjectURL(blob);
  window.lwcDynamicStyles = {};
  return loadStyle(element, url).then(() => {
    if (!element.__loadedDynamicStyles) {
      element.__loadedDynamicStyles = [];
    }
    element.__loadedDynamicStyles.push(url);
  });
}

export function unloadDynamicStyle(element) {
  for (const url of element.__loadedDynamicStyles) {
    const selector = `link[href="${url}"`;
    document.querySelector(selector).remove();
  }
  element.__loadedDynamicStyles = [];
}

function prepareCSS(rules) {
  let css = "";
  for (const rule of rules) {
    css += `${rule.shift()} {\n`;
    for (const style of rule.shift()) {
      css += `\t${style}\n`;
    }
    css += "}\n\n";
  }
  return css;
}
