import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-pattern' : "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDAwIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPnBhdGh7b3BhY2l0eTouMTtjbGlwLXBhdGg6dXJsKCNjbGlwUGF0aCk7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50KTt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoIj48cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDAwIi8+PC9jbGlwUGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhckdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjkwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9ImhzbCgwIDAlIDEwMCUvMSkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9ImhzbCgwIDAlIDEwMCUvMCkiLz48L2xpbmVhckdyYWRpZW50PjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MjAsMTAwMClzY2FsZSgtMSwtMSkiPjxwYXRoIGQ9Ik0xMzg0LjUgMzQzLjJMMTkyLjcgMTUzNWwtMjEzLjUtM0wxMzgzIDEyOC4ybDEuNSAyMTV6Ii8+PHBhdGggZD0iTTE5MTkuNyA0NDguM0wxMzU5IDEwMDlsLTEwMC40LTEuNEwxOTE5IDM0Ny4xbC43IDEwMS4yeiIvPjxwYXRoIGQ9Ik0xMTc2LjcgNTE0LjNMNjE2IDEwNzVsLTEwMC40LTEuNEwxMTc2IDQxMy4xbC43IDEwMS4yeiIvPjxwYXRoIGQ9Ik02NDQuNyA0NTcuM0w4NCAxMDE4bC0xMDAuNC0xLjRMNjQ0IDM1Ni4xbC43IDEwMS4yeiIvPjxwYXRoIGQ9Ik0xMzg3LjcgNDQ4LjNMODI3IDEwMDlsLTEwMC40LTEuNEwxMzg3IDM0Ny4xbC43IDEwMS4yeiIvPjxwYXRoIGQ9Ik0xMjUwLjEgNDkzLjhsLTU0NSA1NDUtNTIuNyA0My42IDY0MS45LTY0MS45LTQ0LjIgNTMuM3oiLz48cGF0aCBkPSJNODkxLjEgNjM5LjFMLTc3OCAyMzA4LjNsLTI5OC45LTQuMkw4ODkgMzM4LjFsMi4xIDMwMXoiLz48cGF0aCBkPSJNMTg3MC40IDQxOS44TC0yOC44IDIzMTlsLTM0MC4xLTQuOEwxODY4IDc3LjNsMi40IDM0Mi41eiIvPjxwYXRoIGQ9Ik05MDguNCA0MzYuOEwtOTkwLjggMjMzNmwtMzQwLjEtNC44TDkwNiA5NC4zbDIuNCAzNDIuNXoiLz48cGF0aCBkPSJNMTYzMi40IDUxNS44TC0yNjYuOCAyNDE1bC0zNDAuMS00LjhMMTYzMCAxNzMuM2wyLjQgMzQyLjV6Ii8+PHBhdGggZD0iTTExNzYuMyA1NjcuMUwtMTQ0NS42IDMxODlsLTQ2OS41LTYuNkwxMTczIDk0LjNsMy4zIDQ3Mi44eiIvPjxwYXRoIGQ9Ik0xNDI3LjMgNTgwLjFMLTExOTQuNiAzMjAybC00NjkuNS02LjZMMTQyNCAxMDcuM2wzLjMgNDcyLjh6Ii8+PHBhdGggZD0iTTE2NDkuNSA4ODAuMkw0NTcuNyAyMDcybC0yMTMuNS0zTDE2NDggNjY1LjJsMS41IDIxNXoiLz48cGF0aCBkPSJNNjc1LjggNTIyLjJsLTI2MjEuOSAyNjIxLjktNDY5LjQtNi42TDY3Mi41IDQ5LjRsMy4zIDQ3Mi44eiIvPjxwYXRoIGQ9Ik0yNTk1LjkgNTIyLjJMLTI2IDMxNDQuMWwtNDY5LjUtNi42TDI1OTIuNiA0OS40bDMuMyA0NzIuOHoiLz48L2c+PC9zdmc+')"
      },
      backgroundSize : {
        'custom-clamp' : 'clamp(60em, 100rem, 100em)'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require("tailwindcss-animated"), flowbite.plugin()],
};
export default config;
