import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export const footerIcons = [
  {
    id: 0,
    label: "Website",
    link: "https://www.ranishkunwar.com.np/",
    icon: <CgWebsite />,
  },
  {
    id: 1,
    label: "Facebook",
    link: "https://www.facebook.com/ranish.kunwar.90",
    icon: <AiFillFacebook />,
  },
  {
    id: 2,
    label: "Instagram",
    icon: <AiFillInstagram />,
    link: "https://www.instagram.com/ranish_02/",
  },
  {
    id: 3,
    label: "Github",
    icon: <AiFillGithub />,

    link: "https://github.com/Ranish02",
  },
  {
    id: 4,
    label: "Youtube",
    icon: <AiFillYoutube />,
    link: "https://www.linkedin.com/in/ranish-kunwar-624313233/",
  },
  {
    id: 5,

    label: "Linkedin",
    icon: <AiFillLinkedin />,

    link: "https://www.youtube.com/channel/UC0vkPnEnNcpZGW0S2g38piA",
  },
  // {
  //   id: 5,
  //   label: "Facebook",
  //   icon: <AiFillFacebook />,
  //   link: "",
  // },
];

export const inputsIcons = [
  {
    id: 1,
    label: "Rock",
    icon: <FaRegHandRock />,
  },
  {
    id: 2,
    label: "Paper",
    icon: <FaRegHandPaper />,
  },
  {
    id: 3,
    label: "Scissors",
    icon: <FaRegHandScissors />,
  },
];
