let fetch = require('node-fetch')

module.exports = {
	name: "jokesbapak",
	alias: ["jokesbapak", "statusbapak", "bapak"],
	category: "fun",
	desc: "menampilkan candaan bapak bapak",
	isSpam: true,
	async run({ msg, conn }, { q }) {
fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/statusbapack.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let hala = pjr.replace(/pjrx-line/g, "\n");
               msg.reply(hala);
            });
	},
}