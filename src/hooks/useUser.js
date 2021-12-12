import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../config";

function useUser() {
  //const hasToken = useReactiveVar(isLoggedInVar);

  const user_id = 20; //loginVar
  let data ;

    useEffect(()=>{

        axios.get(`${SERVER_URL}/user/${user_id}`, {
          params: {
            user_id: user_id,
          }
        })
        .then(function (response) {
             // response  
             console.log("useUser");
             return (response.data);
    
             //work_id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date
             // rows rendering

        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });
    
    }, [data]);


    

}

export default useUser;
