type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="max-w-screen-lg w-full mx-auto px-6 lg:px-0">{children}</div>
);

export default Container;
