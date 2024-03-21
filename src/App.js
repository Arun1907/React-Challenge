import React, { useState } from "react";
import "./App.css";
import "./Components/DropDown/DropDown.css";
import DropDown from "./Components/DropDown/DropDown";
import Popup from "./Components/SidePopup/SidePopup";
import TextBox from "./Components/Data";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dataFromChild, setDataFromChild] = useState([]);

  const handleDataFromChild = (data) => {
    console.log("Data from child:", data);
    setDataFromChild(data);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: inputValue,
      schema: dataFromChild.map((schema) => ({ [schema]: schema })),
    };
    try {
      const response = await fetch(
        "https://webhook.site/e5daccf1-caaa-4ded-907a-2a5baa229f4d",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } catch (error) {
      console.error("Error data to server:", error);
    }
  };

  return (
    <div className="app">
      <button className="front-segment-btn" onClick={openPopup}>
        Save Segment
      </button>
      {isPopupOpen}

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        handleSaveSegment={handleSaveSegment}
      >
        <TextBox
          label="Enter the Name of the Segment"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Name of the Segment"
        />
        <p>
          To save your segment, you need to add the schemas to build the query.
        </p>

        <div className="segment-circle">
          <div className="circle" style={{ backgroundColor: "green" }}></div>
          -User Traits
          <div className="circle" style={{ backgroundColor: "Red" }}></div>
          -Group Traits
        </div>
        <DropDown sentDataToParent={handleDataFromChild} />
      </Popup>
    </div>
  );
}

export default App;