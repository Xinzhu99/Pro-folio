import { db } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";
import HomepageClient from "./components/HomepageClient";
import { Suspense } from "react"; 

export default async function Home() {
  const data = await db.execute(sql`
    SELECT 
      cat.name as category,
      cat.id as catId,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', p.id,
          'name', p.title,
          'class', c.name,
          'date', p.published_at,
          'url', p."gitHub_link"
        ) ORDER BY p.published_at DESC
      ) as projects
    FROM projects p
    LEFT JOIN classes c ON c.id = p.class_id
    LEFT JOIN categories cat ON cat.id = p.category_id
    GROUP BY cat.name, cat.id
    ORDER BY cat.name
  `);

  return (
    <Suspense fallback={<div>Chargement…</div>}>
      <HomepageClient projectsData={data.rows} />
    </Suspense>
  );
}
