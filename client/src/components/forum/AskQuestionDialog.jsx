// AskQuestionDialog.js
import React, { useState } from "react";
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { useForum } from "@contexts/ForumContext";

const AskQuestionDialog = () => {
  const { isCreateDialogOpen, setIsCreateDialogOpen, fetchThreads } =
    useForum();
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");

  const handleCreateQuestion = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.ASK_QUESTIONS, {
        title: newQuestionTitle,
        description: newQuestionContent,
        userId,
      });
      setIsCreateDialogOpen(false);
      setNewQuestionTitle("");
      setNewQuestionContent("");
      fetchThreads();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  if (!isCreateDialogOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="p-6 max-w-xl mx-auto relative">
        <IconButton
          variant="text"
          size="sm"
          color="gray"
          className="absolute top-4 right-4"
          onClick={() => setIsCreateDialogOpen(false)}
        >
          <FaTimes />
        </IconButton>
        <Typography variant="h5" className="mb-4">
          Ask a New Question
        </Typography>
        <Input
          label="Question Title"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Question Details"
          value={newQuestionContent}
          onChange={(e) => setNewQuestionContent(e.target.value)}
          rows={4}
          className="mb-4"
        />
        <Button
          onClick={handleCreateQuestion}
          fullWidth
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          Ask Question
        </Button>
      </Card>
    </div>
  );
};

export default AskQuestionDialog;
