const http = require("http");
const { exec } = require("child_process");

const requestListener = function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });

  exec(
    "sensors | awk '/k10temp-pci-00c3/ {found=1} found && /Tctl/ {print substr($2, 2, length($2)-6); exit}'",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      res.end(`server_cpu_temp ${stdout.trim()}`);
    }
  );
};

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
