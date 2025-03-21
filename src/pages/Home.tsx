import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen col justify-center items-center gap-y-5">
      <div className="col gap-y-2.5 max-w-100">
        <h1 className="text-4xl font-black">아직도 엑셀로 요구사항을?? </h1>
        <h2 className="font-light text-lg">귀찮지 않으신가요? </h2>
      </div>
      <Link to="signin" className="button">
        지금시작하세요
      </Link>
    </div>
  );
};

export default Home;
