"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_server_1 = __importDefault(require("./graphql/graphql-server"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
function startingServer() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)());
        app.get("/", (req, res) => {
            res.send("server working");
        });
        app.use("/user", user_1.default);
        app.use("/product", product_1.default);
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_server_1.default)()));
        app.listen(PORT, () => {
            try {
                mongoose_1.default.connect("mongodb://127.0.0.1:27017/QuickCart");
                console.log(`Mongodb connected and server running on PORT ${PORT}`);
            }
            catch (error) {
                console.log(error);
            }
        });
    });
}
startingServer();
