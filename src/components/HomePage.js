import React from "react";
import BgLogo from "../utlities/bg";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <BgLogo>
        <button onClick={handleClick}>Login</button>{" "}
      </BgLogo>
    </div>
  );
}
