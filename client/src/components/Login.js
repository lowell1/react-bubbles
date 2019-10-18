import React, {useState} from "react";
import {axiosWithAuth} from "../axiosWithAuth";

const Login = props => {
  const [form, setForm] = useState({username: "", password: "", isLoading: false});

  const login = e => {
    e.preventDefault();

    setForm({...form, isLoading: true});

    axiosWithAuth()
    .post(
      "/api/login",
      {username: form.username, password: form.password}
    )
    .then(resp => {
      localStorage.setItem("token", resp.data.payload);
      console.log(props.history);
      props.history.push("/bubble_page");
    })
    .catch(err => {
      setForm({...form, isLoading: false});
    })
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

        <div className="login">
          {
            form.isLoading
            ?
              <p>Loading...</p>
            :
              <form onSubmit={(e) => login(e)}>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={e => handleChange(e)}
                />
                <br/>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={e => handleChange(e)}
                />
                <button>Login</button>
              </form>
          }
        </div>
    </>
  );
};

export default Login;
