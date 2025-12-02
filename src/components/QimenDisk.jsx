import React from 'react';
import classNames from 'classnames';

const PALACE_MAP = [
  { id: 4, name: '巽' }, { id: 9, name: '离' }, { id: 2, name: '坤' },
  { id: 3, name: '震' }, { id: 5, name: '中' }, { id: 7, name: '兑' },
  { id: 8, name: '艮' }, { id: 1, name: '坎' }, { id: 6, name: '乾' }
];

const QimenDisk = ({ data }) => {
  if (!data || data.error) return <div className="text-red-500">{data?.error || 'No Data'}</div>;

  const renderCell = (palaceId) => {
    const isCenter = palaceId === 5;
    
    // Data for this palace
    const star = data.tianPan[palaceId];
    const gate = data.renPan[palaceId];
    const god = data.shenPan[palaceId];
    const diStem = data.diPan[palaceId];
    const tianStem = data.tianPanStems[palaceId];
    const anGan = data.anGan[palaceId];
    
    const isMa = data.maXingPalace === palaceId;
    const isKong = data.kongWangPalaces.includes(palaceId);
    
    if (isCenter) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-yellow-50/50 gap-1">
          <div className="text-gray-400 text-sm">中宫</div>
          <div className="flex gap-2">
            <div className="flex flex-col items-center opacity-60">
              <span className="text-[8px] text-gray-400">暗</span>
              <span className="font-bold text-sm text-gray-600">{anGan}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] text-gray-500">地</span>
              <span className="font-bold text-xl text-amber-800">{diStem}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={classNames("flex flex-col h-full p-1 relative", {
        "bg-gray-100": isKong // Background color for Void
      })}>
        {/* Top: God */}
        <div className="flex justify-between items-start">
           <div className="text-xs text-purple-600 font-bold">{god}</div>
           {isMa && <div className="text-xs bg-red-600 text-white rounded px-1 scale-75 origin-top-right">马</div>}
        </div>
        
        {/* Middle: Star and Gate */}
        <div className="flex justify-between items-center flex-1 px-2">
          <div className="text-blue-700 font-medium">{star && star.split('/')[0]}</div>
          <div className="text-green-700 font-medium">{gate}</div>
        </div>
        
        {/* Bottom: Stems & An Gan */}
        <div className="flex justify-center items-end mt-1 gap-1">
           {/* An Gan (Dark Stem) */}
           <div className="flex flex-col items-center opacity-60">
            <span className="text-[8px] text-gray-400">暗</span>
            <span className="font-bold text-sm text-gray-600">{anGan}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-gray-500">天</span>
            <span className="font-bold text-lg text-red-600">{tianStem}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-gray-500">地</span>
            <span className="font-bold text-lg text-amber-700">{diStem}</span>
          </div>
        </div>
        
        {/* Kong Wang Indicator */}
        {isKong && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-4xl text-red-500/20 font-bold">⭕️</span>
          </div>
        )}
        
        {/* Palace Name Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-4xl font-serif">{PALACE_MAP.find(p => p.id === palaceId)?.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="grid grid-cols-3 grid-rows-3 h-full divide-x divide-y divide-gray-200">
        {PALACE_MAP.map((palace) => (
          <div key={palace.id} className="relative bg-white hover:bg-gray-50 transition-colors">
            {renderCell(palace.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QimenDisk;
