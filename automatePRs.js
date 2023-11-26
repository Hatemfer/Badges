const { Octokit } = require("@octokit/rest");

const token = "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";
const owner = "Hatemfer";
const repo = "Badges";

const octokit = new Octokit({ auth: token });

async function createPRs() {
  try {
    console.log("Creating PR");
    // for (let i = 1; i <= 2; i++) {
    //   // Generate a unique branch name
    //   const branchName = `branch-${i}`;

    //   // Create a new branch
    //   try {
    //     await octokit.git.createRef({
    //       owner,
    //       repo,
    //       ref: `refs/heads/${branchName}`,
    //       sha: "main", // SHA of the commit to base the branch off of
    //     });
    //     console.log(`Branch ${branchName} created`);
    //   } catch (branchError) {
    //     console.error(`Error creating branch ${branchName}:`, branchError);
    //   }

    //   // Create a pull request
    //   try {
    //     const pr = await octokit.pulls.create({
    //       owner,
    //       repo,
    //       title: `PR #${i}`,
    //       head: branchName,
    //       base: "main",
    //     });
    //     console.log(`Pull request #${i} created: ${pr.data.html_url}`);
    //   } catch (prError) {
    //     console.error(`Error creating pull request #${i}:`, prError);
    //   }

    //   // Merge the pull request
    //   try {
    //     const merge = await octokit.pulls.merge({
    //       owner,
    //       repo,
    //       pull_number: i,
    //     });
    //     console.log(`Pull request #${i} merged: ${merge.status}`);
    //   } catch (mergeError) {
    //     console.error(`Error merging pull request #${i}:`, mergeError);
    //   }
    // }
  } catch (loopError) {
    console.error("Error in loop:", loopError);
  }
}

createPRs();
