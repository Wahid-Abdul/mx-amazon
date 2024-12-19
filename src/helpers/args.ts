// args.ts
import yargs, { number } from "yargs";

// Define the argument types
export interface Argv {
    username: string;
    password: string;
    count: number;
}

// Parse the command-line arguments using yargs
const argv = yargs
    .option("username", {
        describe: "Amazon username",
        type: "string",
        demandOption: true,  // Make username a required argument
    })
    .option("password", {
        describe: "Amazon password",
        type: "string",
        demandOption: true,  // Make password a required argument
    }).option("count", {
        describe: "Number of products to list",
        type: "number",
        demandOption: false
    })
    .argv as Argv;  // Cast to our custom Argv type

export default argv;
