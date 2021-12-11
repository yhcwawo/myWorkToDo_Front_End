import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type" : "application/json",
    },
    withCredentials: true,
});


/* rest api format

axios.get(SERVER_URL+`/work/recent/${user_id}`)
.then(function (response) {
     // response  
     console.log("recent my work list");
     console.log(response);

}).catch(function (error) {
    // 오류발생시 실행
}).then(function() {
    // 항상 실행
});

//getMapping with parameter

axios.get("url", {
      params: {
        id: 123
      }
    })
    .then(function (response) {
         // response  
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
   
   
// async await 함수를 사용할 때, 

try {
	const data = await axios.get("url", params: { id: 123 });
} catch {
	// 오류 발생시 실행
}


//post
axios.post("url", {
        username: "",
        password: ""
    })
    .then(function (response) {
         // response  
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
    
// async await 함수를 사용할 때, 



//delete

axios.delete('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  
  // async await 함수를 사용할 때, 

*/


export default API;