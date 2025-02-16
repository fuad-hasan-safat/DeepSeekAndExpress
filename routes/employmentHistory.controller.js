const { deepSeekCalled } = require("../libs/accessDeepseek");

exports.getDeepSeekEmploymentHistory = async (profession, jobtitle = null) => {
    let myPrompt = `Generate a concise employment history for a ${profession} professional`;

    if (jobtitle) {
        myPrompt += ` specifically for the ${jobtitle} role`;
    }

    myPrompt += `. List 2-3 core responsibilities and 1 key achievement, using brief bullet points. Keep the entire response under 100 words.`;

    const data = await deepSeekCalled(myPrompt);
    return data;
};
exports.accessDeepseekEmploymentHistoryController = async (req, res) => {
    try {

        const profession = req.body.profession || null

        const { jobtitle = null } = req.query

        console.log("headers --> ", req.query)
        console.log("1.body--> ", req.body.profession)

        if (profession && profession.length > 0) {
            console.log("2. profession -->  inside  condition", profession)
            const data = await this.getDeepSeekEmploymentHistory(profession, jobtitle);
            // console.log(data)
            res.json({
                status: true,
                employment_history: data.DeepSeek || "No onjectives found"
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
