export default function copyStyles(from, to) {
  if (from.style.cssText) to.style.cssText = from.style.cssText;
}
