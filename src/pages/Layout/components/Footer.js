import ghIcon from '../../../images/ghicon.png';

const Footer = () => {
  return (
    <footer className="self-center">
      <a
        className="w-max text-lg flex justify-center items-center gap-2 py-3"
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
