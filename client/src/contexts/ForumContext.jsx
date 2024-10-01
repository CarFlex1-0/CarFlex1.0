// ForumContext.js
import React, { createContext, useState, useContext } from 'react';
import axiosInstance from "@services/axios";
import { API_ENDPOINTS } from "@apis/endpoints";

const ForumContext = createContext();

export const useForum = () => useContext(ForumContext);

export const ForumProvider = ({ children }) => {
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const userId = "66e546c813eb5f50654bc8d1"; // Replace with actual user ID logic

    const fetchThreads = async () => {
        try {
            const { data } = await axiosInstance.get(API_ENDPOINTS.GET_ALL_THREADS);
            setThreads(data);
        } catch (error) {
            console.error("Error fetching threads:", error);
        }
    };

    const handleThreadSelect = async (threadId) => {
        try {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.FETCH_RESPECTIVE_QUESTION}/${threadId}`
            );
            setSelectedThread(data);
        } catch (error) {
            console.error("Error fetching thread:", error);
        }
    };

    const handleVote = async (answerId, voteType) => {
        try {
            const endpoint = voteType === "up" ? "upvote" : "downvote";
            const { data } = await axiosInstance.put(
                `/answer/${answerId}/${endpoint}`,
                { userId }
            );
            setSelectedThread({
                ...selectedThread,
                answers: selectedThread.answers.map((answer) =>
                    answer._id === answerId ? data : answer
                ),
            });
        } catch (error) {
            console.error(`Error ${voteType}voting:`, error);
        }
    };

    return (
        <ForumContext.Provider
            value={{
                threads,
                selectedThread,
                searchQuery,
                setSearchQuery,
                fetchThreads,
                handleThreadSelect,
                handleVote,
                newAnswer,
                setNewAnswer,
                isCreateDialogOpen,
                setIsCreateDialogOpen,
                setThreads,
            }}
        >
            {children}
        </ForumContext.Provider>
    );
};
