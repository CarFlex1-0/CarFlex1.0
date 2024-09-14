// src/components/ThreadsList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axiosInstance from "../services/axios"; // Ensure axiosInstance is correctly imported

const ThreadsList = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        // Fetch all threads (questions)
        const fetchThreads = async () => {
            try {
                const { data } = await axiosInstance.get("/questions/"); // API endpoint for fetching questions
                setThreads(data);
            } catch (error) {
                console.error("Error fetching threads:", error);
            }
        };

        fetchThreads();
    }, []);

    return (
        <div style={{ margin: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Threads
            </Typography>
            {threads.length > 0 ? (
                threads.map((thread) => (
                    <Card key={thread._id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h5">{thread.title}</Typography>
                            <Typography variant="subtitle1">
                                Posted by  {/* Assuming the field for username is createdBy.username */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(thread.createdAt).toLocaleDateString()}
                            </Typography>
                            <Link to={`/thread/${thread._id}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "10px" }}
                                >
                                    View Thread
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No threads found.</Typography>
            )}
        </div>
    );
};

export default ThreadsList;
