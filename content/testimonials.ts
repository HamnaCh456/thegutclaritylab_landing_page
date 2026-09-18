import { cdn } from "./cdn";

export type ReviewCard = { kind: "review"; name: string; title: string; body: string; href: string };
export type PortraitCard = { kind: "portrait"; name: string; role: string; quote: string; image: string };
export type TestimonialCard = ReviewCard | PortraitCard;

const portrait = (name: string, quote: string, image: string): PortraitCard => ({
  kind: "portrait",
  name,
  role: "Fruitful Member",
  quote,
  image,
});

export const testimonials = {
  headline: "People love Fruitful.",
  readMore: "Read more",
  cta: { label: "Go to Review Page", href: "https://www.trustpilot.com/review/fruitful.com" },
  cards: [
    {
      kind: "review",
      name: "Sydney D.",
      title: "I love having a fruitful membership!",
      body: "I love having a fruitful membership!! I was recommended by a friend and the expectations lived up. I love even the process of signing up and finding an advisor, the functionality of the app, feeling in control of my finances, and my advisor Naomi! Discussing finances takes a lot of vulnerability and Naomi has made me feel comfortable and confident. She breaks down my budget in a way that makes sense, hears me out on my goals and priorities, and makes budgets that are attainable. Truly enjoying my experience :)",
      href: "https://www.trustpilot.com/reviews/6907dd7c13761c148177082c",
    },
    portrait(
      "Amy",
      "“It’s given me a lot of peace and clarity around my finances.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e72f2_Amy%20Lima.avif"),
    ),
    {
      kind: "review",
      name: "Kevin",
      title: "Transformational personal finances",
      body: "Money has always felt like a suffocating experience. Working with our Fruitful coach has, for the first time our lives, made us feel like we were putting our money where it mattered most. The low subscription cost is well worth its weight in gold.",
      href: "https://www.trustpilot.com/reviews/67a411692ba94e5182f4cfb3",
    },
    portrait(
      "Kathleen",
      "“It has been pivotal with major life decisions.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e72f3_Kathleen%20Kaufmann.avif"),
    ),
    portrait(
      "Raquel",
      "“I'm excited about the milestones that I've hit.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e7276_Raquel%20Merilus.avif"),
    ),
    {
      kind: "review",
      name: "Christy",
      title: "Have Already Referred 4 Happy Friends!",
      body: "Fruitful was the best decision I’ve made for my finances. I thought I was managing okay — until I joined Fruitful and realized how disorganized things really were. My advisor helped me budget for an out-of-state move, buy a new car, optimize my investments, and start saving for my son’s college. It honestly feels like having a therapist for my finances — and I’ve never felt more in control.",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
    portrait(
      "Eli",
      "“I don't feel like I'm flying by the seat of my pants.”",
      cdn("65b22d2d8aafb9c10048b930/679071ed5930c29edd5e3e55_Eli%20Mann.avif"),
    ),
    {
      kind: "review",
      name: "Jen S.",
      title: "Over a year with Fruitful and thrilled!",
      body: "I have been with Fruitful for over a year now and it’s been an amazing experience! My advisor took the time to understand my challenges and my short- and long-term goals, then developed an easy to follow plan with action steps that helped me make progress quickly. I finally feel like my savings and investments are moving in the right direction and I am no longer feeling anxiety about my financial situation. So happy I took a leap and tried out Fruitful!",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
    {
      kind: "review",
      name: "Jason F.",
      title: "Fruitful has been life changing",
      body: "Fruitful has been life changing. As someone who use to work in the finance industry, I can speak to the value this app and our fruitful guide, Paige, have brought. Not only has she helped us with our budget (which has been awesome) but has also looked into our whole picture including my work benefits to ensure I’m getting the most out of them. She even let me know I had legal benefits that would allow us to set up a will at low cost, something I never even noticed. The money map has also been a game changer. Seriously stress free once you get it set up correctly. Highly recommend!",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
  ] satisfies TestimonialCard[],
};
