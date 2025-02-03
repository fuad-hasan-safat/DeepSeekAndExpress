const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getDeepSeekCareerobjective } = require("./calldeepseek");
const { constTant } = require("./constant");

const app = express()
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome to AI CVBUILDER BACKEND');
});

app.post('/access-deepseek', async (req, res) => {
    try {

        const profession = req.body.profession || null

        const {yearsOfExprience, skills} = req.query

        console.log("headers --> ", req.query)
        console.log("body--> ", req.body.profession)

        if (profession && profession.length > 0) {
            const data = await getDeepSeekCareerobjective(profession, yearsOfExprience,skills)
            // console.log(data)
            res.json({
                status: true,
                objective: data.DeepSeek || "No onjectives found"
            })
        }else {
            res.json({
                status: false,
                error: "Please ensure you have sent an profession name, and your string is not empty"
            })
        }


    } catch (error) {
        res.json({
            error: 'something went wrong'
        })
    }
});

const port = constTant.port || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});