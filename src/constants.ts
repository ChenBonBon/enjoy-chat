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
