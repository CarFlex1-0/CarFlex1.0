import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axiosInstance from "@services/axios";
import { useTheme } from "@mui/material/styles";
import { API_ENDPOINTS } from "@apis/endpoints";

const CreateQuestion = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Title and content are required.");
            return;
        }

        setLoading(true);

        try {
            const userId = "66e546c813eb5f50654bc8d1"; // Replace with your user ID logic
            await axiosInstance.post(API_ENDPOINTS.ASK_QUESTIONS, {
                title,
                description: content,
                userId
            });
            navigate("/"); // Redirect to threads list after successful creation
        } catch (error) {
            console.error("Error creating question:", error);
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
                minHeight: "100vh",
                padding: "8rem",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "100vw",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    background: "white",
                    padding: "2rem",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    Create a New Question
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Question Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: "20px", background: "white" }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Question Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ marginBottom: "20px", background: "white" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ borderRadius: "8px" }}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Question"}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateQuestion;
