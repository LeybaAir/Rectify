import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_THERAPIST } from "../utils/mutations";
import { Box, AppBar, Toolbar, Typography, Menu, Avatar, Button, MenuItem, Stack } from "@mui/material";
import Auth from "../utils/auth";

const Therapists = ({ setIsLoggedIn }) => {
  const [selectedTherapist, setSelectedTherapist] = useState(null); // Updated state variable
  const [therapists, setTherapists] = useState([]); // Updated state variable

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const response = await fetch("/api/therapists");
      const data = await response.json();

      console.log("Therapists data:", data);

      setTherapists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [addTherapist, { error, data }] = useMutation(ADD_THERAPIST);



  const handleTherapistSelection = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    

    if (selectedTherapist) {
      try {
        // Perform the necessary action upon therapist selection
        console.log("Selected Therapist:", selectedTherapist);

        // Example: Login the user with the selected therapist
        Auth.login(selectedTherapist.name);

        setIsLoggedIn(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">
            Select a Therapist
          </h4>
          <div className="card-body">
            <p>Choose from the top therapists:</p>

            
            <ul className="list-group">
              {therapists.map((therapist) => (
                <li 
                  key={therapist._id}
                  className={`list-group-item ${
                    selectedTherapist && selectedTherapist._id === therapist._id 
                    ? "active" 
                    : ""
                  }`}
                  onClick={() => handleTherapistSelection(therapist)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Link to={`/Profile/${therapist._id}`}>{therapist.name}</Link>
                </li>
              ))}
            </ul>


            {selectedTherapist && (
              <div className="mt-3">
                <p>
                  You have selected <strong>{selectedTherapist.name}</strong> as
                  your therapist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Therapists;
