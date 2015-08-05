// Definición del modelo de Comentario

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    {
      texto: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "-> No ha completado el Comentario"}}
      }
    }
  );
}
