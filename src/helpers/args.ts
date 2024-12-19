// args.ts
import yargs from 'yargs';

// Define the argument types
export interface Argv {
  username: string;
  password: string;
}

// Parse the command-line arguments using yargs
const argv = yargs
  .option('username', {
    alias: 'u',
    describe: 'Amazon username',
    type: 'string',
    demandOption: true,  // Make username a required argument
  })
  .option('password', {
    alias: 'p',
    describe: 'Amazon password',
    type: 'string',
    demandOption: true,  // Make password a required argument
  })
  .argv as Argv;  // Cast to our custom Argv type

export default argv;
