export default function copyAttrs(from, to) {
  Array.from(from.attributes).forEach((attr) => {
    if (attr.value) to.setAttribute(attr.name, attr.value);
  });
}
