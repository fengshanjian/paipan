import { Lunar, Solar, EightChar, LunarUtil } from 'lunar-javascript';

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// Get Na Yin (纳音) for a Gan-Zhi pair
const getNaYin = (ganZhi) => {
  const naYinMap = {
    '甲子': '海中金', '乙丑': '海中金',
    '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木',
    '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金',
    '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水',
    '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金',
    '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水',
    '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火',
    '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水',
    '甲午': '砂石金', '乙未': '砂石金',
    '丙申': '山下火', '丁酉': '山下火',
    '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土',
    '壬寅': '金箔金', '癸卯': '金箔金',
    '甲辰': '覆灯火', '乙巳': '覆灯火',
    '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土',
    '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木',
    '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '沙中土', '丁巳': '沙中土',
    '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木',
    '壬戌': '大海水', '癸亥': '大海水'
  };
  return naYinMap[ganZhi] || '';
};

// 十神 (Ten Gods) lookup based on day stem vs other stem
const getTenGod = (dayStem, otherStem) => {
  const dayGanIdx = GAN.indexOf(dayStem);
  const otherGanIdx = GAN.indexOf(otherStem);
  
  // 比肩 (same stem)
  if (dayStem === otherStem) return '比肩';
  
  // 劫财 (same element, opposite yin-yang)
  const dayYang = dayGanIdx % 2 === 0;
  const otherYang = otherGanIdx % 2 === 0;
  const sameElement = Math.floor(dayGanIdx / 2) === Math.floor(otherGanIdx / 2);
  
  if (sameElement) return '劫财';
  
  // Five elements relationship
  const elements = ['木', '火', '土', '金', '水'];
  const dayElement = elements[Math.floor(dayGanIdx / 2)];
  const otherElement = elements[Math.floor(otherGanIdx / 2)];
  
  const elementIdx = elements.indexOf(dayElement);
  const otherIdx = elements.indexOf(otherElement);
  
  // I produce (食神/伤官)
  if ((elementIdx + 1) % 5 === otherIdx) {
    return dayYang === otherYang ? '食神' : '伤官';
  }
  
  // Produces me (正印/偏印)
  if ((otherIdx + 1) % 5 === elementIdx) {
    return dayYang === otherYang ? '偏印' : '正印';
  }
  
  // I overcome (正财/偏财)
  if ((elementIdx + 2) % 5 === otherIdx) {
    return dayYang === otherYang ? '偏财' : '正财';
  }
  
  // Overcomes me (正官/七杀)
  if ((otherIdx + 2) % 5 === elementIdx) {
    return dayYang === otherYang ? '七杀' : '正官';
  }
  
  return '';
};

// Shen Sha Helpers
const getShenSha = (dayGan, dayZhi, yearZhi, zhi) => {
  const shenSha = [];
  
  // 天乙贵人 (Tian Yi Gui Ren) - Based on Day Gan or Year Gan (usually Day Gan)
  const tianYiMap = {
    '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
    '乙': ['子', '申'], '己': ['子', '申'],
    '丙': ['亥', '酉'], '丁': ['亥', '酉'],
    '壬': ['巳', '卯'], '癸': ['巳', '卯'],
    '辛': ['午', '寅']
  };
  if (tianYiMap[dayGan]?.includes(zhi)) shenSha.push('天乙贵人');

  // 驿马 (Yi Ma) - Based on Day Zhi or Year Zhi
  const yiMaMap = {
    '申': '寅', '子': '寅', '辰': '寅',
    '寅': '申', '午': '申', '戌': '申',
    '亥': '巳', '卯': '巳', '未': '巳',
    '巳': '亥', '酉': '亥', '丑': '亥'
  };
  if (yiMaMap[dayZhi] === zhi || yiMaMap[yearZhi] === zhi) shenSha.push('驿马');

  // 桃花 (Tao Hua) - Based on Day Zhi or Year Zhi
  const taoHuaMap = {
    '申': '酉', '子': '酉', '辰': '酉',
    '寅': '卯', '午': '卯', '戌': '卯',
    '亥': '子', '卯': '子', '未': '子',
    '巳': '午', '酉': '午', '丑': '午'
  };
  if (taoHuaMap[dayZhi] === zhi || taoHuaMap[yearZhi] === zhi) shenSha.push('桃花');

  // 禄神 (Lu Shen) - Based on Day Gan
  const luShenMap = {
    '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳',
    '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子'
  };
  if (luShenMap[dayGan] === zhi) shenSha.push('禄神');

  // 羊刃 (Yang Ren) - Based on Day Gan
  const yangRenMap = {
    '甲': '卯', '乙': '辰', '丙': '午', '丁': '未', '戊': '午',
    '己': '未', '庚': '酉', '辛': '戌', '壬': '子', '癸': '丑'
  };
  if (yangRenMap[dayGan] === zhi) shenSha.push('羊刃');

  // 文昌 (Wen Chang) - Based on Day Gan
  const wenChangMap = {
    '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
    '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯'
  };
  if (wenChangMap[dayGan] === zhi) shenSha.push('文昌');
  
  // 魁罡 (Kui Gang) - Only for Day Pillar
  // Usually checked at pillar level, but can be partial here if needed. 
  // We will handle Kui Gang separately or check if current pillar is Kui Gang.
  
  return shenSha;
};

// Interaction Helpers
const getInteractions = (zhis) => {
  const interactions = [];
  const zhiSet = new Set(zhis);
  
  // 三合 (San He)
  const sanHeGroups = [
    { name: '申子辰合水', group: ['申', '子', '辰'] },
    { name: '寅午戌合火', group: ['寅', '午', '戌'] },
    { name: '亥卯未合木', group: ['亥', '卯', '未'] },
    { name: '巳酉丑合金', group: ['巳', '酉', '丑'] }
  ];
  sanHeGroups.forEach(sh => {
    const count = sh.group.filter(z => zhiSet.has(z)).length;
    if (count === 3) interactions.push(sh.name);
    else if (count === 2) interactions.push(`半合${sh.name.slice(3)}`); // Simplified half combo
  });

  // 六合 (Liu He) - Check adjacent pillars usually, but here checking presence in chart
  // For simplicity in this summary, we list present pairs.
  const liuHeMap = {
    '子': '丑', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申', '午': '未'
  };
  // Logic for Liu He is typically between specific pillars, but global presence is also noted.
  // We will refine this to check pairs if needed, or just list potential combos.
  
  // 六冲 (Liu Chong)
  const liuChongMap = {
    '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥'
  };
  
  // Check for interactions between specific pillars (Year, Month, Day, Hour)
  const pillars = ['年', '月', '日', '时'];
  for (let i = 0; i < zhis.length; i++) {
    for (let j = i + 1; j < zhis.length; j++) {
      const z1 = zhis[i];
      const z2 = zhis[j];
      
      // Liu He
      if (liuHeMap[z1] === z2 || liuHeMap[z2] === z1) {
        interactions.push(`${pillars[i]}${pillars[j]}六合`);
      }
      
      // Liu Chong
      if (liuChongMap[z1] === z2 || liuChongMap[z2] === z1) {
        interactions.push(`${pillars[i]}${pillars[j]}相冲`);
      }
    }
  }

  return [...new Set(interactions)]; // Remove duplicates
};

// Get hidden stems for earth branch
const getHiddenStems = (zhi) => {
  const hiddenStems = {
    '子': { '主气': '癸' },
    '丑': { '主气': '己', '中气': '癸', '余气': '辛' },
    '寅': { '主气': '甲', '中气': '丙', '余气': '戊' },
    '卯': { '主气': '乙' },
    '辰': { '主气': '戊', '中气': '乙', '余气': '癸' },
    '巳': { '主气': '丙', '中气': '庚', '余气': '戊' },
    '午': { '主气': '丁', '中气': '己' },
    '未': { '主气': '己', '中气': '丁', '余气': '乙' },
    '申': { '主气': '庚', '中气': '壬', '余气': '戊' },
    '酉': { '主气': '辛' },
    '戌': { '主气': '戊', '中气': '辛', '余气': '丁' },
    '亥': { '主气': '壬', '中气': '甲' }
  };
  return hiddenStems[zhi] || {};
};

export function getBaZiPaiPan(date, birthYear = 2000, gender = '男') {
  const lunar = Lunar.fromDate(date);
  const solar = Solar.fromDate(date);
  const eightChar = lunar.getEightChar();
  
  // Basic info
  const yearGanZhi = eightChar.getYear();
  const monthGanZhi = eightChar.getMonth();
  const dayGanZhi = eightChar.getDay();
  const hourGanZhi = eightChar.getTime();
  
  const dayStem = dayGanZhi[0];
  
  // Build pillar data
  const buildPillar = (ganZhi, pillarName) => {
    const gan = ganZhi[0];
    const zhi = ganZhi.substring(1);
    const hidden = getHiddenStems(zhi);
    const tenGod = pillarName !== '日柱' ? getTenGod(dayStem, gan) : '日主';
    
    // Get element for gan
    const ganIdx = GAN.indexOf(gan);
    const elements = ['木', '火', '土', '金', '水'];
    const ganElement = elements[Math.floor(ganIdx / 2)];
    const ganYinYang = ganIdx % 2 === 0 ? '阳' : '阴';
    
    // Get element for zhi 
    const zhiIdx = ZHI.indexOf(zhi);
    const zhiElements = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
    const zhiElement = zhiElements[zhiIdx];
    const zhiYinYang = zhiIdx % 2 === 0 ? '阳' : '阴';
    
    // Build hidden stems with ten gods
    const cangGan = {};
    Object.entries(hidden).forEach(([type, stem]) => {
      cangGan[type] = {
        '天干': stem,
        '十神': getTenGod(dayStem, stem)
      };
    });

    // Calculate Shen Sha for this pillar
    const shenSha = getShenSha(dayStem, dayGanZhi[1], yearGanZhi[1], zhi);
    
    return {
      '干支': ganZhi,
      '天干': {
        '天干': gan,
        '五行': ganElement,
        '阴阳': ganYinYang,
        '十神': tenGod
      },
      '地支': {
        '地支': zhi,
        '五行': zhiElement,
        '阴阳': zhiYinYang,
        '藏干': cangGan
      },
      '纳音': getNaYin(ganZhi),
      '神煞': shenSha
    };
  };
  
  const yearPillar = buildPillar(yearGanZhi, '年柱');
  const monthPillar = buildPillar(monthGanZhi, '月柱');
  const dayPillar = buildPillar(dayGanZhi, '日柱');
  const hourPillar = buildPillar(hourGanZhi, '时柱');

  // Calculate Interactions
  const pillarsZhi = [yearGanZhi[1], monthGanZhi[1], dayGanZhi[1], hourGanZhi[1]];
  const interactions = getInteractions(pillarsZhi);
  
  // Get Da Yun (Big Luck)
  const yun = eightChar.getYun(gender === '男' ? 1 : 0);
  const startAge = yun.getStartYear(); // This returns the starting age in years
  const daYunList = yun.getDaYun();
  
  const daYun = daYunList.slice(0, 10).map((dy, idx) => {
    const ganZhi = dy.getGanZhi();
    const gan = ganZhi[0];
    const zhi = ganZhi.substring(1);
    const hidden = getHiddenStems(zhi);
    const ageStart = startAge + idx * 10;
    const ageEnd = ageStart + 9;
    const yearStart = birthYear + ageStart;
    const yearEnd = birthYear + ageEnd;
    
    return {
      '干支': ganZhi,
      '开始年份': yearStart,
      '结束年份': yearEnd,
      '天干十神': getTenGod(dayStem, gan),
      '地支藏干': Object.values(hidden),
      '地支十神': Object.values(hidden).map(stem => getTenGod(dayStem, stem)),
      '开始年龄': ageStart,
      '结束年龄': ageEnd
    };
  });
  
  return {
    '性别': gender,
    '阳历': solar.toYmdHms(),
    '农历': lunar.toString(),
    '八字': `${yearGanZhi} ${monthGanZhi} ${dayGanZhi} ${hourGanZhi}`,
    '生肖': lunar.getYearShengXiao(),
    '日主': dayStem,
    '年柱': yearPillar,
    '月柱': monthPillar,
    '日柱': dayPillar,
    '时柱': hourPillar,
    '胎元': eightChar.getTaiYuan(),
    '命宫': eightChar.getMingGong(),
    '身宫': eightChar.getShenGong(),
    '大运': {
      '起运年龄': startAge,
      '大运': daYun
    },
    '刑冲合会': interactions,
    dateStr: date.toLocaleString(),
    birthYear
  };
}
