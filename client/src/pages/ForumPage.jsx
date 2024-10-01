import React, { useEffect } from "react";
import { useForum } from "@contexts/ForumContext"; // Make sure this import is correct

const ForumPage = () => {
  const { threads, fetchThreads, selectedThread, handleThreadSelect } =
    useForum();

  useEffect(() => {
    fetchThreads(); // Fetch the threads when the component mounts
  }, []);

  return (
    <div>
      <h1>Forum Threads</h1>
      {threads.map((thread) => (
        <div key={thread._id} onClick={() => handleThreadSelect(thread._id)}>
          <h2>{thread.title}</h2>
        </div>
      ))}

      {selectedThread && (
        <div>
          <h1>{selectedThread.title}</h1>
          <p>{selectedThread.content}</p>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
