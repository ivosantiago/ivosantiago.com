// import ReactDOMServer from 'react-dom/server'
// import { Feed } from 'feed'
// import { mkdir, writeFile } from 'fs/promises'

// import { getAllArticles } from './getAllArticles'

// export async function generateRssFeed() {
//   let articles = await getAllArticles()
//   // let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
//   let author = {
//     name: 'Ivo Santiago',
//     email: 'ivosantiago@gmail.com',
//   }

//   let feed = new Feed({
//     title: author.name,
//     description: 'Your blog description',
//     author,
//     id: siteUrl,
//     link: siteUrl,
//     image: `${siteUrl}/favicon.ico`,
//     favicon: `${siteUrl}/favicon.ico`,
//     copyright: `All rights reserved ${new Date().getFullYear()}`,
//     feedLinks: {
//       rss2: `${siteUrl}/rss/feed.xml`,
//       json: `${siteUrl}/rss/feed.json`,
//     },
//   })

//   for (let article of articles) {
//     let url = `${siteUrl}/articles/${article.slug}`
//     let html = ReactDOMServer.renderToStaticMarkup(
//       <article.component isRssFeed />
//     )

//     feed.addItem({
//       title: article.title,
//       id: url,
//       link: url,
//       description: article.description,
//       content: html,
//       author: [author],
//       contributor: [author],
//       date: new Date(article.date),
//     })
//   }

//   await mkdir('./public/rss', { recursive: true })
//   await Promise.all([
//     writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
//     writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
//   ])
// }

// import type { LoaderArgs } from "@remix-run/node";

// import { db } from "~/utils/db.server";

// function escapeCdata(s: string) {
//   return s.replace(/\]\]>/g, "]]]]><![CDATA[>");
// }

// function escapeHtml(s: string) {
//   return s
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// export const loader = async ({ request }: LoaderArgs) => {
//   const jokes = await db.joke.findMany({
//     take: 100,
//     orderBy: { createdAt: "desc" },
//     include: { jokester: { select: { username: true } } },
//   });

//   const host =
//     request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
//   if (!host) {
//     throw new Error("Could not determine domain URL.");
//   }
//   const protocol = host.includes("localhost") ? "http" : "https";
//   const domain = `${protocol}://${host}`;
//   const jokesUrl = `${domain}/jokes`;

//   const rssString = `
//     <rss xmlns:blogChannel="${jokesUrl}" version="2.0">
//       <channel>
//         <title>Remix Jokes</title>
//         <link>${jokesUrl}</link>
//         <description>Some funny jokes</description>
//         <language>en-us</language>
//         <generator>Kody the Koala</generator>
//         <ttl>40</ttl>
//         ${jokes
//           .map((joke) =>
//             `
//             <item>
//               <title><![CDATA[${escapeCdata(joke.name)}]]></title>
//               <description><![CDATA[A funny joke called ${escapeHtml(
//                 joke.name
//               )}]]></description>
//               <author><![CDATA[${escapeCdata(
//                 joke.jokester.username
//               )}]]></author>
//               <pubDate>${joke.createdAt.toUTCString()}</pubDate>
//               <link>${jokesUrl}/${joke.id}</link>
//               <guid>${jokesUrl}/${joke.id}</guid>
//             </item>
//           `.trim()
//           )
//           .join("\n")}
//       </channel>
//     </rss>
//   `.trim();

//   return new Response(rssString, {
//     headers: {
//       "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
//       "Content-Type": "application/xml",
//       "Content-Length": String(Buffer.byteLength(rssString)),
//     },
//   });
// };
