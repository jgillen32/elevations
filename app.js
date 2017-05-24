let Hapi = require('hapi');
let Vision = require('vision');
let Inert = require('inert');
let Handlebars = require('handlebars');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 1337
});

server.register([{
        register: Vision
    }, {
        register: Inert
    }],
    function (err) {
        if (err) {
            throw err;
        }

        server.views({
            engines: {
                html: Handlebars
            },
            path: __dirname + '/views',
            layout: 'layout'
        });
        server.route({
            method: 'GET',
            path: '/',
            handler: function(request, reply) {
                var data = {
                    title: 'This is Index!',
                    message: 'Hello, World. You crazy handlebars layout'
                };
                return reply.view('index', data);
            }
        });
});

// Start the server
server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});