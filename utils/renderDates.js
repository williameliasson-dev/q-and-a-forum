export default function renderDates(createdAt) {
  const curTime = new Date();
  const postTime = new Date(createdAt);
  let wSuffix;
  let hSuffix;
  let mSuffix;

  let delta = Math.abs(curTime - postTime) / 1000;

  let weeks = Math.floor(delta / 604800);
  delta -= weeks * 604800;

  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  if (weeks > 1) {
    wSuffix = "s";
  } else {
    wSuffix = "";
  }

  if (hours > 1) {
    hSuffix = "s";
  } else {
    hSuffix = "";
  }

  if (minutes > 1) {
    mSuffix = "s";
  } else {
    mSuffix = "";
  }

  let seconds = delta % 60; // in theory the modulus is not required

  console.log(weeks, days, hours, minutes);
  if (hours <= 0 && days === 0 && minutes === 0) {
    return `${Math.ceil(seconds)} seconds`;
  }
  if (hours <= 0 && days === 0) {
    return `${minutes} minute${mSuffix}`;
  }
  if (hours >= 1 && days === 0) {
    return `${hours} hour${hSuffix}`;
  }
  if (days >= 1 && days < 2 && hours > 0) {
    return `1 day and ${hours} hour${hSuffix}  `;
  }
  if (days >= 2 && days < 7 && hours != 0) {
    return `${days} days and ${hours} hour${hSuffix} `;
  }
  if (days >= 2 && days < 7 && hours === 0) {
    return `${days} days and ${minutes} minute${mSuffix} `;
  }
  if (weeks >= 1 && days === 0) {
    return `${weeks} week${wSuffix} `;
  }
  if (weeks >= 1 && days >= 1) {
    return `${weeks} week${wSuffix} and ${days}`;
  }
  return "DATE ERROR - PLEASE CONTACT SUPPORT";
}
