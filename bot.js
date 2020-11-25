const botsettings = require("./botsetting.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix;
const bot = new Discord.Client({ disableEveryone: true });
const ownerID = botsettings.ownerID;
bot.on("ready", () => {});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.author.bot) return; // Dont answer yourself.
  var args = message.content.split(/[ ]+/);
  var content = message.content.toLowerCase();
  const command = args.shift().toLowerCase();

  function isCommand(command, message) {
    var command = command.toLowerCase();
    return content.startsWith(prefix + command);
  }

  let messageArray = message.content.split(" ");

  if (!command.startsWith(prefix)) return;

  if (command == prefix + "serverinvite") {
    message.reply(
      "The server invite is, https://discord.gg/xnthEXsAqH. Happy to help. :smiley: "
    );
  }
  if (isCommand("reload")) {
    var shard = args.join(" ");
    if (!message.member.roles.some(r => ["Developers"].includes(r.name)))
      return message.reply("You are not the owner of the bot.");
    if (shard.length < 1) return message.reply("You must supply a shard!");
    bot.shard.broadcastEval(`if (this.shard.id === ${shard}) process.exit();`);
    message.reply(`You have reloaded shard ${shard}.`);
  }

  if (isCommand("username")) {
    var username = args.join(" ");
    if (username.lenght < 1)
      return message.reply(`Your username is ${message.author.username}`);
    message.channel.reply(`The user's username is ${username}`);
  }

  if (isCommand("purge")) {
        var messages = args.join(" ");
    if (!message.member.roles.some(r => ["Staff"].includes(r.name)))
      return message.reply("Please wait to become a high enough rank. Thanks.");
    var amount = parseInt(args[0]);
    
     if (!member) {
    
    if (messages.length < 1) return message.reply("You must supply a number!");
    if (isNaN(amount)) {
      return message.reply("that doesn't seem to be a valid number.");
    }
    message.channel.bulkDelete(`${messages}`);
    message.channel.send(`Deleted ${messages}`);
  }
  }

  if (isCommand("quickreload")) {
    var shard = args.join(" ");
    if (!message.member.roles.some(r => ["Developers"].includes(r.name)))
      return message.reply("You are not the owner of the bot.");
    bot.shard.broadcastEval(`process.exit();`);
    message.reply(`You have reloaded all the shards.`);
  }

  if (command == prefix + "serverinfo") {
    let embed = new Discord.RichEmbed()
      .setTitle("Server info")
      .addField("Server name", message.guild.name)
      .addField("Server id", message.guild.id)
      .setFooter("Cloud Service")
      .setColor("#00FFF7")
      .addField("mebercount", message.guild.members.size)
      .addField("created at", message.guild.createdAt);
    message.channel.send(embed);
  }

  //command start
  if (command === `${prefix}warn`) {
    //checks for mentioned user.
    let dUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!");
    if (!message.member.roles.some(r => ["Staff"].includes(r.name)))
      return message.reply("Please wait to become a high enough rank. Thanks.");
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if (dMessage.length < 1) return message.reply("You must supply a message!");
    //sends DM to mentioned user.
    dUser.send(
      `${dUser} A moderator from Crisp warned you because: ${dMessage}`
    );
    //sends DM to user who ran the command.
    message.author.send(
      `${message.author} You have successfully warned ${dUser}`
    );
    //command finish
  }

  if (command === `${prefix}ping`) {
    const m = await message.channel.send("Pong");
    return message.reply(
      `The latency is ${m.createdTimestamp - message.createdTimestamp}ms.`
    );
  }

  if (command === `${prefix}help`) {
    //checks for mentioned user.

    let embed = new Discord.RichEmbed()
      .setTitle("Commands")
      .addField("!help", "Shows the help menu.")
      .addField("!ping", "check to see if the bot is responsive.")
      .addField("!userinfo", "Shows userinfo.")
      .setColor("#FFAA00")
      .setFooter("Cloud Service")
      .addField("!mute", "W.I.P. /Work in progress.")
      .addField("!unmute", "W.I.P. /Work in progress.")
      .addField("!dm", "Used to DM users. HRs ONLY!")
      .addField("!warn", "Used to warn people. MRs+ ONLY!")
      .addField("!serverinfo", "shows the server info.")
      .addField("!kick", "Kick the person who you pingged.")
      .addField("!ban", "Ban the person who you pingged.");
    message.author.send(embed);
    message.reply("A list of commands has been sent to you.");

    //command finish
  }
  if (command === `${prefix}ban`) {
    if (!message.member.roles.some(r => ["Staff"].includes(r.name)))
      return message.reply("Please wait to become a high enough rank. Thanks.");
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();

    // Check if a member was actually tagged
    if (!member) {
      return message.reply("Please tag a user!");
      return;
    }

    // Kick
    member
      .ban()
      .then(member => {
        // Successmessage
        return message.reply(
          "You have banned " +
            member.displayName +
            ", keep a :zipper_mouth: and tell no one."
        );
      })
      .catch(() => {
        // Failmessage
        return message.reply("Access Denied");
      });
  }

  if (command === `${prefix}kick`) {
    if (!message.member.roles.some(r => ["Staff"].includes(r.name)))
      return message.reply("Please wait to become a high enough rank. Thanks.");
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();

    // Check if a member was actually tagged
    if (!member) {
      return message.reply("Please tag a user!");
      return;
    }

    // Kick
    member
      .kick()
      .then(member => {
        // Successmessage
        return message.reply(
          "You have kicked " +
            member.displayName +
            ", keep a :zipper_mouth: and tell no one."
        );
      })
      .catch(() => {
        // Failmessage
        return message.reply("Access Denied");
      });
  }

  //command start
  if (command === `${prefix}dm`) {
    //checks for mentioned user.
    let dUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!");
    //If user is in the server, looks if user has the role. If not, cancell the command.
    if (!message.member.roles.some(r => ["Staff"].includes(r.name)))
      return message.reply("Please wait to become a high enough rank. Thanks.");
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if (dMessage.length < 1) return message.reply("You must supply a message!");
    //sends DM to mentioned user.
    dUser.send(`${dUser} A moderator from Cloud Service sent you: ${dMessage}`);
    //sends DM to user who ran the command.
    message.author.send(
      `${message.author} You have sent your message to ${dUser}`
    );
    //command finish
  }

  //command start
  if (command === `${prefix}userinfo`) {
    //checks the command being ran
    let embed = new Discord.RichEmbed()
      //makes a new embed
      .setAuthor(message.author.username)
      //gets the username of the person/user who ran the command
      .setDescription("This is the user's info!")
      //The title
      .setColor("#00FFF7")
      //color of the side
      .addField(
        "Full username",
        `${message.author.username}#${message.author.discriminator}`
      )
      //username of the person who ran the command
      .addField("ID", message.author.id)
      //So nobody takes the bot and it is branded.
      .setFooter("Bot by SuperWaltC29#2932")
      //id of the user
      .addField("Created At", message.author.createdAt);
    //when the account was created
    //sends the embed
    message.channel.send(embed);

    return;
    //command finished
  }
});

bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'Cloud Service | https://discord.gg/xnthEXsAqH',
            type: "STREAMING",
            url: "https://www.twitch.tv/be_n"
        }
    });
});

bot.login("NzgwOTIxNzI3Njg0MzEzMTA5.X72ICA.BVo2JrYeZifqfFqRbOOhx3kH95I");
