const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slack: "#4A154B",
        background: "#FFFFFE",
        black: "#000000",
        paragraph: "#2D334A",
        primary: "#FFD803",
        error: "#FF6464",
        stroke: {
          10: "#D4D3D9",
          20: "#A9A7B3",
          30: "#272343",
        },
        secondary: {
          10: "#F1FAFA",
          20: "#E3F6F5",
        },
        tertiary: {
          10: "#BAE8E8",
          20: "#689696",
        },
        gray: {
          10: "#FAFAFA",
          20: "#D9D9D9",
          30: "#8B8B8B",
          40: "#595959",
        },
        warning: {
          10: "#FFF7E2",
          20: "#FFC51A",
          30: "#EFB300",
        },
        success: {
          10: "#EEFAEE",
          20: "#00DE52",
          30: "#00A500",
        },
        action: {
          10: "#FFE9E4",
          20: "#FF6530",
        },
      },
      animation: {
        dropup: "dropup 0.5s ease-in-out",
      },
      keyframes: {
        dropup: {
          "0%": { transform: "translateY(100%)" },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
