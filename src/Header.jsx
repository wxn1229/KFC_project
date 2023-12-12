
import React from 'react';
import { useLocation } from 'react-router-dom';
import Head from "./Head";
import Navbar from "./Navbar";
import Subbar from "./Subbar";
import "./Header.css";

const Header = () => {
  const location = useLocation(); // 获取当前路由信息

  // 检查当前的路径名是否为根路径
  const showSubbar = location.pathname === "/" || location.pathname.includes("/account") || location.pathname.includes("/menu");

  return (
    <div className="Header">
      <Head />
      <Navbar />
      {!showSubbar && <Subbar />} {/* 只有当不是根路径时，才显示 Subbar */}
    </div>
  );
};

export default Header;

