import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import "../DashBoardPage/DashBoardPage.css";

export default function DashBoardStats({}) {
  const allStats = useSelector((store) => store.allStatsReducer);
  const sessions = useSelector((store) => store.sessionsReducer);
  const wins = [];
  const [winPercentage, setWinPercentage] = useState(0);

  useEffect(() => {
    sessions.allSessionsReducer.map((session, index) => {
      if (session.net_profit >= 0) {
        wins.push(session);
      }
    });

    console.log(
      "wins:",
      wins.length,
      ";",
      "sessions played:",
      sessions.allSessionsReducer.length,
      ";"
    );
    const workingWinPercent = Math.round(
      (wins.length / sessions.allSessionsReducer.length) * 100
    );
    setWinPercentage(isNaN(workingWinPercent) ? 0 : workingWinPercent);
  }, [sessions.allSessionsReducer]);

  return (
    <>
      <div className="stat">
        <p>Total Net Profit</p>
        {allStats[0] !== undefined ? (
          <NumericFormat
            className="h2"
            value={allStats[0].total_net}
            prefix={"$"}
            thousandSeparator=","
            allowNegative
            decimalScale={2}
            readOnly
            thousandsGroupStyle="lakh"
          />
        ) : (
          <h2>-</h2>
        )}
      </div>
      <div className="stat">
        <p>Total Sessions</p>
        {allStats[0] !== undefined ? (
          <h2>{allStats[0].total_sessions}</h2>
        ) : (
          <h2>-</h2>
        )}
      </div>
      <div className="stat">
        <p>Total Hours</p>
        {allStats[0] !== undefined ? (
          <h2>{allStats[0].total_hours}</h2>
        ) : (
          <h2>-</h2>
        )}
      </div>
      <div className="stat">
        <p>Win Rate</p>
        {allStats[0] !== undefined ? <h2>{winPercentage}%</h2> : <h2>-</h2>}
      </div>
      <div className="stat">
        <p>Session Avg</p>
        {allStats[0] !== undefined ? (
          <NumericFormat
            className="h2"
            value={allStats[0].avg_session_net}
            prefix={"$"}
            thousandSeparator=","
            allowNegative
            decimalScale={2}
            readOnly
            thousandsGroupStyle="lakh"
            
          />
        ) : (
          <h2>-</h2>
        )}
      </div>
      <div className="stat">
        <p>Avg Hourly</p>
        {allStats[0] !== undefined ? (
          <NumericFormat
            className="h2"
            value={allStats[0].hourly_total}
            prefix={"$"}
            thousandSeparator=","
            allowNegative
            decimalScale={2}
            readOnly
          />
        ) : (
          <h2>-</h2>
        )}
      </div>
    </>
  );
}
