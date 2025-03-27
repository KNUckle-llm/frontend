"use client";

import { useEffect } from "react";
import axios from "axios";

const TestPage = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `https://27dc-34-16-193-54.ngrok-free.app/ask`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          // Authorization: `Bearer eyJjZG5CYXNlIjoiaHR0cHM6Ly9jZG4ubmdyb2suY29tLyIsImNvZGUiOiI2MDI0IiwiaG9zdHBvcnQiOiIyN2RjLTM0LTE2LTE5My01NC5uZ3Jvay1mcmVlLmFwcCIsIm1lc3NhZ2UiOiJZb3UgYXJlIGFib3V0IHRvIHZpc2l0IDI3ZGMtMzQtMTYtMTkzLTU0Lm5ncm9rLWZyZWUuYXBwLCBzZXJ2ZWQgYnkgMzQuMTYuMTkzLjU0LiBUaGlzIHdlYnNpdGUgaXMgc2VydmVkIGZvciBmcmVlIHRocm91Z2ggbmdyb2suY29tLiBZb3Ugc2hvdWxkIG9ubHkgdmlzaXQgdGhpcyB3ZWJzaXRlIGlmIHlvdSB0cnVzdCB3aG9ldmVyIHNlbnQgdGhlIGxpbmsgdG8geW91LiIsInNlcnZpbmdJUCI6IjM0LjE2LjE5My41NCIsInRpdGxlIjoiT0sifQ==`,
        },
        params: {
          user_query: "소프트웨어학과 졸업 방법",
        },
      },
    );

    console.log(response);
    console.log(response.data);
  };

  return <div></div>;
};
export default TestPage;
