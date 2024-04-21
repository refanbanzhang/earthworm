// CourseTimer.js
type Milliseconds = number;
type Seconds = number;

type Timestamp = {
  start : Milliseconds;
  end : Milliseconds;
  duration: Seconds;
};

type Timestamps = Record<string, Timestamp>;

let timestamps: Timestamps = {};

function time(label: string) {
  if (timestamps[label]) return;

  timestamps[label] = {
    start : Date.now(),
    end : 0,
    duration: 0,
  };
}

function timeEnd(label: string) {
  const start = timestamps[label].start ;
  const end = Date.now();
  const duration = (Date.now() - start) / 1000;

  timestamps[label].end  = end;
  timestamps[label].duration = duration;
}

function calculateTotalTime() {
  const totalTime = Object.keys(timestamps).reduce((totalTime, key) => {
    const { duration } = timestamps[key];
    return (totalTime += duration);
  }, 0);

  return Math.ceil(totalTime);
}

function totalRecordNumber() {
  return Object.keys(timestamps).length;
}

function reset() {
  timestamps = {};
}

export const courseTimer = {
  time,
  timeEnd,
  calculateTotalTime,
  totalRecordNumber,
  reset,
};
