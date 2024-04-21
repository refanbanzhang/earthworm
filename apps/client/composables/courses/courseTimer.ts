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

// 初始化一个时间对象，里面存储了每个时间记录的开始时间、结束时间和持续时间
// 当然初始化的时候，只有start为当前时间，end和duration都为0
function time(label: string) {
  if (timestamps[label]) return;

  timestamps[label] = {
    start : Date.now(),
    end : 0,
    duration: 0,
  };
}

// 结束label对应的时间记录，计算出持续时间，并更新到timestamps[label]中
function timeEnd(label: string) {
  // 这里应该考虑一下处理timestamps[label]取值失败的情况
  if (!timestamps[label]) {
    return
  }

  const start = timestamps[label].start ;
  const end = Date.now();
  const duration = (Date.now() - start) / 1000;

  timestamps[label].end = end;
  timestamps[label].duration = duration;
}

// 计算所有时间记录的总持续时间
function calculateTotalTime() {
  const totalTime = Object.keys(timestamps).reduce((totalTime, key) => {
    const { duration } = timestamps[key];
    return (totalTime += duration);
  }, 0);

  return Math.ceil(totalTime);
}

// 计算时间记录的总数
function totalRecordNumber() {
  return Object.keys(timestamps).length;
}

// 重置所有的计时数据
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
