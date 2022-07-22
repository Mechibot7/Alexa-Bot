function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
	name: "apakah",
	alias: ["apakah"],
	category: "fun",
	desc: "question for magic shells",
	use: "question",
	isSpam: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
	  if (!q) return msg.reply('enter question')
	  apa = ['Tidak', 'Iya', 'Mungkin saja iya', 'mungkin tidak']
    jawaban = pickRandom(apa)
    capt = '*Question* : Apakah ' + q
    capt += '\n*Answer* : ' + jawaban 
    msg.reply(capt, { withTag: true })
	},
}
