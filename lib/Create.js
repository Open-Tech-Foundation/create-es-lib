"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var yargs_1 = __importDefault(require("yargs"));
function Create() {
    var header = chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n"], ["\\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\\n"])));
    console.log(header);
    var argv = yargs_1.default
        .scriptName('create-es-lib')
        .usage('$0 <your-lib-name>')
        .alias('h', 'help')
        .alias('v', 'version')
        .help().argv;
}
exports.default = Create;
var templateObject_1;
