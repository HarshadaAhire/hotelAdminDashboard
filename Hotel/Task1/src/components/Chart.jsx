import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "01", CheckIn: 400, CheckOut: 240 },
  { name: "02", CheckIn: 300, CheckOut: 139 },
  { name: "03", CheckIn: 200, CheckOut: 980 },
  { name: "04", CheckIn: 278, CheckOut: 390 },
  { name: "05", CheckIn: 189, CheckOut: 480 },
  { name: "06", CheckIn: 239, CheckOut: 380 },
  { name: "07", CheckIn: 349, CheckOut: 430 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Line type="monotone" dataKey="CheckIn" stroke="#8884d8" />
        <Line type="monotone" dataKey="CheckOut" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
