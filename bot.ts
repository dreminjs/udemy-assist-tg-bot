import { Bot, InlineKeyboard, session, Context, SessionFlavor } from "grammy";

import * as dotenv from "dotenv";
import { findPrice } from "./parser";
import axios from "axios";
import { getCourse } from "./currency";

dotenv.config();

interface SessionData {
  step: string | null;
}

type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>(
  process.env.TOKEN || "7277823713:AAEsa6S2pNROUHJZPblkoKnehtseazMh9Bs"
);

bot.use(session({ initial: (): SessionData => ({ step: null }) }));

bot.api.setMyCommands([
  { command: "start", description: "Начать работу" },
  { command: "send_link_course", description: "Купить курс" },
]);

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Отправить ссылку  курсом", "send_link_course")
    .row()
    .url("Открыть Udemy", "https://www.udemy.com/");

  //  const course = await getCourse("USD", "RUB");

  await ctx.reply(
    "Привет!\nЯ ТГ-бот который тебе поможет купить курс на платформе Udemy  ",
    {
      reply_markup: keyboard,
      parse_mode: "HTML",
    }
  );
});

bot.command("send_link_course", async (ctx) => {
  try {
    ctx.session.step = "waiting_for_link"; // Устанавливаем шаг сессии
    await ctx.reply("Пожалуйста, отправьте свою ссылку курс"); // Запрашиваем ссылку
  } catch (error) {
    console.error("Ошибка при обработке команды send_link_course:", error);
    await ctx.reply("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
  }
});

bot.callbackQuery("send_link_course", async (ctx) => {
  try {
    ctx.session.step = "waiting_for_link";
    await ctx.answerCallbackQuery();
    await ctx.reply("Пожалуйста, отправьте свою ссылку курс");
  } catch (error) {
    console.error("Ошибка при ответе на callbackQuery:", error);
    await ctx.reply("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
  }
});

bot.on("message:text", async (ctx) => {
  if (ctx.session.step === "waiting_for_link") {
    const userLink = ctx.message.text;
    try {
      const url = new URL(userLink);
      if (url.hostname === "www.udemy.com" || url.hostname === "udemy.com") {
        ctx.session.step = null;

        // Отправка сообщения о загрузке
        const loadingMessage = await ctx.reply("Загрузка данных курса, пожалуйста, подождите...");

        try {
          const result = await findPrice(userLink);
          const course = await getCourse("USD", "RUB");

          const keyboard = new InlineKeyboard()
            .text("Купить курс", "buy_course")
            .text("Назад", "start");

      
            await ctx.api.editMessageText(
              ctx.chat.id,
              loadingMessage.message_id,
              `📚 *Название курса:* ${result.title || "Неизвестно"}\n💵 *Цена курса:* ${
                result.price
                  ? `${Math.round(result.price * course).toFixed(2)}₽`
                  : "Не удалось определить цену"
              } 🛒`,
              {
                parse_mode: "Markdown",
                reply_markup: keyboard,
              }
            );
            
        } catch (err) {
   
          await ctx.api.editMessageText(
            ctx.chat.id,
            loadingMessage.message_id,
            "Произошла ошибка при получении данных курса. Попробуйте позже."
          );
        }
      } else {
        await ctx.reply("Ссылка не относится к udemy.com. Попробуйте снова.");
      }
    } catch (e: any) {
      await ctx.reply("Некорректная ссылка. Попробуйте снова.");
    }
  } else {
    await ctx.reply(
      "Я пока не знаю, что с этим делать. Нажмите кнопку, чтобы начать."
    );
  }
});

bot.start({ onStart: () => console.log("✅ Бот успешно запущен!") });
