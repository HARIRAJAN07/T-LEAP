import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function QuizType() {
  const navigate = useNavigate();
  const { classId, subject, topic, difficulty } = useParams();

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

  const goNext = (typeKey) => {
    navigate(`/mode/${classId}/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/${encodeURIComponent(difficulty)}/${typeKey}`);
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
            fontSize: "4vh",
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
          <Button style={buttonStyle} variant="outlined" sx={{color:"#000000"}} onClick={() => goNext('mcq')}>Multiple Choice Question</Button>
          <Button style={buttonStyle} variant="outlined" sx={{color:"#000000"}} onClick={() => goNext('match')}>Match the Following</Button>
          <Button style={buttonStyle} variant="outlined" sx={{color:"#000000"}} onClick={() => goNext('assertion')}>Assertion & Reason</Button>
          <Button style={buttonStyle} variant="outlined" sx={{color:"#000000"}} onClick={() => goNext('truefalse')}>True or False</Button>
          <Button style={buttonStyle} variant="outlined" sx={{color:"#000000"}} onClick={() => goNext('fill')}>Fill in the Blanks</Button>
        </div>
      </div>
    </div>
  );
}