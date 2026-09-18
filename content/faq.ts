export type FaqItem = { q: string; a: string[] };

export const faq = {
  headline: "Frequently asked Questions",
  items: [
    {
      q: "What is Fruitful?",
      a: [
        "Fruitful is a personal finance platform that shows you what to do with your money, then makes it happen. You get a money system built for you, 1-on-1 help from CFP® professionals, and smarter ways to spend, save, and invest, all working together to keep you organized and moving toward your goals.",
      ],
    },
    {
      q: "What is a Money Map?",
      a: [
        "Your Money Map is the personalized plan for your money. It shows you exactly where every paycheck should go, across bills, spending, saving, investing, and when you’ll hit your goals. Then Fruitful helps you put it all into action automatically.",
      ],
    },
    {
      q: "How much does Fruitful cost?",
      a: [
        "There’s no cost to get started with Fruitful. You can get fully set up, meet with your Guide, use your money system, and access Fruitful’s financial products with no membership fee. Some fees may apply depending on how you invest.",
        "When you sign up, your first 3 months of Premium are included at no cost. After that, you can keep Premium for $999/year or continue with Fruitful at $0 membership. Either way, your Money System keeps working for you.",
        "Premium gives you more ongoing access to your Guide, higher rewards, and no investment management fees.",
        "Learn more about Fruitful Premium →",
      ],
    },
    {
      q: "What is a Fruitful Guide?",
      a: [
        "Think of your Guide as a personal financial expert. They’re a CFP® professional who gets to know you, your money, and your goals, then helps you fine-tune your Money Map, make smart decisions, and put your plan into action.",
        "Every Fruitful Guide is a CERTIFIED FINANCIAL PLANNER™ professional, which means they’ve met rigorous standards for education, experience, and ethics, and are required to put your interests first. They’re also registered investment adviser representatives with Fruitful.",
      ],
    },
    {
      q: "How do I connect with my Guide?",
      a: [
        "We’ll get your money system set-up and working through 1-to-1 video sessions focused on organizing your finances, setting goals, building wealth, and making real progress. Once we’ve built a strong foundation and set up your system, we’ll help you keep growing while adapting to whatever life throws your way by providing ongoing advice and support through anytime messaging and ongoing sessions. Feel supported at every stage of your journey, wherever it leads.",
        "Learn more about what’s included in your membership here.",
      ],
    },
    {
      q: "How do I know I can trust Fruitful?",
      a: [
        "At Fruitful, your money is held with established financial institutions built to keep it safe.",
        "Fruitful Cash accounts are held at Emigrant Bank, Member FDIC, a bank founded in 1850 and one of the largest privately held banks in the country.",
        "Your investments are held and cleared by Apex Clearing Corporation, Member FINRA/SIPC, one of the largest investment custodians in the U.S. Apex holds more than $276 billion in assets.",
        "And the people helping you make financial decisions are held to high standards, too. Fruitful Advisory is an SEC-registered investment adviser, and every Fruitful Guide is a CERTIFIED FINANCIAL PLANNER™ professional and investment adviser representative.",
      ],
    },
    {
      q: "How do I contact Fruitful?",
      a: [
        "For general inquiries, email hello@fruitful.com.",
        "For member support, email support@fruitful.com.",
      ],
    },
  ] satisfies FaqItem[],
};
