import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import {
  FaSearch,
  FaPlus,
 FaThumbsUp, FaThumbsDown, 
  FaTag,
} from "react-icons/fa";
import axiosInstance from "@services/axios";
import { API_ENDPOINTS } from "@apis/endpoints";
import { useAuth } from "@contexts/auth_context";
import LoadingSkeleton from "@components/forum/LoadingSkeleton";
const categories = [
  "Car Engine Upgrades",
  "Electric Cars & Self-Driving",
  "Fixing Your Car at Home",
  "Keeping Your Car Clean",
  "Best Car Deals & Offers",
  "Other",
];

const ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [userId, setUserId] = useState("");
  const { user, drawerState } = useAuth();
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    fetchThreads();
    setUserId(user?._id)
  }, []);

  const fetchThreads = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.GET_ALL_THREADS);
      setThreads(data);
      setUserId(user?._id); // Use optional chaining
    } catch (error) {
      console.error("Error fetching threads:", error);
      // Handle error gracefully (e.g., show notification)
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter threads based on search query and selected category
  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || thread.category === selectedCategory)
  );

  const handleThreadSelect = async (threadId) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_ENDPOINTS.FETCH_RESPECTIVE_QUESTION}/${threadId}`
      );
      setSelectedThread(data);
    } catch (error) {
      console.error("Error fetching thread:", error);
      // Handle error gracefully
    }
  };

  const handleCreateQuestion = async () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) {
      // Validate input
      console.error("Title and content cannot be empty");
      return;
    }
    setLoading(true); // Start loading
    try {
      await axiosInstance.post(API_ENDPOINTS.ASK_QUESTIONS, {
        title: newQuestionTitle,
        description: newQuestionContent,
        category: newQuestionCategory,
        userId,
      });
       document.getElementById("ask-new-question-modal").close();
      setNewQuestionTitle("");
      setNewQuestionContent("");
      setNewQuestionCategory("");
      fetchThreads();
    } catch (error) {
      console.error("Error creating question:", error);
      // Handle error gracefully
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAnswerSubmit = async () => {
    if (newAnswer.trim() === "" || !selectedThread) return;
    try {
      const res = await axiosInstance.post(
        `${API_ENDPOINTS.SUBMIT_ANSWER}/${selectedThread._id}/`,
        {
          content: newAnswer,
          userId,
        }
      );
      const {data} = res;
      setSelectedThread({
        ...selectedThread,
        answers: [...selectedThread.answers, data],
      });
      setNewAnswer("");
    } catch (error) {
      if (error.status === 406) {
        toast.error("Please remove abusive language from your answer.");
        return; // Don't submit the answer if it contains profanity
      }
      if (error) {
        toast.error("Something went wrong! please try again.");
        setNewAnswer("");
        return; // Don't submit the answer if it contains profanity
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleVote = async (answerId, voteType) => {
    // setLoading(true); // Start loading
    try {
      const endpoint = voteType === "up" ? "upvote" : "downvote";
      if(userId){
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
    }else{
      const { data } = await axiosInstance.put(
        `/answer/${answerId}/${endpoint}`,
        { userId: user._id }
      );
      setSelectedThread({
        ...selectedThread,
        answers: selectedThread.answers.map((answer) =>
          answer._id === answerId ? data : answer
        ),
      });
    }
    } catch (error) {
      console.error(`Error ${voteType}voting:`, error);
      // Handle error gracefully
    } finally {
      setLoading(false); // End loading
    }
  };

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      // Deselect the category
      setSelectedCategory(""); // Set to empty to show all questions
    } else {
      // Select a new category
      setSelectedCategory(category);
    }
  };

  return (
    <div
      className={
        drawerState
          ? "blur bg-blue-950 cursor-none"
          : "min-h-screen backdrop-blur-md bg-white/5 p-4"
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h2" color="white" className="font-bold text-4xl">
            Forum & Community
          </Typography>
          {/* <Button
            className="flex items-center gap-2 rounded-lg bg-blue-900 glass text-white hover:scale-105 transform transition duration-300"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <FaPlus className="h-4 w-4" /> Ask Question
          </Button> */}
          <button
            className="btn flex items-center gap-2 rounded-lg bg-blue-900 glass text-white hover:scale-105 transform transition duration-300 hover:bg-gray-200 hover:text-blue-500"
            onClick={() =>
              document.getElementById("ask-new-question-modal").showModal()
            }
          >
            <FaPlus className="h-4 w-4" /> Ask Question
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="w-full md:w-96">
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
              className="input outline-1 outline-slate-400 flex items-center h-10 bg-[#3f3f46] shadow-lg w-48 pl-10 text-white transition-all duration-100 focus:outline-2 focus:outline-slate-200 focus:bg-slate-700"
              icon={
                <FaSearch className="absolute left-2 top-2.5 h-5 w-5 text-slate-500" />
              }
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)} // Use the toggle function
                  className={`px-4 mx-2 py-2 rounded-full transition duration-300 
                  ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-white/10 text-white hover:bg-green-600 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-6">
            {loading ? ( // Loading indicator
              <LoadingSkeleton size={5} />
            ) : (
              filteredThreads.map((thread) => (
                <Card
                  key={thread._id}
                  className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleThreadSelect(thread._id)}
                >
                  <Typography
                    variant="h5"
                    color="white"
                    className="mb-3 font-semibold"
                  >
                    {thread.title}
                  </Typography>
                  <div className="flex flex-wrap justify-between items-center text-slate-400">
                    <Typography variant="small" className="font-normal">
                      by {thread.user.username} |{" "}
                      {new Date(thread.createdAt).toLocaleDateString()}
                    </Typography>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center bg-indigo-500 text-white rounded-full px-3 py-1">
                        <FaTag className="h-3 w-3 mr-1" />{" "}
                        {/* Added margin for spacing */}
                        {thread.category}
                      </div>
                      <div className="flex items-center bg-teal-500 text-white rounded-full px-3 py-1">
                        {`${thread.answers?.length || 0} answers`}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="w-full lg:w-1/3">
            {selectedThread && (
              <Card className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl p-6">
                <Typography
                  variant="h5"
                  color="white"
                  className="mb-3 font-semibold"
                >
                  {selectedThread.title}
                </Typography>
                <Typography variant="small" className="mb-3 text-slate-400">
                  {selectedThread.description}
                </Typography>
                <div className="space-y-4">
                  {selectedThread.answers.map((answer) => (
                    <div
                      key={answer._id}
                      className="border-b border-gray-600 pb-4"
                    >
                      <Typography variant="small" className="text-slate-400">
                        {answer.content}
                      </Typography>
                      <div className="flex items-center gap-2 mt-2">
                        {answer.upvoters.includes(userId || user._id) ? (
                          <FaThumbsUp
                            onClick={() => handleVote(answer._id, "up")}
                            color="green"
                          />
                        ) : (
                          <FaThumbsUp
                            onClick={() => handleVote(answer._id, "up")}
                            color="grey"
                          />
                        )}

                        <Typography variant="small" color="white">
                          {answer.upvotes}
                        </Typography>
                        {answer.downvoters.includes(userId || user._id) ? (
                          <FaThumbsDown
                            onClick={() => handleVote(answer._id, "down")}
                            className="text-[#ef4444]"
                          />
                        ) : (
                          <FaThumbsDown
                            onClick={() => handleVote(answer._id, "down")}
                            color="grey"
                          />
                        )}

                        <Typography variant="small" color="white">
                          {answer.downvotes}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 ">
                  <Textarea
                    placeholder="Your answer..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="mb-2 backdrop-blur-md bg-white/5 rounded-lg text-white border-none outline-none focus:outline-1 focus:outline-blue-400"
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
            )}
          </div>
        </div>
      </div>

      {/* Dialog for creating a question */}
      <dialog
        id="ask-new-question-modal"
        className="modal modal-bottom sm:modal-middle bg-white/5 backdrop-blur-md rounded-xl shadow-xl"
      >
        <div className="modal-box bg-white/5 backdrop-blur-md rounded-xl shadow-xl">
          {/* Form with DaisyUI Components */}
          <div className="card w-full">
            <div className="card-body">
              <h2 className="card-title">Ask a Question</h2>

              {/* Title Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  className="input input-bordered"
                />
              </div>

              {/* Description Textarea */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Enter description"
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  className="textarea textarea-bordered"
                />
              </div>

              {/* Category Select */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="card-actions justify-end">
                <button
                  className="btn bg-teal-500 text-white"
                  onClick={handleCreateQuestion}
                >
                  Submit
                </button>
                <button
                  className="btn bg-[#ef4444] text-white"
                  onClick={() =>
                    document.getElementById("ask-new-question-modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Close Action */}
        <label htmlFor="ask-new-question-modal" className="modal-backdrop">
          Close
        </label>
      </dialog>
    </div>
  );
};

export default ForumPage;
