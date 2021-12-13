import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL, USER } from "../config";

function useUser() {

  //const hasToken = useReactiveVar(isLoggedInVar);
  const user_id = localStorage.getItem(USER);

    useEffect(()=>{

        //login user info
        axios.get(`${SERVER_URL}/user/${user_id}`, {
            params: {
              user_id: user_id,
            }
          })
          .then(function (response) {
               console.log("useUser");
               const {data} = response.data;
               
          }).catch(function (error) {

          }).then(function() {

          });
          //end

    }, []);

    
    
}

export default useUser;
