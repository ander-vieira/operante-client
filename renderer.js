// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var http = require("http");

function cargarDatosUsuario(callback) {
  var request = http.request({
    host: "operante.herokuapp.com",
    port: 80,
    path: "/rest/datosUsuario",
    method: "GET"
  }, function(response) {
    response.on('data', function(chunk) {
      var data = JSON.parse(chunk.toString("utf8"));
      callback(data.nombre);
    })
  }).on("error", function() {
      callback("ERROR");
  });

  request.end();
}

cargarDatosUsuario(function(nombre) {
  $(".nombreUsuario").text(nombre);
});
