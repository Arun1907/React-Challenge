import React, { useState } from "react";
import "./DropDown.css";

const DropDown = ({ sentDataToParent }) => {
  const [selectedSchema, setSelectedSchema] = useState("");
  const [additionalSchemas, setAdditionalSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState("");

  const allOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddNewSchema = () => {
    if (selectedSchema !== "") {
      setAdditionalSchemas([...additionalSchemas, selectedSchema]);
      setSelectedSchema("");
      sentDataToParent([...additionalSchemas, selectedSchema]);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const handleRemoveSchema = (schemaToRemove) => {
    setAdditionalSchemas(additionalSchemas.filter(schema => schema !== schemaToRemove));
  };

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: additionalSchemas.map(schema => ({ [schema.value]: schema.label }))
    };

    console.log(segmentData); 
  };
  const onCancel = () => {
    setSelectedSchema("");
    setAdditionalSchemas([]);
    setSegmentName("");
  };

  return (
    <div className="add-schema-dropdown">
      <div className="container">
        <div className="dropdown-list">
          {additionalSchemas.map((schema, index) => (
            <div style={{ display: "flex" }}>
              {schema == "Account Name" ? (
                <div
                  className="circle"
                  style={{ backgroundColor: "red", marginTop: "15px" }}
                ></div>
              ) : (
                <div
                  className="circle"
                  style={{ backgroundColor: "green", marginTop: "15px" }}
                ></div>
              )}
              <select>
                <option key={index}>{schema}</option>
                {allOptions
                  .filter((option) => !additionalSchemas.includes(option.label))
                  .map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
              </select><button className="cancel-btn"onClick={() => handleRemoveSchema(schema)}><i class="fa fa-close"/></button>
            </div>
          ))}

          <div style={{ display: "flex" }}>
            <div
              className="circle"
              style={{ backgroundColor: "grey", marginTop: "15px" }}
            ></div>
            <select className="select-segment" onChange={handleDropdownChange} value={selectedSchema}>
              <option value=""> Add Schema to Segment</option>
              {allOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <a href="#" onClick={handleAddNewSchema}>
        + Add new schema
      </a>
    </div>
  );
};

export default DropDown;