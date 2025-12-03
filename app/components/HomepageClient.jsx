"use client";
import Link from "next/link";
import ProjectImg from "./ProjectImg";
import { useSearchParams } from "next/navigation";
import { publishProject } from "../actions/projects";
import { useState } from "react";

export default function HomepageClient({ projectsData }) {
  const params = useSearchParams();
  const option = params.get("category");  //when "/?=category"

  const [message, SetMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  //filtrer la data avec le option récupéré de searchParams
  let filteredData = projectsData;
  if (option && option !== "tout") {
    filteredData = projectsData.filter((row) => row.catid === parseInt(option));
  }

  //fonction pour gérer le bouton publier 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await publishProject(formData);
    SetMessage(result);
    setShowModal(true);
  };

  return (
    <div className="p-15 space-y-12">
      {filteredData.map((row) => (
        <section key={row.category} className="space-y-6">
          <h1 className="text-black text-4xl font-extrabold border-l-8 border-pink-300 pl-4">
            {row.category}
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {row.projects.map((project) => (
              <div
                key={project.id}
                className="relative rounded-2xl shadow-xl bg-white overflow-hidden transition-transform hover:scale-[1.01]"
              >
                <p className="absolute top-3 right-3 z-10 text-white bg-pink-400 px-2 py-1 rounded-md text-xs shadow-md">
                  {project.class}
                </p>
                <div className="imgContainer w-full">
                  <ProjectImg
                  imgSrc={`${project.url}/blob/main/thumbnail.png?raw=true`}
                  defaultSrc="test.jpeg"
                  
                />
                </div>
                

                <div className="px-5 py-4 space-y-1">
                  <h2 className="font-bold text-lg text-gray-800">{project.name}</h2>

                  {project.date ? (
                    <p className="text-xs text-gray-500">
                      {new Date(project.date).toLocaleDateString("fr-FR")}
                    </p>
                  ) : (
                    <form onSubmit={handleSubmit} className="pt-2">
                      <input name="id" value={project.id} hidden readOnly />
                      <button
                        type="submit"
                        className="text-sm bg-black hover:bg-pink-400 text-white px-3 py-1 rounded-full shadow"
                      >
                        Publier
                      </button>
                    </form>
                  )}
                </div>

                <Link
                  href={`project/${project.id}`}
                  className="block text-center py-3 font-medium text-gray-700 hover:text-pink-400 mb-2 "
                >
                 Voir le projet ➜
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center p-6 z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-xl space-y-4 relative">
            <p className="text-gray-800 text-sm">{message}</p>
            <button
              className="absolute top-3 right-3 bg-pink-300 text-white p-2 rounded-full hover:bg-pink-400"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
