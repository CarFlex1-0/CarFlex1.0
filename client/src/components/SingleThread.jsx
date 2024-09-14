// src/components/SingleThread.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import axiosInstance from "../services/axios"; // Adjust according to your axios import
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
const SingleThread = () => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the specific thread (question) and its answers
        const fetchThread = async () => {
            try {
                const { data } = await axiosInstance.get(`/questions/${id}`);
                setThread(data); // Assuming the API returns the thread object with answers included
                setAnswers(data.answers); // Access answers array
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
            const { data } = await axiosInstance.post(`/answer/${id}/`, {
                content: newAnswer,
                userId: "66e546c813eb5f50654bc8d1", // Replace with actual logged-in username
            });

            setAnswers([...answers, data]); // Append new answer to the list
            setNewAnswer(""); // Clear the input
        } catch (error) {
            console.error("Error adding answer:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            {thread && (
                <>
                    <Typography variant="h4">{thread.title}</Typography>
                    <Typography variant="subtitle1">
                        Asked by {thread.user.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {new Date(thread.createdAt).toLocaleDateString()}
                    </Typography>

                    <div style={{ marginTop: "20px" }}>
                        <Typography variant="h6">Answers:</Typography>
                        {answers.length > 0 ? (
                            answers.map((answer) => (
                                <Card key={answer._id} style={{ marginBottom: "10px" }}>
                                    <CardContent>
                                        <Typography>{answer.content}</Typography>
                                        <Typography variant="caption">
                                            By {answer.user.username} | Upvotes: {answer.upvotes} | Downvotes: {answer.downvotes}
                                        </Typography>
                                       
{/* <IconButton color="primary" onClick={() => handleVote(answer._id, "upvote")}> */}
  <ThumbUpIcon />
{/* </IconButton> */}
{/* <IconButton color="secondary" onClick={() => handleVote(answer._id, "downvote")}> */}
  <ThumbDownIcon />
{/* </IconButton> */}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography>No answers yet.</Typography>
                        )}

                        <div style={{ marginTop: "20px" }}>
                            <Typography variant="h6">Add Your Answer</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                                onClick={handleAnswerSubmit}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Answer"}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleThread;
