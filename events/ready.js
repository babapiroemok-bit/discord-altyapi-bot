const { REST, Routes } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client, _, commands) {
    console.log("_________________________________________");
    console.log(`Kullanıcı İsmi     : ${client.user.username}`);
    console.log(`Sunucular          : ${client.guilds.cache.size}`);
    console.log(`Prefix             : Slash Komutları (/)`);
    console.log(`Durum              : Bot Çevrimiçi!`);
    console.log("_________________________________________");

    client.user.setPresence({ activities: [{ name: "/yardım" }] });

    try {
      const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
      console.log("Slash komutları yükleniyor...");
      await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
      console.log(`${commands.length} slash komutu yüklendi!`);
    } catch (err) {
      console.error("Komut yüklenirken hata:", err);
    }
  }
};
