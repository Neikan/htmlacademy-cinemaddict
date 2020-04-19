/**
 * Создание разметки блока названий фильма
 * @param {Object} {переведенное и оригинальное названия}
 * @return {string} разметка блока
 */
const createTitles = ({translate, original}) => {
  return (
    `<div class="film-details__title-wrap">
      <h3 class="film-details__title">${translate}</h3>
      <p class="film-details__title-original">Original: ${original}</p>
    </div>`
  );
};


export {createTitles};
