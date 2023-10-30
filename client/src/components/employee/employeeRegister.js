import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRef } from 'react';
import '../../assets/css/EmployeeRegister.css';
import { Link } from 'react-router-dom';

const EmployeeRegister = () => {
  const [empUserName, setempUsername] = useState('');
  const [empPassword, setempPassword] = useState('');
  const [empName, setempName] = useState('');
  const [empMail, setempMail] = useState('');
  const [empPhone, setempPhone] = useState('');
  const [empAddress, setempAddress] = useState('');
  const [empAvatar, setempAvatar] = useState('');
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  const imageInput = useRef(null);

  useEffect(() => {
    Axios.get('http://localhost:3001')
      .then((res) => {
        setAvatar(res.data[0]);
        setempAvatar(res.data[0].image);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    imageInput.current.click();
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const uploadAvatar = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    Axios.post('http://localhost:3001/upload', formdata)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === 'suckass') {
          console.log(1);
          window.location = '/reg/emp';
        } else {
          console.log(0);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitEmployeeRegister = () => {
    //post-url
    const regurl = 'http://localhost:3001/reg/emp';
    //post-req
    Axios.post(regurl, {
      empName: empName,
      empMail: empMail,
      empPhone: empPhone,
      empAddress: empAddress,
      empUserName: empUserName,
      empPassword: empPassword,
      empImage: empAvatar,
    }).then((response) => {
      alert(response.data.message);
    });
  };

  return (
    <div className="emp-register">
      <h2>EMP Register</h2>
      <button onClick={uploadAvatar} className="imageButton">
        Upload
      </button>
      <form className="empReg-form">
        <div className="avatar" onClick={handleClick}>
          <img alt="" src={`http://localhost:3001/images/` + avatar.image} />
        </div>

        <input
          name="empAvatar"
          type="file"
          accept="image/*,.png,.jpg,.web"
          className="hidden"
          ref={imageInput}
          onChange={handleChange}
        />
        <input
          name="empName"
          type="text "
          placeholder="Full Name"
          onChange={(e) => {
            setempName(e.target.value);
          }}
          required
        />
        <input
          name="emailId"
          type="text"
          placeholder="Email Address"
          onChange={(e) => {
            setempMail(e.target.value);
          }}
          required
        />
        <input
          name="empPhone"
          type="number"
          placeholder="Phone Number"
          onChange={(e) => {
            setempPhone(e.target.value);
          }}
          required
        />
        <input
          name="empAddress"
          type="text "
          placeholder="Address"
          onChange={(e) => {
            setempAddress(e.target.value);
          }}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="User Name"
          onChange={(e) => {
            setempUsername(e.target.value);
          }}
        />
        <input
          name="password"
          type="text "
          placeholder="Password"
          onChange={(e) => {
            setempPassword(e.target.value);
          }}
        />
        <Link to={'../emp/overview'}>
          <button onClick={submitEmployeeRegister}>Register</button>
        </Link>
      </form>
    </div>
  );
};

export default EmployeeRegister;
