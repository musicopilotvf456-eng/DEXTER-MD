// plugins/menu3.js
const { cmd, commands } = require("../command");
const config = require("../config");
const os = require("os");
const moment = require("moment");

cmd(
  {
    pattern: "menu3",
    desc: "Show modern styled menu",
    category: "main",
    filename: __filename,
    react: "📖",
  },
  async (malvin, mek, m, { from, pushname, sender, reply }) => {
    try {
      const uptime = moment.duration(process.uptime() * 1000).humanize();
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
      const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
      const user = pushname || sender.split("@")[0];

      const menuText = `
╭───────────────────────────────╮
│ 🎵 *DEXTER-MD V1 CONTROL PANEL* 🎵
╰───────────────────────────────╯

👾 User    : ${user}
👾 Owner   : ${config.OWNER_NUMBER}
👾 Uptime  : ${uptime}
👾 Memory  : ${usedRam} MB / ${totalRam} GB
👾 Prefix  : ${config.PREFIX}
👾 Version : ${config.VERSION || "1.0.0"}

━━━━━━━━━━━━━━━
💻 *MAIN*
.alive  | .menu  | .system
.owner  | .help  | .repo

💻 *DOWNLOAD*
.song   | .video | .tt
.fb     | .ytmp3 | .ytmp4

💻 *FUN & TOOLS*
.joke   | .roll  | .hug
.kiss   | .whois | .weather

💻 *OWNER*
.restart | .update | .setprefix
.mode    | .addsud  | .ban/unban

━━━━━━━━━━━━━━━
🎵 Powered by DEXTER-MD V1 🎵
━━━━━━━━━━━━━━━
`;

      await malvin.sendMessage(
        from,
        {
          text: menuText,
          contextInfo: {
            externalAdReply: {
              title: "📖 dexter md Command Menu",
              body: "Explore all features of the bot",
              thumbnailUrl: "https://files.catbox.moe/3lv5zs.jpg", // bot image
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("❌ Menu3 error:\n" + e.message);
    }
  }
);
