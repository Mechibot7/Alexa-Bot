
module.exports = {
	name: "ping",
	alias: ["p", "speed"],
	category: "info",
	desc: "Bot response in second.",
	isSpam: true,
	wait: true,
	async run({ msg }) {
		let os = require('os')
		let util = require('util')
		let { performance } = require('perf_hooks')
		let { sizeFormatter } = require('human-readable')
		let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
    const speed = require('performance-now');
    const timestamp = speed();
    const latensi = speed() - timestamp 
  
  msg.reply(`
Respond in ${latensi.toFixed(3)} second

*SERVER INFO* :
RAM: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}

*NODEJS MEMORY USAGE*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `*TOTAL CPU USAGE*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

*CPU CORE(S) USAGE (${cpus.length} CORE CPU)*
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim())
	},
};
