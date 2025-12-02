export const JIE_QI_JU = {
  "冬至": [1, 7, 4],
  "小寒": [2, 8, 5],
  "大寒": [3, 9, 6],
  "立春": [8, 5, 2],
  "雨水": [9, 6, 3],
  "惊蛰": [1, 7, 4],
  "春分": [3, 9, 6],
  "清明": [4, 1, 7],
  "谷雨": [5, 2, 8],
  "立夏": [4, 1, 7],
  "小满": [5, 2, 8],
  "芒种": [6, 3, 9],
  "夏至": [9, 3, 6],
  "小暑": [8, 2, 5],
  "大暑": [7, 1, 4],
  "立秋": [2, 5, 8],
  "处暑": [1, 4, 7],
  "白露": [9, 3, 6],
  "秋分": [7, 1, 4],
  "寒露": [6, 9, 3],
  "霜降": [5, 8, 2],
  "立冬": [6, 9, 3],
  "小雪": [5, 8, 2],
  "大雪": [4, 7, 1]
};

export const YANG_DUN_JIE_QI = [
  "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰",
  "春分", "清明", "谷雨", "立夏", "小满", "芒种"
];

export const YIN_DUN_JIE_QI = [
  "夏至", "小暑", "大暑", "立秋", "处暑", "白露",
  "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"
];

export const GUA_GONG = {
  1: "坎", 2: "坤", 3: "震", 4: "巽", 5: "中", 6: "乾", 7: "兑", 8: "艮", 9: "离"
};

// 9 Stars (Tian Pan) - Order: Peng, Rui, Chong, Fu, Ying, Xin, Zhu, Ren, Peng?
// Standard Order on the plate (clockwise from Kan 1? No, fixed positions):
// 1: Peng, 2: Rui, 3: Chong, 4: Fu, 9: Ying, 8: Ren, 7: Zhu, 6: Xin.
// Wait, let's list them by original palace.
// Kan 1: Tian Peng
// Kun 2: Tian Rui
// Zhen 3: Tian Chong
// Xun 4: Tian Fu
// Zhong 5: Tian Qin (usually moves with Rui)
// Qian 6: Tian Xin
// Dui 7: Tian Zhu
// Gen 8: Tian Ren
// Li 9: Tian Ying
export const STARS = {
  1: "天蓬", 2: "天芮", 3: "天冲", 4: "天辅", 5: "天禽", 6: "天心", 7: "天柱", 8: "天任", 9: "天英"
};

// 8 Gates (Ren Pan)
// Kan 1: Xiu
// Kun 2: Si
// Zhen 3: Shang
// Xun 4: Du
// Zhong 5: (Empty/No Gate)
// Qian 6: Kai
// Dui 7: Jing
// Gen 8: Sheng
// Li 9: Jing (View)
export const GATES = {
  1: "休门", 2: "死门", 3: "伤门", 4: "杜门", 6: "开门", 7: "惊门", 8: "生门", 9: "景门"
};

// 8 Gods (Shen Pan) - Order: Zhi Fu, Teng She, Tai Yin, Liu He, Bai Hu, Xuan Wu, Jiu Di, Jiu Tian.
// (Yang Dun order. Yin Dun is reverse?)
export const GODS = [
  "值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"
];

export const BRANCH_TO_PALACE = {
  '子': 1, '丑': 8, '寅': 8, '卯': 3, '辰': 4, '巳': 4,
  '午': 9, '未': 2, '申': 2, '酉': 7, '戌': 6, '亥': 6
};
// Yin Dun: Zhi Fu, Teng She, Tai Yin, Liu He, Bai Hu (or Gou Chen?), Xuan Wu (or Zhu Que?), ...
// Actually:
// Yang Dun: Zhi Fu, Teng She, Tai Yin, Liu He, Bai Hu, Xuan Wu, Jiu Di, Jiu Tian.
// Yin Dun: Zhi Fu, Teng She, Tai Yin, Liu He, Bai Hu, Xuan Wu, Jiu Di, Jiu Tian (Move Counter-Clockwise? Or Sequence Reverse?)
// Usually the sequence is the same, but they are distributed counter-clockwise on the plate?
// No, for Yin Dun, the gods are arranged in reverse order?
// Standard:
// Yang Dun: Clockwise.
// Yin Dun: Counter-Clockwise.
