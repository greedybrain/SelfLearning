const http = require('http');
const { env } = require('process');
const fs = require('fs');

const server = http.createServer((req, res) => {
        console.log(req.url, req.method);

        // set header content type 
        res.setHeader('Content-Type', 'text/html')

        // res.write('<p>What up people</p>')
        // res.write('<p>What up animals</p>')

        // send html file 
        let path = './views';
        switch(req.url) {
                case '/':
                        path += '/index.html'
                        res.statusCode = 200
                        break;
                case '/about':
                        path += '/about.html'
                        res.statusCode = 200
                        break;
                case '/about-me':
                        res.statusCode = 301
                        res.setHeader('Location', '/about')
                        res.end()
                        break;
                default:
                        path += '/404.html'
                        res.statusCode = 404
                        break;
        }

        // reading data from file 
        fs.readFile(path, (err, data) => {   
                if (err) console.log(err)
                else res.end(data)
                res.end()
        })
})

const PORT = env.PORT || 3000
server.listen(PORT, 'localhost', () => {
        console.log(`Listening on PORT ${PORT}`)
})