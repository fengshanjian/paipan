import React from 'react';

const LiuYaoDisk = ({ data }) => {
  if (!data) return null;
  
  const { benGua, bianGua, movingYao, shenSha, ganZhi, dateStr, lunarStr, birthYear } = data;
  
  // Helper to render a single hexagram
  const renderHexagram = (guaData, title, isBianGua = false) => {
    if (!guaData) return null;
    
    return (
      <div className="flex flex-col items-center border p-4 rounded-lg bg-white shadow-sm w-full md:w-1/2">
        <h3 className="text-lg font-bold mb-2 text-indigo-800">{title}: {guaData.name}</h3>
        <div className="flex flex-col-reverse w-full gap-1">
          {guaData.yaoData.map((yao, index) => {
            const isMoving = !isBianGua && yao.position === movingYao;
            const lineClass = yao.yinYang === 1 
              ? "h-4 bg-indigo-600 w-full rounded" 
              : "h-4 flex w-full justify-between gap-4";
            
            const yinLine = (
              <>
                <div className="h-4 bg-indigo-600 w-[45%] rounded"></div>
                <div className="h-4 bg-indigo-600 w-[45%] rounded"></div>
              </>
            );

            return (
              <div key={index} className={`flex items-center w-full p-1 ${isMoving ? 'bg-yellow-50 ring-2 ring-yellow-200 rounded' : ''}`}>
                <div className="w-8 text-xs text-gray-500 text-center">{yao.position}爻</div>
                <div className="w-16 text-xs text-gray-600 text-center">{yao.stem}{yao.branch}</div>
                <div className="w-8 text-xs text-gray-500 text-center">{yao.wuxing}</div>
                <div className="flex-grow mx-2">
                  {yao.yinYang === 1 ? <div className={lineClass}></div> : <div className={lineClass}>{yinLine}</div>}
                </div>
                {isMoving && <div className="w-6 text-red-500 font-bold text-center">○</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-4xl gap-6 p-4">
      {/* Header Info */}
      <div className="bg-white p-4 rounded-lg shadow text-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div><span className="text-gray-500">公历:</span> {dateStr}</div>
          <div><span className="text-gray-500">农历:</span> {lunarStr}</div>
          <div><span className="text-gray-500">干支:</span> {ganZhi.year} {ganZhi.month} {ganZhi.day} {ganZhi.hour}</div>
          <div><span className="text-gray-500">求测年命:</span> {data.benMing} ({birthYear})</div>
          <div><span className="text-gray-500">行年:</span> {data.xingNian}</div>
          <div><span className="text-gray-500">空亡:</span> {data.dayXunKong} (日) / {data.hourXunKong} (时)</div>
        </div>
      </div>

      {/* Hexagrams Display */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {renderHexagram(benGua, "本卦")}
        {bianGua && renderHexagram(bianGua, "变卦", true)}
      </div>

      {/* Shen Sha Display */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-3 text-indigo-800 border-b pb-2">神煞</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {Object.entries(shenSha).map(([key, value]) => (
            <div key={key} className="flex">
              <span className="text-gray-500 w-16">{key}:</span>
              <span className="font-medium">{value || '-'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yao Ci Display */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-3 text-indigo-800 border-b pb-2">爻辞</h3>
        <div className="space-y-4">
          {/* Ben Gua Yao Ci */}
          <div>
            <h4 className="font-bold text-md text-gray-700 mb-2">本卦：{benGua.name}</h4>
            <div className="space-y-2">
              {benGua.yaoCi && benGua.yaoCi.slice().reverse().map((ci, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold text-indigo-600">{benGua.yaoData[5-idx].position}爻：</span>
                  <span className="text-gray-700">{ci}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Bian Gua Yao Ci */}
          {bianGua && bianGua.yaoCi && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-bold text-md text-gray-700 mb-2">变卦：{bianGua.name}</h4>
              <div className="space-y-2">
                {bianGua.yaoCi.slice().reverse().map((ci, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-semibold text-indigo-600">{bianGua.yaoData[5-idx].position}爻：</span>
                    <span className="text-gray-700">{ci}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiuYaoDisk;
