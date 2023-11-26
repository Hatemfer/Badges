
const { Octokit } = require("@octokit/rest");

const token = "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";
const owner = "Free-Badgets";
const repo = "Badges";

const octokit = new Octokit({ auth: token });
const prefix = 'branch-';
const suffix = 'abcdefghijklmnopqrstuvwxyz1234567890'; // Adding more characters

const generateBranchName = (index) => {
  const paddedIndex = index.toString().padStart(4, '0');
  const additionalChars = suffix.substring(0, 36); // Adjust the substring length as needed
  return `${prefix}${paddedIndex}-${additionalChars}`;
};

async function createPRs() {
  const pullRequestURLs = [];

  try {
    for (let i = 1; i <= 2; i++) {
      const branchName = generateBranchName(i);

      try {
        await octokit.git.createRef({
          owner,
          repo,
          ref: `refs/heads/${branchName}`,
          sha: "main",
        });
        console.log(`Branch ${branchName} created`);
      } catch (branchError) {
        console.error(`Error creating branch ${branchName}:`, branchError);
        continue;
      }

      try {
        const pr = await octokit.pulls.create({
          owner,
          repo,
          title: `PR #${i}`,
          head: branchName,
          base: "main",
        });
        console.log(`Pull request #${i} created: ${pr.data.html_url}`);
        pullRequestURLs.push(pr.data.html_url); 
      } catch (prError) {
        console.error(`Error creating pull request #${i}:`, prError);
        continue;
      }
    }

    for (const url of pullRequestURLs) {
      try {
        const pullNumber = url.split("/").pop();
        await octokit.pulls.merge({
          owner,
          repo,
          pull_number: pullNumber,
        });
        console.log(`Pull request merged: ${url}`);
      } catch (mergeError) {
        console.error(`Error merging pull request ${url}:`, mergeError);
      }
    }
  } catch (loopError) {
    console.error("Error in loop:", loopError);
  }
}

createPRs();
