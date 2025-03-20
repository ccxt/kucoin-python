import * as fs from 'fs'
import path from 'path'

import { argvs, mkdir, jsonFromFile, exchangeArgv, execSync, cp, capitalize, regexAll } from './utils';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


class pypi {

    exchange:string;
    exchangeConfigs:any;
    pypiApiSecret:any;
    rootDir:string = __dirname + `/../`;
    
    constructor(exchange: string, pypiApiSecret: string) {
        this.exchange = exchange;
        this.exchangeConfigs = jsonFromFile(__dirname + `/global-configs.json`)['exchanges'];
        this.pypiApiSecret = pypiApiSecret;
        this.init(exchange);
    }

    init(exchange) {
        // create skeleton dirs
        const tmpDir = this.rootDir + `/temp_pypi/`;
        mkdir (tmpDir);
        mkdir (tmpDir + '/tests/'); // just empty folder
        // copy python folder to temp dir
        const pypiPackageName = this.exchangeConfigs[exchange].__PYTHON_PACKAGE_NAME__;
        const pypiPackageNameSanitized = this.sanitizeFolderName(pypiPackageName);
        const pkgDir = tmpDir + '/src/' + pypiPackageNameSanitized;
        mkdir (pkgDir);
        cp(this.rootDir + `/${this.exchange}`, pkgDir);
        // copy readme
        cp(this.rootDir + `/README.md`, tmpDir + '/README.md');
        // write pyproject.toml
        fs.writeFileSync(tmpDir + '/pyproject.toml', this.pyprojectTolmContent(pypiPackageNameSanitized));
    }

    sanitizeFolderName (name:string) {
        return name.replace(/-/g, '_');
    }

    pyprojectTolmContent(pypiPackageNameSanitized:string) {
        const content = '' +
            `[build-system]\n` +
            `requires = ["hatchling"]\n` +
            `build-backend = "hatchling.build"\n` +
            `\n` + 
            `[tool.hatch.build.targets.wheel]\n` +
            `packages = ["src/${pypiPackageNameSanitized}"]\n` +
            `\n` +
            `[project]\n` +
            `name = "${pypiPackageNameSanitized}"\n` +
            `version = "0.0.1"\n` +
            `authors = [\n` +
            `    { name="Example Author", email="author@example.com" },\n` +
            `]\n` +
            `description = "A small example package"\n` +
            `readme = "README.md"\n` +
            `requires-python = ">=3.8"\n` +
            `classifiers = [\n` +
            `    "Programming Language :: Python :: 3",\n` +
            `    "Operating System :: OS Independent",\n` +
            `]\n` +
            `license = {text = "MIT"}\n` +
            `\n` +
            `[project.urls]\n` +
            `Homepage = "https://github.com/ccxt/ccxt"\n` +
            `Issues = "https://github.com/ccxt/ccxt"\n` +
            ''
        ;
        return content;
    }
}

// check if environment variabele exist
const pypiApiSecret = process.env.PYPI_API_SECRET;
if (!pypiApiSecret) {
    console.error('Please set environment variable PYPI_API_SECRET');
    process.exit(1);
}
new pypi(exchangeArgv, pypiApiSecret);
