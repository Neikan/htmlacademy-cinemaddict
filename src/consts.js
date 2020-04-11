export const RAITING_MAX = 10;
export const COUNT_COMMENTS_MAX = 5;

export const KeyCode = {
  ENTER: 13,
  ESC: 27
};

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


export const CountFilm = {
  ALL: 20,
  START: 5,
  BY_BUTTON: 5,
  EXTRA: 2,
};

export const CountDescription = {
  MIM: 1,
  MAX: 5
};

export const CountDuration = {
  HOURS_MAX: 3,
  MINUTES_MIN: 59,
};

export const CountCheckFormat = {
  TIME: 10,
  NUMBER: 1000,
};

export const Position = {
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};


export const Filter = {
  IS_WATCH: `isWatch`,
  IS_WATCHED: `isWatched`,
  IS_FAVORITE: `isFavorite`
};

export const Sorting = {
  ByRating: {
    type: `forNumber`,
    parameter: `rating`
  },
  ByComments: {
    type: `forArray`,
    parameter: `comments`
  }
};

export const COUNTRIES = [
  `France`,
  `Germany`,
  `India`,
  `Italy`,
  `Japan`,
  `Russia`,
  `Spain`,
  `UK`,
  `USA`
];


export const AGE_RATINGS = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`,
];


export const TITLES = [
  {
    translate: `Бэтмен`,
    original: `Batman`
  },
  {
    translate: `Бэтмен возвращается`,
    original: `Batman Returns`
  },
  {
    translate: `Бэтмен навсегда`,
    original: `Batman Forever`
  },
  {
    translate: `Бэтмен и Робин`,
    original: `Batman & Robin`
  },
  {
    translate: `Бэтмен: Начало`,
    original: `Batman Begins`
  },
  {
    translate: `Темный рыцарь`,
    original: `The Dark Knight`
  },
  {
    translate: `Темный рыцарь: Возрождение легенды`,
    original: `The Dark Knight Rises`
  },
  {
    translate: `Бэтмен-ниндзя`,
    original: `Batman Ninja`
  },
  {
    translate: `Бэтмен против Супермена: На заре справедливости`,
    original: `Batman v Superman: Dawn of Justice`
  },
  {
    translate: `Отряд самоубийц`,
    original: `Suicide Squad`
  },
  {
    translate: `Лига справедливости`,
    original: ``
  },
  {
    translate: `Джокер`,
    original: `Joker`
  },
  {
    translate: `Безграничный Бэтмен`,
    original: `Batman Unlimited`
  },
  {
    translate: `Лего Фильм: Бэтмен`,
    original: `The Lego Batman Movie`
  },
  {
    translate: `Готэм`,
    original: `Gotham`
  }
];

export const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

export const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const GENRES = [
  `Aниме`,
  `Биография`,
  `Боевик`,
  `Вестерн`,
  `Военный`,
  `Детектив`,
  `Детский`,
  `Документальный`,
  `Драма`,
  `Исторический`,
  `Кинокомикс`,
  `Комедия`,
  `Концерт`,
  `Короткометражный`,
  `Криминал`,
  `Мелодрама`,
  `Мистика`,
  `Мультфильм`,
  `Мюзикл`,
  `Научный`,
  `Нуар`,
  `Приключения`,
  `Семейный`,
  `Сериал`,
  `Спорт`,
  `Триллер`,
  `Ужасы`,
  `Фантастика`,
  `Фэнтези`,
  `Эротика`
];

export const DIRECTORS = [
  `Тим Бертон`,
  `Джоэл Шумахер`,
  `Кристофер Нолан`,
  `Джей Олива`,
  `Крис МакКей`,
  `Зак Снайдер`,
  `Дзюнпэй Мидзусаки`
];

export const SCREEN_WRITERS = [
  `Акива Голдсман`,
  `Боб Кейн`,
  `Кристофер Нолан`,
  `Джонатан Нолан`,
  `Дэвид С. Гойер`,
  `Боб Кейн`,
  `Сет Грэм-Смит`,
  `Крис МакКенна`,
  `Скотт Снайдер`,
  `Сэм Хэмм`,
];

export const ACTORS = [
  `Майкл Китон`,
  `Джек Николсон`,
  `Ким Бейсингер`,
  `Роберт Вул`,
  `Кристиан Бэйл`,
  `Том Харди`,
  `Энн Хэтэуэй`,
  `Джозеф Гордон-Левитт`,
  `Марион Котийяр`,
  `Арнольд Шварценеггер`,
  `Джордж Клуни`,
  `Крис О’Доннелл`,
  `Ума Турман`,
  `Коити Ямадэра`,
  `Ватару Такаги`,
  `Риэ Кугимия`,
  `Аи Какума`,
  `Хотю Оцука`,
  `Такэхито Коясу`,
  `Кэнта Миякэ`
];

export const ProfileRank = {
  NOVICE: {
    RANK: `Novice`,
    FROM: 1,
  },
  FUN: {
    RANK: `Fan`,
    FROM: 11
  },
  MOVIE_BUFF: {
    RANK: `Movie Buff`,
    FROM: 21
  }
};


export const COMMENT_AUTHORS = [
  `Neikan`,
  `Mictlantechuhtli`,
  `Эрнанда`,
  `Sorpi`,
  `БегущаяПоГраблям`,
  `Ксардасс`,
  `Azatot`
];

export const COMMENT_TEXTS = [
  `Начну с главного — это великолепно! Настолько, что я даже решился написать отзыв, как умею.`,
  `Возникает вопрос: а на кого рассчитан этот фильм? Его нельзя показывать из-за наличия жестокости. Откровенно глупо и безсмысленно: эротики нет, романтических нет, глубокий смысл, экшен и драматизм отсутствуют!`,
  `Когда я увидел анонс картины, я очень заинтересовался и решил обязательно посмотреть! Это круто! 100 из 10!`,
  `По большому счету фильм — освежающий взгляд на известного героя. К сожалению, взгляд хотя и свежий, но всё же пустой. Как и многие другие этот фильм — необходимое отклонение от канона, но зрелище вышло больно странным и эксцентричным из-за самого подхода к созданию.`,
  `Честно сказать сначала мне было интересно. Но потом... Жаль потраченного времени`,
  `Это безусловно один из самых необычных и неожиданных продуктов вселенной DC. Очень смелый, неожиданный и оригинальный эксперимент, который придал глоток свежего воздуха во вселенную Бэтмена. Во многом, весьма необычным сеттингом и потрясающей режессурой, ради которой и стоит посмотреть данный фильм и нисколько не пожалеть о потраченном времени.`,
  `Увидев трейлер в сети этой картины, сразу занес в список ожиданий, так был удивлен! И вот недавно вышел в сеть это фильм, но впечатления от просмотра получил двоякие слишком(`
];

export const COMMENT_EMOJIES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];
