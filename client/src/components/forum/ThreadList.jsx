import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axiosInstance from "@services/axios";
import { useTheme } from "@mui/material/styles";
import { API_ENDPOINTS } from "@apis/endpoints";
const ThreadsList = () => {
    const [threads, setThreads] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const { data } = await axiosInstance.get(API_ENDPOINTS.GET_ALL_THREADS);
                setThreads(data);
            } catch (error) {
                console.error("Error fetching threads:", error);
            }
        };

        fetchThreads();
    }, []);

    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
                minHeight: "100vh",
                padding: "8rem",
                minWidth: "100vw",
            }}
        >
            <Typography variant="h4" gutterBottom color="white" textAlign="center">
                Threads
            </Typography>

            <Box textAlign="center" sx={{ marginBottom: "20px" }}>
                <Link to="/create-question" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" sx={{ borderRadius: "8px" }}>
                        Create New Question
                    </Button>
                </Link>
            </Box>

            {threads.length > 0 ? (
                threads.map((thread) => (
                    <Card
                        key={thread._id}
                        sx={{
                            marginBottom: "20px",
                            background: "white",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            borderRadius: "12px",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {thread.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Posted by {thread.user.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(thread.createdAt).toLocaleDateString()}
                            </Typography>
                            <Link to={`/thread/${thread._id}`} style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginTop: "10px", borderRadius: "8px" }}
                                >
                                    View Thread
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography color="white" textAlign="center">No threads found.</Typography>
            )}
        </Box>
    );
};

export default ThreadsList;
