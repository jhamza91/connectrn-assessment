const fs = require("fs");
const express = require("express");
const path = require("path");

const chanceOfFailure = 0.1;
const port = 9001;
const shiftList = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "shift_list.json"), "utf8")
);
const nurseList = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "nurse_list.json"), "utf8")
);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../dist")));
}

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

/**
 * Returns a JSON list of the shifts in the facility
 */
app.get("/shifts", (req, res) => {
  console.info("Attempting to send shift list to requestor");
  if (Math.random() > chanceOfFailure) {
    res.status(200).send(shiftList);
    console.info("Successfully delivered shift list");
  } else {
    res.status(500).send({ error: "Server blew up" });
    console.error("Oh no! The shift send failed!");
  }
});

/**
 * Returns a JSON list of nurses in the facility
 */
app.get("/nurses", (req, res) => {
  console.info("Attempting to send nurse list to requestor");
  if (Math.random() > chanceOfFailure) {
    res.status(200).send(nurseList);
    console.info("Successfully delivered nurse list");
  } else {
    res.status(500).send({ error: "Server blew up" });
    console.error("Oh no! The nurse send failed!");
  }
});

/**
 * Given an API call with a shift ID to save and a nurseID in the request body, will fake saving that nurse to the shift.
 */
app.put("/shifts/:shiftID", (req, res) => {
  const shiftID = req.params.shiftID;
  const nurseID = req.body.nurseID;
  console.info(
    `Attempting to save shift ${shiftID} with nurse ${nurseID} assigned to it.`
  );
  if (Math.random() > chanceOfFailure) {
    res.status(200).send({
      shiftID,
      nurseID,
    });
    console.info(`Successfully saved the shift ${shiftID}`);
  } else {
    res.status(500).send({ error: "Server blew up" });
    console.error("Oh no! The save failed!");
  }
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
