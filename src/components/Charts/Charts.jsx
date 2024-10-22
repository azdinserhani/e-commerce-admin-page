import { useEffect, useMemo, useState } from "react";
import "./Charts.scss";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const Charts = ({data}) => {
  return (
    <div className="userCharts">
      <div className="head">
        <h3>users</h3>
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        <AreaChart
          className="mainChart"
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008080" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#008080" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008080" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#008080" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Active User"
            stroke="#008080"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
