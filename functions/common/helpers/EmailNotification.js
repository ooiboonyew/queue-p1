var nodemailer = require("nodemailer");
var path = require("path");
const qrcode = require("qrcode");

const SettingModel = require("../../models/SettingModel");
const settingModel = new SettingModel();

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   //port: 587,
//   auth: {
//     user: "hhglobalevents@gmail.com",
//     pass: "hfmjajibkudqotbz",
//   },
// });

// var transporter = nodemailer.createTransport({
//   host: "mail.privateemail.com",
//   port: "587",
//   auth: {
//     user: "support@sgrsvp.com",
//     pass: "Qwer1234!",
//   },
// });

async function sendRsvpEmail(rsvp) {
  var setting = await settingModel.getById("mail_server");

  var transporter;
  var from;
  if (setting.value == 1) {
    from = ` Charles Rudd Distinguisehed Public Lectures 2023<charlesrudd2023@sgrsvp.com>`;

    transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: "587",
      auth: {
        user: "charlesrudd2023@sgrsvp.com",
        pass: "charles2023!",
      },
    });
  } else {
    from = ` Charles Rudd Distinguisehed Public Lectures 2023<support@sgrsvp.com>`;
    // from = `SG RSVP <support@sgrsvp.com>`;

    transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: "587",
      auth: {
        user: "support@sgrsvp.com",
        pass: "Qwer1234!",
      },
    });
  }

  const to = rsvp.email;

  var subject =
    "Welcome to IES Charles Rudd Distinguished Public Lectures 2023! Here is your E-badge";

  var catStyle = "background-color:#144414;color:white";

  if (rsvp.category.toUpperCase() == "VIP") {
    catStyle = "background-color:#144414;color:white";
  // }else if (rsvp.category.toUpperCase() == "UPPER CASE"){
  //   catStyle = "background-color:#144414;color:white";
  }
  else {
    catStyle = "background-color:#F5F500;color:black";
  }

  var venue = "";

  switch (rsvp.data1) {
    case "Grundfos Tour":
      // catStyle = "background-color:red;color:black";
      venue = "Carpark D @ Block T12";
      break;
    case "Advanced Materials Technology Centre":
      // catStyle = "background-color:blue;color:white";
      venue = "Block W212-W214";
      break;
    case "Consumer Chemicals Technology Centre":
      // catStyle = "background-color:green;color:black";
      venue = "Block T11A, Level 4";
      break;
    case "Data Science & Analytics Centre":
      // catStyle = "background-color:orange;color:black";
      venue = "AiCoLab, Block T1A310";
      break;
    case "5G & AIoT Centre":
      // catStyle = "background-color:purple;color:white";
      venue = "Block T14, Level 3";
      break;
    case "School of Architecture & The Built Environment":
      // catStyle = "background-color:yellow;color:black";
      venue = "LT18A";
      break;
    case "School of Business x UOB":
      // catStyle = "background-color:pink;color:black";
      venue = "TT18B204";
      break;
    default:
      break;
  }

  var message = `
  <html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting" />
<style>
.main {font-family: Arial; font-size:12px;line-height: 1.4}
.table {font-family: Arial; font-size:12px;}
.p {font-family: Arial; font-size:12px;line-height: 1.6}
img {
  display: block;
  margin: 0 auto;
}
</style>
</head>
<body>
<div class="main">
<img class="banner" alt="web_image" width="100%" src="cid:edm-web" /> 
<p style="padding-top:5px">Name: ${rsvp.firstName} ${rsvp.lastName}</p>
<p>Company: ${rsvp.company}</p>
<div style="text-align:center">
<img class="banner" alt="qr" width="200px" src="cid:qr" />
<p style="font-size:20px;padding-top:10px;padding-bottom:10px;${catStyle}"
>${rsvp.data1}<br />
<span style="font-size:12px">${venue != '' ? "Venue: " : ""}${venue}</span><br />
<span style="font-size:12px">${ rsvp.data2 != '' ? "To avoid overcrowding, kindly visit the truck at: " : ""}${rsvp.data2}</span>
</p>
<p style="padding-top:5px">Please show this QR code for entrance</p>
</div>
</div>
</body>
</html>
`;

  //http://localhost:4200/admin/checkin?id=NxEwAlsrLZwVAplqBuwb
  var imagePath = path.join(__dirname, "../../images/Mail Banner.jpg"); // In this line, Give the full path of image.
  const qrCodeDataUrl = await qrcode.toBuffer(rsvp.id);

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: message,
    attachments: [
      {
        filename: "Mail Banner.jpg",
        path: imagePath,
        cid: "edm-web", //same cid value as in the html img src
      },
      {
        filename: "qr.jpg",
        content: qrCodeDataUrl,
        cid: "qr", //same cid value as in the html img src
      },
    ],
  };

  // console.log(message);
  return await transporter.sendMail(mailOptions);
}

module.exports = {
  sendRsvpEmail,
};
