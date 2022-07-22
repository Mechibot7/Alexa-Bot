const fetch = require("node-fetch");

module.exports = {
	name: ["facebook"],
	alias: ["fbdl", "fb", "facebook"],
	use: "<url>",
	category: "downloader",
	desc: "download video from facebook",
	wait: true,
	isUrl: true,
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
	  var teks = args[0];
	  try { 
	    /*
	  var yt = await rzky.downloader.downloaderAll(teks);
	  var mp4 = yt.mp4[yt.mp4.length - 1];
	  delete yt.mp4;*/
	  fb = await fetch('https://api.lolhuman.xyz/api/facebook?apikey=Apikey&url=' + teks)
	  hasil = await fb.json()
	  await conn.sendMessage(
						msg.from,
						{
							video: {
								url: hasil.result, 
							},
							mimetype: "video/mp4",
							caption: '*L Ξ X A*', //result.replace(/downloader_from/gi, "Downloader From"),
							fileName: "facebook.mp4",
						},
						{
							quoted: msg,
						}
					);
	  } catch (err) {
			console.log(err);
			await msg.reply(response.error.api);
		}
	},
}