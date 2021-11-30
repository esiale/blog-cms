import ghIcon from '../../../images/ghicon.png';

const Footer = () => {
  return (
    <footer>
      <a
        className="text-lg flex justify-center items-center gap-2"
        href="https://github.com/esiale"
        target="_blank"
        rel="noreferrer"
      >
        <img src={ghIcon} alt="Github icon" />
        esiale
      </a>
    </footer>
  );
};

export default Footer;
