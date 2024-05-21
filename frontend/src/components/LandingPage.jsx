import '../App.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to PurrfectSitter!</h1>
        <h2>Because your cat deserves the best care, <br />
          even when you&apos;re not there!</h2>
        <p>Find your perfect match</p>
        <div className="buttons">
          <a href="/login" className="btn">Login</a>
          <a href="/register" className="btn">Register</a>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
