;import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

function NowSection({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Section>>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
}

type ActivityProps = {
  title: string;
  description: string;
  eyebrow: string;
  cta?: string;
  href?: string;
};

function Activity({ title, description, eyebrow, cta, href }: ActivityProps) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{eyebrow}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      {cta ? <Card.Cta>{cta}</Card.Cta> : null}
    </Card>
  );
}

export const metadata = {
  title: "Now",
  description: "This is what I'm up to now.", 
};

export default function Now() {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            It is important to constantly be doing something. This is what I'm
            doing now
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            This is a{" "}
            <a
              className="text-teal-500 dark:text-teal-400"
              href="https://nownownow.com/about"
            >
              now page
            </a>
            , and if you have your own site,{" "}
            <a
              className="text-teal-500 dark:text-teal-400"
              href="https://nownownow.com/about"
            >
              you should make one
            </a>
            , too.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Updated April 17th, 2024, from Belo Horizonte, Brazil. 🌎
          </p>
        </header>
        <div className="mt-16 sm:mt-20">
          <div className="space-y-20">
            <NowSection title="Books">
              <Activity
                href="https://www.audible.com/pd/Staff-Engineer-Audiobook/B097CNMWWDn"
                eyebrow="Will Larson"
                title="Staff Engineer"
                description="As I'm starting to consider transitioning to a more senior role and many people recommended this book I'm listening to it on Audible. There are great lessons from the very beginning."
              />
            </NowSection>
            <NowSection title="Building">
              <Activity
                href="https://ivosantiago.com/blog"
                eyebrow="This website"
                title="A blog section"
                description="I think spending my time writing about what I'm learning and doing is a good way to retain knowledge and share it with others. I'm working on a blog section for the website instead of sharing content on Twitter/X."
                cta="Check it out"
              />
              <Activity
                href="https://www.landsbattle.me/#"
                eyebrow="Lands Battle"
                title="A card game for Upland players"
                description="A dear friend of mine asked if I could help him to fix his game. I'm working on it and it's been a lot of fun. I hope to have it ready by the end of the month."
                cta="Check it out"
              />
            </NowSection>
            <NowSection title="Tech">
              <Activity
                href="https://laracasts.com/"
                eyebrow="Old language, new framework"
                title="Learning Laravel"
                description="I was looking for something new to learn since I'm mostly working with React, Node.js and TypeScript. I decided to give Laravel a try. Even tho I've done PHP projects before it was a long time ago so I decided to follow the entire 'Learn Laravel Path' on Laracast. It's been a lot of fun. I'm also considering to write about it on the blog."
                cta="Laracast website"
              />
              <Activity
                href="https://nextjs.org/"
                eyebrow="Old language, new framework"
                title="Next.js"
                description="I'm giving another chance to Next.js for my future projects. Nothing much to say yet but using Remix required me to migrate/recreate so many libs and components that were ready for Next."
                cta="Check it out"
              />
            </NowSection>
          </div>
        </div>
      </Container>
    </>
  );
}
