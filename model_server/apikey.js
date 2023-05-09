const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '',
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
