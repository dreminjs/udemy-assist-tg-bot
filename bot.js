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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
var dotenv = require("dotenv");
var parser_1 = require("./parser");
var currency_1 = require("./currency");
dotenv.config();
var bot = new grammy_1.Bot(process.env.TOKEN || "7277823713:AAEsa6S2pNROUHJZPblkoKnehtseazMh9Bs");
bot.use((0, grammy_1.session)({
    initial: function () { return ({
        step: null,
        courseData: { title: "", price: 0 },
    }); },
}));
bot.api.setMyCommands([
    { command: "start", description: "Начать работу" },
    { command: "send_link_course", description: "Купить курс" },
]);
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var keyboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyboard = new grammy_1.InlineKeyboard()
                    .text("Отправить ссылку  курсом", "send_link_course")
                    .row()
                    .url("Открыть Udemy", "https://www.udemy.com/");
                return [4 /*yield*/, ctx.reply("Привет!\nЯ ТГ-бот который тебе поможет купить курс на платформе Udemy  ", {
                        reply_markup: keyboard,
                        parse_mode: "HTML",
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command("send_link_course", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                ctx.session.step = "waiting_for_link"; // Устанавливаем шаг сессии
                return [4 /*yield*/, ctx.reply("Пожалуйста, отправьте свою ссылку курс")];
            case 1:
                _a.sent(); // Запрашиваем ссылку
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                console.error("Ошибка при обработке команды send_link_course:", error_1);
                return [4 /*yield*/, ctx.reply("Что-то пошло не так. Пожалуйста, попробуйте еще раз.")];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("send_link_course", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                ctx.session.step = "waiting_for_link";
                return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Пожалуйста, отправьте свою ссылку курс")];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_2 = _a.sent();
                console.error("Ошибка при ответе на callbackQuery:", error_2);
                return [4 /*yield*/, ctx.reply("Что-то пошло не так. Пожалуйста, попробуйте еще раз.")];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); });
bot.on("message:text", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var userLink, url, loadingMessage, result, course, keyboard, totalPrice, err_1, e_1, email, courseData, inlineKeyboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ctx.session.step === "waiting_for_link")) return [3 /*break*/, 16];
                userLink = ctx.message.text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 15]);
                url = new URL(userLink);
                if (!(url.hostname === "www.udemy.com" || url.hostname === "udemy.com")) return [3 /*break*/, 10];
                ctx.session.step = null;
                return [4 /*yield*/, ctx.reply("Загрузка данных курса, пожалуйста, подождите...")];
            case 2:
                loadingMessage = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 7, , 9]);
                return [4 /*yield*/, (0, parser_1.findPrice)(userLink)];
            case 4:
                result = _a.sent();
                return [4 /*yield*/, (0, currency_1.getCourse)("USD", "RUB")];
            case 5:
                course = _a.sent();
                keyboard = new grammy_1.InlineKeyboard()
                    .text("Купить курс", "buy_course")
                    .text("Назад", "start");
                totalPrice = result.price
                    ? "".concat(Math.round(result.price * course).toFixed(2), "\u20BD")
                    : "Не удалось определить цену";
                ctx.session.courseData = {
                    title: result.title,
                    price: +Math.round(result.price * course).toFixed(2),
                };
                ctx.session.step = "waiting_for_email";
                return [4 /*yield*/, ctx.api.editMessageText(ctx.chat.id, loadingMessage.message_id, "\uD83D\uDCDA *\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430:* ".concat(result.title || "Неизвестно", "\n\uD83D\uDCB5 *\u0426\u0435\u043D\u0430 \u043A\u0443\u0440\u0441\u0430:* ").concat(totalPrice, " \uD83D\uDED2"), {
                        parse_mode: "Markdown",
                        reply_markup: keyboard,
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 9];
            case 7:
                err_1 = _a.sent();
                return [4 /*yield*/, ctx.api.editMessageText(ctx.chat.id, loadingMessage.message_id, "Произошла ошибка при получении данных курса. Попробуйте позже.")];
            case 8:
                _a.sent();
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, ctx.reply("Ссылка не относится к udemy.com. Попробуйте снова")];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [3 /*break*/, 15];
            case 13:
                e_1 = _a.sent();
                return [4 /*yield*/, ctx.reply("Некорректная ссылка. Попробуйте снова.")];
            case 14:
                _a.sent();
                return [3 /*break*/, 15];
            case 15: return [3 /*break*/, 19];
            case 16:
                if (!(ctx.session.step === "waiting_for_email")) return [3 /*break*/, 17];
                ctx.session.step = null;
                email = ctx.message.text;
                courseData = ctx.session.courseData;
                inlineKeyboard = new grammy_1.InlineKeyboard()
                    .text("Подтвердить", "confirm_order")
                    .row()
                    .text("Назад", "start");
                ctx.reply("\uD83D\uDCE7 *Email:* ".concat(email, "\n\uD83D\uDCDA *\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430:* ").concat(courseData.title || "Неизвестно", "\n\uD83D\uDCB5 *\u0426\u0435\u043D\u0430 \u043A\u0443\u0440\u0441\u0430:* ").concat(courseData.price, "\u20BD \uD83D\uDED2"), {
                    parse_mode: "Markdown",
                    reply_markup: inlineKeyboard,
                });
                return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, ctx.reply("Я пока не знаю, что с этим делать. Нажмите кнопку, чтобы начать.")];
            case 18:
                _a.sent();
                _a.label = 19;
            case 19: return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("buy_course", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var courseData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseData = ctx.session.courseData;
                if (!courseData) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.reply("\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 email, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u0430\u043A\u043A\u0430\u0443\u043D\u0442!")];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, ctx.reply("Данные курса недоступны. Попробуйте снова.")];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
bot.start({ onStart: function () { return console.log("✅ Бот успешно запущен!"); } });
