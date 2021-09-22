#!/usr/bin/env node
const jsTokens = require("js-tokens");
const prompt = require('prompt-sync')();
const execSync = require('child_process').execSync;
const fs = require('fs');

if (process.argv[2] === "init") {
    const pathArray = process.cwd().split("/");
    const init = JSON.stringify({
        "name": pathArray[pathArray.length-1],
        "main": "./main.tai",
        "version": "1.0.0",
        "description": "A taiga application",
        "license": "ISC",
        "author": "",
        "npm-packages": [],
        "taiga-packages": []
    })
    execSync('npm init -y');
    fs.writeFileSync('./taiga.json', init);
} 

else if (process.argv[2] === "tool") {
    const init = JSON.parse(fs.readFileSync('./taiga.json', 'utf8'));
    switch(process.argv[3]) {
        case "sysinf":
        case "systeminformation":
            execSync('npm install systeminformation --save');
            console.log("Installed system information tool");
            init["npm-packages"].push("systeminformation");
            console.log("Added system information tool to the taiga init file");
            break;
        case "axios":
            execSync('npm install axios --save');
            console.log("Installed axios tool");
            init["npm-packages"].push("axios");
            console.log("Added axios tool to the taiga init file");
            break;
        case "input":
        case "prompt":
            execSync('npm install prompt-sync --save');
            console.log("Installed prompt-sync tool");
            init["npm-packages"].push("prompt-sync");
            console.log("Added prompt-sync tool to the taiga init file");
            break;
        case "list":
            console.log("Supported taiga tools/npm packages:");
            console.log("systeminformation - tool for gathering (current) system information");
            console.log("axios - tool for http/https requests");
            console.log("prompt-sync - tool for user input");
        default:
            console.log("Invalid tool name! For a list of valid tools, please enter \"$ taiga tool list\"");
    }
    fs.writeFileSync('./taiga.json', JSON.stringify(init));
}

else if (process.argv[2] === "npm" && (process.argv[3] === "install" || process.argv[3] === "i")) {
    execSync(`npm install ${process.argv[4]} --save`);
}

else if (process.argv[2] === "version") {
    console.log('v1.0.0')
}

else {
    if (process.argv.length === 2) {
        const init = require(`${process.cwd()}/taiga.json`);
        const mainFile = init.main;
        const file = fs.readFileSync(mainFile, 'utf8');
        var tokens = Array.from(jsTokens(file), (token) => token.value);
        tokens.push("\n");
        const abs = Math.abs, acos = Math.acos, acosh = Math.acosh, asin = Math.asin, asinh = Math.asinh, atan = Math.atan, atan2 = Math.atan2, atanh = Math.atanh, cbrt = Math.cbrt, ceil = Math.ceil, clz32 = Math.clz32, cos = Math.cos, cosh = Math.cosh, exp = Math.exp, expm1 = Math.expm1, floor = Math.floor, fround = Math.fround, hypot = Math.hypot, imul = Math.imul, log = Math.log, log10 = Math.log10, log1p = Math.log1p, log2 = Math.log2, max = Math.max, min = Math.min, pow = Math.pow, random = Math.random, round = Math.round, sign = Math.sign, sin = Math.sin, sinh = Math.sinh, sqrt = Math.sqrt, tan = Math.tan, tanh = Math.tanh, trunc = Math.trunc, E = Math.E, LN10 = Math.LN10, LN2 = Math.LN2, LOG10E = Math.LOG10E, LOG2E = Math.LOG2E, PI = Math.PI, SQRT1_2 = Math.SQRT1_2, SQRT2 = Math.SQRT2;
        const parse = JSON.parse, stringify = JSON.stringify;
        const print = console.log, error = console.error
        const req = package => require(package);
        const input = input => prompt(input);
        const terminal = command => execSync(command, { encoding: 'utf8' });
        const use = (package, option) => {
            let taigaInit = require(`${process.cwd()}/taiga.json`);
            const packages = taigaInit["npm-packages"];
            let check = false;
            packages.forEach(pack => {
                if (pack === package) {
                    check = true;
                }
            })
            if (!check) {
                if (option === "save") {
                    execSync(`npm install ${package} --save`);
                    return require(package);
                } else if (option === "savedev") {
                    execSync(`npm install ${package} --save-dev`);
                    return require(package);
                } else {
                    execSync(`npm install ${package}`);
                    return require(package);
                }
                taigaInit["npm-packages"].push(package);
                fs.writeFileSync(`${process.cwd()}/taiga.json`, JSON.stringify(taigaInit));
            } else {
                return require(package);
            }
        }
        for(let i = 0; i < tokens.length; i++) {
            switch(tokens[i]) {
                case "@":
                case "constant":
                    tokens[i] = "const ";
                    break;
                case "~":
                case "variable":
                    if (typeof tokens[i+1] === "string") {
                        tokens[i] = "let ";
                    }
                    break;
                case "global":
                case "gb":
                    tokens.splice(i, 2, "global.");
                    break;
                case "type":
                    tokens[i] = "typeof";
                    break;
                case "pr":
                    tokens.splice(i, 2, "console.log(")
                    var prTemp = i;
                    while(tokens[prTemp] !== "\n" && tokens[prTemp] !== ";") {
                        prTemp++;
                    }
                    if (tokens[prTemp+1] === "end" && tokens[prTemp+3] === "main") {
                        tokens[prTemp] = ")";
                    } else {
                        tokens[prTemp] = ")\n";
                    }
                    break;
                case "er":
                    tokens.splice(i, 2, "console.error(")
                    var prTemp = i;
                    while(tokens[prTemp] !== "\n" && tokens[prTemp] !== ";") {
                        prTemp++;
                    }
                    if (tokens[prTemp+1] === "end" && tokens[prTemp+3] === "main") {
                        tokens[prTemp] = ")";
                    } else {
                        tokens[prTemp] = ")\n";
                    }
                    break;
                case "func":
                case "def":
                    let funcTemp = i;
                    while(tokens[funcTemp] != "\n") {
                        funcTemp++;
                    }
                    if (tokens[i+3] === "\n") {
                        tokens[i] = "function";
                        tokens[i+2] = `${tokens[i+2]}() {`
                    } else {
                        tokens[i] = "function";
                        tokens[funcTemp] = " {\n";
                    }
                    break;
                case "if":
                    let ifTemp = i;
                    while(tokens[ifTemp] != "\n") {
                        ifTemp++;
                    }
                    if (tokens[ifTemp-1] !== "{") {
                        tokens[i] = "if (";
                        tokens[ifTemp] = ") {";
                    }
                    break;
                case "elif":
                    let elifTemp = i;
                    while(tokens[elifTemp] != "\n") {
                        elifTemp++;
                    }
                    tokens[i] = "} else if (";
                    tokens[elifTemp] = ") {";
                    break;
                case "else":
                    if (tokens[i-1] !== "}" && tokens[i-2] !== "}") {
                        tokens[i] = "} else {";
                    }
                    break;
                case "lf":
                    tokens.splice(i, 7, (`for (let ${tokens[i+2]} = ${tokens[i+4]}; ${tokens[i+2]}<${tokens[i+6]}; ${tokens[i+2]}++) {`));
                    break;
                case "lw":
                    let whileTemp = i;
                    while (tokens[whileTemp] != "\n") {
                        whileTemp++;
                    }
                    tokens[i] = "while(";
                    tokens[i+1] = "";
                    tokens[whileTemp] = ") {\n";
                    break;
                case "#":
                    tokens[i] = "//";
                    break;
                case "-":
                    if (tokens[i+1] === ">") {
                        tokens.splice(i, 2, "/*");
                    }
                    break;
                case "<":
                    if (tokens[i+1] === "-") {
                        tokens.splice(i, 2, "*/");
                    }
                    break;
                case "try":
                    if (tokens[i+1] !== "{" || tokens[i+2] !== "{") {
                        tokens[i] = "try {";
                    }
                    break;
                case "catch":
                    if (tokens[i+1] !== "{" || tokens[i+2] !== "{") {
                        tokens[i] = "} catch";
                        tokens[i+1] = " (";
                        tokens[i+2] = `${tokens[i+2]}) {`;
                    }
                    break;
                case "finally":
                    if (tokens[i+1] !== "{" || tokens[i+2] !== "{") {
                        tokens[i] = "} finally";
                        tokens[i+1] = " {";
                    }
                    break;
                case "and":
                    tokens[i] = "&&";
                    break;
                case "or":
                    tokens[i] = "||";
                    break;
                case "not":
                    tokens.splice(i, 2, "!");
                    break;
                case "tr":
                    tokens[i] = "true";
                    break;
                case "fl":
                    tokens[i] = "false";
                    break;
                case "check":
                    tokens.splice(i, 2, "switch(");
                    tokens[i+1] = `${tokens[i+1]}) {`;
                    break;
                case "status":
                    if (tokens[i-3] === "switch(") {
                        tokens.splice(i, 2, "case ");
                        tokens[i+1] = `${tokens[i+1]}: `;
                    } else {
                        tokens.splice(i, 2, "break;\ncase ");
                        tokens[i+1] = `${tokens[i+1]}: `;
                    }
                    break;
                case "default":
                    tokens[i] = "break;\ndefault: ";
                    break;
                case "$r":
                case "ret":
                    tokens[i] = "return";
                    break;
                case "^":
                    tokens[i] = "**";
                    break;
                case "start":
                    tokens[i] = "{";
                    break;
                case "end":
                    tokens[i] = "}";
                    break;
                default:
                    null
            }
        }
        try {
            eval(tokens.join(""));
        } catch(err) {
            console.log(err);
        }
    }
}