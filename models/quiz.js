// Definición del modelo de quiz

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Quiz',
            {
              pregunta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> No ha completado la Pregunta"}}
              },
              respuesta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> No ha completado la Respuesta"}}
              },
              tema: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> No ha completado el Tema"}}
              }
            }
  );
}
