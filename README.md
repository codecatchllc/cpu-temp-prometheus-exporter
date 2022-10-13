#CPU TEMP PROMETHEUS EXPORTER

You can utilize this on any machine that is able to execute the `sensors` command with the help of the `lm-sensors` apt package

- `apt install lm-sensors`

#Installation

- Clone this repository onto the target machine
- Install node
- Create a systemd service as root that will run the `main.js` file at system startup `nano /etc/systemd/system/cpu-exporter.service`
- Paste the following contents into the service file, but make sure that the path to `node` and the exporter are valid

```
[Unit]
Description=Exports CPU temps to port 8080 which is then scrapable by prometheus
After=network.target

[Service]
Type=simple
User=root
ExecStart=/path/to/node /path/to/cpu-temp-prometheus-exporter/main.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- Then start the service `systemctl start cpu-exporter.service`
- Check that the service is in active state `systemctl status cpu-exporter.service`
- Now enable the service to run on startup `systemctl enable cpu-exporter.service`
