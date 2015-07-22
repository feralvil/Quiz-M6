// Cargamos el path
var path = require('path');

// PostgreSQL DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
// SQLITE DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargamos el Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o PostgreSQL:
var sequelize = new Sequelize (DB_name, user, pwd,
                  { dialect: dialect,
                    protocol: protocol,
                    port: port,
                    host: host,
                    storage: storage, // solo SQLite (.env)
                    omitNull: true  // solo PostgreSQL
                  }
                );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar definición de tabla Quiz:
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function(count){
    if (count === 0) { // La tabla se inicializa sólo si está vacía
      Quiz.create({
        pregunta: '¿Cuál es la capital de Italia?',
        respuesta: 'Roma'
      })
      .success(function(){console.log('Base de Datos inicializada');})
    };
  });
});
