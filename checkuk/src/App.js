import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Button, Card, CardActions, CardContent, Grid, Tab, Tabs, Typography, createMuiTheme, ThemeProvider, TextField, IconButton } from "@material-ui/core";
import { LocalHospital } from "@material-ui/icons";

import "./App.css";
import poster from "./assets/poster.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#4caf50",
    },
  },
});

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [output, setOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const openaiApiKey = "my key"; // Replace with your OpenAI API Key
  const configuration = new Configuration({ apiKey: openaiApiKey });
  const openai = new OpenAIApi(configuration);

  const handleClick = async () => {
    try {
      const prompt = `안: ${input1}\n옆: ${input2}\n밖: ${input3}\nOutput:`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.5,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });

      if (response.choices && response.choices.length > 0) {
        setOutput(response.choices[0].text.trim());
      } else {
        setOutput("No response generated.");
      }
    } catch (error) {
      console.error("Error generating output:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="header">
          <h1 className="title">늘 푸른 우리 책국</h1>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="navigation tabs">
            <Tab label="prescription" />
            <Tab label="About" />
            <Tab label="Contact" />
          </Tabs>
        </header>
        <main>
        {selectedTab === 0 && (
  <Grid container spacing={3} direction="column">
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom style={{textAlign: "center"}}>
            <img src="https://cdn.pixabay.com/photo/2016/10/06/19/02/book-1719737_960_720.png" style={{height: "1em"}} alt="Rx symbol"/>  독서 처방  <img src="https://cdn.pixabay.com/photo/2016/10/06/19/02/book-1719737_960_720.png" style={{height: "1em"}} alt="Rx symbol"/>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>자신의 답변, 자신이 파밍한 답변, 자신이 구매한 답변을 적어주세요</Typography>
          <div style={{border: "1px solid #ccc", borderRadius: "5px", padding: "20px"}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>독서 안</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>독서 옆</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>독서 밖</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <IconButton variant="contained" color="primary" onClick={handleClick}>
                      <LocalHospital />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" gutterBottom>처방전</Typography>
                    <Typography variant="body1">{output}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div style={{marginTop: "20px", textAlign: "center"}}>
              <img src="https://cdn.pixabay.com/photo/2014/12/21/23/39/pills-575765_960_720.png" style={{height: "1em"}} alt="Rx symbol"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)}
{selectedTab === 1 && (
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <Card>
                  
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <img src={poster} alt="poster" style={{ width: "100%" }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {selectedTab === 2 && (
  <Grid container spacing={3} direction="column">
    <Grid item xs={12}>
      <Card style={{ backgroundColor: "#f8f8f8" }}>
        <CardContent>
          <Grid container justify="center">
            <Grid item xs={12} md={8}>
              <Typography variant="body1" gutterBottom>
                If you have any questions or feedback, please contact Seungjae Lim at seungjaelim@kaist.ac.kr.
              </Typography>
              <Typography variant="body1">
                You can also view the source code for this project on GitHub at <a href="https://github.com/SeungjaeLim">https://github.com/SeungjaeLim</a>.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: "2em" }}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  borderRadius: "20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "none",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)}

        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

