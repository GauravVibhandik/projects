import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import {Nav} from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const { tab } = useParams();
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState("");
  const [submitPaper, setSubmitPaper] = useState([]);
  const [viewUser, setViewUser] = useState([]);
  const navigate = useNavigate();
  
  const handleOnClick = () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    var config = {
      method: "get",
      url: "/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddTopics = () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    //var axios = require("axios");
    var config = {
      method: "post",
      url: "/topics",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { topicName: topic },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        
        {
          swal({
            title: "Topic Added",
            icon: "success",
            button: "Ok",
          });
        }
        //  window.location.reload();
        // navigate("/admin");
       setTopic(" ");
        
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Topic Already Exist",
          text: "Duplicate topic not allowed",
          icon: "warning",
          button: "Ok",
        });
      });
  };
  // useEffect(() => {

  // }, []);
  const handleViewSubmitPapers = () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    var config = {
      method: "get",
      url: "/papers/status",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setSubmitPaper(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUserDelete = () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    var config = {
      method: "get",
      url: "/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    //console.log(tab.length)
    if (tab === "paper") {
      handleViewSubmitPapers();
    }
    if (tab === "user") handleOnClick();
    // if (tab === "topic") handleAddTopics();
  }, [tab]);

  const onApprove = (paperId) => () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    var config = {
      method: "patch",
      url: `/papers/updateStatus/${paperId}?status=true`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config).then((response) => {
      if (response.status === 200) {
        handleViewSubmitPapers();
        swal({
          title: "Paper Approved!",
          icon: "info",
        });
      }
    });
  };

  const onDelete = (paperId) => () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    var config = {
      method: "delete",
      url: `/papers/${paperId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config).then((response) => {
      if (response.status === 200) {
        handleViewSubmitPapers();
        swal({
          title: "Paper Rejected!",
          icon: "info",
        });
      }
    });
  };
  const onUserDelete = (uId) => () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    var config = {
      method: "delete",
      url: `/users/${uId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config).then((response) => {
      if (response.status === 200) {
        handleUserDelete();
        swal({
          title: "User Deleted",
          icon: "warning",
        });
      }
    });
  };

  const onSetTopic = ({ target: { value } }) => {
    setTopic(value);
  };

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-start align-items-start">
          <Col sm={5}>
          {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Link to="/admin/user">
                  View Users
                </Link>
                <Link to="/admin/topic">
                  Add Topics
                </Link>
                <Link to="/admin/paper">
                  View Submitted Papers
                </Link>
            </Nav> */}
          
            <div className="adminTables">
              <Link to="/admin/user">
                <button className="btn btn-admin">View Users</button>
              </Link>
            </div>
            <div className="adminTables">
              <Link to="/admin/topic">
                <button className="btn btn-admin">Add Topics</button>
              </Link>
            </div>
            <div className="adminTables">
              <Link to="/admin/paper">
                <button className="btn">View Submitted Papers</button>
              </Link>
            </div>
          </Col>
          <Col sm={7}>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                margin: "20px",
                
              }}
            >
              {tab === "user" && (
                <div className="tableStructure">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete User</th>
                      </tr>
                    </thead>
                    {data &&
                      data.length !== 0 &&
                      data.map((e) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{`${e.firstName}`}</td>
                              <td>{`${e.lastName}`}</td>
                              <td>{`${e.email}`}</td>
                              <td>{`${e.role.roleName}`}</td>
                              <td><button className="btn-ch btn-delete" onClick={onUserDelete(e.id)}>
                                Delete
                              </button></td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              )}
            </div>

            {tab === "topic" && (
              <div>
                
                 
                  <div className="form-floating textBox">
                    <textarea
                      className="form-control"
                      id="floatingTextarea"
                      placeholder="Enter Topic"
                    onChange={onSetTopic}
                    value={topic}
                    ></textarea>
                   
                  </div>
                  <button className="btn" onClick={handleAddTopics}>Add Topic</button>
                
              </div>
            )}

            {tab === "paper" && (
              <div className="tableStructure">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Paper Id</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Approve</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {submitPaper &&
                    submitPaper.length !== 0 &&
                    submitPaper.map((e) => {
                      return (
                        <tbody>
                          <tr>
                            <td>{e.id}</td>
                            <td>{e.title}</td>
                            <td>{e.status ? "approve" : "Not approve"}</td>
                            <td>
                              <button className="btn-ch btn-approve" onClick={onApprove(e.id)}>Approve</button>
                            </td>
                            <td>
                              <button className="btn-ch btn-delete" onClick={onDelete(e.id)}>Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
