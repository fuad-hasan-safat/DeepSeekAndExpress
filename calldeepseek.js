const { exec } = require("child_process");

exports.getDeepSeekCareerobjective = async (profession, yearsOfExprience = null, skills = null) => {
    let myPrompt = `Write a concise, professional first-person summary for a ${profession} in one paragraph (strictly 100 words). Use a natural, confident tone and avoid generic phrases. Focus on: 
    - Core expertise and industry-specific value
    - Quantifiable achievements (if implied by experience/skills)
    - Relevant skills applied in real-world contexts
    - Avoid clichés like "team player" or "results-driven." Write as if the ${profession} is speaking directly. Use present tense and first-person pronouns. Example: "I design..." instead of "He designs...".`;
    
    if (yearsOfExprience && skills) {
      myPrompt += ` Highlight ${yearsOfExprience} years of experience in ${profession}, emphasizing expertise in ${skills}. Mention 1-2 brief examples of how these skills solved problems or delivered results.`;
    } else if (yearsOfExprience) {
      myPrompt += ` Showcase ${yearsOfExprience} years of experience, focusing on key achievements or specialization areas (e.g., "I have streamlined workflows for 50+ clients..." instead of "experienced").`;
    } else if (skills) {
      myPrompt += ` Prioritize the skills: ${skills}. Demonstrate their practical application (e.g., "I leverage ${skills.split(', ')[0]} to develop...").`;
    }

    return new Promise((resolve, reject) => {
        exec(`python jsseek.py "${myPrompt}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject({ error: "Execution failed" });
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject({ error: stderr });
                return;
            }
            try {
                const result = JSON.parse(stdout);
                console.log("DeepSeek Response:", result.DeepSeek);
                resolve(result);
            } catch (err) {
                console.error("Invalid JSON output:", stdout);
                reject({ error: "Invalid JSON response" });
            }
        });
    });
};
