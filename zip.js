import fs from 'node:fs'
import archiver from 'archiver'
import moment from 'dayjs'

const files = fs.readdirSync('.', { withFileTypes: true })
files.forEach((file) => {
  if (file.isFile() && file.name.startsWith('项目名称') && file.name.endsWith('.zip')) {
    fs.unlinkSync(file.name)
    console.log(`已删除旧文件: ${file.name}`)
  }
})
const output = fs.createWriteStream(`${moment().format('项目名称 M月D日 H点mm')}.zip`)
const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`打包完成: ${output.path}`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory('dist/', false)

archive.finalize()
