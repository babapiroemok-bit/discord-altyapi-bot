const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sunucu-bilgi")
    .setDescription("Sunucu hakkında bilgi verir."),

  async execute(interaction) {
    await interaction.deferReply();
    const guild = interaction.guild;

    function checkDays(date) {
      const diff = Date.now() - date.getTime();
      const days = Math.floor(diff / 86400000);
      return `${days} gün önce`;
    }

    const owner = await guild.fetchOwner();
    const botCount = guild.members.cache.filter(m => m.user.bot).size;
    const humanCount = guild.memberCount - botCount;

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Sunucu Bilgi", iconURL: guild.iconURL() || undefined })
      .setDescription(
        `**Sunucu İsmi:** ${guild.name}\n` +
        `**Sunucu ID:** ${guild.id}\n` +
        `**Sunucu Sahibi:** ${owner}\n` +
        `**Kuruluş Tarihi:** ${checkDays(guild.createdAt)}\n` +
        `**Boost Sayısı:** ${guild.premiumSubscriptionCount || 0}\n\n` +
        `**Üye Bilgileri:**\n` +
        `Toplam Üye: **${humanCount}**\n` +
        `Toplam Bot: **${botCount}**\n` +
        `Rol Sayısı: **${guild.roles.cache.size}**`
      )
      .setColor("#D2EE07")
      .setThumbnail(guild.iconURL())
      .setFooter({ text: `Kullanan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.editReply({ embeds: [embed] });
  },

  kategori: "Sunucu"
};
