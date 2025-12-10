// plugins/menu1.js
const { cmd, commands } = require("../command");
const config = require("../config");
const os = require("os");
const moment = require("moment");

// Fake vCard for contact
const fakevCard = {
  key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
  message: {
    contactMessage: {
      displayName: "© DEXTER MD V1",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:DEXTER MD V1
ORG:AI Systems;
TEL;type=CELL;type=VOICE;waid=13135550002:+13135550002
END:VCARD`,
    },
  },
};

cmd(
  {
    pattern: "menu1",
    alias: ["allmenu"],
    react: "📚",
    desc: "Show all commands in a Discord-style UI layout",
    category: "main",
    filename: __filename,
  },
  async (malvin, mek, m, { from, pushname, sender, reply }) => {
    try {
      const uptime = moment.duration(process.uptime() * 1000).humanize();
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB";
      const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB";
      const owner = config.OWNER_NUMBER || "Unknown";
      const user = pushname || sender.split("@")[0];

      // Group commands by category
      const categorized = {};
      commands.forEach((cmdItem) => {
        if (!cmdItem.pattern || cmdItem.dontAddCommandList) return;
        const cat = cmdItem.category || "other";
        if (!categorized[cat]) categorized[cat] = [];
        categorized[cat].push(cmdItem.pattern);
      });

      // Start Menu
      let menuText = `
╭───────────────────────────────────────────╮
│ **DEXTER MD V1 — Command Panel** 
│ _Your personal multi-tool assistant_
╰───────────────────────────────────────────╯

> 👾 **User:** \`${user}\`
> 👾 **Owner:** \`${owner}\`
> 👾 **Uptime:** \`${uptime}\`
> 👾 **Memory:** \`${usedRam} / ${totalRam}\`
> 👾 **Prefix:** \`${config.PREFIX}\`

──────────────────────────────────────────────
`;

      // Emojis per category
      const categoryEmojis = {
        main: "⚙️",
        download: "📥",
        group: "👥",
        owner: "👑",
        convert: "🎨",
        fun: "🎉",
        reaction: "💫",
        anime: "🌸",
        search: "🔍",
        utility: "🛠️",
        economy: "💰",
        nsfw: "🔞",
        ai: "🤖",
        other: "🧩",
      };

      // Add category sections
      for (const [cat, cmds] of Object.entries(categorized)) {
        const emoji = categoryEmojis[cat] || "✦";
        const title = cat.charAt(0).toUpperCase() + cat.slice(1);

        menuText += `
### ${emoji} **${title} Commands**
\`\`\`
${cmds.map((c) => `${config.PREFIX}${c}`).join("\n")}
\`\`\`
`;
      }

      menuText += `
──────────────────────────────────────────────
> 👾 **Powered by DEXTER MD V1**  
> The rap is a dynamic divertissement
`;

      // Send image + caption
      await malvin.sendMessage(
        from,
        {
          image: { url: "https://files.catbox.moe/3lv5zs.jpg" },
          caption: menuText,
        },
        { quoted: mek }
      );

      // Send fake vCard contact
      await malvin.sendMessage(from, fakevCard, { quoted: mek });
    } catch (e) {
      console.error(e);
      reply("❌ Menu1 error:\n" + e.message);
    }
  }
);