import Editor from '@/components/Editor'
import { prisma } from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth'
const getEntry = async (id) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}
const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
