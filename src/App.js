import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";

import { useState , useEffect } from "react";

import './App.css';
import Index from "./pages/ListUser/index";
import ListLoaiMon from "./pages/ListLoaiMon/ListLoaiMon";

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

function App() {

  useEffect(() => {
    // document.querySelector("body > div.disclaimer").style.display = "none";
  }, []);
  

  const [test, setTest] = useState(false);

  const onCollapse = (collapsed) => {
    setTest(test ? false : true);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={test} onCollapse={onCollapse}>
          <div className="logo"  />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to={"/loaiMon"}>Loại Món</Link>
            </Menu.Item>

            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<ListLoaiMon/>} />
              </Routes>
            </div>


          </Content>

          <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Ant UED</Footer>

        </Layout>
      </Layout>
    </>
  );
}

export default App;
