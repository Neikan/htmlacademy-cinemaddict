import AbstractSmartComponent from "./abstract/component-smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
 * Создание разметки для фильтра статистики
 * @param {Object} параметры пункта
 * @return {string} разметка фильтра
 */
const createStatsFilter = ({input, label}) => {
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${input}" value="${input}" checked>
    <label for="statistic-${input}" class="statistic__filters-label">${label}</label>`
  );
};


/**
 * Создание разметки для блока фильтров статистики
 * @return {string} разметка блока
 */
const createStatsFilters = () => STATS_FILTERS.map(createStatsFilter).join(`\n`);


/**
 * Создание разметки блока статистики
 * @param {Object} данные по просмотренным фильмам
 * @return {string} разметка блока
 */
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
  constructor(filmsModel, filmsDataForStats) {
    super();

    this._filmsModel = filmsModel;
    this._filmsDataForStats = filmsDataForStats;
    this._chart = null;
    this._chartData = [];
    this._chartLabels = [];
    this._chartCounts = [];
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createStatistics(this._filmsDataForStats);
  }


  /**
   * Метод, обеспечивающий отрисовку диаграммы
   */
  render() {
    this._setChartData();
    this._renderChart();
  }


  /**
   * Метод, обеспечивающий получение данных для диаграммы
   * @param {string} period период статистики
   */
  _setChartData(period) {
    this._chartData = this._filmsModel.getCountWatchedFilmsByGenre(
        this._filmsModel._getWatchedFilmsDataByTime(period)
    );

    this._chartLabels = this._chartData.map((genre) => genre.name);
    this._chartCounts = this._chartData.map((genre) => genre.count);
  }


  /**
   * Метод, обеспечивающий отрисовку диаграммы
   */
  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartLabels,
        datasets: [{
          data: this._chartCounts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
