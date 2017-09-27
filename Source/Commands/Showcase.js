const common = require(`../Common.js`);
const app = require(`../App.js`);

const RichEmbed = require(`discord.js`).RichEmbed;

const Command = require(`../Models/Command.js`);
const Argument = require(`../Models/Argument.js`);

const description = `Posts a mod in the #mod-showcase channel.`;
const args = [
  new Argument(`name`, `The name of the mod.`, true),
  new Argument(`description`, `The description of the mod.`, true),
  new Argument(`picture`, `The URL of a picture of the mod.`, true),
  new Argument(`url`, `The URL of the download, or wiki page.`, false)
];
function randomColor()
{
  const min = 0;
  const max = 255;
  // From:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const callback = function(args, message)
{
  const modEmbed = new RichEmbed(
    {
      title: args[0],
      description: args[1],
      url: args[3]
    }
  );
  modEmbed.setColor([randomColor(), randomColor(), randomColor()]);
  modEmbed.setImage(args[2]);
  // An error can occur if the URL is broken.
  app.showcaseChannel.send(`New mod update by ${message.author}:`, {embed: modEmbed}).catch(error =>
    common.sendErrorMessage(`\`\`\`css\n${error}\`\`\``, message));
};

module.exports.command = new Command(`showcase`, description, args, null, callback);
