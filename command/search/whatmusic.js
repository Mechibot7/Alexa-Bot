module.exports = {
	name: "whatmusic",
	alias: ["wmusic", "whatmusik", "wmusik"],
	category: "search",
	use: "<reply audio>",
	isSpam: true,
	wait: true,
	isMedia: { isQVideo: true, isQAudio: true },
	desc: "Search for song titles through music or voice",
	async run({ msg, conn }, { q, map, args }) {
		//if(!msg.quoted) return msg.reply('Reply Audio')
		const content = JSON.stringify(msg.quoted);
		const isQAudio = msg.type === "extendedTextMessage" && content.includes("audioMessage");
		//f(!isQAudio) return msg.reply(`Reply Audio`)
		var what = await rzky.search.whatmusic(await msg.quoted.download());
		delete what.status;
		if (what.title === undefined || "") return msg.reply("Message : " + what.message)
		result = "*Title* : " + what.title + "\n"
		result += "*Artists* : " + what.artists + "\n"
		result += "*Album* : " + what.album + "\n"
		result += "*Genre* : " + what.genre_music + "\n"
		result += "*Duration* : " + what.duration + '\n'
	  result += "*Link* : " + what.sumber
		//await rzky.tools.parseResult(what, { title: "What Music" });
		//await msg.reply(result);
		const templateButtons = [
      {index: 3, quickReplyButton: {displayText: 'Download', id: '.play ' + what.title + ' - ' + what.artists}},
      ]
      const templateMessage = {
        text: result,
        footer: '',
        templateButtons: templateButtons 
      }
await conn.sendMessage(msg.from, templateMessage)
	},
};
