import clsx from "clsx";
import { Container } from "~/components/Container";
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from "~/components/SocialIcons";
import { Button } from "~/components/Button";
import logoAppcues from "~/images/logos/appcues.png";
import logoHekima from "~/images/logos/hekima.png";
import logoGoodTime from "~/images/logos/goodtime.png";
import logoCareMessage from "~/images/logos/caremessage.png";
import logoAvenueCode from "~/images/logos/avenue-code.png";

type SocialLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <a className="group -m-1 p-1" target="_blank" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ResumeExperience = {
  company: string;
  title: string;
  logo: string;
  start:
    | {
        label: string;
        dateTime: string;
      }
    | string;
  end:
    | {
        label: string;
        dateTime: string;
      }
    | string;
};

function Resume() {
  let resume: ResumeExperience[] = [
    {
      company: "Appcues",
      title: "Senior Software Engineer",
      logo: logoAppcues,
      start: "2022",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: "GoodTime.io",
      title: "Senior Software Engineer",
      logo: logoGoodTime,
      start: "2017",
      end: "2022",
    },
    {
      company: "CareMessage",
      title: "Software Engineer",
      logo: logoCareMessage,
      start: "2015",
      end: "2017",
    },
    {
      company: "Hekima",
      title: "Software Engineer",
      logo: logoHekima,
      start: "2014",
      end: "2015",
    },
    {
      company: "Avenue Code",
      title: "Software Engineer",
      logo: logoAvenueCode,
      start: "2012",
      end: "2014",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex flex-1 items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <img src={role.logo} alt="" className="h-7 w-7" />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${
                  typeof role.start === "string" ? role.start : role.start.label
                } until ${
                  typeof role.end === "string" ? role.end : role.end.label
                }`}
              >
                <time
                  dateTime={
                    typeof role.start === "string"
                      ? role.start
                      : role.start.dateTime
                  }
                >
                  {typeof role.start === "string"
                    ? role.start
                    : role.start.label}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time
                  dateTime={
                    typeof role.end === "string" ? role.end : role.end.dateTime
                  }
                >
                  {typeof role.end === "string" ? role.end : role.end.label}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/assets/cv_ivo_santiago.pdf"
        fileName="Ivo Furtado Santiago CV"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];
  const placesIVisited = [
    {
      src: "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      alt: "A photo of Paris",
    },
    {
      src: "https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      alt: "A photo of San Francisco",
    },
    {
      src: "https://images.unsplash.com/photo-1625005437510-4d6f5beefd0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2373&q=80",
      alt: "A photo of University of Viçosa",
    },
    {
      src: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      alt: "A photo of Dublin",
    },
    {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      alt: "A photo of London",
    },
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {placesIVisited.map((image, imageIndex) => (
          <div
            key={image.alt}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length],
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer and sports enthusiast.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Hi, I'm Ivo Santiago. I'm a software engineer who likes all types of
            sports. You can find me trying different things when I'm not at the
            computer - from judo to swimming, passing through rugby, and
            running. Whatever my knees still allow me to do.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/ivosantiago"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com/ivosantiago"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/ivosantiago"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/ivosantiago"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16"></div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
