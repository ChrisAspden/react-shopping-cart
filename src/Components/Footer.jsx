import React from 'react';
// Footer component for the website
// This component displays the footer with links to login, about us, contact us, and privacy policy
const Footer = () => {
  return (
    <footer className="bg-primary py-4 text-center text-sm text-gray-600">
      <p>
        <a href="/about" className="ml-2 hover:underline">About Us</a>
        <a href="/contact" className="ml-2 hover:underline">Contact Us</a>
        <a href="/privacy" className="ml-2 hover:underline">Privacy Policy</a>
      </p>
    </footer>
  );
}

export default Footer;