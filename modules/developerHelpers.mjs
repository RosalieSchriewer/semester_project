
import SuperLogger from "./superLogger.mjs";
import chalk from "chalk";

export default function printDeveloperStartupImportantInformationMSG() {

    drawLine("#", 20);

    SuperLogger.log(`Server environment ${process.env.ENVIRONMENT}`, SuperLogger.LOGGING_LEVELS.CRITICAL);

 /*    if (process.env.ENVIRONMENT == "local") {
        SuperLogger.log( `Database connection  ${process.env.DB_CONNECTIONSTRING_LOCAL}`,  SuperLogger.LOGGING_LEVELS.CRITICAL);
    } else {
        SuperLogger.log( `Database connection  ${process.env.DB_CONNECTIONSTRING_PROD}`,  SuperLogger.LOGGING_LEVELS.CRITICAL);
    } */

    if (process.argv.length > 2) {
        if (process.argv[2] == "--setup") {
            SuperLogger.log(chalk.red("Running setup for database"), SuperLogger.LOGGING_LEVELS.CRITICAL);
            // TODO: Code that would set up our database with tbls etc..
        }
    }

    drawLine("#", 20);

}

function drawLine(symbols, length) {
    SuperLogger.log(symbols.repeat(length), SuperLogger.LOGGING_LEVELS.CRITICAL);
}