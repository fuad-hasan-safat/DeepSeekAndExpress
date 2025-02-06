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