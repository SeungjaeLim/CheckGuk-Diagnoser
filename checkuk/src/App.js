import React, { useState } from "react";
import API_ENDPOINT from './config';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  createMuiTheme,
  ThemeProvider,
  TextField,
  IconButton,
} from "@material-ui/core";
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

function parseText(text) {
  const parsedText = {};

  const prescriptionMatch = text.match(/처방: (.*?)\n추천하는 책:/);
  if (prescriptionMatch) {
    parsedText.prescription = prescriptionMatch[1];
  }

  const recommendedBookMatch = text.match(/추천하는 책: (.*?)(?:\n\n|\n)처방에 대한 근거와 설명:/);
  if (recommendedBookMatch) {
    parsedText.recommendedBook = recommendedBookMatch[1];
  }

  const explanationMatch = text.match(/처방에 대한 근거와 설명:\s*(.*)/
  );
  if (explanationMatch) {
    parsedText.explanation = explanationMatch[1];
  }

  return parsedText;
}

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [output, setOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleClick = (e) => {
    const message = `${input1}. ${input2}. ${input3}`;
    console.log(JSON.stringify({prompt}))
    e.preventDefault()
    fetch(`${API_ENDPOINT}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message})
    })
    .then((res) => res.json())
    .then((data) => {
      const parsedResponse = parseText(data.message.replace(/\\n/g, '\n'));
      console.log(data.message.replace(/\\n/g, '\n'))
      console.log(parsedResponse)
      setOutput(parsedResponse);
    });
  }
  

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
          <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/10/06/19/02/book-1719737_960_720.png"
              style={{ height: "1em" }}
              alt="Rx symbol"
            />{" "}
            독서 처방{" "}
            <img
              src="https://cdn.pixabay.com/photo/2016/10/06/19/02/book-1719737_960_720.png"
              style={{ height: "1em" }}
              alt="Rx symbol"
            />
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            자신의 답변, 자신이 파밍한 답변, 자신이 구매한 답변을 적어주세요
          </Typography>

          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>
                  독서 안
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>
                  독서 옆
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" gutterBottom>
                  독서 밖
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={handleClick}
                    >
                      <LocalHospital />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h5" gutterBottom>
        처방전
      </Typography>
      <div style={{ marginBottom: "8px" }}>
        <Typography variant="subtitle1" gutterBottom>
          처방
        </Typography>
        <Typography variant="body1" gutterBottom>
          {output.prescription}
        </Typography>
      </div>
      <div style={{ marginTop: "16px", marginBottom: "8px" }}>
        <Typography variant="subtitle1" gutterBottom>
          추천도서
        </Typography>
        <Typography variant="body1" gutterBottom>
          {output.recommendedBook}
        </Typography>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Typography variant="body1">
          {output.explanation}
        </Typography>
      </div>
    </CardContent>
  </Card>
</Grid>

            </Grid>
            <div
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2014/12/21/23/39/pills-575765_960_720.png"
                style={{ height: "1em" }}
                alt="Rx symbol"
              />
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
</ThemeProvider>);
}

export default App;
