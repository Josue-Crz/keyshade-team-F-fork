import { exec } from 'child_process'
import { resolve } from 'path'

export default async function teardown() {
  const rootDir = resolve(__dirname, '../../..')
  await executeCommand('docker-compose down', { cwd: rootDir })
  process.exit(0)
}

function executeCommand(
  command: string,
  options?: Record<string, string | undefined>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { cwd, ...env } = options || {}
    exec(command, { cwd, env }, (error, stdout, stderr) => {
      console.log('Executing: ', command)
      if (error) {
        console.error('Error:', stderr)
        reject(error)
      } else {
        console.log('Output:', stdout)
        resolve()
      }
    })
  })
}
