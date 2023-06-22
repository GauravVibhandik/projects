
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const Topics = ({ setTopic, topic,topicOptions }) => {
  // const [topicOptions, setTopicOptions] = useState([]);
  // useEffect(() => {
  //   axios.get("/topics").then((e) => {
  //     console.log(e);
  //     setTopicOptions(e.data);
  //     console.log(e.data);
      
  //   });
  // }, []);

  const onChange = ({ target: { value } }) => {
    setTopic(value);
    console.log(value);
    console.log(topicOptions);
  };

  return (
    <div >
      
      <h5 className="headings">Choose a topic to submit paper:</h5>
      <select onChange={onChange} value={topic}>
        <option value="">Select</option>  
        {topicOptions.map((e) => {
          return (
            <option key={e.id} value={e.topicName}>
              {e.topicName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Topics;
