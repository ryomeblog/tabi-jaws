// TravelEndSvg.js

function TravelEndSvg() {
  const svgBase = {
    fastCircleSize: 42,
  };
  return (
    <svg
      width="100%"
      height={
        svgBase.fastCircleSize * 2 
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
        End
      </text>
    </svg>
  );
}

export default TravelEndSvg;
