const express = require("express");
const cors = require("cors");
const path = require("path");

const { buildQuery } = require("./utils");

const createServer = () => {
  const app = express();

  app.use(cors({ origin: "http://localhost:3001" }));
  app.use("/", express.static("client/build"));

  app.get("/api/space-x-launches", async (req, res) => {
    const queyParams = req.query;
    let year;
    let page = 1;

    if (queyParams.year) {
      const value = parseInt(queyParams.year, 10);

      if (!isNaN(value)) {
        year = value;
      }
    }

    if (queyParams.page) {
      const value = parseInt(queyParams.page, 10);

      if (!isNaN(value)) {
        page = value;
      }
    }

    const result = await fetch("https://api.spacexdata.com/v4/launches/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildQuery({ year, page })),
    }).then((response) => response.json());

    res.send(result);
  });

  app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });

  app.listen(3000, () => console.log("Server is listening on port 3000."));
};

module.exports = createServer;
