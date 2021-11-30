import ghIcon from '../../../images/ghicon.png';

const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <img src={ghIcon} alt="Github icon" />
      <a
        className="text-lg"
        href="https://github.com/esiale"
        target="_blank"
        rel="noreferrer"
      >
        esiale
      </a>
    </div>
  );
};

export default Footer;
