import React, { useState } from "react";

function login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission here
  };
  return (
    <div className=" h-screen border w-[100%] flex items-center justify-cente">
      <div className="w-[50%] h-full border">
        <img
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
          className=" w-full h-full"
        />
      </div>
      <div className=" w-[50%] h-full border flex flex-col items-center justify-center">
        <Form>
          <h1 className="text-3xl font-bold">Email:</h1>
          <input className=" px-4 py-[6px] border border-zinc-200 w-full rounded-lg" />
        </Form>
      </div>
    </div>
  );
}

export default login;
