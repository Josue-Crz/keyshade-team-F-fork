import { exec, spawn } from 'child_process';

export default async function setup() {
  console.log('--- Starting Global Setup ---');
  
  await executeCommand('docker-compose down');
  await executeCommand('docker-compose -f ../../docker-compose-test.yml up -d');
  await executeCommand('pnpm build:api', { cwd: '../../' });
  
  // Replace the "sleep" command with a real delay
  console.log('Waiting 2 seconds for DB...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await executeCommand('pnpm db:deploy-migrations', {
    cwd: '../../',
    env: {
      ...process.env,
      DATABASE_URL: 'postgresql://prisma:prisma@localhost:5432/tests',
    }
  });

  await startAPI();
  console.log('--- Global Setup Finished ---');
}

function executeCommand(
  command: string,
  options: { env?: Record<string, string>; cwd?: string } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`); // Log BEFORE running
    
    exec(command, { 
      env: options.env || process.env, 
      cwd: options.cwd,
      maxBuffer: 1024 * 1024 * 10 // Increase buffer to 10MB
    }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}`);
        console.error(stderr);
        reject(error);
      } else {
        // stdout && console.log(stdout); // Optional: verbose logging
        resolve();
      }
    });
  });
}

function startAPI(): Promise<void> {
  return new Promise((resolve) => {
    console.log('Launching API via spawn...');
    
    // Use spawn instead of exec for long-running services to avoid buffer issues
    const apiProcess = spawn('pnpm', ['run', '--filter=api', 'start'], {
      shell: true, // Required for Windows
      env: {
        ...process.env,
        DATABASE_URL: 'postgresql://prisma:prisma@localhost:5432/tests',
        REDIS_URL: 'redis://localhost:6379',
        JWT_SECRET: 'secret',
        NODE_ENV: 'e2e',
        DOMAIN: 'localhost',
        API_PORT: '4200'
      }
    });

    apiProcess.stdout?.on('data', (data) => {
      // Optional: console.log(`[API]: ${data}`);
    });

    apiProcess.stderr?.on('data', (data) => {
      console.error('[API Error]:', data.toString());
    });

    // Resolve after 10 seconds
    setTimeout(() => {
      console.log('API wait period finished');
      resolve();
    }, 10000);
  });
}