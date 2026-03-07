import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    variations: {
      colors: ["primary", "secondary", "accent", "grey"],
      lighten: 5,
      darken: 5,
    },
    themes: {
      light: {
        colors: {
          primary: "#B71C1C",
          secondary: "#1B3A5C",
          accent: "#E65100",
          error: "#C62828",
          info: "#1565C0",
          success: "#2E7D32",
          warning: "#E65100",
          grey: "#78909C",
          surface: "#FAFAF8",
          background: "#F5F3EF",
          "on-surface": "#1A1A1A",
          "on-background": "#1A1A1A",
          outline: "#E0DCD4",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#EF5350",
          secondary: "#90CAF9",
          accent: "#FFB74D",
          error: "#EF5350",
          info: "#64B5F6",
          success: "#81C784",
          warning: "#FFB74D",
          grey: "#B0BEC5",
          surface: "#1E293B",
          background: "#0F172A",
          "on-surface": "#E2E8F0",
          "on-background": "#E2E8F0",
          outline: "#334155",
        },
      },
    },
  },
});
