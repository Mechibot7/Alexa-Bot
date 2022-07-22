const { cekStatus, addSesi } = require("../../lib/optiongame");
let fetch = require('node-fetch')
module.exports = {
	name: "tebaklirik",
	alias: ["tebaklirik"],
	category: "game",
	desc: "Play games, guess all the questions available ",
	isSpam: true,
	isGroup: true,
	isLimitGame: true,
	async run({ msg, conn }, { q, map }) {
		if (cekStatus(msg.from, map, "tebakbendera")) throw "Group Ini masih dalam sesi permainan";
		let waktugame = 60;
		//let tebakbendera = await rzky.game.tebakbendera();
    let ambil = await (await fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/game/tebaklirik.json')).json()
    let asahotak = ambil[Math.floor(Math.random() * ambil.length)]
    let clue = asahotak.jawaban.replace(/[aiueoAIUEO]/gi, '-')
		if (asahotak) {
			const { key } = await msg.reply(
				`*TEBAK LIRIK*\n\n*Question* : ${asahotak.soal}\n\n*Hint* : ${clue}\n\nAnswered Immediately, Time only 1 minute!\n\n*Happy Answering!*`
			);
			addSesi(msg.from, key.id, asahotak.jawaban.toLowerCase() , waktugame, map, "tebakbendera");
			conn.game[key.id] = { status: false };
		} else msg.reply("Error");
	},
};
