module.exports = {
	name: ["soundcloud"],
	alias: ["soundcloud"],
	use: "<url>",
	category: "downloader",
	desc: "download audio from soundcloud",
	wait: true,
	isUrl: true,
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
	  var teks = args[0];
	  try {
	  var yt = await rzky.downloader.downloaderAll(teks);
	  var mp4 = yt.mp4[yt.mp4.length - 1];
	  var img = yt.image;
	  delete yt.mp4;
	  await conn.sendFile(
						msg.from,
						img,
						"yt.jpg",
						result.replace(/downloader_from/gi, "Downloader From"),
						msg
					);
					await conn.sendMessage(
						msg.from,
						{
							audio: {
								url: mp3.url,
							},
							mimetype: "audio/mpeg",
							fileName: yt.title + ".mp3",
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