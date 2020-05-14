import AbstractSmartComponent from "./abstract/component-smart";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {getHours, getMinutes} from "../utils/common";
import {StatsElement} from "../consts";


const STATS_FILTERS = [
  {
    input: `all-time`,
    label: `All time`,
    value: 0
  }, {
    input: `today`,
    label: `Today`,
    value: 1
  }, {
    input: `week`,
    label: `Week`,
    value: 7
  }, {
    input: `month`,
    label: `Month`,
    value: 30
  }, {
    input: `year`,
    label: `Year`,
    value: 365
  }
];


/**
 * Создание разметки для фильтра статистики
 * @param {string} filter примененный фильтр
 * @param {Object} параметры пункта
 * @return {string} разметка фильтра
 */
const createStatsFilter = (filter, {input, label}) => {
  const signOfCheck = filter === input ? ` checked` : ``;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${input}" value="${input}"${signOfCheck}>
    <label for="statistic-${input}" class="statistic__filters-label">${label}</label>`
  );
};


/**
 * Создание разметки для блока фильтров статистики
 * @param {string} period период
 * @return {string} разметка блока
 */
const createStatsFilters = (period) => STATS_FILTERS.map((filter) =>
  createStatsFilter(period, filter)).join(`\n`);


/**
 * Создание разметки блока статистики
 * @param {Object} данные по просмотренным фильмам
 * @param {string} filter примененный фильтр
 * @return {string} разметка блока
 */
const createStatistics = ({rank, count, duration, topGenre}, filter) => {
  return (
    `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createStatsFilters(filter)}
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
        <canvas class="${StatsElement.CHART}" width="1000"></canvas>
      </div>
    </section>`
  );
};


/**
 * Создание класса для экрана статистики по просмотренным фильмам за период
 */
export default class Statistics extends AbstractSmartComponent {
  constructor(container, filmsModel) {
    super();

    this._container = container;
    this._filmsModel = filmsModel;
    this._filmsWatchedData = [];
    this._filter = `all-time`;
    this._period = 0;
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
    return createStatistics(this._filmsModel.getFilmsDataForStats(this._period), this._filter);
  }


  /**
   * Метод, обеспечивающий отрисовку диаграммы
   */
  render() {
    this._setChartData();
    this._renderChart();
    this.setFilterChangeHandler();
  }


  /**
   * Метод, обеспечивающий перерисовку статистики при смене фильтра
   */
  rerender() {
    this._setChartData();
    super.rerender();
    this._renderChart();
    super.show();
  }


  /**
   * Метод, обеспечивающий добавление слушателей на фильтры статистики
   */
  setFilterChangeHandler() {
    [...this.getElement().querySelectorAll(`.${StatsElement.FILTER}`)]
      .map(this._getFilterChangeHandler());
  }


  /**
   * Метод, обеспечивающий получение значения периода, по которому необходимо получить статистику
   */
  _getPeriod() {
    this._period = STATS_FILTERS[
      STATS_FILTERS.findIndex((filter) => filter.input === this._filter)
    ].value;
  }


  /**
   * Метод, обеспесивающий создание помощника для переключения фильтров статистики
   * @return {Function} созданный помощник
   */
  _getFilterChangeHandler() {
    return (filter) => {
      filter.addEventListener(`change`, (evt) => {
        this._filter = evt.target.value;
        this._getPeriod();
        this.rerender();
      });
    };
  }


  /**
   * Метод, обеспечивающий получение данных для диаграммы
   * @param {string} period период статистики
   */
  _setChartData() {
    this._chartData = this._filmsModel.getCountWatchedFilmsByGenre(
        this._filmsModel.getWatchedFilmsDataByPeriod(this._period)
    );

    this._chartLabels = this._chartData.map((genre) => genre.name);
    this._chartCounts = this._chartData.map((genre) => genre.count);
  }


  /**
   * Метод, обеспечивающий отрисовку диаграммы
   */
  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.${StatsElement.CHART}`);

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


  /**
   * Метод, обеспечивающий восставновление слушателей
   */
  recoveryListeners() {
    this.setFilterChangeHandler();
  }
}
