
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import MedicineScene from '../components/dashboard/MedicineScene'
import { useInventory } from '../context/InventoryContext'
import { getInventorySummary } from '../utils/expiryUtils'
import {
  Pill,
  Package,
  AlertTriangle,
  CalendarClock
} from 'lucide-react'

function Dashboard() {
  const { medicines, batches } = useInventory()

  const summary = getInventorySummary(medicines, batches)
  // Temporary chart data for dashboard design
const stockChartData = [
  { name: 'Tablet', stock: 450 },
  { name: 'Capsule', stock: 320 },
  { name: 'Syrup', stock: 250 },
  { name: 'Injection', stock: 180 },
  { name: 'Other', stock: 300 },
]

const categoryChartData = [
  { name: 'Tablet', value: 40 },
  { name: 'Capsule', value: 25 },
  { name: 'Syrup', value: 20 },
  { name: 'Other', value: 15 },
]

const chartColors = [
  '#059669',
  '#34d399',
  '#6ee7b7',
  '#a7f3d0',
]
// Temporary recent activity data
const recentActivity = [
  {
    id: 1,
    medicine: 'Paracetamol 500mg',
    type: 'Stock In',
    quantity: '+120',
    date: '05 Nov 2026',
  },
  {
    id: 2,
    medicine: 'Amoxicillin 250mg',
    type: 'Stock Out',
    quantity: '-30',
    date: '04 Nov 2026',
  },
  {
    id: 3,
    medicine: 'Cetirizine 10mg',
    type: 'Stock In',
    quantity: '+80',
    date: '04 Nov 2026',
  },
  {
    id: 4,
    medicine: 'Azithromycin 500mg',
    type: 'Stock Out',
    quantity: '-15',
    date: '03 Nov 2026',
  },
]
  const statistics = [
    {
      title: 'Total Medicines',
      value: summary.totalMedicines,
      description: 'Registered medicines',
      icon: Pill,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Usable Stock',
      value: summary.totalUsableStock.toLocaleString(),
      description: 'Available units',
      icon: Package,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Low Stock',
      value: String(summary.lowStockCount).padStart(2, '0'),
      description: 'Need replenishment',
      icon: AlertTriangle,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Expiring Soon',
      value: String(summary.expiringSoonCount).padStart(2, '0'),
      description: 'Within 30 days',
      icon: CalendarClock,
      color: 'bg-red-100 text-red-700',
    },
    {
      title: 'Expired Batches',
      value: String(summary.expiredCount).padStart(2, '0'),
      description: 'Require removal from usable stock',
      icon: AlertTriangle,
      color: 'bg-rose-100 text-rose-700',
    },
  ]

  return (
    <div className="space-y-8">

      {/* Premium Dashboard Hero */}
      {/* Premium Dashboard Hero */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-600 px-6 py-5 text-white shadow-lg sm:px-10 sm:py-7"
>

        <div className="relative z-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Hero Content */}
          <div className="max-w-lg">
            <p className="text-sm font-medium text-emerald-200">
              PHARMACY INVENTORY MANAGEMENT
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Welcome to MediStock
            </h1>

            <p className="mt-3 text-sm leading-6 text-emerald-100">
              Manage your medicines, monitor stock levels and
              stay ahead of expiry dates with ease.
            </p>

            <div className="mt-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white">
              Smart Inventory Management
            </div>
          </div>

          {/* 3D Medicine Scene + Floating Cards */}
          <div className="relative w-full sm:w-1/2">

            <MedicineScene />

            {/* Stock Health Floating Card */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-0 top-5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"
            >
              <p className="text-[10px] font-medium tracking-wider text-emerald-200">
                STOCK HEALTH
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                98%
              </p>
            </motion.div>

            {/* Expiry Monitor Floating Card */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-5 right-0 rounded-xl border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"
            >
              <p className="text-[10px] font-medium tracking-wider text-emerald-200">
                EXPIRY MONITOR
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                ACTIVE
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Dashboard Statistics */}
      {/* Dashboard Statistics */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }}
  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5"
>

        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <motion.div
  key={item.title}
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.5 }}
  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/10"
>
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                  <Icon size={25} />
                </div>

              </div>

              <p className="mt-3 text-xs text-slate-500">
                {item.description}
              </p>
            </motion.div>
          )
        })}

      </motion.div>
            {/* Inventory Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Stock Overview Chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Stock Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Medicine stock distribution by category
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <Tooltip />

                <Bar
  dataKey="stock"
  fill="#059669"
  radius={[8, 8, 0, 0]}
  barSize={35}
  animationDuration={1200}
  animationEasing="ease-out"
/>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Inventory Distribution Chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Inventory Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Medicine category breakdown
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataLabel={false}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categoryChartData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: chartColors[index],
                  }}
                />
                <span className="text-xs text-slate-600">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
      
      {/* Recent Stock Activity */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Recent Stock Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest medicine stock transactions
            </p>
          </div>

          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Latest Transactions
          </span>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Medicine
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Transaction
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quantity
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="transition-colors hover:bg-emerald-50/40"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {activity.medicine}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        activity.type === 'Stock In'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {activity.type}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 text-sm font-bold ${
                      activity.type === 'Stock In'
                        ? 'text-emerald-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {activity.quantity}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {activity.date}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>


    </div>
  )
}

export default Dashboard
