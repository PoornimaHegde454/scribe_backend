import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Props = {
  data: Array<{ rating: number; count: number }>
  title: string
}

export const BarChartCard = ({ data, title }: Props) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <p className="text-sm uppercase tracking-[0.4em] text-white/50">{title}</p>
    <div className="mt-6 h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="rating"
            tick={{ fill: '#fff', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#fff', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            }}
          />
          <Bar dataKey="count" fill="url(#ratingGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="ratingGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

