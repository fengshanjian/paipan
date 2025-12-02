import { getPaiPan } from './src/utils/qimen.js';

console.log('Testing Qimen Logic...');

const date = new Date('2023-10-01T12:00:00'); // Use a fixed date
console.log('Date:', date.toISOString());

try {
  const result = getPaiPan(date, 'chaibu');
  if (result.error) {
    console.error('Error:', result.error);
  } else {
    console.log('JieQi:', result.jieQi);
    console.log('Ju:', result.type, result.juNum, 'Ju');
    console.log('Yuan:', result.yuan);
    console.log('Day GanZhi:', result.dayGanZhi);
    console.log('Hour GanZhi:', result.hourGanZhi);
    console.log('Xun Leader:', result.xun);
    console.log('Zhi Fu (Star):', result.zhiFuStar);
    console.log('Zhi Shi (Gate):', result.zhiShiGate);
    
    console.log('--- Di Pan ---');
    console.log(result.diPan);
    
    console.log('--- Tian Pan ---');
    console.log(result.tianPan);
    
    console.log('--- Ren Pan ---');
    console.log(result.renPan);
    
    console.log('--- Shen Pan ---');
    console.log(result.shenPan);
  }
} catch (e) {
  console.error('Exception:', e);
}
