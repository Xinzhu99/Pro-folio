import { db } from "@/lib/db/drizzle";
import { categories, classes, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ProjectImg from "@/app/components/ProjectImg";

export default async function ProjectDetails({ params }) {
  //params est une props particulère qui permet de de créer des pages à partir des slug d'un url
  const { id } = await params;
  console.log(id);

  const data = await db
    .select()
    .from(projects)
    .leftJoin(classes, eq(projects.class_id, classes.id))
    .leftJoin(categories, eq(projects.category_id, categories.id))

    .where(eq(projects.id, id));

  const project = data[0];
  console.log(project);


  if (project === undefined) {
    return <div>Project undefined</div>;
  } else {
    return (
      <div className="flex">

      <div className="card flex flex-col p-4 m-4 gap-2 text-center justify-center items-center rounded-2xl shadow-xl w-1/2 mx-auto">
        <h1 className="text-4xl font-extrabold ">{project.projects.title}</h1>
        <p className="text-white bg-pink-300  px-1  ">
          {project.classes.name}
        </p>

        <p>
          Publié le{" "}
          {new Date(project.projects.published_at).toLocaleDateString("fe-FR")}{" "}
          · {project.categories?.name}
        </p>
        <ProjectImg
          imgSrc={`${project.projects.gitHub_link}/blob/main/thumbnail.png?raw=true`}
          defaultSrc="../test.jpeg"
        />
        <div className="linksContainer flex p-4 gap-6">

        <a className=" py-2 px-5 rounded-4xl border-1 hover:bg-pink-300 cursor-pointer" href={`${project.projects.gitHub_link}`}>Lien GitHub</a>
        <a className=" py-2 px-5 rounded-4xl border-1 hover:bg-pink-300 cursor-pointer" href={`${project.projects.demo_link}`}>Lien demo</a>
        </div>
      </div>
      </div>
    );
  }
}
