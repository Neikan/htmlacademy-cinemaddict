/**
 * Хранинище данных
 */
export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }


  /**
   * Метод, обеспечивающий получение данных из хранилища для всех элементов
   * @return {Object} данные
   */
  getAllData() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey) || {});
    } catch (err) {
      return {};
    }
  }


  /**
   * Метод, обеспечивающий добавление элементов в хранилище
   * @param {Object} dataItems данные
   */
  setAllData(dataItems) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(dataItems)
    );
  }


  /**
   * Метод, обеспечивающий добавления элемента в хранилище
   * @param {Number} key ключ
   * @param {Object} value значение
   */
  setDataItem(key, value) {
    this._setStoreDataItem(this.getAllData(), key, value);
  }


  /**
   * Метод, обеспечивающий установку данных комментариев в соответствующих хранилищах
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} commentsData данные комментария
   * @param {Boolean} isFilmsDataStore флаг, определяющий хранилище данных
   */
  setCommentsData(filmDataId, commentsData, isFilmsDataStore) {
    const store = this.getAllData();
    if (isFilmsDataStore) {
      store[filmDataId].comments = commentsData.map((commentData) => commentData.id);
    } else {
      store[filmDataId] = commentsData;
    }

    this._setStore(store);
  }


  /**
   * Метод, обеспечивающий добавление элемента в хранилище с заданным ключом
   * @param {Object} store данные хранилища
   * @param {Number} key ключ
   * @param {Object} value значение
   */
  _setStoreDataItem(store, key, value) {
    this._storage.setItem(this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }


  /**
   * Метод, обеспечивающий обновление данных хранилища
   * @param {Object} store данные хранилища
   */
  _setStore(store) {
    this._storage.setItem(this._storeKey,
        JSON.stringify(
            Object.assign({}, store)
        )
    );
  }


  /**
   * Метод, обеспечивающий удаление элемента из хранилища
   * @param {Number} key ключ
   */
  removeDataItem(key) {
    const store = this.getAllData();

    delete store[key];

    this._setStore(store);
  }


  /**
   * Метод, обеспечивающий удаление данных комментария
   * @param {Number} filmDataId идентификатор фильма
   * @param {Number} commentDataId идентификатор комментария
   * @param {Boolean} isFilmsDataStore флаг, определяющий хранилище данных
   */
  removeCommentData(filmDataId, commentDataId, isFilmsDataStore) {
    const store = this.getAllData();

    if (isFilmsDataStore) {
      store[filmDataId].comments = store[filmDataId].comments
        .filter((commentId) => commentId !== commentDataId);
    } else {
      this.removeDataItem(commentDataId);
    }

    this._setStore(store);
  }
}
