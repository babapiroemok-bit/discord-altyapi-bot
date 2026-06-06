const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-bilgi")
    .setDescription("Bot hakkında bilgi verir."),

  async execute(interaction, client) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Bot Bilgi", iconURL: client.user.displayAvatarURL() })
      .setColor("#2667FF")
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: "Bot İsmi", value: client.user.username, inline: true },
        { name: "Sunucu Sayısı", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Kullanıcı Sayısı", value: `${client.users.cache.size}`, inline: true },
        { name: "Komut Sayısı", value: `${client.commands.size}`, inline: true },
        { name: "Çalışma Süresi", value: `${hours}s ${minutes}d ${seconds}sn`, inline: true },
        { name: "Ping", value: `${client.ws.ping}ms`, inline: true }
      )
      .setFooter({ text: `Kullanan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    return interaction.reply({ embeds: [embed] });
  },

  kategori: "Genel"
};
