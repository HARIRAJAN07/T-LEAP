// QuizType.jsx
import React from "react";
import Button from "@mui/material/Button";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// 🔹 Define translations directly here
const resources = {
  en: {
    translation: {
      quizTypeTitle: "Question Type",
      mcq: "Multiple Choice Question",
      match: "Match the Following",
      assertion: "Assertion & Reason",
      trueFalse: "True or False",
      fillBlanks: "Fill in the Blanks"
    },
  },
  ta: {
    translation: {
      quizTypeTitle: "கேள்வி வகைகள்",
      mcq: "பல்தேர்வு வினா",
      match: "பொருத்துக",
      assertion: "உறுதிப்பாடு மற்றும் காரணம்",
      trueFalse: "உண்மை அல்லது தவறு",
      fillBlanks: "காலியிடங்களை நிரப்புக"
    },
  },
};

// 🔹 Initialize i18n (runs only once)
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default function QuizType() {
  const { t } = useTranslation();

  const buttonStyle = {
    fontWeight: "700",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    width: "70%",
    marginBottom: "4%",
    cursor: "pointer",
    fontSize: "3vh",
    padding: "1% 2%",
    borderRadius: "10px",
  };

  // 🔹 Toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ta" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to right, #eef2ff, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {/* 🔹 Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {i18n.language === "en" ? "தமிழ்" : "English"}
      </button>

      <div
        style={{
          width: "60%",
          background: "white",
          borderRadius: "20px",
          padding: "1%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4vh",
            fontWeight: "bold",
            marginBottom: "4.5%",
            color: "#4f46e5",
          }}
        >
          {t("quizTypeTitle")}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2%",
            marginBottom: "5%",
            flexWrap: "wrap",
          }}
        >
          <Button style={buttonStyle} variant="outlined" sx={{ color: "#000000" }}>
            {t("mcq")}
          </Button>
          <Button style={buttonStyle} variant="outlined" sx={{ color: "#000000" }}>
            {t("match")}
          </Button>
          <Button style={buttonStyle} variant="outlined" sx={{ color: "#000000" }}>
            {t("assertion")}
          </Button>
          <Button style={buttonStyle} variant="outlined" sx={{ color: "#000000" }}>
            {t("trueFalse")}
          </Button>
          <Button style={buttonStyle} variant="outlined" sx={{ color: "#000000" }}>
            {t("fillBlanks")}
          </Button>
        </div>
      </div>
    </div>
  );
}
