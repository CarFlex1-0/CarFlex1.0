// // services/plagiarism.js

// const axios = require("axios");
// const qs = require("qs"); // To help with form URL encoding

// // API token
// const API_TOKEN = process.env.PLAGIARISM_CHECK_ORG_KEY;

// // Step 1: Send the text for plagiarism check
// async function submitTextForPlagiarismCheck(text) {
//   try {
//     const response = await axios.post(
//       "https://plagiarismcheck.org/api/v1/text",
//       qs.stringify({
//         language: "en",
//         text: text,
//       }),
//       {
//         headers: {
//           "X-API-TOKEN": API_TOKEN,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     const textId = response.data.data.text.id;
//     console.log("Text submitted. ID:", textId);
//     return textId;
//   } catch (error) {
//     console.error(
//       "Error submitting text:",
//       error.response ? error.response.data : error.message
//     );
//   }
// }
// // Step 2: Check the status of the plagiarism check
// async function checkPlagiarismStatus(textId) {
//   try {
//     const response = await axios.get(
//       `https://plagiarismcheck.org/api/v1/text/${textId}`,
//       {
//         headers: {
//           "X-API-TOKEN": API_TOKEN,
//         },
//       }
//     );
//     const status = response.data.data.state;
//     console.log("Plagiarism check status:", status);
//     return status;
//   } catch (error) {
//     console.error(
//       "Error checking status:",
//       error.response ? error.response.data : error.message
//     );
//   }
// }

// // Step 3: Get the plagiarism report
// async function getPlagiarismReport(textId) {
//   try {
//     const response = await axios.get(
//       `https://plagiarismcheck.org/api/v1/text/report/${textId}`,
//       {
//         headers: {
//           "X-API-TOKEN": API_TOKEN,
//         },
//       }
//     );
//     const plagiarismPercent = response.data.data.report.percent;
//     console.log("Plagiarism Percentage:", plagiarismPercent);
//   } catch (error) {
//     console.error(
//       "Error fetching report:",
//       error.response ? error.response.data : error.message
//     );
//   }
// }

// module.exports = {
//   submitTextForPlagiarismCheck,
//   checkPlagiarismStatus,
//   getPlagiarismReport,
// };
// // // Example usage:
// // const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nisl vel sem vehicula, sed elementum metus ullamcorper. Nunc lacinia ac lectus quis auctor. Sed pulvinar varius metus vitae fermentum. Vestibulum lobortis purus eget dui porttitor, sed mattis nisi finibus. Nullam pretium, mi vitae ultricies mollis, libero urna rhoncus est, ut posuere risus ligula quis nunc. Ut eget luctus ligula. Fusce sed ultrices massa, quis tincidunt lacus. Phasellus consequat porta urna, ullamcorper commodo leo congue a. Cras et scelerisque nibh. Nulla vitae feugiat libero. Curabitur sed nunc sit amet mi commodo accumsan nec vitae diam. Etiam erat risus, scelerisque ut.`;

// // (async () => {
// //   const textId = await submitTextForPlagiarismCheck(sampleText);

// //   if (!textId) {
// //     console.log("Error: Text ID not generated.");
// //     return;
// //   }

// //   // Check the status periodically until plagiarism check is done, with a max retry count
// //   let status;
// //   let retries = 0;
// //   const maxRetries = 10; // Maximum number of retries

// //   do {
// //     status = await checkPlagiarismStatus(textId);
// //     if (status !== 5) {
// //       console.log("Plagiarism check not completed yet. Waiting...");
// //       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
// //     }
// //     retries++;
// //     if (retries >= maxRetries) {
// //       console.error("Max retries reached. Exiting...");
// //       return;
// //     }
// //   } while (status !== 5);

// //   // Fetch and log the plagiarism report
// //   await getPlagiarismReport(textId);
// // })();

const axios = require("axios");

const PLAGIARISM_CHECK_URL =
  "https://100085.pythonanywhere.com/uxlivinglab/v1/content-scan/1b834e07-c68b-4bf6-96dd-ab7cdc62f07f/";

async function checkPlagiarism(content, title) {
  try {
    console.log("Sending request to plagiarism check service...");
    const response = await axios.post(PLAGIARISM_CHECK_URL, {
      content: content,
      title: title,
    });

    console.log(
      "Received response from plagiarism check service:",
      response.data
    );

    if (response.data.success) {
      
      return response.data;
    } else {
      throw new Error("Plagiarism check failed: " + response.data.message);
    }
  } catch (error) {
    console.error(
      "Error checking plagiarism:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {
  checkPlagiarism,
};

// (async () => {
//   const title = "My first test";
//   const content = "Hi I am Mohid Anwar And this is My First Blog Totally Human Written at this point in time ";

//   try {
//     const result = await checkPlagiarism(content, title);
//     console.log("Plagiarism Check Result:", result);
//   } catch (error) {
//     console.error("Error during plagiarism check:", error.message);
//   }
// })();
