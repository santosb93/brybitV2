import React from 'react';
import '../css/Footer.scss'
const Footer = () => {
  return (
    <footer id = "footer">
      <ul className="list container">
        <li><h3>Links</h3></li>
        <li><a href="">Home</a></li>
        <li><a href="">Docs</a></li>
        <li><a href="">Examples</a></li>
        <li><a href="">Themes</a></li>
        <li><a href="">Blog</a></li>
      </ul>
      <ul className="list container">
        <li><h3>Guides</h3></li>
        <li><a href="">Getting Started</a></li>
        <li><a href="">Starter guides</a></li>
        <li><a href="">Advanced Guides</a></li>
      </ul>
      <ul className="list container">
        <li><h3>Community</h3></li>
        <li><a href="">Issues</a></li>
        <li><a href="">Discussions</a></li>
        <li><a href="">Corporate Sponsors</a></li>
        <li><a href="">Discord</a></li>
        <li><a href="">Slack</a></li>
      </ul>
    </footer>
  );
};

export default Footer;