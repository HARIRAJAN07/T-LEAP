// QuizType.jsx
import React, { useState } from "react";

export default function QuizType() {
  
  const buttonStyle={
                padding: "1% 2%",
                borderRadius: "10px",
                border: "none",
                fontSize: "1.8rem",
                background: "#f1f5f9",
                color: "#111827",
                cursor: "pointer",
                fontWeight: "700",
                boxShadow:"0 1px 4px rgba(0,0,0,0.3)",
                width:"70%",
                marginBottom:"4%"
              }
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to right, #eef2ff, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "4.5%",
            color: "#4f46e5",
          }}
        >
          Question Type
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
            <button style={buttonStyle}>Multiple Choice Question</button>
            <button style={buttonStyle}>Match the Following</button>
            <button style={buttonStyle}>Assertion & Reason</button>
            <button style={buttonStyle}>True or False</button>
            <button style={buttonStyle}>Fill in the Blanks</button>
        </div>
        </div>
      </div>
    
  );
}
