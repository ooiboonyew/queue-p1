const CSVToJSON = require("csvtojson");
const functions = require("firebase-functions");
const {
  verifyToken,
  adeErrorHandler,
  addResponseHeader,
} = require("../common/middlewares");
const EmailNotification = require("../common/helpers/EmailNotification");

const express = require("express");
const cors = require("cors");
const rsvpApp = express();
rsvpApp.use(cors({ origin: true }));

const RsvpModel = require("../models/RsvpModel");
const rsvpModel = new RsvpModel();

const AdminModel = require("../models/AdminModel");
const adminModel = new AdminModel();

const SettingModel = require("../models/SettingModel");
const settingModel = new SettingModel();

const _ = require("lodash");
const converter = require("json-2-csv");

// rsvpApp.use(verifyToken);
rsvpApp.use(addResponseHeader);

rsvpApp.get("/", async (req, res, next) => {
  try {
    return res.status(200).json("ok");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp", async (req, res, next) => {
  try {
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/addadmin", async (req, res, next) => {
  try {
    await adminModel.add({
      adminID: 1,
      email: "admin@rsvp.com",
      password: "admin@123",
    });
    await adminModel.add({
      adminID: 1,
      email: "admin@sgrsvp.com",
      password: "admin4321",
    });
    await adminModel.add({
      adminID: 2,
      email: "checkin@sgrsvp.com",
      password: "onsit3",
    });
    await adminModel.add({
      adminID: 3,
      email: "helpdesk@sgrsvp.com",
      password: "helpd3sk",
    });
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/email/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    var rsvp = await rsvpModel.getRSVPById(id);
    var emailresult = await EmailNotification.sendRsvpEmail(rsvp);
    rsvp.emailDate = new Date();
    var updatedRsvp = await rsvpModel.update(rsvp);

    return res.status(200).json(updatedRsvp);
  } catch (error) {
    console.log(error);
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/listRSVP", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/getSetting/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await settingModel.getById(id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/getrsvp/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await rsvpModel.getRSVPById(id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/GetRSVPByQR/:qr", async (req, res, next) => {
  try {
    const qr = req.params.qr;

    const result = await rsvpModel.getRSVPbyQR(qr);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/summary", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();
    var summary = {};
    summary.totalGuest = result.length;
    summary.totalGuestCheckedIn = result.filter(
      (x) => x.checkedIn == true
    ).length;

    var totalCategory = _.map(
      _.groupBy(result, (x) => x.category),
      (vals, key) => {
        return {
          category: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalCategory = totalCategory;

    var totalData1 = _.map(
      _.groupBy(result, (x) => x.data1),
      (vals, key) => {
        return {
          data1: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData1 = totalData1;

    var totalData2 = _.map(
      _.groupBy(result, (x) => x.data2),
      (vals, key) => {
        return {
          data2: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData2 = totalData2;

    var totalData3 = _.map(
      _.groupBy(result, (x) => x.data3),
      (vals, key) => {
        return {
          data3: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData3 = totalData3;

    var totalData4 = _.map(
      _.groupBy(result, (x) => x.data4),
      (vals, key) => {
        return {
          data4: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData4 = totalData4;

    var totalData5 = _.map(
      _.groupBy(result, (x) => x.data5),
      (vals, key) => {
        return {
          data5: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData5 = totalData5;

    // console.log(summary);
    return res.status(200).json(summary);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

rsvpApp.post("/admin/login", async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    var admin = await adminModel.checkAdmin(email);

    if (admin && admin.password == password) {
      return res.status(200).json(admin);
    } else {
      return res.status(401).json("Invalid Email or Password");
    }

    // let hardEmail = "admin@rsvp.com";
    // let hardPassword = "admin@123";

    // let hardEmail2 = "checkin@rsvp.com";
    // let hardPassword2 = "check@in";

    // if (email == hardEmail && password == hardPassword) {
    //   return res.status(200).json({ adminID: 1, name: "Admin", email: email });
    // } else if (email == hardEmail2 && password == hardPassword2) {
    //   return res.status(200).json({ adminID: 2, name: "Admin", email: email });
    // } else {
    //   return res.status(401).json("Invalid Email or Password");
    // }
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/add", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.createdDate = new Date();
    rsvp.email = rsvp.email.toLowerCase();

    if (rsvp.email) {
      var existingRSVP = await rsvpModel.checkRSVPEmail(rsvp.email);

      if (existingRSVP.id) {
        return res
          .status(405)
          .json(
            "Your email shows that you have already registered for this event."
          );
      }
    }

    if (rsvp.checkedIn) {
      rsvp.checkedInDate = new Date();
    }

    const resultId = await rsvpModel.add(rsvp);
    rsvp.id = resultId;

    return res.status(200).json(resultId);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/update", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.email = rsvp.email.toLowerCase();

    if (rsvp.checkedIn) {
      rsvp.checkedInDate = new Date();
    } else {
      rsvp.checkedInDate = null;
    }

    const result = await rsvpModel.update(rsvp);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/printRSVP/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await rsvpModel.getRSVPById(id);
    result.printDate = new Date();
    await rsvpModel.update(result);

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/checkin", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.checkedInDate = new Date();
    rsvp.checkedIn = true;
    rsvp.emailDate = new Date();
    await rsvpModel.update(rsvp);
    await EmailNotification.sendRsvpEmail(rsvp);
    const result = await rsvpModel.getRSVPById(rsvp.id);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addRunningQueue", async (req, res, next) => {
  try {
    var prefix = await settingModel.getById("prefix");
    var runningQueue = await rsvpModel.getRSVPById("runningQueue");
    runningQueue.queueNumber += 1;
    const resultId = await rsvpModel.update(runningQueue);
    var result =
      prefix.value + String(runningQueue.queueNumber).padStart(4, "0");

    return res.status(200).json({
      runningQueue: result,
      runningQueueNumber: runningQueue.queueNumber,
    });
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addIssuedQueue", async (req, res, next) => {
  try {
    var prefix = await settingModel.getById("prefix");
    var issuedQueue = await rsvpModel.getRSVPById("issuedQueue");
    issuedQueue.queueNumber += 1;
    const resultId = await rsvpModel.update(issuedQueue);
    var result =
      prefix.value + String(issuedQueue.queueNumber).padStart(4, "0");

    return res.status(200).json({
      issuedQueue: result,
      issuedQueueNumber: issuedQueue.queueNumber,
    });
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/GetQueue", async (req, res, next) => {
  try {
    var prefix = await settingModel.getById("prefix");
    var runningQueue = await rsvpModel.getRSVPById("runningQueue");
    var issuedQueue = await rsvpModel.getRSVPById("issuedQueue");

    var strRunningQueue =
      prefix.value + String(runningQueue.queueNumber).padStart(4, "0");
    var strNextRunningQueue =
      prefix.value + String(runningQueue.queueNumber + 1).padStart(4, "0");
    var strNext2RunningQueue =
      prefix.value + String(runningQueue.queueNumber + 2).padStart(4, "0");
      
    var strIssuedQueue =
      prefix.value + String(issuedQueue.queueNumber).padStart(4, "0");

    return res.status(200).json({
      runningQueue: strRunningQueue,
      nextRunningQueue: strNextRunningQueue,
      next2RunningQueue: strNext2RunningQueue,
      issuedQueue: strIssuedQueue,
      runningQueueNumber: runningQueue.queueNumber,
      issuedQueueNumber: issuedQueue.queueNumber,
    });
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

// exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
exports.rsvp = functions
  .region("asia-southeast1")
  .runWith({
    timeoutSeconds: 300,
    memory: "1GB",
  })
  .https.onRequest(rsvpApp);
