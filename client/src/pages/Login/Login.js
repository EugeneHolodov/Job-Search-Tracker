import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(setError);
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    try {
      if ("token" in data.payload)
        window.localStorage.setItem("token", data.payload.token);
    } catch (error) {
      alert(`Failed to augth`);
      console.log(`error: ${error}`);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div
        className='bacgroundWraoer'
        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/reg-login.svg)`}}
      >
    <Form
      className='loginForm'
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => handleSubmit(onSubmit(values))}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large" 
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <div className={styles.conteinerBottom}>
          <button type="primary" htmlType="submit" className="mainButton">
            Log in
          </button>
          <span>
            Or{" "}
            <Link to="/registration" className='registrAgrrLink' style={{padding: '8px 0'}}>
              register now!
            </Link>
          </span>
        </div>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;
