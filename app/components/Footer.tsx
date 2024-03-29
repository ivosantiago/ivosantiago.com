import { Link } from "@remix-run/react";
import { Container } from "~/components/Container";

type Props = {
  to: string;
};

function NavLink({ to, children }: React.PropsWithChildren<Props>) {
  return (
    <Link
      to={to}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/uses">Uses</NavLink>
                <NavLink to="/now">Now</NavLink>
              </div>
              <div className="text-right text-sm text-zinc-400 dark:text-zinc-500">
                <p>&copy; {new Date().getFullYear()} Ivo Santiago.</p>
                <p>All rights reserved.</p>
                <p>This site does not track you. 🍪</p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
