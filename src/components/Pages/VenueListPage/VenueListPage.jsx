import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";
import "../VenueListPage/VenueListPage.css";
import { FaPen, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

export default function VenueListPage() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editID, setEditId] = useState(0);
  const [newName, setNewName] = useState("");
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_VENUES" });
  }, []);
  const venueList = useSelector(
    (store) => store.venuesReducer.allVenuesReducer
  );

  console.log("venue list:", venueList);

  function editVenue(id, name) {
    setEditMode(true);
    setEditId(id);
    setNewName(name);
  }

  function deleteVenue(id) {
    dispatch({ type: "DELETE_VENUE", payload: id });
  }

  function confirmFunction(id) {
    let r = confirm(
      "Are you sure? All sessions and data connected to this venue will be deleted."
    );
    if (r == true) {
      deleteVenue(id);
    } else {
    }
  }

  console.log("edit mode:", editMode);

  console.log(newName);

  function saveEdit() {
    dispatch({
      type: "EDIT_VENUE",
      payload: { id: Number(editID), name: String(newName) },
    });
    setEditMode(false);
  }
  function sendToVenue(id) {
    history.push(`/venue-view/${id}`);
    console.log(id);
  }

  const addVenue = () => {
    history.push("/add-venue");
  };
  return (
    <div className="body">
      <div className="main">
        <div className="header">
          <div className="heading">
            <h1 className="clr-light">My Venues</h1>
          </div>
          <div className="buttons-container"></div>
        </div>
        <div className="venue-list-container bg">
          <div className="addnew-btn">
            <button className="accent-btn-light" onClick={addVenue}>
              Add New
            </button>
          </div>
          {venueList[0] !== undefined ? (
            <div className="venue-list">
              {venueList.map((venue, index) => {
                return (
                  <div key={index} className="venue-list-card">
                    <div
                      onClick={() => sendToVenue(venue.id)}
                      className="venue-list-name"
                    >
                      {editMode && Number(editID) === venue.id ? (
                        <input
                          className="edit-ven-input"
                          type="text"
                          value={newName}
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      ) : (
                        <h2 className="venue-card-name">{venue.name}</h2>
                      )}
                    </div>
                    {editMode && Number(editID) === venue.id ? (
                      <div className="venue-btns">
                        <div className="btn-1-cont">
                          <FaCheck
                            onClick={(e) => {
                              e.stopPropagation();
                              saveEdit();
                            }}
                            className="venue-list-btn btn-4"
                          />
                        </div>
                        <div className="btn-2-cont">
                          <FaTimes
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditMode(false);
                            }}
                            className="clr-primary venue-list-btn-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="venue-btns">
                        <div className="btn-1-cont">
                          <p
                            className="clr-primary venue-list-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              editVenue(venue.id, venue.name);
                            }}
                          >
                            <FaPen />
                          </p>
                        </div>
                        <div className="btn-2-cont">
                          <p
                            className="clr-primary venue-list-btn-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmFunction(venue.id);
                            }}
                          >
                            <FaTrash />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="venue-list">
              <div className="no-stats-container clr-light">
                <div className="no-stats-header">
                  <h2 className="clr-neutral">No Venues</h2>
                </div>
                <div className="no-stats-body">
                  <h2 className="font-wt-regular">
                    Here is where your list of created venues will be. Click the
                    "Add Venue" button to start your list!
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </div>
  );
}
