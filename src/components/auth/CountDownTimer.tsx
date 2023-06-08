import React, { FC, useEffect } from "react";
// @ts-ignore
import { zeroPad } from "react-countdown";

import Icon from "components/shared/Icon";
import { useTimer } from "react-timer-hook";
import moment from "moment-jalaali";

const CountDownTimer: FC<{
  startDate: Date;
  /** duration to add to startDate in milliseconds */
  duration: number;
  onRestartClick: () => void;
}> = ({ onRestartClick, startDate, duration }) => {
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: moment(startDate).add(duration, "millisecond").toDate(),
  });

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const handleRestart = () => {
    restart(moment(startDate).add(duration, "millisecond").toDate());
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isRunning ? (
        <div
          dir="ltr"
          className="timer-container mt-2 flex items-baseline justify-center"
        >
          <span className="mr-1 text-[11px]">دیگر</span>
          <span>{zeroPad(minutes)}:</span>
          <span>{zeroPad(seconds)}</span>
          <span className="ml-1 text-[11px]">ارسال مجدد کد تا</span>
        </div>
      ) : (
        <button
          className="min-h-[24px] cursor-pointer text-[11px]"
          onClick={() => {
            onRestartClick();
          }}
        >
          ارسال مجدد
          <Icon className="ms-2" icon="resend" size={18} />
        </button>
      )}
    </div>
  );
};

export default React.memo(CountDownTimer);
