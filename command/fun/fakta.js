let fetch = require('node-fetch')

module.exports = {
	name: "fakta",
	alias: ["fakta"],
	category: "fun",
	desc: "fun fact on the world ",
	isSpam: true,
	async run({ msg, conn }, { q }) {
	  let src = await (await fetch('https://raw.githubusercontent.com/mrfzvx12/whatsapp-bot/main/result/random/fakta.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    msg.reply(json)
	},
}