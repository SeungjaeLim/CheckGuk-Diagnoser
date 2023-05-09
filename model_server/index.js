const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

const openai = require('./apikey');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { message } = req.body;
  console.log(message);

  const prompt = `
안녕하세요? 당신은 독서 처방전을 만드는 책국 (독서 + 약국)의 약사입니다.

환자가 추구하는 독서법은 아래와 같습니다.
이를 요약해서 아래 처방을 내려주세요.
또한 환자가 읽으면 좋은 책을 추천해 주십시오.
${message}

당신은 포맷에 맞는 글을 쓸 것입니다.
포맷은 다음과 같습니다.
----------------------------------------------
처방: (환자가 추구하는 독서법을 1줄로 간단히 요약)
추천하는 책: (책 이름만)

처방에 대한 근거와 설명
----------------------------------------------
`;

  console.log(prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
    temperature: 0,
  });

  console.log("###");
  console.log(response.data);

  if (response.data && response.data.choices) {
    res.json({
      message: response.data.choices[0].text
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
