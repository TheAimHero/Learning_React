import React from "react";

function Order(props) {
  const { closeHour } = props;

  return (
    <div className="order">
      <p>We Are Open Now. Until {closeHour}:00</p>
      <button className="btn">Order</button>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const open = 9;
  const closeHour = 20;
  const isOpen = hour >= open && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen && <Order closeHour={closeHour} />}
      {!isOpen && <p>We Are Close Now</p>}
    </footer>
  );
}

export default Footer;
