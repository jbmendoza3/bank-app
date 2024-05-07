import React from "react";
import "./BudgetFund.css";
import { useState } from "react";

export default function BudgetFund() {
  const [display, setDisplay] = useState("budgetPopupNotDisplayed");
  const [remainingFundsDisplay, setRemainingFundsDisplay] = useState("green");
  const [okspoks, setOkspoks] = useState(true);

  const [form1ClassName, setForm1ClassName] = useState("budgetFundForm1");
  const [form2ClassName, setForm2ClassName] = useState("displayNone");

  const [totalFunds, setTotalFunds] = useState();
  const [itemNameInput, setItemNameInput] = useState("");
  const [itemAllocatedFunds, setItemAllocatedFunds] = useState("");
  const [listItems, setListItems] = useState([]);
  const [remainingFunds, setRemainingFunds] = useState();

  // Beer
  // PHP 10

  const handleTotalFundsInput = (event) => {
    setTotalFunds(event.target.value);
    setRemainingFunds(event.target.value);
  };

  const handleItemNameInput = (event) => {
    setItemNameInput(event.target.value);
  };

  const handleItemAllocatedFunds = (event) => {
    setItemAllocatedFunds(event.target.value);
  };

  function displayPopup() {
    let className = "";
    console.log(okspoks);
    if (okspoks) {
      setOkspoks(false);
      className = "budgetPopupDisplayed";
    } else {
      setOkspoks(true);
      className = "budgetPopupNotDisplayed";
    }
    setDisplay(className);
  }

  const handleSubmitForm1 = (event) => {
    event.preventDefault();
    if (totalFunds >= 0) {
      setForm1ClassName("displayNone");
      setForm2ClassName("budgetFundForm2");
    } else {
      alert("Please input a Positive Value.");
    }
  };

  const handleSubmitForm2 = (event) => {
    event.preventDefault();
    if (itemAllocatedFunds >= 0) {
      setListItems([...listItems, { itemNameInput, itemAllocatedFunds }]);
      setItemNameInput("");
      setItemAllocatedFunds("");
      setRemainingFunds(remainingFunds - itemAllocatedFunds);
      if (remainingFunds - itemAllocatedFunds < 0) {
        setRemainingFundsDisplay("red");
      } else {
        setRemainingFundsDisplay("green");
      }
    } else {
      alert("Please Input a Positive Value.");
    }
  };

  const handleDeleteItem = (index, allocatedFunds) => {
    const updatedListItems = [...listItems];
    updatedListItems.splice(index, 1);
    setListItems(updatedListItems);

    setRemainingFunds((prevRemainingFunds) => {
      const newRemainingFunds = prevRemainingFunds + Number(allocatedFunds);
      setRemainingFundsDisplay(newRemainingFunds < 0 ? "red" : "green");
      return newRemainingFunds;
    });
  };

  return (
    <div>
      <button className="budgetfund-btn" onClick={displayPopup}>Budget Funds</button>
      <div className={display}>
        <div className="popupContainer">
          <h2>Budget List</h2>
          <button className="closeButton" onClick={displayPopup}>
            Close
          </button>
          <div className={form1ClassName}>
            <form id="howMuchFundsForm" onSubmit={handleSubmitForm1}>
              <label>Input available Funds</label>
              <br />
              <input
                type="number"
                name="funds"
                onChange={handleTotalFundsInput}
                required
              />
              <br />
              <input type="submit" value="Confirm" className="button" />
            </form>
          </div>

          <div className={form2ClassName}>
            <form onSubmit={handleSubmitForm2}>
              <h6>Total Funds</h6>
              <h3>
                PHP <span className="whitesmoke">{totalFunds}</span>
              </h3>
              <span className="spaceEvenly">
                <label>Label: </label>
                <input
                  type="text"
                  name="things"
                  value={itemNameInput}
                  onChange={handleItemNameInput}
                  required
                />
              </span>
              <span className="spaceEvenly">
                <label>Funds Allocated: </label>
                <input
                  type="number"
                  name=""
                  value={itemAllocatedFunds}
                  onChange={handleItemAllocatedFunds}
                  required
                />
              </span>

              <input type="submit" value="Add" className="button" />
            </form>
            <h6>Remaining Funds</h6>
            <h3>
              PHP{" "}
              <span className={remainingFundsDisplay}>{remainingFunds}</span>
            </h3>
            <div className="listContainer">
              <table>
                <thead>
                  <tr>
                    <td>Label</td>
                    <td>Cost</td>
                  </tr>
                </thead>
                <tbody>
                  {listItems.map((item, index) => (
                    <tr key={index}>
                      <td className="item">{item.itemNameInput}</td>
                      <td className="item">PHP {item.itemAllocatedFunds}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteItem(index, item.itemAllocatedFunds)
                          }
                          className="deleteItemButton"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
