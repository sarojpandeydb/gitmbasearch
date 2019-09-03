const http = require("http");
const app = require("./mbasearch");
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is UP on port ${port}`));
