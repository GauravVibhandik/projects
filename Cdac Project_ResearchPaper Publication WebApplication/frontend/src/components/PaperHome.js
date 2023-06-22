import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Filedownload from "js-file-download";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const PaperHome = () => {
  const location = useLocation();
  const topicDetails = location?.state?.topicDetails;
  console.log(location);
  const [data, setData] = useState([]);
  const[imageData,setImageData] =useState();


  // const[]
  const user = localStorage.getItem("user");
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    console.log(data);
    var config = {
      method: "get",
      url: `/papers/topic/${topicDetails.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/pdf',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onDownlad = (paperId) => {
    console.log(paperId);
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    var config = {
      method: "get",
      url: `/papers/${paperId}/pdfs`,
      
      headers: {
        Authorization: `Bearer ${token}`,
       
      // 'Content-Type': 'application/pdf',
      },
      //responseType: 'blob'
      responseType: 'arraybuffer' 
    };
    axios(config)
      .then(function (response) {
     Filedownload(response.data,`${paperId}${new Date().toLocaleTimeString()}.pdf`);
       console.log(response.data);
      
      
    })
      .catch(function (error) {
        console.log(error);
      });

    // const handleDownloadPapers = (paperId) => {
    //   const user = localStorage.getItem("user");
    //   const parsedUser = JSON.parse(user);
    //   const id = parsedUser.id;
    //   const token = parsedUser.jwt;
    //   var config = {
    //     method: "get",
    //     url: `/papers/topic/`,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };

    // axios(config)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };


  
  
  return (
    <>
      <div className="start">
      <h4 className="headings" style={{textAlign: "center" }} >
           {topicDetails.topicName}
      </h4>
        <Container fluid>
          <Row className="justify-content-md-center align-items-start">
            <Col sm={9}>
                  <div className="tableStructure">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Submit Date</th>
                        <th>Author</th>
                        <th>Download</th>
                      </tr>
                    </thead>

                    {data &&
                      data.length !== 0 &&
                      data.map((e) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{e.title}</td>
                              <td>{e.description}</td>
                              <td>{e.publishDate}</td>
                              <td>
                                <div>
                                <img  style={{
                                  height: "100px",
                                  width: "80px"
                                }} src={`data:image/png;base64,${e.img}`} />
                                </div>
                                
                              </td>
                              <td>

                                <button className="btn-ch btn-approve" onClick={()=>onDownlad(e.id)}>Download</button>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                  </div>
              </Col>
            </Row>
        </Container>       
      </div>
    </>
  );
};
