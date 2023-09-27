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
  })
}
const EntryPage = ({ params }) => {
  return (
    <div>
      <Editor />
    </div>
  )
}

export default EntryPage
