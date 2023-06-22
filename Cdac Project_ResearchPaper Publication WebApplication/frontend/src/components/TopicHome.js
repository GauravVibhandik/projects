import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Container,Col ,Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const TopicHome = () => {
  const [topicOptions, setTopicOptions] = useState([]);
  const [selectedTopicData, setTopicData] = useState([]);

  const navigate = useNavigate();
  console.log(
    "🚀 ~ file: TopicHome.js ~ line 7 ~ TopicHome ~ selectedTopicData",
    selectedTopicData
  );
  const [topic, setTopic] = useState(null);
  useEffect(() => {
    axios.get("/topics").then((e) => {
      console.log(e);
      setTopicOptions(e.data);
      console.log(e.data);
    });
  }, []);

  const onChange = ({ target: { value, dataId } }) => {
    // const user = localStorage.getItem("user");
    // const parsedUser = JSON.parse(user);
    // const id = parsedUser.id;
    setTopic(value);

    // console.log(value);
    // console.log(topicOptions);
  };

  useEffect(() => {
    if (topic) {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      const id = parsedUser.id;
      const token = parsedUser.jwt;
      const topicId = topicOptions.find(({ topicName }) => topicName === topic);
      var config = {
        method: "get",
        url: `/papers/topic/${topicId.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          setTopicData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (topic) {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);
        const id = parsedUser.id;
        console.log(id);
        const topicDetails = topicOptions.find(
          ({ topicName }) => topicName === topic
        );

        navigate("/home/paperHome", { state: { topicDetails: topicDetails } });
        console.log(topic);
      } else {
        swal("Login/Signup Required !!", "Nanofim: Call For Papers");
        navigate("/login");
      }
    }
  }, [topic]);

  return (
    <div className="myDiv">
      <div className="startHome">
        <Container fluid>
          <Row className="justify-content-start align-items-start">


          <Col className="leftPane">
            <div style={{marginTop :"0.8rem"}}><h3>Tomorrow's Research Today</h3>
                <h6>Nanofim provides 67,844 research papers from </h6>       
                <h6>hundreds of researchers in more than 35 disciplines.</h6>   
            </div>
            
              
              <img className="image" src="/topic1.png" alt="image" />
              <img className="image" src="/topic2.png" alt="image" />
              
             <img className="image" src="/topic4.png" alt="image" />
            <img className="image" src="/topic3.png" alt="image" />
              
           
        </Col>
        <Col >
        <span >
        <label for="topicHome"><h4>Topics</h4></label>

        <select id="topicHome" onChange={onChange}>
          <option value=""> Select </option>
          {topicOptions.map((e) => {
            return (
              <option key={e.id} value={e.topicName}>
                {e.topicName}
              </option>
            );
          })}
        </select>
        </span>
        </Col>
        </Row>
        </Container>
      </div>
      <div className="subDiv">
        <p>Queries/Suggestion : nanofim@gmail.com</p>
      </div>
    </div>
  );
};

export default TopicHome;
