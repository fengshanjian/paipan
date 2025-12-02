import { getLiuYaoPaiPan } from './src/utils/liuyao.js';

console.log('Testing Liu Yao Pai Pan...');

const date = new Date();
const result = getLiuYaoPaiPan(date, 2000);

console.log('Date:', result.dateStr);
console.log('GanZhi:', result.ganZhi);
console.log('Ben Ming:', result.benMing);
console.log('Xing Nian:', result.xingNian);
console.log('Day Void:', result.dayXunKong);
console.log('Hour Void:', result.hourXunKong);
console.log('Ben Gua:', result.benGua.name);
console.log('Bian Gua:', result.bianGua ? result.bianGua.name : 'None');
console.log('Moving Yao:', result.movingYao);
console.log('Shen Sha:', result.shenSha);

console.log('Ben Gua Lines:');
result.benGua.yaoData.forEach(yao => {
  console.log(`${yao.position}爻: ${yao.stem}${yao.branch} (${yao.wuxing}) ${yao.yinYang === 1 ? 'Yang' : 'Yin'}`);
});
