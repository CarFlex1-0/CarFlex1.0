import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  IconButton,
  Chip,
  Textarea,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axiosInstance from "@services/axios";
import { API_ENDPOINTS } from "@apis/endpoints";
import { useAuth } from "@contexts/auth_context";
const ForumCommunity = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { user, drawerState } = useAuth(); // Replace with actual user ID logic
  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.GET_ALL_THREADS);
      setThreads(data);
      setUserId(await user._id)
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleAnswerSubmit = async () => {
    if (newAnswer.trim() === "" || !selectedThread) return;

    try {
      const { data } = await axiosInstance.post(
        `${API_ENDPOINTS.SUBMIT_ANSWER}/${selectedThread._id}/`,
        {
          content: newAnswer,
          userId,
        }
      );
      setSelectedThread({
        ...selectedThread,
        answers: [...selectedThread.answers, data],
      });
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding answer:", error);
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
    <div
      className={
        drawerState
          ? "blur bg-blue-950 cursor-none"
          : "min-h-screen backdrop-blur-md bg-white/10 p-4"
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Forum & Community
          </Typography>
          <Button
            className="flex items-center gap-2rounded-lg bg-blue-900 glass text-white hover:scale-105 transform transition duration-300"
            size="sm"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Ask Question
          </Button>
        </div>

        <div className="mb-6 w-96">
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={handleSearch}
            className="input input-bordered flex items-center h-10 bg-[#3f3f46] shadow-lg w-48 pl-10" // Reduced width to w-48 and added padding-left (pl-10)
            labelProps={{
              className: "hidden",
            }}
            icon={
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-5 w-5 text-indigo-500" />
            } // Adjusted position of the icon
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            {filteredThreads.map((thread) => (
              <Card
                key={thread._id}
                className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                onClick={() => handleThreadSelect(thread._id)}
              >
                <Typography variant="h6" color="white" className="mb-2">
                  {thread.title}
                </Typography>
                <div className="flex justify-between items-center">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    by {thread.user.username} |{" "}
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </Typography>
                  <Chip
                    value={`${thread.answers?.length || 0} answers`}
                    size="sm"
                    variant="ghost"
                    color="indigo"
                  />
                </div>
              </Card>
            ))}
          </div>

          {selectedThread && (
            <div className="w-full md:w-1/3">
              <Card className="p-6 sticky top-4 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
                <Typography variant="h5" color="white" className="mb-2">
                  {selectedThread.title}
                </Typography>
                <Typography variant="body2" color="white" className="mb-4">
                  {selectedThread.description}
                </Typography>
                <Typography variant="small" color="white" className="mb-4">
                  Asked by {selectedThread.user.username} on{" "}
                  {new Date(selectedThread.createdAt).toLocaleDateString()}
                </Typography>

                <Typography variant="h6" color="white" className="mt-6 mb-2">
                  Answers:
                </Typography>
                {selectedThread.answers.map((answer) => (
                  <Card
                    key={answer._id}
                    className="mb-4 p-4 backdrop-blur-md bg-white/10 rounded-lg shadow-lg"
                  >
                    <Typography variant="body2" color="white" className="mb-2">
                      {answer.content}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <IconButton
                        variant="text"
                        color="green"
                        size="sm"
                        onClick={() => handleVote(answer._id, "up")}
                        className="hover:bg-indigo-100 transition-all duration-300"
                      >
                        <ChevronUpIcon strokeWidth={2} className="h-5 w-5" />
                      </IconButton>
                      <Typography variant="small" color="white">
                        {answer.upvotes}
                      </Typography>
                      <IconButton
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={() => handleVote(answer._id, "down")}
                        className="hover:bg-indigo-100 transition-all duration-300"
                      >
                        <ChevronDownIcon strokeWidth={2} className="h-5 w-5" />
                      </IconButton>
                      <Typography variant="small" color="white">
                        {answer.downvotes}
                      </Typography>
                    </div>
                  </Card>
                ))}

                <div className="mt-4 ">
                  <Textarea
                    placeholder="Your answer..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="mb-2 backdrop-blur-md bg-white/5 rounded-lg shadow-lg text-white border-none stroke-none"
                    rows={4}
                  />
                  <Button
                    onClick={handleAnswerSubmit}
                    fullWidth
                    className="flex justify-center items-center gap-2 rounded-lg bg-blue-900 glass text-white hover:scale-105 transform transition duration-300"
                  >
                    Submit Answer
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg ">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Ask a New Question
                </Typography>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                </IconButton>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Question Title"
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg border-none  focus:ring-blue-500 focus:border-transparent"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{
                      className: "min-w-[100px]",
                    }}
                  />
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Question Content"
                    value={newQuestionContent}
                    onChange={(e) => setNewQuestionContent(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500  resize-none"
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <details className="dropdown">
                  <summary className="btn m-1">Category</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>

                <Button
                  variant="text"
                  color="red"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="px-4 py-2 flex justify-center items-center gap-2 rounded-lg bg-red-500 glass text-white hover:scale-105 transform transition duration-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateQuestion}
                  className="px-4 py-2 flex justify-center items-center gap-2 rounded-lg bg-blue-900 glass text-white hover:scale-105 transform transition duration-300"
                >
                  Submit Question
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ForumCommunity;
