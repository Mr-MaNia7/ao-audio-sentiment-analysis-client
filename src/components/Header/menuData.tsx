import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Sentiment",
    path: "/audio-sentiment-analysis",
    newTab: false, 
  },
  {
    id: 3,
    title: "About",
    path: "/about",
    newTab: false,
  },
  // {
  //   id: 4,
  //   title: "Pricing",
  //   path: "/pricing",
  //   newTab: false,
  // },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  {
    id: 6,
    title: "Blog",
    path: "/blogs",
    newTab: false,
  },
];
export default menuData;
