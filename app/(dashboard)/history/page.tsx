import { prisma } from '@/utils/db'
import { getUserByClerkID } from '../../../utils/auth'
import HistoryChart from '@/components/HistoryChart'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { avg, analyses } = await getData()
  return (
    <div className="w-full h-full">
      <div>Average sentiment: {avg}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
