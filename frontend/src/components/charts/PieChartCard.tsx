import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  data: Array<{ name: string; value: number }>
  title: string
}

const COLORS = ['#22c55e', '#eab308', '#ef4444']

export const PieChartCard = ({ data, title }: Props) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <p className="text-sm uppercase tracking-[0.4em] text-white/50">{title}</p>
    <div className="mt-6 h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            strokeWidth={4}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
)

