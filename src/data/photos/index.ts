import { photosPart1 } from "./part1";
import { photosPart2 } from "./part2";
import { photosPart3 } from "./part3";
import { photosPart4 } from "./part4";
import { photosPart5 } from "./part5";

// All wife photos compiled directly into code for 100% reliable deployment on Netlify/Vercel/GitHub
export const ALL_WIFE_PHOTOS: string[] = [
  ...photosPart1, ...photosPart2, ...photosPart3, ...photosPart4, ...photosPart5
];
