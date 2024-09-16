import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import axiosInstance from "@services/axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useTheme } from "@mui/material/styles";
import { API_ENDPOINTS } from "@apis/endpoints";
const SingleThread = () => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const userId = "66e546c813eb5f50654bc8d1";

    useEffect(() => {
        const fetchThread = async () => {
            try {
                const { data } = await axiosInstance.get(`${API_ENDPOINTS.FETCH_RESPECTIVE_QUESTION}/${id}`);
                setThread(data);
                setAnswers(data.answers);
            } catch (error) {
                console.error("Error fetching thread:", error);
            }
        };

        fetchThread();
    }, [id]);

    const handleAnswerSubmit = async () => {
        if (newAnswer.trim() === "") return;

        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`${API_ENDPOINTS.SUBMIT_ANSWER}/${id}/`, {
                content: newAnswer,
                userId,
            });

            setAnswers([...answers, data]);
            setNewAnswer("");
        } catch (error) {
            console.error("Error adding answer:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpVote = async (answerId) => {
        try {
            const { data } = await axiosInstance.put(`/answer/${answerId}/upvote`, { userId });
            setAnswers(answers.map(answer => (answer._id === answerId ? data : answer)));
        } catch (error) {
            console.error("Error upvoting:", error);
        }
    };

    const handleDownVote = async (answerId) => {
        try {
            const { data } = await axiosInstance.put(`/answer/${answerId}/downvote`, { userId });
            setAnswers(answers.map(answer => (answer._id === answerId ? data : answer)));
        } catch (error) {
            console.error("Error downvoting:", error);
        }
    };

    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
                minHeight: "100vh",
                padding: "8rem",
                color: "white",
                minWidth:"100vw"
            }}
        >
            {thread && (
                <>
                    <Typography variant="h4" textAlign="center" gutterBottom>{thread.description}</Typography>
                    <Typography variant="subtitle1" textAlign="center">
                        Asked by {thread.user.username}
                    </Typography>
                    <Typography variant="body2" color="lightgray" textAlign="center">
                        {new Date(thread.createdAt).toLocaleDateString()}
                    </Typography>

                    <Box sx={{ marginTop: "40px" }}>
                        <Typography variant="h6">Answers:</Typography>
                        {answers.length > 0 ? (
                            answers.map((answer) => (
                                <Card
                                    key={answer._id}
                                    sx={{
                                        marginBottom: "20px",
                                        background: "white",
                                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <CardContent>
                                        <Typography>{answer.content}</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            By {answer.user.username} | Upvotes: {answer.upvotes} | Downvotes: {answer.downvotes}
                                        </Typography>
                                        <Box sx={{ marginTop: "10px" }}>
                                             <IconButton
                                                color="primary"
                                                onClick={() => handleUpVote(answer._id)}
                                                disableRipple
                                                disableFocusRipple
                                                sx={{
                                                    '&:focus': {
                                                        outline: 'none'
                                                    }
                                                }}
                                            >
                                                {answer.upvoters.includes(userId) ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                                            </IconButton>
                                              <IconButton
                                                color="secondary"
                                                onClick={() => handleDownVote(answer._id)}
                                                disableRipple
                                                disableFocusRipple
                                                sx={{
                                                    '&:focus': {
                                                        outline: 'none'
                                                    }
                                                }}
                                            >
                                                {answer.downvoters.includes(userId) ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography>No answers yet.</Typography>
                        )}

                        <Box sx={{ marginTop: "40px" }}>
                            <Typography variant="h6">Add Your Answer</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                sx={{ background: "white", borderRadius: "8px" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: "20px", borderRadius: "8px" }}
                                onClick={handleAnswerSubmit}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Answer"}
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default SingleThread;
