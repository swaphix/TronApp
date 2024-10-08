// import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from 'recharts';




    const COLORS = ["#9966ff", "#fc6485", "#4bc0c0"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        >
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };



export const PieChartCustom = (props:any) => {    
    return (

    <div className="w-full">
            {/* <img src={balanceBlanck} alt="" className="w-60 h-60" /> */}
        <PieChart width={400} height={400}>
        <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
        >
            {props.data.map((entry:any, index:number) => (
            <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % COLORS.length]}  />
            ))}
            </Pie>
        </PieChart>

    </div>
    // <div className="w-full">
    // </div>
    )
}