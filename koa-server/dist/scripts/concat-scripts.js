"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const child_process_1 = require("child_process");
const util_1 = require("util");
// Promisify exec to use with async/await
const execPromise = (0, util_1.promisify)(child_process_1.exec);
const srcDir = 'src/client';
const destDir = 'public/scripts/';
const destFile = 'public/scripts/all-scripts.js';
async function concatenateScripts() {
    try {
        // Delete the existing all-scripts.js file
        if (await fs_extra_1.default.pathExists(destDir)) {
            console.log(`Deleting existing scripts directory ${destDir}...`);
            await fs_extra_1.default.remove(destDir);
        }
        // Find all TypeScript files in src/client directory
        const tsFiles = await (0, fast_glob_1.default)(`${srcDir}/**/*.ts`, { absolute: true });
        // Compile TypeScript files to JavaScript in the destination directory
        for (const file of tsFiles) {
            const jsFile = path_1.default.join(destDir, path_1.default.relative(srcDir, file).replace(/\.ts$/, '.js'));
            console.log(`Compiling ${file} to ${jsFile}...`);
            await fs_extra_1.default.ensureDir(path_1.default.dirname(jsFile)); // Ensure the destination directory exists
            await execPromise(`tsc ${file} --outDir ${destDir}`);
        }
        // Find all JavaScript files in the destination directory
        const jsFiles = await (0, fast_glob_1.default)(`${destDir}/**/*.js`, { absolute: true });
        const compiledFiles = await Promise.all(jsFiles.map(async (file) => {
            console.log(`Reading ${file}...`);
            return await fs_extra_1.default.readFile(file, 'utf8');
        }));
        // Write concatenated content to all-scripts.js
        await fs_extra_1.default.outputFile(destFile, compiledFiles.join('\n'), 'utf8');
        console.log(`Scripts concatenated to ${destFile}`);
    }
    catch (error) {
        console.error('Error concatenating scripts:', error);
    }
}
concatenateScripts();
//# sourceMappingURL=concat-scripts.js.map