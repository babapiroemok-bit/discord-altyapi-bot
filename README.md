# Discord Bot Altyapı v14 — Slash Komutları

Discord.js v14 tabanlı, slash komutları destekli Türkçe Discord bot altyapısı.

## Kurulum

1. `.env.example` dosyasını `.env` olarak kopyala
2. `TOKEN` değerine Discord bot tokenini gir
3. `npm install` ile bağımlılıkları yükle
4. `npm start` ile botu başlat

## Railway Kurulumu

1. Railway'de "New Project" → "Deploy from GitHub repo" seç
2. Bu repoyu bağla
3. Environment Variables kısmına `TOKEN=BOT_TOKENIN` ekle
4. Deploy!

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `/yardım` | Tüm komutları listeler |
| `/yardım kategori:Genel` | Genel komutları gösterir |
| `/yardım kategori:Sunucu` | Sunucu komutlarını gösterir |
| `/sunucu-bilgi` | Sunucu bilgilerini gösterir |
| `/bot-bilgi` | Bot bilgilerini gösterir |

## Yeni Komut Eklemek

`komutlar/` klasörüne yeni bir `.js` dosyası ekle:

```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("komut-adi")
    .setDescription("Komut açıklaması"),

  async execute(interaction, client) {
    await interaction.reply("Merhaba!");
  },

  kategori: "Genel"
};
```
