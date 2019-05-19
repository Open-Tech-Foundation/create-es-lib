module.exports = str => {
  return str.trim() === '' ? [] : str.split(',').map(t => t.trim());
};
