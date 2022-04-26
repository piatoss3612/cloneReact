interface ButtopProps {
  selected: boolean;
  name: string;
  onClick: () => void;
}

const Button = ({ selected = false, name, onClick }: ButtopProps) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: `solid ${selected ? 6 : 1}px black`,
        boxSizing: "border-box",
        padding: "16px",
      }}
      onClick={onClick}
    >
      <img
        src={`/images/${name}.png`}
        style={{ width: "100%", height: "100%" }}
        alt={name}
      />
    </div>
  );
};

export default Button;
