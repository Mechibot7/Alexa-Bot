module.exports = {
	name: ["tiktok"],
	alias: ["tiktokaudio", "tiktok"],
	use: "<url>",
	category: "downloader",
	desc: "download audio/video from tiktok",
	wait: true,
	isUrl: true,
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
		var pilih = msg.body.split(/ +/)[0].slice(1);
		var teks = args[0];
		let tiktok;
		if (pilih == "tiktok" || pilih == "tiktokaudio") tiktok = await rzky.downloader.tiktok(teks);
		let resu;
		if (pilih == "tiktok" || pilih == "tiktokaudio") resu = tiktok.result;
		if (pilih == "tiktok" || pilih == "tiktokaudio") tiktok.size = resu.video.nowm.size;
		if (pilih == "tiktok" || pilih == "tiktokaudio") tiktok.audio_name = resu.audio.audio_name;
		if (pilih == "tiktok" || pilih == "tiktokaudio") delete tiktok.result;
		try {
			switch (pilih) {
				case "tiktok":
					await conn.sendMessage(
						msg.from,
						{
							video: {
								url: await resu.video.nowm.video_url,
							},
							caption: '*L Ξ X A*\n*' + tiktok.author + '* ' + tiktok.desc, //await rzky.tools.parseResult(tiktok, { title: "Tiktok Download" }),
							mimetype: "video/mp4",
							fileName: tiktok.desc.substr(0, 19) + ".mp4",
							templateButtons: [
								{ urlButton: { displayText: "Source", url: q } },
								{ quickReplyButton: { displayText: "Audio", id: "#tiktokaudio " + q } },
							],
						},
						{
							quoted: msg,
						}
					);
					break;
				case "tiktokaudio":
					await conn.sendMessage(
						msg.from,
						{
							image: { url: await tiktok.thumbnail },
							fileName: "tiktok.jpg",
							caption: '*L Ξ X A*\n*' + tiktok.author + '* ' + tiktok.desc, //await rzky.tools.parseResult(tiktok, { title: "Tiktok Download" }),
						},
						{ quoted: msg }
					);
					await conn.sendFile(msg.from, await resu.audio.audio_url, tiktok.author + ".mp3", "", msg);
					break;
			}
		} catch (err) {
			console.log(err);
			await msg.reply(response.error.api);
		}
	},
};
