const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { constTant } = require("./constant");
const { accessDeepseekMiddleware } = require("./middlewares/accessDeepseek.middleware");
const { professionalSummaryController } = require("./routes/professionalSummary.controller");
const { accessDeepseekEmploymentHistoryController } = require("./routes/employmentHistory.controller");

const app = express()
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome to AI CVBUILDER BACKEND');
});

app.post('/professional-summary-ai', accessDeepseekMiddleware, professionalSummaryController);
app.post('/employment-history-ai', accessDeepseekMiddleware, accessDeepseekEmploymentHistoryController);

const port = constTant.port || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});