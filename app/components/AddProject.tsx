"use client";
import { useEffect, useState, useActionState, useRef } from "react";
import { getClass } from "../actions/classes";
import { getCategories } from "../actions/categories";
import submitProject from "../actions/projects";
import { stringify } from "querystring";

interface Class {
   id: number;
  name: string;
    date: Date;
}
interface Category {
  id: number;
    name: string;
}
export default function AddProject() {
  const [showModal, setShowModal] = useState(false)

  //utiliser useState et useEffect pour appeler les actions getCat et getClasses
  const [classes, setClasses] = useState<Class[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getClass().then(setClasses);
    getCategories().then(setCategories);
  }, []);

  //utiliser useActionState pour gérer le statut du form 
  const [message, formAction] = useActionState<string, FormData>(submitProject, null);


  const formRef = useRef<any>(null);
 //utiliser le useEffect pour gérer l'affichage message après la sumission du form 
  useEffect(() => {
    if (message) {
      formRef.current?.reset();
    }
    if (message === "Projet ajouté !") {
      setTimeout(() => setShowModal(false), 1000);
    }
  }, [message]);

  return (
    <>
    {/* button Proposer un projet */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white py-2 px-5 rounded-3xl shadow-md hover:bg-pink-300 transition"
      >
        Proposer un projet
      </button>

    {/* ci-dessous le modal avec formulaire */}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center p-6 z-50"
          onClick={() => setShowModal(false)}
        >

          {/* début du form */}

          <form
            className="relative bg-white p-8 rounded-2xl max-w-md w-full shadow-xl space-y-4 border border-gray-100 flex flex-col" 
            onClick={(e) => e.stopPropagation()} 
            action={formAction}
            ref={formRef}
          >
            <button
              type="button"
              className="absolute top-4 right-4 bg-pink-300 text-white p-2 rounded-full hover:bg-pink-400"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Proposer un projet</h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-pink-50 border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2  focus:ring-pink-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="gitHub" className="text-sm font-medium text-gray-700">GitHub URL</label>
              <input
                type="url"
                name="gitHub"
                id="gitHub"
                required
                className="bg-pink-50 border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="demo" className="text-sm font-medium text-gray-700">URL de démo</label>
              <input
                type="url"
                name="demo"
                id="demo"
                required
                className="bg-pink-50 border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Promo Ada</label>
              <select
                name="classes"
                id="classes"
                required
                className="bg-pink-50 border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Catégorie</label>
              <select
                name="category"
                id="category"
                required
                className="bg-pink-50 border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-50 bg-black text-white p-3 rounded-3xl shadow hover:bg-pink-300 transition mx-auto"
            >
              Envoyer
            </button>

            <p className="text-sm text-center">{message}</p>
          </form>
        </div>
      )}
    </>
  );
}
