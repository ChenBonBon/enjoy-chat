export const StatusMap: {
  [key: string]: {
    label: string;
    action: string;
    color:
      | "tomato"
      | "red"
      | "ruby"
      | "crimson"
      | "pink"
      | "plum"
      | "purple"
      | "violet"
      | "iris"
      | "indigo"
      | "blue"
      | "cyan"
      | "teal"
      | "jade"
      | "green"
      | "grass"
      | "brown"
      | "orange"
      | "sky"
      | "mint"
      | "lime"
      | "yellow"
      | "amber"
      | "gold"
      | "bronze"
      | "gray";
  };
} = {
  online: { label: "在线", action: "下线", color: "green" },
  offline: { label: "离线", action: "上线", color: "red" },
};

export const userList = [
  {
    name: "BonBon",
    description: "不能就这样过完一生",
    avatar:
      "https://cdn.icon-icons.com/icons2/2121/PNG/512/people_avatar_boy_child_person_icon_131264.png",
  },
  {
    name: "Karen",
    description: "超级无敌美丽的Facebook营销",
    avatar:
      "https://cdn.icon-icons.com/icons2/2121/PNG/512/people_avatar_woman_girl_female_icon_131274.png",
  },
  {
    name: "JioJio",
    description: "快乐的小橘猫",
    avatar:
      "https://img0.baidu.com/it/u=1576999405,2897101128&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
  },
  {
    name: "Strawberry",
    description: "脾气好好好的布偶猫",
    avatar:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F30%2F20180730142926_UzU2r.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1696168946&t=8eb989c707f4ed0fcd0d14b9db14c0e1",
  },
];
