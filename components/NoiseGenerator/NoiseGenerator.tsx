/**
 * 子要素をラップするためのコンポーネント。
 * @param {{ children?: React.ReactNode }} props - コンポーネントのプロパティ。
 * @param {React.ReactNode} [props.children] - ラップする子要素。
 * @returns {JSX.Element} - ラップされた子要素。
 */
export const NoiseGenerator: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
