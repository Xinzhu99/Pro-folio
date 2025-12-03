"use server"

import { db } from "@/lib/db/drizzle"
import { categories } from "@/lib/db/schema"

export async function getCategories() {
    try {
        const projectCategories = await db.select().from(categories)
        return projectCategories
    } catch (error) {
        console.error("Erreur lors de la récupération des catégoris", error)
        return []
    }
}