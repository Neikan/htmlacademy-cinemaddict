/**
 * Создание разметки постера и возрастного ограничения
 * @param {Object} {постер и ограничение}
 * @return {string} разметка блока
 */
const createPromo = ({poster, age}) => {
  return (
    `<div class="film-details__poster">
      <img class="film-details__poster-img" src="${poster}" alt="">
      <p class="film-details__age">${age}</p>
    </div>`
  );
};


export {createPromo};
