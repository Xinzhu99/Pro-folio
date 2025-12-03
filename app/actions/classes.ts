"use server"

import { db } from "@/lib/db/drizzle"
import { classes } from "@/lib/db/schema"

export async function getClass() {
    try {
        const projectClasses = await db.select().from(classes)
        return projectClasses
    } catch (error) {
        console.error("Erreur lors de la récupération des promos", error)
        return []
    }
}