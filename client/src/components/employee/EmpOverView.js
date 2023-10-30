import React from 'react';
import '../../assets/css/EmpOverView.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import photono from '../../assets/img/photono.png';

const EmpOverView = () => {
  const [bloodTable, setbloodTable] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/emp/overview').then(function (response) {
      console.log(response);
      setbloodTable(response.data);
    });
  }, []);

  return (
    <div>
      <div className="table-title">
        <h3>Employees Overview</h3>
      </div>
      <table className="table-fill">
        <thead>
          <tr className="thtable">
            <th className="text-left">Avatar</th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {bloodTable.length > 0 &&
            bloodTable.map((val, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={val.image ? `http://localhost:3001/images/` + val.image : photono}
                      alt=":)"
                      className={val.image ? 'profileimg' : 'profileimg2'}
                    />
                  </td>
                  <td>{val.empName}</td>
                  <td>{val.empMail}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmpOverView;
