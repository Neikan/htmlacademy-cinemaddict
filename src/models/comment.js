export default class CommentData {
  constructor(commentData) {
    this.id = commentData[`id`];
    this.text = commentData[`comment`];
    this.emoji = commentData[`emotion`];
    this.author = commentData[`author`];
    this.date = new Date(commentData[`date`]);
  }


  /**
   * Метод, обеспечивающий преобразование локальных данных в соответствующие серверу
   * @return {Object} преобразованные данные
   */
  toRAW() {
    return {
      'comment': this.text,
      'date': this.date,
      'emotion': this.emoji,
    };
  }


  /**
   * Метод, обеспечивающий вызов метода для преобразования сервернех данных комментариев в локальную структуру
   * @param {Array} commentsData данные комментариев
   * @return {Array} массив преобразованных данных
   */
  static parseComments(commentsData) {
    return commentsData.map(CommentData.parseComment);
  }


  /**
   * Метод, обеспечивающий преобразование серверных данных комментария в локальную структуру
   * @param {Object} commentData данные комментария
   * @return {Object}
   */
  static parseComment(commentData) {
    return new CommentData(commentData);
  }
}
