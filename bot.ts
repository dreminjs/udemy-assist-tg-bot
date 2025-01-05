import { Bot, InlineKeyboard, session, Context, SessionFlavor } from "grammy";

import * as dotenv from "dotenv";
import { findPrice } from "./parser";

dotenv.config();

interface SessionData {
  step: string | null;
}

type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>(
  process.env.TOKEN || "7277823713:AAEsa6S2pNROUHJZPblkoKnehtseazMh9Bs"
);

bot.use(session({ initial: (): SessionData => ({ step: null }) }));

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard().text(
    "Отправить ссылку с курсом",
    "send_link_course"
  );

  await ctx.reply("Нажмите кнопку ниже, чтобы отправить ссылку:", {
    reply_markup: keyboard,
  });
});

bot.callbackQuery("send_link_course", async (ctx) => {
  ctx.session.step = "waiting_for_link";
  await ctx.answerCallbackQuery();
  await ctx.reply("Пожалуйста, отправьте свою ссылку курс");
});

bot.on("message:text", async (ctx) => {
  if (ctx.session.step === "waiting_for_link") {
    const userLink = ctx.message.text;
    try {
      const url = new URL(userLink);
      if (url.hostname === "www.udemy.com" || url.hostname === "udemy.com") {
        ctx.session.step = null;
        const result = await findPrice(userLink);

        await ctx.reply(
          `Ссылка: ${userLink}\n\nНазвание курса: ${result.title}\nЦена: ${result.price}`
        );
      } else {
        await ctx.reply("Ссылка не относится к udemy.com. Попробуйте снова.");
      }
    } catch {
      await ctx.reply("Это не похоже на правильную ссылку. Попробуйте снова.");
    }
  } else {
    await ctx.reply(
      "Я пока не знаю, что с этим делать. Нажмите кнопку, чтобы начать."
    );
  }
});

bot.start({ onStart: () => console.log("✅ Бот успешно запущен!") });
