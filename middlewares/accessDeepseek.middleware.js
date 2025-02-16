exports.accessDeepseekMiddleware = async(req, res, next) => {
    const profession = req.body.profession;

    if (!profession || profession.trim() === '') {
        return res.status(400).json({ error: 'Please provide a valid profession.' });
    }

    console.log("Accessing Deepseek middleware");
    next(); // Call the next middleware in the stack
}