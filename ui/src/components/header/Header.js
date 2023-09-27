import "./header.css";
//rfc
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://static.sadhguru.org/d/46272/1664423833-shiva-wallpaper-mahashivratri.jpg"
        alt=""
      />
    </div>
  );
}

