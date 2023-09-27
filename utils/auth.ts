import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils/db'

export const getUserByClerkID = async (opts = {}) => {
  const { userId } = await auth();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId
    }
  })
  return user
}