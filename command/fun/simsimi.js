/*module.exports = {
	name: "Simsimi",
	category: "private",
	noPrefix: true,
	isOwner: true,
	desc: "",
	use: ``,
	query: ``,
	async run({ msg, conn }, { q, map, args, Baileys, arg, prefix, response, chat }) {
    if (!msg.quoted.isSelf) return 
    if (type === 'stickerMessage') return 
    let fetch = require('node-fetch')
    balasan  = await fetch(`https://api.simsimi.net/v2/?text=${msg.body}&lc=id&cf=false`, {method: 'get'})
    let pesanB = await balasan.json()
    //if (json.success) m.reply(json.success)
     msg.reply(pesanB.success.replace('simsimi', 'Lexa').replace('Simsimi', 'lexa').replace('simi', 'Lexa').replace('Simi', 'Lexa').replace('sim', 'Lexa'))
	},
};*/
