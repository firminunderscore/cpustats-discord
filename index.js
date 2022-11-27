const client = require("discord-rich-presence")("1046467420832923659"),
  cpuStat = require("cpu-stat"),
  os = require("os");

setInterval(() => {
  cpuStat.usagePercent(function (err, percent, seconds) {
    let cpuimg,
      ramimg,
      ramusage = 100 - Math.round((os.freemem() / os.totalmem()) * 100);

    if (percent > 66) {
      cpuimg = "https://i.imgur.com/vEpvgAy.png";
    } else if (percent > 33) {
      cpuimg = "https://i.imgur.com/JsUoFdI.png";
    } else {
      cpuimg = "https://i.imgur.com/S1wXxkB.png";
    }

    if (ramusage > 66) {
      ramimg = "https://i.imgur.com/qF1saQt.png";
    } else if (ramusage > 33) {
      ramimg = "https://i.imgur.com/EMHH5ek.png";
    } else {
      ramimg = "https://i.imgur.com/3qpPFhr.png";
    }

    client.updatePresence({
      state:
        Math.round((os.totalmem() - os.freemem()) / 1024 / 1024 / 100) / 10 +
        "GB" +
        "/" +
        Math.round(os.totalmem() / 1024 / 1024 / 100) / 10 +
        "GB" +
        " (" +
        (100 - Math.round((os.freemem() / os.totalmem()) * 100)) +
        "%)",
      details: `${percent.toFixed(2)}%`,
      largeImageKey: cpuimg,
      smallImageText: "By Firmin_",
      smallImageKey: ramimg,
      instance: true,
    });
  });
}, 1000);
