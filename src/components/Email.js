import emailjs from 'emailjs-com';
import { SERVICE_ID, TEMPLATE_ID, USER_ID } from '../config';
import{ init } from 'emailjs-com';
init("user_bFe2ixCOQs1xG1uGe8IDf");

export default function Email(to_email, task_name, to_name) {
    
    let data = {
      to_email: to_email,
      task_name: task_name,
      to_name: to_name,
    };

    console.log(data);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    
  };
