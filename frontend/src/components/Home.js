import React from 'react';

import livestock_in_da from '../livestock_in_da.jpg'

const Home = () => {
  return (
    <div>
      <img
        src={livestock_in_da}
        alt="Affected Animals"
        style={{ width: "100vw", height: "400px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <p>
          The government and CIAT has developed a system that allows for the
          traceability of livestock, identifying which animals come from areas
          where forests are being deforested in order to plant pastures for the
          animals. The government is then able to carry out educational
          campaigns to prevent tree felling and implement other solutions.
        </p>
      </div>
    </div>
  );
}

export default Home