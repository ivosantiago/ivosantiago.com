import { Outlet, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

function usePrevious(value: any) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const App = (pageProps: any) => {
  // TODO: This is a hack to get the previous pathname. I'm not sure if there's a need to do this in Remix, but I'm doing it anyway.
  const location = useLocation();
  let previousPathname = usePrevious(location.pathname);

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Outlet previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
