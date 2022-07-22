function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
	name: "kapankah",
	alias: ["kapankah", "kapan"],
	category: "fun",
	desc: "question for magic shells",
	use: "question",
	isSpam: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
	  if (!q) return msg.reply('enter question')
	  No = Math.floor(Math.random() * 10)
    Apa = ["Jam lagi","Hari lagi","Minggu lagi","Bulan lagi","Tahun lagi"]
    jawaban = pickRandom(Apa)
    capt = '*Question* : Kapankah ' + q
    capt += '\n*Answer* : ' + No + ' ' + jawaban
    msg.reply(capt, { withTag: true })
	},
}