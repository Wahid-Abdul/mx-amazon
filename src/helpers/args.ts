// args.ts
import yargs from "yargs";

// Define the argument types
export interface Argv {
    username: string;
    password: string;
    count: number;
    search_string: string;
}

// Parse the command-line arguments using yargs
const argv = yargs
    .option("username", {
        describe: "Amazon username",
        type: "string",
        demandOption: true, // username mandatory
    })
    .option("password", {
        describe: "Amazon password",
        type: "string",
        demandOption: true, // password mandatory
    }).option("count", {
        describe: "Number of products to list",
        type: "number",
        demandOption: false
    }).option("search_string", {
        describe: "Search for a product",
        type: "string",
        demandOption: false
    })
    .argv as Argv;  // Cast to our custom Argv type

export default argv;
