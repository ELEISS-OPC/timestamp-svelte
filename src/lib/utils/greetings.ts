import { toTitleCase } from "layerchart/utils/string";

type GreetingType = "timeIn" | "timeOut";

const greetings = {
  timeIn: {
    morning: [
      "Good morning! Ready for a productive day?",
      "Let's get started—have a great morning!",
      (name: string) => `Good morning, ${name}! Let's make today count.`,
      (name: string) => `Morning, ${name}! Hope you have a productive day.`,
    ],
    afternoon: [
      "Good afternoon! Let's make the rest of the day count.",
      "Back at it—hope your day's going well!",
      (name: string) => `Good afternoon, ${name}! Let's keep it going.`,
      (name: string) => `Hey ${name}, let's finish strong today.`,
    ],
    night: [
      "Good evening! Let's wrap up the day strong.",
      "Evening shift—let's do this!",
      (name: string) => `Good evening, ${name}! Let's have a smooth shift.`,
      (name: string) => `Hey ${name}, let's make tonight productive.`,
    ],
  },

  timeOut: {
    morning: [
      "All done early—nice work!",
      "Great job this morning!",
      (name: string) => `Nice work this morning, ${name}!`,
      (name: string) => `Good job wrapping up early, ${name}!`,
    ],
    afternoon: [
      "That's a wrap—great job today!",
      "Good work today! Enjoy your afternoon.",
      (name: string) => `Nice job today, ${name}!`,
      (name: string) => `Great work today, ${name}! Enjoy your rest.`,
    ],
    night: [
      "Great job today—time to rest!",
      "All done for today. Take it easy!",
      (name: string) => `Good work today, ${name}! You've earned the rest.`,
      (name: string) => `That's a wrap, ${name}! Have a good night.`,
    ],
  },
};

export function getTimeCategory(
  date = new Date(),
): "morning" | "afternoon" | "night" {
  const hour = date.getHours();

  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "night";
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getGreeting(
  type: GreetingType,
  name?: string,
  date = new Date(),
): string {
  const category = getTimeCategory(date);
  const pool = greetings[type][category];

  const item = pickRandom(pool);

  if (typeof item === "function") {
    return name ? item(toTitleCase(name)) : item("friend");
  }

  return item;
}
