import { db } from "@/lib/db/drizzle"
 
export default async function Admin {
    const connectedUser =await db.select().from(user).where(user.id, )
}