// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const ShowTutorial = () => {
// //   const [users, setUsers] = useState([])

// //   const fetchData = () => {
// //     axios.get('http://localhost:8080/papers').then(response => {
// //       setUsers(response.data)
// //     })
// //   }

// //   useEffect(() => {
// //     fetchData()
// //   }, [])

// //   return (
// //     <div>
// //       {users.length > 0 && (
// //         <ul>
// //           {users.map(user => (
// //            <thead>
// //            <tr>
// //                <th>Id</th>
// //                <th>Paper description</th>
// //                <th>Author</th>
// //                <th>Pdf</th>
// //            </tr>
// //            </thead>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   )
// // }

// // export default ShowTutorial;

// // import React, { Component } from 'react';
// //     import axios from 'axios';
// //     export class AxiosTable extends Component {
// //         state={
// //             persons:[]
// //         }
// //         // componentDidMount(){
// //         //     axios.get('http://localhost:8080/topic/1')
// //         //   .then(res => {
// //         //     const persons = res.data;
// //         //     this.setState({ persons });
// //         //   })
// //         // }
// //         componentDidMount(){
// //             axios.get('http://localhost:8080/empdetails')
// //           .then(res => {
// //             const persons = res.data;
// //             this.setState(prevState => { persons: [...prevState.persons, persons] });
// //           })
// //         }
// //         render() {
// //             return (
// //                 <div className="App">
// //                 <div className="left">
// //                 <table className="table table-hover table-dark">
// //                 <thead>
// //                   <tr>
// //                    <th>Id</th>
// //                    <th>Title</th>
// //                    <th>Pdf</th>
// //                  </tr>
// //                  </thead>
                 
// //                  { this.state.persons.map(person => 
// //                  <tbody> 
// //                   <tr>
// //                     <td>{person.id}</td>
// //                     <td>{person.description}</td>
// //                     <td>{person.pdf_data}</td>
// //                   </tr>
// //                  </tbody>
                  
// //                    )}
// //                  </table>
// //                </div>    </div>
// //             )
// //         }
// //     }
    
// //     export default AxiosTable


// import React, {useState, useEffect} from 'react';
// //import ReactDOM from 'react-dom';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';

// const ShowTutorial = () => {
//   const url = 'http://localhost:8080/papers/topic/2'

//   const [data, setData] = useState([])

//   useEffect(() => {
//     axios.get(url).
//     then(json => setData(json.data)).catch((error)=>console.error(error));
    
    
//   }, [])

// const downloadPDF =()=>{

// //   axios.get(url).then((response)=>{
//   // var blob = new Blob([byte], {type: "application/pdf"});
//   // var link = document.createElement('a');
//   // link.href = window.URL.createObjectURL(blob);
//   // var fileName = reportName;
//   // link.download = fileName;
//   // link.click();
// // })
// axios(`url`, {
//         method: "GET",
//         responseType: "blob"
//         //Force to receive data in a Blob Format
//       })
//         .then(response => {
//           //Create a Blob from the PDF Stream
//           const file = new Blob([response.data], {
//             type: "application/pdf"
//           });
//           //Build a URL from the file
//           const fileURL = URL.createObjectURL(file);
//           //Open the URL on new Window
//           window.open(fileURL);
//         })
//         .catch(error => {
//           console.log(error);
//         });
// };

//   const renderTable = () => {
//     return data.map(user => {
//       return (
//         <tr>
//           <td>{user.title}</td>
//           <td>{user.description}</td>
//           <td>{user.publishDate}</td>
//           <td><img src={`data:image/png;base64${user.img}`}/></td>
//           <td> <button onClick={downloadPDF}>Download</button></td>
//         </tr>
//       )
//     })
//   }

//   return (
//     <>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Publication Date</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>{renderTable()}</tbody>
//       </Table>
//     </>
//   )
// }
// export default ShowTutorial;