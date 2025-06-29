export const content = ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    colors: {
      primary: "var(--bg-primary)",
      success: "var(--bg-success)",
      blue: "var(--bg-blue)",
      danger: "var(--bg-danger)",
      warning: "var(--bg-warning)",
      white: "var(--bg-white)",
      overlay: "var(--bg-overlay)",
      text: {
        success: "var(--text-success)",
        blue: "var(--text-blue)",
        dark: "var(--text-dark)",
        danger: "var(--text-danger)",
        warning: "var(--text-warning)",
        white: "var(--text-white)"
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      whisper: ['Whisper', 'cursive'],
    }
  }
};
export const plugins = [];