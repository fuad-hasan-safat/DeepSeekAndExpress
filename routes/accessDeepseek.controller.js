const { exec } = require("child_process");
const path = require("path");
const { fileURLToPath } = require("url");

exports.deepSeekCalled = async(myPrompt)=> {
    const scriptPath = path.join(__dirname, "jsseek.py");
    return new Promise((resolve, reject) => {
        exec(`python "${scriptPath}" "${myPrompt}"`, (error, stdout, stderr) => {
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
}


exports.getDeepSeekCareerobjective = async (profession, yearsOfExprience = null, skills = null) => {
    console.log("3.getDeepSeekCareerobjective --- called")
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

    console.log({myPrompt})

    const data = await this.deepSeekCalled(myPrompt)

    return data;
    //  deepSeekCalled(myPrompt);
  
};
exports.accessDeepseekController = async(req, res) =>{
    try {

        const profession = req.body.profession || null

        const { yearsOfExprience = null, skills = null } = req.query

        console.log("headers --> ", req.query)
        console.log("1.body--> ", req.body.profession)

        if (profession && profession.length > 0) {
            console.log("2. profession -->  inside  condition", profession)
            const data = await this.getDeepSeekCareerobjective(profession, yearsOfExprience, skills);
            // console.log(data)
            res.json({
                status: true,
                objective: data.DeepSeek || "No onjectives found"
            })
        } else {
            res.json({
                status: false,
                error: "Please ensure you have sent a profession name, and your string is not empty"
            })
        }


    } catch (error) {
        res.json({
            error: 'something went wrong'
        })
    }
}
