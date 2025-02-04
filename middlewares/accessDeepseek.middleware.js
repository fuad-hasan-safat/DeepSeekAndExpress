exports.accessDeepseekMiddleware = async(req, res, next) => {
    const profession = req.body.profession;
    const type = req.body.type
    const yearsOfExperience = req.query.yearsOfExprience;
    const skills = req.query.skills;

    if (!profession || profession.trim() === '') {
        return res.status(400).json({ error: 'Please provide a valid profession.' });
    }
    else if (!type || type.trim() === '' || (type !== 'summary' && type !== 'experience')) {
        return res.status(400).json({ error: 'Please provide a valid type. It can only be "summary" or "experience".' });
    }
    console.log("Accessing Deepseek middleware");
    next(); // Call the next middleware in the stack
}