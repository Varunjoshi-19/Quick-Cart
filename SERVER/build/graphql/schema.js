"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typedefs = void 0;
const queries_1 = __importDefault(require("./components/queries"));
const resolvers_1 = __importDefault(require("./components/resolvers"));
exports.typedefs = `#graphql 


type Query {

${queries_1.default}

}






`;
exports.resolvers = {
    Query: Object.assign({}, resolvers_1.default.queries),
};
