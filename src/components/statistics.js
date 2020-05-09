import AbstractSmartComponent from "./abstract/component-smart";
import {getHours, getMinutes} from "../utils/common";


const STATS_FILTERS = [
  {
    input: `all-time`,
    label: `All time`
  },
  {
    input: `today`,
    label: `Today`
  },
  {
    input: `week`,
    label: `Week`
  },
  {
    input: `month`,
    label: `Month`
  },
  {
    input: `year`,
    label: `Year`
  }
];


/**
 *
 * @param {Object} param0
 * @return {string}
 */
const createStatsFilter = ({input, label}) => {
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${input}" value="${input}" checked>
    <label for="statistic-${input}" class="statistic__filters-label">${label}</label>`
  );
};


/**
 *
 * @return {string}
 */
const createStatsFilters = () => STATS_FILTERS.map(createStatsFilter).join(`\n`);


const createStatistics = ({count, duration, topGenre}) => {
  return (
    `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createStatsFilters()}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${count} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getHours(duration)} <span class="statistic__item-description">h</span> ${getMinutes(duration)} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};


/**
 * Создание класса для экрана статистики по просмотренным фильмам за период
 */
export default class Statistics extends AbstractSmartComponent {
  constructor(filmsDataForStats) {
    super();

    this._filmsDataForStats = filmsDataForStats;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createStatistics(this._filmsDataForStats);
  }

}
