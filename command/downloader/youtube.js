const yts = require("yt-search"),
	{ y2mateV, y2mateA } = require("/lib/y2mate");
const axios = require("axios");

 exports.getBuffer = getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

module.exports = {
	name: "youtube",
	alias: ["play", "ytmp4", "ytmp3", "yt"],
	use: "<url>",
	category: "downloader",
	desc: "Download audio/video from YouTube",
	wait: true,
	query: true,
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
		var pilih = msg.body.split(/ +/)[0].slice(1);
		var teks = q.replace(/ --doc/gi, "");
		if (pilih == "play" || pilih == "youtube") {
			yets = await yts(teks);
			var results = await yets.all.filter((s) => s.type == "video");
			var vid = results.find((video) => video.seconds < 14400);
			teks = vid.url;
		}
		var yt = await y2mateV(teks, "480");
		if (yt[0].link == "https://app.y2mate.com/download") yt = await y2mateV(teks, "360");
		if (yt[0].link == "https://app.y2mate.com/download") yt = await y2mateV(teks, "144");
		if (pilih == "play" || pilih == "ytmp3" || pilih == "youtube") {
			yt = await y2mateA(teks, "320");
		}
		switch (pilih) {
			case "play":
				await conn.sendMessage(msg.from, {
					image: { url: yt[0].thumb },
					caption: '*L Ξ X A*\n' + yt[0].judul, //await rzky.tools.parseResult(yt[0], { title: "Youtube" }),
					templateButtons: [
						{ urlButton: { displayText: "Source", url: teks } },
						{ quickReplyButton: { displayText: "Audio", id: "#ytmp3 " + teks } },
						{ quickReplyButton: { displayText: "Video", id: "#ytmp4 " + teks } },
					],
				});
				break;
			case "ytmp3":
			case "yt":
				//await conn.sendFile(msg.from, yt[0].link, yt[0].judul + ".mp3", "", msg);
				await conn.sendMessage(
				  msg.from, 
				  { document: { 
				    url: yt[0].link }, 
				    mimetype: 'audio/mpeg', 
				    fileName: yt[0].judul + '.mp3',
				    contextInfo: {
          externalAdReply: {
            title: yt[0].judul,
            body: 'Quality : ' + yt[0].quality ,
            mediaType: 2,
            thumbnail: await getBuffer(yt[0].thumb),
            mediaUrl: teks
          }
        }
    } 
)
				break;
			case "ytmp4":
			  try {
					await conn.sendMessage(
							msg.from,
							{
								document: {
									url: yt[0].link,
								},
								mimetype: "video/mp4",
								fileName: yt[0].judul + ".mp4",
								contextInfo: {
          externalAdReply: {
            title: yt[0].judul,
            body: 'Quality : ' + yt[0].quality ,
            mediaType: 2,
            thumbnail: await getBuffer(yt[0].thumb),
            mediaUrl: teks
          }
        }
							}
						);
			  } catch (e) {
			    await conn.sendFile(msg.from, yt[0].link, yt[0].judul + ".mp4", '*L Ξ X A*\n' + yt[0].judul, msg);
			  }
				break;
		}
	},
};
