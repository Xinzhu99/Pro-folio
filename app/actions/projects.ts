
"use server";
import { projects } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";

// Ajoutez ces types au début du fichier
type PrevState = string | undefined;

// Fonction pour envoyer les infos formulaire pour les projets
export default async function submitProject(
  prevState: PrevState,  // ← Ajoutez le type ici
  formData: FormData
): Promise<string> {  // ← Ajoutez le type de retour
  const newProject = Object.fromEntries(formData);
  console.log("Bravo", newProject);
  
  try {
    if (
      typeof newProject.title !== "string" || !newProject.title.trim() ||
      typeof newProject.gitHub !== "string" || !newProject.gitHub.trim() ||
      typeof newProject.demo !== "string" || !newProject.demo.trim()
    ) {
      return "Champs manquants";
    }
    
    await db
      .insert(projects)
      .values({
        title: (newProject.title as string).charAt(0).toUpperCase() + 
               (newProject.title as string).slice(1),
        gitHub_link: newProject.gitHub as string,
        demo_link: newProject.demo as string,
        category_id: parseInt(newProject.category as string),
        class_id: parseInt(newProject.classes as string),
      })
      .returning();
      
    revalidatePath("/");
    return "Projet ajouté !";
  } catch (error) {
    return "Problème API lors de l'ajout du formulaire";
  }
}

// Action pour mettre à jour la date de publication
export async function publishProject(formData: FormData): Promise<string> {  // ← Ajoutez le type de retour
  const projectIdRaw = formData.get("id");
  
  if (!projectIdRaw) {
    return "ID manquant";
  }
  
  const projectId = parseInt(projectIdRaw.toString());
  
  try {
    await db
      .update(projects)
      .set({ published_at: new Date() })
      .where(eq(projects.id, projectId))
      .returning();
      
    revalidatePath("/");
    return "Date ajoutée !";
  } catch (error) {
    return "Problème API lors de la modification";
  }
}


// "use server";

// import { projects } from "@/lib/db/schema";
// import { revalidatePath } from "next/cache";
// import { db } from "@/lib/db/drizzle";
// import { eq } from "drizzle-orm";



// //function qui permet d'envoyer les infos formulaire pour les projets

// //1- récupérer les data, vérification => Object.fromEntries() permet de récupérer tout le champ formulaire
// //2- retourne le message au front
// export default async function submitProject(prevState, formData: FormData) {
//   const newProject = Object.fromEntries(formData);
  
//   console.log("Bravo", newProject);
  
//   try {
//     if(typeof newProject.title !== "string"|| !newProject.title.trim()
//     || typeof newProject.gitHub !== "string"|| !newProject.gitHub.trim()
//     || typeof newProject.demo !== "string"|| !newProject.demo.trim())
//         {           
//         return "Champs manquants"
//     }

//     await db
//       .insert(projects)
//       .values({
//         title: (newProject.title).charAt(0).toUpperCase() + (newProject.title).slice(1),
//         gitHub_link: newProject.gitHub,
//         demo_link: newProject.demo,
//         category_id: parseInt(newProject.category),
//         class_id: parseInt(newProject.classes),
//       })
//       .returning();
//       revalidatePath("/");
      
//       return "Projet ajouté !"
//     } catch (error) {
//       return "Problème API lors de l'ajout du formulaire"
//     }
//   }

// //action pour mettre à jour la date de publication de mes projets
// export async function publishProject(formData: FormData) {
//   const projectId = parseInt(formData.get("id"))
//   try {
//     await db.update(projects)
//     .set({ published_at: new Date()})
//     .where(eq(projects.id, projectId))
//     .returning()

//     revalidatePath("/")

//     return "Date ajoutée !"
  
//   } catch (error) {
//     return "Problème API lors de la modification"
//   }

// }
  