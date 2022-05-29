

export function capitalizeFirstLetter(string) {
  if (!string) throw new Error('calling capitalizeFirstLetter: ' + string + ' is not a string')
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}