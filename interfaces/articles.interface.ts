import { StaticImageData } from "next/image";

export interface TArticle {
  id: number;
  avatar: string;
  title: string;
  time_stamp: string;
  img: StaticImageData;
}
