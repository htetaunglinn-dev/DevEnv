//icons
import { BsBookmark } from "react-icons/bs";
import {
  PiUserCircleGear,
  PiNewspaperLight,
  PiArticleMediumDuotone,
  PiFireLight,
} from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { RiHome6Line } from "react-icons/ri";
import { FaConnectdevelop } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";

export const discoverData = [
  {
    title: "Home",
    icon: <RiHome6Line size={23} />,
    link: "/",
  },
  {
    title: "Most Viewed",
    icon: <PiFireLight size={23} />,
    link: "/most-viewed",
  },
  // {
  //   title: "Best Authors",
  //   icon: <PiUserCircleGear size={23} />,
  //   link: "/best-authors",
  // },
  // {
  //   title: "Latest News",
  //   icon: <PiNewspaperLight size={23} />,
  //   link: "/latest-news",
  // },
  {
    title: "Technology",
    icon: <FaConnectdevelop size={23} />,
    link: "/technology",
  },
];

export const contributeData = [
  {
    title: "Post article",
    icon: <PiArticleMediumDuotone size={23} />,
    link: "/post-article",
  },
  {
    title: "Suggestion",
    icon: <LiaCommentSolid size={23} />,
    link: "/give-suggestion",
  },
];

export const manageData = [
  // {
  //   title: "History",
  //   icon: <GoHistory size={23} />,
  //   link: "/reading-history",
  // },
  // {
  //   title: "Bookmark",
  //   icon: <BsBookmark size={23} />,
  //   link: "/bookmark",
  // },
];
