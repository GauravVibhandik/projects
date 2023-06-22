import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { PaperStatus } from "./PaperStatus";
import Topics from "./Topics";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SubmitPaper = ({ userRole }) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [topicId, setTopicId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const Razorpay = useRazorpay();

  const [msg, setMsg] = useState("");

  // let defaultDate = new Date();
  // defaultDate.setDate(defaultDate.getDate());
  // const [date, setDate] = useState(defaultDate);
  // const onSetDate = (event) => {
  //   setDate(new Date(event.target.value));
  // };

  const onChangeDescription = ({ target: { value } }) => {
    setDescription(value);
  };
  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
  };

  const onChangetitle = ({ target: { value } }) => {
    setTitle(value);
  };

  const onImgChange = (e) => {
    setImage({ selectedFile: e.target.files[0] });
  };

  const [topicOptions, setTopicOptions] = useState([]);
  useEffect(() => {
    axios.get("/topics").then((e) => {
      console.log(e);
      setTopicOptions(e.data);
      console.log(e.data);
    });
  }, []);

  const navigateToViewPaper = () => {
    navigate("/PaperStatus");
  };

  //({target:{value}})=> {settitle(value)})

  //   const onSubmit = async () => {
  //     const options = {
  //       key: "rzp_test_7G5egsp1FYLl2O", // Enter the Key ID generated from the Dashboard
  //       amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       currency: "INR",
  //       name: "Acme Corp",
  //       description: "Test Transaction",
  //       image: "https://example.com/your_logo",
  //       order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
  //       handler: function (response) {
  //         alert(response.razorpay_payment_id);
  //         alert(response.razorpay_order_id);
  //         alert(response.razorpay_signature);
  //       },
  //       prefill: {
  //         name: "Piyush Garg",
  //         email: "youremail@example.com",
  //         contact: "9999999999",
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const rzp1 = new Razorpay(options);

  //     rzp1.on("payment.failed", function (response) {
  //       alert(response.error.code);
  //       alert(response.error.description);
  //       alert(response.error.source);
  //       alert(response.error.step);
  //       alert(response.error.reason);
  //       alert(response.error.metadata.order_id);
  //       alert(response.error.metadata.payment_id);
  //     });

  //     rzp1.open();
  //     try {
  //       const formData = new FormData();
  //       if (file) {
  //         formData.append("file", file.selectedFile, file.selectedFile.name);
  //         formData.append("topic", topic);
  //         formData.append("description", descrirption);
  //         const response = await axios.post("/submit", formData);
  //       }
  //     } catch (e) {
  //       console.log("error");
  //     }
  //   };

  // const getBase64 = file => {
  //   return new Promise(resolve => {
  //     let fileInfo;
  //     let baseURL = "";
  //     // Make new FileReader
  //     let reader = new FileReader();

  //     // Convert the file to base64 text
  //     reader.readAsDataURL(file);

  //     // on reader load somthing...
  //     reader.onload = () => {
  //       // Make a fileInfo Object
  //       console.log("Called", reader);
  //       baseURL = reader.result;
  //       console.log(baseURL);
  //       resolve(baseURL);
  //     };
  //     console.log(fileInfo);
  //   });
  // };
  const onSubmit = async () => {
    try {
      const form = require('form-data');
      const formData = new form();
      if (file) {
        const topicIdObject = topicOptions.filter((e) => {
          if (e.topicName === topic) return e.id;
        });
        const TId = Array.from(new Set(topicIdObject))[0].id;
        // setTopicId = TId;
        const user = localStorage.getItem("user");
        const parsedUser = JSON.parse(user);
        const id = parsedUser.id;
        const token = parsedUser.jwt;
        console.log(token);
        const url = `papers/${id}/topic/${TId}`;
        console.log("debug url", url);

        console.log("🚀 ~ file: SubmitPaper.js ~ line 147 ~ onSubmit ~ image", image.selectedFile.arrayBuffer());
        console.log(image.selectedFile,"------",image.selectedFile[0],"------debug");

        formData.append("imgFile", image.selectedFile,image.selectedFile.name);
        // formData.append("request",{"title":title,
        //     "publishDate":date.toLocaleDateString('en-CA'),
        //     "description":description});
        formData.append("title", title);
        formData.append("publishDate", defaultValue);
      //  console.log(publishDate);
        formData.append("description", description);
        formData.append("pdfFile", file.selectedFile,file.selectedFile.name);

        const response = await axios.post(url, formData, {
          headers: { Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data; ' },
        });
        console.log(response);
        // setMsg(response.data.message)
        swal(response.data.message);
        navigate("/PaperStatus");
      
        // window.location.reload();
        // if(response.message !== ""){
        //   <SweetAlert success title="Good job!" onConfirm={this.onConfirm} onCancel={this.onCancel}>
        //          You clicked the button!
        //   </SweetAlert>
        // }else{
        //   <SweetAlert success title="Bad job!" onConfirm={this.onConfirm} onCancel={this.onCancel}>
        //          You clicked the button!
        //   </SweetAlert>
        // }
      }
    } catch (e) {
      console.log("error", e);
      // setMsg(", ");
      swal("Some error occured", "Please make sure you are not making entering duplicate entry!");
    }
  };
  useEffect(()=>{//Success message on submittion for 5 sec
		setTimeout(()=>{
			setMsg("")
		},5000)
	},[msg]);

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col sm={4}>
              <Topics
                setTopic={setTopic}
                setTopicId={setTopicId}
                topic={topic}
                topicOptions={topicOptions}
              />
              <div className="viewSubmitted">
              <button className="btn btn-success" onClick={navigateToViewPaper}>
                  View Submitted Papers
              </button>
              </div>
          </Col>
        
          {/* <Row className="justify-content-start align-item-center">
            <Col sm={3}>
              <button className="btn btn-success" onClick={navigateToViewPaper}>
                    View Submittd Papers
              </button>
            </Col>
          </Row> */}
          {/* <Row className="justify-content-end align-items-center"> */}
          <Col sm={6}>
             <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                    margin: "1.5rem",
                    // border: "1px solid black",
                    borderRadius: "0.4rem",
                    padding: "2.5rem",
                    backgroundColor:"#bfd999",
                   
                  }}
                >
                
                <input className="inputOfSubmitpaper" placeholder="Topic" value={topic} style={{marginRight:"8rem"}} />
                {/* <input
                  type="date"
                  value={date.toLocaleDateString("en-CA")}
                  onChange={onSetDate}
                /> */}
                
                
                <input className="inputOfSubmitpaper"
                  id="dateRequired"
                  type="date"
                  name="dateRequired"
                  defaultValue={defaultValue}
                  style={{marginRight:"21rem"}}
                  //value={curDate}
                />
              
                
                <textarea className="inputOfSubmitpaper"
                  placeholder="Paper Title"
                  onChange={onChangetitle}
                  value={title}
                  style={{marginRight:"8rem"}}
                />
                
                {/* <label for="submitDate">SubmitDate:</label>
                    <input type="date" id="submitDate" name="submitDate"></input> */}
                
                <textarea className="inputOfSubmitpaper"
                  placeholder="Description"
                  onChange={onChangeDescription}
                  value={description}
                  style={{paddingBottom:"3rem"}}
                />
              
                
                <label for="selectImage">Your Photo</label>
                <input className="inputOfSubmitpaper"
                  type="file"
                  accept=".png"
                  name="selectImage"
                  onChange={onImgChange}
                />
                
                
                <label for="selectPdf">Select Pdf</label>
                <input className="inputOfSubmitpaper"
                  type="file"
                  accept=".pdf"
                  for="selectPdf"
                  onChange={onFileChange}
                />
               
               
                <button className="btn btn-submitPaper" disabled={!file} onClick={onSubmit}>
                  Submit Paper
                </button>
                
                {/* <div className="mb-3" style={{textAlign:"center"}}>
				          <span className="fst-italic fw-bolder text-LawnGreen" style={{fontSize : "0.9rem"}}>{msg}</span>
			          </div> */}
              </div>
          </Col>
        </Row>
    </Container>
       
      
       
    </>
  );
};

export default SubmitPaper;
