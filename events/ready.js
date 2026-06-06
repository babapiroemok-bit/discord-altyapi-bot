const { REST, Routes } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client, _, commands) {
    console.log('_________________________________________');
    console.log(`Kullanıcı İsmi     : ${client.user.username}`);
    console.log(`Sunucular          : ${client.guilds.cache.size}`);
    console.log(`Komut Sayısı       : ${commands.length}`);
    console.log('Durum              : Bot Çevrimiçi!');
    console.log('_________________________________________');

    client.user.setPresence({ activities: [{ name: '/yardım' }] });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
      // Tüm mevcut sunuculara anında kayıt et (instant)
      console.log(`${client.guilds.cache.size} sunucuya komutlar kaydediliyor...`);
      for (const guild of client.guilds.cache.values()) {
        await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: commands });
        console.log(`✓ ${guild.name} sunucusuna kaydedildi`);
      }

      // Global da kayıt et (yeni sunucular için, ~1 saat sürer)
      await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
      console.log('✓ Global komutlar da kaydedildi (yeni sunucular için)');
    } catch (err) {
      console.error('Komut kaydedilirken hata:', err);
    }
  }
};
