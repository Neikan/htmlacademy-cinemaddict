/**
 *
 * @param {Array} films
 * @param {string} param
 * @return {Number}
 */
export const filterCountMenu = (films, param) => {
  return films.filter((film) => film[param] === true).length;
};
