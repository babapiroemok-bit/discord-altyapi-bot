const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();
const commands = [];

const komutlarPath = path.join(__dirname, 'komutlar');
const komutFiles = fs.readdirSync(komutlarPath).filter(f => f.endsWith('.js'));

for (const file of komutFiles) {
  const komut = require(path.join(komutlarPath, file));
  client.commands.set(komut.data.name, komut);
  commands.push(komut.data.toJSON());
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const express = require('express');
const app = express();
app.get('/', (req, res) => res.sendStatus(200));
app.listen(process.env.PORT || 3000);

client.login(process.env.TOKEN);
