// 64 Hexagrams Data
// Import complete Yao Ci data
import { COMPLETE_YAOCI } from './hexagram_yaoci_data.js';

// Structure:
// name: Hexagram Name
// up: Upper Trigram Index (0-7: Qian, Dui, Li, Zhen, Xun, Kan, Gen, Kun)
// down: Lower Trigram Index
// lines: Array of 6 lines (0: Yin, 1: Yang) - usually stored bottom to top
// yaoCi: Array of 6 strings (Yao Ci for each line)
// guaCi: String (Hexagram Statement)

export const TRIGRAMS = [
  { name: '乾', nature: '天', element: '金', lines: [1, 1, 1] }, // 0: Qian
  { name: '兑', nature: '泽', element: '金', lines: [1, 1, 0] }, // 1: Dui (Bottom Yang, Mid Yang, Top Yin)
  { name: '离', nature: '火', element: '火', lines: [1, 0, 1] }, // 2: Li (Bottom Yang, Mid Yin, Top Yang)
  { name: '震', nature: '雷', element: '木', lines: [1, 0, 0] }, // 3: Zhen (Bottom Yang, Mid Yin, Top Yin)
  { name: '巽', nature: '风', element: '木', lines: [0, 1, 1] }, // 4: Xun (Bottom Yin, Mid Yang, Top Yang)
  { name: '坎', nature: '水', element: '水', lines: [0, 1, 0] }, // 5: Kan (Bottom Yin, Mid Yang, Top Yin)
  { name: '艮', nature: '山', element: '土', lines: [0, 0, 1] }, // 6: Gen (Bottom Yin, Mid Yin, Top Yang)
  { name: '坤', nature: '地', element: '土', lines: [0, 0, 0] }  // 7: Kun
];

// 64 Hexagrams in King Wen sequence or generated systematically?
// It's easier to generate them or map them if we know the Upper/Lower indices.
// But we need the specific Yao Ci for each.
// For MVP, I will include a subset or placeholders, and maybe a few full examples.
// User asked for "Corresponding Yao Ci", so I should try to provide them.
// Since I cannot browse the web for a full JSON, I will use a generated structure 
// and populate common ones or use a generic placeholder if specific text is missing,
// but I will try to include at least the names and structures correctly.

// Helper to construct 64 hexagrams
// We can identify them by Upper/Lower trigrams.
// Map: [Upper][Lower] -> Hexagram Data

// Use complete Yao Ci data from imported file
export const HEXAGRAM_DATA = COMPLETE_YAOCI;

// Full list of 64 Hexagram Names by Upper/Lower index (Row: Upper, Col: Lower)
// Indices: 0:Qian, 1:Dui, 2:Li, 3:Zhen, 4:Xun, 5:Kan, 6:Gen, 7:Kun

export const HEXAGRAM_NAMES = [
  // Lower: Qian, Dui, Li, Zhen, Xun, Kan, Gen, Kun
  // Upper Qian (0)
  ['乾为天', '天泽履', '天火同人', '天雷无妄', '天风姤', '天水讼', '天山遁', '天地否'],
  // Upper Dui (1)
  ['泽天夬', '兑为泽', '泽火革', '泽雷随', '泽风大过', '泽水困', '泽山咸', '泽地萃'],
  // Upper Li (2)
  ['火天大有', '火泽睽', '离为火', '火雷噬嗑', '火风鼎', '火水未济', '火山旅', '火地晋'],
  // Upper Zhen (3)
  ['雷天大壮', '雷泽归妹', '雷火丰', '震为雷', '雷风恒', '雷水解', '雷山小过', '雷地豫'],
  // Upper Xun (4)
  ['风天小畜', '风泽中孚', '风火家人', '风雷益', '巽为风', '风水涣', '风山渐', '风地观'],
  // Upper Kan (5)
  ['水天需', '水泽节', '水火既济', '水雷屯', '水风井', '坎为水', '水山蹇', '水地比'],
  // Upper Gen (6)
  ['山天大畜', '山泽损', '山火贲', '山雷颐', '山风蛊', '山水蒙', '艮为山', '山地剥'],
  // Upper Kun (7)
  ['地天泰', '地泽临', '地火明夷', '地雷复', '地风升', '地水师', '地山谦', '坤为地']
];

// Najia Mapping (Stems for Trigrams)
// Qian: Jia (Inner), Ren (Outer)
// Kun: Yi (Inner), Gui (Outer)
// Zhen: Geng
// Xun: Xin
// Kan: Wu
// Li: Ji
// Gen: Bing
// Dui: Ding
export const NAJIA_STEMS = {
  0: { inner: '甲', outer: '壬' }, // Qian
  1: { inner: '丁', outer: '丁' }, // Dui
  2: { inner: '己', outer: '己' }, // Li
  3: { inner: '庚', outer: '庚' }, // Zhen
  4: { inner: '辛', outer: '辛' }, // Xun
  5: { inner: '戊', outer: '戊' }, // Kan
  6: { inner: '丙', outer: '丙' }, // Gen
  7: { inner: '乙', outer: '癸' }  // Kun
};

// Najia Mapping (Branches for Trigrams)
// Qian: Zi Yin Chen (Inner), Wu Shen Xu (Outer)
// Kun: Wei Si Mao (Inner), Chou Hai You (Outer) -> Note: Kun is special
// ...
export const NAJIA_BRANCHES = {
  0: { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] }, // Qian (Yang)
  1: { inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'] }, // Dui (Yin)
  2: { inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'] }, // Li (Yin)
  3: { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] }, // Zhen (Yang)
  4: { inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'] }, // Xun (Yin)
  5: { inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'] }, // Kan (Yang)
  6: { inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'] }, // Gen (Yang)
  7: { inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'] }  // Kun (Yin)
};

// Five Elements of Branches
export const ZHI_WUXING = {
  '子': '水', '亥': '水',
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// Six Relations (Liu Qin) - determined by relationship to Hexagram Element (Self)
// Generate on the fly based on Wu Xing relationship
