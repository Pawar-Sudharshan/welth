// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma"

export const checkUser = async () => {
  const user = await currentUser()
  if (!user) return null

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    })

    if (loggedInUser) return loggedInUser

    const email = user.emailAddresses[0].emailAddress
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

    // If not found by clerkUserId, check by email
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    })

    if (existingUserByEmail) {
      // Update the existing user with the new clerkUserId
      const updatedUser = await db.user.update({
        where: { email },
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
        },
      })
      return updatedUser
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    })

    return newUser
  } catch (error) {
    console.log(error.message)
    return null
  }
}
