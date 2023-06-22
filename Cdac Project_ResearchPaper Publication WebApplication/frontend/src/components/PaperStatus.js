import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

// //const [items, setItems] = useState([]);
// const status = ()=>{
//     const[paperStatus,setPaperStatus]=useState([]);
//     useEffect(() => {
//         const user=localStorage.getItem("user");
//             const parsedUser=JSON.parse(user);
//             const id=parsedUser.id;
//             const token = parsedUser.jwt;
//             console.log(token);
//             const url =`papers/author/${id}`;

//         axios.get(url,{headers: {"Authorization" : `Bearer ${token}`}})

// }

export const PaperStatus = () => {
  const[data,setData]=useState([]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;
    const token = parsedUser.jwt;
    console.log(token);
    console.log(data)
   
    let url =`/papers/author/${id}`;

    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      
    };

    axios(config)
      .then(function (response) {
       // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    
  }, []);

  return (
  
  <div>
    
    {/* <div className="container-fluid">
    <div className="row align-items-center align-content-center justify-content-center">
      <div className="col-12 justify-content-center"> */}
              <h4 className="headings" style={{textAlign: "center", marginTop:"2rem"}}>
                  Submitted Papers
              </h4>
          {/* </div>
          </div> */}
      <Container fluid>
        <Row className="justify-content-md-center align-items-start">
          <Col sm={9}>
            <div className="tableStructure">
              <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Paper Id</th>
                      <th>Title</th>
                      <th>Description</th>     
                      <th>Visits</th> 
                      <th>Submit Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>     
                      {data.map(e=>{
                        return (
                          
                            <tbody>
                            <tr>
                              <td>{`${ e.id}`}</td>
                              <td>{`${ e.title}`}</td>
                              <td>{`${ e.description}`}</td>
                              <td>{`${ e.visits}`}</td>
                              <td>{`${ e.publishDate}`}</td>
                              <td>{`${ e.status}`}</td>
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
  )
};
