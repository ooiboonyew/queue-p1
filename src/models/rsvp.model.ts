export class Admin {
  adminID: number;
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
}

export class User {
  id: string;
  num: number;
  email: string;
  createdDate: object;
  guestAttend: number;
  guestAvailable: number;
  userAvailable: number;
  userAttend: number;
  chancesTotal: number;
  chancesLeft: number;
  lastCheckInDate: object;
}

export class Setting {
  annoucement: string;
  showLuckyDrawPage: boolean;
  showPhotoPage: boolean;
  showVotingPage: boolean;
}

// export class Booth {
//   id: string;
//   boothNum: number;
//   boothName: string;
//   secretDigit: string;
//   boothLink: string;
//   status: number;
// }

// export class BoothActivities {
//   id: string;
//   boothNum: number;
//   userId: string;
//   name: string;
//   staffId: string;
//   email: string;
//   chancesLeft: number;
//   status: number;
//   createdDate: object;
// }

export class Summary {
  totalGuest: number;
  totalCategory: number;
  totalData1: number;
  totalData2: number;
  totalData3: number;
  totalData4: number;
  totalData5: number;
  totalGuestCheckedIn: number;
  totalGuestAttended: number;
}

export class RSVP {
  day: string;
  issuedQueue: string;
  runningQueue: string;
  nextRunningQueue: string
  next2RunningQueue: string
  
  runningQueueNumber: number;
  issuedQueueNumber: number;
  
  // selected: boolean;
  // id: string;
  // num: number;
  // firstName: string;
  // lastName: string;
  // email: string;
  // company: string;
  // category:string;
  // data1: string;
  // data2: string;
  // data3: string;
  // data4: string;
  // data5: string;
  // qr: string;
  // createdDate: object;
  // checkedIn: boolean;
  // checkedInDate: object;
  // printDate: object;
  // emailDate: object;
}
