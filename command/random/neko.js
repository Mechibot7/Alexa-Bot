let fetch = require('node-fetch')

module.exports = {
	name: "neko",
	alias: ["neko"],
	category: "random",
	desc: "display random neko",
	isSpam: true,
	async run({ msg, conn }, { q }) {
fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/neko.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let hala = pjr.replace(/pjrx-line/g, "\n");
             conn.sendFile(msg.from, hala, "hala.jpg", 'Neko', msg)
            });
	},
}