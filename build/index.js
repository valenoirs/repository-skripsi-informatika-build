"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const view_1 = require("./routes/view");
const user_1 = require("./routes/user");
const skripsi_1 = require("./routes/skripsi");
const app = (0, express_1.default)();
const port = config_1.default.PORT;
(0, mongoose_1.connect)(config_1.default.MONGO_URI)
    .then(() => {
    console.log('[server]: OK! successfully-connected-to-mongodb');
})
    .catch((error) => {
    console.error('[server]: ERR! failed-connecting-to-mongo-database', error);
});
app.use((0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config_1.default.SESSION_LIFETIME,
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, method_override_1.default)('_method'));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});
app.use(express_ejs_layouts_1.default);
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', view_1.router);
app.use('/user', user_1.router);
app.use('/skripsi', skripsi_1.router);
app.get('/ping', (req, res) => {
    console.log(`[server]: OK! ${req.headers.host} pinging the server`);
    return res.status(200).send({
        success: true,
        status: 200,
        data: {
            message: 'valenoirs',
        },
    });
});
app.use('/', (req, res) => {
    return res.status(404).send({
        error: true,
        status: 404,
        type: 'NotFound',
        data: {
            message: 'No API endpoint found.',
        },
    });
});
app.listen(port, () => {
    console.log(`[server]: OK! server running at port ${port}`);
});
