import React from "react";
import "./BudgetFund.css";
import { useState } from "react";

export default function BudgetFund() {
  const [display, setDisplay] = useState("budgetPopupNotDisplayed");
  const [okspoks, setOkspoks] = useState(true);

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

  return (
    <div>
      <button onClick={displayPopup}>Budget Funds</button>
      <div className={display}>
        <div className="popupContainer">
          <p>Budget List</p>
          <div className="budgetFundForm1">
            <form id="howMuchFundsForm">
              <label>Input available Funds</label>
              <br />
              <input type="number" name="funds" />
              <br />
              <input type="submit" value="Confirm" className="button" />
            </form>
          </div>

          <div className="budgetFundForm2">
            <form>
              <label>Name: </label>
              <input type="text" name="things" required />
              <br />
              <label>Funds Allocated: </label>
              <input type="number" name="" required />
              <br />
              <input type="submit" value="Add" className="button" />
            </form>
            <div className="listContainer"></div>
          </div>
          <button className="closeButton" onClick={displayPopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
