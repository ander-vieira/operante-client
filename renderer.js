// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var http = require("http");
const restConfig = require("./rest.json");

function cargarDatosUsuario(callback) {
  var request = http.request({
    host: restConfig.domain,
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

var window = require('electron').remote.getCurrentWindow();
const cookie = {url: restConfig.proto+'://'+restConfig.domain, name: 'session', value: 'asdf'}
window.webContents.session.cookies.set(cookie,
  function(error) {
    if (error) console.error(error)
});

window.webContents.session.cookies.get({url: restConfig.proto+'://'+restConfig.domain}, (error, cookies) => {
  $(".nombreCookie").text(cookies[0].name+" "+cookies[0].value);
});

cargarDatosUsuario(function(nombre) {
  $(".nombreUsuario").text(nombre);
});
