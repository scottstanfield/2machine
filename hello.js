const http = require('http');
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from node & http\n');
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

