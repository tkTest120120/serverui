import { useState, useEffect } from 'react';
import { message, Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'

import * as api from '../API/api';
import { setModalUser } from '../../Redux/reducer';

const { Option } = Select;

const ListUsers = () => {

  const state = useSelector((state) => state.fastFood);
  const dispatch = useDispatch();
  const form = Form.useForm();


  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = () => {
    api.getAllUsers()
      .then((res) => {
        setListUsers(res.data);
      })
      .catch(err => message.error(err));
  };

  const handleDeleteUser = (text, record) => {
    api.deleteUsers(text.phone)
      .then(res => {
        console.log(res.data);

        if (res.data.delete) {
          handleGetAllUsers();
        }
      })
      .catch(err => message.error(err));
  };

  const columns = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger onClick={() => handleDeleteUser(text, record)} >Delete</Button>
        </Space>
      ),
    },
  ];

  const data = listUsers.map((item, index) => {
    return {
      key: String(index + 1),
      phone: item.phone,
      password: item.password,
      role: item.role,
    };
  });

  const handleAddUser = (values) => {
    console.log(values);
    api.addUsers(values)
    .then(res => {
      if(res.data.addUser){
        dispatch(setModalUser(state.isModalUser));
      } else {
        message.error(res.data.error);
      }
      
    })
    .catch( err => message.error(err));
  };

  return (
    <div>
      <Button type="primary" style={{ backgroundColor: "green", margin: "10px 0" }} onClick={() => dispatch(setModalUser(state.isModalUser))} >Thêm User</Button>
      <Modal title="Add User" visible={state.isModalUser} onCancel={() => dispatch(setModalUser(state.isModalUser))} footer={null}>

        <Form
          name="basic"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 8 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 },
          }}

          layout={"horizontal"}
          initialValues={{
            remember: true,
          }}

          autoComplete="off"
          onFinish={handleAddUser}

        >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <Input type={"number"} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              // onChange={onroleChange}
              allowClear
            >
              <Option value="food">food</Option>
              <Option value="admin">admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
          >
            {({ getFieldValue }) =>
              getFieldValue('role') === 'other' ? (
                <Form.Item name="customizerole" label="Customize role" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"

          >
            <Input type={"email"} placeholder={"Input your Email "} value={""}/>
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="full_name"
          >
            <Input />
          </Form.Item>

          <Form.Item name="sex" label="Sex"
          // rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              // onChange={onroleChange}
              allowClear
            >
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.sex !== currentValues.sex}
          >
            {({ getFieldValue }) =>
              getFieldValue('sex') === 'other' ? (
                <Form.Item name="customizerole" label="Customize role" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}

          <Form.Item
            label="Address"
            name="address"

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Avatar"
            name="avatar"
          >
            <Input type={"file"} />
          </Form.Item>

          <Form.Item
            label="BirthOfDate"
            name="birthOfDate"
          >
            <Input type={"date"}/>
          </Form.Item>

          {/* button submit */}
          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>


      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default ListUsers;