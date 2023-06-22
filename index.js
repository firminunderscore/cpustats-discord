const cpuStat = require("cpu-stat"),
  os = require("os"),
  discordRPC = require("discord-rpc");

const clientId = "1046467420832923659",
  scopes = ['rpc', 'rpc.api', 'messages.read'];

const rpc = new discordRPC.Client({ transport: "ipc" });

console.clear();
console.log("Connecting to Discord...");

rpc.on("ready", () => {
  console.clear();
  console.log("RPC is ready!\nConnected to Discord as " + rpc.user.username + " (ID: " + rpc.user.id + ")");
  const cpuPresence = () => {
    cpuStat.usagePercent(function (err, percent, seconds) {
      let cpuimg,
        ramimg,
        ramusage = 100 - Math.round((os.freemem() / os.totalmem()) * 100);

      if (percent > 80) {
        cpuimg = "https://i.imgur.com/AQNExvh.png";
      } else if (percent > 60) {
        cpuimg = "https://i.imgur.com/tDOldjb.png";
      }
      else if (percent > 50) {
        cpuimg = "https://i.imgur.com/LBCWmf1.png";
      }
      else if (percent > 20) {
        cpuimg = "https://i.imgur.com/fJAZXyz.png";
      } else {
        cpuimg = "https://i.imgur.com/RQYx4h9.png";
      }

      if (ramusage > 80) {
        ramimg = "https://i.imgur.com/NbYaLuO.png";
      } else if (ramusage > 60) {
        ramimg = "https://i.imgur.com/6SSS9iL.png";
      } else if (ramusage > 50) {
        ramimg = "https://i.imgur.com/LsvyH7P.png";
      } else if (ramusage > 20) {
        ramimg = "https://i.imgur.com/tcHIC94.png";
      } else {
        ramimg = "https://i.imgur.com/1WhBLIi.png";
      }

      rpc.setActivity({
        state:
          Math.round((os.totalmem() - os.freemem()) / 1024 / 1024 / 100) / 10 +
          "GB" +
          "/" +
          Math.round(os.totalmem() / 1024 / 1024 / 100) / 10 +
          "GB" +
          " (" +
          ramusage +
          "%)",
        details: `${percent.toFixed(2)}%`,
        largeImageKey: cpuimg,
        largeImageText: os.cpus()[0].model + " (" + os.cpus().length + " Cores)",
        smallImageKey: ramimg,
        smallImageText: "Running " + os.type() + " " + os.arch(),
        instance: true,
        buttons: [{ label: 'Github', url: 'https://github.com/firminsurgithub/cpustats-discord' }]
      });
    });
  }
  cpuPresence();
  setInterval(() => {
    cpuPresence();
  }, 1250);
});

rpc.on("disconnected", () => {
  console.clear();
  console.log("Disconnected from Discord!");
  process.exit(0);
});

rpc.login({ clientId: clientId }).catch(console.error);