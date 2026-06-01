import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // eslint-plugin-react-hooks v7 (shipped with eslint-config-next 16) promoted
    // these React Compiler rules to errors. They flag intentional, idiomatic
    // patterns here: the `usePrevious` ref read during render (providers.tsx) and
    // the `mounted` hydration flag recommended by next-themes (Header.tsx).
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    ignores: [".next/**", "out/**", "build/**"],
  },
];

export default eslintConfig;
