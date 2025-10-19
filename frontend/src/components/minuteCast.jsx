import { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function MinuteCast({ minuteSeries }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(minuteSeries) || minuteSeries.length === 0) return [];
    return minuteSeries
      .map((m, i) => ({
        time: i,
        value: Number.isFinite(m?.temp) ? m.temp : null,
      }))
      .filter((d) => d.value != null);
  }, [minuteSeries]);

  // Grabbing min and max y axis data for shorter intervals. This will make small data changes pop more
  const { yDomain, yTicks } = useMemo(() => {
    if (!chartData.length) return { yDomain: ["auto", "auto"], yTicks: undefined };

    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);

    const pad = Math.max(1, (max - min) * 0.15);
    const lo = Math.floor((min - pad) * 10) / 10;
    const hi = Math.ceil((max + pad) * 10) / 10;

    // controls how many ticks are present on the graph
    const step = (hi - lo) <= 6 ? 0.5 : 1;
    const ticks = [];
    for (let v = Math.round(lo / step) * step; v <= hi + 1e-6; v += step) {
      ticks.push(+v.toFixed(2));
    }
    return { yDomain: [lo, hi], yTicks: ticks };
  }, [chartData]);

  if (!chartData.length) return null;

  return (
    <div
      className="minute_cast_container"
      style={{ width: "100%", display: "flex", justifyContent: "center", marginLeft: "-.5rem" }}
    >
      <ResponsiveContainer width="100%" aspect={1.618}>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.25} />

          {/* X axis: using minute index 0..N-1 */}
          <XAxis
            dataKey="time"
            type="number"
            domain={["dataMin", "dataMax"]}
            tick={{ dy: 6, fill: "#03213A" }}
            tickMargin={6}
            axisLine={{ stroke: "#03213A" }}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={24}
          />

          
          <YAxis
            type="number"
            domain={yDomain}
            ticks={yTicks}
            width={40}
            tick={{ fill: "#03213A" }}
            tickMargin={4}
            axisLine={{ stroke: "#03213A" }}
            tickLine={false}
          />

          <Tooltip
            formatter={(v) => [`${v.toFixed(2)}°`, "Temp"]}
            labelFormatter={(label) => `Min ${label}`}
          />

          <Line
            dataKey="value"
            type="monotone"
            dot={false}
            stroke="#09599A"
            strokeWidth={2.5}
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={600}
            animationEasing="ease-in-out"
            activeDot={{ stroke: "red", strokeWidth: 2, r: 10, fill: 'white', fillOpacity: 0.8, cursor: 'pointer' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
