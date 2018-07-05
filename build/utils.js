"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const node_fetch_1 = require("node-fetch");
exports.wait = ms => new Promise(resolve => setTimeout(resolve, ms));
exports.clearLog = () => {
    if (process.env.NODE_ENV !== 'development')
        console.log('\x1Bc');
};
exports.logError = (title, lines) => console.error(chalk_1.default `{red [ERROR][${title}]}\n{gray ${lines.join('\n')}}\n{red [/ERROR]}`);
exports.logWarning = (title, lines) => console.log(chalk_1.default `{yellow [WARNING][${title}]}\n{gray ${lines.join('\n')}}\n{yellow [/WARNING]}`);
exports.logMessage = (message) => {
    if (message == null || !message.trim().length)
        return;
    console.log(chalk_1.default `{cyan.bold >>> ${message} <<<\n}`);
};
exports.logHeader = (header) => {
    if (header == null || !header.trim().length)
        return;
    console.log(chalk_1.default `{yellow.bold [Timeline CLI] ${header}\n}`);
};
exports.execFetch = (url, options = {}) => __awaiter(this, void 0, void 0, function* () {
    let body = null;
    const throwError = (err) => console.log(chalk_1.default `{red [execFetch] Fetch execution failed}\n`, chalk_1.default `{gray [ERROR]\n${err}\n\n[URL]\n${url}}`);
    try {
        const response = yield node_fetch_1.default(url, options);
        body = yield response.json();
        if (body.hasOwnProperty('error'))
            throwError(JSON.stringify(body.error, null, 2));
    }
    catch (err) {
        throwError(err);
    }
    return body;
});
