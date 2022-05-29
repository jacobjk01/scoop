

export function capitalizeFirstLetter(string) {
  if (typeof string === 'string') {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return ''
}