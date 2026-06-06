const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Komutlar hakkında bilgi verir.")
    .addStringOption(opt =>
      opt.setName("kategori")
        .setDescription("Kategori seç")
        .addChoices(
          { name: "Genel", value: "Genel" },
          { name: "Sunucu", value: "Sunucu" },
          { name: "Sahip", value: "Sahip" }
        )
    ),

  async execute(interaction, client) {
    const kategori = interaction.options.getString("kategori");

    if (kategori) {
      const filteredCmds = client.commands.filter(cmd => cmd.kategori === kategori);
      const embed = new EmbedBuilder()
        .setAuthor({ name: kategori, iconURL: interaction.user.displayAvatarURL() })
        .setColor("#2667FF")
        .setDescription(
          filteredCmds.size > 0
            ? filteredCmds.map(cmd => `:white_small_square: **/${cmd.data.name}** — ${cmd.data.description}`).join("\n")
            : "Bu kategoride komut yok."
        )
        .setFooter({ text: `Kullanan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
      return interaction.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Yardım", iconURL: interaction.user.displayAvatarURL() })
      .setColor("#FFFB05")
      .setDescription("**Kullanım:** `/yardım kategori:<Kategori>`")
      .addFields(
        { name: "Kategoriler", value: "Tüm kategoriler" },
        { name: "/yardım Genel", value: "Genel komutlar", inline: false },
        { name: "/yardım Sunucu", value: "Sunucu komutları", inline: false },
        { name: "/yardım Sahip", value: "Sahip komutları", inline: false }
      )
      .setFooter({ text: `Kullanan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    return interaction.reply({ embeds: [embed] });
  },

  kategori: "Genel"
};
