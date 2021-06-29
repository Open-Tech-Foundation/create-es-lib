module.exports = str => {
  if (!str) {
    return [];
  }
  return str.trim() === '' ? [] : str.split(',').map(t => t.trim());
};
