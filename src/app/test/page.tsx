"use client";

import { useEffect } from "react";
import axios from "axios";

const TestPage = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://6002-34-16-193-54.ngrok-free.app/ask?user_query=소프트웨어학과 졸업 방법",
    );

    console.log(response);
  };

  return <div></div>;
};
export default TestPage;
