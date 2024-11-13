// TravelPreview.js
import React from "react";

function TravelSvg({ schedules, date }) {
  const splitText = (link, maxHalfWidth) => {
    let lines = [];
    let currentLine = "";
    let currentWidth = 0;

    for (let char of link) {
      // 全角文字か半角文字かを判定（正規表現により全角文字をチェック）
      // eslint-disable-next-line no-control-regex
      const regex = /[^\x00-\xff]/;
      const charWidth = char.match(regex) ? 2 : 1;
      if (currentWidth + charWidth > maxHalfWidth) {
        lines.push(currentLine);
        currentLine = char;
        currentWidth = charWidth;
      } else {
        currentLine += char;
        currentWidth += charWidth;
      }
    }
    if (currentLine) lines.push(currentLine); // 残った文字を追加
    return lines;
  };

  const totalBudget = schedules.filter(
    (item) => item.budget && item.budget > 0
  ).length;
  const totalDescriptions = schedules.reduce((sum, item) => {
    if (!item.description || item.description.length < 1) return sum;
    return sum + splitText(item.description, 30).length;
  }, 0);
  const totalLinks = schedules.reduce((sum, item) => {
    if (!item.links || item.links.length < 1) return sum;
    return (
      sum +
      item.links.reduce((linkSum, link) => {
        if (!link || link.length < 1) return linkSum;
        return linkSum + splitText(link, 30).length;
      }, 0)
    );
  }, 0);
  const svgBase = {
    fastCircleSize: 42,
    svgMaxLine:
      82 +
      5 + // 予備線
      10 + // 重なり分
      totalBudget * 15 +
      schedules.length * 92 +
      totalDescriptions * 15 +
      totalLinks * 20,
  };
  let cumulativeBudgetOffset = 0;
  let cumulativeDescriptionsOffset = 0;
  let cumulativeLinksOffset = 0;
  return (
    <svg
      width="100%"
      height={
        10 + // 重なり分
        svgBase.fastCircleSize * 2 +
        schedules.length * 92 +
        totalBudget * 15 +
        totalDescriptions * 15 +
        totalLinks * 20
      }
      style={{ background: "#f5f5f5" }}
    >
      {/* Date circle */}
      <circle
        cx="50"
        cy={svgBase.fastCircleSize}
        r="40"
        fill="#fff"
        stroke="#333"
        strokeWidth="2"
      />
      <text
        x="50"
        y={svgBase.fastCircleSize + 3}
        textAnchor="middle"
        fontSize="12"
        fill="#333"
      >
        {date}
      </text>
      {/* Timeline Line */}
      <line
        x1="50"
        y1={svgBase.fastCircleSize * 2}
        x2="50"
        y2={svgBase.svgMaxLine}
        stroke="#9e9e9e"
        strokeWidth="2"
      />
      {/* Render each item in the timeline */}
      {schedules.map((item, index) => {
        // budget
        const budget = item.budget;
        const budgetYOffset = cumulativeBudgetOffset;
        const budgetOffset = budget && budget > 0 ? 15 : 0;

        // 次のアイテムのために累積オフセットを更新
        cumulativeBudgetOffset += budgetOffset;

        // descriptions
        const descriptions = item.description
          ? splitText(item.description, 30)
          : [];
        const descriptionsSize = descriptions.length;
        const descriptionsYOffset = cumulativeDescriptionsOffset;
        const descriptionsOffset = descriptionsSize * 15;

        // 次のアイテムのために累積オフセットを更新
        cumulativeDescriptionsOffset += descriptionsOffset;

        // links
        const links = item.links;
        const linksSize = links
          ? links.reduce((sum, link) => {
              if (!link || link.length < 1) return sum;
              return sum + splitText(link, 30).length;
            }, 0)
          : 0;
        const linksYOffset = cumulativeLinksOffset;
        const linksOffset = linksSize * 20;

        // 次のアイテムのために累積オフセットを更新
        cumulativeLinksOffset += linksOffset + (descriptions ? 20 : 0);

        return (
          <g
            key={index}
            transform={`translate(0, ${
              index * 70 + descriptionsYOffset + linksYOffset + budgetYOffset
            })`}
          >
            {/* Time circle */}
            <circle
              cx="50"
              cy={50 + svgBase.fastCircleSize * 2}
              r="20"
              fill="#fff"
              stroke="#333"
              strokeWidth="2"
            />
            <text
              x="50"
              y={55 + svgBase.fastCircleSize * 2}
              textAnchor="middle"
              fontSize="12"
              fill="#333"
            >
              {item.time}
            </text>

            {/* Title */}
            <text
              x="100"
              y={45 + svgBase.fastCircleSize * 2}
              fontSize="14"
              fontWeight="bold"
              fill="#333"
            >
              {item.title}
            </text>

            {/* Budget Bubble */}
            {budget && budget > 0 && (
              <>
                <rect
                  x="100"
                  y={60 + svgBase.fastCircleSize * 2}
                  width="200"
                  height={budgetOffset + 15}
                  rx="10"
                  ry="10"
                  fill="#ffaa00"
                />
                <text
                  x="110"
                  y={80 + svgBase.fastCircleSize * 2}
                  fontSize="12"
                  fill="#fff"
                >
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  }).format(budget)}
                </text>
              </>
            )}

            {/* Description Bubble */}
            {descriptions && descriptions.length > 0 && (
              <>
                <rect
                  x="100"
                  y={
                    60 +
                    svgBase.fastCircleSize * 2 +
                    (budget && budget > 0 ? 20 : 0) +
                    budgetOffset
                  }
                  width="200"
                  height={descriptionsOffset + 15}
                  rx="10"
                  ry="10"
                  fill="#4fc3f7"
                />
                <text
                  x="110"
                  y={
                    80 +
                    svgBase.fastCircleSize * 2 +
                    (budget && budget > 0 ? 20 : 0) +
                    budgetOffset
                  }
                  fontSize="12"
                  fill="#fff"
                >
                  {descriptions.map((line, lineIndex) => (
                    <tspan
                      x="110"
                      dy={lineIndex === 0 ? 0 : 15}
                      key={lineIndex}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </>
            )}

            {/* URL Link */}
            {item.links && (
              <>
                <rect
                  x="100"
                  y={
                    60 +
                    (descriptions && descriptions.length > 0 ? 20 : 0) +
                    (budget && budget > 0 ? 20 : 0) +
                    svgBase.fastCircleSize * 2 +
                    budgetOffset +
                    descriptionsOffset
                  }
                  width="200"
                  height={linksOffset + 15}
                  rx="10"
                  ry="10"
                  fill="blue"
                />
                {item.links.map((link, linkIndex) => (
                  <text
                    key={linkIndex}
                    x="110"
                    y={
                      80 +
                      (descriptions && descriptions.length > 0 ? 20 : 0) +
                      (budget && budget > 0 ? 20 : 0) +
                      svgBase.fastCircleSize * 2 +
                      budgetOffset +
                      descriptionsOffset +
                      linkIndex * 20
                    }
                    fontSize="12"
                    fill="#fff"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => window.open(link, "_blank")}
                  >
                    {splitText(link, 30).map((line, lineSubIndex) => (
                      <tspan
                        x="110"
                        dy={lineSubIndex === 0 ? 0 : 15}
                        key={lineSubIndex}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                ))}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default TravelSvg;
