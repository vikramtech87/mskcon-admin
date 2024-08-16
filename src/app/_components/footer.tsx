import Container from "@/components/container";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-neutral-900 text-neutral-100 py-4">
      <Container>
        <div>
          <span className="text-neutral-400">Designed & Developed by </span>
          <span className="font-medium">Vikram Raj</span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
