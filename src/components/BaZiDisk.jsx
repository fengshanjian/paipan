import React from 'react';

const BaZiDisk = ({ data }) => {
  if (!data) return <div className="text-gray-500">暂无数据</div>;
  if (data.error) return <div className="text-red-500">错误: {data.error}</div>;

  const { 性别, 阳历, 农历, 八字, 生肖, 日主, 年柱, 月柱, 日柱, 时柱, 胎元, 命宫, 身宫, 大运 } = data;

  const renderPillar = (pillar, title) => (
    <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-sm font-bold text-indigo-700 mb-2 text-center">{title}</h4>
      <div className="text-center mb-2">
        <div className="text-2xl font-bold text-gray-800">{pillar.天干.天干}</div>
        <div className="text-xs text-gray-500">{pillar.天干.五行} {pillar.天干.阴阳}</div>
        {pillar.天干.十神 && <div className="text-xs text-purple-600 font-semibold">{pillar.天干.十神}</div>}
      </div>
      <div className="text-center border-t pt-2">
        <div className="text-2xl font-bold text-gray-800">{pillar.地支.地支}</div>
        <div className="text-xs text-gray-500">{pillar.地支.五行} {pillar.地支.阴阳}</div>
      </div>
      {pillar.地支.藏干 && (
        <div className="mt-2 pt-2 border-t text-xs">
          <div className="font-semibold text-gray-600 mb-1">藏干:</div>
          {Object.entries(pillar.地支.藏干).map(([type, info]) => (
            <div key={type} className="flex justify-between text-gray-600">
              <span>{type}: {info.天干}</span>
              <span className="text-purple-600">{info.十神}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 pt-2 border-t text-xs text-center">
        <div className="text-gray-500 mb-1">纳音: {pillar.纳音}</div>
        {pillar.神煞 && pillar.神煞.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {pillar.神煞.map((ss, idx) => (
              <span key={idx} className="bg-yellow-100 text-yellow-800 px-1 rounded text-[10px]">
                {ss}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">性别:</span>
            <span className="ml-2 font-semibold">{性别}</span>
          </div>
          <div>
            <span className="text-gray-600">阳历:</span>
            <span className="ml-2 font-semibold">{阳历}</span>
          </div>
          <div>
            <span className="text-gray-600">农历:</span>
            <span className="ml-2 font-semibold">{农历}</span>
          </div>
          <div>
            <span className="text-gray-600">生肖:</span>
            <span className="ml-2 font-semibold">{生肖}</span>
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="text-gray-600 text-sm">八字</div>
          <div className="text-2xl font-bold text-indigo-700 tracking-wider">{八字}</div>
          <div className="text-sm text-gray-500 mt-1">日主: <span className="font-bold text-indigo-600">{日主}</span></div>
        </div>
      </div>

      {/* Four Pillars */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-700">四柱</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {renderPillar(年柱, '年柱')}
          {renderPillar(月柱, '月柱')}
          {renderPillar(日柱, '日柱')}
          {renderPillar(时柱, '时柱')}
        </div>
      </div>

      {/* Interactions & Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactions */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-3 text-gray-700">刑冲合会</h3>
          {data.刑冲合会 && data.刑冲合会.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.刑冲合会.map((interaction, idx) => (
                <span key={idx} className="bg-red-50 text-red-700 border border-red-100 px-2 py-1 rounded text-sm">
                  {interaction}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm italic">无明显刑冲合会</div>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-3 text-gray-700">其他信息</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-gray-600">胎元:</span>
              <span className="font-semibold">{胎元}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-gray-600">命宫:</span>
              <span className="font-semibold">{命宫}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">身宫:</span>
              <span className="font-semibold">{身宫}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Da Yun (Big Luck) */}
      {大运 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-3 text-gray-700">
            大运 (起运年龄: {大运.起运年龄}岁)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">干支</th>
                  <th className="px-3 py-2 text-left">年份</th>
                  <th className="px-3 py-2 text-left">年龄</th>
                  <th className="px-3 py-2 text-left">天干十神</th>
                  <th className="px-3 py-2 text-left">地支藏干</th>
                </tr>
              </thead>
              <tbody>
                {大运.大运.map((dy, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-bold text-indigo-700">{dy.干支}</td>
                    <td className="px-3 py-2">{dy.开始年份}-{dy.结束年份}</td>
                    <td className="px-3 py-2">{dy.开始年龄}-{dy.结束年龄}</td>
                    <td className="px-3 py-2 text-purple-600">{dy.天干十神}</td>
                    <td className="px-3 py-2">
                      {dy.地支藏干.map((gan, i) => (
                        <span key={i} className="mr-2">
                          {gan}<span className="text-xs text-purple-600">({dy.地支十神[i]})</span>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaZiDisk;
