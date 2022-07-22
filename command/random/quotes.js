module.exports = {
	name: "quotesanime",
	alias: ["quotes", "animequotes", "quote", "quoteanime"],
	category: "random",
	isSpam: true,
	wait: true,
	async run({ msg, conn }, { q, map, args }) {
		var animquote = await rzky.random.quotesAnime();
		var animrandom = animquote.result[Math.floor(Math.random() * animquote.result.length)];
		var img = animrandom.img;
		delete animrandom.img;
		result = "*Char Name* : " + animrandom.char_name + '\n'
		result += "*Anime* : " + animrandom.anime + '\n'
	  result += '“' + animrandom.quotes + '”'
		await conn.sendFile(
			msg.from,
			img,
			"quotes.jpg",
			result,
			msg
		);
	},
};
