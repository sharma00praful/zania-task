import "./style.css";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useCallback } from "react";

const SaveInformation = ({ lastSaved, isSaving }) => {
  const [difference, setDifference] = useState("");

  const calculateDifference = useCallback(
    (timeAgo) => {
      setDifference(timeAgo.format(new Date(lastSaved)));
    },
    [lastSaved]
  );

  useEffect(() => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    calculateDifference(timeAgo);
    const interval = setInterval(() => {
      calculateDifference(timeAgo);
    }, 2000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  return (
    <div className="save-information-container">
      {isSaving ? (
        <Spinner
          className="save-information-loader"
          sm
          testid="save-information-spinner"
        />
      ) : (
        <>
          <div className="save-information-title">LAST SAVED</div>
          <div className="save-information-date">{difference}</div>
        </>
      )}
    </div>
  );
};
export default SaveInformation;

