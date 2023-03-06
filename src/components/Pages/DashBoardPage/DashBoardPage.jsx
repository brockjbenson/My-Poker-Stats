import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Nav from "../../Shared/Nav/Nav";
import "../SpecificVenuePage/SpecificVenuePage.css";
import "../DashBoardPage/DashBoardPage.css";
import DashBoardStats from "./DashBoardStats";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Colors } from "chart.js";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

Chart.register(Colors);

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const [totalNet, setTotalNet] = useState(0);
  const [ind1, setInd1] = useState("indicator-active");
  const [ind2, setInd2] = useState("indicator-not-active");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const allStats = useSelector((store) => store.allStatsReducer);
  const sessionCard = useSelector(
    (store) => store.sessionsReducer.allSessionsReducer
  );
  console.log();
  const venueStats = useSelector(
    (store) => store.venuesReducer.getVenuesStatsReducer
  );
  console.log("venue:", venueStats[0]);
  console.log("session:", sessionCard);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_STATS" });
    dispatch({ type: "FETCH_SESSIONS" });
    dispatch({ type: "FETCH_VENUES" });
    dispatch({ type: "FETCH_VENUES_STATS" });
  }, []);

  useEffect(() => {
    allStats[0] !== undefined && setTotalNet(allStats[0].total_net);
  }, [allStats]);

  console.log(totalNet);

  const sendToVenues = () => {
    history.push(`/venue-list`);
  };

  const sendToVenue = (venid) => {
    history.push(`/venue-view/${venid}`);
  };

  const sendToSession = (seshid, venid) => {
    history.push(`/session-view/${seshid}/${venid}`);
  };

  const sendToCards = () => {
    const element = document.getElementById("el-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setInd2("indicator-not-active");
      setInd1("indicator-active");
    }
  };

  const sendToGraph = () => {
    const element = document.getElementById("el-2");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setInd2("indicator-active");
      setInd1("indicator-not-active");
    }
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <h1 className="clr-light">Overview</h1>
          <div className="buttons-container"></div>
        </div>
        <div className="stats-container">
          <DashBoardStats />
        </div>

        <div className="card-container">
          {allStats[0] !== undefined ? (
            <div className="card-section-1a">
              <div className="card-header-section-1">
                <p></p>
              </div>
              <div className="middle-card-section">
                <FaAngleLeft
                  className="scroll-btn hover"
                  onClick={sendToCards}
                />
                <div className="indicators">
                  <div className={ind1}></div>
                  <div className={ind2}></div>
                </div>

                <FaAngleRight
                  className="scroll-btn hover"
                  onClick={sendToGraph}
                />
              </div>
              <div className="card-header-section-2">
                <p></p>
              </div>
            </div>
          ) : (
            <div className="card-section-1b">
              <button className="accent-btn-primary" onClick={sendToVenues}>
                Add Venue
              </button>
            </div>
          )}
          <div className="dashboard-card-container">
            <div className="card-element" id="el-1">
              {venueStats[0] !== undefined ? (
                <>
                  <div
                    key={venueStats[0].venue_id}
                    onClick={() => sendToVenue(venueStats[0].venue_id)}
                    className="venue-card"
                  >
                    <div className="venue-card-header">
                      <h2>{venueStats[0].venue_name}</h2>
                    </div>
                    <div className="venue-stats">
                      <div className="venue-stat">
                        <p>Net Profit</p>
                        <NumericFormat
                          className="h2-2"
                          value={venueStats[0].venue_net}
                          prefix={"$"}
                          thousandSeparator=","
                          allowNegative
                          decimalScale={2}
                        />
                      </div>
                      <div className="venue-stat">
                        <p>Hourly Net</p>
                        <NumericFormat
                          className="h2-2"
                          value={venueStats[0].venue_hourly}
                          prefix={"$"}
                          thousandSeparator=","
                          allowNegative
                          decimalScale={2}
                        />
                      </div>
                      <div className="venue-stat">
                        <p>Total Hours</p>
                        <h2 className="h2-2">{venueStats[0].total_hours}</h2>
                      </div>
                      <div className="venue-stat">
                        <p>Sessions</p>
                        <h2 className="h2-2">
                          {venueStats[0].sessions_played}
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-stats-container clr-light">
                  <div className="no-stats-header">
                    <h1>Welcome, {user.username}!</h1>
                  </div>
                  <div className="no-stats-body">
                    <h2 className="font-wt-regular">
                      To get started with MyPokerStats, click the "Add Venue"
                      button above and create a new venue!
                    </h2>
                  </div>
                </div>
              )}
              {sessionCard[0] !== undefined && (
                <div
                  onClick={() =>
                    sendToSession(sessionCard[0].id, sessionCard[0].venue_id)
                  }
                  className="session-card clr-primary"
                >
                  <div className="session-header">
                    <div className="venue-name">
                      <p>Session</p>
                    </div>
                    <p>on</p>
                    <div className="session-date">
                      <p className="font-wt-bold">
                        {format(
                          new Date(sessionCard[0].session_date),
                          "dd/MM/yy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="session-stats">
                    <div className="session-stat">
                      <p>Net Profit:</p>
                      <NumericFormat
                        className="p"
                        value={sessionCard[0].net_profit}
                        prefix={"$"}
                        thousandSeparator=","
                        allowNegative
                        decimalScale={2}
                      />
                    </div>
                    <div className="session-stat">
                      <p>Stakes:</p>
                      <h2>{sessionCard[0].stakes}</h2>
                    </div>
                    <div className="session-stat">
                      <p>Hourly Net:</p>
                      <NumericFormat
                        className="p"
                        value={sessionCard[0].hourly}
                        prefix={"$"}
                        thousandSeparator=","
                        allowNegative
                        decimalScale={2}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card-element" id="el-2">
              <Line
                data={{
                  labels: sessionCard.map((session) => {
                    return format(new Date(session.session_date), "MM/dd/yy");
                  }),

                  datasets: [
                    {
                      lineTension: 0.5,
                      label: "Session Net",
                      backgroundColor: "transparent",
                      borderColor: "#5937a4",

                      data: sessionCard.map((session) => {
                        return session.net_profit;
                      }),
                    },
                  ],
                }}
                width={400}
                height={300}
                options={{
                  plugins: {
                    customCanvasBackgroundColor: {
                      color: "white",
                    },

                    legend: {
                      labels: {
                        color: "#5937a4", // not 'fontColor:' anymore
                        // fontSize: 18  // not 'fontSize:' anymore
                        font: {
                          size: 15, // 'size' now within object 'font {}'
                        },
                      },
                    },
                  },

                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Session Date",
                        color: "#5937a4",
                      },
                      ticks: {
                        color: "#5937a4",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Net Profit",
                        color: "#5937a4",
                      },
                      ticks: {
                        color: "#5937a4",

                        callback: (value) => {
                          return "$" + value;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
