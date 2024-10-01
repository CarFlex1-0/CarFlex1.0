// ThreadDetails.js
import React from "react";
import {
  Card,
  Typography,
  IconButton,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useForum } from "@contexts/ForumContext";

const ThreadDetails = () => {
  const {
    selectedThread,
    newAnswer,
    setNewAnswer,
    handleVote,
    handleAnswerSubmit,
  } = useForum();

  if (!selectedThread) return null;

  return (
    <div className="w-full md:w-1/3">
      <Card className="p-6 sticky top-4 border border-gray-200">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {selectedThread.title}
        </Typography>
        <Typography variant="body2" className="mb-4">
          {selectedThread.description}
        </Typography>
        <Typography variant="small" color="gray" className="mb-4">
          Asked by {selectedThread.user.username} on{" "}
          {new Date(selectedThread.createdAt).toLocaleDateString()}
        </Typography>

        <Typography variant="h6" color="blue-gray" className="mt-6 mb-2">
          Answers:
        </Typography>
        {selectedThread.answers.map((answer) => (
          <Card key={answer._id} className="mb-4 p-4 border border-gray-200">
            <Typography variant="body2" className="mb-2">
              {answer.content}
            </Typography>
            <div className="flex items-center gap-2">
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => handleVote(answer._id, "up")}
              >
                <FaThumbsUp />
              </IconButton>
              <Typography variant="small">{answer.upvotes}</Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => handleVote(answer._id, "down")}
              >
                <FaThumbsDown />
              </IconButton>
              <Typography variant="small">{answer.downvotes}</Typography>
            </div>
          </Card>
        ))}

        <div className="mt-4">
          <Textarea
            placeholder="Your answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="mb-2"
            rows={4}
          />
          <Button
            onClick={handleAnswerSubmit}
            fullWidth
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            Submit Answer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ThreadDetails;
