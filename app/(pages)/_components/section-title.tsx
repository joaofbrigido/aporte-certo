const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="text-center mt-36">
      <h2 className="text-md text-primary mb-1 uppercase font-medium">
        {title}
      </h2>
      <h3 className="text-3xl font-bold">{subtitle}</h3>
    </div>
  );
};

export default SectionTitle;
