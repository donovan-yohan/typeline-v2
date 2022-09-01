import {
  CategoryScale,
  Chart,
  defaults,
  Legend,
  LegendItem,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useRef, useEffect, useState } from "react";
import { CustomLineProps } from "./CustomLine.definition";

Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend
);

export default function CustomLine({ data, options, chartHeight }: CustomLineProps) {
  defaults.font.family = "Nunito";
  defaults.font.size = 14;
  defaults.font.lineHeight = 1.5;
  defaults.font.weight = "700";

  const [legend, setLegend] = useState<LegendItem[]>([]);

  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart>();

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx && !chartRef.current) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
      });
    }
  };

  // effect to update the chart when props are updated
  useEffect(() => {
    // must verify that the chart exists
    const chart = chartRef.current;
    if (chart) {
      setLegend(chart.legend?.legendItems || []);
      chart.data = data;
      chart.options = options;
      chart.update();
    }
  }, [data, options]);

  return (
    <div className="chartContainer">
      <div className="overflow">
        <div className="legend">
          {legend.map((l, i) => {
            return (
              <div
                className="label legendItem"
                key={i}
                style={{
                  color: l.fontColor?.toString(),
                }}
              >
                <span
                  className={l.pointStyle?.toString() || "circle"}
                  style={{ backgroundColor: l.fontColor?.toString() }}
                ></span>
                {l.text}
              </div>
            );
          })}
        </div>
        <canvas ref={canvasCallback}></canvas>
      </div>
      <style jsx>{`
        .chartContainer {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .overflow {
          overflow: hidden;
          height: ${chartHeight + "px" || "500px"};
        }
        .legend {
          display: flex;

          position: absolute;
          left: 108px;
        }
        .legendItem {
          display: flex;
          margin-right: 64px;
        }

        .crossRot,
        .circle {
          position: relative;
          display: inline-block;
          min-height: 16px;
          min-width: 16px;
          height: 16px;
          width: 16px;
          margin-right: 12px;
          margin-top: 6px;
        }

        .crossRot {
          background-color: transparent !important;
        }

        .crossRot:before,
        .crossRot:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 3px; /* cross thickness */
          border-radius: 4px;
          top: 50%;
          background-color: rgb(225, 25, 25);
        }
        .crossRot:before {
          transform: rotate(45deg);
        }
        .crossRot:after {
          transform: rotate(-45deg);
        }

        .circle {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}