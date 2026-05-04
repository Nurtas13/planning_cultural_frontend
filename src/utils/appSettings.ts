export type AppLanguage = "en" | "ru" | "kk";
export type AppTheme = "light" | "dark";

export const getAppLanguage = (): AppLanguage => {
  return (localStorage.getItem("language") as AppLanguage) || "en";
};

export const setAppLanguage = (language: AppLanguage) => {
  localStorage.setItem("language", language);
  window.dispatchEvent(new Event("app-settings-change"));
};

export const getAppTheme = (): AppTheme => {
  return (localStorage.getItem("theme") as AppTheme) || "light";
};

export const applyTheme = (theme: AppTheme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const setAppTheme = (theme: AppTheme) => {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
  window.dispatchEvent(new Event("app-settings-change"));
};

export const applySavedTheme = () => {
  applyTheme(getAppTheme());
};