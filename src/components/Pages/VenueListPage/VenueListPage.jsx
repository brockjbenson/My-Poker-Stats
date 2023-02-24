import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";

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
    <div className="body-container">
      <div className="main-container">
        <div className="heading clr-light">
          <h1>Venues</h1>
        </div>
        <div className="venue-list-container bg">
          <div className="addnew-btn">
            <button className="accent-btn" onClick={addVenue}>
              Add New
            </button>
          </div>
          <div className="venue-list">
            {venueList.map((venue, index) => {
              return (
                <div key={index} className="venue-item">
                  <div className="venue-item-name">
                    {editMode && Number(editID) === venue.id ? (
                      <input
                        className="edit-ven-input"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    ) : (
                      <h2>{venue.name}</h2>
                    )}
                  </div>
                  <div className="venue-btns">
                    {editMode && Number(editID) === venue.id ? (
                      <>
                        <p
                          className="font-wt-bold clr-primary"
                          onClick={saveEdit}
                        >
                          Save
                        </p>
                        <p
                          className="font-wt-bold clr-primary"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className="font-wt-bold clr-primary"
                          onClick={() => editVenue(venue.id, venue.name)}
                        >
                          Edit
                        </p>
                        <p
                          className="font-wt-bold clr-primary"
                          onClick={() => sendToVenue(venue.id)}
                        >
                          View
                        </p>
                        <p
                          className="font-wt-bold clr-primary"
                          onClick={() => confirmFunction(venue.id)}
                        >
                          X
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
