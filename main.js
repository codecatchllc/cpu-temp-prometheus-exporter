const http = require('http');
const { exec } = require('child_process');
const requestListener = function (req, res) {
    res.writeHead(200);

exec('sensors|grep "high"|grep "Core"|cut -d "+" -f2|cut -d "." -f1|sort -nr|sed -n 1p', (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }

    res.end(`server_cpu_temp ${stdout}`);
    });
}

const server = http.createServer(requestListener);
server.listen(8080);