const { cmd } = require("../command");

// SUHO MD V2 vCard (premium clean)
const fakevCard = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
  },
  message: {
    contactMessage: {
      displayName: "© DEXTER MD V1",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:DEXTER MD V1
ORG:Lord Mikael Network;
TEL;type=CELL;type=VOICE;waid=13135550002:+13135550002
END:VCARD`,
    },
  },
};

cmd(
  {
    pattern: "ping",
    desc: "Check bot latency",
    react: "🖥️",
    category: "utility",
    filename: __filename,
  },
  async (malvin, mek, m) => {
    const start = Date.now();

    // Initial loading response
    await malvin.sendMessage(
      mek.key.remoteJid,
      { text: "⏳ Running diagnostics..." },
      { quoted: fakevCard }
    );

    const ping = Date.now() - start;

    // Professional Discord-style embed
    const msg = `
╔━━━━━━━━━━━━━━━━━━━━━━━━━━━━╗
        ᴅᴇxᴛᴇʀ-ᴍᴅ ᴠ1 — ᴘɪɴɢ sʏsᴛᴇᴍᴇ
╚━━━━━━━━━━━━━━━━━━━━━━━━━━━━╝

👾 **Latency:** ${ping} ms
👾 **Status:** Operational
👾 **Performance:** Stable

──────────────────────────────
DEXTER MD V1 is running smoothly.
Powered by **Lord Mikael Network**
──────────────────────────────
`;

    await malvin.sendMessage(
      mek.key.remoteJid,
      { text: msg },
      { quoted: fakevCard }
    );
  }
);