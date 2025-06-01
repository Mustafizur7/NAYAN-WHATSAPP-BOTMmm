const axios = require("axios");
const selectionData = {};

module.exports = {
    config: {
      name: "bot",
      aliases: ["sim"],
      permission: 0,
      prefix: "both",
      categorie: "AI Chat",
      cooldowns: 5,
      credit: "Developed by Mohammad Nayan",
      usages: [
        `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
        `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
      ],
      description: "Engage in conversations with an AI-powered bot!",
    },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, replyMessage, message} = event;

  
    if (!selectionData[threadId]) return;
    const { n, userId } = selectionData[threadId];

    
    if (userId !== senderId || !n) return;

    

    const quotedMessage =
      n.message?.extendedTextMessage?.text || null;

    if (!quotedMessage || replyMessage !== quotedMessage) return;
    

    try {

        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },

  start: async ({ event, api, args }) => {
    const usermsg = args.join(" ");
    const { threadId, senderId, message} = event;

    
    if (!usermsg) {
      const greetings = [
        "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
        "কি গো সোনা আমাকে ডাকছ কেনো",
        "বার বার আমাকে ডাকস কেন😡",
        "মুস্তাফিজুর বসকে ডাকবি না। ও শুধু প্রেমা র"'
        " প্রেমা আর মোস্তাফিজুর বস এর ভালোবাসা অনেক সুন্দর",
        "বস মুস্তাফিজুর প্রেমা কে রাতে ভালোবাসে",
        "আমাকে না ডেকে মুস্তাফিজুর বস কে ummmmmah 💋দে",
        "Eto dakis na.Mustafizur boss prema r sathe cipay ace 😘😘",
        "আর ডাকিস না। বস মুস্তাফিজুর রেগে গেছে",
        "এতো ডেকে লাভ নাই। মুস্তাফিজুর বস কারো সাথে ফিরিত করে না। ",
        "কিরে ডাকস কেন। coklet খাবি",
        " বান্ধবী ললিতা। কিছু বলবা । বলে লাভ নেই",
        "আর যাবো না বেগুল তুলিতে ও ললিতে আর যাবো না বেগুন তুলিতে",
        " চুপ কথা নাই তর সাথে । ",
        " মুস্তাফিজুর বস কে i love you বল । নিশি রাতের বাজনা শুনতে পাবি",
        " এখন তো ডাকবি । শয়তান দূর হ",
        "কাগজের নোটের কাছে হেরে গেছে,সকালের ঘুম বিকেলের খেলা-ধুলা.!",
        "কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧",
        "আস্সালামু আলাইকুম । বলেন কি করতে পারি",
        " মুস্তাফিজুর বস প্রেমা র জামাই।কুনো মেয়ে ডাকবি না আমায়",
        "কিছু বলবি।জলদি বল।মুস্তাফিজুর বস প্রেমা ভাবীর সাতে চিপায় আছে",
        " প্রেমা র কথা ছাড়া কারো কথায় শুনি না।",
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const userToMention = senderId;

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${userToMention.split('@')[0]}, ${randomGreeting}`,
        mentions: [userToMention],
      }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: greetingMessage,
      };
      return;
    }

    try {
        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },
};
