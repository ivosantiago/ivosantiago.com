// import glob from "fast-glob";
// import * as path from "path";

export type Article = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

export type ArticleWithComponent = Article & {
  component: React.ComponentType;
};

async function importArticle(articleFilename: string) {
  let { meta, default: component } = await import(
    `../app/routes/__app/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

export async function getAllArticles() {
  // let articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
  //   cwd: path.join(process.cwd(), "app/routes/__app/articles"),
  // });
  let articleFilenames = [""];

  console.log(process.cwd());
  let articles = await Promise.all<ArticleWithComponent>(
    articleFilenames.map(importArticle)
  );

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  );
}
