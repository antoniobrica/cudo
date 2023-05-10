import React, { useEffect } from 'react';
import axios from 'axios';

const Signup = (props) => {
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          'https://youthful-poitras-uhe0c70luy.projects.oryapis.com/self-service/registration/browser'
        );
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <div>Signup</div>;
};

export default Signup;
